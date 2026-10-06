// One entry per logical page. `layout` selects the layout in @/layout.
// `slug` is localized per language; an empty slug ('') is the language home.
// A page is only generated for languages that have a translation.
const pages = [
  {
    id: "home",
    showInNav: false,
    layout: "home",
    translations: {
      en: {
        slug: "",
        title: "Packaging Design Algeria - Packaging & Branding",
        description:
          "Premium packaging and branding studio based in Oran, from the first idea to the final production file.",
        content: [
          "Labels, food packaging, boxes and mockups tailored to your brand.",
          "Brand strategy combined with strict respect for industrial standards.",
          "Local service in nine Algerian cities, remote work everywhere.",
        ],
      },
      fr: {
        slug: "",
        title: "Conception de Packaging Algérie - Design Emballage & Branding",
        description:
          "Studio de design et conception graphique packaging premium, basé à Oran : de l’idée initiale jusqu’à la réalisation finale.",
        content: [
          "Étiquettes, emballages alimentaires, boîtes et maquettes sur mesure.",
          "Stratégie marketing de marque et respect rigoureux des normes industrielles.",
          "Service local dans neuf villes d’Algérie, travail à distance partout.",
        ],
      },
      ar: {
        slug: "",
        title: "تصميم التغليف في الجزائر - التغليف والهوية البصرية",
        description:
          "استوديو متميز لتصميم التغليف والهوية البصرية في وهران، الجزائر: من الفكرة الأولى إلى ملف الإنتاج النهائي.",
        content: [
          "ملصقات وتغليف غذائي وعلب ونماذج حسب الطلب لعلامتك.",
          "استراتيجية العلامة مع احترام صارم للمعايير الصناعية.",
          "خدمة محلية في تسع مدن جزائرية، وعمل عن بعد في كل مكان.",
        ],
      },
    },
  },
  {
    id: "about",
    showInNav: false,
    layout: "default",
    translations: {
      en: {
        slug: "about",
        title: "About IDURAR - Design Studio in Oran, Algeria",
        description: "Learn more about our team and mission.",
        content: [
          "**IDURAR** is a design studio based in **Oran**, Algeria, specialised in **packaging design**, **logo design** and **branding / visual identity** for companies across Algeria.",
          "We support packaging from the first idea to the production-ready file (labels, pouches, boxes, cartons), respecting industrial and food standards, with a brand-marketing approach.",
          "**Service area**: Oran, Algiers, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa and Bordj Bou Arréridj. Every project can be delivered remotely from the Oran studio, wherever you are in Algeria. On-site visits by the designer are possible for an extra fee.",
        ],
      },
      fr: {
        slug: "a-propos",
        title: "À propos d’IDURAR - Studio de Design à Oran, Algérie",
        description: "Découvrez notre équipe et notre mission.",
        content: [
          "**IDURAR** est un studio de design basé à **Oran**, en Algérie, spécialisé dans la **conception de packaging**, la **conception de logo** et le **branding / identité visuelle** pour des entreprises dans toute l’Algérie.",
          "Nous accompagnons le packaging depuis l’idée jusqu’au fichier prêt pour la production (étiquettes, sachets, boîtes, cartons), en tenant compte des normes industrielles et alimentaires, avec une approche orientée marketing de marque.",
          "**Zone de service** : Oran, Alger, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa et Bordj Bou Arréridj. Les projets peuvent tous être réalisés à distance depuis le studio d’Oran, où que vous soyez en Algérie. Un déplacement du designer sur place reste possible moyennant un supplément.",
        ],
      },
      ar: {
        slug: "من-نحن",
        title: "من نحن - IDURAR استوديو تصميم في وهران، الجزائر",
        description: "تعرّف على فريقنا ومهمتنا.",
        content: [
          "**IDURAR** استوديو تصميم في **وهران** بالجزائر، متخصص في **تصميم التغليف** و**الشعارات** و**الهوية البصرية** لشركات في كل أنحاء الجزائر.",
          "نرافق مشروع التغليف من الفكرة حتى الملف الجاهز للإنتاج (ملصقات، أكياس، علب، كراتين) مع احترام المعايير الصناعية والغذائية وبمنهج تسويقي للعلامة.",
          "**منطقة الخدمة**: وهران، الجزائر العاصمة، سطيف، عنابة، قسنطينة، تلمسان، مستغانم، بجاية وبرج بوعريريج. يمكن إنجاز كل المشاريع عن بعد من استوديو وهران.",
        ],
      },
    },
  },
  {
    id: "blog",
    showInNav: false,
    layout: "blogList",
    translations: {
      en: {
        slug: "blog",
        title: "Blog",
        description: "News, guides and tips.",
        content: [],
      },
      fr: {
        slug: "blog",
        title: "Blog",
        description: "Actualités, guides et conseils.",
        content: [],
      },
      ar: {
        slug: "مدونة",
        title: "المدونة",
        description: "أخبار وأدلة ونصائح.",
        content: [],
      },
    },
  },
  {
    id: "portfolio",
    showInNav: false,
    layout: "portfolioList",
    translations: {
      en: {
        slug: "portfolio",
        title: "Portfolio",
        description: "Selected projects and showcases.",
        content: [],
      },
      fr: {
        slug: "portfolio",
        title: "Portfolio",
        description: "Projets et réalisations choisis.",
        content: [],
      },
      ar: {
        slug: "معرض-الأعمال",
        title: "معرض الأعمال",
        description: "مشاريع وأعمال مختارة.",
        content: [],
      },
    },
  },
  {
    id: "news",
    showInNav: false,
    layout: "newsList",
    translations: {
      en: {
        slug: "news",
        title: "News",
        description: "Company and product news.",
        content: [],
      },
      fr: {
        slug: "actualites",
        title: "Actualités",
        description: "Nouvelles de l’entreprise et du produit.",
        content: [],
      },
      ar: {
        slug: "أخبار",
        title: "الأخبار",
        description: "أخبار الشركة والمنتج.",
        content: [],
      },
    },
  },
  {
    id: "directory",
    showInNav: false,
    layout: "directory",
    translations: {
      en: {
        slug: "directory",
        title: "Company directory",
        description: "Find companies by category and sub-category.",
        content: [],
      },
      fr: {
        slug: "annuaire",
        title: "Annuaire des entreprises",
        description: "Trouvez des entreprises par catégorie et sous-catégorie.",
        content: [],
      },
      ar: {
        slug: "دليل-الشركات",
        title: "دليل الشركات",
        description: "ابحث عن الشركات حسب الفئة والفئة الفرعية.",
        content: [],
      },
    },
  },
  {
    id: "careers",
    showInNav: false,
    layout: "jobList",
    translations: {
      en: {
        slug: "careers",
        title: "Careers",
        description: "Join our team.",
        content: [],
      },
      fr: {
        slug: "carrieres",
        title: "Carrières",
        description: "Rejoignez notre équipe.",
        content: [],
      },
      ar: {
        slug: "وظائف",
        title: "الوظائف",
        description: "انضم إلى فريقنا.",
        content: [],
      },
    },
  },
  {
    id: "pricing",
    showInNav: false,
    layout: "pricing",
    translations: {
      en: {
        slug: "pricing",
        title: "Pricing",
        description: "Simple plans for teams of every size.",
        content: [],
      },
      fr: {
        slug: "tarifs",
        title: "Tarifs",
        description: "Des offres simples pour toutes les tailles d’équipe.",
        content: [],
      },
      ar: {
        slug: "الأسعار",
        title: "الأسعار",
        description: "خطط بسيطة لفرق من جميع الأحجام.",
        content: [],
      },
    },
  },
  {
    id: "faq",
    showInNav: false,
    layout: "faq",
    translations: {
      en: {
        slug: "faq",
        title: "FAQ",
        description: "Answers to common questions.",
        content: [],
      },
      fr: {
        slug: "faq",
        title: "FAQ",
        description: "Réponses aux questions fréquentes.",
        content: [],
      },
      ar: {
        slug: "الأسئلة-الشائعة",
        title: "الأسئلة الشائعة",
        description: "إجابات عن الأسئلة المتكررة.",
        content: [],
      },
    },
  },
  {
    id: "classifieds",
    showInNav: false,
    layout: "classifiedList",
    translations: {
      en: {
        slug: "classifieds",
        title: "Classifieds",
        description:
          "Buy, sell and offer services. Ads from companies and people.",
        content: [],
      },
      fr: {
        slug: "petites-annonces",
        title: "Petites annonces",
        description:
          "Achetez, vendez et proposez des services. Annonces d’entreprises et de particuliers.",
        content: [],
      },
      ar: {
        slug: "اعلانات-مبوبة",
        title: "إعلانات مبوبة",
        description: "اشترِ وبع وقدّم خدماتك. إعلانات من شركات وأفراد.",
        content: [],
      },
    },
  },
  {
    id: "post-ad",
    showInNav: false,
    layout: "classifiedForm",
    translations: {
      en: {
        slug: "post-ad",
        title: "Post an ad",
        description:
          "Submit your ad for review. It is free for companies and people.",
        content: [],
      },
      fr: {
        slug: "deposer-annonce",
        title: "Déposer une annonce",
        description:
          "Soumettez votre annonce pour validation. Gratuit pour les entreprises et les particuliers.",
        content: [],
      },
      ar: {
        slug: "اضف-اعلان",
        title: "أضف إعلاناً",
        description: "أرسل إعلانك للمراجعة. مجاني للشركات والأفراد.",
        content: [],
      },
    },
  },
  {
    id: "packaging",
    showInNav: true,
    layout: "default",
    translations: {
      en: {
        slug: "packaging-design-studio",
        title: "Packaging Design",
        description:
          "Graphic design for packaging and food packaging: labels, pouches, boxes and cartons, from idea to production-ready artwork.",
        content: [
          "**Premium packaging design studio in Algeria.** Based in Oran, IDURAR supports you from the first idea to the final realisation of your packaging. Specialised in high-end graphic creation and branding, we design labels, food packaging, boxes and custom mockups. Our expertise combines brand-marketing strategy with strict respect for industrial standards, giving your products a premium position.",
          "## Packaging graphic design\n\nIDURAR supports you from the initial idea to the final result: labels, boxes, mockups and premium food packaging, adapted to industrial standards and built to boost your brand. From production-ready files (labels, pouches, boxes, cartons) to brand guidelines, with a brand-marketing approach.",
          "## Service area\n\nIDURAR works remotely with clients across Algeria, with local service in Oran, Algiers, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa and Bordj Bou Arréridj. Every project can be delivered remotely from the Oran studio.\n\n## Additional services\n\n**On-site visit by the lead designer**: for an extra fee, the lead designer can travel anywhere in Algeria to work on site.\n\n## Contact\n\nRequest a quote or start a project. Email:  · Tel / WhatsApp: +213 541 13 37 00 · Oran, Algeria.",
        ],
      },
      fr: {
        slug: "packaging-design-studio",
        title: "Conception de Packaging",
        description:
          "Conception graphique de packaging et d\u2019emballage alimentaire : \u00e9tiquettes, sachets, bo\u00eetes et cartons, de l\u2019id\u00e9e \u00e0 la maquette pr\u00eate pour la production.",
        content: [
          "**Studio de design & conception graphique packaging premium en Algérie.** Basé à Oran, l’agence IDURAR vous accompagne de l’idée initiale jusqu’à la réalisation finale de vos emballages. Spécialisés en création graphique et branding haut de gamme, nous concevons des étiquettes, des emballages alimentaires, des boîtes et des maquettes sur mesure. Notre expertise allie stratégie marketing de marque et respect rigoureux des normes industrielles pour donner à vos produits un positionnement premium.",
          "## Conception graphique de packaging – design emballage\n\nSpécialiste de la création d’emballages et du branding, le studio IDURAR vous accompagne de l’idée initiale jusqu’à la réalisation finale : étiquettes, boîtes, maquettes et emballages alimentaires haut de gamme, adaptés aux normes industrielles et pensés pour booster votre marque. Du fichier prêt pour la production (étiquettes, sachets, boîtes, cartons) à la charte graphique, avec une approche orientée marketing de marque.",
          "## Zone de service\n\nIDURAR travaille à distance avec des clients dans toute l’Algérie, avec un service local à : Oran, Alger, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa et Bordj Bou Arréridj. Les projets peuvent tous être réalisés à distance depuis le studio d’Oran, où que vous soyez en Algérie.\n\n## Services complémentaires\n\n**Déplacement du designer principal chez le client** : moyennant un supplément, le designer principal peut se déplacer partout en Algérie pour travailler sur place.\n\n## Contact\n\nDemandez un devis ou lancez un projet. Email :  · Tél / WhatsApp : +213 541 13 37 00 · Oran, Algérie.",
        ],
      },
      ar: {
        slug: "تصميم-التغليف",
        title: "تصميم التغليف",
        description:
          "تصميم جرافيكي للتغليف والتعبئة الغذائية: ملصقات وأكياس وعلب وكراتين، من الفكرة إلى ملف جاهز للإنتاج.",
        content: [
          "**استوديو تصميم تغليف متميز في الجزائر.** من وهران، ترافقكم IDURAR من الفكرة الأولى حتى التنفيذ النهائي. نصمم ملصقات وتغليفاً غذائياً وعلباً ونماذج حسب الطلب، بدمج استراتيجية تسويق العلامة مع احترام صارم للمعايير الصناعية.",
          "## التصميم الجرافيكي للتغليف\n\nملفات جاهزة للإنتاج (ملصقات، أكياس، علب، كراتين) ودليل هوية بمنهج تسويقي للعلامة.",
          "## منطقة الخدمة\n\nتعمل IDURAR عن بعد مع عملاء في كل الجزائر، مع خدمة محلية في وهران والجزائر وسطيف وعنابة وقسنطينة وتلمسان ومستغانم وبجاية وبرج بوعريريج.\n\n## خدمات إضافية\n\n**انتقال المصمم الرئيسي إلى العميل**: مقابل رسوم إضافية.\n\n## اتصل بنا\n\nاطلب عرض سعر. البريد:  · الهاتف / واتساب: 213541133700+ · وهران، الجزائر.",
        ],
      },
    },
  },
  {
    id: "branding",
    showInNav: true,
    layout: "default",
    translations: {
      en: {
        slug: "logo-design-algeria",
        title: "Branding & Logo",
        description:
          "Logo design and brand identity systems (brand guidelines) with a brand-marketing approach.",
        content: [
          "**Logo & brand guidelines agency in Algeria.** Stand out from the competition and enhance your company image with a tailor-made visual identity. IDURAR designs original logos and complete brand guidelines to ensure perfect consistency across print, packaging and web. Give your brand a strong, professional and lasting image.",
          "## Logo & branding\n\nIDURAR supports you in creating or redesigning your logo and building your whole visual identity, from global brand guidelines to paper and web variations (business cards, letterheads). We combine brand marketing with rigorous adaptation to industrial standards.\n\n## Main services\n\n- **Packaging design**: labels, pouches, boxes and cartons, from idea to production-ready mockup.\n- **Logo & branding**: logo creation and redesign, complete brand guidelines, visual identity for paper and web.",
          "## Service area\n\nIDURAR works remotely with clients across Algeria, with local service in Oran, Algiers, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa and Bordj Bou Arréridj. Every project can be delivered remotely from the Oran studio.\n\n## Additional services\n\n**On-site visit by the lead designer**: for an extra fee, the lead designer can travel anywhere in Algeria to work on site.\n\n## Contact\n\nRequest a quote or start a project. Email:  · Tel / WhatsApp: +213 541 13 37 00 · Oran, Algeria.",
        ],
      },
      fr: {
        slug: "conception-logo-algerie",
        title: "Branding & Logo",
        description:
          "Conception de logo et syst\u00e8mes d\u2019identit\u00e9 de marque (charte graphique) avec une approche orient\u00e9e marketing de marque.",
        content: [
          "**Agence de création de logo & charte graphique en Algérie.** Démarquez-vous de la concurrence et valorisez l’image de votre entreprise grâce à une identité visuelle sur mesure. IDURAR conçoit des logos originaux et élabore des chartes graphiques complètes pour garantir une cohérence parfaite sur l’ensemble de vos supports de communication (print, packaging et web). Offrez à votre marque une image forte, professionnelle et pérenne.",
          "## Logo & branding\n\nLe studio IDURAR vous accompagne dans la création et la refonte de votre logo ainsi que dans l’élaboration complète de votre identité visuelle. De la charte graphique globale aux déclinaisons papier et web (cartes de visite, papier en-tête), nous concevons des visuels haut de gamme. Notre approche combine marketing de marque et adaptation rigoureuse aux normes industrielles.\n\n## Services principaux\n\n- **Conception de packaging** : étiquettes, sachets, boîtes et cartons, de l’idée jusqu’à la maquette prête pour la production.\n- **Conception de logo & branding** : création et refonte de logo, charte graphique complète, identité visuelle déclinée sur papier et web.",
          "## Zone de service\n\nIDURAR travaille à distance avec des clients dans toute l’Algérie, avec un service local à : Oran, Alger, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa et Bordj Bou Arréridj. Les projets peuvent tous être réalisés à distance depuis le studio d’Oran, où que vous soyez en Algérie.\n\n## Services complémentaires\n\n**Déplacement du designer principal chez le client** : moyennant un supplément, le designer principal peut se déplacer partout en Algérie pour travailler sur place.\n\n## Contact\n\nDemandez un devis ou lancez un projet. Email :  · Tél / WhatsApp : +213 541 13 37 00 · Oran, Algérie.",
        ],
      },
      ar: {
        slug: "تصميم-الشعار",
        title: "الهوية البصرية والشعار",
        description:
          "تصميم الشعارات وأنظمة الهوية البصرية بمنهج تسويقي للعلامة.",
        content: [
          "**وكالة تصميم شعارات ودليل هوية في الجزائر.** تميّزوا عن المنافسين بهوية بصرية مصممة خصيصاً لكم. تصمم IDURAR شعارات أصلية وأدلة هوية كاملة لضمان انسجام تام عبر المطبوعات والتغليف والويب.",
          "## الشعار والهوية البصرية\n\nنرافقكم في ابتكار الشعار أو تجديده وبناء هويتكم كاملة، من الدليل العام إلى بطاقات الزيارة والأوراق الرسمية والويب.",
          "## منطقة الخدمة\n\nتعمل IDURAR عن بعد مع عملاء في كل الجزائر، مع خدمة محلية في وهران والجزائر وسطيف وعنابة وقسنطينة وتلمسان ومستغانم وبجاية وبرج بوعريريج.\n\n## خدمات إضافية\n\n**انتقال المصمم الرئيسي إلى العميل**: مقابل رسوم إضافية.\n\n## اتصل بنا\n\nاطلب عرض سعر. البريد:  · الهاتف / واتساب: 213541133700+ · وهران، الجزائر.",
        ],
      },
    },
  },
  {
    id: "graphic-design",
    showInNav: true,
    layout: "default",
    translations: {
      en: {
        slug: "graphic-design-algeria",
        title: "Graphic Design",
        description:
          "Flyers, brochures, posters and communication materials for your business across Algeria.",
        content: [
          "**Graphic design agency and studio in Oran and Algiers.** IDURAR supports you in creating all your print and digital communication materials. We design impactful tailor-made visuals: flyers, brochures, catalogues, posters and document folders. Give your company a professional and consistent image in Oran, Algiers and nationwide.",
          "## Service area\n\nIDURAR works remotely with clients across Algeria, with local service in Oran, Algiers, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa and Bordj Bou Arréridj. Every project can be delivered remotely from the Oran studio.\n\n## Additional services\n\n**On-site visit by the lead designer**: for an extra fee, the lead designer can travel anywhere in Algeria to work on site.\n\n## Contact\n\nRequest a quote or start a project. Email:  · Tel / WhatsApp: +213 541 13 37 00 · Oran, Algeria.",
        ],
      },
      fr: {
        slug: "conception-graphique-algerie",
        title: "Conception Graphique",
        description:
          "Flyers, d\u00e9pliants, affiches et supports de communication pour votre entreprise partout en Alg\u00e9rie.",
        content: [
          "**Agence graphique design & studio de conception graphique à Oran et Alger.** IDURAR vous accompagne dans la création graphique de tous vos supports de communication print et digitaux. Nous concevons des visuels impactants sur mesure : flyers, dépliants, brochures, catalogues, affiches, posters et portes-documents. Offrez à votre entreprise une image professionnelle et cohérente à Oran, Alger et sur l’ensemble du territoire national.",
          "## Zone de service\n\nIDURAR travaille à distance avec des clients dans toute l’Algérie, avec un service local à : Oran, Alger, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa et Bordj Bou Arréridj. Les projets peuvent tous être réalisés à distance depuis le studio d’Oran, où que vous soyez en Algérie.\n\n## Services complémentaires\n\n**Déplacement du designer principal chez le client** : moyennant un supplément, le designer principal peut se déplacer partout en Algérie pour travailler sur place.\n\n## Contact\n\nDemandez un devis ou lancez un projet. Email :  · Tél / WhatsApp : +213 541 13 37 00 · Oran, Algérie.",
        ],
      },
      ar: {
        slug: "التصميم-الجرافيكي",
        title: "التصميم الجرافيكي",
        description:
          "منشورات وكتيبات وملصقات ووسائل تواصل لشركتك في كل أنحاء الجزائر.",
        content: [
          "**وكالة تصميم جرافيكي في وهران والجزائر العاصمة.** ترافقكم IDURAR في إنشاء كل مواد الاتصال المطبوعة والرقمية: منشورات وكتيبات وكتالوجات وملصقات ومجلدات. اجعلوا لشركتكم صورة مهنية متناسقة في كل أنحاء الوطن.",
          "## منطقة الخدمة\n\nتعمل IDURAR عن بعد مع عملاء في كل الجزائر، مع خدمة محلية في وهران والجزائر وسطيف وعنابة وقسنطينة وتلمسان ومستغانم وبجاية وبرج بوعريريج.\n\n## خدمات إضافية\n\n**انتقال المصمم الرئيسي إلى العميل**: مقابل رسوم إضافية.\n\n## اتصل بنا\n\nاطلب عرض سعر. البريد:  · الهاتف / واتساب: 213541133700+ · وهران، الجزائر.",
        ],
      },
    },
  },
  {
    id: "web",
    showInNav: true,
    layout: "default",
    translations: {
      en: {
        slug: "web-design-algeria",
        title: "Web Solutions",
        description: "Modern, fast, SEO-friendly website creation.",
        content: [
          "**Website creation in Algeria – design and development, Oran.** iDURAR Web Agency offers the right solutions if you are an SME that wants a complete website, simply and quickly. A tailor-made, optimised website helps small businesses get known on the web fast and effectively.",
          "## Selected work\n\nCompany sites, a real-estate developer, a travel agency, an engineering office, a restaurant, a blog, a web app interface and a site for a client in Turkey: see the screenshots below.",
          "Local service in Oran, Algiers, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa and Bordj Bou Arréridj.\n\n## Contact\n\nEmail:  · Tel / WhatsApp: +213 541 13 37 00 · Oran, Algeria.",
        ],
      },
      fr: {
        slug: "conception-site-web-algerie",
        title: "Solutions Web",
        description:
          "Cr\u00e9ation de sites web modernes, rapides et optimis\u00e9s pour le r\u00e9f\u00e9rencement.",
        content: [
          "**Création de site web en Algérie – conception et développement, Oran.** iDURAR Web Agency offre des solutions parfaites si vous êtes une PME qui désire obtenir un site web complet, simplement et rapidement. Un site web optimisé et sur mesure pour PME / TPE permet de se faire connaître sur le web rapidement et efficacement.",
          "## Quelques réalisations\n\nSites d’entreprises, promoteur immobilier, agence de voyage, bureau d’études, restaurant, blog, application web et un site pour un client en Turquie : voir les captures ci-dessous.",
          "Service et accompagnement local sur Oran, Alger, Sétif, Annaba, Constantine, Tlemcen, Mostaganem, Béjaïa et Bordj Bou Arréridj.\n\n## Contact\n\nEmail :  · Tél / WhatsApp : +213 541 13 37 00 · Oran, Algérie.",
        ],
      },
      ar: {
        slug: "حلول-الويب",
        title: "حلول الويب",
        description: "إنشاء مواقع ويب حديثة وسريعة ومتوافقة مع محركات البحث.",
        content: [
          "**إنشاء مواقع ويب في الجزائر – تصميم وتطوير، وهران.** تقدم iDURAR Web Agency حلولاً مثالية للمؤسسات الصغيرة والمتوسطة التي تريد موقعاً كاملاً بسرعة وبساطة.",
          "## بعض أعمالنا\n\nمواقع شركات ومروج عقاري ووكالة سفر ومكتب دراسات ومطعم ومدونة وتطبيق ويب وموقع لعميل في تركيا: انظروا اللقطات أدناه.",
          "خدمة محلية في وهران والجزائر وسطيف وعنابة وقسنطينة وتلمسان ومستغانم وبجاية وبرج بوعريريج.\n\n## اتصل بنا\n\n · 213541133700+ · وهران.",
        ],
      },
    },
  },
  {
    id: "contact",
    showInNav: true,
    layout: "contact",
    translations: {
      en: {
        slug: "contact",
        title: "Contact",
        description: "Get in touch or request a quote.",
        content: [],
      },
      fr: {
        slug: "contact",
        title: "Contact",
        description: "Contactez-nous ou demandez un devis.",
        content: [],
      },
      ar: {
        slug: "اتصل-بنا",
        title: "اتصل بنا",
        description: "تواصل معنا أو اطلب عرض سعر.",
        content: [],
      },
    },
  },
  {
    id: "search",
    noindex: true,
    layout: "search",
    translations: {
      en: {
        slug: "search",
        title: "Search",
        description: "Search the site.",
        content: [],
      },
      fr: {
        slug: "recherche",
        title: "Recherche",
        description: "Rechercher sur le site.",
        content: [],
      },
      ar: {
        slug: "بحث",
        title: "بحث",
        description: "ابحث في الموقع.",
        content: [],
      },
    },
  },
];

export default pages;
