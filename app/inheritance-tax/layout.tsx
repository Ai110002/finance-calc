import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "遺產稅計算機 2026｜免稅額1333萬，30秒算出你要繳多少",
  description:
    "台灣遺產稅免費試算工具。輸入遺產總額、繼承人結構，自動扣除1333萬免稅額、配偶553萬、子女55.3萬等扣除額，即時計算應繳遺產稅。符合114年財政部標準。",
  keywords: [
    "遺產稅計算機",
    "遺產稅試算",
    "遺產稅免稅額",
    "遺產稅怎麼算",
    "台灣遺產稅",
    "繼承稅計算",
    "遺產稅1333萬",
    "遺產稅扣除額",
    "遺產稅申報",
    "繼承房屋要繳稅嗎",
  ],
  openGraph: {
    title: "遺產稅計算機｜免稅額1333萬，30秒算出應繳稅額",
    description:
      "輸入遺產總額與繼承人結構，自動計算各項扣除額與遺產稅稅額。配偶553萬、子女55.3萬、重度障礙693萬全部幫你算好。",
    type: "website",
    url: "https://www.twtaxcalc.com/inheritance-tax",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/inheritance-tax",
  },
};

export default function InheritanceTaxLayout({
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
              name: "遺產稅計算機 2026",
              description:
                "台灣遺產稅互動試算工具，自動套用114年免稅額1333萬、各類繼承人扣除額，即時計算應繳遺產稅稅額",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
              url: "https://www.twtaxcalc.com/inheritance-tax",
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "遺產稅計算機｜2026年台灣遺產稅免稅額、扣除額、稅率完整試算",
              description:
                "台灣遺產稅免稅額1333萬，加上配偶553萬、子女55.3萬等扣除額，許多家庭實際繳稅額為零。本計算機幫你30秒算清楚，並說明合法節稅策略。",
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
                  name: "台灣遺產稅免稅額是多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "根據財政部114年度規定，遺產稅免稅額為1,333萬元。此外還有喪葬費扣除額138.3萬元、配偶扣除額553萬元、子女每人55.3萬元等多項扣除額，許多家庭在扣除後實際課稅遺產淨額為零，不需繳稅。",
                  },
                },
                {
                  "@type": "Question",
                  name: "遺產稅稅率是多少？幾個級距？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "台灣遺產稅分三級課徵：課稅遺產淨額5,000萬以下稅率10%；5,000萬至1億元稅率15%；超過1億元稅率20%。計算方式為超過部分適用較高稅率（累進稅率）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "房子要列入遺產稅計算嗎？用市價還是公告現值？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "不動產計入遺產時，土地按「公告現值」計算、房屋按「評定現值（課稅現值）」計算，而非市價。因此市值2,000萬的台北房子，實際計入遺產的金額可能只有數百萬元，大幅降低課稅遺產總額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "遺產稅什麼時候要申報？會罰款嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "被繼承人死亡後6個月內須申報遺產稅（可延期3個月）。未申報者，稅務機關查獲後除補稅外，還會加計罰款（最高可達稅額2倍）。即使估計不用繳稅，也建議依法申報，以取得繳清稅款或免稅同意書，辦理不動產繼承移轉。",
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
