import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "幼兒學前特別扣除額試算 2026｜有孩子報稅省多少錢？",
  description:
    "台灣114年度幼兒學前特別扣除額免費試算。未滿6歲幼兒每人可扣除150,000元。輸入年薪和幼兒人數，立即算出可省多少稅。依財政部114年度規定。",
  keywords: [
    "幼兒學前特別扣除額",
    "幼兒學前扣除額",
    "幼兒學前扣除",
    "有小孩報稅省多少",
    "未滿6歲扣除額",
    "幼兒扣除額試算",
    "114年度幼兒扣除",
    "報稅節稅幼兒",
    "小孩報稅優惠",
    "學前特別扣除額計算",
    "幼兒學前150000",
    "綜所稅幼兒扣除",
  ],
  openGraph: {
    title: "幼兒學前特別扣除額試算 2026｜有孩子報稅省多少？",
    description:
      "未滿6歲幼兒每人可扣除150,000元，兩個幼兒就是300,000元！輸入年薪立即算出節稅金額。114年度最新規定。",
    type: "website",
    url: "https://www.twtaxcalc.com/preschool-deduction",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/preschool-deduction",
  },
};

export default function PreschoolDeductionLayout({
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
              name: "幼兒學前特別扣除額試算 2026",
              description:
                "台灣114年度幼兒學前特別扣除額計算工具，未滿6歲幼兒每人可扣除150,000元，輸入年薪與幼兒人數即時算出節稅金額",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/preschool-deduction",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "幼兒學前特別扣除額試算 2026｜114年度每人可扣150,000元",
              description:
                "114年度綜合所得稅幼兒學前特別扣除額：申報戶中有未滿6歲幼兒，每位幼兒可申報150,000元特別扣除額，兩個幼兒300,000元。本工具幫你根據年薪與申報身分算出實際節稅金額。",
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
                  name: "幼兒學前特別扣除額是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度每位未滿6歲幼兒可申報幼兒學前特別扣除額150,000元。兩個幼兒就是300,000元，三個就是450,000元。這是「特別扣除額」，可以疊加在標準扣除額或列舉扣除額之上，另外再享有受扶養子女的免稅額97,000元/人。",
                  },
                },
                {
                  "@type": "Question",
                  name: "幼兒學前特別扣除額的條件是什麼？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "申報戶中有未滿6歲（以當年度12月31日為基準日）的幼兒，且該幼兒被列為受扶養親屬，即可申報。若幼兒已滿6歲（例如2025年底已滿6歲），則2025年所得（114年度）就不能再申報該幼兒的學前扣除額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "幼兒學前扣除額可以和扶養免稅額一起申報嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以！幼兒學前特別扣除額（150,000元/人）和受扶養子女免稅額（97,000元/人）是兩種不同的扣除項目，可以同時申報、雙重享有。以年薪120萬、邊際稅率12%的夫妻計算，1個幼兒加上免稅額合計節稅金額約 (150,000 + 97,000) × 12% = 29,640元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "幼兒學前特別扣除額要怎麼申報？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "使用網路報稅（財政部電子申報繳稅系統）時，系統會根據申報戶受扶養人中未滿6歲幼兒自動計算並帶入。紙本申報時，在綜合所得稅結算申報書的「幼兒學前特別扣除額」欄位填入金額（每人150,000元）即可。記得要確認幼兒已列為受扶養親屬。",
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
