import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "融資維持率計算器 2026｜整戶維持率即時試算・追繳危險線警示",
  description:
    "免費融資維持率計算器：輸入多檔持股的現值與融資金額，即時算出整戶維持率，自動標示 166% 安全線、150% 注意線與 130% 追繳線。附公式解說、補繳金額與賣股還款試算、常見誤解與 5 題 FAQ。",
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
      "輸入多檔持股現值與融資金額，秒算整戶維持率。自動標示安全（166% 以上）、注意（150%）、危險（130%）與斷頭區間，並附補繳金額試算。",
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
          ]),
        }}
      />
      {children}
    </>
  );
}
