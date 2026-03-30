import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅", active: true },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
];

// ── 115年度（2026年5月申報）扶養免稅額 ──────────────────────────────
// 依財政部 114 年度公告
// ─────────────────────────────────────────────────────────────────────
const GENERAL_EXEMPTION = 97000;   // 一般受扶養親屬
const SENIOR_EXEMPTION = 145500;   // 直系尊親屬70歲以上（1.5倍）

// 五級累進稅率（速算公式）
const TAX_BRACKETS = [
  { label: "5%（所得淨額 ≤ 59萬）", rate: 0.05 },
  { label: "12%（所得淨額 59~133萬）", rate: 0.12 },
  { label: "20%（所得淨額 133~266萬）", rate: 0.20 },
  { label: "30%（所得淨額 266~498萬）", rate: 0.30 },
  { label: "40%（所得淨額 498萬以上）", rate: 0.40 },
];

// 誰可以申報受扶養
const QUALIFIED_DEPENDENTS = [
  {
    category: "子女",
    icon: "👶",
    conditions: [
      "未滿 20 歲",
      "已滿 20 歲仍在校就讀（大學、研究所等）",
      "已滿 20 歲因身心障礙無法謀生",
      "已滿 20 歲因在役服役中",
    ],
    note: "無收入限制，子女有打工收入仍可申報扶養。",
  },
  {
    category: "父母（直系尊親屬）",
    icon: "👴",
    conditions: [
      "無條件限制，父母有工作或退休金均可",
      "未滿 70 歲：免稅額 97,000 元/人",
      "滿 70 歲（含）：免稅額 145,500 元/人",
    ],
    note: "父母若自己申報，可能各享有完整的免稅額和扣除額；建議兩邊試算比較。",
  },
  {
    category: "祖父母",
    icon: "🧓",
    conditions: [
      "無條件限制",
      "未滿 70 歲：免稅額 97,000 元/人",
      "滿 70 歲（含）：免稅額 145,500 元/人",
    ],
    note: "與父母同為直系尊親屬，適用同樣規定。",
  },
  {
    category: "兄弟姊妹",
    icon: "👫",
    conditions: [
      "未滿 20 歲",
      "已滿 20 歲仍在校就讀",
      "已滿 20 歲因身心障礙無法謀生",
    ],
    note: "成年且有工作的兄弟姊妹通常不符合資格。",
  },
  {
    category: "其他親屬或家屬",
    icon: "🏠",
    conditions: [
      "需與納稅人同居共財",
      "確實受納稅人扶養",
      "無謀生能力（年老、身障等）",
    ],
    note: "條件最嚴格，需確實符合所有條件。",
  },
];

// 各稅率節稅試算（一般親屬 vs 70歲以上）
function calcSaving(exemption: number, rate: number, count: number) {
  return Math.round(exemption * rate * count);
}

// 薪資對應大約稅率（供說明用，單身標準扣除）
// 所得淨額 = 年薪 - 97000 - 131000 - 218000
const SALARY_BRACKET_EXAMPLES = [
  { salary: 500000, netIncome: Math.max(0, 500000 - 97000 - 131000 - 218000), bracketIdx: 0 },
  { salary: 800000, netIncome: Math.max(0, 800000 - 97000 - 131000 - 218000), bracketIdx: 0 },
  { salary: 1200000, netIncome: Math.max(0, 1200000 - 97000 - 131000 - 218000), bracketIdx: 1 },
  { salary: 2000000, netIncome: Math.max(0, 2000000 - 97000 - 131000 - 218000), bracketIdx: 2 },
  { salary: 3500000, netIncome: Math.max(0, 3500000 - 97000 - 131000 - 218000), bracketIdx: 3 },
];

function formatNTD(n: number) {
  return n.toLocaleString("zh-TW");
}

export default function DependentDeductionPage() {
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
                    ? "border-purple-400 bg-purple-50 font-semibold text-purple-700"
                    : "border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* ── Hero ── */}
        <section>
          <p className="text-sm font-medium text-purple-600">115年度 · 2026年5月報稅</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-snug">
            扶養親屬可以省多少稅？
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            每申報一位受扶養親屬，你的所得淨額就減少 <strong>97,000 元</strong>（70歲以上減少 <strong>145,500 元</strong>）。
            依你適用的稅率，實際省稅金額從 4,850 到 58,200 元不等。
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-xs text-gray-500">一般免稅額</p>
              <p className="text-xl font-bold text-purple-700">97,000</p>
              <p className="text-xs text-gray-400">元/人</p>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-4 text-center">
              <p className="text-xs text-gray-500">70歲以上免稅額</p>
              <p className="text-xl font-bold text-indigo-700">145,500</p>
              <p className="text-xs text-gray-400">元/人</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-xs text-gray-500">最多省稅（40%稅率）</p>
              <p className="text-xl font-bold text-blue-700">58,200</p>
              <p className="text-xs text-gray-400">元/人（70歲父母）</p>
            </div>
            <div className="rounded-2xl bg-teal-50 p-4 text-center">
              <p className="text-xs text-gray-500">最少省稅（5%稅率）</p>
              <p className="text-xl font-bold text-teal-700">4,850</p>
              <p className="text-xs text-gray-400">元/人</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* ── 節稅金額試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">各稅率節稅金額試算</h2>
          <p className="text-sm text-gray-500 mb-4">依你適用的邊際稅率，每位受扶養親屬省稅金額如下</p>

          {/* 一般親屬表 */}
          <h3 className="text-base font-semibold text-gray-700 mb-2">一般受扶養親屬（免稅額 97,000 元/人）</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white mb-5">
            <table className="w-full text-sm">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">你的稅率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養1人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養2人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養3人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養4人省稅</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TAX_BRACKETS.map((b) => (
                  <tr key={b.rate} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{b.label}</td>
                    {[1, 2, 3, 4].map((n) => (
                      <td key={n} className="px-4 py-3 text-right text-gray-700">
                        <span className="font-semibold text-purple-700">
                          {formatNTD(calcSaving(GENERAL_EXEMPTION, b.rate, n))}
                        </span>{" "}
                        元
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 70歲以上表 */}
          <h3 className="text-base font-semibold text-gray-700 mb-2">70歲以上直系尊親屬（免稅額 145,500 元/人）</h3>
          <div className="overflow-x-auto rounded-2xl border border-indigo-100 bg-white mb-2">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">你的稅率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養1人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養2人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養3人省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養4人省稅</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TAX_BRACKETS.map((b) => (
                  <tr key={b.rate} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{b.label}</td>
                    {[1, 2, 3, 4].map((n) => (
                      <td key={n} className="px-4 py-3 text-right text-gray-700">
                        <span className="font-semibold text-indigo-700">
                          {formatNTD(calcSaving(SENIOR_EXEMPTION, b.rate, n))}
                        </span>{" "}
                        元
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            ※ 節稅金額 = 免稅額 × 你的邊際稅率。此為減少的應納稅額（非退稅），最終稅額以報稅計算器試算為準。
          </p>
        </section>

        {/* ── 依年薪實例 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">依年薪試算：扶養父母可省多少？</h2>
          <p className="text-sm text-gray-500 mb-4">
            以單身、標準扣除、扶養一位未滿70歲父母為例（免稅額 97,000 元）
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">年薪</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">所得淨額（大約）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">適用稅率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">扶養1位父母省稅</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">70歲以上省稅</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SALARY_BRACKET_EXAMPLES.map(({ salary, netIncome, bracketIdx }) => (
                  <tr key={salary} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {formatNTD(salary)} 元
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {formatNTD(netIncome)} 元
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-700">
                      {(TAX_BRACKETS[bracketIdx].rate * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-purple-700">
                        {formatNTD(calcSaving(GENERAL_EXEMPTION, TAX_BRACKETS[bracketIdx].rate, 1))}
                      </span>{" "}
                      元
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-indigo-700">
                        {formatNTD(calcSaving(SENIOR_EXEMPTION, TAX_BRACKETS[bracketIdx].rate, 1))}
                      </span>{" "}
                      元
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 年薪500萬（30%稅率）扶養兩位70歲以上父母可省 87,300 元，效益相當顯著。
          </p>
        </section>

        {/* ── 誰符合資格 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">哪些人可以被申報為受扶養親屬？</h2>
          <p className="text-sm text-gray-500 mb-4">
            115年度（114年所得）符合以下條件即可申報
          </p>
          <div className="space-y-4">
            {QUALIFIED_DEPENDENTS.map((d) => (
              <div key={d.category} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{d.icon}</span>
                  <h3 className="font-bold text-gray-900">{d.category}</h3>
                </div>
                <ul className="space-y-1 mb-3">
                  {d.conditions.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-purple-500">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 italic">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        <AdUnit />

        {/* ── 扶養 vs 不扶養 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">父母要被你扶養，還是自己申報？</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4 text-sm text-gray-700">
            <p>
              這個問題沒有統一答案，取決於父母的所得狀況。以下是判斷邏輯：
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="font-semibold text-green-800 mb-2">✅ 建議被你扶養的情境</p>
                <ul className="space-y-1 text-green-700">
                  <li>• 父母沒有收入或收入極少</li>
                  <li>• 父母收入低於免稅額 + 扣除額（無稅負）</li>
                  <li>• 你的稅率比父母高（你省更多）</li>
                  <li>• 父母有大量醫療費可列舉扣除（你幫他們申報）</li>
                </ul>
              </div>
              <div className="rounded-xl bg-orange-50 p-4">
                <p className="font-semibold text-orange-800 mb-2">⚠️ 父母自己申報可能更划算</p>
                <ul className="space-y-1 text-orange-700">
                  <li>• 父母有薪資、退休金等所得</li>
                  <li>• 父母可自享薪資特別扣除額 218,000</li>
                  <li>• 父母所得被合併後推升你的稅率</li>
                  <li>• 雙方各自可用完整免稅額+扣除額</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              最準確的做法：用報稅計算器分別試算「合併申報」與「分開申報」，選稅額較低的方案。
            </p>
          </div>
        </section>

        {/* ── CTA to tax calculator ── */}
        <section className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white">
          <h2 className="text-xl font-bold mb-2">試算含扶養的實際稅額</h2>
          <p className="text-purple-100 text-sm mb-4">
            輸入年收入和受扶養人數，30秒得出精確應繳稅額、有效稅率，以及是否適合使用綜合所得稅試算。
          </p>
          <Link
            href="/tax-calculator"
            className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 shadow hover:bg-purple-50 transition"
          >
            開啟報稅計算器 →
          </Link>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "扶養親屬的免稅額和扣除額有什麼不同？",
                a: "免稅額是針對「人」的基礎扣除，每位受扶養親屬 97,000 元（70歲以上 145,500 元）。扣除額則是針對「支出」或「特定身分」的扣除，例如薪資特別扣除額、身心障礙特別扣除額等。兩者都能降低所得淨額，但計算邏輯不同。",
              },
              {
                q: "兩個兄弟都可以申報父母為扶養嗎？",
                a: "不行，同一位父母只能被一個子女申報扶養。通常建議讓稅率較高的子女申報，省稅金額較大。若父母分別由不同子女申報（例如父親被A申報，母親被B申報），是可以的。",
              },
              {
                q: "子女出生當年就可以申報嗎？",
                a: "可以。只要是當年度（114年）出生，即可在115年5月申報時列為受扶養親屬，享有完整一年的免稅額 97,000 元。另外，幼兒（5歲以下）還有幼兒學前特別扣除額 150,000 元可申報。",
              },
              {
                q: "受扶養親屬有所得，需要他們自己申報嗎？",
                a: "受扶養親屬若有所得（如租金、兼職收入），該所得必須併入你的所得申報，合計計算稅額。若親屬所得很高，合併後可能推高你的稅率，此時分開申報可能反而較省。建議兩邊試算比較。",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="cursor-pointer p-5 font-semibold text-gray-800 flex items-center justify-between">
                  <span>{q}</span>
                  <span className="ml-2 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Affiliate CTA ── */}
        <TaxAffiliateCTA />

        {/* ── 所得稅級距連結 ── */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-bold text-gray-900 mb-3">相關試算工具</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/tax-calculator", label: "綜合所得稅計算器", desc: "含扶養人數精算" },
              { href: "/income-tax-brackets", label: "所得稅級距完整表", desc: "五級累進稅率說明" },
              { href: "/basic-living-deduction", label: "基本生活費免稅天花板", desc: "免稅額上限試算" },
              { href: "/salary-calculator", label: "月薪到手試算", desc: "含勞健保扣款" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-gray-400 pb-4">
          資料依據：財政部 114 年度綜合所得稅相關規定 ·{" "}
          <a
            href="https://www.mof.gov.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            財政部官網
          </a>
          · 最終稅額以個人實際情況為準
        </p>
      </main>
    </div>
  );
}
