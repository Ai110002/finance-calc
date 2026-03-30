import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "列舉 vs 標準扣除額試算 2026｜綜所稅哪個省更多？30秒算出來",
  description:
    "台灣綜合所得稅列舉扣除額 vs 標準扣除額免費試算。輸入保險費、醫療費、房貸利息、租金，立即比較哪種方式少繳更多稅。依財政部 114 年度規定，單身 131,000 夫妻 262,000。",
  keywords: [
    "列舉扣除額試算",
    "標準扣除額",
    "列舉扣除額",
    "列舉vs標準",
    "綜所稅節稅",
    "報稅扣除額比較",
    "保險費列舉",
    "房貸利息列舉",
    "醫療費列舉扣除",
    "114年度扣除額",
    "綜合所得稅扣除額",
    "報稅節稅計算機",
  ],
  openGraph: {
    title: "列舉 vs 標準扣除額試算 2026｜哪個省更多稅？",
    description:
      "輸入你的保險費、醫療費、房貸利息，立即比較列舉 vs 標準扣除額哪個划算。依 114 年度最新規定，30秒出結果。",
    type: "website",
    url: "https://www.twtaxcalc.com/deduction-compare",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/deduction-compare",
  },
};

export default function DeductionCompareLayout({
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
              name: "列舉 vs 標準扣除額試算 2026",
              description:
                "台灣綜合所得稅列舉扣除額與標準扣除額比較工具，輸入保險費、醫療費、房貸利息等，即時算出哪種方式節稅更多",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/deduction-compare",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "列舉 vs 標準扣除額試算 2026｜綜所稅申報哪個省更多稅",
              description:
                "114年度報稅：標準扣除額單身 NT$131,000、夫妻 NT$262,000。列舉扣除額包含保險費（上限 NT$24,000/人）、醫療費（無上限）、購屋借款利息（上限 NT$300,000）、租金（上限 NT$120,000）。本工具幫你30秒算出哪種方式少繳稅。",
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
                  name: "列舉扣除額什麼時候比標準扣除額划算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "當你的列舉項目加總超過標準扣除額（單身 NT$131,000 / 夫妻 NT$262,000）時，用列舉更划算。常見情況：有高額自費醫療、夫妻保險費達上限、房貸年利息超過 NT$20~30 萬等。",
                  },
                },
                {
                  "@type": "Question",
                  name: "列舉扣除需要準備哪些文件？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "保險費：保險公司繳費證明；醫療費：醫療院所自費收據；購屋利息：銀行年度利息支出證明；租金：租賃契約及付款紀錄；捐贈：公益機構收據。健保署等機關資料會自動匯入網路申報系統。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房貸利息列舉上限 NT$300,000 是利息還是本金？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是「利息支出金額」，不含本金還款。銀行每年會寄送「房屋貸款利息支出證明書」，上面載明年度實際支付利息，這才是可申報的金額。通常房貸前幾年利息較高，後期隨本金減少而遞減。",
                  },
                },
                {
                  "@type": "Question",
                  name: "租金和房貸利息可以同時列舉嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "不行，只能二擇一。有自用住宅貸款通常選利息（上限 NT$300,000 較高）；純租屋族選租金（上限 NT$120,000）。同時填入兩者時，以購屋利息為主。",
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
