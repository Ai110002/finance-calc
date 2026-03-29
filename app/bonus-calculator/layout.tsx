import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "年終獎金要繳多少稅？年終獎金稅額計算器 — 114 年度",
  description:
    "輸入年終獎金金額與全年薪資，立即試算要多繳多少所得稅、有效稅率是多少。依 114 年度五級累進稅率計算，免費免登入。",
  keywords: [
    "年終獎金稅額", "年終獎金要繳稅嗎", "年終獎金計算", "年終獎金稅率",
    "年終幾個月薪水", "年終獎金所得稅", "薪資所得稅計算", "114年度所得稅",
    "年終報稅", "bonus tax calculator taiwan",
  ],
  openGraph: {
    title: "年終獎金要繳多少稅？免費試算",
    description: "輸入年終獎金與全年薪資，立即知道要多繳多少稅、邊際稅率幾%。114 年度所得稅率。",
    type: "website",
    url: "https://www.twtaxcalc.com/bonus-calculator",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/bonus-calculator" },
};

export default function BonusCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "年終獎金稅額計算器",
              description: "試算台灣年終獎金需繳納的所得稅額，114 年度五級累進稅率",
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
                  name: "年終獎金要繳稅嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是的，年終獎金屬於「薪資所得」，須合計入全年所得申報綜合所得稅。但實際要多繳多少稅，取決於你的全年薪資落在哪個累進稅率級距。低薪者稅率 5%，高薪者最高 40%。",
                  },
                },
                {
                  "@type": "Question",
                  name: "年終獎金1個月要繳多少稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "以月薪 50,000 為例，1個月年終（50,000元）若全年薪資 600,000 元，扣除標準扣除額、薪資扣除額、免稅額後，約落在 5%~12% 稅率級距，需多繳約 2,500～6,000 元所得稅。",
                  },
                },
                {
                  "@type": "Question",
                  name: "年終獎金會被扣繳嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "雇主通常會在發放時預扣 5% 的薪資所得扣繳稅款，之後報稅時再依實際級距多退少補。若實際邊際稅率高於 5%，報稅時需補繳差額。",
                  },
                },
                {
                  "@type": "Question",
                  name: "如何減少年終獎金的稅負？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可透過：1) 增加勞退自提（年底前加提，可抵薪資所得）、2) 善用列舉扣除額（捐款、保費）、3) 如有配偶，評估合併或分開申報哪個划算。",
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
