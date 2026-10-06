// Content collections (blog, portfolio, news, jobs, ...).
// Each collection hangs under an index page from data/pages.js: its localized slug
// is the URL prefix. Items without a translation for a language are not generated.
import pages from '@/data/pages';
import blog from '@/data/blog';

export const collections = {
  blog: { items: blog, indexId: 'blog', layout: 'blogPost' },
};

const indexSlug = (indexId, lang) =>
  pages.find((p) => p.id === indexId)?.translations[lang]?.slug;

const join = (...parts) => parts.filter(Boolean).join('/');

// Full slug (without leading "/<lang>/") of an item, or null if not available in `lang`.
function itemSlug(name, item, lang) {
  const c = collections[name];
  const t = item.translations[lang];
  const base = indexSlug(c.indexId, lang);
  if (!t || base === undefined) return null;
  return join(base, c.segments?.[lang], t.slug);
}

const href = (lang, slug) => `/${lang}/${slug}`;

// Every { name, item, lang, slug } entry.
function entries() {
  const out = [];
  for (const [name, c] of Object.entries(collections)) {
    for (const item of c.items) {
      for (const lang of Object.keys(item.translations)) {
        const slug = itemSlug(name, item, lang);
        if (slug !== null) out.push({ name, item, lang, slug });
      }
    }
  }
  return out;
}

const ALL = entries();

// Build-time check: no two items (or an item and a page) may share a URL.
(function validate() {
  const seen = new Set();
  for (const p of pages)
    for (const [lang, t] of Object.entries(p.translations)) seen.add(`${lang}/${t.slug}`);
  for (const e of ALL) {
    const key = `${e.lang}/${e.slug}`;
    if (seen.has(key)) throw new Error(`[collections] duplicate path /${key} (${e.name}:${e.item.id})`);
    seen.add(key);
  }
})();

const SHARED_SKIP = new Set(['translations']);

function localize(name, item, lang) {
  const slug = itemSlug(name, item, lang);
  if (slug === null) return null;
  const shared = Object.fromEntries(Object.entries(item).filter(([k]) => !SHARED_SKIP.has(k)));
  return {
    ...shared,
    ...item.translations[lang],
    itemId: item.id,
    id: `${name}:${item.id}`,
    collection: name,
    layout: collections[name].layout,
    lang,
    slug,
    href: href(lang, slug),
  };
}

export function listItems(name, lang) {
  return collections[name].items.map((i) => localize(name, i, lang)).filter(Boolean);
}

export function getItem(name, itemId, lang) {
  const item = collections[name].items.find((i) => i.id === itemId);
  return item ? localize(name, item, lang) : null;
}

export function findCollectionPage(lang, slug) {
  const e = ALL.find((x) => x.lang === lang && x.slug === slug);
  return e ? localize(e.name, e.item, lang) : null;
}

export function getCollectionStaticParams() {
  return ALL.map((e) => ({ lang: e.lang, slug: e.slug.split('/') }));
}

// Collection-item pages ("blog:hello-world") -> { en: '/en/blog/hello-world', ... }
export function getCollectionAlternates(pageId) {
  const [name, itemId] = pageId.split(':');
  const out = {};
  for (const e of ALL) if (e.name === name && e.item.id === itemId) out[e.lang] = href(e.lang, e.slug);
  return out;
}

export const isCollectionId = (id) => id.includes(':');

export function getCollectionEntries() {
  return ALL.map((e) => ({ pageId: `${e.name}:${e.item.id}`, lang: e.lang, path: href(e.lang, e.slug) }));
}

function indexLink(indexId, lang) {
  const t = pages.find((p) => p.id === indexId)?.translations[lang];
  return t ? { title: t.title, href: href(lang, t.slug) } : null;
}

// Flat, serialisable list of everything searchable in `lang` (filtered client-side).
const SEARCH_TYPES = { blog: 'blog' };

function buildSearchIndex(lang) {
  const out = [];
  for (const [name, type] of Object.entries(SEARCH_TYPES)) {
    for (const i of listItems(name, lang))
      out.push({ type, title: i.title, description: i.description || '', tags: i.tags || [], href: i.href });
  }
  for (const p of pages) {
    const t = p.translations[lang];
    if (!t || p.noindex || p.id === 'home') continue;
    out.push({ type: 'page', title: t.title, description: t.description || '', tags: [], href: href(lang, t.slug) });
  }
  return out;
}

// Extra, serialisable data a layout needs besides the page itself.
export function getPageData(page) {
  const data = getLayoutData(page);
  const c = collections[page.collection];
  return c ? { ...data, parent: indexLink(c.indexId, page.lang) } : data;
}

function getLayoutData(page) {
  const { lang } = page;
  switch (page.layout) {
    case 'blogList':
      return { posts: listItems('blog', lang).sort((a, b) => b.date.localeCompare(a.date)) };
    case 'blogPost': {
      const posts = listItems('blog', lang).sort((a, b) => a.date.localeCompare(b.date));
      const i = posts.findIndex((p) => p.itemId === page.itemId);
      return { prev: posts[i - 1] || null, next: posts[i + 1] || null };
    }
    default:
      return {};
  }
}
