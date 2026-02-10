# 六爻占卜 (Liu Yao Divination)

## Development Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 + custom CSS variables (globals.css)
- **Animation**: framer-motion
- **Rendering**: Client-side only (`'use client'` on all pages)
- **Persistence**: localStorage (keys: `liuyao-history`, `liuyao-current`)
- **Path alias**: `@/*` maps to `./src/*`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with nav (server component, metadata only)
│   ├── page.tsx          # Landing page (太极动画, 入口)
│   ├── globals.css       # Theme variables, custom utilities, animations
│   ├── divine/page.tsx   # Coin toss divination flow (铜钱起卦)
│   ├── result/page.tsx   # Hexagram result display (卦象解析)
│   ├── hexagrams/page.tsx # 64 hexagram encyclopedia (卦典)
│   └── history/page.tsx  # Divination history from localStorage
├── components/
│   ├── Coin.tsx          # Animated coin component
│   ├── YaoLine.tsx       # Single yao line (阴/阳/动爻)
│   ├── Hexagram.tsx      # 6-line hexagram display
│   └── HexagramCard.tsx  # Card for hexagram list
├── lib/
│   ├── divination.ts     # Coin toss logic, yao value helpers, ID generation
│   ├── hexagram.ts       # Trigram definitions (八卦), trigram lookup from yao values
│   ├── najia.ts          # 纳甲 system (天干地支 assignment to yao lines)
│   ├── liushen.ts        # 六神 assignment based on day stem (日干)
│   ├── wuxing.ts         # 五行 (Five Elements) relationships: 生/克
│   └── hexagramData.ts   # 64 hexagram data (卦辞, 象辞, 爻辞)
├── types/
│   └── index.ts          # All TypeScript types and interfaces
data/
└── trigrams.json         # Trigram reference data
```

## Domain Context (六爻 System)

This app implements traditional Chinese 六爻 (Six Lines) divination:

1. **起卦 (Casting)**: User shakes 3 coins 6 times. Each toss yields a yao value:
   - Sum of coins (正/字=3, 反/花=2): 6=老阴, 7=少阳, 8=少阴, 9=老阳
   - 6 and 9 are "moving lines" (动爻) that transform in the changed hexagram (变卦)

2. **装卦 (Assembly)**: Lines are built bottom-to-top (初爻→上爻). Lower 3 lines = lower trigram (下卦), upper 3 = upper trigram (上卦).

3. **纳甲 (Najia)**: Each trigram maps to a Heavenly Stem (天干) and each line to an Earthly Branch (地支), determining the Five Element (五行) of each line.

4. **六亲 (Six Relations)**: Derived from the relationship between each line's 五行 and the hexagram's palace 五行: 父母, 兄弟, 子孙, 妻财, 官鬼.

5. **六神 (Six Spirits)**: Assigned to lines based on the day's Heavenly Stem (日干): 青龙, 朱雀, 勾陈, 螣蛇, 白虎, 玄武.

## Key Patterns

- **Theme**: Dark ink background (#0d0d1a) with gold (#d4a853) and vermilion (#c23a2b) accents. Chinese serif font (Noto Serif SC) via `.font-serif-cn` class.
- **Custom CSS classes**: `glow-gold`, `glow-gold-text`, `glow-vermilion`, `bg-texture`, `coin-flip`, `taiji-rotate`
- **Tailwind theme colors**: `gold`, `gold-light`, `gold-dark`, `vermilion`, `ink`, `ink-light`, `ink-lighter`, `jade`, `paper`
- **Data flow**: divine page stores result to localStorage → result page reads from localStorage via `liuyao-current` key
- **Yao ordering**: Arrays are always bottom-to-top (index 0 = 初爻/bottom, index 5 = 上爻/top); UI reverses for display
- **Language**: All UI text is in Chinese (zh-CN)
