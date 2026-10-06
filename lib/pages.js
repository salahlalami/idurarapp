import pages from "@/data/pages";
import redirects from "@/redirect";
import nav from "@/data/nav";
import { layoutRegistry } from "@/layout";
import {
  collections,
  findCollectionPage,
  getCollectionStaticParams,
  getCollectionAlternates,
  getCollectionEntries,
  isCollectionId,
} from "@/lib/collections";
import {
  siteUrl,
  siteName,
  defaultLang,
  langCodes,
  getLangConfig,
} from "@/config/website";

export function buildPath(lang, slug) {
  return `/${lang}${slug ? `/${slug}` : ""}`;
}

// ---- Build-time validation: fail the build on data mistakes ----
(function validate() {
  const seen = new Set();
  for (const page of pages) {
    if (!layoutRegistry[page.layout]) {
      throw new Error(
        `[pages] "${page.id}": unknown layout "${page.layout}"`,
      );
    }
    for (const [lang, t] of Object.entries(page.translations)) {
      if (!langCodes.includes(lang)) {
        throw new Error(`[pages] "${page.id}": unsupported language "${lang}"`);
      }
      const path = buildPath(lang, t.slug);
      if (seen.has(path)) throw new Error(`[pages] duplicate path ${path}`);
      seen.add(path);
    }
  }
  for (const [name, c] of Object.entries(collections)) {
    if (!layoutRegistry[c.layout]) {
      throw new Error(`[collections] "${name}": unknown layout "${c.layout}"`);
    }
  }
  for (const r of redirects) {
    if (seen.has(r.source)) {
      throw new Error(
        `[redirect] source ${r.source} collides with a live page`,
      );
    }
  }
})();

export function getPageBySlug(lang, slugParts = []) {
  const slug = slugParts.map(decodeURIComponent).join("/");
  for (const page of pages) {
    const t = page.translations[lang];
    if (t && t.slug === slug)
      return { id: page.id, layout: page.layout, noindex: !!page.noindex, lang, ...t };
  }
  return findCollectionPage(lang, slug);
}

// Every { lang, slug[] } combination to prerender.
export function getAllStaticParams() {
  const params = [];
  for (const page of pages) {
    for (const [lang, t] of Object.entries(page.translations)) {
      params.push({ lang, slug: t.slug ? t.slug.split("/") : [] });
    }
  }
  return [...params, ...getCollectionStaticParams()];
}

// { en: '/en/about', fr: '/fr/a-propos', ... } for hreflang + language switcher.
export function getAlternates(pageId) {
  if (isCollectionId(pageId)) return getCollectionAlternates(pageId);
  const page = pages.find((p) => p.id === pageId);
  const out = {};
  for (const [lang, t] of Object.entries(page.translations))
    out[lang] = buildPath(lang, t.slug);
  return out;
}

// Menu entries for a language (internal paths or absolute URLs), from data/nav.js.
export function getNavLinks(lang) {
  return (nav[lang] || nav[defaultLang]).map((l, i) => ({ key: String(i), ...l }));
}

export function getAllPages() {
  return pages.filter((p) => !p.noindex);
}

// Sitemap URLs: every indexable page plus every collection item, in every language.
export function getSitemapEntries() {
  const pageEntries = getAllPages().flatMap((p) =>
    Object.entries(p.translations).map(([lang, t]) => ({
      pageId: p.id,
      lang,
      path: buildPath(lang, t.slug),
    })),
  );
  return [...pageEntries, ...getCollectionEntries()];
}

export function buildMetadata(page) {
  const alternates = getAlternates(page.id);
  const languages = { ...alternates };
  if (alternates[defaultLang]) languages["x-default"] = alternates[defaultLang];
  return {
    title: page.title,
    description: page.description,
    ...(page.noindex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: alternates[page.lang], languages },
    openGraph: {
      title: page.title,
      description: page.description,
      url: alternates[page.lang],
      siteName,
      locale: getLangConfig(page.lang).ogLocale,
      type: page.layout === "blogPost" || page.layout === "newsItem" ? "article" : "website",
    },
  };
}

export function absoluteUrl(path) {
  return `${siteUrl}${path}`;
}
