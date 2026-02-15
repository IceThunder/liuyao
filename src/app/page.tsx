'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';
import BilingualText from '@/components/BilingualText';
import AdUnit from '@/components/AdUnit';

export default function HomePage() {
  const { locale, t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* 太极背景动画 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="taiji-rotate opacity-[0.03]">
          <svg width="600" height="600" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="98" fill="none" stroke="#d4a853" strokeWidth="2"/>
            <path d="M100,2 A98,98 0 0,1 100,198 A49,49 0 0,1 100,100 A49,49 0 0,0 100,2" fill="#d4a853"/>
            <circle cx="100" cy="51" r="12" fill="#0d0d1a"/>
            <circle cx="100" cy="149" r="12" fill="#d4a853"/>
          </svg>
        </div>
      </div>

      {/* 八卦符号装饰 */}
      <motion.div
        className="absolute top-20 left-10 text-gold/5 text-6xl font-serif-cn select-none"
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ☰ ☱ ☲ ☳
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-gold/5 text-6xl font-serif-cn select-none"
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        ☴ ☵ ☶ ☷
      </motion.div>

      {/* 主内容 */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-serif-cn text-5xl md:text-7xl text-gold font-bold mb-4 glow-gold-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          六爻占卜
        </motion.h1>

        <motion.div
          className="text-foreground/50 text-lg md:text-xl mb-2 font-serif-cn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <BilingualText
            tKey="home.subtitle"
            zhClassName="text-foreground/50"
            translatedClassName="block text-foreground/30 text-sm mt-1"
          />
        </motion.div>

        <motion.div
          className="text-foreground/30 text-sm max-w-md mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <BilingualText
            tKey="home.description"
            zhClassName="text-foreground/30"
            translatedClassName="block text-foreground/20 text-xs mt-2"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Link href={getLocalizedPath('/divine', locale)}>
            <motion.button
              className="
                px-10 py-4 rounded-lg
                bg-gradient-to-r from-gold-dark via-gold to-gold-dark
                text-ink font-serif-cn text-xl font-bold
                glow-gold
                relative overflow-hidden
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">{t('home.start')}</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 广告位 */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-10">
        <AdUnit adSlot="home-bottom" adFormat="horizontal" />
      </div>

      {/* 底部装饰线 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-center gap-3 text-gold/20">
          <div className="w-16 h-px bg-gold/20" />
          <span className="text-xs font-serif-cn">
            <BilingualText
              tKey="home.footer"
              zhClassName="text-gold/20"
              translatedClassName="block text-gold/10 text-[10px] mt-0.5"
            />
          </span>
          <div className="w-16 h-px bg-gold/20" />
        </div>
      </motion.div>
    </div>
  );
}
