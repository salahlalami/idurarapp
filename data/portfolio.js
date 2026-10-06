// Portfolio showcases. URL: /<lang>/<portfolio index slug>/<translation slug>
const projects = [
  {
    id: 'acme-erp',
    year: 2025,
    color: '#fa541c',
    tags: ['erp', 'web'],
    stack: ['Node.js', 'React', 'MongoDB'],
    url: 'https://example.com',
    translations: {
      en: { slug: 'acme-erp', title: 'Acme ERP rollout', description: 'Invoicing and stock for a 40-person company.', client: 'Acme Corp', role: 'Design & development',
        content: ['Acme replaced spreadsheets with a single system.', 'We migrated 5 years of data and trained the team in two weeks.'] },
      fr: { slug: 'acme-erp', title: 'Déploiement ERP Acme', description: 'Facturation et stock pour une entreprise de 40 personnes.', client: 'Acme Corp', role: 'Conception et développement',
        content: ['Acme a remplacé ses tableurs par un système unique.', 'Nous avons migré 5 ans de données et formé l’équipe en deux semaines.'] },
      ar: { slug: 'acme-erp', title: 'تطبيق نظام ERP لشركة أكمي', description: 'فوترة ومخزون لشركة من 40 موظفاً.', client: 'Acme Corp', role: 'التصميم والتطوير',
        content: ['استبدلت أكمي جداول البيانات بنظام واحد.', 'نقلنا بيانات 5 سنوات ودرّبنا الفريق خلال أسبوعين.'] },
    },
  },
  {
    id: 'bright-crm',
    year: 2025,
    color: '#2f54eb',
    tags: ['crm', 'mobile'],
    stack: ['Next.js', 'Ant Design', 'PostgreSQL'],
    url: 'https://example.com',
    translations: {
      en: { slug: 'bright-crm', title: 'Bright CRM', description: 'A sales pipeline built for field agents.', client: 'Bright Studio', role: 'Product design',
        content: ['A mobile-first CRM for agents on the road.', 'Deals are updated in two taps, even offline.'] },
      fr: { slug: 'bright-crm', title: 'Bright CRM', description: 'Un pipeline de vente pensé pour les commerciaux terrain.', client: 'Bright Studio', role: 'Design produit',
        content: ['Un CRM mobile pour les commerciaux en déplacement.', 'Les affaires se mettent à jour en deux appuis, même hors ligne.'] },
      ar: { slug: 'bright-crm', title: 'برايت CRM', description: 'مسار مبيعات مصمم للمندوبين الميدانيين.', client: 'Bright Studio', role: 'تصميم المنتج',
        content: ['نظام إدارة عملاء للهاتف أولاً للمندوبين المتنقلين.', 'تحديث الصفقات بنقرتين حتى دون اتصال.'] },
    },
  },
  {
    id: 'shopfront',
    year: 2026,
    color: '#389e0d',
    tags: ['ecommerce', 'web'],
    stack: ['Next.js', 'Stripe', 'Sanity'],
    url: 'https://example.com',
    translations: {
      en: { slug: 'shopfront', title: 'Shopfront store', description: 'A fast headless storefront for a local brand.', client: 'Shopfront', role: 'Development',
        content: ['Headless storefront with a 98 Lighthouse score.', 'Content editors publish without developers.'] },
      fr: { slug: 'shopfront', title: 'Boutique Shopfront', description: 'Une vitrine headless rapide pour une marque locale.', client: 'Shopfront', role: 'Développement',
        content: ['Vitrine headless avec un score Lighthouse de 98.', 'Les éditeurs publient sans développeur.'] },
      ar: { slug: 'shopfront', title: 'متجر شوبفرونت', description: 'واجهة متجر سريعة لعلامة محلية.', client: 'Shopfront', role: 'التطوير',
        content: ['واجهة متجر منفصلة بدرجة Lighthouse 98.', 'ينشر المحررون دون مطورين.'] },
    },
  },
];

export default projects;
