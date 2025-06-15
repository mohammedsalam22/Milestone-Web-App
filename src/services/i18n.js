import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const LANGUAGES = {
    en: {
        code: 'en',
        name: 'English',
        direction: 'ltr',
        flag: 'en'
    },
    ar: {
        code: 'ar',
        name: 'العربية',
        direction: 'rtl',
        flag: 'ar'
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
             loadPath: '/locale/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false
        },
        supportedLngs: Object.keys(LANGUAGES),
    })
    .then(() => {
        const language = LANGUAGES[i18n.language];
        if (language) {
            document.documentElement.dir = language.direction;
            document.documentElement.lang = language.code;
            document.body.classList.remove('ltr', 'rtl');
            document.body.classList.add(language.direction);
        }
    });

i18n.on('languageChanged', (lng) => {
    const language = LANGUAGES[lng];
    if (language) {
        document.documentElement.dir = language.direction;
        document.documentElement.lang = language.code;
        document.body.classList.remove('ltr', 'rtl');
        document.body.classList.add(language.direction);
    }
});

export const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode); 
};

export default i18n;