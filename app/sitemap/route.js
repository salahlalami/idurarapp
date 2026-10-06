import { buildSitemapXml } from '@/lib/sitemap';

export const dynamic = 'force-static';

// /sitemap serves the same XML as /sitemap.xml.
export function GET() {
  return new Response(buildSitemapXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
