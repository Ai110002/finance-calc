import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "台股當沖稅費計算器 2026｜當沖稅率0.15%、手續費、損益平衡點完整說明",
  description:
    "2026年台股當沖（當日沖銷）稅費說明：證券交易稅0.15%優惠稅率延長至2027年底、手續費折扣試算、損益平衡點計算。資本利得免稅、補充保費不適用。完整費用結構與各股價區間試算表。",
  keywords: [
    "當沖稅",
    "當沖手續費",
    "當沖稅率",
    "當沖損益平衡",
    "台股當沖",
    "當沖費用計算",
    "證券交易稅",
    "當沖幾%",
    "當沖breakeven",
    "當沖0.15%",
    "股票當沖費用",
    "當沖成本",
    "當沖幾跳",
    "114年度當沖",
    "2026當沖稅費",
    "當沖資本利得",
    "當沖補充保費",
  ],
  openGraph: {
    title: "台股當沖稅費計算 2026｜0.15%交易稅＋手續費損益平衡點",
    description:
      "當沖稅率0.15%（優惠至2027底）、手續費最低1折、資本利得免稅、補充保費不適用。含各股價區間費用試算表與損益平衡跳數分析。",
    type: "website",
    url: "https://www.twtaxcalc.com/day-trading-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/day-trading-tax" },
};

export default function DayTradingTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
