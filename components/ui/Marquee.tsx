import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Durasi satu putaran (detik). */
  speed?: number;
};

/**
 * Pita teknologi yang bergerak horizontal.
 * Dekoratif, jadi disembunyikan dari screen reader—daftar lengkap ada di
 * section Keahlian. Animasi berhenti saat reduced motion aktif.
 */
export default function Marquee({ items, className, speed = 38 }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10"
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-7 sm:gap-10">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
            {item}
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent/70"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-border bg-surface/40 py-4",
        className,
      )}
    >
      <div className="mask-fade-x flex w-max">
        <div
          className="flex animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
