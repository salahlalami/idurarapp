// Blog posts. URL: /<lang>/<blog index slug>/<translation slug>
// `color` drives the placeholder cover; swap for `image` once real assets exist.
const posts = [
  {
    id: 'hello-world',
    date: '2026-01-15',
    color: '#1677ff',
    tags: ['news'],
    translations: {
      en: { slug: 'hello-world', title: 'Hello world', description: 'Our first blog post.',
        content: ['This is the **first** post, with *italic*, ~~strike~~ and `inline code`.', 'It is rendered by the blog layout.', '## Markdown test\n\n- A list item with a [link](https://idurar.com)\n- Another item\n\n> A blockquote.\n\n| Col A | Col B |\n|---|---|\n| 1 | 2 |\n\n```js\nconsole.log("hi");\n```'] },
      fr: { slug: 'bonjour-le-monde', title: 'Bonjour le monde', description: 'Notre premier article de blog.',
        content: ['Ceci est le premier article.', 'Il est rendu par le layout blog.'] },
      ar: { slug: 'marhaban-bil-alam', title: 'مرحباً بالعالم', description: 'أول مقال في مدونتنا.',
        content: ['هذا هو المقال الأول.', 'يتم عرضه بواسطة تخطيط المدونة.'] },
    },
  },
  {
    id: 'invoicing-tips',
    date: '2026-02-10',
    color: '#13a8a8',
    tags: ['guides', 'invoicing'],
    translations: {
      en: { slug: 'invoicing-tips', title: '5 tips for faster invoicing', description: 'Get paid sooner with a few simple habits.',
        content: ['Send invoices the day work is delivered.', 'Use clear payment terms and reminders.', 'Offer more than one payment method.'] },
      fr: { slug: 'conseils-facturation', title: '5 conseils pour facturer plus vite', description: 'Soyez payé plus tôt grâce à quelques habitudes simples.',
        content: ['Envoyez la facture le jour de la livraison.', 'Précisez les conditions de paiement et relancez.', 'Proposez plusieurs moyens de paiement.'] },
      ar: { slug: 'nasaih-al-fawatir', title: '5 نصائح لإصدار الفواتير بسرعة', description: 'احصل على مستحقاتك أسرع بعادات بسيطة.',
        content: ['أرسل الفاتورة يوم تسليم العمل.', 'حدّد شروط الدفع وأرسل تذكيرات.', 'وفّر أكثر من وسيلة دفع.'] },
    },
  },
  {
    id: 'crm-basics',
    date: '2026-03-02',
    color: '#722ed1',
    tags: ['guides', 'crm'],
    translations: {
      en: { slug: 'crm-basics', title: 'CRM basics for small teams', description: 'What to track and what to ignore.',
        content: ['Start with contacts and deals only.', 'Log every conversation in one place.', 'Review the pipeline weekly.'] },
      fr: { slug: 'bases-du-crm', title: 'Les bases du CRM pour petites équipes', description: 'Quoi suivre et quoi ignorer.',
        content: ['Commencez par les contacts et les affaires.', 'Centralisez chaque échange.', 'Revoyez le pipeline chaque semaine.'] },
      ar: { slug: 'asasiyat-crm', title: 'أساسيات إدارة العملاء للفرق الصغيرة', description: 'ماذا تتابع وماذا تتجاهل.',
        content: ['ابدأ بجهات الاتصال والصفقات فقط.', 'سجّل كل محادثة في مكان واحد.', 'راجع مسار المبيعات أسبوعياً.'] },
    },
  },
];

export default posts;
