import { TianGan, DiZhi, WuXing, LiuQin, YaoInfo } from '@/types';

// 地支对应五行
export const dizhiWuxing: Record<DiZhi, WuXing> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};

// 天干对应五行
export const tianganWuxing: Record<TianGan, WuXing> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

// 八卦纳甲：每个经卦对应的天干和六个地支（从初爻到上爻）
// 乾纳甲壬，内卦子寅辰，外卦午申戌
// 坤纳乙癸，内卦未巳卯，外卦丑亥酉
export const najiaTiangan: Record<string, { inner: TianGan; outer: TianGan }> = {
  '乾': { inner: '甲', outer: '壬' },
  '坤': { inner: '乙', outer: '癸' },
  '震': { inner: '庚', outer: '庚' },
  '巽': { inner: '辛', outer: '辛' },
  '坎': { inner: '戊', outer: '戊' },
  '离': { inner: '己', outer: '己' },
  '艮': { inner: '丙', outer: '丙' },
  '兑': { inner: '丁', outer: '丁' },
};

export const najiaDizhi: Record<string, { inner: [DiZhi, DiZhi, DiZhi]; outer: [DiZhi, DiZhi, DiZhi] }> = {
  '乾': { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  '坤': { inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'] },
  '震': { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  '巽': { inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'] },
  '坎': { inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'] },
  '离': { inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'] },
  '艮': { inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'] },
  '兑': { inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'] },
};
