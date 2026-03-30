import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "融資維持率計算器 2026｜整戶維持率即時試算・追繳危險線警示",
  description:
    "免費融資維持率計算器：輸入多檔持股的現值與融資金額，即時計算整戶維持率，自動標示安全／警示／危險區間。台股融資族必備風控工具。",
  keywords: [
    "融資維持率", "整戶維持率", "維持率計算器", "融資維持率計算",
    "追繳保證金", "融資追繳", "融資風控", "融資危險線",
    "融資維持率130%", "融資維持率120%", "股票融資計算",
    "margin ratio calculator", "margin maintenance", "融資槓桿",
    "台股融資", "融資計算工具",
  ],
  openGraph: {
    title: "融資維持率計算器 2026｜多檔持股整戶維持率即時試算",
    description:
      "輸入多檔持股現值與融資金額，秒算整戶維持率。自動標示安全（166%以上）、警示（130%）、危險（120%）三個關鍵門檻。",
    type: "website",
    url: "https://www.twtaxcalc.com/margin-ratio",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/margin-ratio" },
};

export default function MarginRatioLayout({
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
              name: "融資維持率計算器 2026",
              description:
                "台灣股票融資維持率即時計算工具：支援多檔持股，自動計算整戶維持率並警示追繳風險。",
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
                  name: "整戶維持率是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "整戶維持率 = 所有融資持股的現值總和 ÷ 融資借款總額 × 100%。是衡量融資帳戶安全程度的核心指標，反映帳戶市值相對於借款的比例。",
                  },
                },
                {
                  "@type": "Question",
                  name: "維持率多少才安全？多少會被追繳？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "一般以融資成數 60% 計算：維持率 166% 以上為安全；降至 130% 以下會收到追繳通知，需在 2 個營業日內補繳；降至 120% 以下券商可強制砍倉（斷頭）。各券商規定可能略有差異。",
                  },
                },
                {
                  "@type": "Question",
                  name: "融資成數是什麼意思？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "融資成數是你可以向券商借錢買股的比例，台灣一般股票最高 60%。也就是說買 100 萬的股票，你只需自備 40 萬，另外 60 萬向券商借。槓桿倍數 = 1 ÷ (1 - 融資成數) = 2.5 倍。",
                  },
                },
                {
                  "@type": "Question",
                  name: "如何提高整戶維持率？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "有三種方法：①補繳現金（直接增加帳戶淨值）；②賣出部分融資持股、還清部分借款；③等待持股漲回（被動方式，有風險）。最保守的策略是維持率始終保持在 166% 以上，留有緩衝空間。",
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
