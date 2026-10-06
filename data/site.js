// Site-specific content shared by the home page and footer.
export const cities = ['Oran', 'Alger', 'Sétif', 'Annaba', 'Constantine', 'Tlemcen', 'Mostaganem', 'Béjaïa', 'Bordj Bou Arréridj'];

// pageId matches an id in data/pages.js.
export const services = [
  { pageId: 'packaging', icon: 'GiftOutlined', text: { fr: 'Étiquettes, sachets, boîtes et cartons prêts pour la production.', en: 'Labels, pouches, boxes and cartons, production-ready.', ar: 'ملصقات وأكياس وعلب وكراتين جاهزة للإنتاج.' } },
  { pageId: 'branding', icon: 'BgColorsOutlined', text: { fr: 'Logo et charte graphique orientés marketing de marque.', en: 'Logo and brand guidelines driven by brand marketing.', ar: 'شعار ودليل هوية بصرية بمنهج تسويقي.' } },
  { pageId: 'graphic-design', icon: 'PictureOutlined', text: { fr: 'Flyers, dépliants, affiches et supports de communication.', en: 'Flyers, brochures, posters and communication materials.', ar: 'منشورات وكتيبات وملصقات ووسائل تواصل.' } },
  { pageId: 'web', icon: 'GlobalOutlined', text: { fr: 'Sites web modernes, rapides et optimisés SEO.', en: 'Modern, fast, SEO-friendly websites.', ar: 'مواقع حديثة وسريعة ومتوافقة مع SEO.' } },
];

export const gallery = [
  'packaging-algerie', 'conception-emballage-algerie', 'maquette-emballage-algerie', 'conception-maquette-algerie',
  'conception-maquette-emballage-algerie', 'boite-de-communication-algerie', 'agence-publicite-algerie', 'agence-publicitaire-algerie',
  'boite-communication-algerie-01', 'boite-communication-algerie-02', 'boite-communication-algerie-06', 'agence-communication-algerie-03',
].map((f) => `/portfolio/${f}.jpg`);

export const siteText = {
  fr: { services: 'Nos services', portfolio: 'Réalisations', studio: 'Le studio', studioText: 'IDURAR travaille à distance avec des clients dans toute l’Algérie, avec un service local à :', cta: 'Démarrer un projet', ctaText: 'Parlez-nous de votre projet de packaging, logo ou site web.', address: 'Adresse', tel: 'Tél', links: 'Services' },
  en: { services: 'Our services', portfolio: 'Our work', studio: 'The studio', studioText: 'IDURAR works remotely with clients across Algeria, with local service in:', cta: 'Start a project', ctaText: 'Tell us about your packaging, logo or website project.', address: 'Address', tel: 'Tel', links: 'Services' },
  ar: { services: 'خدماتنا', portfolio: 'أعمالنا', studio: 'الاستوديو', studioText: 'تعمل IDURAR عن بعد مع عملاء في كل الجزائر، مع خدمة محلية في:', cta: 'ابدأ مشروعاً', ctaText: 'حدثنا عن مشروع التغليف أو الشعار أو الموقع.', address: 'العنوان', tel: 'الهاتف', links: 'الخدمات' },
};

const pf = (n) => `/portfolio/${n}.jpg`;
const dir = (d, names) => names.map((n) => `/portfolio/${d}/${n}`);
// Images shown under the content of a page, keyed by page id.
export const pageImages = {
  about: ['packaging-algerie', 'agence-communication-algerie-03', 'conception-emballage-algerie'].map(pf),
  packaging: ['packaging-algerie', 'conception-emballage-algerie', 'maquette-emballage-algerie', 'conception-maquette-algerie', 'conception-maquette-emballage-algerie', 'boite-de-communication-algerie', 'agence-publicite-algerie', 'agence-publicitaire-algerie', 'boite-communication-algerie-01', 'boite-communication-algerie-02', 'boite-communication-algerie-06', 'agence-communication-algerie-03', 'agence-communication-algerie-04'].map(pf),
  branding: dir('logo', ['conception_logo_algerie_0000.jpg', 'conception_logo_algerie_0001.jpg', 'conception_logo_algerie_0002.jpg', 'conception_logo_algerie_0003.jpg', 'conception_logo_algerie_0004.jpg', 'conception_logo_algerie_0005.jpg', 'conception_logo_algerie_0006.jpg', 'conception_logo_algerie_0008.jpg', 'conception_logo_algerie_0009.jpg', 'conception_logo_algerie_0011.jpg', 'conception_logo_algerie_0012.jpg', 'conception_logo_algerie_0013.jpg', 'conception_logo_algerie_0014.jpg', 'conception_logo_algerie_0015.jpg', 'conception_logo_algerie_0016.jpg', 'conception_logo_algerie_0017.jpg', 'conception_logo_algerie_0018.jpg', 'conception_logo_algerie_0019.jpg', 'conception_logo_algerie_0022.jpg', 'conception_logo_algerie_0023.jpg', 'conception_logo_algerie_0024.jpg', 'conception_logo_algerie_0025.jpg', 'conception_logo_algerie_0026.jpg', 'conception_logo_algerie_0027.jpg', 'conception_logo_algerie_0028.jpg', 'conception_logo_algerie_0029.jpg', 'conception_logo_algerie_0030.jpg', 'conception_logo_algerie_0031.jpg', 'conception_logo_algerie_0032.jpg', 'conception_logo_algerie_0033.jpg', 'conception_logo_algerie_0034_1.jpg', 'conception_logo_algerie_0035.jpg', 'creation_logo_algerie_01.jpg', 'creation_logo_algerie_02.jpg', 'creation_logo_algerie_03.jpg', 'creation_logo_algerie_04.jpg', 'creation_logo_algerie_05.jpg', 'creation_logo_algerie_06.jpg']),
  'graphic-design': dir('graphic', ['agence_communication_algerie_01.jpg', 'agence_communication_algerie_02.jpg', 'agence_communication_algerie_03.jpg', 'agence_communication_algerie_04.jpg', 'agence_communication_algerie_05.jpg', 'agence_communication_algerie_06.jpg', 'agence_communication_algerie_07.jpg', 'agence_communication_algerie_08.jpg', 'agence_communication_algerie_09.jpg', 'agence_communication_algerie_10.jpg', 'boite_communication_algerie_11.jpg', 'boite_communication_algerie_12.jpg', 'boite_communication_algerie_13.jpg', 'boite_communication_algerie_16.jpg', 'boite_communication_algerie_18.jpg', 'boite_communication_algerie_19.jpg', 'boite_communication_algerie_20.jpg', 'boite_communication_algerie_21.jpg', 'boite_communication_algerie_22.jpg']),
  web: dir('web', ['agence-conception-site-web-alger.jpg', 'agence-web-alger.jpg', 'agence-web-oran-algerie.png', 'agence_web_algerie.jpg', 'conception-de-site-web-alger.jpg', 'conception-site-internet-algerie.jpg', 'conception-site-web-algerie.jpg', 'conception_site_internet-algerie.jpg', 'conception_site_web_alger.jpg', 'creation-de-site-internet-oran.jpg', 'creation-site-internet-algerie.jpg', 'creation-site-web-oran-algerie.jpg', 'creation-site-web-oran.jpg', 'creation_de_site_web_algerie.jpg', 'creation_site_web_algerie.jpg']),
};
