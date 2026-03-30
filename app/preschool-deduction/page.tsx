"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度幼兒學前特別扣除額 ─────────────────────────────────────────────────
// 所得稅法第17條之3：申報戶中有未滿6歲幼兒，每位幼兒可扣除150,000元
// 114年度（2025年所得，2026年5月申報）
// 此扣除額屬「特別扣除額」，可與標準扣除額或列舉扣除額疊加
// 受扶養子女免稅額（97,000元/人）另計，雙重享有
// ─────────────────────────────────────────────────────────────────────────────

const PRESCHOOL_PER_CHILD = 150_000;
const STANDARD_DEDUCTION = { single: 131_000, married: 262_000 };
const EXEMPTION = 97_000; // 每人免稅額
const SALARY_DEDUCTION_MAX = 218_000; // 薪資所得特別扣除額上限/人

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 911_700 },
];

function calcTax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return Math.round(netIncome * b.rate - b.diff);
  }
  return 0;
}

function getMarginalRate(netIncome: number): number {
  if (netIncome <= 0) return 0.05;
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return b.rate;
  }
  return 0.40;
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
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
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除", active: true },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
];

// ── 情境比較表 ────────────────────────────────────────────────────────────────
// 公式：節稅 = min(幼兒扣除額, 所得淨額) × 邊際稅率（近似值）
const SCENARIOS = [
  { label: "單薪家庭 80萬", salary: 800_000, spouseSalary: 0, filing: "single" as const, children: 1, taxSaving: 7_500 },
  { label: "單薪家庭 80萬 × 2幼兒", salary: 800_000, spouseSalary: 0, filing: "single" as const, children: 2, taxSaving: 15_000 },
  { label: "雙薪各60萬 × 1幼兒", salary: 600_000, spouseSalary: 600_000, filing: "married" as const, children: 1, taxSaving: 7_500 },
  { label: "雙薪各60萬 × 2幼兒", salary: 600_000, spouseSalary: 600_000, filing: "married" as const, children: 2, taxSaving: 15_000 },
  { label: "雙薪各100萬 × 1幼兒", salary: 1_000_000, spouseSalary: 1_000_000, filing: "married" as const, children: 1, taxSaving: 18_000 },
  { label: "雙薪各100萬 × 2幼兒", salary: 1_000_000, spouseSalary: 1_000_000, filing: "married" as const, children: 2, taxSaving: 36_000 },
  { label: "雙薪各150萬 × 1幼兒", salary: 1_500_000, spouseSalary: 1_500_000, filing: "married" as const, children: 1, taxSaving: 30_000 },
  { label: "雙薪各150萬 × 2幼兒", salary: 1_500_000, spouseSalary: 1_500_000, filing: "married" as const, children: 2, taxSaving: 60_000 },
];

export default function PreschoolDeductionPage() {
  const [filing, setFiling] = useState<"single" | "married">("married");
  const [salary, setSalary] = useState(1_000_000);
  const [spouseSalary, setSpouseSalary] = useState(800_000);
  const [children, setChildren] = useState(1);

  const result = useMemo(() => {
    const totalSalary = filing === "married" ? salary + spouseSalary : salary;

    // 薪資所得特別扣除額（每位薪資所得者最高 218,000）
    let salaryDeduction = Math.min(salary, SALARY_DEDUCTION_MAX);
    if (filing === "married" && spouseSalary > 0) {
      salaryDeduction += Math.min(spouseSalary, SALARY_DEDUCTION_MAX);
    }

    // 免稅額（本人 + 配偶，子女另計）
    const persons = filing === "married" ? 2 : 1;
    const exemption = EXEMPTION * persons;

    // 一般扣除額（標準扣除額，不含幼兒）
    const standardDeduction = STANDARD_DEDUCTION[filing];

    // 所得淨額（不含幼兒學前扣除）
    const netWithout = Math.max(0, totalSalary - salaryDeduction - exemption - standardDeduction);

    // 幼兒學前特別扣除額
    const preschoolDeduction = children * PRESCHOOL_PER_CHILD;

    // 所得淨額（含幼兒學前扣除）
    const netWith = Math.max(0, netWithout - preschoolDeduction);

    const taxWithout = calcTax(netWithout);
    const taxWith = calcTax(netWith);
    const taxSaving = taxWithout - taxWith;
    const marginalRate = getMarginalRate(netWithout);

    // 幼兒學前 + 受扶養子女免稅額合計節稅
    const childExemptionSaving = Math.round(children * EXEMPTION * marginalRate);
    const totalChildSaving = taxSaving + childExemptionSaving;

    return {
      totalSalary,
      salaryDeduction,
      exemption,
      standardDeduction,
      preschoolDeduction,
      netWithout,
      netWith,
      taxWithout,
      taxWith,
      taxSaving,
      marginalRate,
      childExemptionSaving,
      totalChildSaving,
    };
  }, [filing, salary, spouseSalary, children]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4">
          <div className="flex gap-1 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  l.active
                    ? "bg-rose-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5">
            <span className="text-lg">👶</span>
            <span className="text-sm font-semibold text-rose-700">114年度報稅優惠</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            幼兒學前特別扣除額試算
          </h1>
          <p className="mt-3 text-gray-500">
            未滿6歲幼兒每人可扣除 <strong className="text-rose-600">NT$150,000</strong>，
            兩個幼兒就是 <strong className="text-rose-600">NT$300,000</strong>
          </p>
          <p className="mt-1 text-sm text-gray-400">
            依財政部 114 年度所得稅法第17條之3規定
          </p>
        </header>

        {/* 說明卡片 */}
        <div className="mb-6 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-5">
          <h2 className="mb-3 font-bold text-gray-800">什麼是幼兒學前特別扣除額？</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ <strong>每位未滿6歲幼兒</strong>可申報 <strong>150,000元</strong> 特別扣除額（以當年12/31為基準日）</p>
            <p>✅ <strong>不影響標準扣除額</strong>——屬「特別扣除額」，可與標準或列舉扣除額疊加</p>
            <p>✅ <strong>可疊加受扶養子女免稅額</strong>——幼兒另享 97,000元/人 的免稅額，雙重節稅</p>
            <p>✅ <strong>無所得上限</strong>——不論夫妻薪資多少都可以申報</p>
          </div>
        </div>

        <AdUnit />

        {/* Calculator */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-800">節稅試算</h2>

          {/* 申報方式 */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              申報方式
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["single", "married"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFiling(f)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    filing === f
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {f === "single" ? "🧑 單身申報" : "💑 夫妻合報"}
                </button>
              ))}
            </div>
          </div>

          {/* 年薪 */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {filing === "married" ? "本人年薪所得" : "年薪所得"}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={salary}
                onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="1000000"
              />
              <span className="whitespace-nowrap text-sm text-gray-500">元/年</span>
            </div>
          </div>

          {/* 配偶薪資（夫妻合報才顯示） */}
          {filing === "married" && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                配偶年薪所得
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={spouseSalary}
                  onChange={(e) => setSpouseSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  placeholder="800000"
                />
                <span className="whitespace-nowrap text-sm text-gray-500">元/年</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">配偶無薪資收入請填 0</p>
            </div>
          )}

          {/* 幼兒人數 */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              未滿6歲幼兒人數
              <span className="ml-2 font-normal text-rose-600">
                （每人扣除 NT$150,000）
              </span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setChildren(n)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                    children === n
                      ? "border-rose-500 bg-rose-500 text-white shadow-sm"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {n}人
                </button>
              ))}
            </div>
          </div>

          {/* 結果卡片 */}
          <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-5 text-white">
            <div className="mb-4 text-center">
              <p className="text-sm font-medium opacity-90">幼兒學前特別扣除額</p>
              <p className="text-4xl font-bold">
                {fmt(result.preschoolDeduction)}
              </p>
              <p className="mt-1 text-sm opacity-80">
                {children} 位幼兒 × NT$150,000/人
              </p>
            </div>

            <div className="mb-4 rounded-xl bg-white/15 p-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">適用邊際稅率</span>
                <span className="font-bold">{(result.marginalRate * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="opacity-90">幼兒學前扣除 → 節稅</span>
                <span className="font-bold text-yellow-300">{fmt(result.taxSaving)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="opacity-90">＋受扶養子女免稅額節稅</span>
                <span className="font-bold text-yellow-300">{fmt(result.childExemptionSaving)}</span>
              </div>
              <div className="mt-3 border-t border-white/20 pt-3 flex justify-between">
                <span className="font-bold opacity-95">加總節稅（幼兒合計）</span>
                <span className="text-xl font-bold text-yellow-300">{fmt(result.totalChildSaving)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs opacity-80">未申報幼兒扣除：稅額</p>
                <p className="text-lg font-bold">{fmt(result.taxWithout)}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs opacity-80">申報後：應繳稅額</p>
                <p className="text-lg font-bold">{fmt(result.taxWith)}</p>
              </div>
            </div>
            <p className="mt-3 text-center text-xs opacity-70">
              ＊估算值，以標準扣除額計算，實際金額依個人申報情況而異
            </p>
          </div>

          {/* 計算明細展開 */}
          <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            <p className="mb-2 font-semibold text-gray-700">計算明細</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>薪資所得合計</span>
                <span>{fmt(result.totalSalary)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－薪資所得特別扣除額</span>
                <span>－{fmt(result.salaryDeduction)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－免稅額（本人{filing === "married" ? "＋配偶" : ""}）</span>
                <span>－{fmt(result.exemption)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－標準扣除額</span>
                <span>－{fmt(result.standardDeduction)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1">
                <span>所得淨額（不含幼兒扣除）</span>
                <span className="font-medium">{fmt(result.netWithout)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>－幼兒學前特別扣除額</span>
                <span>－{fmt(result.preschoolDeduction)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 font-medium">
                <span>申報後所得淨額</span>
                <span>{fmt(result.netWith)}</span>
              </div>
            </div>
          </div>
        </div>

        <TaxAffiliateCTA />

        {/* 情境比較表 */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">常見情境節稅試算</h2>
          <p className="mb-4 text-xs text-gray-400">僅計算幼兒學前特別扣除額節稅，不含受扶養子女免稅額</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500">情境</th>
                  <th className="pb-2 text-right text-xs font-semibold text-gray-500">幼兒人數</th>
                  <th className="pb-2 text-right text-xs font-semibold text-gray-500">節稅金額</th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((s) => (
                  <tr key={s.label} className="border-b border-gray-50">
                    <td className="py-2.5 text-gray-700">{s.label}</td>
                    <td className="py-2.5 text-right text-gray-600">{s.children} 位</td>
                    <td className="py-2.5 text-right font-semibold text-rose-600">
                      {fmt(s.taxSaving)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            ＊以標準扣除額估算。若使用列舉扣除額，所得淨額不同，節稅金額會有差異。
          </p>
        </div>

        {/* 申報條件 */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">幼兒學前特別扣除額申報條件</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">1</div>
              <div>
                <p className="font-medium text-gray-800">幼兒未滿6歲</p>
                <p className="text-sm text-gray-500">以當年度（2025年）12月31日為基準日，幼兒須未滿6歲。2025年1月1日~12月31日期間出生的幼兒皆符合資格。</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">2</div>
              <div>
                <p className="font-medium text-gray-800">幼兒須列為受扶養親屬</p>
                <p className="text-sm text-gray-500">申報幼兒學前特別扣除額的前提是，該幼兒已列為申報戶的「受扶養親屬」。記得在申報書中填入幼兒資料。</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">3</div>
              <div>
                <p className="font-medium text-gray-800">夫妻合報或分開申報均可</p>
                <p className="text-sm text-gray-500">夫妻合併計稅時，幼兒學前扣除額歸合報申報戶。若薪資所得分開計稅，扣除額由列報幼兒為扶養的那方申報。</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">4</div>
              <div>
                <p className="font-medium text-gray-800">無所得上限，無申報上限</p>
                <p className="text-sm text-gray-500">幼兒學前特別扣除額沒有所得限制，夫妻薪資再高都可以申報。幼兒人數沒有上限，3個幼兒就是450,000元扣除額。</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-800">常見問題</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Q：幼兒學前特別扣除額可以和扶養免稅額同時申報嗎？</h3>
              <p className="mt-1 text-sm text-gray-600">
                可以！幼兒學前特別扣除額（每人150,000元）和受扶養子女免稅額（每人97,000元）屬於不同扣除項目，可以雙重享有。以一個幼兒為例，邊際稅率12%的申報戶合計節稅金額達 (150,000 + 97,000) × 12% = 29,640元。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：幼兒在年中出生，當年可以申報嗎？</h3>
              <p className="mt-1 text-sm text-gray-600">
                可以，只要幼兒在當年度12月31日前出生，且未滿6歲，就可以申報當年的幼兒學前特別扣除額。例如2025年11月出生的嬰兒，2026年5月報稅時就可以申報2025年度（114年度）的幼兒學前特別扣除額150,000元。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：幼兒在該年度剛滿6歲，還可以申報嗎？</h3>
              <p className="mt-1 text-sm text-gray-600">
                不行。以「當年度12月31日」為基準日，若幼兒在2025年12月31日已滿6歲（含），則2025年度（114年度）就不能申報幼兒學前特別扣除額。但在滿6歲之前的年度都可以申報。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：申報時需要附上什麼文件？</h3>
              <p className="mt-1 text-sm text-gray-600">
                使用網路申報時，通常系統會自動帶入幼兒資料（已有戶籍資料）。若幼兒為當年度新生兒，記得先向戶政事務所辦理出生登記，戶籍資料更新後系統即可讀取。紙本申報則需確認幼兒戶籍謄本或相關出生證明，填寫在申報書受扶養親屬欄位。
              </p>
            </div>
          </div>
        </div>

        {/* 相關工具 */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-700">相關節稅工具</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/tax-calculator", label: "📊 報稅計算器", desc: "綜合所得稅全試算" },
              { href: "/dependent-deduction", label: "👨‍👩‍👧‍👦 扶養節稅試算", desc: "父母、子女免稅額" },
              { href: "/deduction-compare", label: "📋 列舉vs標準", desc: "哪種扣除額更省" },
              { href: "/basic-living-deduction", label: "🏠 免稅天花板", desc: "基本生活費扣除" },
              { href: "/income-tax-brackets", label: "📈 所得稅級距", desc: "114年度稅率表" },
              { href: "/tax-filing-guide", label: "📝 報稅攻略", desc: "新手報稅懶人包" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-rose-200 hover:bg-rose-50"
              >
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          依財政部 114 年度綜合所得稅規定。試算結果僅供參考，實際稅額以財政部核定為準。
        </p>
      </div>
    </div>
  );
}
