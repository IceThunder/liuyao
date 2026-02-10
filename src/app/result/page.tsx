'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { YaoValue } from '@/types';
import { getYaoType, isMovingYao, getChangedYaoType } from '@/lib/divination';
import { getTrigramsFromYaos, getChangedTrigramsFromYaos, TRIGRAMS } from '@/lib/hexagram';
import Hexagram from '@/components/Hexagram';

interface StoredData {
  id: string;
  question: string;
  timestamp: number;
  yaos: YaoValue[];
}

function ResultContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<StoredData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('liuyao-current');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/30 font-serif-cn">加载中...</p>
      </div>
    );
  }

  const { yaos, question, timestamp } = data;
  const { upper, lower } = getTrigramsFromYaos(yaos);
  const changed = getChangedTrigramsFromYaos(yaos);
  const hasMoving = yaos.some(v => isMovingYao(v));
  const hexName = `${TRIGRAMS[upper].nature}${TRIGRAMS[lower].nature}`;

  // 变卦的爻值
  const changedYaos: YaoValue[] = yaos.map(v => {
    if (v === 9) return 8 as YaoValue;
    if (v === 6) return 7 as YaoValue;
    return v;
  });

  let changedHexName = '';
  if (changed) {
    changedHexName = `${TRIGRAMS[changed.upper].nature}${TRIGRAMS[changed.lower].nature}`;
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-2 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        卦象解析
      </motion.h1>

      {question && (
        <motion.p
          className="text-center text-foreground/40 text-sm mb-8 font-serif-cn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          所问：{question}
        </motion.p>
      )}

      <motion.p
        className="text-center text-foreground/20 text-xs mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {new Date(timestamp).toLocaleString('zh-CN')}
      </motion.p>

      {/* 本卦与变卦 */}
      <motion.div
        className="flex flex-wrap justify-center gap-12 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <Hexagram yaos={yaos} title="本卦" size="lg" />
          <p className="mt-3 font-serif-cn text-gold/60 text-sm">
            {upper}{TRIGRAMS[upper].nature} 上 / {lower}{TRIGRAMS[lower].nature} 下
          </p>
        </div>

        {hasMoving && changed && (
          <>
            <div className="flex items-center text-gold/30 text-2xl font-serif-cn">→</div>
            <div className="flex flex-col items-center">
              <Hexagram yaos={changedYaos} title="变卦" size="lg" showMoving={false} />
              <p className="mt-3 font-serif-cn text-gold/60 text-sm">
                {changed.upper}{TRIGRAMS[changed.upper].nature} 上 / {changed.lower}{TRIGRAMS[changed.lower].nature} 下
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
        <h2 className="font-serif-cn text-gold text-lg mb-4">六爻详情</h2>
        <div className="space-y-2">
          {[...yaos].reverse().map((yao, idx) => {
            const pos = 6 - idx;
            const posNames = ['初', '二', '三', '四', '五', '上'];
            const yaoType = getYaoType(yao);
            const moving = isMovingYao(yao);
            return (
              <div key={idx} className="flex items-center gap-4 text-sm py-1 border-b border-gold/5">
                <span className="text-gold/40 w-10 font-serif-cn">{posNames[pos - 1]}爻</span>
                <span className={`w-12 ${yaoType === 'yang' ? 'text-gold' : 'text-foreground/50'}`}>
                  {yaoType === 'yang' ? '⚊ 阳' : '⚋ 阴'}
                </span>
                {moving && (
                  <span className="text-vermilion text-xs px-2 py-0.5 rounded bg-vermilion/10">
                    动爻 → {yao === 9 ? '变阴' : '变阳'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* AI解卦预留区域 */}
      <motion.div
        className="bg-ink-light/30 border border-gold/10 rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="font-serif-cn text-gold text-lg mb-4">AI 解卦</h2>
        <div className="text-foreground/20 text-center py-8 font-serif-cn">
          <p className="text-2xl mb-2">🔮</p>
          <p>AI 解卦功能即将上线</p>
          <p className="text-xs mt-1">将结合卦象、爻辞、六亲关系进行智能分析</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-foreground/30 font-serif-cn">加载中...</p></div>}>
      <ResultContent />
    </Suspense>
  );
}
