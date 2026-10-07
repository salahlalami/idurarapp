// Generates public/_redirects for Cloudflare static assets from redirect/index.js.
// The site is a static export, so Next's redirects() can't run; Cloudflare
// serves these instead. Each legacy URL is a single 301, with or without a
// trailing slash. Usage: npm run redirects
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import redirects from '../redirect/index.js';
import { defaultLang } from '../config/website.js';

const lines = [
  // 302: the default language may change, so don't cache it permanently.
  `/ /${defaultLang} 302`,
  ...redirects.flatMap(({ source, destination, permanent }) => {
    const code = permanent ? 301 : 302;
    return [`${source} ${destination} ${code}`, `${source}/ ${destination} ${code}`];
  }),
  // Any other /path/ -> /path as a single 301 (static rules above win).
  '/:a/ /:a 301',
  '/:a/:b/ /:a/:b 301',
  '/:a/:b/:c/ /:a/:b/:c 301',
];

const out = path.resolve(import.meta.dirname, '../public/_redirects');
writeFileSync(out, lines.join('\n') + '\n');
console.log(`redirects: ${lines.length} rules -> public/_redirects`);
