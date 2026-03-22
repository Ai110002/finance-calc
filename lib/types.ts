export interface StockPosition {
  id: string;
  name: string;
  shares: number;
  currentPrice: number;
  purchasePrice: number;
  marginRatio: number; // 融資成數, e.g. 0.6 = 60%
}

export interface StockValuation {
  marketValue: number;
  loanAmount: number;
  selfFunds: number;
}

export type Zone = "safe" | "warning" | "danger" | "critical";

export interface MarginCalcResult {
  totalMarketValue: number;
  totalLoanAmount: number;
  maintenanceRatio: number;
  zone: Zone;
  distanceTo130: number;
  maxDropPercent: number;
  deficiency: number;
}

export interface ScenarioResult {
  dropPercent: number;
  newMarketValue: number;
  newMaintenanceRatio: number;
  zone: Zone;
  marginCallAmount: number;
}

export interface HistoricalScenario {
  id: string;
  name: string;
  description: string;
  dropPercent: number;
  dateRange: string;
}
