import { YaoValue, YaoType, Trigram, HexagramData } from '@/types';
import { getYaoType, getChangedYaoType, isMovingYao } from './divination';

// 八卦定义（经卦），yaoPattern 从下到上
export const TRIGRAMS: Record<string, Trigram> = {
  '乾': { name: '乾', nature: '天', wuxing: '金', yaoPattern: ['yang', 'yang', 'yang'] },
  '兑': { name: '兑', nature: '泽', wuxing: '金', yaoPattern: ['yin', 'yang', 'yang'] },
  '离': { name: '离', nature: '火', wuxing: '火', yaoPattern: ['yang', 'yin', 'yang'] },
  '震': { name: '震', nature: '雷', wuxing: '木', yaoPattern: ['yang', 'yin', 'yin'] },
  '巽': { name: '巽', nature: '风', wuxing: '木', yaoPattern: ['yin', 'yang', 'yin'] },
  '坎': { name: '坎', nature: '水', wuxing: '水', yaoPattern: ['yin', 'yang', 'yin'] },
  '艮': { name: '艮', nature: '山', wuxing: '土', yaoPattern: ['yin', 'yin', 'yang'] },
  '坤': { name: '坤', nature: '地', wuxing: '土', yaoPattern: ['yin', 'yin', 'yin'] },
};

// 用二进制模式查找经卦（从下到上: yang=1, yin=0）
const trigramByBinary: Record<string, string> = {
  '111': '乾', '011': '兑', '101': '离', '100': '震',
  '110': '巽', '010': '坎', '001': '艮', '000': '坤',
};

/** 根据三爻（从下到上）确定经卦名 */
export function findTrigram(yaos: [YaoType, YaoType, YaoType]): string {
  const binary = yaos.map(y => y === 'yang' ? '1' : '0').join('');
  return trigramByBinary[binary] || '坤';
}

/** 根据六爻值确定上下卦 */
export function getTrigramsFromYaos(yaoValues: YaoValue[]): { upper: string; lower: string } {
  const types = yaoValues.map(v => getYaoType(v));
  const lower = findTrigram(types.slice(0, 3) as [YaoType, YaoType, YaoType]);
  const upper = findTrigram(types.slice(3, 6) as [YaoType, YaoType, YaoType]);
  return { upper, lower };
}

/** 获取变卦的上下卦 */
export function getChangedTrigramsFromYaos(yaoValues: YaoValue[]): { upper: string; lower: string } | null {
  if (!yaoValues.some(v => isMovingYao(v))) return null;
  const changedTypes = yaoValues.map(v => getChangedYaoType(v));
  const lower = findTrigram(changedTypes.slice(0, 3) as [YaoType, YaoType, YaoType]);
  const upper = findTrigram(changedTypes.slice(3, 6) as [YaoType, YaoType, YaoType]);
  return { upper, lower };
}
