import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026省稅10個合法方法｜台灣報稅節稅攻略，最高省15萬元 - 台灣財務試算",
  description:
    "114年度報稅季10個合法省稅方法：薪資特別扣除、夫妻分開申報、扶養節稅、幼兒學前扣除、勞退自提、列舉扣除、股利扣除、接案費用率、長期照顧、基本生活費差額。稅率20%最高可省15萬。",
  keywords: [
    "省稅方法",
    "節稅技巧2026",
    "合法省稅",
    "報稅省錢",
    "省稅攻略",
    "節稅方法台灣",
    "2026年節稅",
    "報稅節稅10招",
    "報稅省稅技巧",
    "114年度節稅",
    "怎麼省稅",
    "合法節稅方法",
    "省稅清單",
    "台灣省稅",
  ],
  openGraph: {
    title: "2026省稅10個合法方法｜最高可省15萬元",
    description:
      "雙薪夫妻分開申報省67,770。幼兒學前每孩省24,000。接案費用率年收百萬省90,000。10招合法省稅全攻略，報稅前5分鐘確認。",
    url: "https://www.twtaxcalc.com/legal-tax-savings-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
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
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招", active: true },
];

type Method = {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  who: string;
  highlight: string;
  detail: string;
  action: string;
  href: string;
  linkLabel: string;
  savings5: number;
  savings12: number;
  savings20: number;
  savings30: number;
};

const METHODS: Method[] = [
  {
    id: 1,
    emoji: "💼",
    title: "薪資所得特別扣除額",
    subtitle: "每位受薪者最多可扣 NT$218,000，不需任何憑證",
    who: "所有上班族、兼職受薪者",
    highlight: "稅率20% → 省 NT$43,600",
    detail:
      "只要有薪資所得，每人自動可申報薪資所得特別扣除額最高 NT$218,000。這不是「要申請」的，而是「要確認填寫正確」的。雙薪夫妻兩人各自可扣，合計最高 NT$436,000。",
    action: "確認申報書薪資所得特別扣除額欄位",
    href: "/salary-calculator",
    linkLabel: "薪資節稅試算",
    savings5: 10900,
    savings12: 26160,
    savings20: 43600,
    savings30: 65400,
  },
  {
    id: 2,
    emoji: "👫",
    title: "夫妻薪資所得分開申報",
    subtitle: "雙薪夫妻各自適用薪資稅率，不合併累進",
    who: "雙薪夫妻，尤其是兩人收入差距不大者",
    highlight: "各薪50萬夫妻 → 省 NT$67,770",
    detail:
      "自2013年起，夫妻可選擇薪資所得分開計算稅率，其餘所得仍合併申報。分開的結果是各自的薪資不相加累進，各自享有較低稅率。收入越接近的夫妻，分開效果越好。",
    action: "申報時選「薪資所得分開計算」",
    href: "/joint-filing",
    linkLabel: "夫妻申報試算",
    savings5: 0,
    savings12: 10278,
    savings20: 67770,
    savings30: 120000,
  },
  {
    id: 3,
    emoji: "👨‍👩‍👧‍👦",
    title: "扶養親屬免稅額",
    subtitle: "每位親屬 NT$97,000；70歲以上父祖父母再加 NT$50,000",
    who: "有扶養父母、子女、兄弟姐妹的納稅人",
    highlight: "扶養1位70歲以上父母 → 省 NT$29,400（稅率20%）",
    detail:
      "每位符合資格的扶養親屬可申報 NT$97,000 免稅額。70歲以上的父母、祖父母另外享有 NT$50,000 身心障礙老人特別扣除額（需符合條件）。父母的健保費也可納入列舉扣除。申報前確認親屬資格與收入上限。",
    action: "逐一確認親屬資格，填寫扶養親屬明細",
    href: "/dependent-deduction",
    linkLabel: "扶養節稅計算",
    savings5: 7350,
    savings12: 17640,
    savings20: 29400,
    savings30: 44100,
  },
  {
    id: 4,
    emoji: "👶",
    title: "幼兒學前特別扣除額",
    subtitle: "5歲以下幼兒每人可扣 NT$120,000，直接砍應稅所得",
    who: "有2020年後出生幼兒的父母",
    highlight: "2個孩子 × NT$120,000 × 稅率20% → 省 NT$48,000",
    detail:
      "114年度申報：2025年12月31日當天未滿6歲（即2020年1月1日以後出生）的子女，每人可扣 NT$120,000。兩個孩子就是 NT$240,000 直接從應稅所得扣除。許多父母忘記申報，白白損失。",
    action: "申報時填寫5歲以下幼兒人數",
    href: "/preschool-deduction",
    linkLabel: "幼兒扣除試算",
    savings5: 6000,
    savings12: 14400,
    savings20: 24000,
    savings30: 36000,
  },
  {
    id: 5,
    emoji: "🏦",
    title: "勞退自提節稅",
    subtitle: "自提最高6%，直接從薪資所得扣除，不計入應稅收入",
    who: "受薪族，稅率12%以上效果最顯著",
    highlight: "月薪5萬自提6%，稅率20% → 每年省 NT$7,200",
    detail:
      "勞退自提的金額不計入當年薪資所得，等於先把錢放進退休帳戶，同時省下稅金。稅率越高效果越好：稅率20%相當於用8折的錢存退休金。稅率5%的人每月省不多（150元），但退休保障仍有意義。",
    action: "向HR申請調整勞退自提比例（1%-6%）",
    href: "/labor-retirement",
    linkLabel: "勞退節稅試算",
    savings5: 1800,
    savings12: 4320,
    savings20: 7200,
    savings30: 10800,
  },
  {
    id: 6,
    emoji: "📋",
    title: "列舉扣除額 vs 標準扣除額",
    subtitle: "有房貸利息或高額醫療費？列舉可能比標準高出許多",
    who: "有房貸、高額自費醫療、家庭保費的納稅人",
    highlight: "房貸利息NT$20萬 + 保費NT$4.8萬 → 超過標準扣除額 NT$18,000（單身）",
    detail:
      "標準扣除額：單身 NT$131,000 / 夫妻 NT$262,000。列舉項目包含：房貸利息（上限NT$300,000）、保險費（每人NT$24,000）、自費醫療（無上限）、災害損失、捐贈。有房貸的人通常列舉更省。先試算再決定。",
    action: "蒐集去年所有列舉憑證，試算哪個更省",
    href: "/deduction-compare",
    linkLabel: "列舉vs標準試算",
    savings5: 900,
    savings12: 2160,
    savings20: 3600,
    savings30: 5400,
  },
  {
    id: 7,
    emoji: "📈",
    title: "儲蓄投資特別扣除額",
    subtitle: "股利、利息收入最多可扣 NT$270,000，投資族必看",
    who: "有股票股利、銀行利息、基金配息的投資人",
    highlight: "NT$270,000 全額扣除，稅率20% → 省 NT$54,000",
    detail:
      "持有台股、ETF、銀行存款的人，利息與股利收入在申報綜合所得稅時，享有 NT$270,000 儲蓄投資特別扣除額上限。注意：股利另有「合併申報」vs「分開28%」的選擇，先試算哪個更省。",
    action: "確認股利、利息收入是否已享扣除額",
    href: "/dividend-tax",
    linkLabel: "股利申報試算",
    savings5: 13500,
    savings12: 32400,
    savings20: 54000,
    savings30: 81000,
  },
  {
    id: 8,
    emoji: "💻",
    title: "接案者費用率扣除（9A法則）",
    subtitle: "政府認定收入中有45%–60%是成本，這部分不課稅",
    who: "自由工作者、設計師、顧問、家教、講師",
    highlight: "年收NT$100萬，費用率45% → 省 NT$90,000（稅率20%）",
    detail:
      "非受薪勞務收入依所得類別享有費用率扣除（俗稱9A費率）。例如：設計顧問費費用率45%，等同年收100萬中有45萬被政府認定為成本、不課稅。年收越高效果越大。許多自由工作者不知道這個機制，多繳了很多稅。",
    action: "確認你的收入類別對應的費用率，申報時勿選錯",
    href: "/freelancer-tax-guide",
    linkLabel: "接案報稅試算",
    savings5: 22500,
    savings12: 54000,
    savings20: 90000,
    savings30: 135000,
  },
  {
    id: 9,
    emoji: "🏥",
    title: "長期照顧特別扣除額",
    subtitle: "符合長照條件每人可扣 NT$120,000，常被忽略",
    who: "有家人需要長照服務並取得政府核定證明者",
    highlight: "NT$120,000 × 稅率20% → 省 NT$24,000",
    detail:
      "依「長期照顧服務法」接受政府核定長照服務的被照顧者，每人可申報 NT$120,000 長期照顧特別扣除額。需取得縣市長照管理中心核定書。老人家中有失能、失智成員的家庭常常錯過這個扣除額。",
    action: "向縣市長照管理中心確認是否符合資格",
    href: "/basic-living-deduction",
    linkLabel: "了解各項扣除額",
    savings5: 6000,
    savings12: 14400,
    savings20: 24000,
    savings30: 36000,
  },
  {
    id: 10,
    emoji: "🏠",
    title: "基本生活費差額申報",
    subtitle: "每人 NT$202,000 基本生活費，超出扣除額部分可再追加",
    who: "家庭人口多、各項扣除額加總未達基本生活費總額的家庭",
    highlight: "4口之家最高可追加扣 NT$808,000 - 現有扣除額",
    detail:
      "政府規定每人基本生活費 NT$202,000（114年度），若全家人口數 × NT$202,000 超過「免稅額 + 扣除額」合計，差額可再追加扣除。孩子多、扶養人口多但各項扣除額不高的家庭最有利。申報時系統通常自動計算，但要確認人口數填正確。",
    action: "確認申報書基本生活費差額欄位，並核對家庭人口數",
    href: "/basic-living-deduction",
    linkLabel: "基本生活費試算",
    savings5: 0,
    savings12: 0,
    savings20: 5000,
    savings30: 8000,
  },
];

const SAVINGS_TABLE = [
  { profile: "上班族（月薪5萬，無眷屬）", rate: 20, methods: [1, 5], total: 50800 },
  { profile: "雙薪夫妻（各薪50萬，2幼兒）", rate: 20, methods: [1, 2, 4], total: 155370 },
  { profile: "有房貸的夫妻（各薪40萬）", rate: 12, methods: [1, 2, 6], total: 38598 },
  { profile: "自由工作者（年收100萬）", rate: 20, methods: [8], total: 90000 },
  { profile: "投資人（股利年收50萬）", rate: 20, methods: [7], total: 54000 },
];

const FAQS = [
  {
    q: "省稅方法和逃稅一樣嗎？",
    a: "完全不同。省稅是利用稅法明文規定的扣除額、免稅額和申報選項，在合法框架內降低應納稅額。這10個方法全部都是財政部明訂的制度，正確申報才能享有，不申報反而是多繳了不必要的稅。逃稅則是隱匿收入或偽造憑證，是違法行為。",
  },
  {
    q: "這10個方法可以同時使用嗎？",
    a: "可以，且應該全部確認。每個方法針對不同條件和族群，有資格的就全部申報。例如：雙薪夫妻可同時用①薪資特別扣除（各自）、②分開申報、③扶養親屬（若有），三個方法疊加使用完全合法。",
  },
  {
    q: "哪個方法省最多錢？",
    a: "因人而異。接案者透過費用率扣除效果最大（年收100萬可省9萬）；雙薪夫妻分開申報也非常顯著（最高省67,770）；投資人善用儲蓄投資特別扣除額也能省5萬以上。建議用本頁試算表找到你的族群，再去對應的計算器精確試算。",
  },
  {
    q: "我已經用報稅軟體（財政部網站）申報，這些扣除額會自動帶入嗎？",
    a: "部分會自動帶入（如薪資特別扣除額、部分免稅額），但夫妻分開申報需主動選擇；扶養親屬需自行填寫；幼兒學前扣除需填幼兒人數；列舉 vs 標準需手動比較。強烈建議填完後逐項核對，不要假設都是最優選項。",
  },
  {
    q: "114年度（2025年收入）什麼時候報稅？",
    a: "台灣綜合所得稅申報期間為每年5月1日至5月31日（逢假日順延）。2026年申報114年度所得。如使用網路申報（財政部e-Tax）可在5月1日後登入申報。建議4月下旬先確認好所有扣除額資料，5月初便可快速完成申報。",
  },
];

function fmt(n: number): string {
  return n.toLocaleString("zh-TW");
}

export default function LegalTaxSavings2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026省稅10個合法方法：台灣報稅節稅攻略，最高省15萬元",
        description:
          "114年度報稅季10個合法省稅方法：薪資特別扣除、夫妻分開申報、扶養節稅、幼兒學前扣除、勞退自提、列舉扣除、股利扣除、接案費用率、長期照顧、基本生活費差額。",
        url: "https://www.twtaxcalc.com/legal-tax-savings-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-08",
        dateModified: "2026-04-08",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
                  href={l.href}
                  className={}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              114年度・2026年5月報稅・合法節稅清單
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              2026省稅10個合法方法
              <br />
              <span className="text-green-600">最高可省 NT$150,000</span>
            </h1>
            <p className="mt-3 text-base text-gray-600">
              報稅前5分鐘確認這10招，能用的全部用，一分都不多繳
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "適用族群", value: "所有納稅人", sub: "至少3招可用" },
              { label: "雙薪夫妻最高省", value: "NT$155,370", sub: "稅率20%" },
              { label: "接案者最高省", value: "NT$90,000", sub: "年收100萬" },
              { label: "申報截止", value: "5月31日", sub: "2026年報稅季" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-green-100 bg-white p-3 text-center shadow-sm">
                <div className="text-xs text-gray-500">{c.label}</div>
                <div className="my-1 text-lg font-bold text-green-700">{c.value}</div>
                <div className="text-xs text-gray-400">{c.sub}</div>
              </div>
            ))}
          </div>

          {/* 10 Methods */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">10個合法省稅方法</h2>
            <div className="space-y-4">
              {METHODS.map((m) => (
                <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                      {m.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl">{m.emoji}</span>
                        <h3 className="text-base font-bold text-gray-900">{m.title}</h3>
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                          {m.highlight}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{m.subtitle}</p>
                      <p className="mt-2 text-sm text-gray-700">{m.detail}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span className="font-medium text-gray-700">適用：</span>
                          {m.who}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
                          ✅ {m.action}
                        </div>
                        <Link
                          href={m.href}
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                        >
                          {m.linkLabel} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <TaxAffiliateCTA />

          {/* Savings Table by Tax Rate */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">各方法省稅金額一覽（稅率20%）</h2>
            <p className="mb-3 text-sm text-gray-500">以稅率20%為基準試算，實際依個人稅率調整</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">方法</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">5%省</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">12%省</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">20%省</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">30%省</th>
                  </tr>
                </thead>
                <tbody>
                  {METHODS.map((m, i) => (
                    <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 text-slate-500">{m.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {m.emoji} {m.title}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {m.savings5 > 0 ? "NT$" + fmt(m.savings5) : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {m.savings12 > 0 ? "NT$" + fmt(m.savings12) : "—"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-700">
                        {m.savings20 > 0 ? "NT$" + fmt(m.savings20) : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {m.savings30 > 0 ? "NT$" + fmt(m.savings30) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              ※ 各方法適用條件不同，請點擊對應試算器確認個人情況。稅率依財政部114年度所得稅累進稅率表。
            </p>
          </section>

          {/* Profile Examples */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">4種族群省稅試算範例</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {SAVINGS_TABLE.map((s) => (
                <div key={s.profile} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 text-sm font-semibold text-gray-800">{s.profile}</div>
                  <div className="mb-1 text-xs text-gray-500">
                    用到方法：{s.methods.map((n) => "#" + n).join("、")}
                  </div>
                  <div className="text-2xl font-bold text-green-700">
                    {"省 NT$" + fmt(s.total)}
                  </div>
                  <div className="text-xs text-gray-400">稅率{s.rate}%估算</div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">精確試算工具</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "📊 綜合所得稅試算" },
                { href: "/joint-filing", label: "👫 夫妻申報比較" },
                { href: "/dependent-deduction", label: "👨‍👩‍👧‍👦 扶養節稅試算" },
                { href: "/preschool-deduction", label: "👶 幼兒學前扣除" },
                { href: "/deduction-compare", label: "📋 列舉vs標準" },
                { href: "/dividend-tax", label: "📈 股利申報試算" },
                { href: "/freelancer-tax-guide", label: "💻 接案費用率" },
                { href: "/labor-retirement", label: "🏦 勞退節稅試算" },
                { href: "/basic-living-deduction", label: "🏠 基本生活費" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </section>

          <TaxAffiliateCTA />

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-semibold text-gray-900">{f.q}</h3>
                  <p className="text-sm text-gray-700">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-gray-400">
            本頁資料依據財政部114年度所得稅規定整理，僅供參考。實際申報請以財政部官方公告為準。
          </p>
        </main>
      </div>
    </>
  );
}
