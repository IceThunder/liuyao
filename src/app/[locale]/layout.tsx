import type { Metadata } from 'next';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n/config';
import { I18nProvider } from '@/lib/i18n/context';

const metadataByLocale: Record<Locale, Metadata> = {
  'zh-CN': {
    title: '六爻占卜 - 古法铜钱起卦',
    description: '传统六爻占卜系统，铜钱法起卦，纳甲装卦，六亲六神，AI智能解卦',
    keywords: ['六爻', '占卜', '铜钱', '纳甲', '周易', '八卦'],
  },
  en: {
    title: 'Liu Yao Divination - Ancient Coin Oracle',
    description: 'Traditional Liu Yao divination system with coin casting, Najia analysis, Six Relations, Six Spirits, and AI-powered interpretation',
    keywords: ['Liu Yao', 'divination', 'I Ching', 'hexagram', 'oracle', 'coin casting'],
  },
  ja: {
    title: '六爻占い - 古法銅銭起卦',
    description: '伝統的な六爻占いシステム。銅銭法起卦、納甲装卦、六親六神、AI智能解卦',
    keywords: ['六爻', '占い', '銅銭', '納甲', '周易', '八卦'],
  },
  ko: {
    title: '육효점 - 고법동전기괘',
    description: '전통 육효점 시스템, 동전법 기괘, 납갑장괘, 육친육신, AI 지능형 해괘',
    keywords: ['육효', '점괘', '동전', '납갑', '주역', '팔괘'],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  return metadataByLocale[locale] || metadataByLocale[defaultLocale];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <I18nProvider locale={locale}>
      {children}
    </I18nProvider>
  );
}
