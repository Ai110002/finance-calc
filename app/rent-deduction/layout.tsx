import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "租屋族報稅省稅試算 2026｜房屋租金特別扣除額 18 萬怎麼用？",
  description:
    "114年度新制！租屋族可申報「房屋租金特別扣除額」最高 NT$180,000，疊加標準扣除額一起用。輸入月租金 + 薪資，立即算出你能省多少稅。無自有房屋者適用。",
  keywords: [
    "租屋族報稅",
    "房屋租金特別扣除額",
    "租金扣除額",
    "114年度租金扣除",
    "2026報稅租金",
    "租金抵稅",
    "房租可以報稅嗎",
    "租屋節稅",
    "房租扣除稅",
    "租屋族節稅",
    "租金特別扣除",
    "房租報稅怎麼申報",
    "無自有房屋節稅",
    "租金扣除試算",
  ],
  openGraph: {
    title: "租屋族報稅新制｜房租最高扣 18 萬，省多少稅？",
    description:
      "114年度起，租屋族可額外申報「房屋租金特別扣除額」最高 NT$180,000，疊加標準扣除額。月租 8,000 以上就值得試算！",
    type: "website",
    url: "https://www.twtaxcalc.com/rent-deduction",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/rent-deduction",
  },
};

export default function RentDeductionLayout({
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
              name: "租屋族房屋租金特別扣除額試算 2026",
              description:
                "台灣114年度房屋租金特別扣除額試算工具。輸入月租金與年薪資，計算可申報扣除金額及節稅金額。114年度新制，最高可扣除 NT$180,000。",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/rent-deduction",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "租屋族報稅 2026｜房屋租金特別扣除額最高 18 萬，怎麼申報最省？",
              description:
                "114年度起，在台灣無自有房屋的租屋族，可額外申報「房屋租金特別扣除額」，上限每申報戶 NT$180,000，且可與標準扣除額疊加。月薪資 5 萬、月租 1.5 萬的人，一年可省稅超過 2 萬元。",
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
                  name: "房屋租金特別扣除額是什麼？114年度才有嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是的，「房屋租金特別扣除額」是114年度（2025年所得，2026年5月申報）新增的稅務優惠。申報戶每年最高可扣除 NT$180,000 的租金支出，且屬於「特別扣除額」，可與標準扣除額（131,000元/單身或262,000元/夫妻合報）疊加，不需改用列舉扣除額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "誰可以申報房屋租金特別扣除額？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "主要條件：①本人及配偶在台灣境內「無自有房屋」（含配偶名下）；②租賃房屋供本人、配偶或受扶養親屬實際居住；③不可向本人、配偶、或申報受扶養直系親屬（父母、子女）租賃；④需有合法租賃契約及付款紀錄（轉帳記錄或收據）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "我用標準扣除額，還可以再申報租金嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可以！這正是114年度新制最大的優點。房屋租金特別扣除額屬於「特別扣除額」，不是「列舉扣除額」，所以不需要放棄標準扣除額。你可以同時享有：標準扣除額（131,000/262,000元）＋薪資特別扣除額（218,000元）＋房屋租金特別扣除額（最高180,000元）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "申報房屋租金扣除額需要準備什麼文件？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "需要準備：①租賃契約書（記載租賃期間、地址、租金金額）；②實際付款紀錄（銀行轉帳明細、或房東簽名收據）；③若房東有開立統一發票或收據更佳。申報時需在報稅系統中填寫租金金額，系統會自動計算可扣除上限。國稅局可能事後抽查，務必保留文件至少5年。",
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
