'use client';

import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

export default function NavBar() {
  const { locale, t } = useI18n();

  const link = (path: string) => getLocalizedPath(path, locale);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href={link('/')} className="font-serif-cn text-gold text-lg font-bold tracking-wider">
          {t('nav.title')}
        </a>
        <div className="flex gap-6 text-sm items-center">
          <a href={link('/divine')} className="text-foreground/70 hover:text-gold transition-colors">
            {t('nav.divine')}
          </a>
          <a href={link('/hexagrams')} className="text-foreground/70 hover:text-gold transition-colors">
            {t('nav.hexagrams')}
          </a>
          <a href={link('/history')} className="text-foreground/70 hover:text-gold transition-colors">
            {t('nav.history')}
          </a>
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
