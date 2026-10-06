// Fills in missing translations in data/*.js using a local NLLB model (@xenova/transformers).
// A "language map" is any object whose keys are all language codes and that contains the
// default language (e.g. `translations: { en, fr, ar }` or the top-level `ui`). Missing
// languages — and missing keys inside an existing language — are generated from the
// default language and written back into the source file.
// Usage: npm run translate [-- --dry-run]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import * as acorn from 'acorn';
import { defaultLang, langCodes } from '../config/website.js';

const dryRun = process.argv.includes('--dry-run');
const MODEL = 'Xenova/nllb-200-distilled-600M';
// Language code -> NLLB code. Add an entry when you add a language.
const NLLB = {
  en: 'eng_Latn', fr: 'fra_Latn', ar: 'arb_Arab', es: 'spa_Latn', de: 'deu_Latn', it: 'ita_Latn',
  pt: 'por_Latn', nl: 'nld_Latn', tr: 'tur_Latn', ru: 'rus_Cyrl', zh: 'zho_Hans', ja: 'jpn_Jpan',
  ko: 'kor_Hang', hi: 'hin_Deva', pl: 'pol_Latn', sv: 'swe_Latn',
};
// Keys that are identifiers, not prose: copied as-is from the default language.
const KEEP = new Set(['slug', 'id', 'color', 'url', 'href', 'email', 'phone', 'image', 'logo']);

const dataDir = path.resolve(import.meta.dirname, '../data');
const keyName = (p) => (p.key.type === 'Identifier' ? p.key.name : String(p.key.value));
const props = (n) => n.properties.filter((p) => p.type === 'Property' && !p.computed);
const getProp = (n, k) => props(n).find((p) => keyName(p) === k);

function evaluate(n) {
  switch (n.type) {
    case 'Literal': return n.value;
    case 'TemplateLiteral':
      if (n.expressions.length) throw new Error('dynamic template');
      return n.quasis[0].value.cooked;
    case 'ArrayExpression': return n.elements.map(evaluate);
    case 'ObjectExpression': return Object.fromEntries(props(n).map((p) => [keyName(p), evaluate(p.value)]));
    case 'UnaryExpression': if (n.operator === '-') return -evaluate(n.argument);
    // falls through
    default: throw new Error(`unsupported ${n.type}`);
  }
}

const isLangMap = (n) => {
  const ps = n.properties;
  return ps.length > 0 && ps.every((p) => p.type === 'Property' && !p.computed && langCodes.includes(keyName(p)))
    && ps.some((p) => keyName(p) === defaultLang);
};

const jobs = []; // { file, pos, indent, key, value (source value), lang }

function walk(file, src, node) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'ObjectExpression' && isLangMap(node)) {
    plan(file, src, node);
    return;
  }
  for (const k of Object.keys(node)) {
    const v = node[k];
    if (Array.isArray(v)) v.forEach((c) => walk(file, src, c));
    else if (v && typeof v.type === 'string') walk(file, src, v);
  }
}

function indentOf(src, pos) {
  const lineStart = src.lastIndexOf('\n', pos - 1) + 1;
  return src.slice(lineStart).match(/^\s*/)[0];
}

function addMissing(file, src, srcNode, tgtNode, lang, label) {
  // Both are ObjectExpressions: fill keys missing from tgt, recurse into shared object values.
  const last = props(tgtNode).at(-1);
  for (const p of props(srcNode)) {
    const k = keyName(p);
    const existing = getProp(tgtNode, k);
    if (existing) {
      if (p.value.type === 'ObjectExpression' && existing.value.type === 'ObjectExpression')
        addMissing(file, src, p.value, existing.value, lang, `${label}.${k}`);
      continue;
    }
    let value;
    try { value = evaluate(p.value); } catch (e) { console.warn(`skip ${label}.${k}: ${e.message}`); continue; }
    jobs.push({ file, pos: (last || tgtNode).end, indent: last ? indentOf(src, last.start) : '', key: k, value, lang, label: `${label}.${k}` });
  }
}

function plan(file, src, map) {
  const srcProp = getProp(map, defaultLang);
  for (const lang of langCodes) {
    if (lang === defaultLang) continue;
    const tgt = getProp(map, lang);
    if (!tgt) {
      let value;
      try { value = evaluate(srcProp.value); } catch (e) { console.warn(`skip ${file}@${srcProp.start}: ${e.message}`); continue; }
      const last = props(map).at(-1);
      jobs.push({ file, pos: last.end, indent: indentOf(src, last.start), key: lang, value, lang, label: `${path.basename(file)}:${lang}`, whole: true });
    } else if (srcProp.value.type === 'ObjectExpression' && tgt.value.type === 'ObjectExpression') {
      addMissing(file, src, srcProp.value, tgt.value, lang, `${path.basename(file)}:${lang}`);
    }
  }
}

const files = readdirSync(dataDir).filter((f) => f.endsWith('.js')).map((f) => path.join(dataDir, f));
const sources = new Map();
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  sources.set(file, src);
  walk(file, src, acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module' }));
}

if (!jobs.length) { console.log('All translations are complete.'); process.exit(0); }
console.log(`${jobs.length} missing translation(s):`);
for (const j of jobs) console.log(`  ${j.label}`);
if (dryRun) process.exit(0);

const unknown = [...new Set(jobs.map((j) => j.lang))].filter((l) => !NLLB[l]);
if (unknown.length) { console.error(`No NLLB code for: ${unknown.join(', ')}. Add it to NLLB in scripts/translate.mjs.`); process.exit(1); }

const { pipeline, env } = await import('@xenova/transformers');
env.allowLocalModels = false;
env.backends.onnx.logSeverityLevel = 3; // hide ONNX runtime warnings
console.log(`Loading ${MODEL} (first run downloads ~600MB)…`);
const translator = await pipeline('translation', MODEL);

const cache = new Map();
async function tr(text, lang) {
  if (!text.trim() || !/\p{L}/u.test(text)) return text;
  const ck = `${lang}\0${text}`;
  if (!cache.has(ck)) {
    const [out] = await translator(text, { src_lang: NLLB[defaultLang], tgt_lang: NLLB[lang], max_new_tokens: 512 });
    cache.set(ck, out.translation_text);
  }
  return cache.get(ck);
}
async function translate(v, lang, key) {
  if (typeof v === 'string') return KEEP.has(key) ? v : tr(v, lang);
  if (Array.isArray(v)) return Promise.all(v.map((x) => translate(x, lang, key)));
  if (v && typeof v === 'object') {
    const out = {};
    for (const [k, x] of Object.entries(v)) out[k] = await translate(x, lang, k);
    return out;
  }
  return v;
}

const ser = (v) => {
  if (Array.isArray(v)) return `[${v.map(ser).join(', ')}]`;
  if (v && typeof v === 'object')
    return `{ ${Object.entries(v).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${ser(x)}`).join(', ')} }`;
  return JSON.stringify(v);
};

for (const j of jobs) {
  process.stdout.write(`  ${j.label} … `);
  const out = await translate(j.value, j.lang, j.key);
  j.text = `,\n${j.indent}${/^[A-Za-z_$][\w$]*$/.test(j.key) ? j.key : JSON.stringify(j.key)}: ${ser(out)}`;
  console.log('ok');
}

// Apply edits back to front so earlier offsets stay valid.
for (const [file, src] of sources) {
  const edits = jobs.filter((j) => j.file === file).sort((a, b) => b.pos - a.pos || 0);
  if (!edits.length) continue;
  let next = src;
  for (const e of edits) next = next.slice(0, e.pos) + e.text + next.slice(e.pos);
  writeFileSync(file, next);
  console.log(`updated ${path.relative(process.cwd(), file)} (${edits.length})`);
}
