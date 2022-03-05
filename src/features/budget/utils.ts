export function formatMoney(m: number, addSign = false): string {
  const sign = m > 0 && addSign ? "+" : "";
  return sign + (m / 100).toLocaleString("ru-ru", { maximumFractionDigits: 0 });
}
