'use client';

import { motion } from 'framer-motion';
import { YaoType } from '@/types';

interface YaoLineProps {
  type: YaoType;
  moving?: boolean;
  position?: number;
  animate?: boolean;
}

export default function YaoLine({ type, moving = false, position = 1, animate = true }: YaoLineProps) {
  const baseDelay = animate ? (position - 1) * 0.15 : 0;

  if (type === 'yang') {
    // 阳爻：一条实线
    return (
      <motion.div
        className="flex items-center justify-center gap-1 my-1"
        initial={animate ? { opacity: 0, x: -20 } : {}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: baseDelay, duration: 0.4 }}
      >
        {moving && <span className="text-vermilion text-xs mr-1">○</span>}
        <div className={`h-3 flex-1 rounded-sm ${moving ? 'bg-vermilion' : 'bg-gold'}`} />
        {moving && <span className="text-vermilion text-xs ml-1">○</span>}
      </motion.div>
    );
  }

  // 阴爻：中间断开的两段
  return (
    <motion.div
      className="flex items-center justify-center gap-1 my-1"
      initial={animate ? { opacity: 0, x: -20 } : {}}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: baseDelay, duration: 0.4 }}
    >
      {moving && <span className="text-vermilion text-xs mr-1">✕</span>}
      <div className={`h-3 flex-1 rounded-sm ${moving ? 'bg-vermilion' : 'bg-gold'}`} />
      <div className="w-4" />
      <div className={`h-3 flex-1 rounded-sm ${moving ? 'bg-vermilion' : 'bg-gold'}`} />
      {moving && <span className="text-vermilion text-xs ml-1">✕</span>}
    </motion.div>
  );
}
