"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度 綜合所得稅計算規則 ─────────────────────────────────
// 五級累進稅率（財政部公告）
// 級距     稅率    累進差額
// 0-59萬    5%      0
// 59-133萬  12%     41,300
// 133-266萬 20%     147,700
// 266-498萬 30%     413,700
// 498萬+    40%     911,700
//
// 標準扣除額：單身 131,000 / 夫妻 262,000
// 薪資所得特別扣除額：218,000（不超過薪資所得）
// 免稅額：97,000 / 人
// 基本生活費差額：視情況，本計算器不納入（保守估算）
// ──────────────────────────────────────────────────────────────

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, deduction: 0 },
  { max: 1_330_000, rate: 0.12, deduction: 41_300 },
  { max: 2_660_000, rate: 0.20, deduction: 147_700 },
  { max: 4_980_000, rate: 0.30, deduction: 413_700 },
  { max: Infinity,  rate: 0.40, deduction: 911_700 },
];

const STANDARD_DEDUCTION_SINGLE = 131_000;
const STANDARD_DEDUCTION_MARRIED = 262_000;
const SALARY_DEDUCTION = 218_000;
const EXEMPTION_PER_PERSON = 97_000;

function calcTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (taxableIncome <= b.max) {
      return taxableIncome * b.rate - b.deduction;
    }
  }
  return 0;
}

function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0.05;
  for (const b of TAX_BRACKETS) {
    if (taxableIncome <= b.max) return b.rate;
  }
  return 0.40;
}

function computeTaxableIncome(
  annualSalary: number,
  isMarried: boolean,
  dependents: number
): number {
  const standardDeduction = isMarried ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE;
  const salaryDeduction = Math.min(annualSalary, SALARY_DEDUCTION);
  const exemptions = EXEMPTION_PER_PERSON * (1 + (isMarried ? 1 : 0) + dependents);
  const taxable = annualSalary - standardDeduction - salaryDeduction - exemptions;
  return Math.max(taxable, 0);
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("zh-TW");
}

// ── UI 元件 ────────────────────────────────────────────────────

function NumField({
  label,
  hint,
  value,
  onChange,
  suffix,
  placeholder,
  min = 0,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  placeholder?: string;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="mb-1.5 text-xs text-gray-400 leading-relaxed">{hint}</p>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => {
            const v = parseFloat(e.target.value.replace(/,/g, ""));
            onChange(isNaN(v) ? 0 : Math.max(v, min));
          }}
        />
        {suffix && <span className="whitespace-nowrap text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-2.5 ${highlight ? "rounded-xl bg-blue-50 px-3" : "border-b border-gray-100 last:border-0"}`}>
      <span className={`text-sm ${highlight ? "font-semibold text-blue-700" : "text-gray-600"}`}>
        {label}
      </span>
      <div className="text-right">
        <span className={`font-bold ${highlight ? "text-lg text-blue-700" : "text-gray-900"}`}>
          {value}
        </span>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// ── 主頁面 ─────────────────────────────────────────────────────

export default function BonusCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState(45_000);
  const [bonusMonths, setBonusMonths] = useState(1.5);
  const [bonusCustom, setBonusCustom] = useState(0);
  const [useCustom, setUseCustom] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  const [dependents, setDependents] = useState(0);

  const result = useMemo(() => {
    const annualSalary = monthlySalary * 12;
    const bonus = useCustom ? bonusCustom : monthlySalary * bonusMonths;
    const totalIncome = annualSalary + bonus;

    const taxableWithout = computeTaxableIncome(annualSalary, isMarried, dependents);
    const taxableWith = computeTaxableIncome(totalIncome, isMarried, dependents);

    const taxWithout = calcTax(taxableWithout);
    const taxWith = calcTax(taxableWith);
    const extraTax = Math.max(taxWith - taxWithout, 0);

    const marginalRate = getMarginalRate(taxableWith);
    const effectiveRateBonus = bonus > 0 ? extraTax / bonus : 0;
    const netBonus = bonus - extraTax;

    return {
      annualSalary,
      bonus,
      totalIncome,
      taxableWithout,
      taxableWith,
      taxWithout,
      taxWith,
      extraTax,
      marginalRate,
      effectiveRateBonus,
      netBonus,
    };
  }, [monthlySalary, bonusMonths, bonusCustom, useCustom, isMarried, dependents]);

  const hasInput = monthlySalary > 0 && (useCustom ? bonusCustom > 0 : bonusMonths > 0);

  return (
    <div className="min-h-screen pb-16">
      {/* 導覽 */}
      <div className="flex gap-2 overflow-x-auto bg-white px-4 pt-4 pb-2 text-sm">
        <Link
          href="/"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          財務自由
        </Link>
        <Link
          href="/tax-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          報稅計算
        </Link>
        <Link
          href="/mortgage"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          房貸計算
        </Link>
        <Link
          href="/overtime-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          加班費
        </Link>
        <Link
          href="/severance-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          資遣費
        </Link>
        <Link
          href="/salary-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          月薪試算
        </Link>
        <span className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1 font-medium text-white">
          年終獎金
        </span>
        <Link
          href="/pension-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          勞退計算
        </Link>
        <Link
          href="/basic-living-deduction"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          免稅天花板
        </Link>
        <Link
          href="/labor-insurance-rates"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          勞健保費率
        </Link>
        <Link
          href="/income-tax-brackets"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          所得稅級距
        </Link>
        <Link
          href="/dependent-deduction"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          扶養節稅
        </Link>
        <Link
          href="/freelancer-tax-guide"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          接案報稅
        </Link>
        <Link
          href="/supplement-premium"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          二代健保
        </Link>
        <Link
          href="/salary-vs-freelancer"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          薪資vs接案
        </Link>
        <Link
          href="/tax-filing-guide"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          報稅攻略
        </Link>
        <Link
          href="/dividend-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          股利申報
        </Link>
        <Link
          href="/mortgage-full-cost"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          買房費用
        </Link>
        <Link
          href="/buy-vs-rent"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          買vs租
        </Link>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* 標題 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">年終獎金稅額計算器</h1>
          <p className="mt-1 text-sm text-gray-500">
            輸入月薪與年終獎金，立即試算多繳多少稅、實拿年終多少錢。114 年度五級累進稅率。
          </p>
        </div>

        {/* 廣告 */}
        <AdUnit slot="bonus-top" />

        {/* 輸入區 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">基本資料</h2>

          <NumField
            label="月薪（稅前）"
            hint="請輸入你的每月固定薪資"
            value={monthlySalary}
            onChange={setMonthlySalary}
            suffix="元"
            placeholder="45000"
          />

          {/* 年終輸入方式切換 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">年終獎金</label>
            <div className="mb-3 flex gap-2">
              <button
                onClick={() => setUseCustom(false)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${!useCustom ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}
              >
                按月數計算
              </button>
              <button
                onClick={() => setUseCustom(true)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${useCustom ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}
              >
                自行輸入金額
              </button>
            </div>

            {!useCustom ? (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600">年終月數</span>
                  <span className="text-lg font-bold text-blue-600">{bonusMonths} 個月</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={6}
                  step={0.5}
                  value={bonusMonths}
                  onChange={(e) => setBonusMonths(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>0.5個月</span>
                  <span>估算金額：NT${fmt(monthlySalary * bonusMonths)}</span>
                  <span>6個月</span>
                </div>
              </div>
            ) : (
              <NumField
                label=""
                value={bonusCustom}
                onChange={setBonusCustom}
                suffix="元"
                placeholder="90000"
              />
            )}
          </div>

          {/* 婚姻狀況 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              婚姻狀況
              <span className="ml-1 text-xs text-gray-400">（影響扣除額與免稅額）</span>
            </label>
            <div className="flex gap-2">
              {["單身", "已婚"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setIsMarried(i === 1)}
                  className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${isMarried === (i === 1) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 受扶養人數 */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                受扶養親屬人數
                <span className="ml-1 text-xs text-gray-400">（不含配偶）</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDependents(Math.max(0, dependents - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                >
                  −
                </button>
                <span className="w-4 text-center font-bold text-blue-600">{dependents}</span>
                <button
                  onClick={() => setDependents(Math.min(6, dependents + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">每位扶養親屬可增加 $97,000 免稅額</p>
          </div>
        </div>

        {/* 試算結果 */}
        {hasInput && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">年終獎金稅務試算</h2>

            {/* 核心結果 */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
              <div className="mb-1 text-sm opacity-80">年終獎金多繳稅額</div>
              <div className="text-4xl font-bold">NT${fmt(result.extraTax)}</div>
              <div className="mt-2 text-sm opacity-80">
                實拿年終：NT${fmt(result.netBonus)}
              </div>
            </div>

            {/* 詳細分解 */}
            <div className="space-y-1">
              <ResultRow label="全年薪資（月薪 × 12）" value={`NT$${fmt(result.annualSalary)}`} />
              <ResultRow
                label="年終獎金"
                value={`NT$${fmt(result.bonus)}`}
                sub={useCustom ? undefined : `月薪 × ${bonusMonths} 個月`}
              />
              <ResultRow label="全年總收入" value={`NT$${fmt(result.totalIncome)}`} />
              <div className="my-1 border-t border-dashed border-gray-200" />
              <ResultRow
                label="加上年終後應稅所得"
                value={`NT$${fmt(result.taxableWith)}`}
                sub="已扣除標準扣除額、薪資特別扣除額、免稅額"
              />
              <ResultRow label="邊際稅率（最高級距）" value={`${(result.marginalRate * 100).toFixed(0)}%`} />
              <ResultRow
                label="年終獎金有效稅率"
                value={`${(result.effectiveRateBonus * 100).toFixed(1)}%`}
                sub="多繳稅額 ÷ 年終獎金"
              />
              <div className="my-1 border-t border-dashed border-gray-200" />
              <ResultRow
                label="年終獎金多繳稅額"
                value={`NT$${fmt(result.extraTax)}`}
                highlight
              />
              <ResultRow
                label="實拿年終（稅後）"
                value={`NT$${fmt(result.netBonus)}`}
                highlight
              />
            </div>

            {/* 節稅提示 */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 space-y-2">
              <p className="text-sm font-semibold text-amber-800">省稅小技巧</p>
              <ul className="space-y-1.5 text-sm text-amber-700">
                <li>• <strong>勞退自提</strong>：年底前增加自提比例，可直接從薪資所得扣除，降低課稅所得</li>
                <li>• <strong>公益捐款</strong>：對政府機關捐款可全額扣除，最高不超過所得 20%</li>
                {result.marginalRate >= 0.20 && (
                  <li>• <strong>你的邊際稅率達 {(result.marginalRate * 100).toFixed(0)}%</strong>，每多扣除 10 萬元即可省稅 {fmt(100_000 * result.marginalRate)} 元，值得積極規劃</li>
                )}
              </ul>
            </div>

            {/* 假設說明 */}
            <p className="text-xs text-gray-400">
              本計算器採用 114 年度標準扣除額（單身 $131,000 / 夫妻 $262,000）、薪資特別扣除額 $218,000、免稅額每人 $97,000。
              不含長期照顧、身心障礙等特殊扣除額。實際稅額請以國稅局為準。
            </p>
          </div>
        )}

        {/* 聯盟 CTA */}
        <TaxAffiliateCTA />

        {/* 廣告 */}
        <AdUnit slot="bonus-mid" />

        {/* 導流 → 報稅計算器 */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-800">想知道全年要繳多少稅？</p>
          <p className="mt-1 text-sm text-blue-600">
            年終獎金試算完，去報稅計算器輸入全年薪資，算出5月要申報的完整稅額，看看是要補繳還是退稅。
          </p>
          <Link
            href="/tax-calculator"
            className="mt-3 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            去報稅計算器估算全年稅額 →
          </Link>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">常見問題</h2>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-1 text-sm font-medium text-gray-700">
              年終獎金要繳稅嗎？
              <span className="ml-2 text-gray-400 transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              是的，年終獎金屬於「薪資所得」，須合計入全年所得申報5月綜合所得稅。
              雇主通常在發放時預扣 5% 扣繳稅款；若你的邊際稅率高於 5%，
              報稅時需補繳差額。低薪者（應稅所得低於 59 萬）稅率只有 5%，實際多繳不多。
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-1 text-sm font-medium text-gray-700">
              年終獎金的稅是怎麼算的？
              <span className="ml-2 text-gray-400 transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              年終獎金加入全年薪資後，依五級累進稅率計算。算法：
              （全年薪資＋年終）減去標準扣除額、薪資所得特別扣除額、免稅額，
              得到「應稅所得」，再套用稅率表。本計算器幫你算出「多了年終之後，
              多繳多少稅」，也就是年終的實際稅負。
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-1 text-sm font-medium text-gray-700">
              年終獎金 1 個月，月薪 50,000，要繳多少稅？
              <span className="ml-2 text-gray-400 transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              月薪 50,000，全年薪資 600,000，加上年終 50,000 共 650,000。
              單身、無扶養親屬，應稅所得約 183,000（600,000 − 131,000 − 218,000 − 97,000），
              加上年終後約 233,000，稅率均在 5% 級距。
              多繳稅額約 2,500 元，有效稅率 5%。實拿年終約 47,500 元。
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-1 text-sm font-medium text-gray-700">
              怎麼減少年終獎金的稅？
              <span className="ml-2 text-gray-400 transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              最有效的方式是在年底前增加勞退自提比例：自提金額可從薪資所得扣除，
              直接降低課稅所得。另外，若有符合資格的公益捐款，也可在報稅時
              列舉扣除。邊際稅率 20% 以上的人，每規劃 10 萬元扣除額，可省 2 萬元稅。
            </p>
          </details>
        </div>

        {/* 廣告 */}
        <AdUnit slot="bonus-bottom" />
      </div>
    </div>
  );
}
