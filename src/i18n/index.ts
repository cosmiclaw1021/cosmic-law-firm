'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './en.json';
import enReviews from './en.reviews.json';
import koTranslation from './ko.json';
import koReviews from './ko.reviews.json';
export const SUPPORTED_LANGUAGES = ['en', 'ko'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const isServer = typeof window === 'undefined';

export function normalizeLanguage(lng: string | undefined | null): SupportedLanguage {
  const value = (lng || '').trim();
  if (!value) return 'en';
  if (value.toLowerCase().startsWith('ko')) return 'ko';
  return 'en';
}

const i18nInstance = i18n.use(initReactI18next);
if (!isServer) i18nInstance.use(LanguageDetector);

i18nInstance.init({
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  ns: ['translation', 'reviews'],
  defaultNS: 'translation',
  detection: {
    order: ['path', 'cookie', 'htmlTag', 'localStorage', 'navigator'],
    lookupFromPathIndex: 0,
    caches: ['cookie'],
  },
  resources: {
    en: { translation: enTranslation, reviews: enReviews },
    ko: { translation: koTranslation, reviews: koReviews },
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
