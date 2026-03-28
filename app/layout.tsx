import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const font = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "財務自由計算器 — 存錢目標 · 退休提領 · 融資維持率 · 斷頭模擬",
  description:
    "一站式財務規劃：設定目標、計算每月儲蓄、退休4%法則、股票質押、融資維持率計算、斷頭模擬。免費、免登入、不構成投資建議。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${font.className} h-full antialiased scroll-smooth`}>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-full bg-gray-50 text-gray-900">
        <div className="mx-auto min-h-screen max-w-lg">
          {children}
        </div>
        <a
          href="https://forms.gle/AhwPK6uPuZ7pQHoDA"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          意見回饋
        </a>
      </body>
    </html>
  );
}
