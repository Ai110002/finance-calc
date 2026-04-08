"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度綜合所得稅（2025年所得，2026年5月申報）───────────────────────────
// 申報期間：2026年5月1日~5月31日
// 財政部114年度稅率表
// ──────────────────────────────────────────────────────────────────────────

const DEADLINE = new Date("2026-05-31T23:59:59+08:00");

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包", active: true },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "退休試算" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
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
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

// ── Checklist 步驟定義 ────────────────────────────────────────────────────────
type ChecklistItem = {
  id: string;
  step: number;
  title: string;
  desc: string;
  tool?: { href: string; label: string };
  tag?: string;
};

const CHECKLIST: ChecklistItem[] = [
  {
    id: "withheld",
    step: 1,
    title: "拿到扣繳憑單",
    desc: "雇主每年2月前寄送紙本（戶籍地址）或電子版。也可5月報稅時登入 eTax 系統自動帶入。兼職、股利等也各有扣繳憑單。",
    tag: "必做",
  },
  {
    id: "income",
    step: 2,
    title: "確認全部所得來源",
    desc: "薪資、兼職收入、股利（含台股/海外）、租金、利息、稿費、接案執行業務所得……每種所得報稅方式不同，遺漏可能被國稅局補稅加罰款。",
    tool: { href: "/tax-calculator", label: "報稅試算器" },
    tag: "必做",
  },
  {
    id: "deduction",
    step: 3,
    title: "選標準扣除 or 列舉扣除",
    desc: "標準扣除額：單身 NT$131,000、夫妻合報 NT$262,000，免文件直接用。若有房貸利息（上限30萬）、保險費、醫療費、捐款等，加總超過標準額才值得列舉。",
    tool: { href: "/deduction-compare", label: "列舉 vs 標準試算" },
    tag: "省稅關鍵",
  },
  {
    id: "dependent",
    step: 4,
    title: "確認受扶養親屬資格",
    desc: "父母（年滿60歲或無謀生能力）、未成年子女、在學子女每人可減免稅額 NT$97,000。符合條件才申報，亂報罰更多。",
    tool: { href: "/dependent-deduction", label: "扶養節稅計算" },
    tag: "省稅關鍵",
  },
  {
    id: "special",
    step: 5,
    title: "檢查特別扣除額（很多人漏掉）",
    desc: "薪資特扣 218,000/人、幼兒學前 120,000/人（5歲以下）、長期照顧 120,000/人、教育學費 25,000/人、儲蓄投資 270,000（含股利）。每一項都直接減應稅所得，漏掉很可惜。",
    tool: { href: "/preschool-deduction", label: "幼兒學前扣除試算" },
    tag: "省稅關鍵",
  },
  {
    id: "refund",
    step: 6,
    title: "試算退稅或補稅",
    desc: "輸入薪資＋扣繳稅額，30秒知道要退多少或補多少。年中換工作、有扶養親屬的人，退稅機率特別高。",
    tool: { href: "/tax-refund", label: "退稅試算器" },
    tag: "確認結果",
  },
  {
    id: "method",
    step: 7,
    title: "選申報方式並填寫",
    desc: "三種方式：① 手機報稅 App（最方便，健保卡＋讀卡機或 NFC）② 自然人憑證網路申報③ 紙本申報（效率最低）。5月1日開放，31日截止。",
    tag: "申報",
  },
  {
    id: "pay",
    step: 8,
    title: "繳稅（或填退稅帳號）",
    desc: "有補稅 → 申報時填繳款方式（匯款帳號、信用卡、ATM、超商）。有退稅 → 填銀行帳號最快，7至9月入帳；不填則寄支票到戶籍地址。",
    tag: "完成",
  },
];

// ── 3大族群懶人版說明 ─────────────────────────────────────────────────────────
const PERSONAS = [
  {
    icon: "💼",
    title: "一般上班族",
    items: [
      "只有薪資所得，直接用綜合所得稅 eTax",
      "扣繳憑單由雇主申報，系統自動帶入",
      "確認扶養親屬 → 選標準扣除 → 試算退稅",
      "多數人退稅 NT$3,000–20,000",
    ],
    cta: { href: "/tax-refund", label: "算我退多少 →" },
  },
  {
    icon: "💻",
    title: "自由工作者・接案族",
    items: [
      "執行業務所得可選「費用核實」或「9A費率」",
      "9A費率：政府認定收入有一定比例是成本，自動扣除",
      "費用核實：實際支出（設備/辦公/廣告）需提憑證",
      "股利另算，超過 670 萬基本所得額要注意 AMT",
    ],
    cta: { href: "/freelancer-tax-guide", label: "接案報稅完整攻略 →" },
  },
  {
    icon: "📈",
    title: "有股票・股利的投資族",
    items: [
      "台股資本利得免稅（賣股票獲利不課稅）",
      "股利需申報：選「28%分開計稅」或「合併計稅8.5%可抵減」",
      "持有美股ETF有海外所得，超過 100 萬需申報",
      "海外所得 + 薪資若超過 670 萬，注意最低稅負制",
    ],
    cta: { href: "/dividend-tax", label: "股利申報試算 →" },
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "2026年報稅截止日是幾號？",
    a: "2026年5月31日（週日）。延長申報期間通常到5月31日，若有困難可向國稅局申請延期。建議5月中前完成，避免最後幾天系統塞車。",
  },
  {
    q: "第一次報稅要準備什麼？",
    a: "必備：①扣繳憑單（雇主2月前提供）②健保卡或自然人憑證（eTax 登入用）③銀行帳號（退稅入帳用）。選填：受扶養親屬身分證字號、列舉扣除憑證（房貸對帳單、保險費收據等）。",
  },
  {
    q: "忘記申報怎麼辦？罰多少？",
    a: "申報截止後（5月31日後）最多可補申報至6月30日（補申報期間）。超過截止日未申報，國稅局會依查得資料核定稅額，並加徵逾期罰款（最高核定稅額2倍）。越快補報越省。",
  },
  {
    q: "只有薪資所得要申報嗎？",
    a: "是的。台灣採屬地主義，凡是在台灣境內取得的所得（薪資、租金、利息、股利、兼職報酬等）原則上都需申報。年收入在免稅額+標準扣除額以下（單身約 446,000 元）可能免稅，但仍需申報。",
  },
  {
    q: "夫妻要合報還是分報？",
    a: "絕大多數雙薪家庭合報更划算：可用雙份薪資特別扣除額（各 218,000）、共用較高標準扣除額（262,000）、共享扶養親屬免稅額。薪資差距很大時才可能分報更省，建議用試算器比較。",
  },
];

// ── 主頁面 ────────────────────────────────────────────────────────────────────
export default function TaxChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown
  useEffect(() => {
    function calc() {
      const now = Date.now();
      const diff = DEADLINE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
        return;
      }
      const totalMins = Math.floor(diff / 60000);
      const days = Math.floor(totalMins / (60 * 24));
      const hours = Math.floor((totalMins % (60 * 24)) / 60);
      const mins = totalMins % 60;
      setTimeLeft({ days, hours, mins });
    }
    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, []);

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const doneCount = useMemo(
    () => CHECKLIST.filter((c) => checked[c.id]).length,
    [checked]
  );
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);

  const tagColor: Record<string, string> = {
    必做: "bg-red-100 text-red-700",
    省稅關鍵: "bg-amber-100 text-amber-700",
    確認結果: "bg-blue-100 text-blue-700",
    申報: "bg-purple-100 text-purple-700",
    完成: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ── Nav ── */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  l.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">

        {/* ── Header ── */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            2026報稅懶人包
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            114年度綜合所得稅｜8步報稅清單，從拿憑單到退稅入帳一次搞定
          </p>
        </div>

        {/* ── Countdown ── */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white text-center shadow-lg">
          <p className="text-sm font-medium text-blue-100">距離報稅截止（5月31日）</p>
          <div className="mt-2 flex justify-center gap-4">
            <div>
              <span className="text-4xl font-bold">{timeLeft.days}</span>
              <p className="text-xs text-blue-200 mt-0.5">天</p>
            </div>
            <span className="text-3xl font-bold text-blue-300 self-center">:</span>
            <div>
              <span className="text-4xl font-bold">{timeLeft.hours}</span>
              <p className="text-xs text-blue-200 mt-0.5">小時</p>
            </div>
            <span className="text-3xl font-bold text-blue-300 self-center">:</span>
            <div>
              <span className="text-4xl font-bold">{timeLeft.mins}</span>
              <p className="text-xs text-blue-200 mt-0.5">分鐘</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-blue-200">
            申報期間：2026年5月1日 ~ 5月31日
          </p>
        </div>

        <AdUnit slot="tax-checklist-top" />

        {/* ── Progress ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">報稅進度</span>
            <span className="text-sm font-bold text-blue-600">{doneCount} / {CHECKLIST.length} 完成</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <p className="mt-2 text-center text-sm font-semibold text-green-600">
              報稅準備完成！記得在5月31日前送出申報
            </p>
          )}
        </div>

        {/* ── Checklist ── */}
        <div className="space-y-3">
          {CHECKLIST.map((item) => {
            const done = !!checked[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 transition-all cursor-pointer select-none ${
                  done
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-slate-100 shadow-sm hover:border-blue-200"
                }`}
                onClick={() => toggle(item.id)}
              >
                <div className="flex gap-3">
                  {/* Checkbox */}
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      done
                        ? "border-green-500 bg-green-500"
                        : "border-slate-300"
                    }`}
                  >
                    {done && (
                      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-400">STEP {item.step}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          tagColor[item.tag ?? ""] ?? "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className={`text-sm font-semibold ${done ? "line-through text-slate-400" : "text-slate-800"}`}>
                      {item.title}
                    </p>
                    {!done && (
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    )}
                    {!done && item.tool && (
                      <Link
                        href={item.tool.href}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 inline-block rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        {item.tool.label} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Personas ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            你是哪種報稅人？
          </h2>
          <div className="space-y-4">
            {PERSONAS.map((p) => (
              <div key={p.title} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-800 mb-2">
                  {p.icon} {p.title}
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span className="text-blue-400 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.cta.href}
                  className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  {p.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key numbers ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            114年度報稅關鍵數字速查
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "免稅額（每人）", value: "NT$97,000" },
              { label: "標準扣除－單身", value: "NT$131,000" },
              { label: "標準扣除－夫妻合報", value: "NT$262,000" },
              { label: "薪資特別扣除（上限）", value: "NT$218,000" },
              { label: "幼兒學前特別扣除", value: "NT$120,000/人" },
              { label: "長期照顧特別扣除", value: "NT$120,000/人" },
              { label: "教育學費特別扣除", value: "NT$25,000/人" },
              { label: "儲蓄投資特別扣除", value: "NT$270,000" },
              { label: "最低稅負基本所得額免稅", value: "NT$670萬/戶" },
              { label: "所得稅最低稅率", value: "5%（59萬以下）" },
              { label: "所得稅最高稅率", value: "40%（498萬以上）" },
              { label: "申報截止", value: "2026/5/31" },
            ].map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <p className="text-slate-500">{r.label}</p>
                <p className="font-bold text-slate-800 mt-0.5">{r.value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/income-tax-brackets"
            className="mt-3 block text-center text-xs text-blue-500 hover:underline"
          >
            完整所得稅級距表 →
          </Link>
        </div>

        <AdUnit slot="tax-checklist-mid" />

        {/* ── FAQ ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            報稅常見問題
          </h2>
          <div className="space-y-2">
            {FAQ.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-slate-700 pr-2">{faq.q}</span>
                  <span className="text-slate-400 shrink-0 text-lg leading-none">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Affiliate CTA ── */}
        <TaxAffiliateCTA />

        {/* ── Related Tools ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-3">相關計算工具</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { href: "/tax-calculator", label: "報稅試算器" },
              { href: "/tax-refund", label: "退稅試算器" },
              { href: "/deduction-compare", label: "列舉 vs 標準扣除" },
              { href: "/dependent-deduction", label: "扶養節稅試算" },
              { href: "/dividend-tax", label: "股利申報試算" },
              { href: "/preschool-deduction", label: "幼兒學前扣除" },
              { href: "/foreign-income-tax", label: "海外所得試算" },
              { href: "/income-tax-brackets", label: "所得稅級距表" },
              { href: "/basic-living-deduction", label: "免稅天花板試算" },
              { href: "/freelancer-tax-guide", label: "接案報稅指南" },
              { href: "/tax-filing-guide", label: "報稅攻略完整版" },
              { href: "/supplement-premium", label: "二代健保試算" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <AdUnit slot="tax-checklist-bottom" />

        {/* ── Schema Markup ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "name": "2026報稅懶人包・互動清單",
                  "url": "https://www.twtaxcalc.com/tax-checklist-2026",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "Web",
                  "description":
                    "114年度綜合所得稅（2026年5月申報）完整報稅步驟清單，含倒數計時、互動勾選、三大族群攻略、關鍵數字速查",
                  "inLanguage": "zh-TW",
                  "isAccessibleForFree": true,
                },
                {
                  "@type": "HowTo",
                  "name": "2026年報稅完整步驟（114年度綜合所得稅）",
                  "description": "從拿扣繳憑單到退稅入帳，第一次報稅也看得懂的8步驟",
                  "totalTime": "PT30M",
                  "step": CHECKLIST.map((c) => ({
                    "@type": "HowToStep",
                    "position": c.step,
                    "name": c.title,
                    "text": c.desc,
                  })),
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": FAQ.map((f) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a },
                  })),
                },
              ],
            }),
          }}
        />

        <footer className="text-center text-xs text-slate-400 pb-4">
          本頁依據財政部114年度綜合所得稅規定整理，僅供參考。
          實際申報以國稅局規定為準。
        </footer>
      </main>
    </div>
  );
}
