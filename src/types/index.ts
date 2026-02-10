// 爻的类型：6=老阴, 7=少阳, 8=少阴, 9=老阳
export type YaoValue = 6 | 7 | 8 | 9;

// 爻的阴阳
export type YaoType = 'yang' | 'yin';

// 是否为动爻
export type YaoMoving = boolean;

// 单爻信息
export interface YaoInfo {
  value: YaoValue;
  type: YaoType;        // 阴或阳
  moving: boolean;      // 是否动爻
  position: number;     // 爻位 1-6（从下到上）
  napiaTiangan?: string;  // 纳甲天干
  napiaDizhi?: string;    // 纳甲地支
  wuxing?: WuXing;        // 五行
  liuqin?: LiuQin;        // 六亲
  liushen?: LiuShen;      // 六神
  shiYing?: 'shi' | 'ying'; // 世应
}

// 五行
export type WuXing = '金' | '木' | '水' | '火' | '土';

// 六亲
export type LiuQin = '父母' | '兄弟' | '子孙' | '妻财' | '官鬼';

// 六神
export type LiuShen = '青龙' | '朱雀' | '勾陈' | '螣蛇' | '白虎' | '玄武';

// 天干
export type TianGan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

// 地支
export type DiZhi = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

// 八卦（经卦）
export interface Trigram {
  name: string;       // 卦名：乾兑离震巽坎艮坤
  nature: string;     // 卦性：天泽火雷风水山地
  wuxing: WuXing;     // 五行属性
  yaoPattern: [YaoType, YaoType, YaoType]; // 三爻组合（从下到上）
}

// 六十四卦（别卦）
export interface HexagramData {
  index: number;       // 序号 1-64
  name: string;        // 卦名
  upperTrigram: string; // 上卦名
  lowerTrigram: string; // 下卦名
  guaCi: string;       // 卦辞
  xiangCi: string;     // 象辞
  yaoCi: string[];     // 爻辞（6条）
  unicode?: string;    // Unicode卦象符号
}

// 铜钱单次投掷结果
export interface CoinToss {
  coins: [boolean, boolean, boolean]; // true=正面(3), false=反面(2)
  sum: number;    // 三枚之和
  yaoValue: YaoValue;
}

// 完整的起卦结果
export interface DivinationResult {
  id: string;
  question: string;
  timestamp: number;
  tosses: CoinToss[];
  yaos: YaoInfo[];
  originalHexagram: HexagramData;  // 本卦
  changedHexagram?: HexagramData;  // 变卦（有动爻时）
  dayGan: TianGan;   // 日干（用于排六神）
  monthZhi: DiZhi;   // 月支（用于判断旺衰）
}

// 历史记录
export interface DivinationRecord {
  id: string;
  question: string;
  timestamp: number;
  hexagramName: string;
  changedHexagramName?: string;
  yaos: YaoValue[];
}
