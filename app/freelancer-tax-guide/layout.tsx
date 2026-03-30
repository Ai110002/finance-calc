import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "自由工作者接案報稅指南 2026｜執行業務所得費用率試算 115年度",
  description:
    "接案族/SOHO族報稅完全指南。執行業務所得費用率20%，年收80萬實繳稅額試算、接案vs受僱稅負比較、二代健保補充保費說明。115年度（114年接案所得）。",
  keywords: [
    "自由工作者報稅", "接案族報稅", "SOHO族報稅", "執行業務所得",
    "接案報稅", "自由接案報稅", "執行業務費用率", "接案繳多少稅",
    "自由工作者稅率", "勞務報酬報稅", "接案所得稅", "接案費用扣除",
    "freelancer tax taiwan", "自由工作者稅務", "115年度接案報稅",
    "接案族節稅", "執行業務所得費用標準",
  ],
  openGraph: {
    title: "自由工作者接案報稅指南 2026｜費用率20%，年收80萬稅額試算",
    description:
      "接案族報稅和上班族不同：費用率20%，只有80%收入需課稅。115年度接案所得稅額試算 + 與受僱員工稅負比較。",
    type: "website",
    url: "https://www.twtaxcalc.com/freelancer-tax-guide",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/freelancer-tax-guide" },
};

export default function FreelancerTaxGuideLayout({
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
              headline: "自由工作者接案報稅完全指南 2026｜115年度執行業務所得費用率與稅額試算",
              description:
                "台灣接案族/SOHO族報稅指南：執行業務所得費用率20%說明、各年收入稅額試算表、與受僱員工稅負比較、二代健保補充保費計算、節稅策略三大方向。",
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
                  name: "自由工作者接案收入要繳多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "接案收入屬於執行業務所得，費用率20%（多數接案族），等於政府承認你20%的收入是成本，只有80%需課稅。80%收入再扣除免稅額97,000和標準扣除額131,000後套用5級累進稅率。年收80萬的接案族所得淨額約412,000元，適用5%稅率，應繳約20,600元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "接案族和上班族，誰繳比較少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "年收入低於約109萬時，上班族因薪資特別扣除額218,000元的優勢，稅額略低。但年收入超過109萬，接案族的20%費用率（20% × 109萬 = 218,000）開始超過薪資特別扣除額，接案族反而更省稅。例如年收120萬，上班族繳稅約49,180元，接案族（20%費用率）約46,540元，接案族省約2,640元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "接案收入的二代健保怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "接案收入（執行業務所得）需繳納二代健保補充保費，費率為2.11%（114年度），由付款方（委託公司）代扣後撥款。例如年接案收入80萬，大約需繳16,880元補充保費。計算實際稅務成本時需將此費用列入考量。",
                  },
                },
                {
                  "@type": "Question",
                  name: "接案族可以申報哪些費用節稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可選擇（1）標準費用率20%，無需單據，最方便；或（2）申報實際費用，包括設備購置、軟體訂閱費、辦公室租金、交通費、進修費等，需保留憑證。選擇實際費用超過費用標準時才值得申報。另外申報扶養親屬每人可多扣97,000元免稅額，也是最直接的節稅方式。",
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
