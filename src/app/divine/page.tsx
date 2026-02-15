'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { YaoValue, CoinToss } from '@/types';
import { tossCoin, getYaoDescription, generateId } from '@/lib/divination';
import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';
import { useSession } from 'next-auth/react';
import { addLocalRecord, saveCloudRecord } from '@/lib/historyStore';
import Coin from '@/components/Coin';
import Hexagram from '@/components/Hexagram';

export default function DivinePage() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const { data: session } = useSession();
  const [question, setQuestion] = useState('');
  const [tosses, setTosses] = useState<CoinToss[]>([]);
  const [currentToss, setCurrentToss] = useState<CoinToss | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const yaos: YaoValue[] = tosses.map(t => t.yaoValue);
  const tossCount = tosses.length;

  const posKeys = ['yao.pos.1', 'yao.pos.2', 'yao.pos.3', 'yao.pos.4', 'yao.pos.5', 'yao.pos.6'];

  const handleToss = useCallback(() => {
    if (isFlipping || tossCount >= 6) return;

    setIsFlipping(true);
    const result = tossCoin();
    setCurrentToss(result);

    setTimeout(() => {
      setIsFlipping(false);
      setTosses(prev => [...prev, result]);
      setCurrentToss(null);

      if (tossCount + 1 >= 6) {
        setIsComplete(true);
      }
    }, 1200);
  }, [isFlipping, tossCount]);

  const handleViewResult = async () => {
    const id = generateId();
    const data = {
      id,
      question,
      timestamp: Date.now(),
      yaos: tosses.map(t => t.yaoValue),
    };
    // Save to local first
    addLocalRecord(data);
    // Try to save to cloud if logged in
    if (session?.user?.id) {
      try {
        await saveCloudRecord(data);
      } catch {
        // Ignore cloud save errors
      }
    }
    localStorage.setItem('liuyao-current', JSON.stringify(data));
    router.push(getLocalizedPath(`/result?id=${id}`, locale));
  };

  const handleReset = () => {
    setTosses([]);
    setCurrentToss(null);
    setIsFlipping(false);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-2xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-8 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('divine.title')}
      </motion.h1>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-foreground/50 text-sm mb-2 font-serif-cn">
          {t('divine.question.label')}
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('divine.question.placeholder')}
          disabled={tossCount > 0}
          className="
            w-full px-4 py-3 rounded-lg
            bg-ink-light/50 border border-gold/10
            text-foreground placeholder:text-foreground/20
            focus:outline-none focus:border-gold/30
            font-serif-cn
            disabled:opacity-50
          "
        />
      </motion.div>

      <div className="flex flex-col items-center mb-8">
        <div className="text-foreground/30 text-sm mb-4 font-serif-cn">
          {t('divine.toss.counter', { current: String(Math.min(tossCount + 1, 6)) })}
        </div>

        <div className="flex gap-4 mb-6 h-24 items-center">
          {isFlipping && currentToss ? (
            <>
              <Coin isHead={currentToss.coins[0]} isFlipping={true} delay={0} />
              <Coin isHead={currentToss.coins[1]} isFlipping={true} delay={0.1} />
              <Coin isHead={currentToss.coins[2]} isFlipping={true} delay={0.2} />
            </>
          ) : (
            <div className="flex gap-4 opacity-30">
              <Coin isHead={true} isFlipping={false} />
              <Coin isHead={true} isFlipping={false} />
              <Coin isHead={false} isFlipping={false} />
            </div>
          )}
        </div>

        {!isComplete ? (
          <motion.button
            onClick={handleToss}
            disabled={isFlipping}
            className="
              px-8 py-3 rounded-lg
              bg-gradient-to-r from-gold-dark via-gold to-gold-dark
              text-ink font-serif-cn text-lg font-bold
              glow-gold
              disabled:opacity-50 disabled:cursor-not-allowed
              relative overflow-hidden
            "
            whileHover={!isFlipping ? { scale: 1.05 } : {}}
            whileTap={!isFlipping ? { scale: 0.97 } : {}}
          >
            {isFlipping ? t('divine.toss.flipping') : tossCount === 0 ? t('divine.toss.first') : t('divine.toss.continue')}
          </motion.button>
        ) : (
          <div className="flex gap-4">
            <motion.button
              onClick={handleViewResult}
              className="
                px-8 py-3 rounded-lg
                bg-gradient-to-r from-gold-dark via-gold to-gold-dark
                text-ink font-serif-cn text-lg font-bold glow-gold
              "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('divine.view.result')}
            </motion.button>
            <motion.button
              onClick={handleReset}
              className="
                px-6 py-3 rounded-lg
                border border-gold/20 text-gold/60
                font-serif-cn hover:border-gold/40
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('divine.reset')}
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {yaos.length > 0 && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-foreground/30 text-sm mb-4 font-serif-cn">{t('divine.yao.cast')}</div>

            <div className="flex gap-8 items-start">
              <Hexagram yaos={yaos} size="md" />

              <div className="flex flex-col-reverse gap-1">
                {tosses.map((toss, idx) => (
                  <motion.div
                    key={idx}
                    className="text-sm text-foreground/50 font-serif-cn"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-gold/40 mr-2">{t(posKeys[idx])}{t('yao.suffix')}</span>
                    <span>{getYaoDescription(toss.yaoValue)}</span>
                    <span className="text-foreground/20 ml-2">
                      ({toss.coins.map(c => c ? t('divine.coin.head') : t('divine.coin.tail')).join(' ')})
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
