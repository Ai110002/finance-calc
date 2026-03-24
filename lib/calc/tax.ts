import type {
  TaxInput, TaxResult, IncomeSource, NHIResult,
  UnionInsuranceResult, TaxTip, SpecialDeductions,
} from "../tax-types";
import {
  TAX_BRACKETS, EXEMPTION_AMOUNT, EXEMPTION_SENIOR,
  STANDARD_DEDUCTION_SINGLE, STANDARD_DEDUCTION_MARRIED,
  SALARY_SPECIAL_DEDUCTION, DISABILITY_DEDUCTION,
  EDUCATION_DEDUCTION, PRESCHOOL_DEDUCTION_FIRST,
  PRESCHOOL_DEDUCTION_EXTRA, RENTAL_SPECIAL_DEDUCTION,
  BASIC_LIVING_EXPENSE, NHI_SUPPLEMENTARY_RATE, NHI_THRESHOLD,
  NHI_SINGLE_CAP,
  INCOME_9B_EXEMPTION, INCOME_9B_EXPENSE_RATE,
  UNION_LABOR_INSURANCE_RATE, UNION_LABOR_SELF_RATIO,
  UNION_HEALTH_INSURANCE_RATE, UNION_HEALTH_SELF_RATIO,
  COMMON_INSURED_SALARIES,
  RENTAL_DEDUCTION_EXCLUSION_RATE,
} from "../tax-constants";

/* ──────────────────── 各來源淨所得 ──────────────────── */

export function computeNetIncome(source: IncomeSource): number {
  const gross = source.grossAmount;
  if (gross <= 0) return 0;

  switch (source.type) {
    case "salary":
      return gross; // 薪資不扣費用率，用薪資特別扣除額
    case "9A": {
      const rate = source.expenseRate ?? 0.20;
      return Math.round(gross * (1 - rate));
    }
    case "9B": {
      // 全年 ≤ 180,000 全免，超額部分 × 70%
      if (gross <= INCOME_9B_EXEMPTION) return 0;
      return Math.round((gross - INCOME_9B_EXEMPTION) * (1 - INCOME_9B_EXPENSE_RATE));
    }
    case "50":
      return gross; // 其他所得無費用率
    case "rental":
      return Math.round(gross * 0.57); // 租金所得 43% 必要費用
    case "dividend":
      return gross; // 股利合併或分離課稅，此處簡化為合併
    case "other":
      return gross;
    default:
      return gross;
  }
}

/* ──────────────────── 免稅額 ──────────────────── */

export function computeExemptions(input: TaxInput): { total: number; detail: { label: string; amount: number }[] } {
  const detail: { label: string; amount: number }[] = [];

  // 本人
  const selfExemption = input.filingAge >= 70 ? EXEMPTION_SENIOR : EXEMPTION_AMOUNT;
  detail.push({ label: "本人", amount: selfExemption });

  // 配偶
  if (input.maritalStatus === "married") {
    const spouseExemption = input.spouseAge >= 70 ? EXEMPTION_SENIOR : EXEMPTION_AMOUNT;
    detail.push({ label: "配偶", amount: spouseExemption });
  }

  // 扶養親屬
  for (const dep of input.dependents) {
    const amount = dep.isSenior ? EXEMPTION_SENIOR : EXEMPTION_AMOUNT;
    detail.push({ label: dep.label, amount });
  }

  return { total: detail.reduce((s, d) => s + d.amount, 0), detail };
}

/* ──────────────────── 扣除額 ──────────────────── */

export function computeStandardDeduction(input: TaxInput): number {
  return input.maritalStatus === "married"
    ? STANDARD_DEDUCTION_MARRIED
    : STANDARD_DEDUCTION_SINGLE;
}

export function computeItemizedDeductions(input: TaxInput): number {
  const d = input.itemizedDeductions;
  const numPersons = 1 + (input.maritalStatus === "married" ? 1 : 0) + input.dependents.length;

  const insurance = Math.min(d.insurance, INSURANCE_DEDUCTION_CAP_PER_PERSON * numPersons);
  const medical = d.medicalExpense; // 無上限
  const disaster = d.disasterLoss;
  const donation = d.donation; // 簡化：上限另行處理
  const political = Math.min(d.politicalDonation, 200_000);
  const rental = Math.min(d.rentalExpense, 180_000);
  const mortgage = Math.min(d.mortgageInterest, 300_000);

  // 房租與房貸利息擇一
  const housingDeduction = Math.max(rental, mortgage);

  return insurance + medical + disaster + donation + political + housingDeduction;
}

const INSURANCE_DEDUCTION_CAP_PER_PERSON = 24_000;

/* ──────────────────── 特別扣除額 ──────────────────── */

export function computeSpecialDeductions(input: TaxInput, incomeSources: IncomeSource[]): SpecialDeductions {
  // 薪資特別扣除額：有薪資所得才能用
  const hasSalary = incomeSources.some(s => s.type === "salary" && s.grossAmount > 0);
  const totalSalary = incomeSources
    .filter(s => s.type === "salary")
    .reduce((sum, s) => sum + s.grossAmount, 0);
  const salaryDeduction = hasSalary ? Math.min(totalSalary, SALARY_SPECIAL_DEDUCTION) : 0;

  // 身心障礙
  let disabilityCount = 0;
  if (input.hasDisability) disabilityCount++;
  if (input.maritalStatus === "married" && input.spouseHasDisability) disabilityCount++;
  const disabilityDeduction = disabilityCount * DISABILITY_DEDUCTION;

  // 教育學費
  const educationDeduction = input.hasEducationExpense
    ? input.educationExpenseCount * EDUCATION_DEDUCTION
    : 0;

  // 幼兒學前
  const preschoolKids = input.dependents.filter(d => d.isPreschool);
  let preschoolDeduction = 0;
  preschoolKids.forEach((_, i) => {
    preschoolDeduction += i === 0 ? PRESCHOOL_DEDUCTION_FIRST : PRESCHOOL_DEDUCTION_EXTRA;
  });

  // 租金特別扣除額（114 年度新制）
  // 排除條件：適用稅率 20% 以上者不適用（在主計算中會再檢查）
  const rentalDeduction = input.claimRentalDeduction
    ? Math.min(input.rentalAmount, RENTAL_SPECIAL_DEDUCTION)
    : 0;

  return {
    salaryDeduction,
    disabilityDeduction,
    educationDeduction,
    preschoolDeduction,
    rentalDeduction,
  };
}

/* ──────────────────── 基本生活費差額 ──────────────────── */

export function computeBasicLiving(
  input: TaxInput,
  exemption: number,
  appliedDeduction: number,
  specialTotal: number,
): { basicLiving: number; difference: number } {
  const numPersons = 1 + (input.maritalStatus === "married" ? 1 : 0) + input.dependents.length;
  const basicLiving = numPersons * BASIC_LIVING_EXPENSE;
  const compared = exemption + appliedDeduction + specialTotal;
  const difference = Math.max(0, basicLiving - compared);
  return { basicLiving, difference };
}

/* ──────────────────── 累進稅額 ──────────────────── */

export function computeTax(taxableIncome: number): {
  taxAmount: number;
  effectiveRate: number;
  marginalRate: number;
  bracketBreakdown: { bracket: string; amount: number; rate: number; tax: number }[];
} {
  if (taxableIncome <= 0) {
    return { taxAmount: 0, effectiveRate: 0, marginalRate: 0.05, bracketBreakdown: [] };
  }

  const breakdown: { bracket: string; amount: number; rate: number; tax: number }[] = [];
  let remaining = taxableIncome;
  let totalTax = 0;
  let marginalRate = 0.05;

  for (const b of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const bracketSize = b.max === Infinity ? remaining : b.max - b.min + 1;
    const taxable = Math.min(remaining, bracketSize);
    const tax = Math.round(taxable * b.rate);
    totalTax += tax;
    remaining -= taxable;
    marginalRate = b.rate;

    const maxLabel = b.max === Infinity ? "以上" : `${(b.max / 10000).toFixed(0)}萬`;
    breakdown.push({
      bracket: `${(b.min / 10000).toFixed(0)}萬 ~ ${maxLabel}`,
      amount: taxable,
      rate: b.rate,
      tax,
    });
  }

  // 用速算法驗證：稅額 = 所得淨額 × 稅率 - 累進差額
  const bracket = TAX_BRACKETS.find(b => taxableIncome <= b.max) ?? TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const quickTax = Math.round(taxableIncome * bracket.rate - bracket.progressiveDifference);
  // 使用速算結果（更精確）
  const finalTax = Math.max(0, quickTax);

  return {
    taxAmount: finalTax,
    effectiveRate: taxableIncome > 0 ? (finalTax / taxableIncome) * 100 : 0,
    marginalRate,
    bracketBreakdown: breakdown,
  };
}

/* ──────────────────── 二代健保 ──────────────────── */

export function computeNHI(incomeSources: IncomeSource[]): NHIResult {
  const details: { source: string; amount: number; premium: number }[] = [];
  let total = 0;

  for (const s of incomeSources) {
    // 薪資由雇主扣，不在這裡算
    if (s.type === "salary") continue;
    // 單筆給付未達 20,000 元門檻，不扣
    if (s.grossAmount < NHI_THRESHOLD) continue;

    // 單次給付上限 1,000 萬
    const taxableAmount = Math.min(s.grossAmount, NHI_SINGLE_CAP);
    const premium = Math.round(taxableAmount * NHI_SUPPLEMENTARY_RATE);
    details.push({ source: s.label, amount: s.grossAmount, premium });
    total += premium;
  }

  return { supplementaryPremium: total, details };
}

/* ──────────────────── 勞健保工會估算 ──────────────────── */

export function computeUnionInsurance(monthlyIncome: number): UnionInsuranceResult {
  // 找最接近的投保薪資
  const insuredSalary = COMMON_INSURED_SALARIES.reduce((prev, curr) =>
    Math.abs(curr - monthlyIncome) < Math.abs(prev - monthlyIncome) ? curr : prev
  , COMMON_INSURED_SALARIES[0]);

  const labor = Math.round(insuredSalary * UNION_LABOR_INSURANCE_RATE * UNION_LABOR_SELF_RATIO);
  const health = Math.round(insuredSalary * UNION_HEALTH_INSURANCE_RATE * UNION_HEALTH_SELF_RATIO);
  const monthly = labor + health;

  return {
    laborInsurance: labor,
    healthInsurance: health,
    monthlyTotal: monthly,
    annualTotal: monthly * 12,
  };
}

/* ──────────────────── 省稅建議 ──────────────────── */

export function generateTips(input: TaxInput, result: Omit<TaxResult, "tips">): TaxTip[] {
  const tips: TaxTip[] = [];

  // 標準 vs 列舉比較
  if (result.deductionMethod === "standard" && result.deductionDifference > 0) {
    tips.push({
      id: "itemized-better",
      title: "列舉扣除額可能更省稅",
      description: `列舉比標準多 ${formatAmount(result.deductionDifference)} 元，建議蒐集單據改用列舉。`,
      potentialSavings: Math.round(result.deductionDifference * result.marginalRate),
      category: "deduction",
    });
  }

  // 9A 費用率提醒
  const has9A = input.incomeSources.some(s => s.type === "9A");
  if (has9A) {
    tips.push({
      id: "9a-keep-receipts",
      title: "保留業務支出單據",
      description: "自由工作者可選擇用實際費用報，若費用高於費率表，可節更多稅。",
      category: "income",
    });
  }

  // 勞健保提醒
  const freelancerIncome = input.incomeSources
    .filter(s => s.type === "9A" || s.type === "9B" || s.type === "50")
    .reduce((sum, s) => sum + s.grossAmount, 0);
  if (freelancerIncome > 0) {
    tips.push({
      id: "union-insurance",
      title: "加入職業工會投保",
      description: "自由工作者可透過職業工會加勞保、健保，保費可列舉扣除，並享有勞保給付。",
      category: "insurance",
    });
  }

  // 二代健保提醒
  if (result.nhiResult.supplementaryPremium > 0) {
    tips.push({
      id: "nhi-split",
      title: "注意二代健保門檻",
      description: `你有 ${formatAmount(result.nhiResult.supplementaryPremium)} 元補充保費。若可拆分收入來源，單筆低於 2 萬可免扣。`,
      category: "insurance",
    });
  }

  // 幼兒學前
  const preschoolEligible = input.dependents.filter(d => d.age <= 5 && !d.isPreschool);
  if (preschoolEligible.length > 0) {
    tips.push({
      id: "preschool-deduction",
      title: "別忘了幼兒學前特別扣除額",
      description: `你有 ${preschoolEligible.length} 位 5 歲以下子女可能適用幼兒學前扣除額（每人最高 15 萬）。`,
      category: "deduction",
    });
  }

  // 租金扣除（2026 新制）
  if (!input.claimRentalDeduction && input.itemizedDeductions.rentalExpense > 0) {
    tips.push({
      id: "rental-new",
      title: "2026 新制：租金特別扣除額",
      description: "2026 年起，房租支出可列為「特別扣除額」（上限 18 萬），不需選列舉也能扣。",
      potentialSavings: Math.round(Math.min(input.itemizedDeductions.rentalExpense, 180_000) * result.marginalRate),
      category: "deduction",
    });
  }

  // 股利所得
  const hasDividend = input.incomeSources.some(s => s.type === "dividend" && s.grossAmount > 0);
  if (hasDividend) {
    tips.push({
      id: "dividend-separate",
      title: "股利可選分離課稅 28%",
      description: "若你的邊際稅率超過 28%，股利選擇分離課稅（28%）可能更划算。",
      category: "income",
    });
  }

  // 稅額較大，提醒分期或貸款
  if (result.taxAmount > 30_000) {
    tips.push({
      id: "tax-installment",
      title: "善用繳稅分期或信用卡",
      description: "稅額較大可用信用卡分期繳納（免手續費），或申請報稅貸款。",
      category: "general",
    });
  }

  return tips;
}

function formatAmount(n: number): string {
  return n.toLocaleString("zh-TW");
}

/* ──────────────────── 主計算函式 ──────────────────── */

export function calculateTax(input: TaxInput): TaxResult {
  // 1. 計算各來源淨所得
  const incomeBySource = input.incomeSources.map(s => {
    const net = computeNetIncome(s);
    return {
      type: s.type,
      label: s.label,
      gross: s.grossAmount,
      expense: s.grossAmount - net,
      net,
    };
  });
  const totalGrossIncome = incomeBySource.reduce((s, i) => s + i.gross, 0);
  const totalNetIncome = incomeBySource.reduce((s, i) => s + i.net, 0);

  // 2. 免稅額
  const exemptions = computeExemptions(input);

  // 3. 扣除額
  const standardDeduction = computeStandardDeduction(input);
  const itemizedTotal = computeItemizedDeductions(input);
  const deductionMethod = input.deductionMethod;
  const appliedDeduction = deductionMethod === "standard" ? standardDeduction : itemizedTotal;
  const deductionDifference = itemizedTotal - standardDeduction;

  // 4. 特別扣除額
  const specialDeductions = computeSpecialDeductions(input, input.incomeSources);
  const specialDeductionTotal =
    specialDeductions.salaryDeduction +
    specialDeductions.disabilityDeduction +
    specialDeductions.educationDeduction +
    specialDeductions.preschoolDeduction +
    specialDeductions.rentalDeduction;

  // 5. 基本生活費差額
  const { basicLiving, difference: basicLivingDifference } = computeBasicLiving(
    input, exemptions.total, appliedDeduction, specialDeductionTotal
  );

  // 6. 綜合所得淨額
  const taxableIncome = Math.max(
    0,
    totalNetIncome - exemptions.total - appliedDeduction - specialDeductionTotal - basicLivingDifference
  );

  // 7. 累進稅額
  const { taxAmount, effectiveRate, marginalRate, bracketBreakdown } = computeTax(taxableIncome);

  // 8. 二代健保
  const nhiResult = computeNHI(input.incomeSources);

  // 9. 勞健保估算
  const freelancerMonthlyIncome = input.incomeSources
    .filter(s => s.type !== "salary")
    .reduce((sum, s) => sum + s.grossAmount, 0) / 12;
  const unionInsurance = computeUnionInsurance(freelancerMonthlyIncome);

  // 租金特別扣除額排除條件檢查
  let rentalDeductionWarning: string | null = null;
  if (input.claimRentalDeduction && input.rentalAmount > 0) {
    if (marginalRate >= RENTAL_DEDUCTION_EXCLUSION_RATE) {
      rentalDeductionWarning = `注意：你的適用稅率為 ${(marginalRate * 100).toFixed(0)}%（≥ 20%），依規定可能無法適用租金特別扣除額。建議諮詢會計師確認。`;
    }
  }

  // 組裝結果（不含 tips）
  const partialResult: Omit<TaxResult, "tips"> = {
    incomeBySource,
    totalGrossIncome,
    totalNetIncome,
    exemptionAmount: exemptions.total,
    exemptionDetail: exemptions.detail,
    standardDeduction,
    itemizedDeductionTotal: itemizedTotal,
    appliedDeduction,
    deductionMethod,
    deductionDifference,
    specialDeductions,
    specialDeductionTotal,
    basicLivingExpense: basicLiving,
    basicLivingDifference,
    rentalDeductionWarning,
    taxableIncome,
    taxAmount,
    effectiveRate,
    marginalRate,
    bracketBreakdown,
    nhiResult,
    unionInsurance,
  };

  // 10. 省稅建議
  const tips = generateTips(input, partialResult);

  return { ...partialResult, tips };
}
