import { WuXing } from '@/types';

// 五行相生：木生火，火生土，土生金，金生水，水生木
const shengMap: Record<WuXing, WuXing> = {
  '木': '火',
  '火': '土',
  '土': '金',
  '金': '水',
  '水': '木',
};

// 五行相克：木克土，土克水，水克火，火克金，金克木
const keMap: Record<WuXing, WuXing> = {
  '木': '土',
  '土': '水',
  '水': '火',
  '火': '金',
  '金': '木',
};

/** 判断 a 是否生 b */
export function isSheng(a: WuXing, b: WuXing): boolean {
  return shengMap[a] === b;
}

/** 判断 a 是否克 b */
export function isKe(a: WuXing, b: WuXing): boolean {
  return keMap[a] === b;
}

/** 获取生我者（印） */
export function getShengWo(me: WuXing): WuXing {
  return Object.entries(shengMap).find(([, v]) => v === me)![0] as WuXing;
}

/** 获取我生者（食伤） */
export function getWoSheng(me: WuXing): WuXing {
  return shengMap[me];
}

/** 获取克我者（官鬼） */
export function getKeWo(me: WuXing): WuXing {
  return Object.entries(keMap).find(([, v]) => v === me)![0] as WuXing;
}

/** 获取我克者（妻财） */
export function getWoKe(me: WuXing): WuXing {
  return keMap[me];
}

/** 获取同我者（兄弟） */
export function getTongWo(me: WuXing): WuXing {
  return me;
}

/** 五行对应颜色（用于UI展示） */
export const wuxingColors: Record<WuXing, string> = {
  '金': '#f0d48a',
  '木': '#4ade80',
  '水': '#60a5fa',
  '火': '#f87171',
  '土': '#d4a853',
};
