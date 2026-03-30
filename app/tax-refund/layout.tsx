import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退稅試算 2026｜我可以退稅嗎？退多少？5分鐘算清楚",
  description:
    "114年度所得稅退稅免費試算。輸入薪資所得、已扣繳稅額、扶養人數，立即計算你可以退多少稅（或需補繳多少）。年中換工作、有扶養親屬最容易退稅，快來算！",
  keywords: [
    "退稅試算",
    "所得稅退稅",
    "我可以退稅嗎",
    "退稅怎麼算",
    "退稅金額試算",
    "扣繳稅額退稅",
    "114年度退稅",
    "2026退稅",
    "年終報稅退稅",
    "換工作退稅",
    "扶養退稅",
    "綜合所得稅退稅",
    "退稅申請",
    "報稅退稅計算",
  ],
  openGraph: {
    title: "退稅試算 2026｜我可以退多少稅？",
    description:
      "輸入薪資 + 扣繳稅額 + 扶養人數，立即算出退稅或補稅金額。年中換工作、有小孩最容易退稅！114年度最新計算。",
    type: "website",
    url: "https://www.twtaxcalc.com/tax-refund",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/tax-refund",
  },
};

export default function TaxRefundLayout({
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
              name: "所得稅退稅試算 2026",
              description:
                "台灣114年度綜合所得稅退稅免費試算工具。輸入薪資所得、已扣繳稅額、扶養親屬人數，立即計算可退稅或需補繳金額。",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/tax-refund",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "退稅試算 2026｜114年度所得稅退稅怎麼算？哪些人最容易退稅？",
              description:
                "綜合所得稅退稅 = 已扣繳稅額 - 應繳稅額。年中換工作、有扶養親屬（父母、子女）、有高額扣除額的人，都很容易有退稅。輸入你的情況，5分鐘算清楚。",
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
                  name: "我要怎麼知道我可以退稅還是補稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "退稅公式很簡單：全年應繳稅額 - 已扣繳稅額。若已扣繳稅額 > 應繳稅額，差額就是你的退稅。已扣繳稅額在每年2月由雇主寄發的「扣繳憑單」上查得到。應繳稅額則根據你的薪資、扶養人數、扣除額計算。",
                  },
                },
                {
                  "@type": "Question",
                  name: "哪些人最容易退稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "最容易退稅的情況：①年中換工作（每家公司都按月扣繳，加總可能超過全年應繳）；②有扶養親屬（父母、子女、配偶），每人多 97,000 元免稅額；③年中失業或育嬰假（有幾個月無收入，但前幾個月已被扣繳）；④有大額列舉扣除（房貸利息、捐款等）但雇主按標準扣繳。",
                  },
                },
                {
                  "@type": "Question",
                  name: "扣繳憑單在哪裡找？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "每年2月底前，雇主會以紙本或電子方式提供「各類所得扣繳暨免扣繳憑單」。上面會列出全年薪資所得、扣繳稅額。也可以在每年5月報稅季，登入財政部「綜合所得稅電子結算申報繳稅系統」（eTax）查詢，系統會自動帶入雇主申報的扣繳資料。",
                  },
                },
                {
                  "@type": "Question",
                  name: "退稅什麼時候會入帳？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "綜合所得稅申報期間為每年5月1日至5月31日。申報後選擇「退稅匯款入帳」並填寫帳號，一般在申報後1至3個月內（7月至9月）退稅入帳。若未填帳號，財政部會以支票寄至戶籍地址。建議申報時填寫銀行帳號，退稅最快最方便。",
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
