"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 遺產稅規則（財政部 114 年度）─────────────────────────────────────────────
// 免稅額：13,330,000（1,333 萬）
// 喪葬費扣除額：上限 1,383,000（138.3 萬）
// 配偶扣除額：5,530,000（553 萬）
// 直系血親卑親屬（子女、孫等）：每人 553,000（55.3 萬）
//   ＋未成年者：每差 1 歲另加 553,000（距 20 歲差幾年就再加幾個 55.3 萬）
// 父母：每人 1,233,000（123.3 萬）
// 重度以上身心障礙繼承人：每人 6,930,000（693 萬）
// 受被繼承人扶養之兄弟姊妹、祖父母：每人 553,000（55.3 萬）
//
// 稅率（累進）：
//   課稅遺產淨額 0 ～ 5,000 萬  → 10%
//   5,000 萬 ～ 1 億            → 15%
//   超過 1 億                   → 20%
// ─────────────────────────────────────────────────────────────────────────────

const EXEMPT = 13_330_000; // 免稅額
const FUNERAL_MAX = 1_383_000; // 喪葬費上限
const SPOUSE_DED = 5_530_000; // 配偶扣除額
const LINEAL_DED = 553_000; // 直系卑親屬每人
const PARENT_DED = 1_233_000; // 父母每人
const DISABLED_DED = 6_930_000; // 重度障礙每人
const OTHER_DEP_DED = 553_000; // 受扶養兄弟姊妹/祖父母每人

interface CalcResult {
  estateTotal: number;
  funeralDed: number;
  spouseDed: number;
  linealDed: number;
  parentDed: number;
  disabledDed: number;
  otherDepDed: number;
  totalDed: number;
  taxableEstate: number;
  tax: number;
  effectiveRate: number;
}

function calcInheritanceTax(params: {
  estateWan: number;
  funeralWan: number;
  hasSpouse: boolean;
  adultChildren: number;
  minorChildren: number;
  avgMinorAge: number;
  parents: number;
  disabled: number;
  otherDep: number;
}): CalcResult {
  const {
    estateWan,
    funeralWan,
    hasSpouse,
    adultChildren,
    minorChildren,
    avgMinorAge,
    parents,
    disabled,
    otherDep,
  } = params;

  const estateTotal = estateWan * 10_000;

  // 喪葬費扣除額（不超上限）
  const funeralDed = Math.min(funeralWan * 10_000, FUNERAL_MAX);

  // 配偶
  const spouseDed = hasSpouse ? SPOUSE_DED : 0;

  // 直系血親卑親屬
  const adultLinealDed = adultChildren * LINEAL_DED;
  // 未成年子女：每人 55.3 萬 + 每差 1 歲再加 55.3 萬，差幾年 = max(0, 20 - avgMinorAge)
  const minorYearsLeft = Math.max(0, Math.round(20 - avgMinorAge));
  const minorLinealDed = minorChildren * LINEAL_DED + minorChildren * minorYearsLeft * LINEAL_DED;
  const linealDed = adultLinealDed + minorLinealDed;

  // 父母
  const parentDed = Math.min(parents, 2) * PARENT_DED;

  // 重度障礙
  const disabledDed = disabled * DISABLED_DED;

  // 受扶養兄弟姊妹/祖父母
  const otherDepDed = otherDep * OTHER_DEP_DED;

  const totalDed = EXEMPT + funeralDed + spouseDed + linealDed + parentDed + disabledDed + otherDepDed;

  const taxableEstate = Math.max(0, estateTotal - totalDed);

  // 累進稅率
  let tax = 0;
  if (taxableEstate <= 50_000_000) {
    tax = taxableEstate * 0.10;
  } else if (taxableEstate <= 100_000_000) {
    tax = 50_000_000 * 0.10 + (taxableEstate - 50_000_000) * 0.15;
  } else {
    tax = 50_000_000 * 0.10 + 50_000_000 * 0.15 + (taxableEstate - 100_000_000) * 0.20;
  }

  const effectiveRate = estateTotal > 0 ? tax / estateTotal : 0;

  return {
    estateTotal,
    funeralDed,
    spouseDed,
    linealDed,
    parentDed,
    disabledDed,
    otherDepDed,
    totalDed,
    taxableEstate,
    tax,
    effectiveRate,
  };
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

function fmtWan(n: number): string {
  const wan = n / 10_000;
  return wan >= 10000
    ? `${(wan / 10000).toFixed(2)}億`
    : `${wan.toFixed(wan >= 100 ? 0 : 1)}萬`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/inheritance-tax", label: "遺產稅", active: true },
  { href: "/gift-tax", label: "贈與稅" },
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
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
];

// 情境比較表
const SCENARIOS = [
  { label: "遺產 500 萬", estateWan: 500, desc: "免稅（遠低於免稅額）" },
  { label: "遺產 1,500 萬", estateWan: 1500, desc: "標準配置（1子女+配偶）" },
  { label: "遺產 3,000 萬", estateWan: 3000, desc: "中等規模" },
  { label: "遺產 5,000 萬", estateWan: 5000, desc: "較大遺產" },
  { label: "遺產 1 億", estateWan: 10000, desc: "高資產" },
];

function scenarioTax(estateWan: number): number {
  // 情境假設：有配偶+1成年子女，喪葬費138.3萬
  const r = calcInheritanceTax({
    estateWan,
    funeralWan: 138.3,
    hasSpouse: true,
    adultChildren: 1,
    minorChildren: 0,
    avgMinorAge: 10,
    parents: 0,
    disabled: 0,
    otherDep: 0,
  });
  return r.tax;
}

export default function InheritanceTaxPage() {
  const [estateWan, setEstateWan] = useState(3000);
  const [funeralWan, setFuneralWan] = useState(138.3);
  const [hasSpouse, setHasSpouse] = useState(true);
  const [adultChildren, setAdultChildren] = useState(1);
  const [minorChildren, setMinorChildren] = useState(0);
  const [avgMinorAge, setAvgMinorAge] = useState(10);
  const [parents, setParents] = useState(0);
  const [disabled, setDisabled] = useState(0);
  const [otherDep, setOtherDep] = useState(0);

  const result = useMemo(
    () =>
      calcInheritanceTax({
        estateWan,
        funeralWan,
        hasSpouse,
        adultChildren,
        minorChildren,
        avgMinorAge,
        parents,
        disabled,
        otherDep,
      }),
    [estateWan, funeralWan, hasSpouse, adultChildren, minorChildren, avgMinorAge, parents, disabled, otherDep]
  );

  return (
    <main className="flex flex-col gap-6 px-4 py-6">
      {/* Nav */}
      <nav className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
              l.active
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">遺產稅計算機</h1>
        <p className="mt-1 text-sm text-gray-500">
          輸入遺產金額與繼承人結構，自動計算各項扣除額與應繳稅額。依財政部 114 年度標準。
        </p>
      </header>

      {/* Inputs */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">遺產與繼承人資料</h2>

        {/* 遺產總額 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            遺產總額（萬元）
            <span className="ml-1 text-xs font-normal text-gray-400">
              不動產用公告現值＋評定現值，非市價
            </span>
          </label>
          <input
            type="number"
            min={0}
            value={estateWan}
            onChange={(e) => setEstateWan(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
          <p className="mt-1 text-right text-xs text-gray-400">{fmt(estateWan * 10_000)}</p>
        </div>

        {/* 喪葬費 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            喪葬費扣除額（萬元，上限 138.3 萬）
          </label>
          <input
            type="number"
            min={0}
            max={138.3}
            step={0.1}
            value={funeralWan}
            onChange={(e) => setFuneralWan(Math.min(138.3, Math.max(0, Number(e.target.value))))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div className="mb-3 border-t border-gray-100 pt-3">
          <p className="mb-3 text-sm font-medium text-gray-700">繼承人結構（勾選適用項目）</p>

          {/* 配偶 */}
          <label className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">
              配偶
              <span className="ml-2 text-xs text-purple-600">扣除 553 萬</span>
            </span>
            <input
              type="checkbox"
              checked={hasSpouse}
              onChange={(e) => setHasSpouse(e.target.checked)}
              className="h-4 w-4 accent-purple-600"
            />
          </label>

          {/* 成年子女 */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">
              成年子女（滿 20 歲）
              <span className="ml-2 text-xs text-purple-600">每人扣除 55.3 萬</span>
            </span>
            <input
              type="number"
              min={0}
              max={20}
              value={adultChildren}
              onChange={(e) => setAdultChildren(Math.max(0, Math.min(20, Number(e.target.value))))}
              className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* 未成年子女 */}
          <div className="mb-2 rounded-xl bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                未成年子女（未滿 20 歲）
                <span className="ml-2 text-xs text-purple-600">每人 55.3 萬 + 每差 1 歲再加 55.3 萬</span>
              </span>
              <input
                type="number"
                min={0}
                max={10}
                value={minorChildren}
                onChange={(e) => setMinorChildren(Math.max(0, Math.min(10, Number(e.target.value))))}
                className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
              />
            </div>
            {minorChildren > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-500">未成年子女平均年齡：</span>
                <input
                  type="number"
                  min={0}
                  max={19}
                  value={avgMinorAge}
                  onChange={(e) => setAvgMinorAge(Math.max(0, Math.min(19, Number(e.target.value))))}
                  className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
                />
                <span className="text-xs text-gray-500">歲</span>
              </div>
            )}
          </div>

          {/* 父母 */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">
              父母（0–2 人）
              <span className="ml-2 text-xs text-purple-600">每人扣除 123.3 萬</span>
            </span>
            <input
              type="number"
              min={0}
              max={2}
              value={parents}
              onChange={(e) => setParents(Math.max(0, Math.min(2, Number(e.target.value))))}
              className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* 重度障礙 */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">
              重度以上身心障礙繼承人
              <span className="ml-2 text-xs text-purple-600">每人扣除 693 萬</span>
            </span>
            <input
              type="number"
              min={0}
              max={10}
              value={disabled}
              onChange={(e) => setDisabled(Math.max(0, Math.min(10, Number(e.target.value))))}
              className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* 受扶養兄弟姊妹/祖父母 */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">
              受扶養兄弟姊妹或祖父母
              <span className="ml-2 text-xs text-purple-600">每人扣除 55.3 萬</span>
            </span>
            <input
              type="number"
              min={0}
              max={20}
              value={otherDep}
              onChange={(e) => setOtherDep(Math.max(0, Math.min(20, Number(e.target.value))))}
              className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">試算結果</h2>

        {/* Deduction breakdown */}
        <div className="mb-4 rounded-xl bg-gray-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">扣除額明細</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">免稅額</span>
              <span className="font-medium text-gray-800">{fmtWan(EXEMPT)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">喪葬費扣除額</span>
              <span className="font-medium text-gray-800">{fmtWan(result.funeralDed)}</span>
            </div>
            {result.spouseDed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">配偶扣除額</span>
                <span className="font-medium text-gray-800">{fmtWan(result.spouseDed)}</span>
              </div>
            )}
            {result.linealDed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">直系血親卑親屬扣除額</span>
                <span className="font-medium text-gray-800">{fmtWan(result.linealDed)}</span>
              </div>
            )}
            {result.parentDed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">父母扣除額</span>
                <span className="font-medium text-gray-800">{fmtWan(result.parentDed)}</span>
              </div>
            )}
            {result.disabledDed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">重度身心障礙扣除額</span>
                <span className="font-medium text-gray-800">{fmtWan(result.disabledDed)}</span>
              </div>
            )}
            {result.otherDepDed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">受扶養兄弟姊妹/祖父母扣除額</span>
                <span className="font-medium text-gray-800">{fmtWan(result.otherDepDed)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-1.5 font-semibold">
              <span className="text-gray-700">合計扣除額</span>
              <span className="text-purple-700">{fmtWan(result.totalDed)}</span>
            </div>
          </div>
        </div>

        {/* Tax result */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-xs text-gray-500">課稅遺產淨額</p>
            <p className="mt-1 text-lg font-bold text-gray-800">
              {result.taxableEstate === 0 ? "0（免稅）" : fmtWan(result.taxableEstate)}
            </p>
          </div>
          <div className={`rounded-xl p-4 text-center ${result.tax === 0 ? "bg-emerald-50" : "bg-red-50"}`}>
            <p className="text-xs text-gray-500">應繳遺產稅</p>
            <p className={`mt-1 text-lg font-bold ${result.tax === 0 ? "text-emerald-700" : "text-red-600"}`}>
              {result.tax === 0 ? "免稅！" : fmt(result.tax)}
            </p>
          </div>
        </div>
        {result.tax > 0 && (
          <div className="rounded-xl bg-purple-50 p-3 text-center">
            <p className="text-xs text-gray-500">有效稅率（稅額 ÷ 遺產總額）</p>
            <p className="mt-0.5 text-base font-bold text-purple-700">
              {(result.effectiveRate * 100).toFixed(2)}%
            </p>
          </div>
        )}
        {result.taxableEstate === 0 && (
          <p className="mt-2 rounded-xl bg-emerald-50 p-3 text-center text-sm text-emerald-700">
            遺產總額低於各項扣除額合計，不需繳遺產稅。但仍需依法申報，才能辦理繼承過戶。
          </p>
        )}
      </section>

      <AdUnit className="my-1" />

      {/* Scenario comparison */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-gray-800">情境比較表</h2>
        <p className="mb-4 text-xs text-gray-400">假設條件：有配偶 + 1 位成年子女，喪葬費 138.3 萬</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs text-gray-400">遺產規模</th>
                <th className="pb-2 text-right text-xs text-gray-400">應繳稅額</th>
                <th className="pb-2 text-right text-xs text-gray-400">有效稅率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SCENARIOS.map((s) => {
                const tax = scenarioTax(s.estateWan);
                const rate = s.estateWan > 0 ? tax / (s.estateWan * 10_000) : 0;
                return (
                  <tr key={s.label} className="hover:bg-gray-50">
                    <td className="py-2.5 text-gray-700">
                      {s.label}
                      <span className="ml-1 text-xs text-gray-400">{s.desc}</span>
                    </td>
                    <td className="py-2.5 text-right font-medium text-gray-800">
                      {tax === 0 ? (
                        <span className="text-emerald-600">0（免稅）</span>
                      ) : (
                        fmtWan(tax)
                      )}
                    </td>
                    <td className="py-2.5 text-right text-gray-600">
                      {tax === 0 ? "0%" : `${(rate * 100).toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tax tips */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">4 大合法節稅策略</h2>
        <div className="space-y-3">
          <div className="rounded-xl border-l-4 border-purple-400 bg-purple-50 p-4">
            <p className="text-sm font-semibold text-purple-800">1. 提早規劃贈與，善用每年 244 萬免稅額</p>
            <p className="mt-1 text-xs text-gray-600">
              每人每年可贈與 244 萬不用繳贈與稅，夫妻兩人每年合計可贈與 488 萬。提早贈與，把資產提前移轉給下一代，可大幅降低未來遺產總額。
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-800">2. 不動產申報用公告現值，不是市價</p>
            <p className="mt-1 text-xs text-gray-600">
              遺產中的土地以「公告現值」計算、房屋以「課稅現值（評定現值）」計算，通常遠低於市價。一間市值 3,000 萬的台北市房，實際計入遺產的金額可能只有數百萬。
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-teal-400 bg-teal-50 p-4">
            <p className="text-sm font-semibold text-teal-800">3. 規劃保險，保險金不計入遺產</p>
            <p className="mt-1 text-xs text-gray-600">
              指定受益人的人壽保險理賠金，原則上不計入遺產（但需注意「實質課稅原則」，保費過高或身故前短期大額投保可能被國稅局認定）。
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-orange-400 bg-orange-50 p-4">
            <p className="text-sm font-semibold text-orange-800">4. 設立信託或公益捐贈</p>
            <p className="mt-1 text-xs text-gray-600">
              捐贈給公益法人、政府的財產可全額扣除遺產稅。公益信託也是高資產家庭常見的稅務規劃工具，建議諮詢專業會計師或律師評估適合性。
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate CTA */}
      <TaxAffiliateCTA />

      {/* FAQ */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">常見問題</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">Q：台灣遺產稅免稅額是多少？</p>
            <p className="mt-1 text-sm text-gray-600">
              根據財政部 114 年度規定，免稅額為 1,333 萬元，加上喪葬費 138.3 萬、配偶 553 萬等扣除額，一個有配偶與子女的一般家庭，遺產總額在 2,000 萬以內通常免稅。
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Q：遺產稅稅率是多少？</p>
            <p className="mt-1 text-sm text-gray-600">
              分三級累進：課稅遺產淨額 5,000 萬以下課 10%；5,000 萬至 1 億課 15%；超過 1 億課 20%。有效稅率通常遠低於最高級距。
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Q：房子算遺產嗎？要用市價嗎？</p>
            <p className="mt-1 text-sm text-gray-600">
              房子算入遺產，但土地用「公告現值」、房屋用「評定現值」計算，通常只有市價的 10–40%。台北市精華區一間市值 3,000 萬的房，計入遺產可能不到 800 萬。
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Q：不用繳稅也要申報嗎？</p>
            <p className="mt-1 text-sm text-gray-600">
              是的。即使估計不用繳稅，仍需在死亡後 6 個月內（可延期 3 個月）向稅務局申報，取得「遺產稅繳清證明書」或「免稅同意書」，才能辦理繼承不動產過戶。
            </p>
          </div>
        </div>
      </section>

      {/* Related calculators */}
      <section className="rounded-2xl bg-gray-50 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">相關計算機</p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/real-estate-tax"
            className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            房地合一稅計算機
          </Link>
          <Link
            href="/tax-calculator"
            className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            綜所稅試算
          </Link>
          <Link
            href="/dependent-deduction"
            className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            扶養節稅計算機
          </Link>
          <Link
            href="/mortgage"
            className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            房貸計算機
          </Link>
        </div>
      </section>
    </main>
  );
}
