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

interface Props {
  data: { year: number; amount: number }[];
  target: number;
}

export default function ProjectionChart({ data, target }: Props) {
  if (data.length === 0) return null;

  return (
    <div className="h-56 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="amountGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}年`}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) =>
              v >= 10000 ? `${(v / 10000).toFixed(0)}億` : `${v}萬`
            }
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} 萬`,
              "資產",
            ]}
            labelFormatter={(label) => `第 ${label} 年`}
            contentStyle={{ fontSize: 13 }}
          />
          <ReferenceLine
            y={target}
            stroke="#22c55e"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: `目標 ${target.toLocaleString()} 萬`,
              position: "insideTopRight",
              fill: "#22c55e",
              fontSize: 11,
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#amountGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
