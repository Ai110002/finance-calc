import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "斷頭模擬器 2026｜融資被斷頭前能跌多少？含歷史股災情境",
  description:
    "輸入持股成本與融資金額，即時試算跌多少會被斷頭。含 2020 COVID、2022 升息等歷史股災情境模擬，融資族必備風控工具。免費、免登入。",
  keywords: [
    "斷頭模擬器", "融資斷頭", "斷頭價格", "融資被斷頭", "整戶維持率",
    "融資維持率120%", "追繳保證金", "融資風險", "股票斷頭",
    "斷頭試算", "融資虧損試算", "股災模擬", "margin call taiwan",
    "融資槓桿風險", "股票融資計算",
  ],
  openGraph: {
    title: "斷頭模擬器 2026｜融資跌多少會被強制砍倉？",
    description:
      "輸入持股與融資金額，秒算跌幅容忍度。含歷史股災（COVID、升息）場景模擬，了解你的真實風險。",
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
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "融資整戶維持率低於多少會被斷頭？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "台灣證券商規定整戶維持率低於 130% 時會收到追繳通知，低於 120% 時券商可強制砍倉（斷頭）。各券商可能略有不同，建議以自己開戶券商規定為準。",
                  },
                },
                {
                  "@type": "Question",
                  name: "整戶維持率怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "整戶維持率 = 帳戶總市值 ÷ 融資借款總額 × 100%。帳戶總市值 = 各持股現值合計，融資借款 = 當初借的金額（融資成數通常 6 成）。維持率越高代表越安全。",
                  },
                },
                {
                  "@type": "Question",
                  name: "被追繳保證金要怎麼辦？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "收到追繳通知後，有兩種選擇：①補繳差額（補錢讓維持率回到 166% 以上）；②賣出部分持股降低融資金額。若規定時間內未補繳，券商將強制賣出你的股票（斷頭）。建議在維持率 150% 以上就開始評估風險。",
                  },
                },
                {
                  "@type": "Question",
                  name: "歷史股災期間融資戶通常跌多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2020 年 COVID 衝擊：台股 60 天內最大跌幅約 30%。2022 年 Fed 升息：台股全年跌幅約 22%。2008 年金融海嘯：台股跌幅逾 50%。融資槓桿 6 成的投資人，在 30% 跌幅時整戶維持率約剩 100%，面臨強制斷頭風險。",
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
