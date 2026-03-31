import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "夫妻合併申報 vs 分開申報試算｜114年度哪種最省？ - 台灣財務試算",
  description:
    "114年度夫妻報稅怎麼選最省？合併申報、薪資所得分開計算、各類所得分開計算3種方式完整比較。含試算範例：雙薪收入相近 vs 單薪家庭 vs 薪資差距大，30秒找到最省方式。",
  keywords: [
    "夫妻合併申報",
    "夫妻分開申報",
    "配偶報稅",
    "薪資所得分開計算",
    "114年度夫妻報稅",
    "夫妻節稅",
    "合併報稅比較",
    "雙薪報稅",
    "夫妻報稅哪種省",
    "各類所得分開計算",
    "夫妻所得稅",
    "雙薪家庭節稅",
  ],
  openGraph: {
    title: "夫妻合併申報 vs 分開申報試算｜114年度哪種最省？",
    description:
      "114年度夫妻報稅3種方式：合併申報、薪資分開計算、各類所得分開計算。30秒判斷哪種最省，附雙薪/單薪家庭試算範例。",
    url: "https://www.twtaxcalc.com/joint-filing",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開", active: true },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "退休試算" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
];

const FAQS = [
  {
    q: "夫妻一定要合併申報嗎？",
    a: "不一定。114年度起，夫妻可以選擇三種申報方式：①合併申報（所得合計計稅）、②薪資所得分開計算（配偶薪資單獨計稅，其他所得仍合併）、③各類所得分開計算（完全分開各自申報）。每種方式算出來的稅額不同，選最省的那種即可。",
  },
  {
    q: "雙薪家庭選哪種申報方式通常最省？",
    a: "雙薪家庭且兩人都有薪資所得時，「各類所得分開計算」通常最省，因為兩人分開後各自使用較低的稅率級距，避免合計後跨入更高稅率。但有海外所得、股利或其他非薪資所得時，需要逐一計算比較才能確認。",
  },
  {
    q: "一方無收入的家庭選哪種？",
    a: "一方無收入或收入極低（薪資 < 約15萬/年）時，「合併申報」通常最省。因為合併後可以使用配偶的免稅額（9.2萬）和標準扣除額（合併26.2萬 vs 單身13.1萬），扣除額合計更多，應稅所得反而更低。",
  },
  {
    q: "「薪資所得分開計算」和「各類所得分開計算」有什麼差別？",
    a: "薪資所得分開計算：配偶的薪資單獨適用稅率，但利息、租賃、股利等其他所得仍與你合併計算。各類所得分開計算：夫妻所有所得完全分開，各自計算稅額後相加。兩種方式哪個省要看雙方的非薪資所得狀況。",
  },
  {
    q: "報稅系統可以自動比較哪種方式最省嗎？",
    a: "可以。財政部報稅系統（eTax Portal）在申報時會有「試算比較」功能，可以看三種方式的估算結果。但系統試算是估算值，建議配合本頁的手算邏輯再確認一次，或找會計師協助。",
  },
];

export default function JointFilingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "夫妻合併申報 vs 分開申報試算｜114年度哪種最省？",
        description:
          "114年度夫妻報稅3種方式完整比較：合併申報、薪資所得分開計算、各類所得分開計算，附試算範例。",
        url: "https://www.twtaxcalc.com/joint-filing",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
              114年度報稅攻略
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              夫妻合併 vs 分開申報
              <br />
              <span className="text-indigo-600">哪種繳最少稅？</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              114年度有三種方式可選。雙薪家庭一般省更多，但要算才知道。
            </p>
          </div>

          {/* Quick Decision */}
          <div className="mb-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              30秒判斷框：我該選哪種？
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3 rounded-xl bg-amber-50 p-4">
                <span className="text-xl">①</span>
                <div>
                  <p className="font-semibold text-gray-800">配偶無收入或薪資 &lt; 15萬/年</p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    → <span className="font-bold text-indigo-700">合併申報</span>最省。配偶的免稅額9.2萬＋合併標準扣除額26.2萬，扣完稅更低。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl bg-blue-50 p-4">
                <span className="text-xl">②</span>
                <div>
                  <p className="font-semibold text-gray-800">雙薪、兩人薪資都超過15萬/年</p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    → <span className="font-bold text-indigo-700">各類所得分開計算</span>通常最省。兩人分開各用低稅率，避免合計後跳級距。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl bg-purple-50 p-4">
                <span className="text-xl">③</span>
                <div>
                  <p className="font-semibold text-gray-800">其中一人有大量股利或租賃收入</p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    → 試算「<span className="font-bold text-indigo-700">薪資分開＋非薪資合併</span>」vs「全部分開」兩種。非薪資所得多的那方，分開計算通常更省。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Three Methods Explanation */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              三種申報方式完整說明
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-2 inline-block rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                  方式一
                </div>
                <h3 className="mb-2 font-bold text-gray-900">合併申報</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  夫妻所有所得合計，扣除免稅額（92,000 × 2）、標準扣除額（262,000）及各人特別扣除額後，一起計算稅額。
                </p>
                <div className="mt-3 rounded-lg bg-green-50 p-2 text-xs text-green-700 font-medium">
                  適合：單薪家庭、配偶無收入
                </div>
              </div>
              <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm ring-1 ring-indigo-200">
                <div className="mb-2 inline-block rounded-lg bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                  方式二（常見）
                </div>
                <h3 className="mb-2 font-bold text-gray-900">薪資所得分開計算</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  配偶薪資單獨計稅（加計配偶的免稅額、薪資特別扣除額），其餘所得（股利、租賃、利息等）仍與申報人合併計算。
                </p>
                <div className="mt-3 rounded-lg bg-indigo-50 p-2 text-xs text-indigo-700 font-medium">
                  適合：薪資差距大、一人有較多非薪資所得
                </div>
              </div>
              <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
                <div className="mb-2 inline-block rounded-lg bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                  方式三
                </div>
                <h3 className="mb-2 font-bold text-gray-900">各類所得分開計算</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  夫妻所有所得完全分開，各自使用自己的免稅額、扣除額計算稅額，最後兩人稅額相加繳納。
                </p>
                <div className="mt-3 rounded-lg bg-purple-50 p-2 text-xs text-purple-700 font-medium">
                  適合：雙薪、收入接近、各自都有扣除項
                </div>
              </div>
            </div>
          </div>

          {/* Key Deductions Reference */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              114年度關鍵數字（計算前先確認）
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "免稅額（每人）", value: "92,000", note: "合併×2" },
                { label: "標準扣除額", value: "131,000", note: "單身｜合併262,000" },
                { label: "薪資特別扣除額", value: "218,000", note: "每位有薪資者各可扣" },
                { label: "基本生活費", value: "210,000", note: "每人，不足免稅額可補差額" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="mt-1 text-base font-bold text-indigo-700">{item.value}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[400px] text-xs">
                <thead>
                  <tr className="bg-slate-100 text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">應稅所得</th>
                    <th className="px-3 py-2 font-semibold">稅率</th>
                    <th className="px-3 py-2 font-semibold">累進差額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { bracket: "0 – 560,000", rate: "5%", diff: "0" },
                    { bracket: "560,001 – 1,260,000", rate: "12%", diff: "39,200" },
                    { bracket: "1,260,001 – 2,520,000", rate: "20%", diff: "140,000" },
                    { bracket: "2,520,001 – 4,720,000", rate: "30%", diff: "392,000" },
                    { bracket: "4,720,001 以上", rate: "40%", diff: "864,000" },
                  ].map((row) => (
                    <tr key={row.bracket} className="text-gray-700">
                      <td className="px-3 py-2">{row.bracket}</td>
                      <td className="px-3 py-2 font-bold text-indigo-700">{row.rate}</td>
                      <td className="px-3 py-2">{row.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* Case Studies */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              三種情境試算比較
            </h2>
            <p className="mb-5 text-sm text-gray-500">
              以下試算皆採標準扣除額，無其他特別扣除項目。
            </p>

            {/* Case 1 */}
            <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  案例1
                </span>
                <div>
                  <p className="font-bold text-gray-900">雙薪收入相近</p>
                  <p className="text-xs text-gray-500">小明薪資150萬 / 小花薪資100萬</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-xs font-bold text-red-700 mb-2">合併申報</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>所得合計：250萬</p>
                    <p>扣除項：184,000＋262,000＋436,000＝882,000</p>
                    <p>應稅所得：<strong>1,618,000</strong></p>
                    <p>稅額：28,000＋84,000＋71,600</p>
                    <p className="text-base font-bold text-red-700 mt-2">= 183,600 元</p>
                  </div>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold text-green-700 mb-2">各類所得分開計算</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>小明：淨額1,059,000 → 稅87,880</p>
                    <p>小花：淨額559,000 → 稅27,950</p>
                    <p className="text-base font-bold text-green-700 mt-2">= 115,830 元</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-indigo-600 px-4 py-3 text-center text-white">
                <p className="text-sm font-bold">分開計算省 <span className="text-xl">67,770 元</span> ✓</p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="mb-6 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  案例2
                </span>
                <div>
                  <p className="font-bold text-gray-900">單薪家庭</p>
                  <p className="text-xs text-gray-500">小明薪資200萬 / 小花無收入</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold text-green-700 mb-2">合併申報</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>扣除項：184,000＋262,000＋218,000＝664,000</p>
                    <p>應稅所得：<strong>1,336,000</strong></p>
                    <p>稅額：28,000＋84,000＋15,200</p>
                    <p className="text-base font-bold text-green-700 mt-2">= 127,200 元</p>
                  </div>
                </div>
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-xs font-bold text-red-700 mb-2">各類所得分開計算</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>小明單獨：免稅92,000＋標準131,000＋薪資218,000</p>
                    <p>應稅所得：<strong>1,559,000</strong></p>
                    <p>稅額：28,000＋84,000＋59,800</p>
                    <p className="text-base font-bold text-red-700 mt-2">= 171,800 元</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-amber-600 px-4 py-3 text-center text-white">
                <p className="text-sm font-bold">合併申報省 <span className="text-xl">44,600 元</span> ✓</p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="mb-2 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                  案例3
                </span>
                <div>
                  <p className="font-bold text-gray-900">薪資差距大</p>
                  <p className="text-xs text-gray-500">小明薪資300萬 / 小花薪資60萬</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-xs font-bold text-red-700 mb-2">合併申報</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>合計360萬，扣除882,000，淨額2,718,000</p>
                    <p>稅額：28,000＋84,000＋252,000＋59,400</p>
                    <p className="text-base font-bold text-red-700 mt-2">= 423,400 元</p>
                  </div>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold text-green-700 mb-2">各類所得分開計算</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>小明：淨額2,559,000 → 稅375,700</p>
                    <p>小花：淨額159,000 → 稅7,950</p>
                    <p className="text-base font-bold text-green-700 mt-2">= 383,650 元</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-purple-600 px-4 py-3 text-center text-white">
                <p className="text-sm font-bold">分開計算省 <span className="text-xl">39,750 元</span> ✓</p>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">三種方式速查表</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-xs">
                <thead>
                  <tr className="bg-slate-100 text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">情境</th>
                    <th className="px-3 py-2 font-semibold">建議方式</th>
                    <th className="px-3 py-2 font-semibold">省稅關鍵</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      scenario: "配偶無收入／薪資 < 15萬",
                      method: "合併申報",
                      key: "配偶免稅額＋合併標扣，扣除額大幅增加",
                    },
                    {
                      scenario: "雙薪，兩人薪資相近",
                      method: "各類所得分開",
                      key: "兩人各自適用低稅率，省最多",
                    },
                    {
                      scenario: "薪資差距大（3:1以上）",
                      method: "各類所得分開",
                      key: "高薪者獨立計稅，低薪者的5%稅率獨立適用",
                    },
                    {
                      scenario: "一方有大量股利/租賃所得",
                      method: "需試算薪資分開 vs 全部分開",
                      key: "非薪資所得多的那方建議分開，視情況而定",
                    },
                    {
                      scenario: "一方為接案/兼職（非薪資）",
                      method: "各類所得分開",
                      key: "接案所得不適用薪資特扣，分開避免拉高合計稅率",
                    },
                  ].map((row) => (
                    <tr key={row.scenario} className="text-gray-700">
                      <td className="px-3 py-2">{row.scenario}</td>
                      <td className="px-3 py-2 font-bold text-indigo-700">{row.method}</td>
                      <td className="px-3 py-2 text-gray-500">{row.key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA 2 */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-gray-800">
                    {faq.q}
                    <span className="ml-2 shrink-0 text-gray-400 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900">相關計算工具</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "綜合所得稅試算", desc: "完整所得稅計算" },
                { href: "/deduction-compare", label: "列舉 vs 標準扣除", desc: "哪種扣除額更省" },
                { href: "/dependent-deduction", label: "扶養節稅試算", desc: "申報扶養能省多少" },
                { href: "/tax-refund", label: "退稅試算", desc: "預繳稅額退多少" },
                { href: "/preschool-deduction", label: "幼兒學前扣除", desc: "5歲以下子女扣除" },
                { href: "/basic-living-deduction", label: "基本生活費差額", desc: "免稅天花板計算" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "114年度必看清單" },
                { href: "/income-tax-brackets", label: "所得稅級距", desc: "114年度稅率表" },
                { href: "/tax-filing-guide", label: "報稅完整攻略", desc: "step by step指南" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                >
                  <p className="text-xs font-semibold text-gray-800">{tool.label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            本頁數據依據財政部114年度綜合所得稅申報規定。個人情況不同，建議申報前以報稅軟體或會計師確認。
          </p>
        </main>
      </div>
    </>
  );
}
