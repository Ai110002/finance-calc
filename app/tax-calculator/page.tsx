"use client";

import { useTaxCalc } from "@/hooks/use-tax-calc";
import { IncomeSection } from "@/components/tax-calculator/income-section";
import { PersonalSection } from "@/components/tax-calculator/personal-section";
import { DeductionSection } from "@/components/tax-calculator/deduction-section";
import dynamic from "next/dynamic";
import { TipsSection } from "@/components/tax-calculator/tips-section";
import Link from "next/link";

const ResultSection = dynamic(
  () => import("@/components/tax-calculator/result-section").then(m => ({ default: m.ResultSection })),
  { ssr: false }
);

export default function TaxCalculatorPage() {
  const tc = useTaxCalc();

  return (
    <div className="space-y-5 px-4 pt-8 pb-8">
      {/* Header */}
      <div className="text-center">
        <Link href="/" className="text-xs text-blue-500 hover:underline">← 回首頁</Link>
        <h1 className="mt-2 text-2xl font-bold">自由工作者報稅計算器</h1>
        <p className="mt-1 text-sm text-gray-500">2026 年度（114 年）所得稅試算</p>
      </div>

      {/* Nav */}
      <div className="flex gap-2 overflow-x-auto text-xs">
        {[
          { id: "income", label: "①所得" },
          { id: "personal", label: "②個人" },
          { id: "deduction", label: "③扣除額" },
          { id: "result", label: "④結果" },
          { id: "tips", label: "⑤建議" },
        ].map((s) => (
          <a key={s.id} href={`#${s.id}`}
            className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 shadow-sm hover:bg-blue-50"
          >{s.label}</a>
        ))}
      </div>

      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
        本工具僅供參考，<strong>不構成稅務建議</strong>。實際稅額以國稅局核定為準。建議搭配專業會計師確認。
      </div>

      {/* Section 1: 所得輸入 */}
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

      {/* Section 2: 個人資訊 */}
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

      {/* Section 3: 扣除額 */}
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

      {/* Section 4: 結果 */}
      <div id="result">
        <ResultSection result={tc.result} />
      </div>

      {/* Section 5: 省稅建議 */}
      <div id="tips">
        <TipsSection tips={tc.result.tips} result={tc.result} />
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <div className="rounded-xl bg-gray-100 p-4 text-center text-xs text-gray-500">
          本工具僅供個人報稅參考，<strong>不構成稅務建議</strong>。稅額以國稅局核定為準。
          <br />
          <Link href="/" className="mt-2 inline-block text-blue-500 hover:underline">
            更多財務工具 →
          </Link>
        </div>
      </div>
    </div>
  );
}
