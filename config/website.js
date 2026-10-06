// Single source of truth for site-wide settings.
// To add a language: append an entry to `languages`, then add its
// translations in data/pages.js.
// `antdLocale` must be a key of the map in layout/components/Providers.js.
export const websiteConfig = {
  siteName: "IDURAR",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.idurarweb.com",
  defaultLang: "fr",
  // Scroll parallax effect. Set `enabled: false` to turn it off site-wide;
  // `speed` is the default strength (0 = none, ~0.1 subtle, 0.5 strong).
  parallax: { enabled: true, speed: 0.15 },
  // Short line shown under the wordmark in the full logo ('' to hide).
  tagline: "Web.Agency",
  // Where the contact form (mailto:) sends messages. Replace with your real address.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: "0541133700",
  whatsapp: "213541133700",
  address: "Oran, Algérie",
  languages: [
    {
      code: "en",
      label: "English",
      dir: "ltr",
      ogLocale: "en_US",
      antdLocale: "en_US",
    },
    {
      code: "fr",
      label: "Français",
      dir: "ltr",
      ogLocale: "fr_FR",
      antdLocale: "fr_FR",
    },
    {
      code: "ar",
      label: "العربية",
      dir: "rtl",
      ogLocale: "ar_AR",
      antdLocale: "ar_EG",
    },
  ],
};

export const {
  siteName,
  siteUrl,
  defaultLang,
  languages,
  parallax,
  tagline,
  contactEmail,
  phone,
  whatsapp,
  address,
} = websiteConfig;

export const langCodes = languages.map((l) => l.code);
export const isValidLang = (lang) => langCodes.includes(lang);
export const getLangConfig = (lang) =>
  languages.find((l) => l.code === lang) ||
  languages.find((l) => l.code === defaultLang);
