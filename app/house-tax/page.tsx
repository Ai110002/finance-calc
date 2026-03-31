"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 房屋稅規則（財政部 114 年度）────────────────────────────────────────────
// 房屋稅 = 房屋評定現值 × 適用稅率
//
// 稅率（依房屋使用類別）：
//   自住住家用（本人/配偶/直系親屬）：1.2%
//     ※ 全國僅限 3 戶以內；第 4 戶起改按非自住計算
//   非自住住家用（出租、空置）— 依全國持有戶數累進：
//     第 1 戶：2.0%
//     第 2 戶：3.2%
//     第 3 戶以上：4.8%
//   商業/營業用：3.0%
//
// 徵收期間：每年 5 月 1 日至 5 月 31 日
// 稅基：房屋評定現值（≠ 市價，通常遠低於市價）
// ─────────────────────────────────────────────────────────────────────────────

type UseType = "self" | "rental1" | "rental2" | "rental3plus" | "commercial";

const TAX_RATES: Record<UseType, number> = {
  self: 0.012,
  rental1: 0.02,
  rental2: 0.032,
  rental3plus: 0.048,
  commercial: 0.03,
};

const USE_LABELS: Record<UseType, string> = {
  self: "自住住家用（本人/配偶/直系親屬）",
  rental1: "非自住（持有第 1 戶）",
  rental2: "非自住（持有第 2 戶）",
  rental3plus: "非自住（持有第 3 戶以上）",
  commercial: "商業/營業用",
};

interface HouseTaxResult {
  assessedValue: number;
  taxRate: number;
  annualTax: number;
  monthlyEquivalent: number;
}

function calcHouseTax(assessedWan: number, useType: UseType): HouseTaxResult {
  const assessedValue = assessedWan * 10_000;
  const taxRate = TAX_RATES[useType];
  const annualTax = assessedValue * taxRate;
  return {
    assessedValue,
    taxRate,
    annualTax,
    monthlyEquivalent: annualTax / 12,
  };
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅", active: true },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/inheritance-tax", label: "遺產稅" },
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

// 情境比較：以各類稅率×評定現值 300 萬（台北市常見中古屋）為基準
const SCENARIOS: { label: string; assessedWan: number; useType: UseType }[] = [
  { label: "評定 100 萬｜自住", assessedWan: 100, useType: "self" },
  { label: "評定 300 萬｜自住", assessedWan: 300, useType: "self" },
  { label: "評定 300 萬｜出租（1 戶）", assessedWan: 300, useType: "rental1" },
  { label: "評定 300 萬｜出租（2 戶）", assessedWan: 300, useType: "rental2" },
  { label: "評定 500 萬｜自住", assessedWan: 500, useType: "self" },
  { label: "評定 500 萬｜出租（3 戶以上）", assessedWan: 500, useType: "rental3plus" },
];

export default function HouseTaxPage() {
  const [assessedWan, setAssessedWan] = useState(300);
  const [useType, setUseType] = useState<UseType>("self");

  const result = useMemo(
    () => calcHouseTax(assessedWan, useType),
    [assessedWan, useType]
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
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">房屋稅計算機</h1>
        <p className="mt-1 text-sm text-gray-500">
          輸入房屋評定現值，立即計算每年應繳房屋稅。依財政部 114 年度標準，5 月開徵。
        </p>
      </header>

      {/* Ad */}
      <AdUnit />

      {/* 說明卡：評定現值 vs 市價 */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">📋 什麼是「房屋評定現值」？</p>
        <p className="text-xs leading-relaxed text-blue-800">
          不是市價，而是稅務機關依房屋標準單價、面積、屋齡計算的課稅依據。
          市價 2,000 萬的台北房子，評定現值通常只有{" "}
          <strong>100 萬 ～ 500 萬</strong>。
          數字看房屋稅單（每年 5 月寄到府）或到國稅局查詢。
        </p>
      </section>

      {/* Inputs */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">房屋資料</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            房屋評定現值（萬元）
            <span className="ml-1 text-xs font-normal text-gray-400">
              見房屋稅單或向國稅局查詢
            </span>
          </label>
          <input
            type="number"
            min={0}
            value={assessedWan}
            onChange={(e) => setAssessedWan(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            NT${(assessedWan * 10_000).toLocaleString("zh-TW")}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            房屋使用類別
          </label>
          <div className="space-y-2">
            {(Object.keys(USE_LABELS) as UseType[]).map((key) => (
              <label
                key={key}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition ${
                  useType === key
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="text-sm text-gray-700">{USE_LABELS[key]}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-600">
                    {(TAX_RATES[key] * 100).toFixed(1)}%
                  </span>
                  <input
                    type="radio"
                    name="useType"
                    value={key}
                    checked={useType === key}
                    onChange={() => setUseType(key)}
                    className="h-4 w-4 accent-orange-500"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">計算結果</h2>

        <div className="space-y-1 text-sm mb-4">
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500">房屋評定現值</span>
            <span className="font-medium">{fmt(result.assessedValue)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500">適用稅率</span>
            <span className="font-medium text-orange-600">
              {(result.taxRate * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-orange-50 p-4 text-center mb-3">
          <p className="text-xs text-gray-500">每年應繳房屋稅</p>
          <p className="mt-1 text-3xl font-bold text-orange-600">{fmt(result.annualTax)}</p>
          <p className="mt-1 text-xs text-gray-400">
            約每月 {fmt(result.monthlyEquivalent)}（5 月一次繳清）
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
          <p className="font-medium text-gray-700 mb-1">計算公式</p>
          <p>房屋稅 = 房屋評定現值 × 稅率</p>
          <p className="mt-1">
            = NT${(assessedWan * 10_000).toLocaleString("zh-TW")} × {(result.taxRate * 100).toFixed(1)}%
            {" "}= {fmt(result.annualTax)}
          </p>
        </div>
      </section>

      {/* 情境比較 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">常見情境比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="pb-2 text-left">情境</th>
                <th className="pb-2 text-right">稅率</th>
                <th className="pb-2 text-right">年繳稅額</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => {
                const r = calcHouseTax(s.assessedWan, s.useType);
                const isActive =
                  assessedWan === s.assessedWan && useType === s.useType;
                return (
                  <tr
                    key={s.label}
                    className={`border-b border-gray-50 ${isActive ? "bg-orange-50" : ""}`}
                  >
                    <td className="py-2 text-xs text-gray-600">{s.label}</td>
                    <td className="py-2 text-right text-xs text-orange-600 font-semibold">
                      {(r.taxRate * 100).toFixed(1)}%
                    </td>
                    <td className="py-2 text-right font-semibold text-gray-800">
                      {fmt(r.annualTax)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 節稅策略 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">4 大合法節稅策略</h2>
        <div className="space-y-3">
          {[
            {
              title: "① 申請自住優惠稅率（最省稅）",
              desc: "本人、配偶或直系親屬實際居住，向稅務機關申報自住，稅率從 2-4.8% 降至 1.2%。每年省下的稅額差異極大，出租後若自住可立即申請切換。",
              color: "border-orange-200 bg-orange-50",
            },
            {
              title: "② 確認評定現值是否正確",
              desc: "評定現值每 3 年重新評定一次。若房屋有拆除、改建或長期閒置，可申請重新評定，有機會降低評定現值，進而降低稅額。",
              color: "border-amber-200 bg-amber-50",
            },
            {
              title: "③ 注意持有戶數（非自住累進）",
              desc: "非自住房屋依全國持有戶數累進課稅（2% / 3.2% / 4.8%）。若名下有多戶，將出租的房屋移至配偶名下分散持有，可降低累進稅率。",
              color: "border-yellow-200 bg-yellow-50",
            },
            {
              title: "④ 老舊房屋申請減免",
              desc: "屋齡 30 年以上且有修繕需求的房屋，部分縣市提供減免申請。另外，低收入戶、身心障礙者也有優惠稅率可申請。",
              color: "border-green-200 bg-green-50",
            },
          ].map((item) => (
            <div key={item.title} className={`rounded-xl border p-4 ${item.color}`}>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate CTA */}
      <TaxAffiliateCTA />

      {/* Ad */}
      <AdUnit />

      {/* 相關工具 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">相關計算工具</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/real-estate-tax"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            房地合一稅計算機 →
          </Link>
          <Link
            href="/mortgage"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            房貸計算機 →
          </Link>
          <Link
            href="/buy-vs-rent"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            買房 vs 租房計算機 →
          </Link>
          <Link
            href="/mortgage-full-cost"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            買房總費用計算機 →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">常見問題</h2>
        <div className="space-y-4">
          {[
            {
              q: "房屋稅和地價稅有什麼不同？",
              a: "房屋稅針對「建物」課徵，每年 5 月繳交；地價稅針對「土地」課徵，每年 11 月繳交。買房之後兩種稅都要繳，但都是以評定現值/公告現值計算，非市價，金額通常不大。",
            },
            {
              q: "自住稅率 1.2% 怎麼申請？",
              a: "本人、配偶或直系親屬（父母、子女、孫子女）實際居住，且房屋未出租、未供營業使用，可向當地稅捐處申請自住優惠稅率。通常只需填一張申請書，當年即可適用，無須每年重複申請。",
            },
            {
              q: "租金所得需要繳房屋稅嗎？",
              a: "房屋稅由房屋所有權人（房東）繳交，出租或自住都要繳，差別在稅率。出租的房屋從自住的 1.2% 變成非自住的 2%～4.8%，這是租房成本的一部分。租金所得另外要在報稅季申報綜合所得稅。",
            },
            {
              q: "房屋稅什麼時候繳？可以分期嗎？",
              a: "房屋稅每年 5 月 1 日至 5 月 31 日為繳納期間，原則一次繳清。部分縣市提供分期繳納（如台北市稅額 2 萬元以上可申請分期），詳情洽當地稅捐處。",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-800">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-4 text-center text-xs text-gray-400">
        本工具依財政部 114 年度房屋稅標準計算，僅供參考。
        <br />
        各縣市稅率可能略有差異，實際稅額以稅捐處核定為準。
      </footer>
    </main>
  );
}
