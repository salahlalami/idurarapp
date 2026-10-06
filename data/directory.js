// Company directory (Europages-style): category -> sub-category -> company.
// URLs: /<lang>/<directory slug>/<segment>/<slug> (segments in lib/collections.js).
// `logo` is an optional image URL; without it the card shows colored initials.

export const directoryCategories = [
  {
    id: 'it',
    color: '#1677ff',
    translations: {
      en: { slug: 'it-services', title: 'IT & Software', description: 'Software publishers, agencies and hosting providers.' },
      fr: { slug: 'informatique', title: 'Informatique & Logiciels', description: 'Éditeurs de logiciels, agences et hébergeurs.' },
      ar: { slug: 'tiqniyat', title: 'تقنية المعلومات والبرمجيات', description: 'ناشرو البرمجيات والوكالات ومزودو الاستضافة.' },
    },
  },
  {
    id: 'industry',
    color: '#fa8c16',
    translations: {
      en: { slug: 'industry', title: 'Industry & Manufacturing', description: 'Manufacturers, machinery and packaging.' },
      fr: { slug: 'industrie', title: 'Industrie & Fabrication', description: 'Fabricants, machines et emballage.' },
      ar: { slug: 'sinaa', title: 'الصناعة والتصنيع', description: 'المصنّعون والآلات والتغليف.' },
    },
  },
  {
    id: 'business',
    color: '#13a8a8',
    translations: {
      en: { slug: 'business-services', title: 'Business Services', description: 'Consulting, accounting and logistics.' },
      fr: { slug: 'services-aux-entreprises', title: 'Services aux entreprises', description: 'Conseil, comptabilité et logistique.' },
      ar: { slug: 'khadamat-al-shirkat', title: 'خدمات الأعمال', description: 'الاستشارات والمحاسبة والخدمات اللوجستية.' },
    },
  },
];

export const directorySubcategories = [
  {
    id: 'software-publishers', category: 'it',
    translations: {
      en: { slug: 'software-publishers', title: 'Software publishers', description: 'ERP, CRM and business applications.' },
      fr: { slug: 'editeurs-de-logiciels', title: 'Éditeurs de logiciels', description: 'ERP, CRM et applications métier.' },
      ar: { slug: 'nashiru-al-barmajiyat', title: 'ناشرو البرمجيات', description: 'أنظمة ERP وCRM وتطبيقات الأعمال.' },
    },
  },
  {
    id: 'web-agencies', category: 'it',
    translations: {
      en: { slug: 'web-agencies', title: 'Web agencies', description: 'Websites, apps and digital marketing.' },
      fr: { slug: 'agences-web', title: 'Agences web', description: 'Sites, applications et marketing digital.' },
      ar: { slug: 'wakalat-al-web', title: 'وكالات الويب', description: 'مواقع وتطبيقات وتسويق رقمي.' },
    },
  },
  {
    id: 'machinery', category: 'industry',
    translations: {
      en: { slug: 'machinery', title: 'Machinery & equipment', description: 'Industrial machines and spare parts.' },
      fr: { slug: 'machines-equipements', title: 'Machines & équipements', description: 'Machines industrielles et pièces détachées.' },
      ar: { slug: 'alat-wa-mua-dat', title: 'الآلات والمعدات', description: 'آلات صناعية وقطع غيار.' },
    },
  },
  {
    id: 'packaging', category: 'industry',
    translations: {
      en: { slug: 'packaging', title: 'Packaging', description: 'Boxes, labels and protective packaging.' },
      fr: { slug: 'emballage', title: 'Emballage', description: 'Cartons, étiquettes et emballages de protection.' },
      ar: { slug: 'al-taghlif', title: 'التغليف', description: 'علب وملصقات وتغليف واقٍ.' },
    },
  },
  {
    id: 'consulting', category: 'business',
    translations: {
      en: { slug: 'consulting', title: 'Consulting', description: 'Management and strategy consultants.' },
      fr: { slug: 'conseil', title: 'Conseil', description: 'Consultants en gestion et stratégie.' },
      ar: { slug: 'istisharat', title: 'الاستشارات', description: 'مستشارو الإدارة والاستراتيجية.' },
    },
  },
  {
    id: 'logistics', category: 'business',
    translations: {
      en: { slug: 'logistics', title: 'Logistics & transport', description: 'Freight, warehousing and delivery.' },
      fr: { slug: 'logistique-transport', title: 'Logistique & transport', description: 'Fret, entreposage et livraison.' },
      ar: { slug: 'lujistiyat', title: 'اللوجستيات والنقل', description: 'الشحن والتخزين والتوصيل.' },
    },
  },
];

// Shared fields: name, sub (sub-category id), logo, website, email, phone, city, country, founded, employees.
const company = (id, sub, color, shared, en, fr, ar) => ({
  id, sub, color, ...shared,
  translations: {
    en: { slug: id, ...en },
    fr: { slug: id, ...fr },
    ar: { slug: id, ...ar },
  },
});

export const directoryCompanies = [
  company('idurar', 'software-publishers', '#722ed1',
    { title: 'IDURAR', website: 'https://idurar.com', email: 'hello@idurar.com', phone: '+212 600 000 001', city: 'Casablanca', country: 'Morocco', founded: 2020, employees: '11-50', tags: ['ERP', 'CRM', 'Open source'] },
    { description: 'Open-source ERP and CRM for invoices, quotes and customers.', content: ['IDURAR builds open-source business software for small and mid-sized companies.', 'Self-hosted or cloud, with a growing community of contributors.'] },
    { description: 'ERP et CRM open source pour factures, devis et clients.', content: ['IDURAR développe des logiciels de gestion open source pour les PME.', 'Auto-hébergé ou cloud, avec une communauté de contributeurs grandissante.'] },
    { description: 'نظام ERP وCRM مفتوح المصدر للفواتير وعروض الأسعار والعملاء.', content: ['تطوّر IDURAR برمجيات إدارة مفتوحة المصدر للشركات الصغيرة والمتوسطة.', 'استضافة ذاتية أو سحابية مع مجتمع مساهمين متنامٍ.'] }),
  company('nordsoft', 'software-publishers', '#2f54eb',
    { title: 'Nordsoft GmbH', website: 'https://example.com/nordsoft', email: 'info@nordsoft.example', phone: '+49 30 1234 5678', city: 'Berlin', country: 'Germany', founded: 2009, employees: '51-200', tags: ['Accounting', 'SaaS'] },
    { description: 'Accounting and payroll software for European SMEs.', content: ['Nordsoft publishes cloud accounting and payroll tools used by 5,000 companies.'] },
    { description: 'Logiciels de comptabilité et de paie pour les PME européennes.', content: ['Nordsoft édite des outils cloud de comptabilité et de paie utilisés par 5 000 entreprises.'] },
    { description: 'برمجيات محاسبة ورواتب للشركات الأوروبية الصغيرة والمتوسطة.', content: ['تنشر Nordsoft أدوات محاسبة ورواتب سحابية تستخدمها 5000 شركة.'] }),
  company('pixelforge', 'web-agencies', '#eb2f96',
    { title: 'PixelForge', website: 'https://example.com/pixelforge', email: 'contact@pixelforge.example', phone: '+33 1 23 45 67 89', city: 'Lyon', country: 'France', founded: 2015, employees: '11-50', tags: ['Next.js', 'Design', 'SEO'] },
    { description: 'Digital agency building fast websites and web apps.', content: ['PixelForge designs and develops websites, e-commerce stores and web apps.'] },
    { description: 'Agence digitale créant sites et applications web performants.', content: ['PixelForge conçoit et développe sites, boutiques en ligne et applications web.'] },
    { description: 'وكالة رقمية تبني مواقع وتطبيقات ويب سريعة.', content: ['تصمّم PixelForge وتطوّر المواقع والمتاجر الإلكترونية وتطبيقات الويب.'] }),
  company('atlasdigital', 'web-agencies', '#f5222d',
    { title: 'Atlas Digital', website: 'https://example.com/atlas', email: 'hello@atlasdigital.example', phone: '+212 522 000 000', city: 'Casablanca', country: 'Morocco', founded: 2018, employees: '1-10', tags: ['Marketing', 'Branding'] },
    { description: 'Digital marketing and branding studio.', content: ['Atlas Digital helps brands grow with content, ads and social media.'] },
    { description: 'Studio de marketing digital et de branding.', content: ['Atlas Digital aide les marques à grandir grâce au contenu, à la publicité et aux réseaux sociaux.'] },
    { description: 'استوديو تسويق رقمي وهوية بصرية.', content: ['تساعد Atlas Digital العلامات التجارية على النمو عبر المحتوى والإعلانات ومواقع التواصل.'] }),
  company('ferromec', 'machinery', '#fa8c16',
    { title: 'Ferromec', website: 'https://example.com/ferromec', email: 'sales@ferromec.example', phone: '+39 02 1234 5678', city: 'Milan', country: 'Italy', founded: 1987, employees: '201-500', tags: ['CNC', 'Spare parts'] },
    { description: 'CNC machines and industrial spare parts.', content: ['Ferromec manufactures CNC machines and supplies spare parts across Europe.'] },
    { description: 'Machines CNC et pièces détachées industrielles.', content: ['Ferromec fabrique des machines CNC et fournit des pièces détachées dans toute l’Europe.'] },
    { description: 'آلات CNC وقطع غيار صناعية.', content: ['تصنّع Ferromec آلات CNC وتورّد قطع الغيار في أنحاء أوروبا.'] }),
  company('packwell', 'packaging', '#a0d911',
    { title: 'Packwell', website: 'https://example.com/packwell', email: 'orders@packwell.example', phone: '+34 91 123 45 67', city: 'Madrid', country: 'Spain', founded: 2001, employees: '51-200', tags: ['Eco-friendly', 'Cardboard'] },
    { description: 'Eco-friendly cardboard and protective packaging.', content: ['Packwell produces recyclable boxes and custom packaging for e-commerce.'] },
    { description: 'Cartons écologiques et emballages de protection.', content: ['Packwell produit des cartons recyclables et des emballages sur mesure pour l’e-commerce.'] },
    { description: 'كرتون صديق للبيئة وتغليف واقٍ.', content: ['تنتج Packwell علباً قابلة لإعادة التدوير وتغليفاً مخصصاً للتجارة الإلكترونية.'] }),
  company('stratevo', 'consulting', '#13a8a8',
    { title: 'Stratevo', website: 'https://example.com/stratevo', email: 'team@stratevo.example', phone: '+44 20 7946 0000', city: 'London', country: 'United Kingdom', founded: 2012, employees: '11-50', tags: ['Strategy', 'Growth'] },
    { description: 'Strategy consulting for growing companies.', content: ['Stratevo supports leadership teams with strategy, operations and growth plans.'] },
    { description: 'Conseil en stratégie pour entreprises en croissance.', content: ['Stratevo accompagne les dirigeants en stratégie, opérations et plans de croissance.'] },
    { description: 'استشارات استراتيجية للشركات النامية.', content: ['تدعم Stratevo فرق القيادة في الاستراتيجية والعمليات وخطط النمو.'] }),
  company('transmed', 'logistics', '#096dd9',
    { title: 'TransMed Logistics', website: 'https://example.com/transmed', email: 'ops@transmed.example', phone: '+212 539 000 000', city: 'Tangier', country: 'Morocco', founded: 2005, employees: '201-500', tags: ['Freight', 'Warehousing'] },
    { description: 'Road and sea freight between Europe and Africa.', content: ['TransMed Logistics operates freight lines and warehouses around the Mediterranean.'] },
    { description: 'Fret routier et maritime entre l’Europe et l’Afrique.', content: ['TransMed Logistics exploite des lignes de fret et des entrepôts autour de la Méditerranée.'] },
    { description: 'شحن بري وبحري بين أوروبا وأفريقيا.', content: ['تشغّل TransMed Logistics خطوط شحن ومستودعات حول البحر المتوسط.'] }),
];
