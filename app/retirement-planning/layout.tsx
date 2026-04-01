import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退休金缺口試算器 2026｜勞退＋勞保年金，我退休存夠了嗎？",
  description:
    "台灣退休金缺口免費試算。輸入目前年齡、退休目標月支出、月薪，計算勞退新制＋勞保老年年金合計月領，與退休需求對比，算出缺口金額與每月需額外儲蓄多少。依 114 年度規定。",
  keywords: [
    "退休金規劃",
    "退休金缺口",
    "退休試算器",
    "勞退勞保退休金",
    "台灣退休規劃",
    "退休需要多少錢",
    "退休月領試算",
    "勞保年金試算",
    "退休金計算機",
    "退休規劃台灣",
    "退休缺口計算",
    "勞退新制退休",
    "retirement planning taiwan",
  ],
  openGraph: {
    title: "退休金缺口試算器｜勞退＋勞保年金，你的退休存夠了嗎？",
    description:
      "月薪5萬，退休後每月想花5萬，缺口超過700萬。每月需多存多少？30秒算清楚。",
    type: "website",
    url: "https://www.twtaxcalc.com/retirement-planning",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/retirement-planning",
  },
};

export default function RetirementPlanningLayout({
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
              name: "退休金缺口試算器 2026",
              description:
                "台灣退休金缺口互動試算工具，計算勞退新制＋勞保老年年金月領合計，與退休後支出對比，算出缺口金額與每月需額外儲蓄金額",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/retirement-planning",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "退休金缺口試算器 2026｜勞退＋勞保年金，我退休存夠了嗎？",
              description:
                "台灣受僱勞工的兩大退休收入——勞退新制個人帳戶和勞保老年年金——合計月領通常不足退休目標，本工具計算你的退休缺口並建議每月需額外儲蓄多少。",
              author: { "@type": "Organization", name: "twtaxcalc.com" },
              publisher: {
                "@type": "Organization",
                name: "twtaxcalc.com",
                url: "https://www.twtaxcalc.com",
              },
              dateModified: "2026-04-01",
              inLanguage: "zh-TW",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "勞退新制和勞保年金有什麼不同？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "勞退新制是雇主強制提撥月薪 6% 進你的個人帳戶，帳戶屬於你，換工作不歸零，最早 60 歲申請。勞保年金是社會保險，依年資和薪資計算月領，兩者完全獨立，都可以領。",
                  },
                },
                {
                  "@type": "Question",
                  name: "退休後每月需要多少錢才夠？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "主計總處統計台灣單人月消費約 2.5 萬，雙人約 4.5 萬。建議設定月支出 4~6 萬做為規劃基準，再依個人生活目標調整。本試算器可讓你自訂目標，算出實際缺口。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞保年金什麼時候可以領？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依出生年份不同，1962 年以後出生者需 65 歲才能領取。勞退新制最早 60 歲可申請，工作年資滿 15 年可選月領，未滿 15 年只能一次領清。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退自提 6% 值得嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "幾乎所有情況都值得。自提金額可從薪資所得全額扣除，等於政府補貼稅率比例的費用。月薪 5 萬、邊際稅率 12%，自提 6% 每年節稅 4,320 元。越早自提複利效益越大。",
                  },
                },
                {
                  "@type": "Question",
                  name: "退休金缺口怎麼填補最有效率？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "優先：①先用足勞退自提 6%（節稅同時強制儲蓄）；②透過 ETF/基金長期投資（年化 4~6% 合理預期）；③越早開始，每月需存金額越少。本試算器顯示不同報酬率假設下的每月建議儲蓄金額。",
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
