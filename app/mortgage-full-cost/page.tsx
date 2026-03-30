import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { MortgageAffiliateCTA } from "@/components/affiliate-cta";

// ── 資料來源：財政部房屋稅條例、土地稅法、各縣市2026年公告地價 ──────────────

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用", active: true },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
];

// ── 一次性費用項目 ────────────────────────────────────────────────────────────
const ONE_TIME_COSTS = [
  {
    category: "貸款相關",
    items: [
      {
        name: "貸款設定費（抵押權設定規費）",
        formula: "貸款金額 × 0.1%",
        example800: "8,000",
        note: "向地政機關辦理抵押權登記，法定費用",
      },
      {
        name: "代書費",
        formula: "約 10,000 ~ 20,000",
        example800: "15,000",
        note: "委託代書辦理過戶及貸款設定，各地行情不一",
      },
      {
        name: "土地所有權移轉登記規費",
        formula: "申報地價 × 持分 × 0.1%",
        example800: "約 3,000 ~ 10,000",
        note: "依公告地價計算，不是成交價",
      },
      {
        name: "銀行貸款手續費",
        formula: "通常免收或 2,000 ~ 5,000",
        example800: "0 ~ 5,000",
        note: "部分銀行收取，新青安專案多免收",
      },
    ],
  },
  {
    category: "保險費用",
    items: [
      {
        name: "火災保險（強制）",
        formula: "建物評定現值 × 費率（約 0.06%）",
        example800: "3,000 ~ 8,000",
        note: "銀行要求貸款期間持續投保，每年續保",
      },
      {
        name: "地震基本保險（強制）",
        formula: "固定保費",
        example800: "1,350",
        note: "法定住宅地震險，每年固定 1,350 元",
      },
      {
        name: "房貸壽險（選配）",
        formula: "依貸款金額與年期而定",
        example800: "15,000 ~ 40,000/年",
        note: "避免身故後家人承擔貸款，可選擇性購買",
      },
    ],
  },
];

// ── 每年持有費用 ─────────────────────────────────────────────────────────────
const ANNUAL_COSTS = [
  {
    name: "房屋稅（自住）",
    rate: "房屋評定現值 × 1.2%",
    example: "6,000 ~ 25,000",
    tip: "需向稅捐處申報「自住」，否則以2%~4.8%課稅。持有4戶以上稅率更高。",
  },
  {
    name: "地價稅（自用優惠）",
    rate: "公告地價 × 面積 × 0.2%",
    example: "3,000 ~ 15,000",
    tip: "須每年9月22日前申報自用住宅，否則以一般稅率1%課稅，差距很大！",
  },
  {
    name: "火災保險（年繳）",
    rate: "建物評定現值 × 0.06%",
    example: "3,000 ~ 8,000",
    tip: "銀行要求貸款期間每年維持投保，通常隨繳款通知單附繳",
  },
  {
    name: "地震基本保險",
    rate: "固定 1,350 元/年",
    example: "1,350",
    tip: "法定地震基本保險，全台統一費率，住宅必保",
  },
  {
    name: "社區管理費（若有）",
    rate: "依社區規定，約 50~150 元/坪/月",
    example: "24,000 ~ 72,000",
    tip: "30坪住宅以中段費率 100 元/坪計算約 3,000 元/月（36,000 元/年）",
  },
];

// ── 貸款金額情境試算 ─────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    label: "500萬貸款（30年 2.1%）",
    principal: 500,
    monthlyPayment: 18_701,
    totalInterest: 173_204,
    oneTimeCost: "約 22,000 ~ 35,000",
    annualHoldingCost: "約 20,000 ~ 55,000",
    totalFirstYear: "約 266,000 ~ 312,000",
  },
  {
    label: "800萬貸款（30年 2.1%）",
    principal: 800,
    monthlyPayment: 29_922,
    totalInterest: 277_126,
    oneTimeCost: "約 28,000 ~ 45,000",
    annualHoldingCost: "約 30,000 ~ 80,000",
    totalFirstYear: "約 417,000 ~ 484,000",
  },
  {
    label: "1,200萬貸款（30年 2.1%）",
    principal: 1200,
    monthlyPayment: 44_882,
    totalInterest: 415_689,
    oneTimeCost: "約 38,000 ~ 62,000",
    annualHoldingCost: "約 45,000 ~ 120,000",
    totalFirstYear: "約 621,000 ~ 722,000",
  },
];

// ── 提前還款損益分析 ─────────────────────────────────────────────────────────
const PREPAY_SCENARIOS = [
  {
    extraPayment: 10,
    shortYears: 2.5,
    savedInterest: "約 10 ~ 15 萬",
    note: "每月多還 10 萬，提前 2.5 年還清（以 800 萬/30 年/2.1% 為例）",
  },
  {
    extraPayment: 50,
    shortYears: 10,
    savedInterest: "約 80 ~ 100 萬",
    note: "每年一次性還 50 萬，可提前 10 年還清",
  },
  {
    extraPayment: 100,
    shortYears: 16,
    savedInterest: "約 160 ~ 200 萬",
    note: "每年一次性還 100 萬，可提前 16 年還清",
  },
];

// ── 縣市房屋稅/地價稅參考 ────────────────────────────────────────────────────
const TAX_BY_CITY = [
  { city: "台北市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "地價最高，地價稅絕對金額最大" },
  { city: "新北市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "板橋、新店地段等地價較高" },
  { city: "桃園市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "整體地價稅負擔較北市低" },
  { city: "台中市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "七期地段地價近年快速上漲" },
  { city: "台南市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "地價相對低，房屋稅負較輕" },
  { city: "高雄市", houseTax: "1.2%（自住）", landTax: "0.2%（自用）", note: "近年地價上漲，部分區域增幅明顯" },
];

const COMMON_MISTAKES = [
  {
    mistake: "沒有申報「自用住宅」地價稅優惠",
    impact: "地價稅從 0.2% 變 1%，差距 5 倍！以 300 萬公告地價計算，每年多繳 24,000 元。",
    fix: "每年 9 月 22 日前向地方稅捐處申報，線上或臨櫃均可辦理。",
  },
  {
    mistake: "忘記申報「自住」房屋稅",
    impact: "房屋稅從 1.2% 變 2%（台北可達 4.8%）。持有 4 戶以上適用累進稅率。",
    fix: "搬入後向稅捐處辦理自住申報，一旦申報即持續適用，搬離才需變更。",
  },
  {
    mistake: "提前還款觸發違約金",
    impact: "多數銀行規定貸款前 1~3 年提前還款，需付未還本金的 1~2% 作為手續費。",
    fix: "查清楚合約中的「提前清償條款」。通常寬限期結束、或超過 3 年後再提前還款，違約金為 0。",
  },
  {
    mistake: "忽略管理費是長期固定支出",
    impact: "30 坪新大樓管理費約 3,000~5,000 元/月 = 每年 36,000~60,000 元，30 年合計 108~180 萬。",
    fix: "買房前確認社區管理費標準，納入長期財務規劃。",
  },
];

export default function MortgageFullCostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                  l.active
                    ? "border-emerald-500 bg-emerald-50 font-semibold text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-6 space-y-8">
        {/* ── Hero ── */}
        <section>
          <h1 className="text-2xl font-bold text-gray-900">
            買房費用全攻略 2026
          </h1>
          <p className="mt-2 text-gray-600">
            月付金以外，你還要付多少？設定費、代書費、房屋稅、地價稅、保險、管理費一次算清。
            以 800 萬貸款為例，第一年隱藏費用可超過 <strong>45,000 元</strong>。
          </p>

          {/* 快速導航 */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { href: "#one-time", label: "一次性費用" },
              { href: "#annual", label: "每年持有費" },
              { href: "#scenarios", label: "情境試算" },
              { href: "#prepay", label: "提前還款" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── AdUnit 1 ── */}
        <AdUnit />

        {/* ── 一次性費用 ── */}
        <section id="one-time">
          <h2 className="text-xl font-bold text-gray-900 mb-1">一、買房一次性費用</h2>
          <p className="text-sm text-gray-500 mb-4">過戶、設定抵押權、辦貸款這些只付一次，但往往被忽略。</p>

          {ONE_TIME_COSTS.map((group) => (
            <div key={group.category} className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                {group.category}
              </h3>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs text-gray-500">
                      <th className="px-4 py-2.5 font-medium">費用項目</th>
                      <th className="px-4 py-2.5 font-medium">計算方式</th>
                      <th className="px-4 py-2.5 font-medium whitespace-nowrap">800萬參考</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <tr key={item.name}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{item.formula}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-700 whitespace-nowrap">
                          {item.example800}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>總結：</strong>800萬貸款的一次性費用合計約 <strong>28,000 ~ 45,000 元</strong>（不含房貸壽險）。
            若加上房貸壽險首年保費，可能超過 8 萬元。
          </div>
        </section>

        {/* ── 每年持有費用 ── */}
        <section id="annual">
          <h2 className="text-xl font-bold text-gray-900 mb-1">二、每年持有費用</h2>
          <p className="text-sm text-gray-500 mb-4">這些費用每年都要繳，30年下來是一筆不小的數字。</p>

          <div className="space-y-3">
            {ANNUAL_COSTS.map((cost) => (
              <div
                key={cost.name}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{cost.name}</div>
                    <div className="mt-1 text-sm text-gray-500">{cost.rate}</div>
                    <div className="mt-1.5 text-xs text-blue-700 bg-blue-50 rounded-lg px-2 py-1 inline-block">
                      ⚠ {cost.tip}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-400">參考金額/年</div>
                    <div className="font-bold text-emerald-700">{cost.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 各縣市稅率比較 */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">各縣市房屋稅・地價稅稅率（114年度）</h3>
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500">
                    <th className="px-4 py-2.5 font-medium">縣市</th>
                    <th className="px-4 py-2.5 font-medium">房屋稅（自住）</th>
                    <th className="px-4 py-2.5 font-medium">地價稅（自用）</th>
                    <th className="px-4 py-2.5 font-medium hidden sm:table-cell">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TAX_BY_CITY.map((row) => (
                    <tr key={row.city}>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.city}</td>
                      <td className="px-4 py-3 text-gray-600">{row.houseTax}</td>
                      <td className="px-4 py-3 text-gray-600">{row.landTax}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              ※ 非自住（出租或空置）房屋稅台北市可達 3.6%（持有2戶以上），新北市最高 4.8%。申報自住優惠非常重要。
            </p>
          </div>
        </section>

        {/* ── AdUnit 2 ── */}
        <AdUnit />

        {/* ── 情境試算 ── */}
        <section id="scenarios">
          <h2 className="text-xl font-bold text-gray-900 mb-1">三、完整費用情境試算</h2>
          <p className="text-sm text-gray-500 mb-4">含月付金、一次性費用、每年持有成本，第一年實際支出大概是多少？</p>

          <div className="space-y-4">
            {SCENARIOS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-bold text-gray-900">{s.label}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <div className="text-xs text-gray-400">月付金</div>
                    <div className="text-lg font-bold text-gray-900">
                      {s.monthlyPayment.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">元/月</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <div className="text-xs text-gray-400">30年總利息</div>
                    <div className="text-lg font-bold text-amber-700">
                      {(s.totalInterest / 10000).toFixed(0)}萬
                    </div>
                    <div className="text-xs text-gray-400">元</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <div className="text-xs text-gray-400">一次性費用</div>
                    <div className="text-base font-bold text-orange-700">{s.oneTimeCost}</div>
                    <div className="text-xs text-gray-400">元</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                    <div className="text-xs text-emerald-600">第一年總支出</div>
                    <div className="text-base font-bold text-emerald-700">{s.totalFirstYear}</div>
                    <div className="text-xs text-emerald-500">（含月付×12+費用）</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  年度持有費用（房屋稅+地價稅+火險等）：{s.annualHoldingCost} 元/年
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <strong>計算器：</strong>想算你的確切月付金？→{" "}
            <Link href="/mortgage" className="underline font-semibold">
              房貸計算器（含新青安、寬限期）
            </Link>
          </div>
        </section>

        {/* ── 提前還款 ── */}
        <section id="prepay">
          <h2 className="text-xl font-bold text-gray-900 mb-1">四、提前還款划算嗎？</h2>
          <p className="text-sm text-gray-500 mb-4">
            提前還款的「保證報酬」= 你的房貸利率。若貸款利率 2.1%，等於每提前還 1 元，保證年賺 2.1% 利息。
          </p>

          {/* 決策矩陣 */}
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-gray-500">
                  <th className="px-4 py-2.5 font-medium">你的房貸利率</th>
                  <th className="px-4 py-2.5 font-medium">建議策略</th>
                  <th className="px-4 py-2.5 font-medium">理由</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-green-700">低於 2%</td>
                  <td className="px-4 py-3">優先投資，不急著還</td>
                  <td className="px-4 py-3 text-xs text-gray-500">美國公債、高息 ETF 殖利率通常高於 2%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-amber-700">2% ~ 3%</td>
                  <td className="px-4 py-3">視情況：有穩健投資機會就投資</td>
                  <td className="px-4 py-3 text-xs text-gray-500">提前還款 vs 投資的差距不大，看個人風險偏好</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-red-700">高於 3%</td>
                  <td className="px-4 py-3">優先考慮提前還款</td>
                  <td className="px-4 py-3 text-xs text-gray-500">3% 保證報酬勝過多數無風險投資，且省利息有感</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 提前還款效益 */}
          <h3 className="text-base font-semibold text-gray-800 mb-3">提前還款效益（800萬/30年/2.1%）</h3>
          <div className="space-y-3">
            {PREPAY_SCENARIOS.map((s) => (
              <div
                key={s.extraPayment}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-gray-800">{s.note}</div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-xs text-gray-400">省利息</div>
                  <div className="font-bold text-emerald-700">{s.savedInterest}</div>
                  <div className="text-xs text-gray-400">提前 {s.shortYears} 年</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>注意：</strong>大多數房貸合約在貸款前 1~3 年提前清償，需支付未還本金 1~2% 的違約金。
            確認合約再行動，通常過了違約期後提前還款才划算。
          </div>
        </section>

        {/* ── 常見錯誤 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">五、房貸族常犯的 4 個貴桑桑錯誤</h2>
          <div className="space-y-4">
            {COMMON_MISTAKES.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">❌ {item.mistake}</div>
                    <div className="mt-1 text-sm text-red-600">{item.impact}</div>
                    <div className="mt-1.5 text-sm text-green-700">
                      <strong>✅ 解法：</strong>{item.fix}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Money101 CTA ── */}
        <MortgageAffiliateCTA />

        {/* ── 相關工具 ── */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">相關計算工具</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/mortgage", label: "房貸月付金計算器", desc: "等額本息/本金、新青安" },
              { href: "/tax-calculator", label: "報稅計算器", desc: "114年度綜合所得稅試算" },
              { href: "/salary-calculator", label: "月薪試算", desc: "含勞健保、所得稅" },
              { href: "/tax-filing-guide", label: "報稅攻略", desc: "免稅額、扣除額速查" },
              { href: "/pension-calculator", label: "勞退試算", desc: "退休金累積試算" },
              { href: "/salary-vs-freelancer", label: "薪資vs接案比較", desc: "換工作前先算清楚" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-gray-200 bg-white p-3.5 hover:border-emerald-400 hover:shadow-sm transition"
              >
                <div className="font-semibold text-gray-800 text-sm">{tool.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tool.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pb-6 text-center text-xs text-gray-400">
          <p>資料來源：財政部房屋稅條例、土地稅法（114年度）</p>
          <p className="mt-1">本頁為估算參考，實際費用以各縣市稅捐處、銀行公告為準</p>
        </footer>
      </div>
    </div>
  );
}
