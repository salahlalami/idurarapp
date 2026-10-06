import pages from "@/data/pages";
import redirects from "@/redirect";
import { layoutRegistry } from "@/layout";
import {
  collections,
  findCollectionPage,
  getCollectionStaticParams,
  getCollectionAlternates,
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

// Menu entries for pages flagged `showInNav`, localized.
export function getNavLinks(lang) {
  return pages
    .filter((p) => p.showInNav && p.translations[lang])
    .map((p) => ({
      key: p.id,
      label: p.translations[lang].title,
      href: buildPath(lang, p.translations[lang].slug),
    }));
}

export function getAllPages() {
  return pages.filter((p) => !p.noindex);
}

// Sitemap URLs: the home page plus pages flagged `showInNav`, in every language.
export function getSitemapEntries() {
  return getAllPages()
    .filter((p) => p.id === "home" || p.showInNav)
    .flatMap((p) =>
      Object.entries(p.translations).map(([lang, t]) => ({
        pageId: p.id,
        lang,
        path: buildPath(lang, t.slug),
      })),
    );
}

// Geo keyword per language; appended to titles/descriptions that lack it.
const GEO = { en: ["Algeria"], fr: ["Algérie", "Algerie"], ar: ["الجزائر"] };

function withGeo(text, lang, sep, end = "") {
  const words = GEO[lang] || GEO.en;
  if (!text || words.some((w) => text.toLowerCase().includes(w.toLowerCase()))) return text;
  return `${text.replace(/[.\s]+$/, "")}${sep}${words[0]}${end}`;
}

export function buildMetadata(page) {
  const alternates = getAlternates(page.id);
  page = {
    ...page,
    title: withGeo(page.title, page.lang, " | "),
    description: withGeo(page.description, page.lang, " – ", "."),
  };
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
