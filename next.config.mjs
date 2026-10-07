import redirects from './redirect/index.js';
import { defaultLang } from './config/website.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required by @opennextjs/cloudflare to bundle the app for Workers.
  output: 'standalone',
  trailingSlash: false,
  // Next's built-in trailing-slash redirect is a 308 that runs before custom
  // redirects, causing chains like /old/ -> 308 /old -> 308 /new. We handle
  // trailing slashes ourselves below so every legacy URL is a single 301.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // 302/307: the default language may change, so don't cache it permanently.
      { source: '/', destination: `/${defaultLang}`, permanent: false },
      // Legacy URLs: single-hop 301, with or without a trailing slash.
      ...redirects.map(({ permanent, ...r }) => ({
        ...r,
        source: `${r.source}{/}?`,
        statusCode: permanent ? 301 : 302,
      })),
      // Replaces Next's built-in trailing-slash redirect (308) with a 301.
      { source: '/:path+/', destination: '/:path+', statusCode: 301 },
    ];
  },
};

export default nextConfig;
