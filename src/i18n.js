import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to load translations
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
