import hexagrams from '../../data/hexagrams.json';

export interface HexagramJsonEntry {
  number: number;
  name: string;
  fullName: string;
  upperTrigram: string;
  lowerTrigram: string;
  binary: string;
  unicode: string;
  judgment: string;
  image: string;
  lines: { position: string; text: string }[];
  summary: string;
}

export function findHexagramByTrigrams(upper: string, lower: string): HexagramJsonEntry | undefined {
  return (hexagrams as HexagramJsonEntry[]).find(
    h => h.upperTrigram === upper && h.lowerTrigram === lower
  );
}
