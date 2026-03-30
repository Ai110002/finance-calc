import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "114年度綜合所得稅申報攻略 2026｜扣除額、免稅額、報稅步驟完整指南",
  description:
    "2026年5月報稅攻略完整版：114年度免稅額97,000元、標準扣除額最高262,000元、薪資特別扣除218,000元。報稅4步驟、節稅工具全整理、常見錯誤盤點，申報前30分鐘速讀版。",
  keywords: [
    "114年度報稅", "114年所得稅申報", "報稅攻略2026", "如何報稅", "報稅步驟",
    "綜合所得稅申報", "報稅扣除額", "報稅注意事項", "2026年報稅", "報稅計算器",
    "免稅額114年", "標準扣除額114年", "薪資特別扣除額", "報稅節稅",
    "income tax taiwan 2026", "台灣報稅教學", "報稅流程", "所得稅申報教學",
  ],
  openGraph: {
    title: "114年度綜合所得稅申報攻略 2026｜扣除額免稅額完整指南",
    description:
      "免稅額97,000元、標準扣除額131,000～262,000元、薪資特別扣除218,000元。4步驟報稅流程 + 全套節稅計算器，報稅季必讀。",
    type: "website",
    url: "https://www.twtaxcalc.com/tax-filing-guide",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/tax-filing-guide" },
};

export default function TaxFilingGuideLayout({
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
              headline: "114年度綜合所得稅申報攻略 2026｜扣除額、免稅額、報稅步驟完整指南",
              description:
                "2026年5月報稅完整攻略：114年度免稅額、標準扣除額、特別扣除額數字速查、四步驟申報流程、全套節稅計算工具、常見申報錯誤盤點。",
              dateModified: "2026-03-30",
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
                  name: "114年度綜合所得稅申報期間是什麼時候？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度（2025年）的綜合所得稅申報期間為2026年5月1日至5月31日。可透過財政部電子申報繳稅服務（網路報稅）、手機報稅App、或至國稅局臨櫃辦理。",
                  },
                },
                {
                  "@type": "Question",
                  name: "114年度的免稅額是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度每人免稅額為97,000元；70歲以上本人、配偶或受扶養直系尊親屬的免稅額為145,500元（1.5倍）。已婚且合併申報可享兩倍免稅額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "114年度標準扣除額和列舉扣除額哪個比較省？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "標準扣除額：單身131,000元；夫妻262,000元，直接扣免附單據。列舉扣除額需累計實際支出（捐贈、保費、醫藥費、房貸利息、租金等），若超過標準扣除額才值得選列舉。大多數薪資族選標準扣除額更簡單也夠用。",
                  },
                },
                {
                  "@type": "Question",
                  name: "薪資特別扣除額上限是多少？自由工作者可以用嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度薪資所得特別扣除額上限為218,000元。這是薪資所得（代號61）才能用的扣除額，代表薪資收入前218,000元可全額扣除。自由工作者（執行業務所得9A/9B）不適用，但可透過費用率扣除成本，兩者不同邏輯。",
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
