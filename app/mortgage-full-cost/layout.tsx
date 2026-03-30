import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "房貸族完整費用指南 2026｜買房前必看：設定費・代書・保險・房屋稅一次算清",
  description:
    "買房不只是月付金！完整列出設定費、代書費、火災保險、房貸壽險、房屋稅、地價稅、管理費等隱藏成本。含每年持有成本計算機、提前還款試算，讓你真正看懂買房的總費用。",
  keywords: [
    "買房費用", "房貸費用", "房屋設定費", "代書費用", "房貸保險",
    "火災保險", "房貸壽險", "房屋稅計算", "地價稅計算", "買房隱藏費用",
    "買房總費用", "持有成本", "提前還款試算", "房貸手續費",
    "貸款設定費", "房屋稅率", "地價稅率", "買房完整費用",
    "mortgage fees taiwan", "2026 買房", "房貸注意事項",
  ],
  openGraph: {
    title: "買房費用全攻略 2026｜月付金以外你還要付多少？",
    description:
      "設定費、代書費、火險、壽險、房屋稅、地價稅…買房的隱藏成本加起來可能超過 30 萬。本文全部算給你看，附每年持有成本計算機。",
    type: "website",
    url: "https://www.twtaxcalc.com/mortgage-full-cost",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/mortgage-full-cost" },
};

export default function MortgageFullCostLayout({
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
              headline: "房貸族完整費用指南 2026｜買房隱藏成本全解析",
              description:
                "台灣買房完整費用清單：一次性費用（設定費、代書費、規費）＋每年持有成本（房屋稅、地價稅、火險、壽險、管理費）＋提前還款規劃。",
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
                  name: "買房除了頭期款和月付金，還有哪些費用？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "一次性費用包括：貸款設定費（貸款金額×0.1%）、代書費（約1~2萬）、土地登記規費（0.1%）、火災保險保費（首年約3,000~8,000）、房貸壽險（可選擇性購買）。每年持有費用包括：房屋稅、地價稅、火險續保、社區管理費（若有）。以貸款800萬為例，一次性費用加總約3~6萬元。",
                  },
                },
                {
                  "@type": "Question",
                  name: "台灣房屋稅怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "房屋稅 = 房屋評定現值 × 稅率。自住用房屋稅率為1.2%（114年度起，持有一至三戶）；非自住（出租或空置）稅率2%~4.8%（各縣市不同）。房屋評定現值通常遠低於市價，以台北市40坪實品屋為例，房屋稅約6,000~20,000元/年不等。",
                  },
                },
                {
                  "@type": "Question",
                  name: "地價稅怎麼計算？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "地價稅 = 地價總額 × 稅率。自用住宅地價稅率為0.2%（需申請自用住宅優惠，否則一般稅率1%）。地價總額 = 公告地價 × 持分面積。實務上，以台北市普通住宅為例，自用地價稅約3,000~15,000元/年。",
                  },
                },
                {
                  "@type": "Question",
                  name: "提前還款划算嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "取決於你的房貸利率 vs 其他投資報酬率。房貸利率2.1%，若你能找到報酬率3%以上的穩健投資（例如美國公債、定存利率高時），錢投資比提前還款更划算。房貸利率超過3%時，提前還款的保證報酬高於多數無風險投資，考慮優先還款。另需注意提前還款手續費（通常前3年有1~2%違約金）。",
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
