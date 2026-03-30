import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "115年度所得稅級距完整表 2026｜五級累進稅率 5%~40% 計算方式",
  description:
    "115年度（2026年5月報稅）綜合所得稅五級累進稅率完整表：5%、12%、20%、30%、40%，含速算公式、各薪資實際稅額試算、免稅額扣除額一覽。30秒試算你的稅額。",
  keywords: [
    "115年度所得稅級距", "所得稅級距2026", "綜合所得稅級距表", "所得稅五級累進稅率",
    "所得稅怎麼算", "114年度所得稅", "報稅稅率2026", "綜合所得稅計算",
    "所得稅速算公式", "年收入繳多少稅", "所得淨額稅率", "報稅計算器",
    "個人所得稅台灣", "income tax taiwan", "tax bracket taiwan 2026",
  ],
  openGraph: {
    title: "115年度所得稅級距完整表（2026報稅）",
    description: "五級累進稅率 5%~40%，含速算公式與各薪資實際稅額試算。",
    type: "website",
    url: "https://www.twtaxcalc.com/income-tax-brackets",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/income-tax-brackets" },
};

export default function IncomeTaxBracketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "115年度所得稅級距完整表（2026年申報）",
              description: "台灣115年度綜合所得稅五級累進稅率完整說明，含速算公式、各薪資實際應繳稅額試算",
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
                  name: "115年度所得稅五級累進稅率是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "115年度（2026年5月申報）綜合所得稅五級累進稅率：①所得淨額0~590,000元：5%；②590,001~1,330,000元：12%；③1,330,001~2,660,000元：20%；④2,660,001~4,980,000元：30%；⑤4,980,001元以上：40%。",
                  },
                },
                {
                  "@type": "Question",
                  name: "所得淨額怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "所得淨額 = 全年所得總額 − 免稅額（97,000/人）− 扣除額（標準扣除額：單身131,000/夫妻262,000；或列舉扣除）− 特別扣除額（薪資218,000、身障218,000、幼兒150,000/人等）− 基本生活費差額。計算後的金額才套用稅率表。",
                  },
                },
                {
                  "@type": "Question",
                  name: "年薪100萬要繳多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "以單身、無受扶養人、薪資所得為例：年薪100萬 − 免稅額97,000 − 標準扣除額131,000 − 薪資特別扣除額218,000 = 所得淨額554,000元，落在5%級距，應納稅額約27,700元，有效稅率約2.77%。",
                  },
                },
                {
                  "@type": "Question",
                  name: "115年度和114年度稅率級距有沒有改變？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "稅率（5%/12%/20%/30%/40%）維持不變。但免稅額、扣除額有調整：115年度基本生活費由 196,000 調升至 202,000 元，這可能使部分納稅人所得淨額降低、適用較低稅率。",
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
