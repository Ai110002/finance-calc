import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "二代健保補充保費完整指南 2026｜六大類試算 115年度費率 2.11%",
  description:
    "二代健保補充保費費率 2.11%，哪六種情況要扣？獎金超過幾元才扣？接案、股利、租金、兼職怎麼算？含完整試算表，115年度（114年所得）最新版。",
  keywords: [
    "二代健保補充保費", "二代健保費率", "補充保費怎麼算", "二代健保扣幾趴",
    "獎金二代健保", "接案二代健保", "股利二代健保", "租金二代健保",
    "二代健保試算", "補充保費六大類", "二代健保什麼情況扣",
    "高額獎金補充保費", "執行業務補充保費", "二代健保2026",
    "nhi supplement premium taiwan", "115年度補充保費",
  ],
  openGraph: {
    title: "二代健保補充保費完整指南 2026｜哪六種情況要扣？費率 2.11%",
    description:
      "二代健保補充保費六大類一次看懂：獎金超過109,880才扣差額、接案全額扣2.11%、股利超2萬才扣。含試算表，115年度最新。",
    type: "website",
    url: "https://www.twtaxcalc.com/supplement-premium",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/supplement-premium" },
};

export default function SupplementPremiumLayout({
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
              headline: "二代健保補充保費完整指南 2026｜115年度六大類費率試算",
              description:
                "台灣二代健保補充保費完整說明：費率2.11%，六大類課徵情境（高額獎金、兼職、接案、股利、利息、租金），含各年收入試算表。",
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
                  name: "接案收入需要繳二代健保補充保費嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "需要。接案收入（執行業務所得）全額 × 2.11%，由付款方（委託公司）代扣後付款給你。例如收到 100,000 元案款，委託公司會扣掉 2,110 元補充保費後匯款 97,890 元。每次給付未達 2,000 元免扣。",
                  },
                },
                {
                  "@type": "Question",
                  name: "年終獎金要繳二代健保嗎？超過多少才扣？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "年終獎金屬於「高額獎金」類別，單次給付超過「投保金額 4 倍」的差額才需繳補充保費。115年度最低投保金額為 27,470 元，4 倍為 109,880 元。獎金超過 109,880 元的部分 × 2.11% = 補充保費。例如年終 200,000 元，超出部分 90,120 元 × 2.11% ≈ 1,902 元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "股利收入要繳二代健保補充保費嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "需要，但有門檻：全年股利所得超過 20,000 元的差額才扣。算法：（全年股利 − 20,000）× 2.11% = 補充保費。例如全年股利 100,000 元，補充保費為（100,000 − 20,000）× 2.11% = 1,688 元。由配息的公司/基金代扣。",
                  },
                },
                {
                  "@type": "Question",
                  name: "租金收入要繳二代健保補充保費嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "要看租客是誰：若租客為機關、公司或執行業務者（法人），則需扣補充保費，全額 × 2.11%，由承租方代扣。若租客是一般個人（個人出租給個人），則免扣補充保費。",
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
