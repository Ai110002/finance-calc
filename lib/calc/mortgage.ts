export interface MortgageInput {
  /** 貸款金額（元） */
  principal: number;
  /** 年利率（%） */
  annualRate: number;
  /** 貸款年數 */
  years: number;
  /** 寬限期年數 */
  gracePeriodYears: number;
  /** 還款方式 */
  method: "equal-payment" | "equal-principal";
}

export interface MonthlyDetail {
  month: number;
  payment: number;
  principalPart: number;
  interestPart: number;
  remainingBalance: number;
}

export interface MortgageResult {
  /** 每月還款（等額本息）或第一個月還款（等額本金） */
  monthlyPayment: number;
  /** 等額本金最後一期 */
  lastMonthPayment: number;
  /** 寬限期每月利息 */
  graceMonthly: number;
  /** 總還款金額 */
  totalPayment: number;
  /** 總利息 */
  totalInterest: number;
  /** 每年還款摘要 */
  yearlyBreakdown: { year: number; principal: number; interest: number; remaining: number }[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { principal, annualRate, years, gracePeriodYears, method } = input;
  const r = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const graceMonths = gracePeriodYears * 12;
  const repayMonths = totalMonths - graceMonths;

  if (repayMonths <= 0 || principal <= 0 || r <= 0) {
    return {
      monthlyPayment: 0,
      lastMonthPayment: 0,
      graceMonthly: 0,
      totalPayment: 0,
      totalInterest: 0,
      yearlyBreakdown: [],
    };
  }

  const graceMonthly = principal * r;
  const graceInterestTotal = graceMonthly * graceMonths;

  let totalInterest = graceInterestTotal;
  let monthlyPayment = 0;
  let lastMonthPayment = 0;

  const yearlyBreakdown: MortgageResult["yearlyBreakdown"]= [];
  let yearPrincipal = 0;
  let yearInterest = 0;
  let balance = principal;

  // Grace period
  for (let m = 1; m <= graceMonths; m++) {
    const interest = balance * r;
    yearInterest += interest;

    if (m % 12 === 0 || m === totalMonths) {
      yearlyBreakdown.push({
        year: Math.ceil(m / 12),
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        remaining: Math.round(balance),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  if (method === "equal-payment") {
    // 等額本息
    monthlyPayment = principal * r * Math.pow(1 + r, repayMonths) / (Math.pow(1 + r, repayMonths) - 1);
    lastMonthPayment = monthlyPayment;

    for (let m = graceMonths + 1; m <= totalMonths; m++) {
      const interest = balance * r;
      const princ = monthlyPayment - interest;
      balance -= princ;
      totalInterest += interest;
      yearPrincipal += princ;
      yearInterest += interest;

      if (m % 12 === 0 || m === totalMonths) {
        yearlyBreakdown.push({
          year: Math.ceil(m / 12),
          principal: Math.round(yearPrincipal),
          interest: Math.round(yearInterest),
          remaining: Math.round(Math.max(0, balance)),
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }
  } else {
    // 等額本金
    const monthlyPrincipal = principal / repayMonths;

    for (let m = graceMonths + 1; m <= totalMonths; m++) {
      const interest = balance * r;
      balance -= monthlyPrincipal;
      totalInterest += interest;
      yearPrincipal += monthlyPrincipal;
      yearInterest += interest;

      const payment = monthlyPrincipal + interest;
      if (m === graceMonths + 1) monthlyPayment = payment;
      if (m === totalMonths) lastMonthPayment = payment;

      if (m % 12 === 0 || m === totalMonths) {
        yearlyBreakdown.push({
          year: Math.ceil(m / 12),
          principal: Math.round(yearPrincipal),
          interest: Math.round(yearInterest),
          remaining: Math.round(Math.max(0, balance)),
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }
  }

  const totalPayment = principal + totalInterest;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    lastMonthPayment: Math.round(lastMonthPayment),
    graceMonthly: Math.round(graceMonthly),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    yearlyBreakdown,
  };
}
