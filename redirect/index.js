// Old URL -> new URL. `permanent: true` => 301, `permanent: false` => 302 (see next.config.mjs).
// Sources may use path-to-regexp patterns, e.g. '/en/old-blog/:slug'.
// Legacy idurarweb.com paths are kept alive for SEO.
const redirects = [
  { source: '/agence-algerie', destination: '/fr/a-propos', permanent: true },
  { source: '/agence-algerie/packaging-design-studio', destination: '/fr/packaging-design-studio', permanent: true },
  { source: '/agence-algerie/conception-logo-algerie', destination: '/fr/conception-logo-algerie', permanent: true },
  { source: '/agence-algerie/agence-communcation-algerie-conception-flyer-depliant-affiche', destination: '/fr/conception-graphique-algerie', permanent: true },
  { source: '/agence-algerie/conception-site-web-algerie', destination: '/fr/conception-site-web-algerie', permanent: true },
  { source: '/agence-algerie/connect', destination: '/fr/contact', permanent: true },
  { source: '/connectez', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/connectez', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/commander', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/commandez', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/interesser', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/inscrivez-vous', destination: '/fr/contact', permanent: true },
  { source: '/agence-algerie/missions-valeurs', destination: '/fr/a-propos', permanent: true },
  { source: '/agence-algerie/ecole-formation-informatique-oran-algerie', destination: '/fr/a-propos', permanent: true },
  { source: '/agence-algerie/agence-web', destination: '/fr/conception-site-web-algerie', permanent: true },
  { source: '/agence-algerie/agence-web-algerie', destination: '/fr/conception-site-web-algerie', permanent: true },
  { source: '/agence-algerie/creation-site-web-algerie-tarif-prix', destination: '/fr/conception-site-web-algerie', permanent: true },
  { source: '/agence-algerie/conception-site-e-commerce-oran-algerie', destination: '/fr/conception-site-web-algerie', permanent: true },
  { source: '/agence-algerie/prix-conception-logo-algerie', destination: '/fr/conception-logo-algerie', permanent: true },
  { source: '/agence-algerie/branding', destination: '/fr/conception-logo-algerie', permanent: true },
  { source: '/agence-algerie/conception-packaging-emballage-algerie', destination: '/fr/packaging-design-studio', permanent: true },
  { source: '/agence-algerie/agence-algerie/conception-maquette-packaging-emballage-algerie', destination: '/fr/packaging-design-studio', permanent: true },
  { source: '/agence-algerie/prix-conception-packaging-emballage-algerie-maquette', destination: '/fr/packaging-design-studio', permanent: true },
  { source: '/agence-algerie/tarifs-conception-graphique-algerie', destination: '/fr/conception-graphique-algerie', permanent: true },
  // Catch-all (must stay last): any other legacy path goes to the French home.
  { source: '/agence-algerie/:path*', destination: '/fr', permanent: true },
  { source: '/algerie/:path*', destination: '/fr', permanent: true },
];

export default redirects;
