import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "出租房子怎麼報稅？2026租賃所得試算｜114年度43%費用率 - 台灣財務試算",
  description:
    "114年度租賃所得申報完整攻略：費用率43%（居住用免附憑證），租賃所得 = 年租金 × 57%。含二代健保補充保費2.11%試算、列舉費用vs費用率比較、三種房東情境範例，30秒算出你要繳多少稅。",
  keywords: [
    "租賃所得申報",
    "出租報稅",
    "租金所得稅",
    "房東報稅",
    "租賃所得計算",
    "114年度租賃所得",
    "租金所得費用率",
    "43%費用率",
    "出租如何報稅",
    "二代健保租金",
    "租賃所得2026",
    "房租收入報稅",
    "rental income tax taiwan",
    "房東繳稅計算",
  ],
  openGraph: {
    title: "出租房子怎麼報稅？2026租賃所得試算｜43%費用率",
    description:
      "費用率43%免附收據，租賃所得 = 年租金 × 57%。月租3萬的房東，年所得稅+補充保費合計大約多少？輸入條件30秒算出，含列舉vs費用率比較。",
    type: "website",
    url: "https://www.twtaxcalc.com/rental-income-tax-2026",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/rental-income-tax-2026" },
};

export default function RentalIncomeTaxLayout({
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
              headline: "出租房子怎麼報稅？2026租賃所得試算｜114年度43%費用率",
              description:
                "114年度租賃所得申報：費用率43%（居住用房屋免附憑證），租賃所得 = 年租金 × 57%。含二代健保補充保費2.11%試算。",
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
                  name: "出租房子的租金收入要怎麼申報所得稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "租金收入屬於「租賃所得」，申報時可選擇：(1) 費用率43%（居住用房屋免附憑證）：租賃所得 = 年租金 × 57%，再合併其他所得計算綜合所得稅；(2) 列舉實際費用：提供維修費、折舊、管理費、房屋稅、地價稅、貸款利息等憑證，實際費用超過43%才值得列舉。大多數房東選擇費用率更方便。",
                  },
                },
                {
                  "@type": "Question",
                  name: "二代健保補充保費怎麼算？房東需要負擔嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "租金收入的二代健保補充保費費率為2.11%，由承租方（房客）代扣繳。每次租金收入超過20,000元才需扣繳。例如月租25,000元，承租方每月代扣527.5元補充保費。房東實收金額 = 租金 - 代扣補充保費。",
                  },
                },
                {
                  "@type": "Question",
                  name: "月租3萬的房東，一年要繳多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "月租30,000元，年租金360,000元。租賃所得 = 360,000 × 57% = 205,200元。若房東為上班族（薪資所得、稅率12%），額外繳納所得稅 = 205,200 × 12% ≈ 24,624元。另外，月租30,000元 > 20,000元，全年補充保費 = 360,000 × 2.11% ≈ 7,596元（由房客代扣）。實際試算請使用本頁工具輸入個人條件。",
                  },
                },
                {
                  "@type": "Question",
                  name: "費用率43%和列舉費用哪個比較省？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "費用率43%免附憑證，直接從租金收入扣43%視為費用。列舉費用需提供維修費、折舊（按建築物耐用年數計算）、管理費、房屋稅、地價稅、貸款利息等實際支出憑證。通常老屋（折舊較大）、高貸款利息、或有大額維修的房東，列舉費用可能超過43%，其他情況費用率更方便且結果接近。",
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
