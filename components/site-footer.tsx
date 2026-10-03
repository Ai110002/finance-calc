import Link from "next/link";

/** 網站資訊（信任頁面）連結 */
const TRUST_LINKS = [
  { href: "/about", label: "關於本站" },
  { href: "/sources", label: "資料來源" },
  { href: "/disclaimer", label: "免責聲明" },
  { href: "/privacy", label: "隱私權政策" },
  { href: "/contact", label: "聯絡我們" },
];

/** 熱門試算工具連結 */
const TOOL_LINKS = [
  { href: "/tax-calculator", label: "報稅計算器" },
  { href: "/mortgage", label: "房貸月付金" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/overtime-calculator", label: "加班費計算" },
  { href: "/severance-calculator", label: "資遣費計算" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
];

/**
 * 全站頁尾：信任頁面導覽 + 免責提醒。
 * 由 app/layout.tsx 統一渲染，因此每個頁面都會出現。
 * 底部保留 pb-24，避免被右下角固定的「意見回饋」按鈕遮住。
 */
export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white/80 px-4 pb-24 pt-8">
      <div className="mx-auto max-w-lg space-y-6">
        <nav aria-label="網站資訊">
          <p className="text-xs font-bold tracking-wide text-gray-500">網站資訊</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TRUST_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="熱門試算工具">
          <p className="text-xs font-bold tracking-wide text-gray-500">熱門試算工具</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOOL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-black/5">
          <p className="text-xs leading-relaxed text-gray-500">
            本站是民間個人經營的免費財務試算網站，與
            <span className="font-semibold text-gray-700">
              財政部、國稅局、勞動部、勞工保險局、中央健康保險署、內政部或金融監督管理委員會等任何政府機關，均無隸屬、合作、贊助或背書關係
            </span>
            。所有試算結果與文章內容僅供參考，不構成稅務、法律、投資、會計或財務規劃建議；實際金額請以各機關公告與稽徵機關核定為準。
          </p>
        </div>

        <div className="flex flex-col gap-1 text-xs text-gray-400">
          <p>© 2026 twtaxcalc.com　免費、免登入的繁體中文財務試算工具。</p>
          <p>內容最後更新：2026-10-03</p>
        </div>
      </div>
    </footer>
  );
}
