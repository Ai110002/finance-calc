import type { TaxBracket, ProfessionRate } from "./tax-types";

/** 2026 年度（114 年度）綜合所得稅稅率級距 */
export const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 610_000, rate: 0.05, progressiveDifference: 0 },
  { min: 610_001, max: 1_380_000, rate: 0.12, progressiveDifference: 42_700 },
  { min: 1_380_001, max: 2_770_000, rate: 0.20, progressiveDifference: 153_100 },
  { min: 2_770_001, max: 5_190_000, rate: 0.30, progressiveDifference: 430_100 },
  { min: 5_190_001, max: Infinity, rate: 0.40, progressiveDifference: 949_100 },
];

/** 免稅額 */
export const EXEMPTION_AMOUNT = 101_000;
export const EXEMPTION_SENIOR = 151_500; // 70 歲以上

/** 標準扣除額 */
export const STANDARD_DEDUCTION_SINGLE = 136_000;
export const STANDARD_DEDUCTION_MARRIED = 272_000;

/** 特別扣除額上限 */
export const SALARY_SPECIAL_DEDUCTION = 227_000;
export const DISABILITY_DEDUCTION = 218_000;
export const EDUCATION_DEDUCTION = 25_000; // 每人
export const PRESCHOOL_DEDUCTION_FIRST = 150_000; // 第 1 個
export const PRESCHOOL_DEDUCTION_EXTRA = 225_000; // 第 2 個起
export const RENTAL_SPECIAL_DEDUCTION = 180_000; // 2026 新制

/** 列舉扣除額上限 */
export const INSURANCE_DEDUCTION_CAP = 24_000; // 每人
export const RENTAL_EXPENSE_CAP = 180_000;
export const MORTGAGE_INTEREST_CAP = 300_000;

/** 基本生活費 */
export const BASIC_LIVING_EXPENSE = 213_000; // 每人

/** 二代健保補充保費 */
export const NHI_SUPPLEMENTARY_RATE = 0.0211;
export const NHI_THRESHOLD = 20_000; // 單筆門檻

/** 9B 稿費/版稅/作曲/編劇/漫畫 */
export const INCOME_9B_EXEMPTION = 180_000;
export const INCOME_9B_EXPENSE_RATE = 0.30;

/** 50 執行業務所得（非 9A） */

/** 9A 執行業務所得 — 職業費率表 */
export const PROFESSION_RATES: ProfessionRate[] = [
  // 醫療
  { code: "med-western", name: "西醫師", rate: 0.78, category: "醫療" },
  { code: "med-dental", name: "牙醫師", rate: 0.40, category: "醫療" },
  { code: "med-chinese", name: "中醫師", rate: 0.78, category: "醫療" },
  { code: "med-pharmacy", name: "藥師", rate: 0.20, category: "醫療" },
  { code: "med-vet", name: "獸醫師", rate: 0.32, category: "醫療" },
  { code: "med-nurse-midwife", name: "助產士", rate: 0.31, category: "醫療" },
  { code: "med-physio", name: "物理治療師", rate: 0.18, category: "醫療" },

  // 法律/會計
  { code: "law-lawyer", name: "律師", rate: 0.30, category: "法律會計" },
  { code: "law-accountant", name: "會計師", rate: 0.30, category: "法律會計" },
  { code: "law-bookkeeper", name: "記帳士", rate: 0.30, category: "法律會計" },
  { code: "law-patent", name: "專利師", rate: 0.30, category: "法律會計" },
  { code: "law-notary", name: "公證人", rate: 0.30, category: "法律會計" },

  // 工程/技術
  { code: "eng-architect", name: "建築師", rate: 0.35, category: "工程技術" },
  { code: "eng-technician", name: "技師", rate: 0.35, category: "工程技術" },
  { code: "eng-surveyor", name: "地政士", rate: 0.30, category: "工程技術" },
  { code: "eng-appraiser", name: "不動產估價師", rate: 0.35, category: "工程技術" },
  { code: "eng-programmer", name: "程式設計師", rate: 0.20, category: "工程技術" },

  // 文化/創意
  { code: "art-performer", name: "表演人（演員、歌手）", rate: 0.45, category: "文化創意" },
  { code: "art-writer", name: "作家（稿費 9B）", rate: 0.30, category: "文化創意" },
  { code: "art-designer", name: "設計師", rate: 0.35, category: "文化創意" },
  { code: "art-photographer", name: "攝影師", rate: 0.35, category: "文化創意" },
  { code: "art-translator", name: "翻譯", rate: 0.20, category: "文化創意" },
  { code: "art-makeup", name: "化妝師/造型師", rate: 0.35, category: "文化創意" },
  { code: "art-music-teacher", name: "音樂老師/鋼琴老師", rate: 0.20, category: "文化創意" },

  // 商業/顧問
  { code: "biz-broker-insurance", name: "保險經紀人", rate: 0.26, category: "商業顧問" },
  { code: "biz-agent-insurance", name: "保險代理人", rate: 0.26, category: "商業顧問" },
  { code: "biz-realtor", name: "不動產經紀人", rate: 0.26, category: "商業顧問" },
  { code: "biz-consultant", name: "管理顧問", rate: 0.25, category: "商業顧問" },
  { code: "biz-instructor", name: "講師/補教老師", rate: 0.25, category: "商業顧問" },
  { code: "biz-fitness", name: "健身教練", rate: 0.25, category: "商業顧問" },
  { code: "biz-youtuber", name: "YouTuber/網紅", rate: 0.20, category: "商業顧問" },

  // 其他
  { code: "other-broker", name: "證券經紀人", rate: 0.20, category: "其他" },
  { code: "other-dietitian", name: "營養師", rate: 0.20, category: "其他" },
  { code: "other-psychologist", name: "心理師", rate: 0.20, category: "其他" },
  { code: "other-social-worker", name: "社會工作師", rate: 0.15, category: "其他" },
  { code: "other-driving", name: "駕訓班教練", rate: 0.25, category: "其他" },
  { code: "other-guide", name: "導遊", rate: 0.25, category: "其他" },
  { code: "other-general", name: "一般自由業（其他）", rate: 0.20, category: "其他" },
];

/** 勞保/健保估算用 — 工會投保 */
export const UNION_LABOR_INSURANCE_RATE = 0.12; // 勞保費率（含就保）
export const UNION_LABOR_SELF_RATIO = 0.6;      // 自付比例 60%
export const UNION_HEALTH_INSURANCE_RATE = 0.0517;
export const UNION_HEALTH_SELF_RATIO = 0.6;     // 自付比例 60%
export const UNION_HEALTH_DEPENDENTS_MULTIPLIER = 1; // 本人 + 眷屬（簡化為本人）

/** 常見工會投保薪資級距 */
export const COMMON_INSURED_SALARIES = [
  27_470, 28_800, 30_300, 31_800, 33_300, 34_800,
  36_300, 38_200, 40_100, 42_000, 45_800,
];

/** 所得類型中文名 */
export const INCOME_TYPE_LABELS: Record<string, string> = {
  salary: "薪資所得",
  "9A": "9A 執行業務所得",
  "9B": "9B 稿費/版稅",
  "50": "50 其他所得",
  rental: "租賃所得",
  dividend: "股利所得",
  other: "其他所得",
};
