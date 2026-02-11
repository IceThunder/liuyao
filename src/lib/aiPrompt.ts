import { YaoValue } from '@/types';
import { TRIGRAMS } from '@/lib/hexagram';
import { getYaoType, isMovingYao } from '@/lib/divination';
import { findHexagramByTrigrams, HexagramJsonEntry } from '@/lib/hexagramLookup';

export function buildSystemPrompt(): string {
  return `你是一位精通周易六爻的占卜大师，拥有深厚的易学功底。你的解卦风格既尊重传统又通俗易懂。

请按以下结构进行解读：

## 卦象概况
简述本卦的基本含义和整体气象。

## 动爻分析
逐一分析动爻的爻辞含义及其在当前问题中的启示。如果没有动爻，说明卦象稳定，以本卦卦辞为主。

## 变卦趋势
分析变卦所揭示的事态发展方向（若有变卦）。

## 五行生克
简要分析上下卦五行关系对卦象的影响。

## 具体建议
针对求测事项给出切实可行的建议，语言温和而有洞见。

要求：
- 使用中文回复
- 使用 Markdown 格式
- 解读应结合求测者的具体问题
- 语气沉稳、温和，如同一位智慧长者在指点迷津
- 避免过于绝对的判断，多用"宜"、"不宜"、"可"、"慎"等措辞`;
}

export function buildUserPrompt(params: {
  question: string;
  yaos: YaoValue[];
  upperTrigram: string;
  lowerTrigram: string;
  changedUpperTrigram?: string;
  changedLowerTrigram?: string;
}): string {
  const { question, yaos, upperTrigram, lowerTrigram, changedUpperTrigram, changedLowerTrigram } = params;

  const upperInfo = TRIGRAMS[upperTrigram];
  const lowerInfo = TRIGRAMS[lowerTrigram];
  const hexData = findHexagramByTrigrams(upperTrigram, lowerTrigram);

  const posNames = ['初', '二', '三', '四', '五', '上'];
  const movingIndices: number[] = [];

  const yaoDetails = yaos.map((yao, i) => {
    const type = getYaoType(yao);
    const moving = isMovingYao(yao);
    if (moving) movingIndices.push(i);
    const lineText = hexData?.lines[i]?.text || '';
    const movingStr = moving ? ` **【动爻】→ 变${yao === 9 ? '阴' : '阳'}**` : '';
    return `${posNames[i]}爻：${type === 'yang' ? '阳（⚊）' : '阴（⚋）'} 值=${yao}${movingStr}${lineText ? ` 爻辞：「${lineText}」` : ''}`;
  }).join('\n');

  let prompt = `## 求测事项
${question || '未指定具体问题，请综合解读卦象'}

## 本卦信息
- 卦名：${hexData?.fullName || `${upperTrigram}${lowerTrigram}`}
- 上卦：${upperTrigram}（${upperInfo.nature}，五行${upperInfo.wuxing}）
- 下卦：${lowerTrigram}（${lowerInfo.nature}，五行${lowerInfo.wuxing}）`;

  if (hexData) {
    prompt += `\n- 卦辞：「${hexData.judgment}」`;
    prompt += `\n- 象辞：「${hexData.image}」`;
  }

  prompt += `\n\n## 六爻详情（从下到上）\n${yaoDetails}`;

  if (movingIndices.length > 0) {
    prompt += `\n\n## 动爻
共 ${movingIndices.length} 个动爻：${movingIndices.map(i => `${posNames[i]}爻`).join('、')}`;
  } else {
    prompt += `\n\n## 动爻\n无动爻，卦象静止，以本卦卦辞为主。`;
  }

  if (changedUpperTrigram && changedLowerTrigram) {
    const changedUpperInfo = TRIGRAMS[changedUpperTrigram];
    const changedLowerInfo = TRIGRAMS[changedLowerTrigram];
    const changedHexData = findHexagramByTrigrams(changedUpperTrigram, changedLowerTrigram);

    prompt += `\n\n## 变卦信息
- 卦名：${changedHexData?.fullName || `${changedUpperTrigram}${changedLowerTrigram}`}
- 上卦：${changedUpperTrigram}（${changedUpperInfo.nature}，五行${changedUpperInfo.wuxing}）
- 下卦：${changedLowerTrigram}（${changedLowerInfo.nature}，五行${changedLowerInfo.wuxing}）`;

    if (changedHexData) {
      prompt += `\n- 卦辞：「${changedHexData.judgment}」`;
      prompt += `\n- 象辞：「${changedHexData.image}」`;
    }
  }

  prompt += '\n\n请根据以上信息进行详细解卦。';

  return prompt;
}
