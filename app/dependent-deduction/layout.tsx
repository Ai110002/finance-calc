import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "扶養親屬節稅試算 2026｜每位扶養省多少稅？115年度完整說明",
  description:
    "115年度（2026年5月報稅）扶養親屬可省多少稅？每位扶養免稅額97,000元，70歲以上145,500元。含可扶養資格、省稅金額試算表、常見父母/子女扶養判斷。",
  keywords: [
    "扶養親屬節稅", "報稅扶養", "扶養父母節稅", "扶養可以省多少稅",
    "扶養免稅額", "報稅可以扶養幾個人", "扶養子女節稅", "父母扶養報稅",
    "115年度扶養免稅額", "受扶養親屬資格", "扶養計算", "綜合所得稅扶養",
    "dependent tax deduction taiwan", "扶養親屬免稅額2026",
  ],
  openGraph: {
    title: "扶養親屬節稅試算 2026｜每位扶養可省多少稅",
    description: "115年度報稅：每位扶養親屬免稅額97,000元，高薪族扶養父母最多省5.8萬，30秒看清楚。",
    type: "website",
    url: "https://www.twtaxcalc.com/dependent-deduction",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/dependent-deduction" },
};

export default function DependentDeductionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "扶養親屬節稅試算 2026｜115年度完整說明",
              description: "台灣115年度綜合所得稅扶養親屬免稅額說明：每人97,000元，70歲以上145,500元，含各稅率省稅試算。",
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
                  name: "扶養父母可以省多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "每位父母（未滿70歲）免稅額97,000元。以你適用的稅率計算：年薪100萬適用5%，扶養一位父母省4,850元；年薪200萬適用12%，省11,640元；年薪400萬適用20%，省19,400元。若父母已滿70歲，免稅額提高為145,500元，省稅效果再提升50%。",
                  },
                },
                {
                  "@type": "Question",
                  name: "子女滿20歲還可以報扶養嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以，但需符合以下條件之一：（1）仍在就讀大學、研究所等學校；（2）因身心障礙無法謀生；（3）因在役服役中。若子女已有工作收入且超過基本生活費門檻，建議讓子女自己申報，效果可能更好。",
                  },
                },
                {
                  "@type": "Question",
                  name: "父母有自己的所得，還可以被我扶養嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以。法律沒有規定受扶養親屬不能有所得。但若父母年所得較高（超過免稅額+基本扣除額），他們自己申報可能比被你扶養更省稅。建議分開試算比較。父母被你扶養，你的免稅額增加97,000~145,500；父母自己申報，他們也享有個人免稅額和扣除額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "兄弟姊妹可以互相扶養嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以，但有條件限制。兄弟姊妹要被扶養須符合：（1）未滿20歲；（2）滿20歲仍在學或身心障礙；或（3）因其他原因無謀生能力，且確實由你負擔生活費。成年且有工作的兄弟姊妹通常不符合受扶養資格。",
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
