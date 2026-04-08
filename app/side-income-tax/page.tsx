import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026副業所得申報攻略｜兼職接案外送員報稅指南 - 台灣財務試算",
  description:
    "上班族有副業怎麼報稅？外送員、接案族、網拍賣家、Airbnb房東完整申報攻略。114年度各類副業所得費率速查，附三種族群試算範例。副業多賺30萬，實際多繳多少稅？",
  keywords: [
    "副業報稅",
    "兼職報稅",
    "斜槓報稅",
    "外送員報稅",
    "接案報稅",
    "副業所得申報",
    "兼職收入申報",
    "副業稅",
    "執行業務所得費率",
    "副業怎麼報稅",
    "斜槓所得",
    "兼差報稅",
    "副業收入課稅",
    "114年副業申報",
  ],
  openGraph: {
    title: "2026副業所得申報攻略｜兼職接案外送員報稅指南",
    description:
      "副業多賺30萬，實際只多繳8,250元稅？對的，因為費用率。外送員、接案設計師、房東一次搞懂。114年度速查表 + 三種試算範例。",
    url: "https://www.twtaxcalc.com/side-income-tax",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
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
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報", active: true },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
];

const FAQS = [
  {
    q: "上班族有副業，收入要怎麼申報？",
    a: "副業所得依「來源類型」申報：若副業是接案/設計/顧問等「執行業務」，用執行業務所得申報，可扣費用率（依業別30%~70%）；若是打工兼差領薪水，用薪資所得申報（薪資特別扣除額每人上限20.7萬，正職+兼職合計只能扣一次）；若是出租房屋，用租賃所得申報（法定必要費用43%）。所有所得最後合併計算綜合所得稅。",
  },
  {
    q: "副業收入有扣繳憑單一定要申報嗎？",
    a: "是的，有扣繳憑單的收入一定要申報——因為政府已知道你有這筆所得。沒有扣繳憑單的副業收入（如現金交易、平台無扣繳）理論上也應申報。若故意漏報被查到，補稅外還要加罰0.2~2倍漏稅額。實務上，超過2萬元的單次執行業務所得通常會被扣10%預扣稅款，申報後視實際稅率多退少補。",
  },
  {
    q: "外送員收入算薪資還是執行業務所得？",
    a: "依平台不同而異。多數主流外送平台（UberEats、Foodpanda）將外送員以「兼職薪資」方式扣繳，所以算薪資所得——但薪資特別扣除額上限20.7萬，若正職薪資已超過20.7萬，外送薪資就沒有額外扣除空間。部分平台可能按執行業務所得（費用率更高、更省稅）扣繳，申報前確認扣繳憑單上的所得類別代碼（薪資=50、執行業務=9A~9U）。",
  },
  {
    q: "執行業務所得的費用率怎麼查？",
    a: "財政部每年公告「執行業務者費用標準」，常見業別費用率：撰稿人/作家 30%、廣告設計 45%、程式設計/軟體 30%、顧問/講師 30%、醫師牙醫 62%、律師/會計師 30%、藝術演出 45%、室內設計 45%。費用率代表政府認定你收入有這個比例是成本，免稅。例：接案設計收入100萬，費用率45%，執行業務所得只有55萬。也可選擇「核實認定」，自己舉證實際費用，適合費用率高於法定標準的情況。",
  },
  {
    q: "副業要繳二代健保補充保費嗎？",
    a: "要！副業收入若以「執行業務所得」申報，且單筆超過2萬元，支付方須扣繳2.11%補充保費。若以薪資所得申報（固定僱傭關係），則循正常健保費扣繳，不另計補充保費。出租收入（租金）全年超過4萬元須繳補充保費（出租方自行計算申報），稅率2.11%。",
  },
];

export default function SideIncomeTaxPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026副業所得申報攻略｜兼職接案外送員報稅指南",
        description:
          "上班族有副業怎麼報稅？外送員、接案族、網拍賣家、Airbnb房東完整申報攻略。114年度各類副業所得費率速查，附三種族群試算範例。",
        url: "https://www.twtaxcalc.com/side-income-tax",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-orange-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
              114年度副業申報攻略
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              有副業怎麼報稅？
              <br />
              斜槓所得完整申報指南
            </h1>
            <p className="mt-3 text-base text-gray-500">
              接案、外送、出租、網拍——每種副業稅法算法不同。
              <span className="font-semibold text-orange-600">搞懂費用率，副業30萬只多繳8,250元。</span>
            </p>
          </div>

          {/* Quick type check */}
          <div className="mb-8 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              30秒判斷：你的副業算哪種所得？
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">9A</span>
                <div>
                  <p className="font-semibold text-blue-900">執行業務所得</p>
                  <p className="mt-0.5 text-sm text-gray-600">接案設計、撰稿、程式、顧問、講師、自由工作者</p>
                  <p className="mt-1 text-xs font-medium text-blue-700">費用率30%~62%，實際課稅所得大幅降低</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">50</span>
                <div>
                  <p className="font-semibold text-emerald-900">薪資所得</p>
                  <p className="mt-0.5 text-sm text-gray-600">兼差打工、外送（多數平台）、有簽勞動契約的兼職</p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">薪資特別扣除額上限20.7萬（正職+副業合計）</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-purple-50 p-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-bold text-white">租</span>
                <div>
                  <p className="font-semibold text-purple-900">租賃所得</p>
                  <p className="mt-0.5 text-sm text-gray-600">出租房屋、車位、Airbnb短租</p>
                  <p className="mt-1 text-xs font-medium text-purple-700">法定必要費用43%，或核實認定實際成本</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">其</span>
                <div>
                  <p className="font-semibold text-amber-900">其他所得</p>
                  <p className="mt-0.5 text-sm text-gray-600">網拍偶發性收入、版稅、偶爾的演講酬勞</p>
                  <p className="mt-1 text-xs font-medium text-amber-700">可扣必要費用及成本，剩餘列入其他所得</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              * 扣繳憑單上的所得類別代碼（9A、50等）就是你的所得類型。找不到憑單？問支付你報酬的公司要。
            </p>
          </div>

          {/* Fee rates table */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              114年度執行業務費用率速查表
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              費用率 = 政府認定你有這比例的收入是成本，不課稅。課稅所得 = 收入 × (1 - 費用率)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-semibold text-gray-700">業別</th>
                    <th className="py-2 text-right font-semibold text-gray-700">費用率</th>
                    <th className="py-2 text-right font-semibold text-orange-700">收入100萬→課稅</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "廣告設計、美術設計", rate: "45%", taxable: "55萬" },
                    { type: "室內設計、建築師", rate: "45%", taxable: "55萬" },
                    { type: "程式設計、資訊服務", rate: "30%", taxable: "70萬" },
                    { type: "撰稿、作家、翻譯", rate: "30%", taxable: "70萬" },
                    { type: "顧問、講師、培訓", rate: "30%", taxable: "70萬" },
                    { type: "攝影、影片製作", rate: "45%", taxable: "55萬" },
                    { type: "表演藝術、演出", rate: "45%", taxable: "55萬" },
                    { type: "律師、會計師", rate: "30%", taxable: "70萬" },
                    { type: "醫師、牙醫師", rate: "62%", taxable: "38萬" },
                    { type: "代書（地政士）", rate: "30%", taxable: "70萬" },
                  ].map((row) => (
                    <tr key={row.type} className="hover:bg-gray-50">
                      <td className="py-2.5 text-gray-700">{row.type}</td>
                      <td className="py-2.5 text-right font-medium text-blue-700">{row.rate}</td>
                      <td className="py-2.5 text-right font-medium text-orange-600">{row.taxable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              完整費用率表見財政部「執行業務者費用標準」。費用率每年可能微調，以當年度公告為準。
            </p>
          </div>

          {/* Case studies */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              三種族群試算（114年度，單身單口）
            </h2>
            <p className="mb-5 text-sm text-gray-500">
              免稅額9.2萬，標準扣除額13.1萬，薪資特別扣除額上限20.7萬
            </p>

            {/* Case 1 */}
            <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="mb-3 text-sm font-bold text-orange-800">
                案例一：上班族（薪資50萬）＋ 接案設計師（收入30萬）
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">薪資所得（50萬 − 薪資特別扣除20.7萬）</span>
                  <span className="font-medium">293,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">執行業務所得（30萬 × 55%，費用率45%）</span>
                  <span className="font-medium">165,000</span>
                </div>
                <div className="flex justify-between border-t border-orange-200 pt-1.5">
                  <span className="text-gray-600">合計所得 − 免稅額9.2萬 − 標準扣除13.1萬</span>
                  <span className="font-medium">235,000</span>
                </div>
                <div className="flex justify-between rounded-lg bg-orange-100 px-3 py-2">
                  <span className="font-semibold text-orange-900">應繳稅額（×5%）</span>
                  <span className="text-lg font-bold text-orange-700">11,750 元</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-100 px-3 py-2">
                  <span className="text-gray-600">純薪資50萬時稅額</span>
                  <span className="font-medium text-gray-700">3,500 元</span>
                </div>
                <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center">
                  <span className="text-sm font-bold text-emerald-800">副業多賺165,000元淨所得，只多繳 8,250 元稅</span>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="mb-3 text-sm font-bold text-blue-800">
                案例二：正職薪資40萬＋外送兼差薪資20萬（薪資合計60萬）
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">薪資合計60萬 − 薪資特別扣除20.7萬（上限）</span>
                  <span className="font-medium">393,000</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-1.5">
                  <span className="text-gray-600">− 免稅額9.2萬 − 標準扣除13.1萬</span>
                  <span className="font-medium">170,000</span>
                </div>
                <div className="flex justify-between rounded-lg bg-blue-100 px-3 py-2">
                  <span className="font-semibold text-blue-900">應繳稅額（×5%）</span>
                  <span className="text-lg font-bold text-blue-700">8,500 元</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-100 px-3 py-2">
                  <span className="text-gray-600">純薪資40萬時：所得淨額<0，免繳稅</span>
                  <span className="font-medium text-gray-700">0 元</span>
                </div>
                <div className="rounded-lg bg-amber-50 px-3 py-2 text-center">
                  <span className="text-sm font-bold text-amber-800">注意：外送薪資不能再扣額外薪資特別扣除額，稅後影響比想像大</span>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
              <p className="mb-3 text-sm font-bold text-purple-800">
                案例三：上班族薪資50萬＋出租月收15,000元（年租18萬）
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">薪資所得（50萬 − 20.7萬）</span>
                  <span className="font-medium">293,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">租賃所得（18萬 − 必要費用43%）= 18萬×57%</span>
                  <span className="font-medium">102,600</span>
                </div>
                <div className="flex justify-between border-t border-purple-200 pt-1.5">
                  <span className="text-gray-600">合計 − 免稅額9.2萬 − 標準扣除13.1萬</span>
                  <span className="font-medium">172,600</span>
                </div>
                <div className="flex justify-between rounded-lg bg-purple-100 px-3 py-2">
                  <span className="font-semibold text-purple-900">應繳稅額（×5%）</span>
                  <span className="text-lg font-bold text-purple-700">8,630 元</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-100 px-3 py-2">
                  <span className="text-gray-600">純薪資時稅額</span>
                  <span className="font-medium text-gray-700">3,500 元</span>
                </div>
                <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center">
                  <span className="text-sm font-bold text-emerald-800">出租年收18萬，只多繳 5,130 元稅（實際稅率2.85%）</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* Common pitfalls */}
          <div className="mb-8 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              副業報稅四大地雷
            </h2>
            <div className="space-y-4">
              {[
                {
                  no: "01",
                  title: "扣繳憑單沒收到就以為不用報",
                  body: "平台/客戶不一定會主動寄給你。5月前主動登入財政部「個人所得查詢」確認，有收入就要申報。",
                  color: "red",
                },
                {
                  no: "02",
                  title: "把執行業務收入申報成其他所得",
                  body: "執行業務有費用率（30~62%），可扣掉大量成本。錯報成「其他所得」少了費用扣除，多繳冤枉稅。",
                  color: "orange",
                },
                {
                  no: "03",
                  title: "以為薪資特別扣除額可以疊加",
                  body: "薪資特別扣除額每人只能扣一次，上限20.7萬。正職已超過20.7萬，外送/兼差薪資完全沒有額外扣除。",
                  color: "amber",
                },
                {
                  no: "04",
                  title: "忘記繳二代健保補充保費",
                  body: "單筆執行業務所得超過2萬元，支付方會幫你扣2.11%補充保費。年租超過4萬的租金收入也需自行申報繳納。",
                  color: "yellow",
                },
              ].map((item) => (
                <div key={item.no} className={`flex gap-4 rounded-xl bg-${item.color}-50 p-4`}>
                  <span className={`shrink-0 text-2xl font-black text-${item.color}-200`}>{item.no}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">相關工具</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "綜合所得稅試算" },
                { href: "/freelancer-tax-guide", label: "全職接案報稅指南" },
                { href: "/expense-deduction-compare", label: "費用核實vs標準比較" },
                { href: "/supplement-premium", label: "二代健保試算" },
                { href: "/salary-vs-freelancer", label: "薪資vs接案比較" },
                { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
                { href: "/deduction-compare", label: "列舉vs標準扣除" },
                { href: "/tax-checklist-2026", label: "報稅懶人包" },
                { href: "/income-tax-brackets", label: "稅率級距速查" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 p-3 text-center text-sm font-medium text-gray-700 transition hover:border-orange-400 hover:text-orange-600"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-5">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <p className="font-semibold text-gray-800">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 2 */}
          <TaxAffiliateCTA />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            資料依據財政部114年度綜合所得稅相關規定及執行業務者費用標準公告。本頁僅供試算參考，申報前建議確認當年度最新公告。
          </p>
        </main>
      </div>
    </>
  );
}
