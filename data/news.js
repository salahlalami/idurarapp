// Company news / press. URL: /<lang>/<news index slug>/<translation slug>
// Rendered with the blog layouts. `color` drives the placeholder cover.
const news = [
  {
    id: 'v2-release',
    date: '2026-04-08',
    color: '#e11d48',
    tags: ['product'],
    translations: {
      en: { slug: 'v2-release', title: 'Version 2.0 is out', description: 'A faster core, new reports and a refreshed interface.',
        content: ['Version 2.0 ships a faster core and a cleaner interface.', 'New reports make it easier to follow cash flow.'] },
      fr: { slug: 'sortie-v2', title: 'La version 2.0 est disponible', description: 'Un cœur plus rapide, de nouveaux rapports et une interface rafraîchie.',
        content: ['La version 2.0 apporte un cœur plus rapide et une interface plus claire.', 'De nouveaux rapports facilitent le suivi de la trésorerie.'] },
      ar: { slug: 'sudur-al-isdar-2', title: 'صدور الإصدار 2.0', description: 'نواة أسرع وتقارير جديدة وواجهة محدّثة.',
        content: ['يقدّم الإصدار 2.0 نواة أسرع وواجهة أوضح.', 'تسهّل التقارير الجديدة متابعة التدفق النقدي.'] },
    },
  },
  {
    id: 'new-office',
    date: '2026-05-20',
    color: '#0ea5e9',
    tags: ['company'],
    translations: {
      en: { slug: 'new-office', title: 'We are opening a new office', description: 'Our team is growing and moving to a bigger space.',
        content: ['We are moving to a bigger office to welcome new teammates.', 'Check our careers page to join us.'] },
      fr: { slug: 'nouveau-bureau', title: 'Nous ouvrons un nouveau bureau', description: 'Notre équipe grandit et emménage dans un espace plus grand.',
        content: ['Nous déménageons dans un bureau plus grand pour accueillir de nouveaux collègues.', 'Consultez notre page carrières pour nous rejoindre.'] },
      ar: { slug: 'maktab-jadid', title: 'نفتتح مكتباً جديداً', description: 'فريقنا يكبر وينتقل إلى مساحة أكبر.',
        content: ['ننتقل إلى مكتب أكبر لاستقبال زملاء جدد.', 'تصفّح صفحة الوظائف للانضمام إلينا.'] },
    },
  },
];

export default news;
