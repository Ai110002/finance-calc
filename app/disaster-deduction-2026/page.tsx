import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "災害損失列舉扣除額 2026｜颱風地震火災損失怎麼報稅、申報流程完整攻略 - 台灣財務試算",
  description:
    "114年度颱風、地震、火災造成的損失可列舉申報扣除。關鍵：必須在災害發生後30天內向國稅局申報，超過就喪失扣除資格。損失金額扣掉保險理賠後的自付部分可申報。",
  keywords: [
    "災害損失扣除額",
    "颱風損失報稅",
    "地震損失申報",
    "火災損失抵稅",
    "天災損失扣除",
    "114年災害損失申報",
    "水災損失報稅",
    "災害損失列舉扣除",
    "颱風損失節稅",
    "不可抗力損失扣除",
    "災害損失所得稅",
    "房屋損失報稅",
  ],
  openGraph: {
    title: "災害損失列舉扣除額 2026｜颱風地震火災損失怎麼報稅",
    description:
      "颱風、地震、火災造成的損失可列舉申報扣除，但必須在災害後30天內向國稅局報備。損失扣掉保險理賠後的自付部分才能申報。",
    url: "https://www.twtaxcalc.com/disaster-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/disaster-deduction-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
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
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/job-change-tax-2026", label: "換工作報稅" },
  { href: "/etax-guide-2026", label: "eTax教學" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
  { href: "/freelance-to-employee-2026", label: "接案轉正職報稅" },
  { href: "/rent-deduction-2026", label: "房租抵稅" },
  { href: "/donation-deduction-2026", label: "捐款節稅" },
  { href: "/insurance-deduction-2026", label: "保險費抵稅" },
  { href: "/medical-deduction-2026", label: "醫藥費扣除" },
  {
    href: "/disaster-deduction-2026",
    label: "災害損失扣除",
    active: true,
  },
];

const SECTIONS = [
  {
    id: "what-qualifies",
    icon: "🌪️",
    title: "哪些災害損失可以申報扣除？",
    color: "orange",
    content:
      "所得稅法允許個人將「不可抗力的意外災害」造成的財產損失列舉申報扣除。關鍵詞是「不可歸咎於個人責任」，也就是非自己故意或過失造成的損失。符合資格的災害包含天然災害和特定意外事故。",
    details: [
      {
        label: "天然災害（颱風、地震、洪水、土石流）",
        text: "颱風淹水導致房屋、車輛、家電損壞，地震造成結構損毀，土石流掩埋財產等，均可申報。台灣每年颱風季7至9月是主要申報時機。損失金額以實際損毀財物的市場價值或重置成本計算，扣除保險理賠金後，剩餘自付部分可列舉扣除。",
      },
      {
        label: "火災（非自身故意或重大過失）",
        text: "因意外起火（如電氣短路、廚房火災蔓延）導致的財產損失，可申報扣除。若消防調查認定是自身縱火或重大過失引起，則不符合資格。火災後須取得消防局的火災證明書作為申報憑據。",
      },
      {
        label: "其他不可抗力意外（閃電、爆炸、第三人過失）",
        text: "閃電擊中房屋造成損害、鄰居施工造成牆壁龜裂倒塌、瓦斯氣爆等，若損失確實存在且有相關機關證明，也可申報。因第三人過失造成的損失，通常會先向責任方求償，最終無法獲償的部分才能列舉。",
      },
      {
        label: "不能申報的情況",
        text: "竊盜、搶劫造成的財物損失不算「災害損失」，不能列舉申報（屬於意外損失，不同類別）。因自身疏忽造成的損害（如沒關窗致雨水損壞電器）不符合「不可抗力」條件。保險公司已理賠的部分，必須從損失金額中扣除，只有自付部分才能申報。",
      },
    ],
  },
  {
    id: "30-days-rule",
    icon: "⏰",
    title: "最重要的一條規定：災害後30天內要向國稅局報備",
    color: "red",
    content:
      "這是大多數人不知道、也因此喪失扣除資格的關鍵規定。不是等到5月報稅時才填，而是在災害發生後30天內，就要向所在地國稅局申報損失。錯過這個窗口，即使損失再大，也不能申報扣除。",
    details: [
      {
        label: "為什麼要在30天內報備？",
        text: "國稅局需要派員（或委請專業人員）在現場評估損失。若災後太久才申報，現場已清理完畢，無法核實實際損失金額，國稅局將不受理。因此法規要求：在損失發生後30天內（或申報綜合所得稅前，以先到者為準），必須向國稅局提出損失報備申請。",
      },
      {
        label: "如何向國稅局申請損失勘查？",
        text: "準備文件：身分證、財產相關憑證（房屋謄本、車輛行照、購買收據）、損失財產清單、照片。前往戶籍地所屬的國稅局或分局，填寫「損失申報書」，請求國稅局派員勘查。若無法親自前往，可請委任人代辦。颱風等大規模天災時，國稅局通常會主動公告受理方式。",
      },
      {
        label: "地方政府災害證明 vs 國稅局勘查",
        text: "兩者都可能需要。地方政府（鄉鎮市區公所）核發的「天然災害損失證明」可作為基礎佐證，但通常無法替代國稅局的損失核定。最終能申報的金額，以國稅局核定的金額為準。建議兩個程序都走：先取得公所證明，再向國稅局申請勘查核定。",
      },
    ],
  },
  {
    id: "calculation",
    icon: "📊",
    title: "損失金額怎麼計算？省稅試算",
    color: "blue",
    content:
      "可申報的損失金額 = 財產損失市場價值 − 保險理賠金 − 其他補償金（如向肇事方獲得的賠償）。三個實際情境試算讓你清楚能省多少稅。",
    details: [
      {
        label: "情境1：颱風水淹一樓，車輛全損",
        text: "車輛市場價值50萬，颱風前一年已投保車體險，保險理賠40萬。可申報損失 = 50萬 − 40萬 = 10萬。選列舉扣除、適用20%稅率 → 省稅金額 = 10萬 × 20% = 2萬元。若無投保，損失50萬可全部申報，省稅 = 50萬 × 20% = 10萬，節稅效益顯著。",
      },
      {
        label: "情境2：地震造成室內裝潢全毀（無投保）",
        text: "室內裝潢重置成本80萬（依國稅局評估），無火險，無其他補償。可申報損失 = 80萬。選列舉扣除、適用12%稅率 → 省稅 = 80萬 × 12% = 9.6萬元。但要注意：房屋本體的損失計算方式較複雜，建議請稅務顧問協助。",
      },
      {
        label: "情境3：火災燒毀家電設備（保險理賠部分）",
        text: "家電市場折舊價值15萬，火險理賠8萬，自付額7萬。可申報損失 = 15萬 − 8萬 = 7萬。適用5%稅率 → 省稅 = 7萬 × 5% = 3,500元。若列舉扣除額合計（含保險費、租屋等）超過標準扣除額，選列舉才有意義。低稅率族群節稅效果較有限。",
      },
    ],
  },
  {
    id: "process",
    icon: "📋",
    title: "eTax申報步驟",
    color: "purple",
    content:
      "完成國稅局損失核定後，在報稅時選擇列舉扣除額，將核定損失金額填入指定欄位。以下是完整流程。",
    details: [
      {
        label: "前置作業（災害發生後30天內）",
        text: "立即拍照記錄損失現場 → 取得地方政府（公所）核發的天然災害損失證明 → 準備損失財產清單、購買憑證、市場行情估價 → 前往國稅局申請損失勘查（填寫損失申報書）→ 等候國稅局派員勘查並核定損失金額。",
      },
      {
        label: "報稅時（每年5月）",
        text: "進入財政部eTax Portal → 選擇「列舉扣除額」→ 找到「災害損失」欄位 → 填入國稅局核定的損失金額 → 上傳或保留國稅局損失核定書備查。若損失金額較大，建議選擇申報方式（紙本或網路）時確認欄位是否正確填入，並在eTax系統確認損失已核定在案。",
      },
      {
        label: "文件保存（至少5年）",
        text: "必須保留：國稅局損失核定書、地方政府災害證明、損失財產清單、照片、保險理賠明細、申請書存根。國稅局可能於報稅後隨機抽查，若無法提出核定書，扣除額將被剔除並補稅加罰款。所有文件至少保存5年（自申報年度起算）。",
      },
    ],
  },
  {
    id: "strategy",
    icon: "💡",
    title: "注意事項與節稅策略",
    color: "green",
    content:
      "災害損失扣除額有幾個關鍵注意事項，確認你符合所有條件，才能最大化節稅效益。",
    details: [
      {
        label: "只有選列舉扣除額才有效",
        text: "與所有列舉項目相同，災害損失只在你選「列舉扣除額」時才可申報。若選標準扣除額（單身12.4萬、夫妻24.8萬），災害損失對稅額完全無影響。大型災害（損失超過幾十萬）通常能使列舉扣除額總和遠超標準扣除額，此時選列舉最有利。",
      },
      {
        label: "扶養親屬的財產損失也可申報",
        text: "若扶養的父母、子女遭受災害損失，且你是申報扶養的納稅義務人，其損失也可併入你的列舉扣除額申報。但損失財產的所有權人必須是被扶養人，且同樣需要通過國稅局損失核定程序。",
      },
      {
        label: "損失金額超過當年度所得怎麼辦",
        text: "若核定的災害損失金額超過當年度的綜合所得總額，扣除後稅額為零但不退，超過部分不能遞延至下一年度扣除。若有特殊情況（如業主的生意財產損失），可能有其他稅法救濟規定，建議諮詢稅務人員。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "颱風淹水車輛泡水，可以申報災害損失扣除額嗎？",
    a: "可以，但必須在颱風後30天內向國稅局申請損失勘查。車輛損失金額以市場折舊價值計算，扣除車險理賠金後的自付部分，即為可申報的損失金額。若未在30天內申報，將失去申報資格，即使損失再大也無法扣除。",
  },
  {
    q: "災害損失申報的30天期限是從哪天算起？",
    a: "從災害實際發生日算起，而非發現損失的日期。例如颱風過境當日即為起算日，之後30個自然日內必須向國稅局提出損失申報。若無法在期限內辦理（如道路中斷、行動不便），可先電話聯繫國稅局說明情況，並盡快補件。",
  },
  {
    q: "有火險、地震險，可以把保險理賠的部分也申報扣除嗎？",
    a: "不行。保險理賠的金額必須從損失金額中扣除，只有自付部分（損失總額減去理賠額）才能申報列舉扣除。例如損失100萬、保險理賠80萬，可申報的損失為20萬。若保險全額理賠，則沒有可申報的災害損失。",
  },
  {
    q: "颱風後請了工班修繕，修繕費用可以扣除嗎？",
    a: "修繕費用不能直接申報為災害損失扣除額。申報的是財產本身因災害造成的損失市場價值，不是修繕費用。但修繕費用可作為損失核定的參考佐證，幫助國稅局確認損失程度。實際申報金額以國稅局勘查核定為準。",
  },
  {
    q: "地震讓牆壁龜裂但還能住，這種損失可以申報嗎？",
    a: "可以嘗試申報，但國稅局需要勘查核定。部分損壞（非全損）的情況，損失金額通常以修復費用的合理估算為基礎，但必須經過國稅局確認。建議先拍照存證，在30天內向國稅局申請勘查，由核定結果決定可申報金額。",
  },
];

const SECTION_COLORS: Record<
  string,
  { bg: string; border: string; icon: string; title: string; detail: string }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-100",
    title: "text-blue-900",
    detail: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-100",
    title: "text-green-900",
    detail: "text-green-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-100",
    title: "text-orange-900",
    detail: "text-orange-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100",
    title: "text-purple-900",
    detail: "text-purple-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-100",
    title: "text-red-900",
    detail: "text-red-700",
  },
};

export default function DisasterDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "災害損失列舉扣除額 2026｜颱風地震火災損失怎麼報稅、申報流程完整攻略",
        description:
          "114年度颱風、地震、火災造成的損失可列舉申報扣除。必須在災害後30天內向國稅局申報，損失扣掉保險理賠後的自付部分可申報。",
        url: "https://www.twtaxcalc.com/disaster-deduction-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-17",
        dateModified: "2026-04-17",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + ("active" in l && l.active ? "-active" : "")}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-orange-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
              114年度報稅・颱風地震受災戶必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              颱風、地震、火災損失
              <br />
              可以報稅扣除嗎？
            </h1>
            <p className="mt-3 text-base text-gray-500">
              可以，但有一個大多數人不知道的期限：
              <span className="font-semibold text-orange-700">
                災害發生後30天內必須向國稅局申報，錯過就喪失資格。
              </span>
            </p>
          </div>

          {/* Warning alert */}
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-800">
              ⏰ 關鍵期限：災害損失必須在災後30天內向所在地國稅局申請損失勘查，否則無法在報稅時申報扣除，不論損失金額多大。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📋",
                label: "申報方式",
                desc: "選列舉扣除額才有效",
              },
              {
                icon: "⏰",
                label: "期限",
                desc: "災害後30天內向國稅局申報",
              },
              {
                icon: "💰",
                label: "申報金額",
                desc: "損失金額 − 保險理賠 = 可申報額",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center"
              >
                <div className="mb-2 text-2xl">{card.icon}</div>
                <p className="font-bold text-gray-900">{card.label}</p>
                <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* 試算 CTA */}
          <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-orange-700">
              災害損失加上其他列舉項目，選列舉還是標準扣除額更省稅？
            </p>
            <p className="mb-4 text-xl font-bold text-orange-900">
              輸入損失金額，30秒試算能省多少稅
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
            >
              立即試算報稅金額 →
            </Link>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((section) => {
              const c = SECTION_COLORS[section.color];
              return (
                <div
                  key={section.id}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-xl ${c.icon} p-2 text-xl`}>
                      {section.icon}
                    </span>
                    <h2 className={`text-lg font-bold ${c.title}`}>
                      {section.title}
                    </h2>
                  </div>
                  <p className="mb-4 text-sm text-gray-700">
                    {section.content}
                  </p>
                  <div className="space-y-3">
                    {section.details.map((d) => (
                      <div key={d.label} className="rounded-xl bg-white/60 p-4">
                        <p className={`mb-1 text-xs font-bold ${c.detail}`}>
                          {d.label}
                        </p>
                        <p className="text-sm text-gray-700">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 廣告 1 */}
          <div className="mt-8">
            <AdUnit />
          </div>

          {/* 廣告 2 */}
          <div className="mt-6">
            <AdUnit />
          </div>

          {/* Affiliate CTA */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mb-8 mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <p className="mb-2 font-bold text-gray-900">Q：{faq.q}</p>
                  <p className="text-sm text-gray-600">A：{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅試算", desc: "輸入所得直接算稅額" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣除額更省稅" },
                { href: "/insurance-deduction-2026", label: "保險費抵稅", desc: "人身保險費每人最高2.4萬" },
                { href: "/medical-deduction-2026", label: "醫藥費扣除", desc: "醫療費用無金額上限" },
                { href: "/donation-deduction-2026", label: "捐款節稅", desc: "公益捐款可列舉扣除" },
                { href: "/rent-deduction-2026", label: "房租抵稅", desc: "租屋費用扣除額最高12萬" },
                { href: "/mortgage-interest-deduction-2026", label: "房貸利息扣除", desc: "自用住宅利息最高30萬" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "備齊資料不漏報" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-orange-400 hover:bg-orange-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-orange-700">
              報稅截止：2026年5月31日
            </p>
            <p className="mb-4 text-xl font-bold text-orange-900">
              確認所有列舉扣除額後，試算全年稅額
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
