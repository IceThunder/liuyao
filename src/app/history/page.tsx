'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useI18n } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/config';
import {
  getLocalHistory,
  saveLocalHistory,
  getCloudHistory,
  deleteCloudRecord,
  syncLocalToCloud,
  type HistoryRecord,
} from '@/lib/historyStore';
import AdUnit from '@/components/AdUnit';

export default function HistoryPage() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const { data: session, status: authStatus } = useSession();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [isCloud, setIsCloud] = useState(false);

  const loadRecords = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const cloud = await getCloudHistory();
        setRecords(cloud);
        setIsCloud(true);
      } catch {
        setRecords(getLocalHistory());
        setIsCloud(false);
      }
    } else {
      setRecords(getLocalHistory());
      setIsCloud(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (authStatus === 'loading') return;
    loadRecords();
  }, [authStatus, loadRecords]);

  // Auto-sync local records to cloud on first login
  useEffect(() => {
    if (!session?.user?.id) return;
    const syncKey = `liuyao-synced-${session.user.id}`;
    if (localStorage.getItem(syncKey)) return;

    const local = getLocalHistory();
    if (local.length === 0) {
      localStorage.setItem(syncKey, '1');
      return;
    }

    setSyncing(true);
    syncLocalToCloud()
      .then(() => {
        localStorage.setItem(syncKey, '1');
        loadRecords();
      })
      .catch(() => {})
      .finally(() => setSyncing(false));
  }, [session?.user?.id, loadRecords]);

  const handleView = (record: HistoryRecord) => {
    localStorage.setItem('liuyao-current', JSON.stringify(record));
    router.push(getLocalizedPath(`/result?id=${record.id}`, locale));
  };

  const handleDelete = async (id: string) => {
    if (isCloud) {
      try {
        await deleteCloudRecord(id);
        setRecords(prev => prev.filter(r => r.id !== id));
      } catch {
        // fallback
      }
    } else {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      saveLocalHistory(updated);
    }
  };

  const handleClearAll = async () => {
    if (!confirm(t('history.clear.confirm'))) return;
    if (isCloud) {
      for (const r of records) {
        try { await deleteCloudRecord(r.id); } catch {}
      }
      setRecords([]);
    } else {
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
        {t('history.title')}
      </motion.h1>

      <motion.p
        className="text-center text-foreground/30 text-sm mb-8 font-serif-cn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('history.subtitle')}
        {isCloud && (
          <span className="ml-2 text-jade text-xs">({t('history.cloud')})</span>
        )}
      </motion.p>

      {syncing && (
        <motion.p
          className="text-center text-gold/60 text-sm mb-4 font-serif-cn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('history.syncing')}
        </motion.p>
      )}

      {/* 广告位 */}
      <AdUnit adSlot="history-top" adFormat="horizontal" className="mb-4" />

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
            {t('history.clear')}
          </button>
        </motion.div>
      )}

      {records.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-foreground/30 font-serif-cn">{t('history.empty')}</p>
          <button
            onClick={() => router.push(getLocalizedPath('/divine', locale))}
            className="mt-4 text-gold/50 hover:text-gold text-sm font-serif-cn transition-colors"
          >
            {t('history.empty.action')}
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
                      {record.question || t('history.no.question')}
                    </p>
                    <p className="text-foreground/20 text-xs mt-1">
                      {new Date(record.timestamp).toLocaleString(locale)}
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
