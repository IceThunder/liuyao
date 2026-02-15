import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import AuthProvider from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

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
      {adsenseId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <body className="bg-background text-foreground antialiased bg-texture min-h-screen">
        <AuthProvider>
          <I18nProvider locale="zh-CN">
            <NavBar />
            <main className="pt-14">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
