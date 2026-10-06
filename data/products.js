// Products. `price` is in major currency units. URL: /<lang>/<shop slug>/<translation slug>
const products = [
  {
    id: 'erp-license', category: 'software', price: 199, currency: 'USD', sku: 'SW-ERP-01', stock: 50, color: '#1677ff',
    translations: {
      en: { slug: 'erp-license', title: 'ERP license', description: 'Lifetime license for one company.', content: ['Invoices, quotes, payments and reports.', 'Includes one year of updates.'] },
      fr: { slug: 'licence-erp', title: 'Licence ERP', description: 'Licence à vie pour une entreprise.', content: ['Factures, devis, paiements et rapports.', 'Un an de mises à jour inclus.'] },
      ar: { slug: 'tarkhis-erp', title: 'ترخيص ERP', description: 'ترخيص دائم لشركة واحدة.', content: ['فواتير وعروض أسعار ومدفوعات وتقارير.', 'يشمل سنة من التحديثات.'] },
    },
  },
  {
    id: 'crm-license', category: 'software', price: 149, currency: 'USD', sku: 'SW-CRM-01', stock: 50, color: '#722ed1',
    translations: {
      en: { slug: 'crm-license', title: 'CRM license', description: 'Customer and deal management.', content: ['Contacts, deals and pipeline views.', 'Includes one year of updates.'] },
      fr: { slug: 'licence-crm', title: 'Licence CRM', description: 'Gestion des clients et des affaires.', content: ['Contacts, affaires et vues pipeline.', 'Un an de mises à jour inclus.'] },
      ar: { slug: 'tarkhis-crm', title: 'ترخيص CRM', description: 'إدارة العملاء والصفقات.', content: ['جهات الاتصال والصفقات وعروض المسار.', 'يشمل سنة من التحديثات.'] },
    },
  },
  {
    id: 'bundle', category: 'software', price: 299, currency: 'USD', sku: 'SW-BND-01', stock: 20, color: '#d4380d',
    translations: {
      en: { slug: 'erp-crm-bundle', title: 'ERP + CRM bundle', description: 'Both licenses at a discount.', content: ['Everything in ERP and CRM licenses.', 'Save $49 compared to buying separately.'] },
      fr: { slug: 'pack-erp-crm', title: 'Pack ERP + CRM', description: 'Les deux licences à prix réduit.', content: ['Tout le contenu des licences ERP et CRM.', 'Économisez 49 $ par rapport à l’achat séparé.'] },
      ar: { slug: 'hazmat-erp-crm', title: 'حزمة ERP + CRM', description: 'الترخيصان معاً بخصم.', content: ['كل ما في ترخيصي ERP وCRM.', 'وفّر 49$ مقارنة بالشراء منفصلاً.'] },
    },
  },
  {
    id: 'setup-service', category: 'services', price: 450, currency: 'USD', sku: 'SV-SET-01', stock: 10, color: '#13a8a8',
    translations: {
      en: { slug: 'setup-service', title: 'Installation & setup', description: 'We install and configure everything.', content: ['Server setup, data import and configuration.', 'Delivered within 5 working days.'] },
      fr: { slug: 'installation', title: 'Installation et configuration', description: 'Nous installons et configurons tout.', content: ['Serveur, import de données et paramétrage.', 'Livré sous 5 jours ouvrés.'] },
      ar: { slug: 'khidmat-altathbeet', title: 'التثبيت والإعداد', description: 'نقوم بتثبيت وإعداد كل شيء.', content: ['إعداد الخادم واستيراد البيانات والتهيئة.', 'التسليم خلال 5 أيام عمل.'] },
    },
  },
  {
    id: 'training-service', category: 'services', price: 280, currency: 'USD', sku: 'SV-TRN-01', stock: 0, color: '#faad14',
    translations: {
      en: { slug: 'team-training', title: 'Team training', description: 'Half-day online training for your team.', content: ['Live session tailored to your workflow.', 'Recording included.'] },
      fr: { slug: 'formation-equipe', title: 'Formation d’équipe', description: 'Demi-journée de formation en ligne.', content: ['Session en direct adaptée à vos usages.', 'Enregistrement inclus.'] },
      ar: { slug: 'tadrib-alfariq', title: 'تدريب الفريق', description: 'تدريب عبر الإنترنت لنصف يوم.', content: ['جلسة مباشرة مخصصة لسير عملك.', 'يشمل التسجيل.'] },
    },
  },
];

export default products;
