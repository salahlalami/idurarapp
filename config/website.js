// Single source of truth for site-wide settings.
// To add a language: append an entry to `languages`, then add its
// translations in data/pages.js and data/nav.js.
// `antdLocale` must be a key of the map in layout/components/Providers.js.
export const websiteConfig = {
  siteName: "IDURAR",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.idurarapp.com",
  defaultLang: "en",
  tagline: "Self-hosted ERP & CRM with Source Code",
  contactEmail: "hello@idurarapp.com",
  copyright: "IDURAR AI, Inc",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/idurar", icon: "/brand/linkedin.svg" },
    { label: "GitHub", href: "https://github.com/idurar", icon: "/brand/github.svg" },
    { label: "Twitter", href: "https://twitter.com/idurarapp", icon: "/brand/twitter.svg" },
  ],
  languages: [
    { code: "en", label: "English", dir: "ltr", ogLocale: "en_US", antdLocale: "en_US" },
    { code: "ar", label: "العربية", dir: "rtl", ogLocale: "ar_AR", antdLocale: "ar_EG" },
    { code: "fr", label: "Français", dir: "ltr", ogLocale: "fr_FR", antdLocale: "fr_FR" },
    { code: "es", label: "Español", dir: "ltr", ogLocale: "es_ES", antdLocale: "es_ES" },
    { code: "zh", label: "中文", dir: "ltr", ogLocale: "zh_CN", antdLocale: "zh_CN" },
    { code: "hi", label: "हिन्दी", dir: "ltr", ogLocale: "hi_IN", antdLocale: "hi_IN" },
    { code: "pt", label: "Português", dir: "ltr", ogLocale: "pt_PT", antdLocale: "pt_PT" },
    { code: "ru", label: "Русский", dir: "ltr", ogLocale: "ru_RU", antdLocale: "ru_RU" },
    { code: "vi", label: "Tiếng Việt", dir: "ltr", ogLocale: "vi_VN", antdLocale: "vi_VN" },
    { code: "tr", label: "Türkçe", dir: "ltr", ogLocale: "tr_TR", antdLocale: "tr_TR" },
    { code: "de", label: "Deutsch", dir: "ltr", ogLocale: "de_DE", antdLocale: "de_DE" },
    { code: "id", label: "Bahasa Indonesia", dir: "ltr", ogLocale: "id_ID", antdLocale: "id_ID" },
    { code: "it", label: "Italiano", dir: "ltr", ogLocale: "it_IT", antdLocale: "it_IT" },
    { code: "fa", label: "فارسی", dir: "rtl", ogLocale: "fa_IR", antdLocale: "fa_IR" },
  ],
};

export const {
  siteName,
  siteUrl,
  defaultLang,
  languages,
  tagline,
  contactEmail,
  copyright,
  social,
} = websiteConfig;

export const langCodes = languages.map((l) => l.code);
export const isValidLang = (lang) => langCodes.includes(lang);
export const getLangConfig = (lang) =>
  languages.find((l) => l.code === lang) ||
  languages.find((l) => l.code === defaultLang);
