"use client";

import { useState, useEffect } from "react";
import { useTaxCalc } from "@/hooks/use-tax-calc";
import { IncomeSection } from "@/components/tax-calculator/income-section";
import { PersonalSection } from "@/components/tax-calculator/personal-section";
import { DeductionSection } from "@/components/tax-calculator/deduction-section";
import dynamic from "next/dynamic";
import { TipsSection } from "@/components/tax-calculator/tips-section";
import { EmailCTA } from "@/components/email-cta";
import { AdUnit } from "@/components/ad-unit";
import Link from "next/link";

const ResultSection = dynamic(
  () => import("@/components/tax-calculator/result-section").then(m => ({ default: m.ResultSection })),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-2xl bg-gray-100" /> }
);

const STEPS = [
  { id: "income", label: "所得", icon: "💰" },
  { id: "personal", label: "個人", icon: "👤" },
  { id: "deduction", label: "扣除額", icon: "📋" },
  { id: "result", label: "結果", icon: "📊" },
  { id: "tips", label: "建議", icon: "💡" },
];

export default function TaxCalculatorPage() {
  const tc = useTaxCalc();
  const [activeSection, setActiveSection] = useState("income");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    for (const step of STEPS) {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pb-10">
      {/* 工具切換 */}
      <div className="flex gap-2 overflow-x-auto bg-white px-4 pt-4 pb-2 text-sm">
        <Link href="/" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          財務自由
        </Link>
        <span className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1 font-medium text-white">
          報稅計算
        </span>
        <Link href="/mortgage" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          房貸計算
        </Link>
        <Link href="/overtime-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          加班費
        </Link>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-4 pb-12 pt-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm transition hover:bg-white/25">
            ← 回首頁
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            2026 報稅版 — 自由工作者計算器
          </h1>
          <p className="mt-2 text-sm text-blue-100">
            114 年度所得 · 2026 年 5 月申報
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["40+ 職業費率", "標準vs列舉比較", "省稅建議"].map(tag => (
              <span key={tag} className="rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-0 z-30 -mt-6 px-4">
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-lg shadow-black/5 ring-1 ring-black/5">
          {STEPS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-center transition-all ${
                activeSection === s.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-sm">{s.icon}</span>
              <span className="text-xs font-medium leading-tight">{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 px-4">
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5">
          <span className="mt-0.5 text-sm">⚠️</span>
          <p className="text-xs leading-relaxed text-amber-700">
            本工具僅供參考，<strong>不構成稅務建議</strong>。實際稅額以國稅局核定為準。
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-5 space-y-5 px-4">
        <div id="income">
          <IncomeSection
            workerType={tc.workerType}
            incomeSources={tc.incomeSources}
            onWorkerTypeChange={tc.setWorkerType}
            onAddSource={tc.addIncomeSource}
            onRemoveSource={tc.removeIncomeSource}
            onUpdateSource={tc.updateIncomeSource}
          />
        </div>

        <div id="personal">
          <PersonalSection
            maritalStatus={tc.maritalStatus}
            filingAge={tc.filingAge}
            spouseAge={tc.spouseAge}
            dependents={tc.dependents}
            hasDisability={tc.hasDisability}
            spouseHasDisability={tc.spouseHasDisability}
            hasEducationExpense={tc.hasEducationExpense}
            educationExpenseCount={tc.educationExpenseCount}
            onSetMaritalStatus={tc.setMaritalStatus}
            onSetFilingAge={tc.setFilingAge}
            onSetSpouseAge={tc.setSpouseAge}
            onAddDependent={tc.addDependent}
            onRemoveDependent={tc.removeDependent}
            onUpdateDependent={tc.updateDependent}
            onSetHasDisability={tc.setHasDisability}
            onSetSpouseHasDisability={tc.setSpouseHasDisability}
            onSetHasEducationExpense={tc.setHasEducationExpense}
            onSetEducationExpenseCount={tc.setEducationExpenseCount}
          />
        </div>

        <div id="deduction">
          <DeductionSection
            deductionMethod={tc.deductionMethod}
            itemizedDeductions={tc.itemizedDeductions}
            claimRentalDeduction={tc.claimRentalDeduction}
            rentalAmount={tc.rentalAmount}
            result={tc.result}
            onSetDeductionMethod={tc.setDeductionMethod}
            onUpdateItemized={tc.updateItemized}
            onSetClaimRentalDeduction={tc.setClaimRentalDeduction}
            onSetRentalAmount={tc.setRentalAmount}
          />
        </div>

        <div id="result">
          <ResultSection result={tc.result} />
        </div>

        {/* Ad between result and tips */}
        <AdUnit className="my-2" />

        {/* Email CTA after results */}
        <EmailCTA />

        <div id="tips">
          <TipsSection tips={tc.result.tips} result={tc.result} />
        </div>

        {/* Ad after tips */}
        <AdUnit className="my-2" />
      </div>

      {/* Footer */}
      <div className="mt-8 px-4">
        <div className="rounded-2xl bg-gray-100 p-5 text-center">
          <p className="text-xs text-gray-500">
            本工具僅供個人報稅參考，<strong>不構成稅務建議</strong>。稅額以國稅局核定為準。
          </p>
          <Link href="/" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            探索更多財務工具 →
          </Link>
        </div>
      </div>
    </div>
  );
}
