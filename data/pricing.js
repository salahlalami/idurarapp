// Pricing plans. `price` is per month; `yearly` is the per-month price when billed yearly.
// `price: null` means "custom" (contact us). `features` are keys of `featureList`.
export const currency = 'USD';

export const plans = [
  {
    id: 'starter',
    price: 0,
    yearly: 0,
    features: ['invoices', 'customers', 'community'],
    translations: {
      en: { name: 'Starter', blurb: 'For freelancers getting started.', cta: 'Get started' },
      fr: { name: 'Starter', blurb: 'Pour les indépendants qui démarrent.', cta: 'Commencer' },
      ar: { name: 'المبتدئ', blurb: 'للمستقلين في البداية.', cta: 'ابدأ الآن' },
    },
  },
  {
    id: 'pro',
    popular: true,
    price: 29,
    yearly: 24,
    features: ['invoices', 'customers', 'community', 'quotes', 'reports', 'email'],
    translations: {
      en: { name: 'Pro', blurb: 'For growing teams.', cta: 'Choose Pro' },
      fr: { name: 'Pro', blurb: 'Pour les équipes en croissance.', cta: 'Choisir Pro' },
      ar: { name: 'المحترف', blurb: 'للفرق المتنامية.', cta: 'اختر المحترف' },
    },
  },
  {
    id: 'enterprise',
    price: null,
    yearly: null,
    features: ['invoices', 'customers', 'community', 'quotes', 'reports', 'email', 'sso', 'sla'],
    translations: {
      en: { name: 'Enterprise', blurb: 'Custom needs and support.', cta: 'Contact sales' },
      fr: { name: 'Entreprise', blurb: 'Besoins et support sur mesure.', cta: 'Contacter les ventes' },
      ar: { name: 'المؤسسات', blurb: 'احتياجات ودعم مخصصان.', cta: 'تواصل مع المبيعات' },
    },
  },
];

export const featureList = {
  invoices: { en: 'Unlimited invoices', fr: 'Factures illimitées', ar: 'فواتير غير محدودة' },
  customers: { en: 'Customer management', fr: 'Gestion des clients', ar: 'إدارة العملاء' },
  community: { en: 'Community support', fr: 'Support communautaire', ar: 'دعم المجتمع' },
  quotes: { en: 'Quotes & offers', fr: 'Devis et offres', ar: 'عروض الأسعار' },
  reports: { en: 'Advanced reports', fr: 'Rapports avancés', ar: 'تقارير متقدمة' },
  email: { en: 'Email support', fr: 'Support par e-mail', ar: 'دعم عبر البريد' },
  sso: { en: 'Single sign-on (SSO)', fr: 'Authentification unique (SSO)', ar: 'تسجيل الدخول الموحد' },
  sla: { en: 'Dedicated SLA', fr: 'SLA dédié', ar: 'اتفاقية مستوى خدمة مخصصة' },
};
