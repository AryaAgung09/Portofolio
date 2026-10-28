"use client";

import { navigation } from "@/data/portfolio";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.id);

/**
 * Indikator section di sisi kanan (desktop).
 * Memberi konteks “kamu ada di mana” tanpa menutupi konten.
 */
export default function SectionIndicator() {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Navigasi section"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 lg:flex"
    >
      {navigation.map((item) => {
        const isActive = active === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 py-1.5 outline-offset-4"
          >
            <span
              className={cn(
                "translate-x-2 font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                isActive ? "text-accent-ink" : "text-muted",
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-1.5 w-1.5 bg-muted/40 group-hover:bg-muted-strong",
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
