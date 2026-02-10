'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HEXAGRAM_NAMES } from '@/lib/hexagramData';
import HexagramCard from '@/components/HexagramCard';

export default function HexagramsPage() {
  const [search, setSearch] = useState('');

  const filtered = HEXAGRAM_NAMES
    .map((name, idx) => ({ name, index: idx + 1 }))
    .filter(h => h.name.includes(search));

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <motion.h1
        className="font-serif-cn text-3xl text-gold text-center mb-2 glow-gold-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        六十四卦
      </motion.h1>

      <motion.p
        className="text-center text-foreground/30 text-sm mb-8 font-serif-cn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        周易六十四卦总览
      </motion.p>

      {/* 搜索 */}
      <motion.div
        className="mb-8 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索卦名..."
          className="
            w-full px-4 py-2 rounded-lg
            bg-ink-light/50 border border-gold/10
            text-foreground placeholder:text-foreground/20
            focus:outline-none focus:border-gold/30
            font-serif-cn text-sm
          "
        />
      </motion.div>

      {/* 卦象网格 */}
      <motion.div
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filtered.map((hex) => (
          <HexagramCard
            key={hex.index}
            index={hex.index}
            name={hex.name}
          />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-foreground/20 mt-12 font-serif-cn">
          未找到匹配的卦象
        </p>
      )}
    </div>
  );
}
