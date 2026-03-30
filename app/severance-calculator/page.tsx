"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 資遣費計算規則 ─────────────────────────────────────────────
// 新制（勞工退休金條例 §12，2005/7/1 後適用）：
//   每滿1年給付 0.5 個月平均工資，最高 6 個月（年資上限 12 年）
//   未滿1年按比例計算
//
// 舊制（勞動基準法 §17，2005/7/1 前適用）：
//   每滿1年給付 1 個月平均工資，未滿1年按比例計算
//
// 退職所得免稅（114年度）：
//   每服務年資可免稅 $198,000（財政部每年公告，以實際公告為準）
//   超過免稅額 × 1 倍部分：50% 計入綜合所得
//   超過免稅額 × 2 倍部分：100% 計入綜合所得
// ──────────────────────────────────────────────────────────────

// 114年度退職所得每年免稅額（財政部公告，以實際為準）
const EXEMPT_PER_YEAR = 198_000;

type System = "new" | "old";

function calcSeverance(
  avgMonthly: number,
  yearsTotal: number, // 含小數（例如 2.5 = 2年6個月）
  system: System
): { months: number; amount: number } {
  if (system === "new") {
    const cappedYears = Math.min(yearsTotal, 12); // 最高12年（對應6個月上限）
    const months = cappedYears / 2;
    return { months, amount: avgMonthly * months };
  } else {
    // 舊制
    const months = yearsTotal;
    return { months, amount: avgMonthly * months };
  }
}

function calcTaxExempt(
  severanceAmount: number,
  yearsTotal: number
): { exempt: number; halfTaxable: number; fullTaxable: number; taxableIncome: number } {
  const wholeYears = Math.max(Math.floor(yearsTotal), 1);
  const tier1 = EXEMPT_PER_YEAR * wholeYears; // 免稅上限
  const tier2 = EXEMPT_PER_YEAR * wholeYears * 2; // 半數計稅上限

  if (severanceAmount <= tier1) {
    return { exempt: severanceAmount, halfTaxable: 0, fullTaxable: 0, taxableIncome: 0 };
  } else if (severanceAmount <= tier2) {
    const excess = severanceAmount - tier1;
    return { exempt: tier1, halfTaxable: excess, fullTaxable: 0, taxableIncome: excess * 0.5 };
  } else {
    const halfPortion = tier1;
    const fullPortion = severanceAmount - tier2;
    const halfTaxable = tier1;
    return {
      exempt: tier1,
      halfTaxable,
      fullTaxable: fullPortion,
      taxableIncome: halfTaxable * 0.5 + fullPortion,
    };
  }
}

// ── UI 元件 ────────────────────────────────────────────────────

function NumField({
  label,
  hint,
  value,
  onChange,
  suffix,
  placeholder,
  min = 0,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  placeholder?: string;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="mb-1.5 text-xs text-gray-400 leading-relaxed">{hint}</p>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => {
            const v = parseFloat(e.target.value.replace(/,/g, ""));
            onChange(isNaN(v) ? 0 : Math.max(min, v));
          }}
        />
        {suffix && <span className="whitespace-nowrap text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
  sublabel,
  warning,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
  warning?: boolean;
}) {
  const bg = highlight ? "bg-blue-50 ring-1 ring-blue-200" : warning ? "bg-amber-50 ring-1 ring-amber-200" : "bg-gray-50";
  const labelColor = highlight ? "text-blue-800" : warning ? "text-amber-800" : "text-gray-700";
  const valueColor = highlight ? "text-blue-700" : warning ? "text-amber-700" : "text-gray-900";
  return (
    <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${bg}`}>
      <div>
        <p className={`text-sm font-medium ${labelColor}`}>{label}</p>
        {sublabel && <p className="mt-0.5 text-xs text-gray-400">{sublabel}</p>}
      </div>
      <p className={`text-base font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}

// ── 主頁面 ─────────────────────────────────────────────────────

export default function SeveranceCalculatorPage() {
  const [avgMonthly, setAvgMonthly] = useState(50_000);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [system, setSystem] = useState<System>("new");

  const yearsTotal = years + months / 12;

  const { months: payMonths, amount: severanceAmount } = useMemo(
    () => calcSeverance(avgMonthly, yearsTotal, system),
    [avgMonthly, yearsTotal, system]
  );

  const taxCalc = useMemo(
    () => calcTaxExempt(severanceAmount, yearsTotal),
    [severanceAmount, yearsTotal]
  );

  const fmt = (n: number) =>
    n.toLocaleString("zh-TW", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const hasResult = avgMonthly > 0 && yearsTotal > 0;
  const cappedAt12 = system === "new" && yearsTotal > 12;

  return (
    <div className="min-h-screen pb-16">
      {/* 導覽 */}
      <div className="flex gap-2 overflow-x-auto bg-white px-4 pt-4 pb-2 text-sm">
        <Link
          href="/"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          財務自由
        </Link>
        <Link
          href="/tax-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          報稅計算
        </Link>
        <Link
          href="/mortgage"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          房貸計算
        </Link>
        <Link
          href="/overtime-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          加班費
        </Link>
        <span className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1 font-medium text-white">
          資遣費
        </span>
        <Link
          href="/salary-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          月薪試算
        </Link>
        <Link
          href="/bonus-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          年終獎金
        </Link>
        <Link
          href="/pension-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          勞退計算
        </Link>
        <Link
          href="/basic-living-deduction"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          免稅天花板
        </Link>
        <Link
          href="/labor-insurance-rates"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          勞健保費率
        </Link>
        <Link
          href="/income-tax-brackets"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          所得稅級距
        </Link>
        <Link
          href="/dependent-deduction"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          扶養節稅
        </Link>
        <Link
          href="/freelancer-tax-guide"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          接案報稅
        </Link>
        <Link
          href="/supplement-premium"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          二代健保
        </Link>
        <Link
          href="/salary-vs-freelancer"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          薪資vs接案
        </Link>
        <Link
          href="/tax-filing-guide"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          報稅攻略
        </Link>
        <Link
          href="/dividend-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          股利申報
        </Link>
        <Link
          href="/mortgage-full-cost"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          買房費用
        </Link>
        <Link
          href="/buy-vs-rent"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          買vs租
        </Link>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* 標題 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">資遣費計算器</h1>
          <p className="mt-1 text-sm text-gray-500">
            新制 / 舊制即時試算 · 含免稅試算 · 114 年度版 · 免費免登入
          </p>
        </div>

        {/* 制度選擇 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">適用制度</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSystem("new")}
              className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                system === "new"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className={`text-sm font-bold ${system === "new" ? "text-blue-700" : "text-gray-700"}`}>
                新制
              </p>
              <p className="mt-0.5 text-xs text-gray-400 leading-snug">
                2005/7/1 後入職<br />每年 0.5 個月，上限 6 個月
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSystem("old")}
              className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                system === "old"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className={`text-sm font-bold ${system === "old" ? "text-blue-700" : "text-gray-700"}`}>
                舊制
              </p>
              <p className="mt-0.5 text-xs text-gray-400 leading-snug">
                2005/7/1 前已在職<br />每年 1 個月，無上限
              </p>
            </button>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            不確定適用哪個？2005 年 7 月後才入職通常適用新制。若在職超過 20 年或入職時間橫跨 2005 年，建議向人資確認。
          </p>
        </div>

        {/* 輸入 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">基本資料</h2>
          <NumField
            label="平均月薪（最近6個月）"
            hint="依勞基法，資遣費以「平均工資」計算，即被資遣日前6個月總工資 ÷ 180天 × 30天。若薪資固定，直接填月薪即可。"
            value={avgMonthly}
            onChange={setAvgMonthly}
            suffix="元"
            placeholder="50000"
            min={1}
          />
          <div className="grid grid-cols-2 gap-3">
            <NumField
              label="服務年資（年）"
              hint="在同一雇主服務的年數"
              value={years}
              onChange={(v) => setYears(Math.floor(v))}
              suffix="年"
              placeholder="3"
              min={0}
            />
            <NumField
              label="服務年資（月）"
              hint="未滿1年的月數（0–11）"
              value={months}
              onChange={(v) => setMonths(Math.min(11, Math.floor(v)))}
              suffix="個月"
              placeholder="0"
              min={0}
            />
          </div>

          {cappedAt12 && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700 ring-1 ring-amber-200">
              新制最高計算 12 年年資（對應 6 個月上限），您的 {years} 年 {months} 個月只計算到 12 年。
            </p>
          )}
        </div>

        {/* 計算結果 */}
        {hasResult && (
          <>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-3">
              <h2 className="font-semibold text-gray-800">資遣費試算</h2>

              <ResultRow
                label="計算年資"
                value={`${Math.min(yearsTotal, system === "new" ? 12 : yearsTotal).toFixed(2)} 年`}
                sublabel={cappedAt12 ? "依新制上限截為 12 年" : `${years} 年 ${months} 個月`}
              />
              <ResultRow
                label="折算月數"
                value={`${payMonths.toFixed(2)} 個月`}
                sublabel={system === "new" ? "年資 ÷ 2（新制）" : "年資 × 1（舊制）"}
              />
              <ResultRow
                label="資遣費金額"
                value={`$${fmt(severanceAmount)} 元`}
                highlight
                sublabel={`月薪 $${fmt(avgMonthly)} × ${payMonths.toFixed(2)} 個月`}
              />
            </div>

            <AdUnit className="my-1" />

            {/* 免稅試算 */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-3">
              <div>
                <h2 className="font-semibold text-gray-800">退職所得免稅試算</h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  依 114 年度標準，每服務年資免稅 $198,000（以財政部實際公告為準）
                </p>
              </div>

              <ResultRow
                label="免稅上限（第一階）"
                value={`$${fmt(EXEMPT_PER_YEAR * Math.max(Math.floor(yearsTotal), 1))} 元`}
                sublabel={`$198,000 × ${Math.max(Math.floor(yearsTotal), 1)} 年`}
              />

              {taxCalc.exempt > 0 && (
                <ResultRow
                  label="免稅金額"
                  value={`$${fmt(taxCalc.exempt)} 元`}
                  sublabel="完全免稅部分"
                />
              )}
              {taxCalc.halfTaxable > 0 && (
                <ResultRow
                  label="半數計入所得"
                  value={`$${fmt(taxCalc.halfTaxable)} 元 × 50%`}
                  sublabel={`→ 計入綜合所得 $${fmt(taxCalc.halfTaxable * 0.5)} 元`}
                  warning
                />
              )}
              {taxCalc.fullTaxable > 0 && (
                <ResultRow
                  label="全額計入所得"
                  value={`$${fmt(taxCalc.fullTaxable)} 元`}
                  sublabel="超過免稅上限 2 倍部分，100% 計入"
                  warning
                />
              )}

              <div className="rounded-xl bg-blue-50 ring-1 ring-blue-100 px-4 py-3">
                <p className="text-sm font-medium text-blue-800">
                  應計入綜合所得：<strong>${fmt(taxCalc.taxableIncome)} 元</strong>
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  與其他所得合併後，依累進稅率申報。建議找稅務師確認實際應繳金額。
                </p>
              </div>
            </div>

            {/* 報稅引導 */}
            <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100 space-y-3">
              <h2 className="font-semibold text-amber-900">資遣費加薪資，這年要繳多少稅？</h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                被資遣的年度，所得通常比較複雜——有薪資所得、退職所得，可能還有失業給付。
                用報稅計算器先跑一遍，掌握大概稅額，才不會報稅季措手不及。
              </p>
              <Link
                href="/tax-calculator"
                className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
              >
                試算今年所得稅 →
              </Link>
            </div>
          </>
        )}

        {/* 法規說明 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">計算說明</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <div>
              <p className="font-medium text-gray-700 mb-1">新制資遣費（勞工退休金條例 §12）</p>
              <p>
                2005 年 7 月 1 日施行。每滿一年給付<strong>半個月</strong>平均工資，
                最高給付 6 個月（即最多計算 12 年年資）。未滿一年按比例計算。
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">舊制資遣費（勞動基準法 §17）</p>
              <p>
                每滿一年給付<strong>一個月</strong>平均工資，未滿一年按比例計算。
                適用 2005 年 7 月前入職且未選擇轉換新制的勞工。
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">平均工資怎麼算</p>
              <p>
                依勞基法 §2，平均工資 = 事由發生日前六個月總工資 ÷ 六個月總日數。
                若薪資固定，直接以月薪替代即可。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 pt-1 border-t border-gray-100">
            本工具為估算參考，實際資遣費可能因公司薪資結構、適用制度而有差異。
            稅務計算建議以財政部最新公告為準，並諮詢稅務專業人士。
          </p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">常見問題</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">公司說要「資遣」，我能拒絕嗎？</p>
              <p className="mt-1 text-gray-600">
                雇主資遣需符合勞基法 §11 或 §13 規定的法定事由（如業務緊縮、虧損等）。
                若資遣原因不合法，屬於違法解僱，可向勞工局申訴或提起訴訟，不需接受資遣條件。
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-800">資遣費和退休金一樣嗎？</p>
              <p className="mt-1 text-gray-600">
                不一樣。退休金是你自己（和公司）每月提撥累積的退休準備金，
                放在勞工個人帳戶。資遣費是被資遣時雇主另外給付的補償金，兩者分開計算。
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-800">被資遣後可以領失業給付嗎？</p>
              <p className="mt-1 text-gray-600">
                可以。符合條件的話（加保達一定期間、非自願離職），可向勞動部勞工保險局申請失業給付，
                最長可領 6 個月，金額約為投保薪資的 60%。
              </p>
            </div>
          </div>
        </div>

        <TaxAffiliateCTA />

        <AdUnit className="my-1" />

        {/* 相關工具 */}
        <div className="rounded-2xl bg-gray-50 p-5 space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm">相關工具</h2>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/tax-calculator"
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100 hover:ring-blue-300 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">報稅計算器</p>
                <p className="text-xs text-gray-400">綜合所得稅試算 · 114 年度</p>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/overtime-calculator"
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100 hover:ring-blue-300 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">加班費計算器</p>
                <p className="text-xs text-gray-400">依勞基法試算平日、假日加班費</p>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100 hover:ring-blue-300 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">財務自由計算器</p>
                <p className="text-xs text-gray-400">存錢目標 · 退休試算</p>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
