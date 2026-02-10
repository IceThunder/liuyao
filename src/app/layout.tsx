import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "六爻占卜 - 古法铜钱起卦",
  description: "传统六爻占卜系统，铜钱法起卦，纳甲装卦，六亲六神，AI智能解卦",
  keywords: ["六爻", "占卜", "铜钱", "纳甲", "周易", "八卦"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased bg-texture min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-gold/10">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-serif-cn text-gold text-lg font-bold tracking-wider">
              六爻占卜
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/divine" className="text-foreground/70 hover:text-gold transition-colors">起卦</a>
              <a href="/hexagrams" className="text-foreground/70 hover:text-gold transition-colors">卦典</a>
              <a href="/history" className="text-foreground/70 hover:text-gold transition-colors">历史</a>
            </div>
          </div>
        </nav>
        <main className="pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
