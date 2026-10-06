// Legacy www.idurarapp.com URLs -> current routes. Each source matches with or
// without a trailing slash (see next.config.mjs) and is served as a single 301.
// Language homes (/fr/, ...) and /<lang>/contact-us/ still exist and only need
// the trailing-slash 301, so they are not listed here.

const blogPosts = [
  "react-js-developers-create-a-email-editor-with-react-quill",
  "next-js-graphql-apollo-server-starter-project",
  "best-animation-packages-for-react-js",
  "a-guide-to-node-js-streams-advanced-functionality",
  "javascript-vs-typescript-going-back-to-javascript-and-stop-using-typescript",
  "calling-all-node-js-developers-create-generic-upload-controller-weekly-issue-to-solve",
  "how-to-get-sponsored-by-digitalocean-for-your-open-source-project",
  "why-you-should-use-emoji-in-github-commit-",
  "5-open-source-libraries-you-must-know",
  "6-open-source-libraries-you-must-contribute",
  "7-open-source-libraries-you-must-know",
  "the-pros-and-cons-of-learning-web-development-directly-with-frameworks",
  "building-and-generate-invoice-pdf-with-react-js-redux-and-node-js",
  "mastering-advanced-complex-react-usecontext-with-usereducer-redux-like-style",
  "the-significance-of-html-in-the-programming-world-building-the-foundation-of-the-web-2",
  "ipv4-vs-ipv6-bridging-the-digital-divide",
  "top-10-open-source-free-erp-crm-software-for-self-hosted-solutions",
];

// Old blog posts that no longer exist; send them to the blog index.
const removedPosts = [
  "mastering-javascript-your-path-to-proficiency-with-code-examples",
  "decoding-aws-and-exploring-cloud-alternatives-a-comprehensive-overview",
  "the-comprehensive-guide-to-the-vital-role-of-code-documentation-in-software-development",
  "unleashing-the-power-of-python-a-versatile-and-beginner-friendly-programming-wonder",
  "a-simple-guide-to-creating-a-pull-request-on-github",
  "debugging-and-error-handling-mastering-the-art-of-software-stability",
  "best-7-open-source-projects-built-with-nodejs-reactjs",
];

// Unprefixed English pages that still exist under /en.
const enPages = [
  "contact-us",
  "pricing",
  "support",
  "early-access",
  "free-erp-crm",
  "privacy-policy",
  "refund-policy",
  "terms-conditions",
];

// Retired English pages -> closest current page.
const retired = {
  "/blog": "/en/blog",
  "/checkout": "/en/pricing",
  "/purchase-license": "/en/pricing",
  "/open-source-erp-crm": "/en/free-erp-crm",
  "/self-hosted-code-source-erp-crm": "/en",
  "/saas/reseller-self-hosted-code-source-erp-crm": "/en",
  "/no-code-app-builder": "/en",
  "/features": "/en",
  "/demo": "/en",
  "/demo-erp-crm": "/en",
  "/demo-mern-admin": "/en",
  "/log-in": "/en",
  "/sign-up": "/en",
  "/digitalocean": "/en/about",
  "/notion": "/en/about",
  "/invest": "/en/about",
  "/pitch-deck": "/en/about",
  "/hire-me-on-upwork": "/en/about",
  "/we-are-hiring": "/en/about",
  "/frontend-react-js-engineer": "/en/about",
  "/backend-node-js-express-js-engineer": "/en/about",
  // The old URL contained a literal space.
  "/ipv4-vs-ipv6-bridging%20the-digital-divide": "/en/blog/ipv4-vs-ipv6-bridging-the-digital-divide",
  // Retired localized landing pages -> that language's home or landing page.
  "/fr/saas/erp-crm-platform-node-js-react-js-mongodb-revendeur": "/fr/erp-crm-auto-heberge-node-js-react-js-mongodb-entreprise",
  "/es/saas/erp-y-crm-plataforma-node-js-react-js-mongodb": "/es/erp-y-crm-autohospedado-node-js-react-js-mongodb",
  "/ar/saas/self-hosted-nodejs-react-erp-crm": "/ar",
  "/ar/self-hosted-nodejs-react-erp-crm": "/ar",
  "/zh/self-hosted-nodejs-react-erp-crm": "/zh",
  "/pt/erp-crm-de-auto-hospedagem-node-js-react-js-mongodb": "/pt",
  "/vi/erp-crm-tu-luu-tru-node-js-react-js-mongodb-thanh-toan-mot-lan-ma-nguon": "/vi",
  "/tr/kendi-sunucunuzda-barindirilan-erp-crm-node-js-react-js-mongodb": "/tr",
  ...Object.fromEntries(
    ["fa", "it", "hi", "id", "de", "ru"].map((l) => [
      `/${l}/self-hosted-code-source-erp-crm`,
      `/${l}`,
    ]),
  ),
};

// Languages the old site had but this one doesn't -> English.
const droppedLangs = ["ja", "ms", "uk"].flatMap((l) => [
  { source: `/${l}`, destination: "/en" },
  { source: `/${l}/contact-us`, destination: "/en/contact-us" },
  { source: `/${l}/self-hosted-code-source-erp-crm`, destination: "/en" },
]);

const redirects = [
  ...blogPosts.flatMap((s) => [
    { source: `/${s}`, destination: `/en/blog/${s}` },
    { source: `/en/${s}`, destination: `/en/blog/${s}` },
  ]),
  ...removedPosts.flatMap((s) => [
    { source: `/${s}`, destination: "/en/blog" },
    { source: `/en/${s}`, destination: "/en/blog" },
  ]),
  ...enPages.map((s) => ({ source: `/${s}`, destination: `/en/${s}` })),
  ...Object.entries(retired).map(([source, destination]) => ({ source, destination })),
  ...droppedLangs,
].map((r) => ({ ...r, permanent: true }));

export default redirects;
