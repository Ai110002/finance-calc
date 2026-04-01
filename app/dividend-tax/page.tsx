import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114 年度股利所得申報（2025年所得，2026年5月申報）────────────────────────
// 所得稅法第15條之1：股利所得有兩種申報方式
// 方式一：合併計稅 — 股利計入綜合所得，享股利×8.5%可抵減稅額，每戶上限80,000元
// 方式二：分開課稅 — 股利×28%，不計入綜合所得
// 財政部114年度累進稅率表
// ────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
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
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報", active: true },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

// ── 114年度稅率表（累進差額法）
// 所得淨額 × 稅率 − 累進差額 = 應納稅額
const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 911_700 },
];

function calcTax(netIncome: number): number {
  const bracket = TAX_BRACKETS.find((b) => netIncome <= b.max)!;
  return Math.max(0, Math.round(netIncome * bracket.rate - bracket.diff));
}

function bracketLabel(netIncome: number): string {
  const bracket = TAX_BRACKETS.find((b) => netIncome <= b.max)!;
  return `${(bracket.rate * 100).toFixed(0)}%`;
}

// ── 情境試算：薪資所得淨額（不含股利）× 股利金額
// 薪資所得淨額 = 薪資 − 薪資特別扣除(218,000) − 標準扣除額(131,000) − 免稅額(97,000)
// 即 薪資所得淨額 ≈ 薪資 − 446,000（單身、無扶養）
const SCENARIOS: { salaryNet: number; label: string; dividends: number[] }[] = [
  {
    salaryNet: 200_000,
    label: "所得淨額 20 萬（約年薪 65 萬）",
    dividends: [50_000, 100_000, 200_000, 300_000, 500_000],
  },
  {
    salaryNet: 500_000,
    label: "所得淨額 50 萬（約年薪 95 萬）",
    dividends: [50_000, 100_000, 200_000, 300_000, 500_000],
  },
  {
    salaryNet: 900_000,
    label: "所得淨額 90 萬（約年薪 135 萬）",
    dividends: [100_000, 200_000, 300_000, 500_000, 1_000_000],
  },
  {
    salaryNet: 1_500_000,
    label: "所得淨額 150 萬（約年薪 195 萬）",
    dividends: [100_000, 200_000, 500_000, 1_000_000, 2_000_000],
  },
  {
    salaryNet: 3_000_000,
    label: "所得淨額 300 萬（約年薪 345 萬）",
    dividends: [200_000, 500_000, 1_000_000, 2_000_000, 3_000_000],
  },
  {
    salaryNet: 5_500_000,
    label: "所得淨額 550 萬（約年薪 600 萬）",
    dividends: [500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000],
  },
];

// ── 計算合併計稅 vs 分開計稅的股利稅負差異
function calcDividendTax(salaryNet: number, dividend: number) {
  // 合併計稅
  const combined = calcTax(salaryNet + dividend);
  const salaryOnly = calcTax(salaryNet);
  const dividendTaxRaw = combined - salaryOnly;
  const creditRaw = Math.min(dividend * 0.085, 80_000);
  // 可抵減稅額不得超過應納稅額（避免負稅，但差額可退稅）
  const credit = Math.min(creditRaw, combined);
  const combinedDividendTax = Math.max(0, dividendTaxRaw - creditRaw);
  // 注意：若抵減後為負，差額可退稅（但退稅上限是整戶稅額）
  const combinedNet = combinedDividendTax;

  // 分開課稅
  const separateTax = Math.round(dividend * 0.28);

  const saving = separateTax - combinedDividendTax;
  const better: "合併" | "分開" | "相近" =
    saving > 500 ? "合併" : saving < -500 ? "分開" : "相近";

  return { combinedDividendTax, separateTax, saving, better, credit: Math.round(creditRaw) };
}

function fmt(n: number) {
  return n.toLocaleString("zh-TW");
}

export default function DividendTaxPage() {
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
                    ? "border-teal-500 bg-teal-50 font-semibold text-teal-700"
                    : "border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600"
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
          <p className="text-sm font-medium text-teal-600">114年度 · 2026年5月申報 · 兩種方式比較</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-snug">
            股利所得申報：合併計稅 vs 分開課稅28%
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            領到台股股利、ETF配息、基金配息，申報綜合所得稅時有兩種方式可選。
            <strong>大部分人選合併計稅更省稅</strong>——但到底省多少？哪種情況才選分開28%？
            這篇把計算邏輯和各情境試算一次說清楚。
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-center">
              <p className="text-xs text-gray-500">合併計稅抵減率</p>
              <p className="text-xl font-bold text-teal-700">8.5%</p>
              <p className="text-xs text-gray-400">股利金額 × 8.5%</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-xs text-gray-500">每戶抵減上限</p>
              <p className="text-xl font-bold text-blue-700">80,000</p>
              <p className="text-xs text-gray-400">股利約 94 萬觸及</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-xs text-gray-500">分開課稅固定稅率</p>
              <p className="text-xl font-bold text-orange-700">28%</p>
              <p className="text-xs text-gray-400">不計入所得</p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-xs text-gray-500">合併划算的族群</p>
              <p className="text-xl font-bold text-purple-700">5%～30%</p>
              <p className="text-xs text-gray-400">邊際稅率者</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* ── 兩種申報方式說明 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">兩種申報方式詳解</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* 方式一：合併計稅 */}
            <div className="rounded-2xl border-2 border-teal-300 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">方式一</span>
                <h3 className="font-bold text-gray-900">合併計稅</h3>
              </div>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-teal-600">①</span>
                  <span>股利全額計入「綜合所得總額」，與薪資、租金等所得合併計算</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-teal-600">②</span>
                  <span>依各項扣除後所得淨額，用<strong>累進稅率</strong>（5%～40%）計算應納稅額</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-teal-600">③</span>
                  <span>再減去<strong>可抵減稅額</strong>（股利 × 8.5%，每戶上限 80,000 元）</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-teal-600">④</span>
                  <span>若可抵減稅額 &gt; 應納稅額，差額<strong>可申請退稅</strong></span>
                </li>
              </ol>
              <div className="mt-3 rounded-xl bg-teal-50 p-3 text-sm">
                <p className="font-medium text-teal-800">例：股利 20 萬，所得淨額 50 萬</p>
                <p className="text-gray-600 mt-1">
                  含股利所得淨額 70 萬 × 12% − 41,300 = <strong>42,700 元</strong><br />
                  可抵減：20 萬 × 8.5% = 17,000 元<br />
                  股利最終稅負：42,700 − 41,300（薪資稅） − 17,000 = <strong>負數 → 退稅！</strong>
                </p>
              </div>
            </div>

            {/* 方式二：分開課稅 */}
            <div className="rounded-2xl border border-orange-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">方式二</span>
                <h3 className="font-bold text-gray-900">分開課稅（28%）</h3>
              </div>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-orange-600">①</span>
                  <span>股利<strong>不計入</strong>綜合所得，單獨分離課稅</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-orange-600">②</span>
                  <span>股利稅額 = 股利金額 × <strong>28%</strong>（固定，不受整體所得高低影響）</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-orange-600">③</span>
                  <span>其他所得（薪資、利息等）仍依累進稅率計算，兩者分開繳</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 font-bold text-orange-600">④</span>
                  <span>無8.5%抵減優惠，也<strong>不能退稅</strong></span>
                </li>
              </ol>
              <div className="mt-3 rounded-xl bg-orange-50 p-3 text-sm">
                <p className="font-medium text-orange-800">例：股利 20 萬</p>
                <p className="text-gray-600 mt-1">
                  股利稅額 = 200,000 × 28% = <strong>56,000 元</strong><br />
                  無論其他所得多少，股利稅固定 56,000<br />
                  <span className="text-orange-700 font-medium">→ 比合併計稅貴很多</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 快速決策表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">快速決策：你該選哪種方式？</h2>
          <p className="text-sm text-gray-500 mb-4">
            根據加計股利後的<strong>邊際稅率</strong>判斷（薪資＋股利的最高一級稅率）
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">邊際稅率（含股利）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">合併實際稅率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">分開稅率</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">建議方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { bracket: "5%", combined: "5% − 8.5% ＝ 負數（可退稅）", separate: "28%", rec: "合併大勝", color: "text-teal-700 font-bold" },
                  { bracket: "12%", combined: "12% − 8.5% ＝ 3.5%", separate: "28%", rec: "合併大勝", color: "text-teal-700 font-bold" },
                  { bracket: "20%", combined: "20% − 8.5% ＝ 11.5%", separate: "28%", rec: "合併較優", color: "text-teal-600 font-semibold" },
                  { bracket: "30%", combined: "30% − 8.5% ＝ 21.5%", separate: "28%", rec: "合併較優", color: "text-teal-600 font-semibold" },
                  { bracket: "40%", combined: "40% − 8.5% ＝ 31.5%", separate: "28%", rec: "分開較優", color: "text-orange-600 font-semibold" },
                ].map((row) => (
                  <tr key={row.bracket} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.bracket}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{row.combined}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{row.separate}</td>
                    <td className={`px-4 py-3 text-center ${row.color}`}>{row.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>重要：</strong>邊際稅率是看「加計股利後的最高稅率」，不是薪資單獨的稅率。
            若薪資在 20% 級距邊緣，再加幾十萬股利可能推進 30% 級距，需分段計算。
            建議用下方詳細試算表或報稅計算器實算。
          </div>
        </section>

        <AdUnit />

        {/* ── 各情境詳細試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">各情境詳細試算</h2>
          <p className="text-sm text-gray-500 mb-5">
            以下計算股利部分的稅負差異（不含薪資稅）。
            假設單身申報、標準扣除額，所得淨額已扣除免稅額＋標準扣除額＋薪資特別扣除額。
          </p>
          <div className="space-y-8">
            {SCENARIOS.map((scenario) => (
              <div key={scenario.salaryNet}>
                <h3 className="text-base font-bold text-gray-800 mb-2">{scenario.label}</h3>
                <p className="text-xs text-gray-500 mb-3">
                  薪資稅率：{bracketLabel(scenario.salaryNet)}
                </p>
                <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">股利金額</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">8.5%抵減額</th>
                        <th className="px-4 py-3 text-right font-semibold text-teal-700">合併股利稅</th>
                        <th className="px-4 py-3 text-right font-semibold text-orange-700">分開稅（28%）</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">差額（合併省）</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">建議</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {scenario.dividends.map((div) => {
                        const { combinedDividendTax, separateTax, saving, better, credit } =
                          calcDividendTax(scenario.salaryNet, div);
                        return (
                          <tr key={div} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">
                              {fmt(div)} 元
                            </td>
                            <td className="px-4 py-3 text-right text-gray-500">
                              {fmt(credit)} 元
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-teal-700">
                              {combinedDividendTax <= 0 ? (
                                <span className="text-green-600">退稅</span>
                              ) : (
                                `${fmt(combinedDividendTax)} 元`
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-orange-700">
                              {fmt(separateTax)} 元
                            </td>
                            <td className="px-4 py-3 text-right">
                              {saving > 0 ? (
                                <span className="font-semibold text-teal-600">省 {fmt(saving)} 元</span>
                              ) : saving < 0 ? (
                                <span className="font-semibold text-orange-600">多 {fmt(-saving)} 元</span>
                              ) : (
                                <span className="text-gray-400">相近</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {better === "合併" ? (
                                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700">合併</span>
                              ) : better === "分開" ? (
                                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">分開</span>
                              ) : (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">相近</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            ※ 合併股利稅 = 含股利應納稅額 − 不含股利應納稅額 − 可抵減稅額。
            若為負值表示股利帶來退稅效果（整戶退稅上限為已繳稅額）。<br />
            ※ 試算為估算，實際稅額依財政部報稅系統計算為準。建議在申報前用本站報稅計算器實際試算。
          </p>
        </section>

        {/* ── 常見誤區 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">四個常見誤區</h2>
          <div className="space-y-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤區：股利稅率很高，選分開28%比較少繳</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>大部分人（薪資稅率5%～30%）合併計稅更省。
                合併後有8.5%可抵減，相當於把股利的實際稅率壓到5%以下甚至退稅。
                選分開28%反而繳更多。只有稅率40%的高薪族才需考慮分開。
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤區：選了分開課稅就不用在申報書上填股利</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>不論選哪種方式，股利所得都<strong>必須在申報書上申報</strong>。
                選分開課稅是指選擇不合併計算綜合所得，但仍需填寫，並在報稅系統中選擇「分開計稅」選項。
                不申報屬於漏報，會被補稅加罰。
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤區：ETF 配息全部都是股利，都能用8.5%抵減</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>ETF配息分為三類：①股利（適用8.5%抵減）、②資本利得（非股利，不計入個人所得）、
                ③利息所得（依利息稅率）。配息明細可在投信公司或集保結算所查詢。
                部分ETF（如0050、0056）配息中資本利得比重高，實際要課稅的比例比想像中低。
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤區：股利選合併就一定要繳更多稅（因為累進）</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>合併計稅雖然股利算入所得讓稅率看起來更高，
                但8.5%可抵減稅額的威力非常大。年薪中等的族群，
                合併計稅後股利的實際稅負甚至可能為負數（退稅），遠優於固定28%。
              </p>
            </div>
          </div>
        </section>

        {/* ── 申報實務步驟 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">申報實務：怎麼選擇課稅方式？</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 rounded-full bg-teal-100 w-7 h-7 flex items-center justify-center text-sm font-bold text-teal-700">1</span>
              <div>
                <p className="font-semibold text-gray-900">收集股利憑單</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  每年 1 月底前，持股公司/基金會寄送「各類所得扣繳暨免扣繳憑單」。
                  憑單上會標明「股利所得」金額及已扣繳稅款（扣繳率 10%）。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 rounded-full bg-teal-100 w-7 h-7 flex items-center justify-center text-sm font-bold text-teal-700">2</span>
              <div>
                <p className="font-semibold text-gray-900">用試算表或本站工具先算一遍</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  把薪資所得淨額和股利金額代入上方試算表，看合併稅 vs 分開稅哪個低。
                  大部分中薪族（稅率 20% 以下）答案都是合併計稅。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 rounded-full bg-teal-100 w-7 h-7 flex items-center justify-center text-sm font-bold text-teal-700">3</span>
              <div>
                <p className="font-semibold text-gray-900">在報稅系統選擇課稅方式</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  財政部電子申報系統（網路報稅或手機報稅）在填寫「股利所得」時，
                  會出現「合併計稅」或「分開計稅（28%）」選項，選擇後系統自動計算。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 rounded-full bg-teal-100 w-7 h-7 flex items-center justify-center text-sm font-bold text-teal-700">4</span>
              <div>
                <p className="font-semibold text-gray-900">截止日：5月31日</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  114 年度所得稅申報期限為 2026 年 5 月 1 日～5 月 31 日。
                  可網路申報、手機申報或臨櫃。逾期申報加收利息，不申報罰款更重。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <TaxAffiliateCTA />
        </section>

        {/* ── 相關工具 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">相關工具</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tax-calculator"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">報稅計算器</p>
              <p className="text-sm text-gray-500 mt-0.5">含股利、薪資、接案所得完整試算，自動計算合併計稅結果</p>
            </Link>
            <Link
              href="/income-tax-brackets"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">所得稅級距</p>
              <p className="text-sm text-gray-500 mt-0.5">114年度五級累進稅率說明，確認自己的邊際稅率</p>
            </Link>
            <Link
              href="/supplement-premium"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">二代健保補充保費</p>
              <p className="text-sm text-gray-500 mt-0.5">股利超過2萬元還要繳補充保費2.11%，不要漏算</p>
            </Link>
            <Link
              href="/tax-filing-guide"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">114年度報稅攻略</p>
              <p className="text-sm text-gray-500 mt-0.5">完整申報流程、各項扣除額一次看懂</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
