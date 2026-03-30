import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "費用核實 vs 必要費用率9A｜自由工作者選哪個省稅？2026 - 台灣財務試算",
  description:
    "接案族報稅關鍵決策：必要費用率（9A，20%）vs 費用核實。試算你的損益平衡點——年收多少、實際費用多少，選費用核實才划算。114年度（2026年5月申報）。",
  keywords: [
    "費用核實",
    "必要費用率",
    "9A費率",
    "執行業務費用",
    "費用核實vs費用率",
    "自由工作者費用扣除",
    "接案費用申報",
    "費用核實節稅",
    "執行業務所得費用標準",
    "自由工作者報稅",
    "接案族節稅",
    "費用核實損益平衡",
    "費用核實需要什麼",
    "接案費用可以扣除哪些",
    "2026報稅費用扣除",
    "114年度費用率",
  ],
  openGraph: {
    title: "費用核實 vs 必要費用率9A｜哪個更省稅？",
    description:
      "年收80萬的接案族，政府認列費用16萬。你的實際費用超過16萬了嗎？超過就換費用核實，沒超過就用9A最省事。30秒看懂你的選擇。",
    type: "website",
    url: "https://www.twtaxcalc.com/expense-deduction-compare",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: "https://www.twtaxcalc.com/expense-deduction-compare",
  },
};

export default function ExpenseDeductionCompareLayout({
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
              headline:
                "費用核實 vs 必要費用率（9A）完整比較｜2026接案族報稅費用扣除怎麼選",
              description:
                "台灣自由工作者報稅費用扣除方式完整說明：必要費用率（9A）20%免憑證 vs 費用核實需保留單據。損益平衡試算、可核實費用清單、114年度數字。",
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
                  name: "必要費用率（9A）和費用核實有什麼差別？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "必要費用率（9A）是政府公告的固定費用比例，一般接案族適用20%，演講費（≤5,000元/次）適用30%，不需要任何憑證，申報最方便。費用核實則是以實際支出的費用（設備、軟體、辦公室、交通等）向稅務機關申報，需保留發票收據，適合實際費用支出高於費用率認列金額的人。",
                  },
                },
                {
                  "@type": "Question",
                  name: "什麼情況下費用核實比9A費率省稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "簡單公式：若你的實際可核實費用 > 年收入 × 費用率，選費用核實更省稅。例如年收100萬、費用率20%，政府用9A認列20萬費用；若你實際有25萬的費用單據，選費用核實可多扣5萬，以12%稅率計算多省6,000元。費用率20%適用的接案族，損益平衡點就是「實際費用 = 年收 × 20%」。",
                  },
                },
                {
                  "@type": "Question",
                  name: "費用核實可以申報哪些費用？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "主要可核實費用包括：1. 電腦、鏡頭、設備購置（可按折舊或一次性費用申報）；2. 軟體訂閱（Adobe CC、Figma、GitHub Copilot 等）；3. 辦公室租金（工作專用空間，家庭辦公室按使用比例）；4. 網路費、電話費（工作比例）；5. 工作相關交通費；6. 進修課程費用；7. 書籍、參考資料費；8. 廣告、業務推廣費。所有費用需保留正式發票或收據。",
                  },
                },
                {
                  "@type": "Question",
                  name: "費用核實申報之後，稅局會來查嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "選擇費用核實後，稅務機關可能會要求提供憑證。建議將工作相關費用的發票、收據、刷卡明細分類保存至少5年。常見問題包括：將個人消費混入工作費用、家庭辦公室比例認定等。若單據齊全且費用合理，一般不會有問題。費用大幅超過業別常態時，被抽查機率較高。",
                  },
                },
                {
                  "@type": "Question",
                  name: "每年都要選同一種方式嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "不需要，每年可以獨立選擇。建議每年報稅前用本頁工具估算：今年實際費用支出和年收入的比例，超過費用率就選費用核實，沒超過就選必要費用率（9A）最省事。設備採購年的費用通常較高，那一年更值得評估費用核實。",
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
