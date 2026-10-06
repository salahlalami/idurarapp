// Open positions. URL: /<lang>/<careers index slug>/<translation slug>
// `type` is a schema.org employmentType. Remove an entry when the role is filled.
const jobs = [
  {
    id: 'frontend-engineer',
    type: 'FULL_TIME',
    remote: true,
    postedOn: '2026-06-01',
    color: '#722ed1',
    translations: {
      en: { slug: 'frontend-engineer', title: 'Frontend Engineer', department: 'Engineering', location: 'Remote',
        description: 'Build fast, accessible interfaces with React and Next.js.',
        content: ['You will own features end to end, from design to release.', 'We value clean code, accessibility and clear communication.'] },
      fr: { slug: 'ingenieur-frontend', title: 'Ingénieur Frontend', department: 'Ingénierie', location: 'À distance',
        description: 'Créez des interfaces rapides et accessibles avec React et Next.js.',
        content: ['Vous porterez des fonctionnalités de la conception à la mise en production.', 'Nous valorisons un code propre, l’accessibilité et une communication claire.'] },
      ar: { slug: 'muhandis-wajihat', title: 'مهندس واجهات أمامية', department: 'الهندسة', location: 'عن بُعد',
        description: 'ابنِ واجهات سريعة ويسهل الوصول إليها باستخدام React وNext.js.',
        content: ['ستتولى المزايا من التصميم حتى الإطلاق.', 'نقدّر الشيفرة النظيفة وسهولة الوصول والتواصل الواضح.'] },
    },
  },
  {
    id: 'customer-success',
    type: 'FULL_TIME',
    remote: false,
    postedOn: '2026-06-15',
    color: '#13a8a8',
    translations: {
      en: { slug: 'customer-success-manager', title: 'Customer Success Manager', department: 'Customer', location: 'Casablanca',
        description: 'Help customers get the most out of the product.',
        content: ['You will onboard new customers and answer their questions.', 'You will relay feedback to the product team.'] },
      fr: { slug: 'responsable-succes-client', title: 'Responsable Succès Client', department: 'Client', location: 'Casablanca',
        description: 'Aidez les clients à tirer le meilleur du produit.',
        content: ['Vous accompagnerez les nouveaux clients et répondrez à leurs questions.', 'Vous remonterez les retours à l’équipe produit.'] },
      ar: { slug: 'mudir-najah-al-umala', title: 'مدير نجاح العملاء', department: 'العملاء', location: 'الدار البيضاء',
        description: 'ساعد العملاء على الاستفادة القصوى من المنتج.',
        content: ['ستستقبل العملاء الجدد وتجيب عن أسئلتهم.', 'ستنقل الملاحظات إلى فريق المنتج.'] },
    },
  },
];

export default jobs;
