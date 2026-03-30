import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "勞退新制試算機 2026｜雇主提撥6%＋自提節稅，退休金30秒估算",
  description:
    "台灣勞退新制退休金免費試算。輸入年齡、月薪、自提率，立即計算到60歲退休時的累積金額、月領估算，以及自提6%的所得稅節稅效果。依勞工退休金條例最新規定。",
  keywords: [
    "勞退新制試算",
    "勞工退休金試算",
    "勞退試算機",
    "勞退自提試算",
    "勞退自提節稅",
    "勞工退休金條例",
    "勞退6%",
    "退休金計算機",
    "台灣退休金試算",
    "勞退月領試算",
  ],
  openGraph: {
    title: "勞退新制試算機｜雇主提撥＋自提節稅，退休金一次看清楚",
    description:
      "輸入月薪和自提率，立即算出退休金累積總額、月領金額，以及自提節稅每年省多少。",
    type: "website",
    url: "https://www.twtaxcalc.com/labor-retirement",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/labor-retirement",
  },
};

export default function LaborRetirementLayout({
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
              name: "勞退新制試算機 2026",
              description:
                "台灣勞退新制退休金互動試算工具，計算雇主6%提撥＋員工自提的累積金額、月領估算，以及自提免稅節稅效果",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/labor-retirement",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "勞退新制試算機 2026｜雇主6%提撥、自提節稅、退休金月領完整計算",
              description:
                "台灣勞退新制：雇主每月強制提撥薪資6%至個人帳戶，員工可自提0~6%享所得稅節稅。本工具幫你估算到60歲退休時的累積金額、每月可領金額，並顯示自提的實際節稅效益。",
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
                  name: "勞退新制雇主要提撥多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依勞工退休金條例，雇主每月強制提繳勞工月薪資的6%至勞工個人退休金帳戶。例如月薪5萬元，雇主每月提繳3,000元。這筆錢是雇主的法定義務，勞工不需要自己掏腰包。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退新制自願提繳有什麼好處？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "員工可自願提繳月薪資0~6%，自提金額可從當年度薪資所得中全額扣除，享有所得稅節稅優惠。例如月薪6萬、邊際稅率12%，自提6%每年可節稅約5,184元，等於政府補貼你的退休儲蓄。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退新制和勞保老年給付有什麼不同？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "勞退新制是雇主提撥至個人帳戶，帳戶屬於你本人，換工作不消失；勞保老年給付是社會保險制度，依投保年資和薪資計算，兩者都可以領。勞退最早60歲申請，勞保老年給付依出生年不同，請領年齡為63~65歲。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退新制可以月領還是一次領？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "年滿60歲且工作年資滿15年，可選擇按月領取（依平均餘命計算每月金額）；工作年資未滿15年，只能一次領取全部帳戶餘額。月領的好處是可領到身故為止，不怕活太久；一次領可自行運用資金。",
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
