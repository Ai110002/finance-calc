import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "月薪試算｜勞保健保扣多少？實拿薪資計算器 — 114 年度費率",
  description:
    "輸入月薪，即時計算勞保費、健保費、二代健保補充保費、勞退自提後的實拿金額。含雇主總人事成本試算。114 年度費率，免費、免登入。",
  keywords: [
    "月薪計算器", "薪資試算", "勞保費計算", "健保費計算", "實拿薪資",
    "勞退自提", "二代健保補充保費", "月薪28000實拿多少", "薪資扣款",
    "到手薪資", "salary calculator taiwan", "114年度",
  ],
  openGraph: {
    title: "月薪試算｜勞保健保扣多少？實拿薪資計算器",
    description: "輸入月薪，自動計算勞保、健保、補充保費、勞退扣款後的實拿金額。含雇主總人事成本。114 年度費率。",
    type: "website",
    url: "https://www.twtaxcalc.com/salary-calculator",
    siteName: "twtaxcalc.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/salary-calculator",
  },
};

export default function SalaryCalculatorLayout({
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
              name: "月薪試算 — 勞保健保扣款計算器",
              description: "計算台灣受僱者月薪扣除勞保、健保、補充保費、勞退自提後的實拿薪資，114 年度費率",
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
                  name: "月薪35000實拿多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "月薪 35,000 元，以 114 年度費率（勞保投保薪資 36,300）計算：勞保費約 944 元、健保費約 563 元，總扣款約 1,507 元，實拿約 33,493 元（到手率約 95.7%）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "月薪28590實拿多少？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "月薪 28,590 元（基本工資），114 年度費率：勞保費約 743 元、健保費約 443 元，總扣款約 1,186 元，實拿約 27,404 元（到手率約 95.8%）。",
                  },
                },
                {
                  "@type": "Question",
                  name: "勞退自提要扣薪嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "是的，勞退自願提撥金額會從每月薪資中扣除，存入你的個人勞退帳戶。但這筆錢可以全額從當年度綜合所得中扣除，等於先省稅後再存退休金。",
                  },
                },
                {
                  "@type": "Question",
                  name: "公司幫我付多少保費？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "雇主負擔勞保費 70%、健保費 60%，並另行提撥勞退 6%（不扣薪）。以月薪 35,000 為例，公司每月人事成本約 41,000 元以上。",
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
