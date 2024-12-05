import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { useEffect } from 'react';

// useEffect(() => {
//     const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
//     document.documentElement.dir = dir;
//   }, [i18n.language])

const resources = {
  en: {
    translation: {
        Airbnb: 'Airbnb',
      about: 'about ',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Airbnb',
      about: 'Sobre ',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue chez Airbnb',
      about: 'À propos de nous',
    },
  },
  he: {
    translation: {
      welcome: 'ברוכים הבאים',
      about: 'עלינו',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
