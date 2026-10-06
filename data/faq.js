// FAQ groups; each item has a localized question (q) and answer (a).
const faq = [
  {
    id: 'general',
    translations: { en: 'General', fr: 'Général', ar: 'عام' },
    items: [
      {
        en: { q: 'What is IDURAR?', a: 'An open-source ERP & CRM to manage invoices, quotes and customers in one place.' },
        fr: { q: 'Qu’est-ce qu’IDURAR ?', a: 'Un ERP & CRM open source pour gérer factures, devis et clients au même endroit.' },
        ar: { q: 'ما هو IDURAR؟', a: 'نظام ERP وCRM مفتوح المصدر لإدارة الفواتير وعروض الأسعار والعملاء في مكان واحد.' },
      },
      {
        en: { q: 'Can I try it for free?', a: 'Yes. The **Starter** plan is free and you can upgrade at any time. See [pricing](/en/pricing).' },
        fr: { q: 'Puis-je l’essayer gratuitement ?', a: 'Oui. L’offre Starter est gratuite et vous pouvez changer d’offre à tout moment.' },
        ar: { q: 'هل يمكنني تجربته مجاناً؟', a: 'نعم. الخطة المبتدئة مجانية ويمكنك الترقية في أي وقت.' },
      },
    ],
  },
  {
    id: 'billing',
    translations: { en: 'Billing & orders', fr: 'Facturation et commandes', ar: 'الفوترة والطلبات' },
    items: [
      {
        en: { q: 'Which payment methods do you accept?', a: 'Pay on delivery and bank transfer. Online card payments are not available yet.' },
        fr: { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Paiement à la livraison et virement bancaire. Le paiement par carte n’est pas encore disponible.' },
        ar: { q: 'ما طرق الدفع المتاحة؟', a: 'الدفع عند الاستلام والحوالة البنكية. الدفع بالبطاقة غير متاح بعد.' },
      },
      {
        en: { q: 'How do I get support?', a: 'Use the contact page. Pro and Enterprise plans include email support.' },
        fr: { q: 'Comment obtenir de l’aide ?', a: 'Utilisez la page de contact. Les offres Pro et Entreprise incluent le support par e-mail.' },
        ar: { q: 'كيف أحصل على الدعم؟', a: 'استخدم صفحة التواصل. تشمل خطتا المحترف والمؤسسات الدعم عبر البريد.' },
      },
    ],
  },
];

export default faq;
