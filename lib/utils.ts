/**
 * Penggabung className sederhana tanpa dependensi tambahan.
 * Contoh: cn("px-4", isActive && "text-accent", className)
 */
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Format angka desimal dengan pemisah koma ala Indonesia. */
export function formatDecimal(value: number, decimals = 0): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Tahun berjalan untuk copyright. */
export function currentYear(): number {
  return new Date().getFullYear();
}
