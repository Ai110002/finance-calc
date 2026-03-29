import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "勞保費率、健保費率完整說明 2026（115年度）— 費率表與計算方式",
  description:
    "2026年（115年度）勞保費率 13%、健保費率 5.17%、二代健保補充保費 2.11%、勞退 6%，完整費率表與計算公式。附月薪試算工具，30秒算出實拿薪資。",
  keywords: [
    "勞保費率", "勞保費率2026", "勞保費率115年", "健保費率", "健保費率2026",
    "健保費率115年", "勞健保費率", "勞健保怎麼算", "二代健保補充保費",
    "勞退費率", "勞保費用計算", "健保費用計算", "投保薪資分級表",
    "月薪扣多少勞健保", "勞保費計算", "health insurance rate taiwan",
  ],
  openGraph: {
    title: "勞保費率、健保費率完整說明 2026（115年度）",
    description: "勞保費率 13%、健保費率 5.17%、二代健保補充保費 2.11% 完整費率表，附計算公式與月薪試算工具。",
    type: "website",
    url: "https://www.twtaxcalc.com/labor-insurance-rates",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/labor-insurance-rates" },
};

export default function LaborInsuranceRatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "勞保費率、健保費率完整說明 2026（115年度）",
              description: "2026年台灣勞保費率13%、健保費率5.17%完整說明，含費率表、計算公式、投保薪資分級表",
              dateModified: "2026-03-29",
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
                  name: "2026年勞保費率是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2026年（115年度）勞保費率為 13.0%。員工負擔 20%（即薪資的 2.6%）、雇主負擔 70%（9.1%）、政府補助 10%（1.3%）。費用依勞保投保薪資分級表計算，最低投保薪資 28,590 元，最高 147,900 元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "2026年健保費率是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "2026年（115年度）健保費率為 5.17%。一般受僱者員工負擔 30%（薪資的 1.551%）、雇主負擔 60%（3.102%）、政府補助 10%（0.517%）。有眷屬者每增加1名眷屬，員工保費乘以 1.7 倍計算。",
                  },
                },
                {
                  "@type": "Question",
                  name: "二代健保補充保費是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "二代健保補充保費費率為 2.11%，針對薪資以外的所得（如兼職薪資超過2萬元、獎金、股利、租金等）額外課徵。若月薪超過健保投保薪資，超出部分也須繳 2.11% 補充保費。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退雇主提撥是強制的嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是的。依勞工退休金條例，雇主必須每月為員工提撥月薪 6% 至勞退個人帳戶，這筆錢由雇主全額負擔，不從薪資扣除。員工另可自願額外提撥 0–6%，自提部分可抵稅（不計入薪資所得）。",
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
