"use client";

import { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { calculateLifestyle, DEFAULT_EXPENSES, DEFAULT_GOALS } from "@/lib/calc/lifestyle";
import type { MonthlyExpense, LifeGoal } from "@/lib/calc/lifestyle";
import { calculatePlan, requiredMonthlySavings } from "@/lib/calc/planner";
import { useMarginCalc } from "@/hooks/use-margin-calc";
import { simulateDrop, getZone } from "@/lib/calc/margin-ratio";
import { ZONES, PRESET_DROPS } from "@/lib/constants";
import { formatNTD, formatNumber, formatRatio } from "@/lib/format";
import { StockRow } from "@/components/margin-ratio/stock-row";
import { RatioResult } from "@/components/margin-ratio/ratio-result";
import { HistoricalPanel } from "@/components/liquidation-sim/historical-panel";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProjectionChart = dynamic(
  () => import("@/components/planner/projection-chart"),
  { ssr: false }
);
const ScenarioChart = dynamic(
  () => import("@/components/liquidation-sim/scenario-chart"),
  { ssr: false }
);

/* ─── Shared Inputs ─── */

function NumField({ label, hint, value, onChange, suffix, placeholder }: {
  label: string; hint?: string; value: number; onChange: (v: number) => void;
  suffix?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="mb-1 text-xs text-gray-400">{hint}</p>}
      <div className="flex items-center gap-2">
        <input type="text" inputMode="decimal"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder} value={value || ""}
          onChange={(e) => { const v = parseFloat(e.target.value); onChange(isNaN(v) ? 0 : v); }}
        />
        {suffix && <span className="whitespace-nowrap text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
}

function RangeSlider({ label, hint, value, onChange, min, max, step, suffix }: {
  label: string; hint?: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; suffix: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-blue-600">{value}{suffix}</span>
      </div>
      {hint && <p className="mb-2 text-xs text-gray-400">{hint}</p>}
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>{min}{suffix}</span><span>{max}{suffix}</span>
      </div>
    </div>
  );
}

function Section({ step, title, id, children }: {
  step: number; title: string; id: string; children: React.ReactNode;
}) {
  return (
    <Card>
      <h2 id={id} className="scroll-mt-16 text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">{step}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </Card>
  );
}

/* ─── Page ─── */

export default function Home() {
  // Step 1: 生活開銷
  const [expenses, setExpenses] = useState<MonthlyExpense[]>(DEFAULT_EXPENSES);
  const [goals, setGoals] = useState<LifeGoal[]>(DEFAULT_GOALS);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  // Step 2: 儲蓄
  const [currentSavings, setCurrentSavings] = useState(50);
  const [monthlySavings, setMonthlySavings] = useState(15000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [inflation, setInflation] = useState(2.5);
  const [targetYears, setTargetYears] = useState(20);

  const realReturn = Math.round((annualReturn - inflation) * 10) / 10;

  // Step 3: 質押
  const [portfolioValue, setPortfolioValue] = useState(1000);
  const [pledgeRatio, setPledgeRatio] = useState(50);
  const [loanRate, setLoanRate] = useState(2.5);

  // Step 4: 融資
  const margin = useMarginCalc();

  // 計算
  const lifestyle = useMemo(
    () => calculateLifestyle(expenses, goals, withdrawalRate, inflation, targetYears),
    [expenses, goals, withdrawalRate, inflation, targetYears]
  );

  const targetAmount = lifestyle.grandTotal;

  const planResult = useMemo(
    () => calculatePlan({
      targetAmount, currentSavings, monthlySavings, annualReturn,
      monthlyExpense: lifestyle.monthlyTotal, withdrawalRate,
      portfolioValue, pledgeRatio, loanRate,
    }),
    [targetAmount, currentSavings, monthlySavings, annualReturn,
     lifestyle.monthlyTotal, withdrawalRate, portfolioValue, pledgeRatio, loanRate]
  );

  const requiredMonthly = useMemo(
    () => requiredMonthlySavings(targetAmount, currentSavings, targetYears, annualReturn),
    [targetAmount, currentSavings, targetYears, annualReturn]
  );

  const updateExpense = useCallback((id: string, amount: number) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, amount } : e)));
  }, []);

  const toggleGoal = useCallback((id: string) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g)));
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<LifeGoal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  }, []);

  const hasMarginData = margin.positions.some(
    (p) => p.shares > 0 && p.currentPrice > 0 && p.purchasePrice > 0
  );

  return (
    <div className="space-y-5 px-4 pt-8 pb-8">
      {/* 工具切換 */}
      <div className="flex gap-2 overflow-x-auto text-sm">
        <div className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm">
          財務自由
        </div>
        <Link href="/tax-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          報稅計算
        </Link>
        <Link href="/mortgage" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          房貸計算
        </Link>
        <Link href="/overtime-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          加班費
        </Link>
        <Link href="/severance-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          資遣費
        </Link>
        <Link href="/salary-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          月薪試算
        </Link>
        <Link href="/bonus-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
          年終獎金
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">財務自由計算器</h1>
        <p className="mt-1 text-sm text-gray-500">從你想要的生活，反推需要多少錢</p>
      </div>

      <div className="flex gap-2 overflow-x-auto text-xs">
        {[
          { id: "life", label: "①生活" },
          { id: "goals", label: "②目標" },
          { id: "savings", label: "③儲蓄" },
          { id: "pledge", label: "④質押" },
          { id: "margin", label: "⑤維持率" },
          { id: "sim", label: "⑥模擬" },
        ].map((s) => (
          <a key={s.id} href={`#${s.id}`}
            className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 shadow-sm hover:bg-blue-50"
          >{s.label}</a>
        ))}
      </div>

      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
        ⚠️ 本工具<strong>不構成投資建議</strong>。報酬率為歷史回測參考，不代表未來。所有數字由您自行填寫。
      </div>

      {/* ═══ Step 1: 每月開銷 ═══ */}
      <Section step={1} title="我想過的生活（每月開銷）" id="life">
        <p className="mb-3 text-xs text-gray-500">填入你理想生活的每月花費，不用省，誠實面對。</p>

        {(["basic", "lifestyle", "family"] as const).map((cat) => {
          const catLabel = cat === "basic" ? "基本開銷" : cat === "lifestyle" ? "生活品質" : "家庭";
          const items = expenses.filter((e) => e.category === cat);
          const catTotal = items.reduce((s, e) => s + e.amount, 0);
          return (
            <div key={cat} className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{catLabel}</span>
                <span className="text-sm font-semibold">{formatNTD(catTotal)}</span>
              </div>
              <div className="space-y-2">
                {items.map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <span className="w-28 text-sm text-gray-600 shrink-0">{e.label}</span>
                    <input type="text" inputMode="decimal"
                      className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-right text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="0" value={e.amount || ""}
                      onChange={(ev) => { const v = parseFloat(ev.target.value); updateExpense(e.id, isNaN(v) ? 0 : v); }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="rounded-xl bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">每月總開銷（現在）</span>
            <span className="text-2xl font-bold text-blue-600">{formatNTD(lifestyle.monthlyTotal)}</span>
          </div>
          <div className="mt-1 text-right text-sm text-gray-500">
            年開銷 {formatNTD(lifestyle.annualTotal)}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <RangeSlider label="通貨膨脹率" hint="台灣近 20 年平均約 1.5-2.5%，全球約 2-3%" value={inflation} onChange={setInflation} min={0} max={5} step={0.5} suffix="%" />
          <RangeSlider label="年提領率" hint="4% 法則：每年提領 4%，歷史上 30 年不會花完" value={withdrawalRate} onChange={setWithdrawalRate} min={2} max={8} step={0.5} suffix="%" />
        </div>

        <div className="mt-3 rounded-xl bg-orange-50 p-4">
          <div className="text-sm text-gray-600">
            {targetYears} 年後，考慮通膨 {inflation}%：
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm text-gray-500">每月需要</span>
            <span className="text-xl font-bold text-orange-600">{formatNTD(lifestyle.futureMonthly)}</span>
          </div>
          <div className="mt-0.5 text-xs text-gray-400">
            同樣的生活水準，{targetYears} 年後要花更多錢
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-green-50 p-4">
          <div className="text-sm text-gray-600">以 {withdrawalRate}% 提領率（用未來開銷計算）：</div>
          <div className="mt-1 text-2xl font-bold text-green-600">{formatNumber(lifestyle.retirementTarget)} 萬</div>
          <div className="mt-1 text-xs text-gray-500">
            實質報酬率 = {annualReturn}% 名目 − {inflation}% 通膨 = <strong>{realReturn}%</strong>
          </div>
        </div>
      </Section>

      {/* ═══ Step 2: 人生目標 ═══ */}
      <Section step={2} title="人生大筆支出" id="goals">
        <p className="mb-3 text-xs text-gray-500">勾選你的目標，金額和時間可自行調整。</p>

        <div className="space-y-3">
          {goals.map((g) => (
            <div key={g.id} className={`rounded-xl border p-3 transition ${g.enabled ? "border-blue-300 bg-blue-50/50" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={g.enabled} onChange={() => toggleGoal(g.id)}
                  className="h-4 w-4 rounded accent-blue-600" />
                <span className={`text-sm font-medium ${g.enabled ? "text-gray-800" : "text-gray-400"}`}>{g.label}</span>
              </div>
              {g.enabled && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">金額(萬)</label>
                    <input type="text" inputMode="decimal"
                      className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      value={g.amount || ""} onChange={(e) => { const v = parseFloat(e.target.value); updateGoal(g.id, { amount: isNaN(v) ? 0 : v }); }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">幾年後</label>
                    <input type="text" inputMode="decimal"
                      className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      value={g.yearsFromNow || ""} onChange={(e) => { const v = parseInt(e.target.value); updateGoal(g.id, { yearsFromNow: isNaN(v) ? 0 : v }); }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 總結 */}
        <div className="mt-4 rounded-xl bg-purple-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">退休所需資產</span>
            <span className="font-semibold">{formatNumber(lifestyle.retirementTarget)} 萬</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">人生大筆支出</span>
            <span className="font-semibold">+ {formatNumber(lifestyle.goalsTotal)} 萬</span>
          </div>
          <div className="border-t border-purple-200 pt-2 flex justify-between">
            <span className="font-medium text-gray-700">你需要的總資產</span>
            <span className="text-2xl font-bold text-purple-600">{formatNumber(lifestyle.grandTotal)} 萬</span>
          </div>
        </div>
      </Section>

      {/* ═══ Step 3: 怎麼存到 ═══ */}
      <Section step={3} title="怎麼存到？" id="savings">
        <div className="space-y-4">
          <NumField label="目前已有存款" value={currentSavings} onChange={setCurrentSavings} suffix="萬" placeholder="50" />
          <NumField label="每月可投入金額" value={monthlySavings} onChange={setMonthlySavings} suffix="元" placeholder="15000" />
          <RangeSlider label="預估年化報酬率" hint="台股歷史約 8-10%，S&P500 約 10%（僅回測參考，不代表未來）" value={annualReturn} onChange={setAnnualReturn} min={1} max={25} step={0.5} suffix="%" />
          <RangeSlider label="目標年數" value={targetYears} onChange={setTargetYears} min={5} max={40} step={1} suffix="年" />

          <div className="rounded-xl bg-blue-50 p-4">
            <div className="text-sm text-gray-600">
              要在 {targetYears} 年存到 {formatNumber(targetAmount)} 萬（年化 {annualReturn}%）：
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-sm text-gray-500">每月需存</span>
              <span className="text-2xl font-bold text-blue-600">{formatNTD(requiredMonthly)}</span>
            </div>
            {monthlySavings > 0 && (
              <div className="mt-2 text-sm">
                {monthlySavings >= requiredMonthly ? (
                  <span className="font-medium text-green-600">✅ 已超過！預計 {planResult.yearsToGoal} 年達成</span>
                ) : (
                  <span className="font-medium text-amber-600">還差 {formatNTD(requiredMonthly - monthlySavings)}/月，預計 {planResult.yearsToGoal} 年</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 資產成長圖 */}
      <Card>
        <h3 className="mb-3 font-semibold">資產成長軌跡</h3>
        <ProjectionChart data={planResult.yearlyProjection} target={targetAmount} />
        <div className="mt-2 text-center text-xs text-gray-400">年化 {annualReturn}% · 每月 {formatNTD(monthlySavings)}</div>
      </Card>

      {/* ═══ Step 4: 質押 ═══ */}
      <Section step={4} title="股票質押借款" id="pledge">
        <p className="mb-3 text-xs text-gray-500">不賣股、用質押借錢生活，持續享受股價成長。</p>
        <div className="space-y-4">
          <NumField label="投資組合市值" value={portfolioValue} onChange={setPortfolioValue} suffix="萬" placeholder="1000" />
          <RangeSlider label="質押成數" hint="上市權值股約 50-60%" value={pledgeRatio} onChange={setPledgeRatio} min={30} max={70} step={5} suffix="%" />
          <RangeSlider label="借款利率" hint="目前約 2-3.5%" value={loanRate} onChange={setLoanRate} min={1} max={5} step={0.1} suffix="%" />

          <div className="rounded-xl bg-purple-50 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">可借金額</div>
                <div className="text-xl font-bold text-purple-600">{formatNumber(planResult.pledgeLoanAmount)} 萬</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">每月利息</div>
                <div className="text-xl font-bold text-purple-600">{formatNTD(planResult.monthlyInterest)}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">維持率</span>
              <span className={`text-lg font-bold ${planResult.pledgeMaintenanceRatio > 166 ? "text-green-600" : planResult.pledgeMaintenanceRatio > 130 ? "text-amber-600" : "text-red-600"}`}>
                {isFinite(planResult.pledgeMaintenanceRatio) ? `${planResult.pledgeMaintenanceRatio.toFixed(0)}%` : "∞"}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-400">股價漲→可借額度增加→不賣股不觸發資本利得稅。但股價跌時有追繳風險。</div>
        </div>
      </Section>

      {/* ═══ Step 5: 融資維持率 ═══ */}
      <Section step={5} title="融資維持率計算" id="margin">
        <p className="mb-3 text-xs text-gray-500">輸入融資持股，即時算整戶維持率。</p>
        <RatioResult result={margin.result} />
        <div className="mt-4 flex items-center justify-between">
          <h3 className="font-medium">持股明細</h3>
          <button onClick={margin.addPosition} className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100">+ 新增</button>
        </div>
        <div className="mt-3 space-y-3">
          {margin.positions.map((p) => (
            <StockRow key={p.id} position={p} onUpdate={margin.updatePosition} onRemove={margin.removePosition} canRemove={margin.positions.length > 1} />
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-gray-100 p-3 text-xs text-gray-500">
          維持率 = 擔保品市值 ÷ 融資金額 × 100%。低於 130% 會被追繳，2 個營業日未補足將斷頭。
        </div>
      </Section>

      {/* ═══ Step 6: 斷頭模擬 ═══ */}
      <Section step={6} title="斷頭模擬器" id="sim">
        <p className="mb-3 text-xs text-gray-500">模擬大盤下跌對維持率的影響。</p>
        {hasMarginData ? (
          <>
            <ScenarioChart scenarios={margin.scenarios} />
            <h3 className="mb-2 mt-6 font-medium">快速情境</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-3">跌幅</th><th className="pb-2 pr-3">維持率</th>
                  <th className="pb-2 pr-3">狀態</th><th className="pb-2">追繳</th>
                </tr></thead>
                <tbody>
                  {PRESET_DROPS.map((drop) => {
                    const r = simulateDrop(margin.positions, drop);
                    const zone = getZone(r.maintenanceRatio);
                    const zs = ZONES[zone];
                    return (
                      <tr key={drop} className="border-b border-gray-100">
                        <td className="py-2 pr-3 font-medium">{drop}%</td>
                        <td className="py-2 pr-3 font-semibold" style={{ color: zs.color }}>{formatRatio(r.maintenanceRatio)}</td>
                        <td className="py-2 pr-3"><span className="rounded-full px-2 py-0.5 text-xs text-white" style={{ backgroundColor: zs.color }}>{zs.label}</span></td>
                        <td className="py-2 text-red-600">{r.deficiency > 0 ? formatNTD(r.deficiency) : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <h3 className="mb-2 mt-6 font-medium">歷史崩盤回測</h3>
            <HistoricalPanel positions={margin.positions} />
          </>
        ) : (
          <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-400">請先在上方「⑤ 融資維持率」輸入持股資料</div>
        )}
      </Section>

      <div className="rounded-xl bg-gray-100 p-4 text-center text-xs text-gray-500">
        本工具僅供個人財務規劃參考，<strong>不構成任何投資建議</strong>。年化報酬率為歷史回測數據，不保證未來。投資有風險，請自行評估。
      </div>
    </div>
  );
}
