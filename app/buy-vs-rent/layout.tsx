import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "買房還是租房？2026台灣買房vs租房計算機｜30年財富比較",
  description:
    "輸入房價、月租金、投資報酬率，立即算出買房或租房哪個30年後財富更多。台灣唯一互動式買房租房比較工具，考量首付機會成本、房貸、房價增值、租金上漲，數字說話。",
  keywords: [
    "買房還是租房",
    "買房vs租房",
    "買房租房比較",
    "租房好還是買房好",
    "台灣買房划算嗎",
    "租房投資比買房好",
    "房貸vs租金",
    "買房機會成本",
    "租售比計算",
    "買房 vs 租房計算機",
  ],
  openGraph: {
    title: "買房還是租房？台灣買房vs租房30年財富計算機",
    description:
      "輸入房價和租金，秒算30年後買房vs租房+投資哪個財富更多。首付機會成本、房貸、房價增值全考量。",
    type: "website",
    url: "https://www.twtaxcalc.com/buy-vs-rent",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/buy-vs-rent",
  },
};

export default function BuyVsRentLayout({
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
              name: "買房vs租房比較計算機 2026",
              description:
                "台灣買房租房30年財富比較計算工具，考量首付機會成本、房貸月供、房價增值率、租金通膨、投資報酬率",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/buy-vs-rent",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "買房還是租房？2026台灣買房vs租房30年財富比較計算",
              description:
                "台灣租售比偏低，買房月供通常遠高於同等租金。但首付和房價增值也是重要變數。本計算機幫你用自己的數字算清楚。",
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
                  name: "台灣買房還是租房比較划算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "沒有標準答案，取決於房價增值率 vs 投資報酬率。若你能把首付拿去投資且年報酬 > 房價年增率，租房+投資長期可能勝出。台北市過去房價年增5-8%，但多數人無法預期未來，建議用計算機算自己的數字。",
                  },
                },
                {
                  "@type": "Question",
                  name: "買房最大的隱藏成本是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "首付的機會成本。以1500萬房子自備300萬為例，這300萬若投入台灣50（年報酬6%），30年後約1720萬。這筆錢在計算買房總回報時常被忽略。",
                  },
                },
                {
                  "@type": "Question",
                  name: "租房的最大劣勢是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "租金上漲風險和居住不穩定性。台灣租金過去10年年增約2-3%，且房東可要求搬遷。此外，租房族需要有紀律地把省下的錢拿去投資，否則租房不一定划算。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房貸利率和投資報酬率哪個比較高？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2026年台灣房貸利率約2.0-2.5%，遠低於台灣50等ETF的歷史年化報酬率（約7-10%）。但房子有槓桿效應（只付20%自備款就能控制100%資產），不能直接比較利率數字。",
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
