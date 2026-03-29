import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "房貸計算器 2026｜月付金試算・新青安・等額本息vs本金比較",
  description:
    "免費房貸試算工具：輸入貸款金額、利率、年限，即時算出每月還款金額。支援等額本息/等額本金比較、寬限期試算、新青安優惠利率。台灣各大銀行最新房貸利率參考。",
  keywords: [
    "房貸計算器", "房貸試算", "房貸利率", "新青安", "青安貸款",
    "等額本息", "等額本金", "寬限期", "房貸月付金", "mortgage calculator taiwan",
  ],
  openGraph: {
    title: "房貸計算器 2026｜月付金試算・新青安・利率比較",
    description: "輸入金額和利率，秒算每月還款。支援新青安、寬限期、兩種還款方式比較。免費、免登入。",
    type: "website",
    url: "https://www.twtaxcalc.com/mortgage",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/mortgage",
  },
};

export default function MortgageLayout({
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
              name: "房貸計算器 2026",
              description: "台灣房貸月付金試算，支援新青安、寬限期、等額本息vs本金比較",
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
                  name: "新青安貸款利率是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2026年新青安一段式機動利率約 1.775%，二段式前兩年 1.69%、第三年起 1.99%。政府補貼至 2026 年 7 月底，之後利率加 0.375%。",
                  },
                },
                {
                  "@type": "Question",
                  name: "等額本息和等額本金哪個划算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "等額本金總利息較少，但前期月付較高。等額本息每月固定，適合預算穩定的人。以 800 萬貸款 30 年 2.1% 利率為例，等額本金可省約 10-15 萬利息。",
                  },
                },
                {
                  "@type": "Question",
                  name: "寬限期是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "寬限期內只繳利息不還本金，月付較低。但寬限期結束後，剩餘本金要在更短時間內還完，月付會變高。新青安最長寬限期 5 年。",
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
