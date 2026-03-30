import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "薪資 vs 執行業務所得稅負比較 2026｜輸入年收即時試算 115年度",
  description:
    "薪資所得 vs 執行業務所得（接案）稅負差異完整比較。輸入年收入即時看兩種身份的應繳稅額、有效稅率、損益平衡點。115年度（114年所得）114年5月報稅適用。",
  keywords: [
    "薪資所得vs執行業務所得", "薪資vs接案稅負", "執行業務所得比較",
    "接案vs上班稅負", "薪資所得執行業務所得差異", "接案繳稅比較",
    "執行業務所得計算", "接案族vs員工稅率", "薪資接案哪個省稅",
    "執行業務所得費用率比較", "115年度薪資稅", "接案報稅計算",
    "薪資vs接案", "執行業務所得優勢", "接案稅負計算器",
  ],
  openGraph: {
    title: "薪資 vs 執行業務所得稅負比較｜輸入年收，秒算哪個身份更省稅",
    description:
      "年收多少開始接案比上班省稅？費用率20% vs 薪資特別扣除額218,000，損益平衡點在109萬。115年度稅負即時比較計算器。",
    type: "website",
    url: "https://www.twtaxcalc.com/salary-vs-freelancer",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/salary-vs-freelancer" },
};

export default function SalaryVsFreelancerLayout({
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
              headline: "薪資所得 vs 執行業務所得稅負比較 2026｜115年度損益平衡點試算",
              description:
                "台灣上班族與接案族稅負完整比較：薪資特別扣除額218,000 vs 執行業務費用率20%，損益平衡點109萬，含即時互動計算器與各年收入比較表。115年度。",
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
                  name: "薪資所得和執行業務所得的稅有什麼差別？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "薪資所得可以扣除「薪資特別扣除額」218,000元（115年度）；執行業務所得（接案）則依職類適用費用率，一般接案族為20%，等於直接扣除年收入的20%。年收入低於約109萬時，薪資特別扣除額優勢較大，上班族稅負略低；超過109萬後，20%費用率產生的扣除額超過218,000元，接案族稅負反而更低。",
                  },
                },
                {
                  "@type": "Question",
                  name: "年收多少接案才比上班省稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "有兩個平衡點：①「所得稅」平衡點約109萬（費用率20%扣除額 = 薪資特別扣除額218,000時）；②「總稅務負擔」平衡點（含二代健保補充保費2.11%）約230萬。接案族雖然在超過109萬後所得稅較低，但補充保費抵銷了部分稅負優勢，實際要到年收約230萬，整體繳出去的錢才比上班族少。",
                  },
                },
                {
                  "@type": "Question",
                  name: "執行業務所得費用率是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "執行業務費用率是財政部公告的「擬制費用」比例，不需要實際憑證，直接從收入扣除。115年度常見費用率：一般接案（設計/程式/顧問/翻譯）20%、律師/會計師/記帳士30%、建築師/技師35%、醫師40%。費用率越高代表政府認定你的「成本」越高，可扣除的金額越多，稅額越低。",
                  },
                },
                {
                  "@type": "Question",
                  name: "接案收入還要繳二代健保補充保費嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是的，接案收入（執行業務所得）每次超過2萬元時，超出部分需繳納二代健保補充保費，費率2.11%（115年度），由付款方（委託公司）代扣。這是上班族薪資所得沒有的額外成本，計算實際總稅務負擔時需一併考慮。",
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
