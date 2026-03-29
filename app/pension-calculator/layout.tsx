import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "勞退自提節稅計算器 — 自願提撥能省多少稅？114 年度",
  description:
    "輸入月薪與自提比例，立即試算勞退自願提撥每年能省多少所得稅、退休時能多領多少。依 114 年度五級累進稅率計算，免費免登入。",
  keywords: [
    "勞退自提", "勞退自提節稅", "勞退自願提撥", "勞退計算器",
    "勞退自提多少", "勞退節稅計算", "勞工退休金自提",
    "自提6%省稅", "勞退自提試算", "退休金計算器",
    "114年度勞退", "勞退自提值得嗎",
  ],
  openGraph: {
    title: "勞退自提能省多少稅？免費試算",
    description: "自提 6% 月薪，政府幫你出部分退休金。輸入薪資立即算出每年省稅金額與退休積累。",
    type: "website",
    url: "https://www.twtaxcalc.com/pension-calculator",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.twtaxcalc.com/pension-calculator" },
};

export default function PensionCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "勞退自提節稅計算器",
              description: "試算台灣勞工自願提撥勞退的節稅效益與退休積累金額，114 年度五級累進稅率",
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
                  name: "勞退自提最多可以提幾%？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "依勞工退休金條例，員工自願提撥上限為薪資的 6%。加上雇主強制提撥的 6%，每月最多有 12% 的薪資進入個人退休帳戶。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退自提怎麼節稅？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "自願提撥金額可以全額從當年度綜合所得總額中扣除，直接降低應稅所得。如果邊際稅率是 12%，每提撥 1 萬元就省 1,200 元稅，等於打折存退休金。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退自提的錢什麼時候能領？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "年滿 60 歲後可申請領取，可選擇月領年金或一次領取。帳戶由勞動部勞動基金運用局管理，不會因公司倒閉而損失。",
                  },
                },
                {
                  "@type": "Question",
                  name: "什麼樣的人最值得勞退自提？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "邊際稅率越高越值得自提。薪資在 59 萬以上（單身）的人，省稅比例高達 12% 以上，自提等於打折存錢。任何稅率的人都能享有強制儲蓄與政府保管的好處。",
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
