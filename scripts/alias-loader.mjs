// Node resolve hook: maps the "@/" alias (jsconfig) and extensionless imports so
// project modules can run outside Next.js.
import { pathToFileURL } from 'node:url';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

function withExt(file) {
  for (const f of [file, `${file}.js`, path.join(file, 'index.js')])
    if (existsSync(f) && statSync(f).isFile()) return f;
  return file;
}

export async function resolve(specifier, context, next) {
  if (specifier === '@/layout') return next(new URL('./layout-stub.mjs', import.meta.url).href, context);
  if (specifier.startsWith('@/'))
    return next(pathToFileURL(withExt(path.join(root, specifier.slice(2)))).href, context);
  if (specifier.startsWith('.') && context.parentURL?.startsWith(pathToFileURL(root).href) && !path.extname(specifier))
    return next(pathToFileURL(withExt(path.resolve(path.dirname(new URL(context.parentURL).pathname), specifier))).href, context);
  return next(specifier, context);
}
