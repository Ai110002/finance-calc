/** 所得來源類型 */
export type IncomeType = "salary" | "9A" | "9B" | "50" | "rental" | "dividend" | "other";

/** 工作者身份 */
export type WorkerType = "employee" | "freelancer" | "mixed";

/** 婚姻狀態 */
export type MaritalStatus = "single" | "married";

/** 扣除額方式 */
export type DeductionMethod = "standard" | "itemized";

/** 單筆所得來源 */
export interface IncomeSource {
  id: string;
  type: IncomeType;
  label: string;
  grossAmount: number;
  /** 9A 職業代碼 */
  professionCode?: string;
  /** 9A 費用率 (0~1) */
  expenseRate?: number;
  /** 計算後淨所得 */
  netIncome: number;
}

/** 扶養親屬 */
export interface Dependent {
  id: string;
  relationship: "child" | "parent" | "grandparent" | "disabled" | "other";
  label: string;
  age: number;
  /** 是否 70 歲以上 */
  isSenior: boolean;
  /** 是否就學中 */
  isStudent: boolean;
  /** 幼兒學前（5 歲以下） */
  isPreschool: boolean;
  /** 第幾個幼兒（用於計算加碼） */
  preschoolOrder?: number;
}

/** 列舉扣除項目 */
export interface ItemizedDeductions {
  insurance: number;        // 保險費（每人上限 24,000）
  medicalExpense: number;   // 醫藥及生育費（無上限）
  disasterLoss: number;     // 災害損失
  donation: number;         // 捐贈（一般上限 20%）
  politicalDonation: number; // 政治捐贈
  rentalExpense: number;    // 房租支出（上限 180,000）
  mortgageInterest: number; // 自用住宅購屋借款利息（上限 300,000）
}

/** 特別扣除額（大多自動計算） */
export interface SpecialDeductions {
  salaryDeduction: number;      // 薪資所得特別扣除額
  disabilityDeduction: number;  // 身心障礙特別扣除額
  educationDeduction: number;   // 教育學費特別扣除額
  preschoolDeduction: number;   // 幼兒學前特別扣除額
  rentalDeduction: number;      // 租金支出特別扣除額（2026 新制）
}

/** 稅務計算輸入 */
export interface TaxInput {
  workerType: WorkerType;
  incomeSources: IncomeSource[];
  maritalStatus: MaritalStatus;
  filingAge: number;
  spouseAge: number;
  dependents: Dependent[];
  deductionMethod: DeductionMethod;
  itemizedDeductions: ItemizedDeductions;
  /** 是否申報租金特別扣除額 */
  claimRentalDeduction: boolean;
  rentalAmount: number;
  /** 有無身心障礙 */
  hasDisability: boolean;
  spouseHasDisability: boolean;
  /** 有無教育學費 */
  hasEducationExpense: boolean;
  educationExpenseCount: number;
}

/** 稅率級距 */
export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
  progressiveDifference: number;
}

/** 二代健保計算結果 */
export interface NHIResult {
  supplementaryPremium: number;
  details: { source: string; amount: number; premium: number }[];
}

/** 勞健保估算結果 */
export interface UnionInsuranceResult {
  laborInsurance: number;
  healthInsurance: number;
  monthlyTotal: number;
  annualTotal: number;
}

/** 省稅建議 */
export interface TaxTip {
  id: string;
  title: string;
  description: string;
  potentialSavings?: number;
  category: "deduction" | "income" | "insurance" | "general";
}

/** 完整計算結果 */
export interface TaxResult {
  /** 各來源淨所得 */
  incomeBySource: { type: IncomeType; label: string; gross: number; expense: number; net: number }[];
  totalGrossIncome: number;
  totalNetIncome: number;

  /** 免稅額 */
  exemptionAmount: number;
  exemptionDetail: { label: string; amount: number }[];

  /** 扣除額 */
  standardDeduction: number;
  itemizedDeductionTotal: number;
  appliedDeduction: number;
  deductionMethod: DeductionMethod;
  /** 比較差額 */
  deductionDifference: number;

  /** 特別扣除額 */
  specialDeductions: SpecialDeductions;
  specialDeductionTotal: number;

  /** 基本生活費 */
  basicLivingExpense: number;
  basicLivingDifference: number;

  /** 綜合所得淨額 */
  taxableIncome: number;

  /** 應納稅額 */
  taxAmount: number;
  effectiveRate: number;
  marginalRate: number;
  bracketBreakdown: { bracket: string; amount: number; rate: number; tax: number }[];

  /** 租金扣除額排除警告 */
  rentalDeductionWarning: string | null;

  /** 二代健保 */
  nhiResult: NHIResult;

  /** 勞健保（工會） */
  unionInsurance: UnionInsuranceResult;

  /** 省稅建議 */
  tips: TaxTip[];
}

/** 9A 職業費率 */
export interface ProfessionRate {
  code: string;
  name: string;
  rate: number;
  category: string;
}
