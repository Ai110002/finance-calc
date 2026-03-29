import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "基本生活費差額計算器 — 114年度免稅天花板試算",
  description:
    "114年度每人基本生活費 202,000 元，若你家扣除額不足，差額可額外扣稅。輸入家庭人口立即試算基本生活費差額與節稅金額，免費免登入。",
  keywords: [
    "基本生活費差額", "基本生活費差額計算", "免稅天花板", "114年度基本生活費",
    "基本生活費 202000", "基本生活費節稅", "報稅基本生活費",
    "基本生活費計算器", "綜合所得稅基本生活費", "基本生活費差額 2025",
    "基本生活費差額怎麼算", "114年度報稅扣除額",
  ],
  openGraph: {
    title: "基本生活費差額計算器 — 114年度免稅天花板試算",
    description: "114年度每人基本生活費 202,000 元。輸入家庭人口與扣除額，立即試算你家能多扣多少錢。",
    type: "website",
    url: "https://www.twtaxcalc.com/basic-living-deduction",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/basic-living-deduction" },
};

export default function BasicLivingDeductionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "基本生活費差額計算器",
              description: "試算台灣報稅基本生活費差額，114年度每人202,000元，差額可從綜合所得中額外扣除",
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
                  name: "什麼是基本生活費差額？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "財政部每年公告每人「基本生活費」（114年度為 202,000 元），若申報戶的免稅額與扣除額合計低於基本生活費總額，差額可再從所得中額外扣除，減少應稅所得。",
                  },
                },
                {
                  "@type": "Question",
                  name: "114年度基本生活費是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "財政部公告114年度每人基本生活費為 202,000 元，比113年度的 196,000 元提高 6,000 元。申報戶人口數越多，基本生活費總額越高，差額也可能越大。",
                  },
                },
                {
                  "@type": "Question",
                  name: "基本生活費差額怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "基本生活費差額 = MAX(0, 基本生活費總額 - 相關扣除額合計)。相關扣除額包含：免稅額、標準扣除額、薪資特別扣除額、身障扣除額、幼兒學前扣除額、教育學費扣除額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "哪類家庭差額最大？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "人口多但可扣除項目少的家庭差額最大，例如：扶養父母、祖父母、多名子女的三代同堂家庭。家中有年幼子女（幼兒學前扣除額高）的家庭反而差額較小，因可比較的扣除額已很高。",
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
