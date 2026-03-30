import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "海外所得試算 & 最低稅負制計算 2026｜美股ETF報稅要繳多少？",
  description:
    "台灣114年度海外所得與最低稅負制（AMT）免費試算。持有美股、海外ETF的投資人，海外所得超過100萬元才需計入基本所得額。輸入國內所得與海外所得，立即算出是否觸發AMT、需額外繳多少稅。",
  keywords: [
    "海外所得申報",
    "最低稅負制試算",
    "AMT計算",
    "美股報稅台灣",
    "海外ETF報稅",
    "海外所得100萬",
    "基本所得額試算",
    "最低稅負20%",
    "海外所得670萬",
    "美股股利報稅",
    "海外所得免稅",
    "114年度海外所得",
    "個人最低稅負",
  ],
  openGraph: {
    title: "海外所得試算 & 最低稅負制 2026｜美股投資人必看",
    description:
      "海外所得超過100萬才計入AMT！輸入薪資＋海外所得，立即算出是否需繳最低稅負（20%）、實際影響多少。114年度最新規定。",
    type: "website",
    url: "https://www.twtaxcalc.com/foreign-income-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/foreign-income-tax",
  },
};

export default function ForeignIncomeTaxLayout({
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
              name: "海外所得 & 最低稅負制試算 2026",
              description:
                "台灣114年度個人海外所得與最低稅負制（AMT）計算工具。持有美股、海外ETF的投資人可輸入國內所得與海外所得，即時計算是否觸發AMT、需額外繳多少稅。",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/foreign-income-tax",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "海外所得試算 & 最低稅負制計算 2026｜美股ETF持有人如何申報？",
              description:
                "114年度個人最低稅負制：海外所得（含美股股利、資本利得）超過100萬元時，超過部分須計入基本所得額。基本所得額超過670萬元，超過部分按20%計算基本稅額，應繳稅額取一般稅額與基本稅額較高者。",
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
                  name: "海外所得多少才需要申報最低稅負制（AMT）？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "個人全年海外所得（含美股股利、資本利得、海外利息等）超過新臺幣100萬元時，超過的部分才需計入「基本所得額」。基本所得額（綜合所得淨額 + 海外所得超過100萬的部分）若未達670萬元，基本稅額為0，不需繳AMT。若基本所得額超過670萬，才需繳20%的AMT，且只有基本稅額大於一般所得稅額時，才需補繳差額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "美股ETF（如0050、VTI）的股利和買賣獲利算海外所得嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "要分狀況：台灣掛牌的ETF（如0050、00878）配息屬國內股利所得，不是海外所得，需一般申報。海外掛牌的ETF（如美股VTI、SPY、QQQ）的股利與買賣獲利屬海外所得，全年超過100萬才需計入基本所得額。台灣股票（上市櫃）的買賣資本利得目前免稅，不計入海外所得。",
                  },
                },
                {
                  "@type": "Question",
                  name: "海外所得100萬元是指股利還是淨利？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "海外所得以「所得金額」計算，不是投入本金。美股股利以實際收到的股利金額計；美股買賣獲利以「賣出價 - 成本」計算資本利得。如果美股有虧損，虧損可以在同年度的海外所得中扣除，但不能跨年度扣抵，也不能與國內所得互抵。",
                  },
                },
                {
                  "@type": "Question",
                  name: "最低稅負制的稅率是多少？怎麼計算要繳多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "個人最低稅負稅率為20%。計算步驟：①基本所得額 = 綜合所得淨額 + 海外所得超過100萬的部分；②基本稅額 = (基本所得額 - 670萬) × 20%，若基本所得額未達670萬，基本稅額為0；③一般所得稅額 = 依綜合所得稅率表計算；④應繳稅額 = max(一般稅額, 基本稅額)，取兩者較高者。只有當基本稅額 > 一般稅額，才需補繳差額。",
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
