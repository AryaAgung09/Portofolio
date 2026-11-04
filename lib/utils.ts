export { cn } from "cn"

export function currentYear(): number {
  return new Date().getFullYear();
}

export function formatDecimal(value: number, decimals = 0): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
