// Content collections (blog, portfolio, news, jobs, ...).
// Each collection hangs under an index page from data/pages.js: its localized slug
// is the URL prefix. Items without a translation for a language are not generated.
import pages from '@/data/pages';
import blog from '@/data/blog';
import portfolio from '@/data/portfolio';
import news from '@/data/news';
import jobs from '@/data/jobs';
import classifieds, { classifiedCategories } from '@/data/classifieds';
import { directoryCategories, directorySubcategories, directoryCompanies } from '@/data/directory';

export const collections = {
  blog: { items: blog, indexId: 'blog', layout: 'blogPost' },
  portfolio: { items: portfolio, indexId: 'portfolio', layout: 'portfolioItem' },
  news: { items: news, indexId: 'news', layout: 'newsItem' },
  jobs: { items: jobs, indexId: 'careers', layout: 'job' },
  classifieds: { items: classifieds, indexId: 'classifieds', layout: 'classified' },
  directoryCategories: {
    items: directoryCategories,
    indexId: 'directory',
    layout: 'directoryCategory',
    segments: { en: 'category', fr: 'categorie', ar: 'فئة' },
  },
  directorySubcategories: {
    items: directorySubcategories,
    indexId: 'directory',
    layout: 'directorySub',
    segments: { en: 'subcategory', fr: 'sous-categorie', ar: 'فئة-فرعية' },
  },
  directoryCompanies: {
    items: directoryCompanies,
    indexId: 'directory',
    layout: 'company',
    segments: { en: 'company', fr: 'entreprise', ar: 'شركة' },
  },
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
const SEARCH_TYPES = { blog: 'blog', news: 'news', jobs: 'job', classifieds: 'classified', portfolio: 'portfolio', directoryCompanies: 'company' };

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

const today = () => new Date().toISOString().slice(0, 10);

// Live (non-expired) ads, featured first, then newest first.
function liveAds(lang) {
  return listItems('classifieds', lang)
    .filter((a) => !a.expiresOn || a.expiresOn >= today())
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.postedOn.localeCompare(a.postedOn));
}

// Category tree localised for `lang`: [{ id, name, children: [{ id, name }] }]
function adCategories(lang) {
  const name = (c) => (c.translations[lang] || c.translations.en).name;
  return classifiedCategories.map((c) => ({
    id: c.id,
    name: name(c),
    children: c.children.map((s) => ({ id: s.id, name: name(s) })),
  }));
}

function getLayoutData(page) {
  const { lang } = page;
  switch (page.layout) {
    case 'blogList':
      return { posts: listItems('blog', lang).sort((a, b) => b.date.localeCompare(a.date)) };
    case 'newsList':
      return { posts: listItems('news', lang).sort((a, b) => b.date.localeCompare(a.date)) };
    case 'jobList':
      return { jobs: listItems('jobs', lang).sort((a, b) => b.postedOn.localeCompare(a.postedOn)) };
    case 'classifiedList':
      return { ads: liveAds(lang), categories: adCategories(lang) };
    case 'classifiedForm':
      return { categories: adCategories(lang) };
    case 'classified': {
      const categories = adCategories(lang);
      const cat = categories.find((c) => c.id === page.category);
      return {
        category: cat?.name,
        subCategory: cat?.children.find((s) => s.id === page.subCategory)?.name,
        related: liveAds(lang).filter((a) => a.itemId !== page.itemId && a.subCategory === page.subCategory).slice(0, 3),
        categories,
      };
    }
    case 'directory':
      return {
        categories: listItems('directoryCategories', lang),
        subcategories: listItems('directorySubcategories', lang),
        companies: listItems('directoryCompanies', lang),
      };
    case 'directoryCategory': {
      const subcategories = listItems('directorySubcategories', lang).filter((s) => s.category === page.itemId);
      const ids = subcategories.map((s) => s.itemId);
      return {
        subcategories,
        companies: listItems('directoryCompanies', lang).filter((c) => ids.includes(c.sub)),
      };
    }
    case 'directorySub':
      return {
        category: getItem('directoryCategories', page.category, lang),
        siblings: listItems('directorySubcategories', lang).filter((s) => s.category === page.category),
        companies: listItems('directoryCompanies', lang).filter((c) => c.sub === page.itemId),
      };
    case 'company': {
      const sub = getItem('directorySubcategories', page.sub, lang);
      return {
        sub,
        category: sub && getItem('directoryCategories', sub.category, lang),
        related: listItems('directoryCompanies', lang).filter((c) => c.sub === page.sub && c.itemId !== page.itemId).slice(0, 3),
      };
    }
    case 'newsItem': {
      const posts = listItems('news', lang).sort((a, b) => a.date.localeCompare(b.date));
      const i = posts.findIndex((p) => p.itemId === page.itemId);
      return { prev: posts[i - 1] || null, next: posts[i + 1] || null };
    }
    case 'portfolioList':
      return { projects: listItems('portfolio', lang).sort((a, b) => b.year - a.year) };
    case 'search':
      return { index: buildSearchIndex(lang) };
    case 'blogPost': {
      const posts = listItems('blog', lang).sort((a, b) => a.date.localeCompare(b.date));
      const i = posts.findIndex((p) => p.itemId === page.itemId);
      return { prev: posts[i - 1] || null, next: posts[i + 1] || null };
    }
    case 'portfolioItem': {
      const all = listItems('portfolio', lang);
      const i = all.findIndex((p) => p.itemId === page.itemId);
      return {
        prev: all[(i - 1 + all.length) % all.length],
        next: all[(i + 1) % all.length],
        related: all.filter((p) => p.itemId !== page.itemId).slice(0, 2),
      };
    }
    default:
      return {};
  }
}
