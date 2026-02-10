'use client';

import { motion } from 'framer-motion';

interface CoinProps {
  isHead: boolean;       // true=正面(字), false=反面(花)
  isFlipping: boolean;   // 是否正在翻转
  delay?: number;        // 动画延迟
}

export default function Coin({ isHead, isFlipping, delay = 0 }: CoinProps) {
  return (
    <motion.div
      className="w-20 h-20 rounded-full relative"
      style={{ perspective: '600px' }}
      animate={isFlipping ? {
        rotateY: [0, 720],
        rotateX: [0, 180, 0],
      } : {}}
      transition={{
        duration: 1,
        delay,
        ease: 'easeInOut',
      }}
    >
      <div className={`
        w-full h-full rounded-full border-2
        flex items-center justify-center
        font-serif-cn text-2xl font-bold
        ${isHead 
          ? 'bg-gradient-to-br from-yellow-600 to-yellow-800 border-yellow-500 text-yellow-200' 
          : 'bg-gradient-to-br from-yellow-700 to-yellow-900 border-yellow-600 text-yellow-300'}
        shadow-lg
      `}>
        <div className="absolute inset-1 rounded-full border border-yellow-500/30" />
        {isHead ? (
          <span className="relative z-10">字</span>
        ) : (
          <span className="relative z-10">花</span>
        )}
      </div>
    </motion.div>
  );
}
