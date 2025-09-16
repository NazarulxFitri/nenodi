// next-i18next.config.js
/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ms"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // ✅ ensures interpolation works
  },
};

module.exports = config;
