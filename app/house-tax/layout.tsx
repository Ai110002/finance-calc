import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "房屋稅計算機 2026｜自住1.2%、非自住最高4.8%，30秒算清楚",
  description:
    "台灣房屋稅免費試算工具。輸入房屋評定現值、選擇自住/非自住/商業用途，即時計算每年應繳房屋稅。依財政部114年度標準，5月開徵前必看。",
  keywords: [
    "房屋稅計算機",
    "房屋稅試算",
    "房屋稅怎麼算",
    "房屋稅自住稅率",
    "房屋稅非自住",
    "房屋稅2026",
    "房屋評定現值",
    "台灣房屋稅",
    "房屋稅幾月繳",
    "房屋稅節稅",
  ],
  openGraph: {
    title: "房屋稅計算機｜自住1.2%、出租最高4.8%，5月前必算",
    description:
      "輸入房屋評定現值，選自住/出租/商業，立即算出每年房屋稅。附節稅攻略：申請自住優惠稅率最省錢。",
    type: "website",
    url: "https://www.twtaxcalc.com/house-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/house-tax",
  },
};

export default function HouseTaxLayout({
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
              name: "房屋稅計算機 2026",
              description:
                "台灣房屋稅互動試算工具，自動套用114年稅率：自住1.2%、非自住2-4.8%、商業3%，即時計算每年應繳稅額",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/house-tax",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "房屋稅計算機｜2026年台灣房屋稅稅率、評定現值、節稅完整試算",
              description:
                "台灣房屋稅每年5月繳交，自住稅率1.2%，非自住依持有戶數2%至4.8%累進，商業用3%。用評定現值（非市價）計算，本工具幫你30秒算清楚，並提供申請自住優惠的節稅建議。",
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
                  name: "台灣房屋稅稅率是多少？自住和非自住有什麼差別？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依財政部114年度規定，自住住家用稅率為1.2%（本人、配偶或直系親屬實際居住，全國限3戶以內）；非自住住家用依持有戶數累進：第1戶2%、第2戶3.2%、第3戶以上4.8%；商業/營業用3%。自住和非自住的稅率差距可達4倍，申請自住優惠是最有效的節稅方式。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房屋稅的計算基礎是市價還是評定現值？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "房屋稅以「房屋評定現值」為計算基礎，不是市價。評定現值由稅務機關依房屋標準單價、面積、屋齡計算，通常遠低於市價。例如台北市市值2,000萬的房子，評定現值可能只有100萬至500萬，因此每年房屋稅通常只有數千至數萬元，而非一般人想像的高額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房屋稅和地價稅有什麼不同？都要繳嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "房屋稅針對「建物」課徵，每年5月1日至31日繳交；地價稅針對「土地」課徵，每年11月繳交。購屋後兩種稅都須繳納。房屋稅以房屋評定現值計算，地價稅以公告地價計算，兩者都遠低於市價，是持有不動產的年度固定成本。",
                  },
                },
                {
                  "@type": "Question",
                  name: "怎麼申請自住優惠稅率？需要每年申請嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "向房屋所在地的稅捐處填寫「住家用房屋供自住使用申請書」，附上戶口名簿或戶籍謄本，確認本人、配偶或直系親屬確實居住且未出租。申請核准後，只要使用狀況不變，無須每年重複申請。若原本出租後改為自住，可在當年度申請，下個繳稅期即可適用1.2%自住稅率。",
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
