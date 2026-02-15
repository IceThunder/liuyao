import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale, type Locale } from '@/lib/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get('Accept-Language');
  if (acceptLang) {
    const langs = acceptLang.split(',').map(l => l.split(';')[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith('zh')) return 'zh-CN';
      if (lang.startsWith('ja')) return 'ja';
      if (lang.startsWith('ko')) return 'ko';
      if (lang.startsWith('en')) return 'en';
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, API routes, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if path already has a locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    // If it's the default locale prefix, redirect to root path (e.g. /zh-CN/divine → /divine)
    if (firstSegment === defaultLocale) {
      const newPath = '/' + segments.slice(1).join('/') || '/';
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    // Valid non-default locale prefix, allow through
    return NextResponse.next();
  }

  // No locale prefix — detect preferred locale
  const preferredLocale = getPreferredLocale(request);

  // If preferred is not default, redirect to prefixed path
  if (preferredLocale !== defaultLocale) {
    const newPath = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Default locale, no prefix needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
