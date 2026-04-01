import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅", active: true },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
];

// ── 115年度（114年所得，2026年5月申報）─────────────────────────────────
// 財政部公告 執行業務所得費用標準
// ─────────────────────────────────────────────────────────────────────
const EXPENSE_CATEGORIES = [
  {
    category: "一般接案／顧問／設計／程式",
    rate: 0.20,
    examples: "UI設計師、工程師、行銷顧問、翻譯、文案",
    color: "blue",
  },
  {
    category: "稿費、版稅、樂譜、作曲",
    rate: 0.20,
    examples: "作家、自媒體創作、歌手詞曲創作",
    color: "blue",
  },
  {
    category: "演講費（每次 ≤ 5,000 元）",
    rate: 0.30,
    examples: "講師、顧問演講、企業培訓",
    color: "green",
  },
  {
    category: "律師、會計師、記帳士、地政士",
    rate: 0.30,
    examples: "法律諮詢、稅務申報、代書",
    color: "green",
  },
  {
    category: "建築師、工程師、技師（執業）",
    rate: 0.35,
    examples: "建築師事務所、結構技師",
    color: "purple",
  },
  {
    category: "醫師（診所）",
    rate: 0.40,
    examples: "診所醫師、牙科醫師",
    color: "orange",
  },
];

// 115年度扣除額（單身納稅人）
const EXEMPTION = 97_000;          // 本人免稅額
const STD_DEDUCTION = 131_000;     // 標準扣除額（單身）
const SALARY_DEDUCTION = 218_000;  // 薪資特別扣除額（僅受僱員工適用）

// 五級累進稅率
const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 912_700 },
];

function calcTax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  const b = TAX_BRACKETS.find((t) => netIncome <= t.max)!;
  return Math.max(0, Math.round(netIncome * b.rate - b.diff));
}

function getRate(netIncome: number): number {
  if (netIncome <= 0) return 0.05;
  return TAX_BRACKETS.find((t) => netIncome <= t.max)!.rate;
}

function formatNTD(n: number) {
  return n.toLocaleString("zh-TW");
}

// 試算範例年收入（20% 費用率，最常見的接案族）
const INCOME_EXAMPLES = [
  400_000, 600_000, 800_000, 1_000_000,
  1_200_000, 1_500_000, 2_000_000, 3_000_000,
];

const COST_RATE = 0.20;

export default function FreelancerTaxGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                  l.active
                    ? "border-blue-500 bg-blue-50 font-semibold text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* ── Hero ── */}
        <section>
          <p className="text-sm font-medium text-blue-600">115年度 · 2026年5月報稅 · 114年接案所得</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-snug">
            自由工作者接案報稅完全指南
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            接案族報稅和上班族不同：你的所得屬於<strong>執行業務所得</strong>，
            政府承認你有一定比例的「成本」，可以直接從收入扣除，不需要單據。
            多數接案族費用率為 <strong>20%</strong>，等於政府認定你20%的收入是成本，
            只有 80% 的收入需要課稅。
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-xs text-gray-500">一般接案費用率</p>
              <p className="text-xl font-bold text-blue-700">20%</p>
              <p className="text-xs text-gray-400">設計/程式/顧問</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-xs text-gray-500">講師/律師費用率</p>
              <p className="text-xl font-bold text-green-700">30%</p>
              <p className="text-xs text-gray-400">演講/法律/稅務</p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-xs text-gray-500">年收超過此門檻</p>
              <p className="text-xl font-bold text-purple-700">109萬</p>
              <p className="text-xs text-gray-400">接案比上班更省稅</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-xs text-gray-500">二代健保補充費率</p>
              <p className="text-xl font-bold text-orange-700">2.11%</p>
              <p className="text-xs text-gray-400">由付款方代扣</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* ── 費用率試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">接案收入應繳稅額試算</h2>
          <p className="text-sm text-gray-500 mb-4">
            以費用率 20%、單身、標準扣除額計算（最常見的接案族情境）
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">年收入</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">費用扣除（20%）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">所得淨額</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">稅率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">應納稅額</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">有效稅率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {INCOME_EXAMPLES.map((gross) => {
                  const bizIncome = Math.round(gross * (1 - COST_RATE));
                  const netIncome = Math.max(0, bizIncome - EXEMPTION - STD_DEDUCTION);
                  const tax = calcTax(netIncome);
                  const rate = getRate(netIncome);
                  const effectiveRate = gross > 0 ? ((tax / gross) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={gross} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {formatNTD(gross)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500">
                        {formatNTD(Math.round(gross * COST_RATE))} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatNTD(netIncome)} 元
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-700">
                        {(rate * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-blue-700">{formatNTD(tax)}</span> 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500">
                        {effectiveRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 所得淨額 = 年收入 × 80%（執行業務所得後）- 免稅額 97,000 - 標準扣除額 131,000。未含二代健保補充保費。
          </p>
        </section>

        {/* ── 接案 vs 受僱比較 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            關鍵差異：接案族 vs 受僱員工，誰比較省稅？
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            員工可申報<strong>薪資特別扣除額 218,000 元</strong>，但接案族有<strong>20% 費用率</strong>。
            年收入超過約 <strong>109 萬</strong>，接案費用扣除額就超過薪資特別扣除額，接案族反而更省。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white mb-3">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">年收入</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">受僱員工稅額</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">接案族稅額（20%費用）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">差異</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[600_000, 800_000, 1_000_000, 1_200_000, 1_500_000, 2_000_000].map((gross) => {
                  // Employee
                  const empNet = Math.max(0, gross - SALARY_DEDUCTION - EXEMPTION - STD_DEDUCTION);
                  const empTax = calcTax(empNet);
                  // Freelancer (20% cost)
                  const freeBiz = Math.round(gross * 0.80);
                  const freeNet = Math.max(0, freeBiz - EXEMPTION - STD_DEDUCTION);
                  const freeTax = calcTax(freeNet);
                  const diff = empTax - freeTax;
                  return (
                    <tr key={gross} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {formatNTD(gross)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatNTD(empTax)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatNTD(freeTax)} 元
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {diff > 0 ? (
                          <span className="text-green-600">接案省 {formatNTD(diff)} 元</span>
                        ) : diff < 0 ? (
                          <span className="text-red-500">員工省 {formatNTD(-diff)} 元</span>
                        ) : (
                          <span className="text-gray-400">相同</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <strong>重要提醒：</strong>這只是所得稅的比較。受僱員工有雇主負擔的勞健保費，
            接案族需自行加入職業工會投保勞保、或以地區投保健保。
            整體成本需一起計算，稅額較低不代表總成本較低。
          </div>
        </section>

        {/* ── 費用標準各職類 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            執行業務所得費用標準（115年度）
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            依財政部公告，不同職類的費用率不同。費用率越高，課稅所得越低，稅越省。
            如果你的實際費用（設備、辦公室、材料等）超過費用標準，也可以選擇申報實際費用。
          </p>
          <div className="space-y-3">
            {EXPENSE_CATEGORIES.map((cat) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 border-blue-100",
                green: "bg-green-50 border-green-100",
                purple: "bg-purple-50 border-purple-100",
                orange: "bg-orange-50 border-orange-100",
              };
              const badgeMap: Record<string, string> = {
                blue: "bg-blue-100 text-blue-800",
                green: "bg-green-100 text-green-800",
                purple: "bg-purple-100 text-purple-800",
                orange: "bg-orange-100 text-orange-800",
              };
              return (
                <div
                  key={cat.category}
                  className={`rounded-2xl border p-4 ${colorMap[cat.color]}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{cat.category}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{cat.examples}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${badgeMap[cat.color]}`}
                      >
                        費用率 {(cat.rate * 100).toFixed(0)}%
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        課稅所得 {((1 - cat.rate) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            ※ 資料依據：財政部 114 年度執行業務所得費用標準。特殊情況（如醫師執行業務所得分類）
            依實際認定為準，建議諮詢會計師。
          </p>
        </section>

        <AdUnit />

        {/* ── 二代健保補充保費 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">二代健保補充保費：接案族必懂</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4 text-sm text-gray-700">
            <p>
              接案收入（執行業務所得）不是薪資，所以不由雇主負擔健保費。
              但政府規定：<strong>付款方（委託公司）需代扣 2.11% 的補充保費</strong>，
              從你的接案費用中直接扣除後才撥款給你。
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="font-semibold text-blue-800 mb-2">📋 補充保費重點</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• 費率：2.11%（114年度）</li>
                  <li>• 適用：非薪資的執行業務收入</li>
                  <li>• 扣繳方：付款的公司或個人</li>
                  <li>• 這筆費用不能申報所得稅扣除</li>
                </ul>
              </div>
              <div className="rounded-xl bg-amber-50 p-4">
                <p className="font-semibold text-amber-800 mb-2">💡 實際影響</p>
                <ul className="space-y-1 text-amber-700">
                  <li>• 年收 80 萬 × 2.11% ≈ 16,880 元/年</li>
                  <li>• 年收 120 萬 × 2.11% ≈ 25,320 元/年</li>
                  <li>• 計算實際稅負時需加入此成本</li>
                  <li>• 已加入職業工會者另有規定</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              ※ 如你已以地區人口身份加保全民健保，接案收入的補充保費仍需依規定繳納。
              詳細扣費規定請參考衛生福利部中央健康保險署公告。
            </p>
          </div>
        </section>

        {/* ── 3大節稅策略 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">接案族 3 大節稅策略</h2>
          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "申報實際費用（若超過費用標準）",
                body: "如果你的設備費、軟體訂閱、辦公室租金、差旅費等實際費用加總超過20%費用標準，可以選擇申報實際費用。年收入 100 萬的接案族，費用標準是 20 萬。若你的實際費用（電腦、訂閱、交通等）超過 20 萬，申報實際費用更省。",
                tag: "優先確認",
                tagColor: "bg-blue-100 text-blue-700",
              },
              {
                num: "02",
                title: "扶養親屬：每人省稅 4,850 ~ 58,200 元",
                body: "申報受扶養的父母、子女等，每人免稅額 97,000 元（70歲以上 145,500 元）。若你適用12%稅率，扶養一位父母可省 11,640 元；若適用20%稅率，可省 19,400 元。這是最直接的合法節稅方式。",
                tag: "立即可做",
                tagColor: "bg-green-100 text-green-700",
              },
              {
                num: "03",
                title: "年收入超過一定門檻：考慮設立行號",
                body: "若年接案收入穩定超過 200 萬，可評估設立獨資商號或有限公司。設立後以公司名義接案，費用申報更彈性，且可拆分薪資和盈餘，降低整體稅率。建議諮詢會計師評估適合的時機和形式。",
                tag: "進階規劃",
                tagColor: "bg-purple-100 text-purple-700",
              },
            ].map(({ num, title, body, tag, tagColor }) => (
              <div key={num} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gray-200 leading-none">{num}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagColor}`}>
                        {tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA to tax calculator ── */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-xl font-bold mb-2">算出你實際要繳多少稅</h2>
          <p className="text-blue-100 text-sm mb-4">
            輸入年收入、扶養人數、扣除額類型，30 秒得出精確應繳稅額、有效稅率、
            和與受僱員工的差異比較。
          </p>
          <Link
            href="/tax-calculator"
            className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow hover:bg-blue-50 transition"
          >
            開啟報稅計算器 →
          </Link>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "接案族要自己申報所得稅嗎？",
                a: "是的。接案收入屬於執行業務所得，需要在每年 5 月（115年度是申報 114 年所得）自行上網申報或到國稅局申報綜合所得稅。付款方（委託公司）會在每年1月底前開給你勞務報酬單（或稱給付清單），申報時需匯總所有收入。",
              },
              {
                q: "同時有正職薪水又有接案，要怎麼申報？",
                a: "薪資所得和執行業務所得需分開填報，但合併計算稅額。薪資部分可申報薪資特別扣除額 218,000 元；接案部分適用費用率扣除。最終合計所得淨額再套用累進稅率。兩種所得各自的扣除方式不同，建議使用報稅計算器試算。",
              },
              {
                q: "沒有開發票，接案收入要報稅嗎？",
                a: "需要。台灣報稅制度是所得申報制，不是以發票為準。只要你有收到執行業務收入，不論有無開發票，都需要如實申報。付款方若是公司，有義務開具勞務報酬單給你，且會自動上傳財政部，國稅局可以比對。",
              },
              {
                q: "接案族可以申報哪些費用？",
                a: "可以選擇：（1）標準費用率 20%（多數接案族選此）；（2）申報實際費用：設備購置費、軟體訂閱費、辦公室租金、業務交通費、進修費用等，需保留收據備查。選哪種方式，選較高的那個更省稅。若不確定，建議找會計師試算比較。",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="cursor-pointer p-5 font-semibold text-gray-800 flex items-center justify-between">
                  <span>{q}</span>
                  <span className="ml-2 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Affiliate CTA ── */}
        <TaxAffiliateCTA />

        {/* ── 相關工具 ── */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-bold text-gray-900 mb-3">相關試算工具</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/tax-calculator", label: "綜合所得稅計算器", desc: "含接案所得精算" },
              { href: "/income-tax-brackets", label: "所得稅五級累進稅率", desc: "各年收入適用稅率" },
              { href: "/dependent-deduction", label: "扶養親屬節稅試算", desc: "扶養父母省多少稅" },
              { href: "/salary-calculator", label: "月薪到手試算", desc: "受僱員工稅後收入" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-gray-400 pb-4">
          資料依據：財政部 114 年度綜合所得稅相關規定 ·{" "}
          <a
            href="https://www.mof.gov.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            財政部官網
          </a>{" "}
          · 衛生福利部中央健康保險署 · 最終稅額以個人實際情況為準
        </p>
      </main>
    </div>
  );
}
