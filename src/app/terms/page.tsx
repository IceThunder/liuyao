'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';

function Section({ titleKey, contentKey }: { titleKey: string; contentKey: string }) {
  const { t } = useI18n();
  const content = t(contentKey);
  const lines = content.split('\n');

  return (
    <div className="mb-6">
      <h2 className="font-serif-cn text-gold text-lg mb-3">{t(titleKey)}</h2>
      <div className="text-foreground/60 text-sm leading-relaxed space-y-1">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-2 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('legal.terms.title')}
      </motion.h1>

      <motion.div
        className="mt-8 bg-ink-light/30 border border-gold/10 rounded-lg p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-foreground/50 text-sm mb-8 font-serif-cn">
          {t('legal.terms.intro')}
        </p>

        <Section titleKey="legal.terms.service.title" contentKey="legal.terms.service.content" />
        <Section titleKey="legal.terms.disclaimer.title" contentKey="legal.terms.disclaimer.content" />
        <Section titleKey="legal.terms.user.title" contentKey="legal.terms.user.content" />
        <Section titleKey="legal.terms.ip.title" contentKey="legal.terms.ip.content" />
        <Section titleKey="legal.terms.liability.title" contentKey="legal.terms.liability.content" />
      </motion.div>
    </div>
  );
}
