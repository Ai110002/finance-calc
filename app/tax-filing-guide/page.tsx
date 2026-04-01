import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114 年度綜合所得稅（2025年所得，2026年5月申報）─────────────────────────
// 依財政部114年度稅率表
// ──────────────────────────────────────────────────────────────────────────

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
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略", active: true },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
];

const TAX_BRACKETS = [
  { range: "0 ~ 590,000", rate: "5%", diff: "0" },
  { range: "590,001 ~ 1,330,000", rate: "12%", diff: "41,300" },
  { range: "1,330,001 ~ 2,660,000", rate: "20%", diff: "147,700" },
  { range: "2,660,001 ~ 4,980,000", rate: "30%", diff: "413,700" },
  { range: "4,980,001 以上", rate: "40%", diff: "911,700" },
];

const DEDUCTIONS = [
  {
    category: "免稅額",
    items: [
      { name: "每人免稅額", amount: "97,000", note: "本人、配偶、扶養親屬各乙份" },
      { name: "70歲以上免稅額", amount: "145,500", note: "為一般免稅額1.5倍" },
    ],
  },
  {
    category: "標準扣除額",
    items: [
      { name: "單身申報", amount: "131,000", note: "免附單據直接扣" },
      { name: "夫妻合併申報", amount: "262,000", note: "免附單據直接扣" },
    ],
  },
  {
    category: "特別扣除額",
    items: [
      { name: "薪資所得特別扣除額", amount: "218,000 (上限)", note: "薪資族必用，有薪資就有這個" },
      { name: "儲蓄投資特別扣除額", amount: "270,000 (上限)", note: "利息所得/短期票券可扣" },
      { name: "身心障礙特別扣除額", amount: "218,000/人", note: "本人或扶養親屬持手冊者" },
      { name: "幼兒學前特別扣除額（第1胎）", amount: "150,000/人", note: "6歲以下，父或母擇一申報" },
      { name: "幼兒學前特別扣除額（第2胎起）", amount: "225,000/人", note: "6歲以下第2個孩子起" },
      { name: "教育學費特別扣除額", amount: "25,000/人", note: "就讀大學/研究所的子女" },
      { name: "長期照顧特別扣除額", amount: "120,000/人", note: "符合CMS 2級以上失能者" },
      { name: "房屋租金特別扣除額", amount: "180,000 (上限)", note: "114年度新制，租屋族新增節稅" },
    ],
  },
  {
    category: "基本生活費差額扣除",
    items: [
      { name: "每人基本生活費", amount: "210,000", note: "全家基本生活費合計若大於一般免稅額+標準扣除額，差額可加扣" },
    ],
  },
];

const STEPS = [
  {
    step: "01",
    title: "取得所有所得資料",
    color: "blue",
    content: [
      "財政部「自然人憑證」或「健保卡」登入，綜合所得稅申報系統會自動帶入雇主申報的薪資、利息、股利等資料。",
      "自由工作者需確認各委託方是否已正確申報你的執行業務所得（9A/9B）。",
      "每年4月底前可至財政部入口網查詢「所得及扣繳稅額清單」，核對是否有遺漏或錯誤。",
    ],
    tool: null,
  },
  {
    step: "02",
    title: "計算各項扣除額，選最省方案",
    color: "green",
    content: [
      "先用標準扣除額試算，再看列舉扣除額（保費+醫療+捐贈+房貸利息+租金）是否超過標準扣除額，選比較高的那個。",
      "別忘了特別扣除額：薪資族的218,000元薪資特別扣除額幾乎人人適用。",
      "有扶養親屬（父母、子女）的要算清楚能扣多少免稅額，一個眷口至少省稅4,850元（5%稅率 × 97,000）。",
    ],
    tool: { href: "/tax-calculator", label: "用報稅計算器算出你的稅額 →" },
  },
  {
    step: "03",
    title: "確認繳稅或退稅金額",
    color: "purple",
    content: [
      "全年已預扣稅款（薪資扣繳、各類所得扣繳稅款）若超過應繳稅額 → 退稅。",
      "自由工作者通常每筆收入已被扣10%預扣稅，年終合計後若扣太多就可退稅。",
      "應補稅額超過2,000元時，可選擇分期繳納（2期或3期）。",
    ],
    tool: { href: "/tax-calculator", label: "算算你是退稅還是補稅 →" },
  },
  {
    step: "04",
    title: "選擇申報方式並提交",
    color: "orange",
    content: [
      "網路申報（推薦）：財政部電子申報系統，5月1日起開放，建議月初盡早申報，退稅較快到帳。",
      "手機App：財政部「報稅行動App」，適合資料單純的薪資族，15分鐘內可完成。",
      "紙本申報：至國稅局或便民服務點領表，申報期最後幾天才考慮，排隊費時。",
      "繳稅期限：5月31日，逾期每天加計利息0.05%罰鍰，盡早完成。",
    ],
    tool: null,
  },
];

const CALCULATORS = [
  {
    href: "/tax-calculator",
    emoji: "🧾",
    title: "報稅計算器",
    desc: "輸入所得、扣除額，算出應繳/退稅金額",
    highlight: true,
  },
  {
    href: "/freelancer-tax-guide",
    emoji: "💼",
    title: "接案報稅完整指南",
    desc: "9A費率表、執行業務所得完整說明",
    highlight: true,
  },
  {
    href: "/salary-vs-freelancer",
    emoji: "⚖️",
    title: "薪資 vs 接案稅負比較",
    desc: "輸入年收，比較兩種身份的真實稅負",
    highlight: true,
  },
  {
    href: "/dependent-deduction",
    emoji: "👨‍👩‍👧",
    title: "扶養節稅計算器",
    desc: "算出扶養父母/子女能省多少稅",
    highlight: false,
  },
  {
    href: "/income-tax-brackets",
    emoji: "📊",
    title: "所得稅級距速查",
    desc: "114年度五級稅率表及試算",
    highlight: false,
  },
  {
    href: "/basic-living-deduction",
    emoji: "🏠",
    title: "免稅天花板計算器",
    desc: "基本生活費差額扣除，適合多口之家",
    highlight: false,
  },
  {
    href: "/supplement-premium",
    emoji: "🏥",
    title: "二代健保補充保費試算",
    desc: "股利、接案、年終獎金補充保費計算",
    highlight: false,
  },
  {
    href: "/bonus-calculator",
    emoji: "🎁",
    title: "年終獎金稅額試算",
    desc: "年終拿到手實際多少？含所得稅+二代健保",
    highlight: false,
  },
  {
    href: "/salary-calculator",
    emoji: "💰",
    title: "月薪到手試算",
    desc: "薪資扣掉勞健保、所得稅後實領金額",
    highlight: false,
  },
];

const COMMON_MISTAKES = [
  {
    title: "忘記申報兼職或接案收入",
    desc: "很多人以為接案收入「對方已扣10%就好了」，但這只是預扣稅，仍需合併在綜合所得稅申報。漏報會被補稅加罰。",
  },
  {
    title: "搞混標準扣除額和列舉扣除額",
    desc: "兩者只能選一，且選了標準扣除額就不能再加其他列舉項目。建議先算列舉總額再比較，多數薪資族標準扣除額已足夠。",
  },
  {
    title: "忘記申報可節稅的特別扣除額",
    desc: "幼兒學前（6歲以下小孩）、長期照顧（CMS 2級以上）、教育學費（大學子女）這幾項很多人忘記申報，少扣就是多繳稅。",
  },
  {
    title: "父母扶養條件沒確認就申報",
    desc: "扶養父母需符合：同居（或你負擔生活費）＋年滿60歲或無謀生能力。若父母有其他所得超過免稅額，可能不符合扶養條件。",
  },
  {
    title: "股利所得選錯計算方式",
    desc: "114年度股利所得有兩種計算方式：合併計稅（8.5%抵稅，上限80,000元）or 分開計稅（28%分離）。年收較高者分開計稅反而省，需比較。",
  },
];

export default function TaxFilingGuidePage() {
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
                    ? "border-orange-500 bg-orange-50 font-semibold text-orange-700"
                    : "border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8 space-y-10">
        {/* ── Hero ── */}
        <header>
          <div className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
            114年度所得稅申報 · 2026年5月1日～5月31日
          </div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            114年度綜合所得稅申報攻略
          </h1>
          <p className="mt-2 text-base text-gray-600">
            免稅額、扣除額數字全更新，報稅4步驟＋全套計算工具。申報前30分鐘把這頁看完，少繳冤枉稅。
          </p>

          {/* 關鍵日期 */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "申報開始", value: "5月1日", sub: "2026年" },
              { label: "申報截止", value: "5月31日", sub: "2026年" },
              { label: "退稅到帳", value: "約6～8月", sub: "月初申報較快" },
              { label: "繳稅期限", value: "5月31日", sub: "逾期加計利息" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-orange-100 bg-white p-3 text-center shadow-sm">
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="mt-1 text-lg font-bold text-orange-600">{item.value}</div>
                <div className="text-xs text-gray-400">{item.sub}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ── 關鍵數字速查 ── */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">114年度關鍵數字速查</h2>

          <div className="space-y-4">
            {DEDUCTIONS.map((group) => (
              <div key={group.category} className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                  <span className="text-sm font-semibold text-gray-700">{group.category}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {group.items.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-3 px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{item.name}</div>
                        <div className="mt-0.5 text-xs text-gray-500">{item.note}</div>
                      </div>
                      <div className="shrink-0 text-right text-sm font-bold text-orange-600 tabular-nums">
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 稅率表 */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                <span className="text-sm font-semibold text-gray-700">114年度所得稅率級距</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500">
                      <th className="px-4 py-2 text-left font-medium">應稅所得淨額（元）</th>
                      <th className="px-4 py-2 text-center font-medium">稅率</th>
                      <th className="px-4 py-2 text-right font-medium">累進差額</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {TAX_BRACKETS.map((b) => (
                      <tr key={b.range}>
                        <td className="px-4 py-2.5 text-gray-700">{b.range}</td>
                        <td className="px-4 py-2.5 text-center font-bold text-orange-600">{b.rate}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">{b.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
                應繳稅額 = 應稅所得淨額 × 稅率 − 累進差額
                <Link href="/income-tax-brackets" className="text-orange-500 hover:underline">
                  開啟稅率試算 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4步驟申報流程 ── */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">報稅4步驟</h2>
          <div className="space-y-4">
            {STEPS.map((s) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-600",
                green: "bg-green-600",
                purple: "bg-purple-600",
                orange: "bg-orange-600",
              };
              const borderMap: Record<string, string> = {
                blue: "border-blue-100",
                green: "border-green-100",
                purple: "border-purple-100",
                orange: "border-orange-100",
              };
              return (
                <div
                  key={s.step}
                  className={`rounded-xl border ${borderMap[s.color]} bg-white p-5 shadow-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${colorMap[s.color]} text-sm font-bold text-white`}
                    >
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{s.title}</h3>
                      <ul className="mt-2 space-y-1.5">
                        {s.content.map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                            {line}
                          </li>
                        ))}
                      </ul>
                      {s.tool && (
                        <Link
                          href={s.tool.href}
                          className="mt-3 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                          {s.tool.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdUnit />

        {/* ── 節稅工具 ── */}
        <section>
          <h2 className="mb-1 text-lg font-bold text-gray-900">報稅前必用計算工具</h2>
          <p className="mb-4 text-sm text-gray-500">先算清楚再申報，避免多繳冤枉稅。</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATORS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group flex flex-col rounded-xl border p-4 transition hover:shadow-md ${
                  c.highlight
                    ? "border-orange-200 bg-orange-50 hover:border-orange-400"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <span className={`text-sm font-semibold ${c.highlight ? "text-orange-700" : "text-gray-800"}`}>
                    {c.title}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                <span className={`mt-3 self-end text-xs font-medium ${c.highlight ? "text-orange-600" : "text-gray-400"} group-hover:underline`}>
                  開啟計算器 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 常見錯誤 ── */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">5個常見申報錯誤</h2>
          <div className="space-y-3">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    ✗
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{m.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TaxAffiliateCTA ── */}
        <TaxAffiliateCTA />

        {/* ── FAQ ── */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">常見問題</h2>
          <div className="space-y-3">
            {[
              {
                q: "上班族需要自己去報稅嗎？",
                a: "收入只有一份薪資、且全年無其他所得的上班族，雇主已透過扣繳代為繳稅，可不用再申報。但若有：兼職收入、股利、利息、接案、房租等其他所得，仍需合併申報。建議每年都查一下「所得及扣繳稅額清單」確認，有退稅機會就不要錯過。",
              },
              {
                q: "報稅用自然人憑證還是健保卡？哪個比較方便？",
                a: "健保卡報稅需要健保卡讀卡機或手機NFC，設定較繁瑣但近年改善很多。自然人憑證需要IC卡讀卡機。若資料單純（只有薪資），推薦用財政部「報稅行動App」，手機幾分鐘完成。",
              },
              {
                q: "夫妻要合併申報還是分開申報？",
                a: "夫妻合併申報可共享262,000元標準扣除額（比各自分開的131,000元多）。但若一方收入很高（適用高稅率），另一方所得合併後也會被拉高稅率。實務上多數家庭合併申報反而省稅，建議用計算器兩種方案都試算比較。",
              },
              {
                q: "我是自由工作者，每筆收入已被扣10%，還需要報稅嗎？",
                a: "需要。10%預扣稅只是暫時代扣，仍需在5月申報綜合所得稅。申報時如果你的實際稅率低於10%，就會退稅；高於10%則需補稅。大多數年收200萬以下的自由工作者，合計下來反而是退稅的。",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Q：{item.q}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdUnit />

        {/* ── Footer links ── */}
        <footer className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-400 leading-relaxed">
            本頁數字依財政部114年度綜合所得稅規定整理，僅供試算參考，不構成稅務建議。實際申報請以財政部公告為準。
            最後更新：2026-03-30。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { href: "/tax-calculator", label: "報稅計算器" },
              { href: "/income-tax-brackets", label: "稅率級距" },
              { href: "/dependent-deduction", label: "扶養節稅" },
              { href: "/freelancer-tax-guide", label: "接案報稅指南" },
              { href: "/supplement-premium", label: "二代健保試算" },
              { href: "/salary-vs-freelancer", label: "薪資vs接案比較" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 transition hover:border-orange-300 hover:text-orange-600"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
