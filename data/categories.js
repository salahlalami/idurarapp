// Product categories. URL: /<lang>/<shop slug>/<segment>/<translation slug>
const categories = [
  {
    id: 'software',
    color: '#1677ff',
    translations: {
      en: { slug: 'software', title: 'Software', description: 'Licenses and self-hosted editions.' },
      fr: { slug: 'logiciels', title: 'Logiciels', description: 'Licences et éditions auto-hébergées.' },
      ar: { slug: 'barmajiyat', title: 'البرمجيات', description: 'التراخيص والإصدارات المستضافة ذاتياً.' },
    },
  },
  {
    id: 'services',
    color: '#13a8a8',
    translations: {
      en: { slug: 'services', title: 'Services', description: 'Setup, training and support packages.' },
      fr: { slug: 'services', title: 'Services', description: 'Installation, formation et support.' },
      ar: { slug: 'khadamat', title: 'الخدمات', description: 'حزم التثبيت والتدريب والدعم.' },
    },
  },
];

export default categories;
