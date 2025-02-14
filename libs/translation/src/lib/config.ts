'use client';

import i18n from 'i18next';
import { TFunction as I18nextTFunction } from 'i18next';
import { initReactI18next, useTranslation, Trans } from 'react-i18next';

import en from './locales/en';
import fa from './locales/fa';


type TFunction = I18nextTFunction;

export const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
} as const;

// const deepResources = JSON.parse(JSON.stringify(resources));

i18n.use(initReactI18next).init({
  resources,
  lng: 'fa',
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // debug: true,
});

export function changeLanguage(locale: string) {
  i18n.changeLanguage(locale);
}

export function loadTr(params: any) {
  i18n.removeResourceBundle('en', 'translation');
  i18n.removeResourceBundle('fa', 'translation');
  i18n.addResourceBundle('en', 'translation', en);
  i18n.addResourceBundle('fa', 'translation', fa);
  i18n.addResourceBundle('en', 'translation', params.en, true);
  i18n.addResourceBundle('fa', 'translation', params.fa, true);
  i18n.loadResources();
}

export { useTranslation as useTr, Trans as Tr, i18n as i18nBase, TFunction };
