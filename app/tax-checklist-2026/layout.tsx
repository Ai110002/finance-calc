import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026報稅懶人包｜114年度申報前必確認的10件事（倒數計時）- 台灣財務試算",
  description:
    "2026年5月報稅前必確認10件事：扶養申報對嗎？幼兒學前扣除加了嗎？夫妻分開申報省更多？股利合一稅or分開課稅？薪資特別扣除額218,000用到了嗎？倒數到5/31，現在確認還來得及。",
  keywords: [
    "報稅懶人包2026",
    "114年度報稅",
    "報稅checklist",
    "報稅前準備",
    "2026年報稅",
    "報稅注意事項",
    "報稅清單",
    "綜合所得稅申報",
    "報稅懶人包",
    "報稅必看",
    "報稅截止日",
    "報稅節稅",
    "114年報稅",
    "報稅前10件事",
  ],
  openGraph: {
    title: "2026報稅懶人包｜申報前必確認的10件事",
    description:
      "5月31日截止前，這10件事確認了嗎？幼兒學前扣除、夫妻分開申報、股利課稅方式……每一項都可能影響退稅金額。倒數計時中。",
    type: "website",
    url: "https://www.twtaxcalc.com/tax-checklist-2026",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/tax-checklist-2026" },
};

export default function TaxChecklist2026Layout({
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
              headline: "2026報稅懶人包｜114年度申報前必確認的10件事",
              description:
                "114年度綜合所得稅（2026年5月申報）申報前必確認清單：扶養、幼兒學前扣除、夫妻申報方式、股利課稅、薪資特別扣除額等10項重點，含倒數計時器。",
              dateModified: "2026-04-08",
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
                  name: "2026年（114年度）報稅截止日是什麼時候？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "114年度綜合所得稅申報截止日為2026年5月31日。申報期間為2026年5月1日至5月31日。建議5月上旬就申報，越早申報退稅越快入帳（第1批退稅約7月上旬，5月底才申報的可能要等到9月以後）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "報稅前最容易被忽略的扣除額有哪些？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "最常被遺漏的扣除額包括：(1) 幼兒學前特別扣除額：6歲以下子女每人150,000元；(2) 長期照顧特別扣除額：領有失能認定者每人120,000元；(3) 購屋借款利息：自住房屋貸款利息最高300,000元；(4) 身心障礙特別扣除額：218,000元/人；(5) 教育學費特別扣除額：大學以上子女25,000元/人。",
                  },
                },
                {
                  "@type": "Question",
                  name: "夫妻合併申報和分開申報哪種比較省稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "這取決於夫妻收入結構。一般原則：(1) 收入相近的雙薪夫妻，薪資所得分開計算通常較省（各自適用較低稅率）；(2) 一方收入明顯較高或有一方無收入，合併申報可充分利用免稅額；(3) 有各類所得（股利、租金等）的情況更複雜。建議用試算工具同時計算3種方式，選最低的。",
                  },
                },
                {
                  "@type": "Question",
                  name: "報稅需要準備哪些文件？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "基本文件：各類扣繳憑單（公司提供的薪資扣繳憑單、銀行存款利息憑單等）、健保卡、國民身分證。若有列舉扣除需準備：捐贈收據、保險費繳費明細、醫藥費收據、房貸利息對帳單、房租租賃契約。線上報稅可透過財政部電子申報系統查詢大部分已登錄的所得資料。",
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
