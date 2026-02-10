'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface HistoryItem {
  id: string;
  question: string;
  timestamp: number;
  yaos: number[];
}

export default function HistoryPage() {
  const router = useRouter();
  const [records, setRecords] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('liuyao-history');
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  const handleView = (record: HistoryItem) => {
    localStorage.setItem('liuyao-current', JSON.stringify(record));
    router.push(`/result?id=${record.id}`);
  };

  const handleDelete = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('liuyao-history', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm('确定清空所有历史记录？')) {
      setRecords([]);
      localStorage.removeItem('liuyao-history');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-2 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        占卜历史
      </motion.h1>

      <motion.p
        className="text-center text-foreground/30 text-sm mb-8 font-serif-cn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        本地存储的占卜记录
      </motion.p>

      {records.length > 0 && (
        <motion.div
          className="flex justify-end mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={handleClearAll}
            className="text-xs text-vermilion/50 hover:text-vermilion transition-colors"
          >
            清空全部
          </button>
        </motion.div>
      )}

      {records.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl mb-4">📜</p>
          <p className="text-foreground/30 font-serif-cn">暂无占卜记录</p>
          <button
            onClick={() => router.push('/divine')}
            className="mt-4 text-gold/50 hover:text-gold text-sm font-serif-cn transition-colors"
          >
            去起卦 →
          </button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {records.map((record, idx) => (
              <motion.div
                key={record.id}
                className="
                  bg-ink-light/30 border border-gold/10 rounded-lg p-4
                  hover:border-gold/20 transition-colors cursor-pointer
                "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                exit={{ opacity: 0, x: -50 }}
                onClick={() => handleView(record)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif-cn text-gold/80 text-sm">
                      {record.question || '未填写问题'}
                    </p>
                    <p className="text-foreground/20 text-xs mt-1">
                      {new Date(record.timestamp).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/20 text-xs">
                      {record.yaos.map(y => 
                        y === 7 || y === 9 ? '⚊' : '⚋'
                      ).join(' ')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                      }}
                      className="text-foreground/10 hover:text-vermilion text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
