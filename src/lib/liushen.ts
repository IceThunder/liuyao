import { TianGan, LiuShen } from '@/types';

// 六神顺序（固定）
const LIUSHEN_ORDER: LiuShen[] = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];

// 根据日干确定初爻六神起始位置
// 甲乙日起青龙，丙丁日起朱雀，戊日起勾陈，己日起螣蛇，庚辛日起白虎，壬癸日起玄武
const dayGanStartIndex: Record<TianGan, number> = {
  '甲': 0, '乙': 0,  // 青龙
  '丙': 1, '丁': 1,  // 朱雀
  '戊': 2,            // 勾陈
  '己': 3,            // 螣蛇
  '庚': 4, '辛': 4,  // 白虎
  '壬': 5, '癸': 5,  // 玄武
};

/**
 * 根据日干排六神
 * 返回从初爻到上爻的六神数组
 */
export function getLiuShen(dayGan: TianGan): LiuShen[] {
  const startIdx = dayGanStartIndex[dayGan];
  return Array.from({ length: 6 }, (_, i) => 
    LIUSHEN_ORDER[(startIdx + i) % 6]
  );
}

/** 六神对应颜色 */
export const liushenColors: Record<LiuShen, string> = {
  '青龙': '#4ade80',
  '朱雀': '#f87171',
  '勾陈': '#d4a853',
  '螣蛇': '#a78bfa',
  '白虎': '#f0f0f0',
  '玄武': '#60a5fa',
};
