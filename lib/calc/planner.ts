/**
 * 財務規劃核心計算
 * 所有數字由用戶自行輸入，僅供試算參考
 */

export interface PlanInput {
  // Step 1: 目標
  targetAmount: number; // 目標總資產 (萬)
  currentSavings: number; // 目前存款 (萬)

  // Step 2: 儲蓄
  monthlySavings: number; // 每月可存金額 (元)
  annualReturn: number; // 年化報酬率 % (用戶自填)

  // Step 3: 退休提領
  monthlyExpense: number; // 退休後每月開銷 (元)
  withdrawalRate: number; // 提領率 % (預設 4%)

  // Step 4: 股票質押
  portfolioValue: number; // 投資組合市值 (萬)
  pledgeRatio: number; // 質押成數 % (通常 60%)
  loanRate: number; // 借款利率 %
}

export interface PlanResult {
  // 幾年達標
  yearsToGoal: number;
  // 達標時各年份的資產軌跡
  yearlyProjection: { year: number; amount: number }[];
  // 退休後每年可提領
  annualWithdrawal: number;
  // 需要多少資產才能靠提領過活
  requiredForRetirement: number;
  // 質押可借金額
  pledgeLoanAmount: number;
  // 質押後每月利息
  monthlyInterest: number;
  // 質押維持率 (市值 / 借款)
  pledgeMaintenanceRatio: number;
}

export function calculatePlan(input: PlanInput): PlanResult {
  const {
    targetAmount,
    currentSavings,
    monthlySavings,
    annualReturn,
    monthlyExpense,
    withdrawalRate,
    portfolioValue,
    pledgeRatio,
    loanRate,
  } = input;

  const targetWan = targetAmount; // 已經是萬
  const currentWan = currentSavings;
  const monthlyWan = monthlySavings / 10000;
  const r = annualReturn / 100; // 年報酬率
  const monthlyR = Math.pow(1 + r, 1 / 12) - 1;

  // 資產軌跡計算
  const yearlyProjection: { year: number; amount: number }[] = [];
  let balance = currentWan;
  let yearsToGoal = -1;

  for (let year = 0; year <= 50; year++) {
    yearlyProjection.push({
      year,
      amount: Math.round(balance * 100) / 100,
    });

    if (balance >= targetWan && yearsToGoal === -1) {
      yearsToGoal = year;
    }

    // 每月投入 + 複利
    for (let m = 0; m < 12; m++) {
      balance = (balance + monthlyWan) * (1 + monthlyR);
    }
  }

  if (yearsToGoal === -1) yearsToGoal = 50; // 超過 50 年

  // 退休提領
  const annualExpense = monthlyExpense * 12;
  const wr = withdrawalRate / 100;
  const requiredForRetirement =
    wr > 0 ? Math.round(annualExpense / wr / 10000) : 0; // 萬

  const annualWithdrawal = Math.round(targetWan * 10000 * wr);

  // 質押計算
  const portfolioWan = portfolioValue;
  const pr = pledgeRatio / 100;
  const pledgeLoanAmount = Math.round(portfolioWan * pr * 100) / 100; // 萬
  const lr = loanRate / 100;
  const monthlyInterest = Math.round(
    (pledgeLoanAmount * 10000 * lr) / 12
  );
  const pledgeMaintenanceRatio =
    pledgeLoanAmount > 0
      ? (portfolioWan / pledgeLoanAmount) * 100
      : Infinity;

  return {
    yearsToGoal,
    yearlyProjection: yearlyProjection.slice(0, Math.max(yearsToGoal + 10, 30)),
    annualWithdrawal,
    requiredForRetirement,
    pledgeLoanAmount,
    monthlyInterest,
    pledgeMaintenanceRatio,
  };
}

/**
 * 反推每月需存多少才能在 N 年內達標
 */
export function requiredMonthlySavings(
  targetWan: number,
  currentWan: number,
  years: number,
  annualReturn: number
): number {
  if (years <= 0) return (targetWan - currentWan) * 10000;
  const r = annualReturn / 100;
  const monthlyR = Math.pow(1 + r, 1 / 12) - 1;
  const months = years * 12;

  // FV of current savings
  const fvCurrent = currentWan * Math.pow(1 + monthlyR, months);
  const gap = targetWan - fvCurrent;

  if (gap <= 0) return 0;

  // FV of annuity: PMT * ((1+r)^n - 1) / r
  const annuityFactor =
    monthlyR > 0
      ? (Math.pow(1 + monthlyR, months) - 1) / monthlyR
      : months;

  return Math.round((gap / annuityFactor) * 10000); // 元
}
