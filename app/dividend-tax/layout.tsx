import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "股利所得申報試算 2026｜合併計稅 vs 分開課稅28% 哪個省？114年度",
  description:
    "股利所得選合併計稅還是分開課稅28%？依你的薪資所得×股利金額，秒算兩種方法實際稅差。含完整試算表＋決策指南，114年度（2026年5月申報）最新版。",
  keywords: [
    "股利所得申報", "股利合併計稅", "股利分開計稅", "股利28%",
    "股利合併還是分開", "股利稅率比較", "股利申報2026", "114年度股利申報",
    "股利所得稅怎麼算", "股利抵減稅額", "股利8.5%抵減", "股利稅負試算",
    "台股股利報稅", "股票股利申報", "ETF股利申報", "dividend tax taiwan",
    "115年度股利", "股利課稅方式比較",
  ],
  openGraph: {
    title: "股利所得申報：合併計稅 vs 分開課稅28%，哪個省更多？",
    description:
      "合併計稅享8.5%抵減（上限8萬），分開課稅固定28%。大部分人合併更省；稅率40%高薪族才考慮分開。含試算表，114年度版。",
    type: "website",
    url: "https://www.twtaxcalc.com/dividend-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/dividend-tax" },
};

export default function DividendTaxLayout({
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
              headline: "股利所得申報試算 2026｜合併計稅 vs 分開課稅28% 哪個省？",
              description:
                "台灣股利所得報稅完整指南：合併計稅享8.5%可抵減稅額（每戶上限80,000元），分開計稅固定28%分離課稅。依薪資所得級距分析何者划算，含詳細試算表。",
              dateModified: "2026-03-30",
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
                  name: "股利所得要選合併計稅還是分開課稅28%？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "大原則：稅率5%～30%的人選合併計稅通常更省，因為合併後可扣除股利×8.5%的可抵減稅額（每戶上限80,000元），實際稅負遠低於28%固定稅率。稅率40%（所得淨額超過498萬）的人才需考慮選分開課稅28%。建議用計算器實際試算你的情況。",
                  },
                },
                {
                  "@type": "Question",
                  name: "股利合併計稅的8.5%可抵減稅額怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "將股利算入綜合所得後，可用「股利金額×8.5%」抵減應納稅額，每戶上限80,000元（即股利約941,176元以上才觸及上限）。例如：股利100,000元，可抵減8,500元稅額。若合併後應納稅額不足抵減，差額可退稅或扣抵其他稅款。",
                  },
                },
                {
                  "@type": "Question",
                  name: "股利分開課稅28%適合哪些人？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "適合所得淨額超過498萬（稅率40%）的高薪族。原因：合併計稅時，股利以40%邊際稅率課稅，再扣8.5%抵減，實際稅負31.5%，高於分開課稅的28%。注意：若加計股利後才進入40%級距，需分段計算，用試算工具確認。",
                  },
                },
                {
                  "@type": "Question",
                  name: "ETF配息（股利）也適用8.5%可抵減稅額嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "部分適用。ETF配息分為「股利」和「資本利得配發」兩種：股利部分適用8.5%抵減；資本利得配發（非股利）不適用，也不計入個人綜合所得。建議查看ETF的配息明細（投信公司或集保結算所查詢）確認各類型金額。",
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
