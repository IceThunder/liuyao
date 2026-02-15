'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { YaoValue } from '@/types';
import { getYaoType, isMovingYao, getChangedYaoType } from '@/lib/divination';
import { getTrigramsFromYaos, getChangedTrigramsFromYaos, TRIGRAMS } from '@/lib/hexagram';
import { useI18n } from '@/lib/i18n/context';
import Hexagram from '@/components/Hexagram';
import AiInterpretation from '@/components/AiInterpretation';
import AdUnit from '@/components/AdUnit';

interface StoredData {
  id: string;
  question: string;
  timestamp: number;
  yaos: YaoValue[];
}

function ResultContent() {
  const searchParams = useSearchParams();
  const { locale, t } = useI18n();
  const [data, setData] = useState<StoredData | null>(null);

  const posKeys = ['yao.pos.1', 'yao.pos.2', 'yao.pos.3', 'yao.pos.4', 'yao.pos.5', 'yao.pos.6'];

  useEffect(() => {
    const stored = localStorage.getItem('liuyao-current');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/30 font-serif-cn">{t('result.loading')}</p>
      </div>
    );
  }

  const { yaos, question, timestamp } = data;
  const { upper, lower } = getTrigramsFromYaos(yaos);
  const changed = getChangedTrigramsFromYaos(yaos);
  const hasMoving = yaos.some(v => isMovingYao(v));

  const changedYaos: YaoValue[] = yaos.map(v => {
    if (v === 9) return 8 as YaoValue;
    if (v === 6) return 7 as YaoValue;
    return v;
  });

  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-2 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('result.title')}
      </motion.h1>

      {question && (
        <motion.p
          className="text-center text-foreground/40 text-sm mb-8 font-serif-cn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('result.question.prefix')}{question}
        </motion.p>
      )}

      <motion.p
        className="text-center text-foreground/20 text-xs mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {new Date(timestamp).toLocaleString(locale)}
      </motion.p>

      {/* 本卦与变卦 */}
      <motion.div
        className="flex flex-wrap justify-center gap-12 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <Hexagram yaos={yaos} title={t('result.original')} size="lg" />
          <p className="mt-3 font-serif-cn text-gold/60 text-sm">
            {upper}{TRIGRAMS[upper].nature} {t('result.upper')} / {lower}{TRIGRAMS[lower].nature} {t('result.lower')}
          </p>
        </div>

        {hasMoving && changed && (
          <>
            <div className="flex items-center text-gold/30 text-2xl font-serif-cn">→</div>
            <div className="flex flex-col items-center">
              <Hexagram yaos={changedYaos} title={t('result.changed')} size="lg" showMoving={false} />
              <p className="mt-3 font-serif-cn text-gold/60 text-sm">
                {changed.upper}{TRIGRAMS[changed.upper].nature} {t('result.upper')} / {changed.lower}{TRIGRAMS[changed.lower].nature} {t('result.lower')}
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* 六爻详情表 */}
      <motion.div
        className="bg-ink-light/30 border border-gold/10 rounded-lg p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="font-serif-cn text-gold text-lg mb-4">{t('result.details.title')}</h2>
        <div className="space-y-2">
          {[...yaos].reverse().map((yao, idx) => {
            const pos = 6 - idx;
            const yaoType = getYaoType(yao);
            const moving = isMovingYao(yao);
            return (
              <div key={idx} className="flex items-center gap-4 text-sm py-1 border-b border-gold/5">
                <span className="text-gold/40 w-10 font-serif-cn">{t(posKeys[pos - 1])}{t('yao.suffix')}</span>
                <span className={`w-12 ${yaoType === 'yang' ? 'text-gold' : 'text-foreground/50'}`}>
                  {yaoType === 'yang' ? t('result.yang') : t('result.yin')}
                </span>
                {moving && (
                  <span className="text-vermilion text-xs px-2 py-0.5 rounded bg-vermilion/10">
                    {t('result.moving')} {yao === 9 ? t('result.change.yin') : t('result.change.yang')}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 广告位 */}
      <AdUnit adSlot="result-mid" adFormat="horizontal" />

      {/* AI解卦 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AiInterpretation
          question={question}
          yaos={yaos}
          upperTrigram={upper}
          lowerTrigram={lower}
          changedUpperTrigram={changed?.upper}
          changedLowerTrigram={changed?.lower}
          divinationId={data.id}
        />
      </motion.div>
    </div>
  );
}

export default function ResultPage() {
  const { t } = useI18n();
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-foreground/30 font-serif-cn">{t('result.loading')}</p></div>}>
      <ResultContent />
    </Suspense>
  );
}
