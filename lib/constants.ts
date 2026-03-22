import type { Zone, HistoricalScenario } from "./types";

export const ZONES: Record<
  Zone,
  { min: number; color: string; bg: string; label: string }
> = {
  safe: { min: 166, color: "#22c55e", bg: "#f0fdf4", label: "安全" },
  warning: { min: 150, color: "#eab308", bg: "#fefce8", label: "注意" },
  danger: { min: 130, color: "#ef4444", bg: "#fef2f2", label: "危險" },
  critical: { min: 0, color: "#991b1b", bg: "#450a0a", label: "斷頭" },
};

export const MARGIN_CALL_RATIO = 130;
export const WARNING_RATIO = 150;
export const SAFE_RATIO = 166;

export const DEFAULT_MARGIN_RATIO = 0.6;

export const PRESET_DROPS = [-5, -10, -15, -20, -25, -30, -40, -50];

export const HISTORICAL_SCENARIOS: HistoricalScenario[] = [
  {
    id: "covid-2020",
    name: "2020 COVID 崩盤",
    description: "全球疫情爆發，台股急跌",
    dropPercent: -30,
    dateRange: "2020/01 - 2020/03",
  },
  {
    id: "bear-2022",
    name: "2022 熊市",
    description: "升息+通膨，科技股重挫",
    dropPercent: -28,
    dateRange: "2022/01 - 2022/10",
  },
  {
    id: "tariff-2025",
    name: "2025/4 關稅暴跌",
    description: "美中關稅升級，台股兩週急跌",
    dropPercent: -16,
    dateRange: "2025/04",
  },
  {
    id: "correction-2018",
    name: "2018 十月修正",
    description: "美股暴跌帶動亞股回檔",
    dropPercent: -16,
    dateRange: "2018/10 - 2018/12",
  },
];
