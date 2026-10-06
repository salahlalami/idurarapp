// Generates public/sitemap.xml for every page and collection item (all languages).
// Usage: npm run sitemap
import { register } from 'node:module';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

register('./alias-loader.mjs', import.meta.url);

const { buildSitemapXml } = await import('../lib/sitemap.js');

const xml = buildSitemapXml();
const out = path.resolve(import.meta.dirname, '../public/sitemap.xml');
writeFileSync(out, xml);
console.log(`sitemap: ${xml.split('<url>').length - 1} URLs -> public/sitemap.xml`);
