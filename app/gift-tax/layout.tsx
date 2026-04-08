import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "贈與稅試算｜114年度年度免稅額244萬、三級累進稅率 - 台灣財務試算",
  description:
    "114年度贈與稅：年度免稅額244萬，超過部分按三級累進稅率（10%/15%/20%）課徵。配偶間贈與免稅。輸入金額立即試算贈與稅額，含速算說明與規劃建議。",
  keywords: [
    "贈與稅",
    "贈與稅試算",
    "贈與稅計算",
    "114年度贈與稅",
    "贈與稅免稅額",
    "贈與稅244萬",
    "贈與稅稅率",
    "台灣贈與稅",
    "贈與稅怎麼算",
    "贈與稅2026",
    "gift tax taiwan",
    "遺產稅贈與稅",
    "配偶贈與免稅",
    "財產贈與計算",
  ],
  openGraph: {
    title: "贈與稅試算｜114年度免稅額244萬、10%~20%三級稅率",
    description:
      "114年度贈與稅：年度免稅額244萬，超過部分10%~20%三級累進稅率。配偶間贈與免稅。輸入金額立即試算，含規劃建議。",
    type: "website",
    url: "https://www.twtaxcalc.com/gift-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/gift-tax" },
};

export default function GiftTaxLayout({
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
              "@type": "Article",
              headline: "贈與稅試算｜114年度年度免稅額244萬、三級累進稅率",
              description:
                "114年度贈與稅完整說明：年度免稅額244萬元，超過部分按三級累進稅率課徵。配偶間贈與免稅，輸入金額立即試算。",
              dateModified: "2026-04-08",
              inLanguage: "zh-TW",
              publisher: {
                "@type": "Organization",
                name: "twtaxcalc.com",
                url: "https://www.twtaxcalc.com",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "114年度贈與稅免稅額是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度每人每年贈與稅免稅額為244萬元（2,440,000元）。同一人在一年內贈與他人的財產總額，超過244萬的部分才需繳贈與稅。配偶間贈與則依遺產及贈與稅法第20條全額免徵。",
                  },
                },
                {
                  "@type": "Question",
                  name: "贈與稅稅率是多少？怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度贈與稅採三級累進稅率：課稅贈與淨額0~2,500萬元適用10%；2,500萬~5,000萬元適用15%；超過5,000萬元適用20%。課稅贈與淨額 = 年度贈與總額 - 免稅額244萬。",
                  },
                },
                {
                  "@type": "Question",
                  name: "贈與現金給子女，超過244萬要繳多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "以贈與500萬給子女為例：課稅贈與淨額 = 500萬 - 244萬 = 256萬元，適用10%稅率，贈與稅 = 256,000元。贈與700萬：課稅淨額456萬，稅額456,000元。這只是試算參考，實際情況建議洽詢國稅局。",
                  },
                },
                {
                  "@type": "Question",
                  name: "分年贈與可以節稅嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以。免稅額244萬是每人每年的額度，不能跨年度累積，但可以每年各贈與244萬以內。例如連續2年各贈與244萬，合計488萬可完全免稅。但需注意贈與行為必須真實，避免被認定為假贈與。",
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
