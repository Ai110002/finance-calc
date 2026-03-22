"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ScenarioResult } from "@/lib/types";

export default function ScenarioChart({ scenarios }: { scenarios: ScenarioResult[] }) {
  const data = scenarios
    .filter((s) => s.dropPercent <= 0)
    .map((s) => ({
      drop: s.dropPercent,
      ratio: Math.max(0, s.newMaintenanceRatio),
    }));

  if (data.length === 0) return null;

  return (
    <div className="h-64 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="ratioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#eab308" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="drop"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
            interval={9}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
            domain={[0, "auto"]}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(1)}%`, "維持率"]}
            labelFormatter={(label) => `股價下跌 ${label}%`}
            contentStyle={{ fontSize: 13 }}
          />
          <ReferenceLine
            y={130}
            stroke="#ef4444"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: "130% 斷頭線",
              position: "insideTopRight",
              fill: "#ef4444",
              fontSize: 11,
            }}
          />
          <ReferenceLine
            y={150}
            stroke="#eab308"
            strokeDasharray="3 3"
            label={{
              value: "150%",
              position: "insideTopRight",
              fill: "#eab308",
              fontSize: 11,
            }}
          />
          <Area
            type="monotone"
            dataKey="ratio"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#ratioGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
