"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 勞基法 §24 加班費計算規則 ──────────────────────────────────
// 時薪 = 月薪 ÷ 240（月薪 ÷ 30天 ÷ 8小時）
// 平日加班：前2小時 × 4/3，第3小時起 × 5/3
// 休息日加班：前2小時 × 4/3，第3~8小時 × 5/3，逾8小時 × 5/3（工時採4/8/12進位計算）
// 國定假日出勤：全日 × 2（工資加倍）
// ────────────────────────────────────────────────────────────────

const MIN_WAGE = 28_590; // 114年度基本工資（月薪）

function calcHourlyRate(monthlySalary: number): number {
  return monthlySalary / 240;
}

/** 平日加班費（依月累計時數分段計算） */
function calcWeekdayOT(hourlyRate: number, hours1to2: number, hoursAfter2: number): number {
  return hourlyRate * (4 / 3) * hours1to2 + hourlyRate * (5 / 3) * hoursAfter2;
}

/**
 * 休息日加班費
 * 勞基法 §24-2：工時採 4/8/12 進位計算（不足4小時算4小時，4-8算8小時，8-12算12小時）
 * 前2小時 4/3 倍，第3小時起 5/3 倍
 */
function calcRestDayOT(hourlyRate: number, actualHours: number): {
  billedHours: number;
  pay: number;
} {
  if (actualHours <= 0) return { billedHours: 0, pay: 0 };
  // 進位到 4/8/12
  let billedHours: number;
  if (actualHours <= 4) billedHours = 4;
  else if (actualHours <= 8) billedHours = 8;
  else billedHours = 12;

  // 前2小時 4/3，其餘 5/3
  const h1 = Math.min(billedHours, 2);
  const h2 = Math.max(billedHours - 2, 0);
  const pay = hourlyRate * (4 / 3) * h1 + hourlyRate * (5 / 3) * h2;
  return { billedHours, pay };
}

/** 國定假日加班費（2倍工資，已含原日薪） */
function calcHolidayOT(hourlyRate: number, hours: number): number {
  return hourlyRate * 2 * hours;
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
}: {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
        highlight ? "bg-blue-50 ring-1 ring-blue-200" : "bg-gray-50"
      }`}
    >
      <div>
        <p className={`text-sm font-medium ${highlight ? "text-blue-800" : "text-gray-700"}`}>
          {label}
        </p>
        {sublabel && <p className="mt-0.5 text-xs text-gray-400">{sublabel}</p>}
      </div>
      <p className={`text-base font-bold ${highlight ? "text-blue-700" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

// ── 主頁面 ─────────────────────────────────────────────────────

export default function OvertimeCalculatorPage() {
  const [monthly, setMonthly] = useState(45_000);
  const [weekday1, setWeekday1] = useState(0);   // 平日加班（前2小時/天累計）
  const [weekday2, setWeekday2] = useState(0);   // 平日加班（第3小時起/天累計）
  const [restDay, setRestDay] = useState(0);     // 休息日加班（實際時數）
  const [holiday, setHoliday] = useState(0);    // 國定假日出勤時數

  const result = useMemo(() => {
    const hourlyRate = calcHourlyRate(monthly);
    const weekdayPay = calcWeekdayOT(hourlyRate, weekday1, weekday2);
    const { billedHours, pay: restDayPay } = calcRestDayOT(hourlyRate, restDay);
    const holidayPay = calcHolidayOT(hourlyRate, holiday);
    const total = weekdayPay + restDayPay + holidayPay;
    return { hourlyRate, weekdayPay, restDayPay, billedHours, holidayPay, total };
  }, [monthly, weekday1, weekday2, restDay, holiday]);

  const fmt = (n: number) =>
    n.toLocaleString("zh-TW", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const hasInput = weekday1 > 0 || weekday2 > 0 || restDay > 0 || holiday > 0;

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
        <span className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1 font-medium text-white">
          加班費
        </span>
        <Link
          href="/severance-calculator"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          資遣費
        </Link>
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
          href="/expense-deduction-compare"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          費用核實試算
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
        <Link
          href="/real-estate-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          房地合一稅
        </Link>
        <Link
          href="/inheritance-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          遺產稅
        </Link>
        <Link
          href="/gift-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          贈與稅
        </Link>
        <Link
          href="/stock-tax-2026"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          投資稅務
        </Link>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* 標題 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">加班費計算器</h1>
          <p className="mt-1 text-sm text-gray-500">
            依勞動基準法計算 · 115 年版 · 免費免登入
          </p>
        </div>

        {/* 月薪輸入 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">基本設定</h2>
          <NumField
            label="月薪（本薪）"
            hint={`最低基本工資 $${MIN_WAGE.toLocaleString()} 元。只填本薪，不含其他津貼。`}
            value={monthly}
            onChange={setMonthly}
            suffix="元"
            placeholder="45000"
            min={MIN_WAGE}
          />
          <div className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-500">
              每小時工資（月薪 ÷ 240）
            </p>
            <p className="mt-0.5 text-xl font-bold text-blue-600">
              {result.hourlyRate.toLocaleString("zh-TW", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              元／小時
            </p>
          </div>
        </div>

        {/* 加班時數輸入 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-5">
          <h2 className="font-semibold text-gray-800">本月加班時數</h2>

          {/* 平日加班 */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              平日加班
              <span className="ml-2 text-xs font-normal text-gray-400">週一至週五（正常班後）</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <NumField
                label="前2小時/天（累計）"
                hint="4/3 倍（時薪 × 1.34）"
                value={weekday1}
                onChange={setWeekday1}
                suffix="小時"
                placeholder="0"
              />
              <NumField
                label="第3小時起/天（累計）"
                hint="5/3 倍（時薪 × 1.67）"
                value={weekday2}
                onChange={setWeekday2}
                suffix="小時"
                placeholder="0"
              />
            </div>
          </div>

          {/* 分隔線 */}
          <div className="border-t border-gray-100" />

          {/* 休息日加班 */}
          <NumField
            label="休息日加班（實際時數）"
            hint="通常是週六。法定計費採 4/8/12 小時進位；前 2 小時 4/3 倍，第 3 小時起 5/3 倍。"
            value={restDay}
            onChange={setRestDay}
            suffix="小時"
            placeholder="0"
          />
          {restDay > 0 && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              實際 {restDay} 小時 → 依法計費 <strong>{result.billedHours} 小時</strong>
              （採 4/8/12 進位）
            </p>
          )}

          {/* 分隔線 */}
          <div className="border-t border-gray-100" />

          {/* 國定假日 */}
          <NumField
            label="國定假日出勤時數"
            hint="元旦、春節、勞動節等。出勤當日薪資加倍（2倍），此欄填實際工作時數。"
            value={holiday}
            onChange={setHoliday}
            suffix="小時"
            placeholder="0"
          />
        </div>

        {/* 計算結果 */}
        {hasInput && (
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-3">
            <h2 className="font-semibold text-gray-800">計算結果</h2>

            {weekday1 > 0 && (
              <ResultRow
                label="平日加班（前2小時）"
                sublabel={`${weekday1}h × ${result.hourlyRate.toFixed(2)} × 4/3`}
                value={`$${fmt(result.hourlyRate * (4 / 3) * weekday1)}`}
              />
            )}
            {weekday2 > 0 && (
              <ResultRow
                label="平日加班（第3小時起）"
                sublabel={`${weekday2}h × ${result.hourlyRate.toFixed(2)} × 5/3`}
                value={`$${fmt(result.hourlyRate * (5 / 3) * weekday2)}`}
              />
            )}
            {restDay > 0 && (
              <ResultRow
                label="休息日加班"
                sublabel={`計費 ${result.billedHours}h（實際 ${restDay}h）`}
                value={`$${fmt(result.restDayPay)}`}
              />
            )}
            {holiday > 0 && (
              <ResultRow
                label="國定假日出勤"
                sublabel={`${holiday}h × ${result.hourlyRate.toFixed(2)} × 2`}
                value={`$${fmt(result.holidayPay)}`}
              />
            )}

            <div className="border-t border-gray-100 pt-1" />

            <ResultRow
              label="本月加班費合計"
              value={`$${fmt(result.total)} 元`}
              highlight
            />
          </div>
        )}

        <AdUnit className="my-1" />

        {/* 加班費與報稅 */}
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100 space-y-3">
          <h2 className="font-semibold text-amber-900">加班費要報稅嗎？</h2>
          <div className="space-y-2 text-sm text-amber-800 leading-relaxed">
            <p>
              要。加班費屬於<strong>薪資所得</strong>，公司年底開給你的扣繳憑單裡會一起列入，
              報稅時需計入綜合所得總額。
            </p>
            <p>
              好消息是薪資所得有 <strong>$218,000 特別扣除額</strong>，薪資在這個門檻內的部分不用繳稅。
            </p>
          </div>
          <Link
            href="/tax-calculator"
            className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            算一下我要繳多少所得稅 →
          </Link>
        </div>

        {/* 法規說明 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">計算說明</h2>

          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <div>
              <p className="font-medium text-gray-700 mb-1">時薪換算</p>
              <p>月薪 ÷ 30 ÷ 8 = 月薪 ÷ 240。例：月薪 $45,000 → 時薪 $187.5。</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">平日加班（勞基法 §24 第1項）</p>
              <ul className="ml-3 space-y-0.5">
                <li>・第 1–2 小時：時薪 × 4/3（加給 1/3）</li>
                <li>・第 3 小時起：時薪 × 5/3（加給 2/3）</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">休息日加班（勞基法 §24 第2項）</p>
              <ul className="ml-3 space-y-0.5">
                <li>・工時採 4/8/12 小時進位計算</li>
                <li>・前 2 小時：時薪 × 4/3</li>
                <li>・第 3 小時起：時薪 × 5/3</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">國定假日（勞基法 §39）</p>
              <p>出勤薪資加倍（2倍）。例假日（週日）原則上不得出勤。</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 pt-1 border-t border-gray-100">
            此工具為估算參考，實際加班費可能因公司薪資結構（底薪 + 津貼）而有差異。
            勞資爭議建議洽詢勞工局。
          </p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800">常見問題</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">加班費有上限嗎？</p>
              <p className="mt-1 text-gray-600">
                勞基法規定每月加班時數上限為 54 小時（每3個月不超過138小時）。
                加班費本身沒有金額上限，但公司不能以補休替代加班費，除非勞工自願選擇補休。
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-800">用補休還是加班費？哪個比較划算？</p>
              <p className="mt-1 text-gray-600">
                純薪資角度看，加班費直接拿現金。但補休有時間彈性，也不佔收入（不影響報稅級距）。
                若你的薪資已快到下一個稅率級距，補休反而能省稅。
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-800">月薪只有底薪，還是含津貼？</p>
              <p className="mt-1 text-gray-600">
                依勞基法，計算加班費的「工資」需包含「經常性給付」，例如固定的交通津貼、伙食津貼。
                但年終獎金、不固定的績效獎金通常不算。若不確定，可查閱薪資單或詢問人資。
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
