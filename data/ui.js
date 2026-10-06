// Shared UI strings (non-page content). Add a language by adding a key.
const ui = {
  en: { mostPopular: 'Most Popular', home: 'Home', readMore: 'Read more', publishedOn: 'Published on', previous: 'Previous', next: 'Next', all: 'All', language: 'Language', menu: 'Menu' },
  ar: { mostPopular: 'الأكثر شعبية', home: 'الرئيسية', readMore: 'اقرأ المزيد', publishedOn: 'نُشر في', previous: 'السابق', next: 'التالي', all: 'الكل', language: 'اللغة', menu: 'القائمة' },
  fr: { mostPopular: 'Le plus populaire', home: 'Accueil', readMore: 'Lire la suite', publishedOn: 'Publié le', previous: 'Précédent', next: 'Suivant', all: 'Tout', language: 'Langue', menu: 'Menu' },
  es: { mostPopular: 'Más popular', home: 'Inicio', readMore: 'Leer más', publishedOn: 'Publicado el', previous: 'Anterior', next: 'Siguiente', all: 'Todo', language: 'Idioma', menu: 'Menú' },
  zh: { mostPopular: '最受欢迎', home: '首页', readMore: '阅读更多', publishedOn: '发布于', previous: '上一篇', next: '下一篇', all: '全部', language: '语言', menu: '菜单' },
  hi: { mostPopular: 'सबसे लोकप्रिय', home: 'होम', readMore: 'और पढ़ें', publishedOn: 'प्रकाशित', previous: 'पिछला', next: 'अगला', all: 'सभी', language: 'भाषा', menu: 'मेनू' },
  pt: { mostPopular: 'Mais popular', home: 'Início', readMore: 'Ler mais', publishedOn: 'Publicado em', previous: 'Anterior', next: 'Próximo', all: 'Tudo', language: 'Idioma', menu: 'Menu' },
  ru: { mostPopular: 'Самый популярный', home: 'Главная', readMore: 'Читать далее', publishedOn: 'Опубликовано', previous: 'Назад', next: 'Далее', all: 'Все', language: 'Язык', menu: 'Меню' },
  vi: { mostPopular: 'Phổ biến nhất', home: 'Trang chủ', readMore: 'Đọc thêm', publishedOn: 'Đăng ngày', previous: 'Trước', next: 'Tiếp', all: 'Tất cả', language: 'Ngôn ngữ', menu: 'Menu' },
  tr: { mostPopular: 'En popüler', home: 'Ana sayfa', readMore: 'Devamını oku', publishedOn: 'Yayın tarihi', previous: 'Önceki', next: 'Sonraki', all: 'Tümü', language: 'Dil', menu: 'Menü' },
  de: { mostPopular: 'Am beliebtesten', home: 'Startseite', readMore: 'Weiterlesen', publishedOn: 'Veröffentlicht am', previous: 'Zurück', next: 'Weiter', all: 'Alle', language: 'Sprache', menu: 'Menü' },
  id: { mostPopular: 'Paling populer', home: 'Beranda', readMore: 'Baca selengkapnya', publishedOn: 'Diterbitkan pada', previous: 'Sebelumnya', next: 'Berikutnya', all: 'Semua', language: 'Bahasa', menu: 'Menu' },
  it: { mostPopular: 'Il più popolare', home: 'Home', readMore: 'Leggi di più', publishedOn: 'Pubblicato il', previous: 'Precedente', next: 'Successivo', all: 'Tutti', language: 'Lingua', menu: 'Menu' },
  fa: { mostPopular: 'محبوب‌ترین', home: 'خانه', readMore: 'ادامه مطلب', publishedOn: 'منتشر شده در', previous: 'قبلی', next: 'بعدی', all: 'همه', language: 'زبان', menu: 'منو' },
};

export default ui;
export const getUi = (lang) => ui[lang] || ui.en;
