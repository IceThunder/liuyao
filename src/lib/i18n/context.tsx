'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Locale, defaultLocale } from './config';
import { getTranslation, getTranslationPair } from './translations';

interface I18nContextValue {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
  tp: (key: string, params?: Record<string, string | number>) => { zh: string; translated?: string };
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  t: (key) => key,
  tp: (key) => ({ zh: key }),
});

function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
}

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = (key: string, params?: Record<string, string | number>) => {
    return interpolate(getTranslation(key, locale), params);
  };

  const tp = (key: string, params?: Record<string, string | number>) => {
    const pair = getTranslationPair(key, locale);
    return {
      zh: interpolate(pair.zh, params),
      translated: pair.translated ? interpolate(pair.translated, params) : undefined,
    };
  };

  return (
    <I18nContext.Provider value={{ locale, t, tp }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
