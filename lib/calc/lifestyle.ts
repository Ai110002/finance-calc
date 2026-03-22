/**
 * 從生活開銷反推需要多少資產
 */

export interface MonthlyExpense {
  id: string;
  label: string;
  amount: number; // 元/月
  category: "basic" | "lifestyle" | "family";
}

export interface LifeGoal {
  id: string;
  label: string;
  amount: number; // 萬
  yearsFromNow: number; // 幾年後需要
  enabled: boolean;
}

export const DEFAULT_EXPENSES: MonthlyExpense[] = [
  { id: "rent", label: "房租/房貸", amount: 0, category: "basic" },
  { id: "food", label: "伙食費", amount: 0, category: "basic" },
  { id: "transport", label: "交通", amount: 0, category: "basic" },
  { id: "insurance", label: "保險", amount: 0, category: "basic" },
  { id: "utilities", label: "水電網路", amount: 0, category: "basic" },
  { id: "clothing", label: "治裝費", amount: 0, category: "lifestyle" },
  { id: "entertainment", label: "娛樂/社交", amount: 0, category: "lifestyle" },
  { id: "travel", label: "旅遊(月均攤)", amount: 0, category: "lifestyle" },
  { id: "learning", label: "學習/進修", amount: 0, category: "lifestyle" },
  { id: "kids", label: "小孩教育/生活", amount: 0, category: "family" },
  { id: "parents", label: "孝親費", amount: 0, category: "family" },
  { id: "other", label: "其他", amount: 0, category: "basic" },
];

export const DEFAULT_GOALS: LifeGoal[] = [
  { id: "house", label: "買房頭期款", amount: 300, yearsFromNow: 5, enabled: false },
  { id: "car", label: "買車", amount: 80, yearsFromNow: 3, enabled: false },
  { id: "wedding", label: "結婚基金", amount: 100, yearsFromNow: 2, enabled: false },
  { id: "kid-education", label: "小孩教育基金", amount: 500, yearsFromNow: 15, enabled: false },
  { id: "emergency", label: "緊急預備金(12個月)", amount: 0, yearsFromNow: 1, enabled: true },
  { id: "custom", label: "自訂目標", amount: 0, yearsFromNow: 10, enabled: false },
];

export interface LifestyleResult {
  monthlyTotal: number; // 每月總開銷（今天的錢）
  annualTotal: number; // 年開銷（今天的錢）
  futureMonthly: number; // 退休時的每月開銷（含通膨）
  futureAnnual: number; // 退休時的年開銷（含通膨）
  byCategory: { category: string; label: string; total: number }[];
  retirementTarget: number; // 以提領率算出的退休所需資產(萬)
  goalsTotal: number; // 人生目標總額(萬)
  grandTotal: number; // 退休資產 + 人生目標(萬)
  emergencyFund: number; // 緊急預備金(萬)
}

export function calculateLifestyle(
  expenses: MonthlyExpense[],
  goals: LifeGoal[],
  withdrawalRate: number, // %
  inflationRate: number = 2.5, // %
  yearsToRetirement: number = 20,
): LifestyleResult {
  const monthlyTotal = expenses.reduce((s, e) => s + e.amount, 0);
  const annualTotal = monthlyTotal * 12;

  const categoryMap: Record<string, { label: string; total: number }> = {
    basic: { label: "基本開銷", total: 0 },
    lifestyle: { label: "生活品質", total: 0 },
    family: { label: "家庭", total: 0 },
  };
  for (const e of expenses) {
    if (categoryMap[e.category]) {
      categoryMap[e.category].total += e.amount;
    }
  }
  const byCategory = Object.entries(categoryMap).map(([cat, v]) => ({
    category: cat,
    ...v,
  }));

  // 通膨調整：退休時的開銷
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const futureMonthly = Math.round(monthlyTotal * inflationMultiplier);
  const futureAnnual = futureMonthly * 12;

  const wr = withdrawalRate / 100;
  // 用未來的開銷算退休資產，不是今天的
  const retirementTarget = wr > 0 ? Math.round(futureAnnual / wr / 10000) : 0;

  const enabledGoals = goals.filter((g) => g.enabled);

  // 緊急預備金自動算
  const emergencyGoal = enabledGoals.find((g) => g.id === "emergency");
  const emergencyFund = emergencyGoal
    ? (emergencyGoal.amount > 0 ? emergencyGoal.amount : Math.round((monthlyTotal * 12) / 10000))
    : Math.round((monthlyTotal * 12) / 10000);

  // 更新 emergency goal amount if auto
  if (emergencyGoal && emergencyGoal.amount === 0) {
    emergencyGoal.amount = emergencyFund;
  }

  const goalsTotal = enabledGoals.reduce((s, g) => s + g.amount, 0);
  const grandTotal = retirementTarget + goalsTotal;

  return {
    monthlyTotal,
    annualTotal,
    futureMonthly,
    futureAnnual,
    byCategory,
    retirementTarget,
    goalsTotal,
    grandTotal,
    emergencyFund,
  };
}
