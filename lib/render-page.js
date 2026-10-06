import { notFound } from "next/navigation";
import { getLayout } from "@/layout";
import JsonLd from "@/layout/components/JsonLd";
import {
  getPageBySlug,
  getAlternates,
  getNavLinks,
  absoluteUrl,
} from "@/lib/pages";
import { getPageData } from "@/lib/collections";
import { siteName, isValidLang } from "@/config/website";

// schema.org description per layout; extra fields come from the page itself.
function structuredData(page, data, url) {
  const base = {
    "@context": "https://schema.org",
    name: page.title,
    description: page.description,
    inLanguage: page.lang,
    url,
    isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl(`/${page.lang}`) },
  };
  switch (page.layout) {
    case "blogPost":
      return { ...base, "@type": "BlogPosting", datePublished: page.date };
    case "blogList":
      return { ...base, "@type": "Blog" };
    default:
      return { ...base, "@type": "WebPage" };
  }
}

// Shared by app/[lang]/page.js (home) and app/[lang]/[...slug]/page.js.
export async function resolvePage(params) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return null;
  return getPageBySlug(lang, slug || []);
}

export async function renderPage(params) {
  const page = await resolvePage(params);
  if (!page) notFound();

  const Layout = getLayout(page.layout);
  const alternates = getAlternates(page.id);

  const data = getPageData(page);

  return (
    <>
      <JsonLd data={structuredData(page, data, absoluteUrl(alternates[page.lang]))} />
      <Layout
        page={page}
        data={data}
        lang={page.lang}
        alternates={alternates}
        navLinks={getNavLinks(page.lang)}
      />
    </>
  );
}
