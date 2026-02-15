'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const { locale, t } = useI18n();
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

  if (status === 'loading') {
    return <div className="w-7 h-7 rounded-full bg-ink-lighter/50 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <a
        href={getLocalizedPath('/auth/signin', locale)}
        className="text-foreground/70 hover:text-gold transition-colors text-sm"
      >
        {t('auth.user.signin')}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="w-7 h-7 rounded-full border border-gold/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
            {(session.user.name || session.user.email || '?')[0].toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-ink-light border border-gold/10 rounded-lg py-2 min-w-[140px] z-50 shadow-lg">
          <div className="px-4 py-1.5 text-xs text-foreground/40 truncate border-b border-gold/5 mb-1">
            {session.user.email}
          </div>
          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-1.5 text-sm text-foreground/60 hover:text-vermilion hover:bg-ink-lighter/50 transition-colors"
          >
            {t('auth.user.signout')}
          </button>
        </div>
      )}
    </div>
  );
}
