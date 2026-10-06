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
import faq from "@/data/faq";
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
    case "newsItem":
      return { ...base, "@type": "NewsArticle", datePublished: page.date };
    case "job":
      return {
        ...base,
        "@type": "JobPosting",
        title: page.title,
        datePosted: page.postedOn,
        employmentType: page.type,
        hiringOrganization: { "@type": "Organization", name: siteName },
        jobLocation: { "@type": "Place", address: page.location },
        ...(page.remote ? { jobLocationType: "TELECOMMUTE" } : {}),
      };
    case "classified":
      return {
        ...base,
        "@type": "Product",
        category: [data.category, data.subCategory].filter(Boolean).join(" > "),
        offers: {
          "@type": "Offer",
          price: page.price,
          priceCurrency: page.currency,
          itemCondition: page.condition
            ? `https://schema.org/${page.condition === "new" ? "NewCondition" : "UsedCondition"}`
            : undefined,
          availability: "https://schema.org/InStock",
          priceValidUntil: page.expiresOn,
          seller: { "@type": page.posterType === "company" ? "Organization" : "Person", name: page.posterName },
          url,
        },
      };
    case "company":
      return {
        ...base,
        "@type": "Organization",
        url: page.website,
        email: page.email,
        telephone: page.phone,
        foundingDate: String(page.founded),
        address: { "@type": "PostalAddress", addressLocality: page.city, addressCountry: page.country },
      };
    case "directory":
    case "directoryCategory":
    case "directorySub":
      return { ...base, "@type": "CollectionPage" };
    case "blogList":
      return { ...base, "@type": "Blog" };
    case "portfolioItem":
      return {
        ...base,
        "@type": "CreativeWork",
        dateCreated: String(page.year),
        creator: { "@type": "Organization", name: siteName },
      };
    case "product":
      return {
        ...base,
        "@type": "Product",
        sku: page.sku,
        category: data.category?.title,
        offers: {
          "@type": "Offer",
          price: page.price,
          priceCurrency: page.currency,
          availability:
            page.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url,
        },
      };
    case "faq":
      return {
        ...base,
        "@type": "FAQPage",
        mainEntity: faq.flatMap((g) => g.items).map((it) => {
          const t = it[page.lang] || it.en;
          return { "@type": "Question", name: t.q, acceptedAnswer: { "@type": "Answer", text: t.a } };
        }),
      };
    case "newsList":
    case "jobList":
    case "classifiedList":
    case "portfolioList":
      return { ...base, "@type": "CollectionPage" };
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
