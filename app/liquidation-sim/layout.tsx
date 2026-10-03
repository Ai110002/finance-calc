import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "斷頭模擬器 2026｜融資被斷頭前能跌多少？含歷史股災情境",
  description:
    "輸入持股成本與融資金額，即時試算跌多少會被追繳、跌多少會被斷頭，並算出各跌幅下的追繳金額。附維持率變化圖、融資成數對照、斷頭流程解說與 5 題 FAQ。免費、免登入。",
  keywords: [
    "斷頭模擬器", "融資斷頭", "斷頭價格", "融資被斷頭", "整戶維持率",
    "融資維持率120%", "追繳保證金", "融資風險", "股票斷頭",
    "斷頭試算", "融資虧損試算", "股災模擬", "margin call taiwan",
    "融資槓桿風險", "股票融資計算",
  ],
  openGraph: {
    title: "斷頭模擬器 2026｜融資跌多少會被強制砍倉？",
    description:
      "輸入持股與融資金額，秒算跌幅容忍度與各情境追繳金額。含歷史股災（COVID、升息）場景模擬，了解你的真實風險。",
    type: "website",
    url: "https://www.twtaxcalc.com/liquidation-sim",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/liquidation-sim" },
};

export default function LiquidationSimLayout({
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
              name: "斷頭模擬器 2026",
              description:
                "台灣股票融資斷頭試算工具：輸入持股成本與融資金額，計算整戶維持率及被追繳/強制砍倉的股價門檻，含歷史股災情境模擬。",
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
