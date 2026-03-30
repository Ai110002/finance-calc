import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "房地合一稅計算機 2026｜賣房前必算，稅率45%到10%一秒試算",
  description:
    "台灣房地合一稅2.0（2021/07起）計算工具。輸入成交價、買入成本、持有年數，立即算出應繳稅額與稅後獲利。自用住宅400萬免稅、持有10年稅率15%全部算清楚。",
  keywords: [
    "房地合一稅計算機",
    "房地合一稅試算",
    "房地合一稅 2.0",
    "賣房要繳多少稅",
    "房地合一稅稅率",
    "自用住宅稅率",
    "房地合一稅節稅",
    "台灣賣房稅金計算",
    "房地合一稅 400萬",
    "持有幾年賣房最划算",
  ],
  openGraph: {
    title: "房地合一稅計算機｜賣房要繳多少稅？一秒算清楚",
    description:
      "輸入成交價和持有年數，秒算房地合一稅稅額與稅後獲利。自用住宅前400萬免稅、節稅4大策略、情境比較表。",
    type: "website",
    url: "https://www.twtaxcalc.com/real-estate-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/real-estate-tax",
  },
};

export default function RealEstateTaxLayout({
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
              name: "房地合一稅計算機 2026",
              description:
                "台灣房地合一稅2.0（2021/07起）個人賣房稅額計算工具，依持有年數自動套用45%~10%稅率，支援自用住宅400萬免稅優惠",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/real-estate-tax",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "房地合一稅計算機｜2026年賣房前必算，稅率45%到10%完整試算",
              description:
                "房地合一稅2.0依持有期間課徵45%~15%稅率，自用住宅設籍6年可享10%優惠且前400萬免稅。本計算機幫你算清稅後實拿獲利，賣前必用。",
              author: { "@type": "Organization", name: "twtaxcalc.com" },
              publisher: {
                "@type": "Organization",
                name: "twtaxcalc.com",
                url: "https://www.twtaxcalc.com",
              },
              dateModified: "2026-03-30",
              inLanguage: "zh-TW",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "房地合一稅稅率是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依持有期間決定：2年以內45%、2-5年35%、5-10年20%、10年以上15%。符合自用住宅條件（設籍滿6年）可享10%稅率，且課稅所得前400萬免稅。",
                  },
                },
                {
                  "@type": "Question",
                  name: "自用住宅的400萬免稅額是怎麼算的？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "符合自用住宅條件時，課稅所得前400萬完全免稅，超過400萬的部分才以10%稅率課稅。例如課稅所得600萬，只需繳(600萬-400萬)×10%=20萬。",
                  },
                },
                {
                  "@type": "Question",
                  name: "哪些費用可以從房地合一稅課稅所得中扣除？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "有憑證費用包括：仲介費（最高成交價4%）、代書費、廣告費、裝修改良費、借款利息（扣除租金後）。無憑證時可直接採用成交價×3%作為費用扣除。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房地合一稅什麼時候申報繳納？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "完成房地交易（產權移轉）後30日內，向戶籍所在地的稅務局申報並繳納。注意是交易完成後30天，不是等到隔年報稅才申報。",
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
