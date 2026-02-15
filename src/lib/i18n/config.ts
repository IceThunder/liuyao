export const locales = ['zh-CN', 'en', 'ja', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-CN';

export const localeNames: Record<Locale, string> = {
  'zh-CN': '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first)) {
    return first;
  }
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first) && first !== defaultLocale) {
    return '/' + segments.slice(1).join('/') || '/';
  }
  return pathname;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const clean = getPathWithoutLocale(pathname);
  if (locale === defaultLocale) {
    return clean;
  }
  return `/${locale}${clean === '/' ? '' : clean}`;
}
