"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度房屋租金特別扣除額 ────────────────────────────────────────────────
// 所得稅法新制：申報戶每年最高扣除 NT$180,000 租金支出
// 屬「特別扣除額」，可與標準扣除額或列舉扣除額疊加
// 條件：本人及配偶在台灣境內無自有房屋
// 114年度（2025年所得，2026年5月申報）
// ─────────────────────────────────────────────────────────────────────────────

const RENT_DEDUCTION_MAX = 180_000;
const STANDARD_DEDUCTION = { single: 131_000, married: 262_000 };
const EXEMPTION = 97_000;
const SALARY_DEDUCTION_MAX = 218_000;

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
  return 0.4;
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
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
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/rent-deduction", label: "租金節稅", active: true },
];

// ── 情境比較表 ────────────────────────────────────────────────────────────────
type Scenario = {
  label: string;
  monthlyRent: number;
  salary: number;
  filing: "single" | "married";
};

function computeSaving(s: Scenario): number {
  const annualRent = s.monthlyRent * 12;
  const rentDeduction = Math.min(annualRent, RENT_DEDUCTION_MAX);
  const salaryDeduction = Math.min(s.salary, SALARY_DEDUCTION_MAX);
  const persons = s.filing === "married" ? 2 : 1;
  const exemption = EXEMPTION * persons;
  const standardDeduction = STANDARD_DEDUCTION[s.filing];
  const netWithout = Math.max(0, s.salary - salaryDeduction - exemption - standardDeduction);
  const netWith = Math.max(0, netWithout - rentDeduction);
  return calcTax(netWithout) - calcTax(netWith);
}

const SCENARIOS: Scenario[] = [
  { label: "月薪4萬（單身）", monthlyRent: 10_000, salary: 480_000, filing: "single" },
  { label: "月薪5萬（單身）", monthlyRent: 12_000, salary: 600_000, filing: "single" },
  { label: "月薪6萬（單身）", monthlyRent: 15_000, salary: 720_000, filing: "single" },
  { label: "月薪8萬（單身）", monthlyRent: 18_000, salary: 960_000, filing: "single" },
  { label: "雙薪各5萬（合報）", monthlyRent: 20_000, salary: 1_200_000, filing: "married" },
  { label: "雙薪各7萬（合報）", monthlyRent: 25_000, salary: 1_680_000, filing: "married" },
];

const MONTHLY_RENTS = [5_000, 8_000, 10_000, 12_000, 15_000, 20_000];
const SALARIES = [
  { label: "50萬", value: 500_000 },
  { label: "70萬", value: 700_000 },
  { label: "100萬", value: 1_000_000 },
  { label: "150萬", value: 1_500_000 },
];

function tableCell(monthlyRent: number, salary: number): number {
  const annualRent = monthlyRent * 12;
  const rentDeduction = Math.min(annualRent, RENT_DEDUCTION_MAX);
  const salaryDeduction = Math.min(salary, SALARY_DEDUCTION_MAX);
  const exemption = EXEMPTION;
  const standardDeduction = STANDARD_DEDUCTION.single;
  const netWithout = Math.max(0, salary - salaryDeduction - exemption - standardDeduction);
  const netWith = Math.max(0, netWithout - rentDeduction);
  return calcTax(netWithout) - calcTax(netWith);
}

export default function RentDeductionPage() {
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [monthlyRent, setMonthlyRent] = useState(15_000);
  const [salary, setSalary] = useState(800_000);
  const [spouseSalary, setSpouseSalary] = useState(700_000);

  const result = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const rentDeduction = Math.min(annualRent, RENT_DEDUCTION_MAX);
    const isCapped = annualRent > RENT_DEDUCTION_MAX;

    // 薪資特別扣除（每位薪資所得者分別計算）
    let salaryDeduction = Math.min(salary, SALARY_DEDUCTION_MAX);
    if (filing === "married" && spouseSalary > 0) {
      salaryDeduction += Math.min(spouseSalary, SALARY_DEDUCTION_MAX);
    }
    const totalSalary = filing === "married" ? salary + spouseSalary : salary;

    // 免稅額
    const persons = filing === "married" ? 2 : 1;
    const exemption = EXEMPTION * persons;

    // 標準扣除額
    const standardDeduction = STANDARD_DEDUCTION[filing];

    // 所得淨額（未含房租扣除）
    const netWithout = Math.max(0, totalSalary - salaryDeduction - exemption - standardDeduction);

    // 所得淨額（含房租扣除）
    const netWith = Math.max(0, netWithout - rentDeduction);

    const taxWithout = calcTax(netWithout);
    const taxWith = calcTax(netWith);
    const taxSaving = taxWithout - taxWith;
    const marginalRate = getMarginalRate(netWithout);

    return {
      annualRent,
      rentDeduction,
      isCapped,
      salaryDeduction,
      exemption,
      standardDeduction,
      netWithout,
      netWith,
      taxWithout,
      taxWith,
      taxSaving,
      marginalRate,
    };
  }, [filing, monthlyRent, salary, spouseSalary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
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
                    ? "bg-orange-600 text-white"
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5">
            <span className="text-lg">🏠</span>
            <span className="text-sm font-semibold text-orange-700">114年度新制</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            租屋族報稅省稅試算
          </h1>
          <p className="mt-3 text-gray-500">
            114年度起，租屋族可額外扣除房租，上限{" "}
            <strong className="text-orange-600">NT$180,000</strong>，
            疊加標準扣除額一起省
          </p>
          <p className="mt-1 text-sm text-gray-400">
            依財政部 114 年度所得稅法「房屋租金特別扣除額」規定
          </p>
        </header>

        {/* 說明卡片 */}
        <div className="mb-6 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-5">
          <h2 className="mb-3 font-bold text-gray-800">
            114年度新制：不需要放棄標準扣除額！
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              ✅ <strong>每申報戶最高扣 NT$180,000</strong> 房租支出（月租 15,000 × 12 = 剛好上限）
            </p>
            <p>
              ✅ <strong>疊加標準扣除額</strong>——屬「特別扣除額」，不需改用列舉，兩個都拿
            </p>
            <p>
              ✅ <strong>省稅最直接</strong>——適用 5% 稅率者省 9,000 元；12% 省 21,600 元；20% 省 36,000 元
            </p>
            <p>
              ⚠️ <strong>條件：本人及配偶在台灣境內無自有房屋</strong>（含配偶名下）
            </p>
          </div>
        </div>

        <AdUnit />

        {/* Calculator */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-800">省稅試算</h2>

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
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {f === "single" ? "🧑 單身申報" : "💑 夫妻合報"}
                </button>
              ))}
            </div>
          </div>

          {/* 月租金 */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              每月租金
              <span className="ml-2 font-normal text-orange-600">
                （年租 &gt; 15,000 × 12 = 180,000 → 達上限）
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={monthlyRent}
                onChange={(e) =>
                  setMonthlyRent(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="15000"
              />
              <span className="whitespace-nowrap text-sm text-gray-500">
                元/月
              </span>
            </div>
            {result.annualRent > 0 && (
              <p className="mt-1 text-xs text-gray-400">
                全年租金：NT${result.annualRent.toLocaleString("zh-TW")} →
                可申報扣除：
                <strong className="text-orange-600">
                  NT${result.rentDeduction.toLocaleString("zh-TW")}
                </strong>
                {result.isCapped && "（已達上限 180,000）"}
              </p>
            )}
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
                onChange={(e) =>
                  setSalary(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="800000"
              />
              <span className="whitespace-nowrap text-sm text-gray-500">
                元/年
              </span>
            </div>
          </div>

          {/* 配偶薪資 */}
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
                  onChange={(e) =>
                    setSpouseSalary(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="700000"
                />
                <span className="whitespace-nowrap text-sm text-gray-500">
                  元/年
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                配偶無薪資收入請填 0
              </p>
            </div>
          )}

          {/* 結果 */}
          <div
            className={`rounded-2xl p-5 text-white ${
              result.taxSaving > 0
                ? "bg-gradient-to-br from-orange-500 to-amber-600"
                : "bg-gradient-to-br from-gray-400 to-gray-500"
            }`}
          >
            <div className="mb-4 text-center">
              <p className="text-sm font-medium opacity-90">
                房屋租金特別扣除額
              </p>
              <p className="text-4xl font-bold">
                {fmt(result.rentDeduction)}
              </p>
              {result.isCapped && (
                <p className="mt-1 text-xs opacity-70">
                  （年租金 {fmt(result.annualRent)} → 已達上限 180,000）
                </p>
              )}
            </div>

            <div className="mb-4 rounded-xl bg-white/15 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">適用邊際稅率</span>
                <span className="font-bold">
                  {(result.marginalRate * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">使用前應繳稅</span>
                <span className="font-medium">{fmt(result.taxWithout)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">使用後應繳稅</span>
                <span className="font-medium">{fmt(result.taxWith)}</span>
              </div>
              <div className="border-t border-white/20 pt-2 flex justify-between">
                <span className="font-bold">省稅金額</span>
                <span className="text-xl font-bold text-yellow-300">
                  {result.taxSaving > 0
                    ? `↓ ${fmt(result.taxSaving)}`
                    : "NT$0（所得淨額為0）"}
                </span>
              </div>
            </div>

            {/* 計算明細 */}
            <div className="rounded-xl bg-white/10 p-3 text-xs space-y-1 opacity-80">
              <p className="font-semibold text-sm opacity-100 mb-2">計算明細</p>
              <div className="flex justify-between">
                <span>總薪資所得</span>
                <span>{fmt(filing === "married" ? salary + spouseSalary : salary)}</span>
              </div>
              <div className="flex justify-between">
                <span>薪資特別扣除</span>
                <span>−{fmt(result.salaryDeduction)}</span>
              </div>
              <div className="flex justify-between">
                <span>免稅額</span>
                <span>−{fmt(result.exemption)}</span>
              </div>
              <div className="flex justify-between">
                <span>標準扣除額</span>
                <span>−{fmt(result.standardDeduction)}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-white/20 pt-1">
                <span>所得淨額（未含房租）</span>
                <span>{fmt(result.netWithout)}</span>
              </div>
              <div className="flex justify-between text-yellow-200">
                <span>房屋租金特別扣除</span>
                <span>−{fmt(result.rentDeduction)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/20 pt-1">
                <span>申報後所得淨額</span>
                <span>{fmt(result.netWith)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 申請條件 */}
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-4 font-bold text-gray-800">申請資格確認</h2>
          <div className="space-y-3">
            {[
              {
                ok: true,
                text: "本人及配偶在台灣境內均「無自有房屋」",
                note: "含配偶名下，有任何自有住宅即不符資格",
              },
              {
                ok: true,
                text: "租賃房屋供本人、配偶或受扶養親屬實際居住使用",
                note: "辦公或商業用途不符合",
              },
              {
                ok: true,
                text: "非向本人、配偶或申報受扶養直系親屬（父母、子女）租賃",
                note: "向親戚（兄弟姐妹等）租賃不在此限制內",
              },
              {
                ok: true,
                text: "有合法租賃契約及付款紀錄",
                note: "轉帳明細或房東簽名收據，建議保存5年",
              },
            ].map((c, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-0.5 text-green-600 font-bold flex-shrink-0">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3">
            <p className="text-xs text-red-700">
              <strong>注意：</strong>有自有房屋（本人或配偶名下）則不符申請資格，無論是否實際居住。
            </p>
          </div>
        </div>

        {/* 情境試算表 */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-1 font-bold text-gray-800">常見情境省稅試算</h2>
          <p className="mb-4 text-xs text-gray-400">
            以下以單身申報、標準扣除額估算，實際金額以試算器為準
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-2 pr-3 text-left text-gray-500 font-medium">
                    年薪 ↓ 月租 →
                  </th>
                  {MONTHLY_RENTS.map((r) => (
                    <th
                      key={r}
                      className="py-2 px-2 text-center text-gray-500 font-medium"
                    >
                      {r >= 10_000 ? `${r / 1_000}K` : `${r / 1_000}K`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SALARIES.map((s) => (
                  <tr
                    key={s.value}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-2 pr-3 font-medium text-gray-700">
                      {s.label}
                    </td>
                    {MONTHLY_RENTS.map((r) => {
                      const saving = tableCell(r, s.value);
                      return (
                        <td
                          key={r}
                          className={`py-2 px-2 text-center font-medium ${
                            saving >= 20_000
                              ? "text-orange-600"
                              : saving >= 10_000
                              ? "text-amber-600"
                              : saving > 0
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {saving > 0
                            ? `${(saving / 1_000).toFixed(1)}K`
                            : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            單位：千元（K）。月租 5K 以下，年租金低於標準扣除額差距，省稅相對有限。
          </p>
        </div>

        {/* 常見情境 */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold text-gray-800">6種典型情境</h2>
          <div className="space-y-3">
            {SCENARIOS.map((s, i) => {
              const saving = computeSaving(s);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {s.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      月租 NT${s.monthlyRent.toLocaleString("zh-TW")}・
                      {s.filing === "single" ? "單身" : "夫妻合報"}
                    </p>
                  </div>
                  <p
                    className={`text-lg font-bold ${
                      saving > 0 ? "text-orange-600" : "text-gray-400"
                    }`}
                  >
                    省 {fmt(saving)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <AdUnit />

        {/* FAQ */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 font-bold text-gray-800">常見問題</h2>
          <div className="space-y-5">
            {[
              {
                q: "114年度才有這個扣除額嗎？之前租屋的人怎麼報？",
                a: "是的，「房屋租金特別扣除額」（上限180,000元）是114年度新增的特別扣除額。113年度（2024年5月申報）以前，租金只能用「列舉扣除額」方式申報，且必須放棄標準扣除額才行。114年度起，改為可疊加標準扣除額的特別扣除額，對租屋族大幅加碼。",
              },
              {
                q: "我用標準扣除額，還可以再申報租金嗎？",
                a: "可以！這是新制最大的改變。房屋租金特別扣除額屬於「特別扣除額」，不是「列舉扣除額」，因此不需要放棄標準扣除額（131,000元/單身或262,000元/夫妻合報）。你可以同時享有：標準扣除額＋薪資特別扣除額＋房屋租金特別扣除額，三個加起來一起扣。",
              },
              {
                q: "申報房租扣除需要什麼文件？房東要配合嗎？",
                a: "需要準備：①租賃契約書（需有雙方簽名、租賃地址、租金金額、租賃期間）；②付款紀錄（銀行轉帳明細最佳，若以現金支付需房東簽名的收據）。房東不需要主動配合開立統一發票，但建議保留轉帳紀錄作為付款憑證。國稅局可能事後抽查，建議文件保存至少5年。",
              },
              {
                q: "夫妻合報，房租扣除額是一人180,000還是兩人合計180,000？",
                a: "是「申報戶」上限180,000元，夫妻合報算一個申報戶，合計上限仍是180,000元，不是每人180,000。但夫妻合報其他扣除額（如標準扣除額 262,000、每人免稅額 97,000×2）都是合計計算，整體仍划算。",
              },
            ].map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer items-start justify-between gap-3 text-sm font-medium text-gray-800 list-none">
                  <span>Q{i + 1}. {faq.q}</span>
                  <span className="mt-0.5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="mb-6">
          <TaxAffiliateCTA />
        </div>

        {/* 相關工具 */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold text-gray-700">其他報稅工具</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/tax-calculator", label: "報稅計算器", desc: "計算應繳稅額" },
              { href: "/deduction-compare", label: "列舉vs標準", desc: "哪種扣除更省" },
              { href: "/tax-refund", label: "退稅試算", desc: "我可以退稅嗎" },
              { href: "/dependent-deduction", label: "扶養節稅", desc: "扶養父母省多少" },
              { href: "/preschool-deduction", label: "幼兒學前扣除", desc: "6歲以下幼兒" },
              { href: "/tax-filing-guide", label: "報稅攻略", desc: "完整報稅步驟" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 hover:border-orange-200 hover:bg-orange-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pb-8">
          <p>
            資料來源：財政部 114 年度所得稅法修正規定。本工具僅供參考，以財政部官方試算為準。
          </p>
          <p className="mt-1">
            <Link href="/" className="hover:text-gray-600 underline">
              twtaxcalc.com
            </Link>{" "}
            — 免費財務計算工具
          </p>
        </footer>
      </div>
    </div>
  );
}
