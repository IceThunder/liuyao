'use client';

import { YaoValue } from '@/types';
import { getYaoType, isMovingYao } from '@/lib/divination';
import YaoLine from './YaoLine';

interface HexagramProps {
  yaos: YaoValue[];
  title?: string;
  showMoving?: boolean;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Hexagram({ 
  yaos, 
  title, 
  showMoving = true, 
  animate = true,
  size = 'md' 
}: HexagramProps) {
  const widthClass = {
    sm: 'w-24',
    md: 'w-40',
    lg: 'w-56',
  }[size];

  // 爻从下到上显示，所以要反转
  const reversedYaos = [...yaos].reverse();

  return (
    <div className="flex flex-col items-center">
      {title && (
        <h3 className="font-serif-cn text-gold text-lg mb-3 glow-gold-text">
          {title}
        </h3>
      )}
      <div className={`${widthClass} flex flex-col`}>
        {reversedYaos.map((yao, idx) => (
          <YaoLine
            key={idx}
            type={getYaoType(yao)}
            moving={showMoving && isMovingYao(yao)}
            position={6 - idx}
            animate={animate}
          />
        ))}
      </div>
    </div>
  );
}
