"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Tombol ganti tema. Ikon ditentukan lewat CSS (.dark) agar tidak ada
 * hydration mismatch antara server dan klien.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti mode gelap atau terang"
      title="Ganti tema"
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink",
        className,
      )}
    >
      <Sun className="h-[18px] w-[18px] dark:hidden" aria-hidden />
      <Moon className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <span className="sr-only">Ganti tema</span>
    </button>
  );
}
