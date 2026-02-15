'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';

interface HexagramCardProps {
  index: number;
  name: string;
  onClick?: () => void;
}

export default function HexagramCard({ index, name, onClick }: HexagramCardProps) {
  const { t } = useI18n();

  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: 'rgba(212,168,83,0.5)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="
        cursor-pointer p-3 rounded-lg
        bg-ink-light/50 border border-gold/10
        hover:bg-ink-lighter/50
        transition-colors duration-200
        flex flex-col items-center justify-center
        min-h-[80px]
      "
    >
      <span className="text-gold/50 text-xs mb-1">
        {t('hexagrams.card.prefix', { n: index })}
      </span>
      <span className="font-serif-cn text-gold text-sm font-semibold">
        {name}
      </span>
    </motion.div>
  );
}
