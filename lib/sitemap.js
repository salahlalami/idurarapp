import { getSitemapEntries, absoluteUrl } from "@/lib/pages";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Google-compliant <urlset>: one <url> per indexable page, with <loc> and <lastmod>.
export function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = getSitemapEntries()
    .map(({ path }) => `<url><loc>${esc(encodeURI(absoluteUrl(path)))}</loc><lastmod>${today}</lastmod></url>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
