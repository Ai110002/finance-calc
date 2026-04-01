"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { MortgageAffiliateCTA } from "@/components/affiliate-cta";

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租", active: true },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

// ── 月供計算（等額本息）──────────────────────────────────────────────────────
function monthlyPayment(loan: number, annualRatePct: number, years: number): number {
  if (loan <= 0) return 0;
  if (annualRatePct === 0) return loan / (years * 12);
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ── 第 m 個月後的剩餘貸款 ──────────────────────────────────────────────────
function remainingLoanAfterMonths(
  loan: number,
  annualRatePct: number,
  totalYears: number,
  monthsPaid: number
): number {
  if (loan <= 0) return 0;
  if (annualRatePct === 0) {
    return Math.max(0, loan - (loan / (totalYears * 12)) * monthsPaid);
  }
  const r = annualRatePct / 100 / 12;
  const n = totalYears * 12;
  const m = Math.min(monthsPaid, n);
  return (loan * (Math.pow(1 + r, n) - Math.pow(1 + r, m))) / (Math.pow(1 + r, n) - 1);
}

interface YearData {
  year: number;
  homeValue: number;
  remainingLoan: number;
  buyEquity: number;
  rentPortfolio: number;
  yearlyBuyCost: number;
  yearlyRentCost: number;
}

function simulate(params: {
  housePriceWan: number;
  downPct: number;
  loanRatePct: number;
  loanYears: number;
  monthlyRent: number;
  rentGrowthPct: number;
  investRatePct: number;
  houseGrowthPct: number;
  compareYears: number;
}): YearData[] {
  const {
    housePriceWan,
    downPct,
    loanRatePct,
    loanYears,
    monthlyRent,
    rentGrowthPct,
    investRatePct,
    houseGrowthPct,
    compareYears,
  } = params;

  const housePrice = housePriceWan * 10_000;
  const downPayment = housePrice * (downPct / 100);
  const loan = housePrice - downPayment;
  const monthly = monthlyPayment(loan, loanRatePct, loanYears);
  const annualHouseRate = houseGrowthPct / 100;
  const annualInvestRate = investRatePct / 100;
  const annualRentGrowth = rentGrowthPct / 100;
  // 持有成本：房屋稅+地價稅+修繕，自住約每年0.5%房價
  const holdingCostPerYear = housePrice * 0.005;

  const results: YearData[] = [];
  // 租房+投資組合：初始把首付拿去投資
  let rentPortfolio = downPayment;

  for (let year = 1; year <= compareYears; year++) {
    // ── 買房 ──
    const homeValue = housePrice * Math.pow(1 + annualHouseRate, year);
    const monthsPaid = year * 12;
    const remaining =
      monthsPaid >= loanYears * 12
        ? 0
        : remainingLoanAfterMonths(loan, loanRatePct, loanYears, monthsPaid);
    const buyEquity = homeValue - remaining;

    // 買房年支出（還清後只剩持有成本）
    const yearlyMortgage = year <= loanYears ? monthly * 12 : 0;
    const yearlyBuyCost = yearlyMortgage + holdingCostPerYear;

    // ── 租房 ──
    // 第 year 年的年租金（從第1年 = monthlyRent×12，每年增 rentGrowthPct）
    const yearlyRentCost = monthlyRent * 12 * Math.pow(1 + annualRentGrowth, year - 1);

    // 投資組合：先複利增長，再加入年度差額
    // 差額 > 0 → 買房貴，租房省的錢投入
    // 差額 < 0 → 租房貴，需從投資組合提取
    rentPortfolio =
      rentPortfolio * (1 + annualInvestRate) + (yearlyBuyCost - yearlyRentCost);

    results.push({
      year,
      homeValue,
      remainingLoan: remaining,
      buyEquity,
      rentPortfolio,
      yearlyBuyCost,
      yearlyRentCost,
    });
  }

  return results;
}

function formatWan(n: number): string {
  const wan = n / 10_000;
  if (wan >= 10000) return `${(wan / 10000).toFixed(1)}億`;
  return `${wan.toFixed(0)}萬`;
}

function formatNTD(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

// ── 欄位元件 ────────────────────────────────────────────────────────────────
function Field({
  label,
  hint,
  value,
  onChange,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
        {hint && <span className="ml-1 text-gray-400">{hint}</span>}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(v);
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        {suffix && <span className="text-sm text-gray-500 whitespace-nowrap">{suffix}</span>}
      </div>
    </div>
  );
}

const MILESTONE_YEARS = [5, 10, 15, 20, 25, 30];

export default function BuyVsRentPage() {
  const [housePriceWan, setHousePriceWan] = useState(1500);
  const [downPct, setDownPct] = useState(20);
  const [loanRatePct, setLoanRatePct] = useState(2.1);
  const [loanYears, setLoanYears] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(30000);
  const [rentGrowthPct, setRentGrowthPct] = useState(2);
  const [investRatePct, setInvestRatePct] = useState(6);
  const [houseGrowthPct, setHouseGrowthPct] = useState(3);
  const [compareYears, setCompareYears] = useState(30);

  const allYears = useMemo(
    () =>
      simulate({
        housePriceWan,
        downPct,
        loanRatePct,
        loanYears,
        monthlyRent,
        rentGrowthPct,
        investRatePct,
        houseGrowthPct,
        compareYears,
      }),
    [
      housePriceWan,
      downPct,
      loanRatePct,
      loanYears,
      monthlyRent,
      rentGrowthPct,
      investRatePct,
      houseGrowthPct,
      compareYears,
    ]
  );

  const milestones = useMemo(
    () =>
      MILESTONE_YEARS.filter((y) => y <= compareYears).map(
        (y) => allYears[y - 1]
      ),
    [allYears, compareYears]
  );

  const final = allYears[allYears.length - 1];
  const housePrice = housePriceWan * 10_000;
  const downPayment = housePrice * (downPct / 100);
  const loan = housePrice - downPayment;
  const monthly = monthlyPayment(loan, loanRatePct, loanYears);

  const buyWins = final ? final.buyEquity >= final.rentPortfolio : false;
  const diff = final ? Math.abs(final.buyEquity - final.rentPortfolio) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Nav ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2 px-4 py-2 min-w-max">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${
                l.active
                  ? "bg-blue-600 text-white font-semibold"
                  : "border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 pb-16 max-w-2xl mx-auto space-y-5">
        {/* ── 標題 ── */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            買房 vs 租房計算機
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            輸入你的條件，算出{compareYears}年後買房還是租房+投資財富更多
          </p>
        </div>

        <AdUnit />

        {/* ── 輸入區 ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            買房條件
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="房屋總價"
              suffix="萬元"
              value={housePriceWan}
              onChange={setHousePriceWan}
              min={100}
              max={20000}
              step={50}
            />
            <Field
              label="自備款成數"
              suffix="%"
              value={downPct}
              onChange={setDownPct}
              min={10}
              max={50}
              step={5}
            />
            <Field
              label="房貸利率"
              suffix="%/年"
              value={loanRatePct}
              onChange={setLoanRatePct}
              min={0.5}
              max={6}
              step={0.05}
            />
            <Field
              label="貸款年期"
              suffix="年"
              value={loanYears}
              onChange={setLoanYears}
              min={10}
              max={40}
            />
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">
            租房條件
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="月租金"
              suffix="元"
              value={monthlyRent}
              onChange={setMonthlyRent}
              min={5000}
              max={200000}
              step={1000}
            />
            <Field
              label="租金年增率"
              hint="（歷史約2%）"
              suffix="%"
              value={rentGrowthPct}
              onChange={setRentGrowthPct}
              min={0}
              max={10}
              step={0.5}
            />
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">
            長期假設
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="投資年報酬率"
              hint="（台灣50約7-10%）"
              suffix="%"
              value={investRatePct}
              onChange={setInvestRatePct}
              min={0}
              max={20}
              step={0.5}
            />
            <Field
              label="房價年增率"
              hint="（台北歷史約5%）"
              suffix="%"
              value={houseGrowthPct}
              onChange={setHouseGrowthPct}
              min={-5}
              max={15}
              step={0.5}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="比較年數"
              suffix="年"
              value={compareYears}
              onChange={(v) => setCompareYears(Math.min(Math.max(v, 5), 40))}
              min={5}
              max={40}
            />
          </div>
        </div>

        {/* ── 基本資訊 ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "自備款", value: formatWan(downPayment) },
            { label: "每月房貸", value: formatNTD(Math.round(monthly)) },
            {
              label: "月供vs月租",
              value: `${Math.round(((monthly - monthlyRent) / monthlyRent) * 100) > 0 ? "+" : ""}${Math.round(((monthly - monthlyRent) / monthlyRent) * 100)}%`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-white border border-gray-100 shadow-sm p-3 text-center"
            >
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-base font-bold text-gray-800 mt-0.5">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── 最終結果 ── */}
        {final && (
          <div
            className={`rounded-2xl p-4 border-2 ${
              buyWins
                ? "border-emerald-400 bg-emerald-50"
                : "border-blue-400 bg-blue-50"
            }`}
          >
            <p className="text-sm font-semibold text-gray-600 mb-3">
              {compareYears}年後財富比較
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`rounded-xl p-3 text-center ${
                  buyWins ? "bg-white shadow-sm ring-2 ring-emerald-400" : "bg-white/60"
                }`}
              >
                <p className="text-xs text-gray-500">買房淨資產</p>
                <p className="text-xl font-bold text-emerald-700 mt-1">
                  {formatWan(final.buyEquity)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  房屋市值 {formatWan(final.homeValue)}
                </p>
                {buyWins && (
                  <p className="text-xs font-bold text-emerald-600 mt-1">
                    🏠 勝出 +{formatWan(diff)}
                  </p>
                )}
              </div>
              <div
                className={`rounded-xl p-3 text-center ${
                  !buyWins ? "bg-white shadow-sm ring-2 ring-blue-400" : "bg-white/60"
                }`}
              >
                <p className="text-xs text-gray-500">租房+投資資產</p>
                <p
                  className={`text-xl font-bold mt-1 ${
                    final.rentPortfolio < 0 ? "text-red-600" : "text-blue-700"
                  }`}
                >
                  {final.rentPortfolio < 0
                    ? `−${formatWan(Math.abs(final.rentPortfolio))}`
                    : formatWan(final.rentPortfolio)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  含首付複利增長
                </p>
                {!buyWins && (
                  <p className="text-xs font-bold text-blue-600 mt-1">
                    📈 勝出 +{formatWan(diff)}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 text-center">
              假設：持有成本0.5%/年（房屋稅+地價稅+修繕），租房方案把首付+每月省下的錢投入年報酬{investRatePct}%
            </p>
          </div>
        )}

        {/* ── 各年度里程碑 ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">各年度財富追蹤</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-500">年</th>
                  <th className="px-3 py-2 text-right text-gray-500">買房淨資產</th>
                  <th className="px-3 py-2 text-right text-gray-500">租房+投資</th>
                  <th className="px-3 py-2 text-right text-gray-500">差距</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {milestones.map((row) => {
                  if (!row) return null;
                  const buyLeads = row.buyEquity >= row.rentPortfolio;
                  const d = row.buyEquity - row.rentPortfolio;
                  return (
                    <tr key={row.year} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-medium text-gray-700">
                        第{row.year}年
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-semibold ${
                          buyLeads ? "text-emerald-700" : "text-gray-600"
                        }`}
                      >
                        {formatWan(row.buyEquity)}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-semibold ${
                          !buyLeads ? "text-blue-700" : "text-gray-600"
                        }`}
                      >
                        {row.rentPortfolio < 0
                          ? `−${formatWan(Math.abs(row.rentPortfolio))}`
                          : formatWan(row.rentPortfolio)}
                      </td>
                      <td className="px-3 py-2.5 text-right text-gray-500">
                        {buyLeads ? "🏠" : "📈"}
                        {formatWan(Math.abs(d))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <AdUnit />

        {/* ── 關鍵洞察 ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">看懂這個計算機</h2>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex gap-2">
              <span className="text-emerald-600 mt-0.5 shrink-0">▶</span>
              <p>
                <strong>買房的隱藏優勢：槓桿</strong>。你只付{downPct}%自備款，
                卻能享受100%的房價增值。房價漲10%，你的淨資產漲幅遠不止10%。
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 mt-0.5 shrink-0">▶</span>
              <p>
                <strong>租房的隱藏優勢：首付機會成本</strong>。
                自備款{formatWan(downPayment)}若投入ETF年報酬{investRatePct}%，
                {compareYears}年後複利成長至
                {formatWan(downPayment * Math.pow(1 + investRatePct / 100, compareYears))}。
                這筆錢買房方案拿不到。
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-orange-500 mt-0.5 shrink-0">▶</span>
              <p>
                <strong>台灣租售比偏低</strong>。台北市1500萬的房子月租通常只有
                2-3萬（月租÷房價≈0.2%），遠低於國際正常水準（0.5-1%）。
                代表買房的隱性「租金收益率」很低，要靠房價增值才划算。
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-purple-600 mt-0.5 shrink-0">▶</span>
              <p>
                <strong>關鍵變數：房價增值率</strong>。把「房價年增率」從
                3%改成1%或5%，結果差很多。台北市過去10年年增約5-8%，
                但未來無法保證。
              </p>
            </div>
          </div>
        </div>

        {/* ── 情境快比 ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">
              3種情境快比（1500萬房，月租3萬，投資報酬6%）
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-500">情境</th>
                  <th className="px-3 py-2 text-right text-gray-500">
                    房價年增率
                  </th>
                  <th className="px-3 py-2 text-right text-gray-500">
                    30年後買房
                  </th>
                  <th className="px-3 py-2 text-right text-gray-500">
                    30年後租+投資
                  </th>
                  <th className="px-3 py-2 text-right text-gray-500">結論</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { label: "保守", houseGrowth: 1 },
                  { label: "中性", houseGrowth: 3 },
                  { label: "樂觀", houseGrowth: 5 },
                ].map(({ label, houseGrowth }) => {
                  const rows = simulate({
                    housePriceWan: 1500,
                    downPct: 20,
                    loanRatePct: 2.1,
                    loanYears: 30,
                    monthlyRent: 30000,
                    rentGrowthPct: 2,
                    investRatePct: 6,
                    houseGrowthPct: houseGrowth,
                    compareYears: 30,
                  });
                  const f = rows[29];
                  const buyW = f.buyEquity >= f.rentPortfolio;
                  return (
                    <tr key={label} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-medium text-gray-700">
                        {label}
                      </td>
                      <td className="px-3 py-2.5 text-right text-gray-600">
                        {houseGrowth}%
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-semibold ${
                          buyW ? "text-emerald-700" : "text-gray-600"
                        }`}
                      >
                        {formatWan(f.buyEquity)}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-semibold ${
                          !buyW ? "text-blue-700" : "text-gray-600"
                        }`}
                      >
                        {formatWan(f.rentPortfolio)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        {buyW ? (
                          <span className="text-emerald-700 font-bold">買房勝</span>
                        ) : (
                          <span className="text-blue-700 font-bold">租房勝</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 聯盟 CTA ── */}
        <MortgageAffiliateCTA />

        {/* ── FAQ ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">常見問題</h2>

          {[
            {
              q: "計算機沒考慮什麼？",
              a: "沒考慮：買房的土地增值稅/契稅（通常一次性，約房價1-3%）、租房搬家成本、裝潢費用、房東漲租風險。這些個人差異大，建議自行加入估算。",
            },
            {
              q: "持有成本0.5%是怎麼算的？",
              a: "台灣自住房屋稅約0.1%（房屋評定現值，非市價），地價稅自住優惠約0.2%（公告地價），加上修繕、管理費估0.2%，合計約0.5%市價/年。實際各縣市有差異。",
            },
            {
              q: "租房方案的錢真的會拿去投資嗎？",
              a: "這是最大假設。租房方案勝出的前提是你有紀律把省下的錢投入ETF，而不是花掉。若沒有投資紀律，租房的財富積累優勢就消失了。",
            },
            {
              q: "為什麼台灣租售比這麼低？",
              a: "台灣房價由「自住需求+投資需求+繼承不賣」三力推高，但租金受薪資水準限制。導致用租金回收房價的時間極長（台北市要50-60年），對房東投報率極差，但房價還是撐著——因為大家不是為了租金收益買房，而是看漲。",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <p className="text-xs font-semibold text-gray-800 mb-1">{q}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <AdUnit />

        {/* ── 相關工具 ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">相關工具</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/mortgage", label: "房貸月供計算", desc: "算等額本息/本金" },
              { href: "/mortgage-full-cost", label: "買房完整費用", desc: "隱藏費用全列" },
              { href: "/tax-calculator", label: "綜合所得稅試算", desc: "報稅季必用" },
              { href: "/pension-calculator", label: "勞退計算機", desc: "退休金規劃" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 p-3 hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
