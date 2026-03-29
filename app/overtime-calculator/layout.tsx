import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "加班費計算器 2026 — 平日、休息日、國定假日即時試算",
  description:
    "台灣加班費快速計算工具。輸入月薪即可計算平日、休息日、國定假日的加班費，依據勞動基準法 115 年版。加班費屬薪資所得，記得一起報稅。",
  keywords: [
    "加班費計算器", "加班費計算", "加班費怎麼算", "平日加班費",
    "休息日加班費", "國定假日加班費", "勞基法加班", "加班費試算",
    "overtime calculator taiwan", "加班費2026",
  ],
  openGraph: {
    title: "加班費計算器 2026 — 平日、休息日、國定假日",
    description: "依勞基法計算加班費。輸入月薪和加班時數，立即得出應領加班費，並了解如何一起申報所得稅。",
    type: "website",
  },
};

export default function OvertimeCalculatorLayout({
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
              name: "加班費計算器",
              description: "依台灣勞動基準法計算平日、休息日、國定假日加班費的免費工具",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "加班費怎麼算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "每小時工資 = 月薪 ÷ 240。平日加班前2小時按1.34倍計算，第3小時起按1.67倍計算。休息日加班有最低4小時保障。國定假日出勤則是2倍工資。",
                  },
                },
                {
                  "@type": "Question",
                  name: "加班費需要報稅嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "需要。加班費屬於薪資所得，會在扣繳憑單上一併列出，報稅時需計入綜合所得總額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "月薪怎麼換算時薪？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依勞基法規定，月薪制員工的每小時工資 = 月薪 ÷ 30 ÷ 8 = 月薪 ÷ 240。例如月薪 50,000 元，時薪為 208.33 元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "休息日和例假日有什麼不同？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "休息日（通常是週六）加班可以用補休或加班費。例假日（通常是週日）原則上不得出勤，僅限天災等緊急情況，補休或加倍工資。",
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
