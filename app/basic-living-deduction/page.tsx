"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度 基本生活費差額計算規則 ─────────────────────────────────
// 基本生活費：202,000 元/人（財政部公告）
// 比較基礎 = 免稅額 + 標準扣除額 + 薪資特別扣除額 + 身障扣除額
//           + 幼兒學前扣除額 + 教育學費扣除額
// 差額 = MAX(0, 基本生活費總額 - 比較基礎)
// 差額可從綜合所得總額中額外扣除（不計入一般扣除額上限）
// ─────────────────────────────────────────────────────────────────

const BASIC_LIVING = 202_000;          // 元/人
const EXEMPTION = 97_000;              // 元/人
const STD_DEDUCTION_SINGLE = 131_000;
const STD_DEDUCTION_MARRIED = 262_000;
const SALARY_DEDUCTION = 218_000;      // 上限/人，需有薪資所得
const DISABILITY_DEDUCTION = 218_000;  // /人
const PRESCHOOL_1ST = 120_000;         // 第1個5歲以下子女
const PRESCHOOL_EXTRA = 240_000;       // 第2個以上5歲以下子女
const EDUCATION_DEDUCTION = 25_000;    // /人（大學以上就讀）

// 五級累進稅率（114年度）
const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 911_700 },
];

function calcTax(taxable: number): number {
  if (taxable <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (taxable <= b.max) return Math.round(taxable * b.rate - b.diff);
  }
  return Math.round(taxable * 0.40 - 911_700);
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("zh-TW");
}

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
  { href: "/basic-living-deduction", label: "免稅天花板", active: true },
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
  { href: "/dividend-tax", label: "股利申報" },
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

export default function BasicLivingDeductionPage() {
  const [isMarried, setIsMarried] = useState(false);
  const [dependents, setDependents] = useState(0);        // 受扶養親屬（不含配偶）
  const [salaryEarners, setSalaryEarners] = useState(1);  // 有薪資所得的申報人數
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [disabled, setDisabled] = useState(0);            // 身心障礙人數
  const [preschool, setPreschool] = useState(0);          // 5歲以下子女人數
  const [college, setCollege] = useState(0);              // 大學就讀子女人數

  const result = useMemo(() => {
    const totalPersons = 1 + (isMarried ? 1 : 0) + dependents;
    const basicLivingTotal = BASIC_LIVING * totalPersons;

    // 比較基礎各項
    const exemptionTotal = EXEMPTION * totalPersons;
    const standardDeduction = isMarried ? STD_DEDUCTION_MARRIED : STD_DEDUCTION_SINGLE;
    const salaryDeductionTotal = SALARY_DEDUCTION * salaryEarners;
    const disabilityTotal = DISABILITY_DEDUCTION * disabled;
    const preschoolTotal =
      preschool === 0 ? 0
      : preschool === 1 ? PRESCHOOL_1ST
      : PRESCHOOL_1ST + PRESCHOOL_EXTRA * (preschool - 1);
    const educationTotal = EDUCATION_DEDUCTION * college;

    const comparableTotal =
      exemptionTotal + standardDeduction + salaryDeductionTotal +
      disabilityTotal + preschoolTotal + educationTotal;

    const gap = Math.max(0, basicLivingTotal - comparableTotal);

    // 估算節稅效益：用年薪估算邊際稅率
    const annualIncome = monthlyIncome * 12;
    // 稅前所得淨額（先扣一般扣除額，不含差額）
    const taxableBase = Math.max(0, annualIncome - standardDeduction - Math.min(annualIncome, SALARY_DEDUCTION) - EXEMPTION);
    const taxWithoutGap = calcTax(taxableBase);
    const taxWithGap = calcTax(Math.max(0, taxableBase - gap));
    const taxSaving = taxWithoutGap - taxWithGap;

    // 邊際稅率
    let marginalRate = 0.05;
    for (const b of TAX_BRACKETS) {
      if (taxableBase <= b.max) { marginalRate = b.rate; break; }
    }

    return {
      totalPersons, basicLivingTotal,
      exemptionTotal, standardDeduction, salaryDeductionTotal,
      disabilityTotal, preschoolTotal, educationTotal,
      comparableTotal, gap, taxSaving, marginalRate,
    };
  }, [isMarried, dependents, salaryEarners, monthlyIncome, disabled, preschool, college]);

  const hasGap = result.gap > 0;

  return (
    <div className="space-y-5 px-4 pt-8 pb-8">
      {/* 工具切換 */}
      <div className="flex gap-2 overflow-x-auto text-sm">
        {NAV_LINKS.map(({ href, label, active }) =>
          active ? (
            <div key={href} className="whitespace-nowrap rounded-full bg-violet-600 px-3 py-1.5 font-semibold text-white shadow-sm">
              {label}
            </div>
          ) : (
            <Link key={href} href={href} className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-violet-400 hover:text-violet-600 transition">
              {label}
            </Link>
          )
        )}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">免稅天花板計算器</h1>
        <p className="mt-1 text-sm text-gray-500">基本生活費差額試算，看看你家能多扣多少錢</p>
      </div>

      <div className="rounded-xl bg-violet-50 px-4 py-3 text-xs text-violet-700">
        💡 <strong>很多人不知道的扣除額：</strong>114年度每人基本生活費 202,000 元。如果你家的各項扣除額加起來比基本生活費還少，差額可以再多扣一次，讓你少繳稅！
      </div>

      {/* 輸入區 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">申報家庭基本資料</h2>

        {/* 婚姻狀況 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">申報方式</label>
          <div className="flex gap-3">
            {[{ v: false, label: "單身 / 個人申報" }, { v: true, label: "夫妻合併申報" }].map(({ v, label }) => (
              <button
                key={label}
                onClick={() => setIsMarried(v)}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${
                  isMarried === v
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 受扶養親屬 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">受扶養親屬人數</label>
          <p className="mb-2 text-xs text-gray-400">不含配偶（父母、子女、祖父母等）</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setDependents(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  dependents === n
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {n} 人
              </button>
            ))}
          </div>
        </div>

        {/* 薪資所得人數 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">申報戶中有薪資所得的人數</label>
          <p className="mb-2 text-xs text-gray-400">每人最多可扣 218,000 薪資特別扣除額</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setSalaryEarners(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  salaryEarners === n
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {n} 人
              </button>
            ))}
          </div>
        </div>

        {/* 主要申報人月收入（估算節稅效益用） */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">主要申報人月收入</label>
          <p className="mb-1 text-xs text-gray-400">用來估算邊際稅率及節稅金額，不影響差額計算</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              value={monthlyIncome || ""}
              onChange={(e) => { const v = parseFloat(e.target.value); setMonthlyIncome(isNaN(v) ? 0 : v); }}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">元/月</span>
          </div>
        </div>
      </div>

      {/* 特殊扣除額 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">特殊扣除額（有才填）</h2>

        {/* 身心障礙 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">身心障礙人數</label>
          <p className="mb-2 text-xs text-gray-400">每人可扣 218,000 身心障礙特別扣除額</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setDisabled(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  disabled === n
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {n} 人
              </button>
            ))}
          </div>
        </div>

        {/* 5歲以下子女 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">5歲以下（含）子女人數</label>
          <p className="mb-2 text-xs text-gray-400">第1個 120,000；第2個以上各 240,000（幼兒學前特別扣除額）</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPreschool(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  preschool === n
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {n} 人
              </button>
            ))}
          </div>
        </div>

        {/* 大學就讀子女 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">大學以上就讀子女人數</label>
          <p className="mb-2 text-xs text-gray-400">每人最多 25,000 教育學費特別扣除額</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setCollege(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  college === n
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {n} 人
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 計算結果 */}
      <div className={`rounded-2xl border p-5 ${hasGap ? "border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50" : "border-gray-200 bg-gray-50"}`}>
        <h2 className="mb-4 font-semibold text-gray-800">計算結果</h2>

        {/* 申報人口 */}
        <div className="mb-3 rounded-xl bg-white/80 px-4 py-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">申報人口數</span>
            <span className="font-semibold text-gray-800">{result.totalPersons} 人</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">114年度基本生活費總額</span>
            <span className="font-semibold text-violet-700">{fmt(result.basicLivingTotal)} 元</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">= 202,000 × {result.totalPersons} 人</p>
        </div>

        {/* 比較基礎明細 */}
        <div className="mb-3 rounded-xl bg-white/80 px-4 py-3 space-y-2">
          <p className="text-xs font-medium text-gray-600 mb-1">相關免稅額及扣除額合計</p>
          {[
            { label: `免稅額（97,000 × ${result.totalPersons} 人）`, value: result.exemptionTotal },
            { label: isMarried ? "標準扣除額（夫妻）" : "標準扣除額（單身）", value: result.standardDeduction },
            { label: `薪資特別扣除額（218,000 × ${salaryEarners} 人）`, value: result.salaryDeductionTotal },
            ...(result.disabilityTotal > 0 ? [{ label: `身障扣除額（218,000 × ${disabled} 人）`, value: result.disabilityTotal }] : []),
            ...(result.preschoolTotal > 0 ? [{ label: `幼兒學前扣除額（${preschool} 名子女）`, value: result.preschoolTotal }] : []),
            ...(result.educationTotal > 0 ? [{ label: `教育學費扣除額（25,000 × ${college} 人）`, value: result.educationTotal }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-xs text-gray-600">
              <span>{label}</span>
              <span>{fmt(value)} 元</span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-semibold text-gray-700">
            <span>合計</span>
            <span>{fmt(result.comparableTotal)} 元</span>
          </div>
        </div>

        {/* 差額結果 */}
        {hasGap ? (
          <>
            <div className="rounded-xl border border-violet-300 bg-white px-4 py-4 text-center">
              <p className="text-sm text-gray-600">你的基本生活費差額（可額外扣除）</p>
              <p className="mt-1 text-4xl font-bold text-violet-600">{fmt(result.gap)} 元</p>
              <p className="mt-1 text-xs text-gray-400">= {fmt(result.basicLivingTotal)} − {fmt(result.comparableTotal)}</p>
            </div>

            <div className="mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center">
              <p className="text-sm text-gray-600">預估節稅金額</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{fmt(result.taxSaving)} 元</p>
              <p className="mt-1 text-xs text-gray-400">
                邊際稅率 {(result.marginalRate * 100).toFixed(0)}%，差額 {fmt(result.gap)} 元可從所得中額外扣除
              </p>
            </div>

            <p className="mt-3 text-xs text-gray-500 text-center">
              申報時在「基本生活費差額」欄位填入 <strong className="text-violet-700">{fmt(result.gap)}</strong> 元，系統會自動幫你扣除。
            </p>
          </>
        ) : (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-4 text-center">
            <p className="text-lg font-bold text-amber-700">差額為 0</p>
            <p className="mt-1 text-xs text-gray-600">
              你家的扣除額合計（{fmt(result.comparableTotal)} 元）已超過基本生活費總額（{fmt(result.basicLivingTotal)} 元），
              不能再額外扣除基本生活費差額，但這代表你已享有足夠的扣除額保護。
            </p>
          </div>
        )}
      </div>

      <AdUnit className="my-4" />

      {/* 報稅連結 */}
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
        <p className="text-sm font-semibold text-gray-800">📊 算完差額，去算你全年要繳多少稅</p>
        <p className="mt-1 text-xs text-gray-600">
          把基本生活費差額加入報稅計算器，看看全年實際稅額是多少。
        </p>
        <Link
          href="/tax-calculator"
          className="mt-3 block rounded-xl bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          去報稅計算器試算 →
        </Link>
      </div>

      <AdUnit className="my-4" />

      <TaxAffiliateCTA />

      {/* FAQ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-gray-800">常見問題</h2>

        {[
          {
            q: "什麼是基本生活費差額？",
            a: "財政部每年公告每人「基本生活費」（114年度為 202,000 元），若你家申報的各項免稅額和扣除額加起來比基本生活費還少，差額可以再從所得中額外扣除，是一個很多人不知道的節稅機會。",
          },
          {
            q: "114年度的基本生活費是多少？",
            a: "財政部公告114年度每人基本生活費為 202,000 元，比113年度的 196,000 元提高 6,000 元。申報戶有幾個人就乘以幾，例如夫妻兩人為 404,000 元。",
          },
          {
            q: "哪些扣除額會被拿來比較？",
            a: "比較基礎包含：(1) 免稅額 97,000/人，(2) 標準扣除額（單身 131,000、夫妻 262,000），(3) 薪資特別扣除額最多 218,000/人，(4) 身心障礙特別扣除額 218,000/人，(5) 幼兒學前特別扣除額，(6) 教育學費特別扣除額 25,000/人。",
          },
          {
            q: "差額要在哪裡填？",
            a: "在財政部報稅系統（或綜合所得稅申報書）的「基本生活費差額」欄位填入計算後的差額金額。報稅軟體通常會自動計算，確認一下有沒有漏填即可。",
          },
          {
            q: "什麼情況下差額最大？",
            a: "家庭人口多但收入偏低、扶養較多老人或小孩的家庭，差額往往最高。例如三代同堂 5 口人（含 2 名長輩、1 名幼兒），基本生活費總額高達 1,010,000 元，一般扣除額可能遠不及此，差額非常可觀。",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="text-sm font-semibold text-gray-800">{q}</p>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gray-100 p-4 text-center text-xs text-gray-500">
        本計算結果依財政部 114 年度公告基本生活費標準試算，僅供個人報稅參考。<br />
        實際申報以財政部報稅系統計算為準，建議配合報稅軟體使用。
      </div>
    </div>
  );
}
