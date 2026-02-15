'use client';

import { useI18n } from '@/lib/i18n/context';

interface BilingualTextProps {
  tKey: string;
  params?: Record<string, string | number>;
  className?: string;
  zhClassName?: string;
  translatedClassName?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

export default function BilingualText({
  tKey,
  params,
  className = '',
  zhClassName = '',
  translatedClassName = 'text-foreground/30 text-xs mt-0.5',
  as: Tag = 'span',
}: BilingualTextProps) {
  const { tp } = useI18n();
  const { zh, translated } = tp(tKey, params);

  if (!translated) {
    return <Tag className={`${className} ${zhClassName}`}>{zh}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className={zhClassName}>{zh}</span>
      <span className={`block ${translatedClassName}`}>{translated}</span>
    </Tag>
  );
}
