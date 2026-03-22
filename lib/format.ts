const ntdFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("zh-TW", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatNTD(n: number): string {
  return ntdFormatter.format(n);
}

export function formatNumber(n: number): string {
  return numberFormatter.format(n);
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatRatio(n: number): string {
  return `${n.toFixed(1)}%`;
}
