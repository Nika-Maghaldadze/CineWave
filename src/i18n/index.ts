import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/i18n/locales/en.json';
import ka from '@/i18n/locales/ka.json';
import { STORAGE_KEYS } from '@/utils/constants';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ka: { translation: ka },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ka'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEYS.language,
      caches: ['localStorage'],
    },
  });

export default i18n;
