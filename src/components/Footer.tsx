'use client';

import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';

export default function Footer() {
  const { locale, t } = useI18n();
  const link = (path: string) => getLocalizedPath(path, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/10 bg-ink/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-sm">
          <div className="flex gap-6 text-foreground/40">
            <a
              href={link('/privacy')}
              className="hover:text-gold transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href={link('/terms')}
              className="hover:text-gold transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
          <p className="text-foreground/20 text-xs text-center font-serif-cn">
            {t('footer.disclaimer')}
          </p>
          <p className="text-foreground/20 text-xs">
            {t('footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
