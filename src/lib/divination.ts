import { YaoValue, CoinToss, YaoType } from '@/types';

/**
 * 模拟投掷三枚铜钱
 * 正面(字)=3, 反面(花)=2
 * 三枚之和: 6=老阴, 7=少阳, 8=少阴, 9=老阳
 */
export function tossCoin(): CoinToss {
  const coins: [boolean, boolean, boolean] = [
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5,
  ];
  
  const sum = coins.reduce((acc, coin) => acc + (coin ? 3 : 2), 0);
  
  return {
    coins,
    sum,
    yaoValue: sum as YaoValue,
  };
}

/** 根据爻值判断阴阳 */
export function getYaoType(value: YaoValue): YaoType {
  // 6=老阴(阴), 7=少阳(阳), 8=少阴(阴), 9=老阳(阳)
  return (value === 7 || value === 9) ? 'yang' : 'yin';
}

/** 判断是否为动爻 */
export function isMovingYao(value: YaoValue): boolean {
  return value === 6 || value === 9;
}

/** 获取动爻变化后的阴阳（老阳变阴，老阴变阳） */
export function getChangedYaoType(value: YaoValue): YaoType {
  if (value === 9) return 'yin';   // 老阳变阴
  if (value === 6) return 'yang';  // 老阴变阳
  return getYaoType(value);        // 不动则不变
}

/** 爻值的中文描述 */
export function getYaoDescription(value: YaoValue): string {
  const map: Record<YaoValue, string> = {
    6: '老阴 ⚋✕',
    7: '少阳 ⚊',
    8: '少阴 ⚋',
    9: '老阳 ⚊✕',
  };
  return map[value];
}

/** 生成唯一ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
