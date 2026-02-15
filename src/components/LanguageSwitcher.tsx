'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { locales, localeNames, getLocalizedPath, type Locale } from '@/lib/i18n/config';
import { useI18n } from '@/lib/i18n/context';

export default function LanguageSwitcher() {
  const { locale } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    const newPath = getLocalizedPath(pathname, newLocale);
    window.location.href = newPath;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-foreground/70 hover:text-gold transition-colors text-sm flex items-center gap-1"
      >
        {localeNames[locale]}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-ink-light border border-gold/10 rounded-lg py-1 min-w-[100px] z-50 shadow-lg">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                switchLocale(loc);
                setOpen(false);
              }}
              className={`
                block w-full text-left px-4 py-1.5 text-sm transition-colors
                ${loc === locale ? 'text-gold' : 'text-foreground/60 hover:text-gold hover:bg-ink-lighter/50'}
              `}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
