import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "資遣費計算器 2025 — 新制舊制即時試算・含免稅試算",
  description:
    "台灣資遣費免費計算工具。支援勞退新制（每年 0.5 個月）與舊制（每年 1 個月）。輸入月薪與年資即可算出資遣費，並試算退職所得免稅金額，114 年度版本。",
  keywords: [
    "資遣費計算器", "資遣費怎麼算", "資遣費計算", "資遣費新制",
    "資遣費舊制", "資遣費免稅", "退職所得", "資遣費試算",
    "severance pay taiwan", "資遣費2025", "被資遣怎麼算",
  ],
  openGraph: {
    title: "資遣費計算器 2025 — 新制舊制・含免稅試算",
    description: "輸入月薪和年資，立即計算新制或舊制資遣費，並了解退職所得免稅額度。免費免登入。",
    type: "website",
  },
};

export default function SeveranceCalculatorLayout({
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
              name: "資遣費計算器",
              description: "依台灣勞動基準法及勞工退休金條例計算新制、舊制資遣費的免費工具",
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
                  name: "資遣費新制怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依勞工退休金條例 §12，服務年資每滿一年給付 0.5 個月平均工資，最高給付 6 個月（即最多計算 12 年年資）。未滿一年者按比例計算。",
                  },
                },
                {
                  "@type": "Question",
                  name: "資遣費舊制怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依勞動基準法 §17，服務年資每滿一年給付 1 個月平均工資，未滿一年者按比例計算。",
                  },
                },
                {
                  "@type": "Question",
                  name: "資遣費要繳稅嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "資遣費屬退職所得，有免稅額度。依 114 年度規定，每服務年資可免稅約 $198,000，超過部分依規定計入綜合所得申報。建議找稅務專業人士確認。",
                  },
                },
                {
                  "@type": "Question",
                  name: "我適用新制還是舊制？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2005 年 7 月 1 日之後才進入職場的勞工，通常全程適用新制。若在 2005 年 7 月前就在職，可能有部分年資適用舊制，需向公司人資確認。",
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
