import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 報稅版｜自由工作者所得稅計算器 — 114 年度・9A/9B・二代健保",
  description:
    "專為台灣自由工作者設計的 114 年度所得稅計算器（2026 年 5 月申報）。自動帶入 9A 職業成本比例、9B 稿費免稅額、標準vs列舉比較、二代健保補充保費、勞健保工會投保估算。免費、免登入。",
  keywords: [
    "報稅計算器", "所得稅試算", "自由工作者報稅", "9A", "9B稿費",
    "二代健保", "2026報稅", "114年度", "綜合所得稅", "freelancer tax calculator taiwan",
  ],
  openGraph: {
    title: "2026 報稅版｜自由工作者所得稅計算器",
    description: "專為台灣自由工作者設計。9A/9B 成本比例自動帶入、標準vs列舉即時比較、二代健保試算。114 年度所得，2026 年 5 月申報。",
    type: "website",
    url: "https://www.twtaxcalc.com/tax-calculator",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/tax-calculator",
  },
};

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "2026 報稅版 自由工作者所得稅計算器",
              description: "專為台灣自由工作者設計的 114 年度所得稅試算工具（2026 年 5 月申報）",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "自由工作者一定要報稅嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "只要年度綜合所得超過免稅額 + 標準扣除額（單身約 228,000），就需要報稅。",
                  },
                },
                {
                  "@type": "Question",
                  name: "9A 和 9B 有什麼差別？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "9A 是執行業務所得，適用於有專業證照的自由工作者，政府認定一定比例是成本不課稅。9B 是稿費、版稅等所得，前 18 萬免稅。",
                  },
                },
                {
                  "@type": "Question",
                  name: "二代健保補充保費怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "執行業務所得、稿費、租金、股利等，單筆給付 ≥ 20,000 元時，扣繳 2.11% 補充保費。單次給付上限 1,000 萬。",
                  },
                },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
