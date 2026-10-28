import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** Nomor bab, mis. "01". */
  index: string;
  /** Label pendek, mis. "Tentang". */
  label: string;
  /** Judul utama section. */
  title: ReactNode;
  /** Paragraf pendukung (opsional). */
  description?: ReactNode;
  /** Terapkan warna terang di atas bidang aksen. */
  inverted?: boolean;
  /** Rata tengah untuk satu momen saja. */
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  index,
  label,
  title,
  description,
  inverted = false,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            inverted ? "text-black/60" : "text-muted",
          )}
        >
          <span className={inverted ? "text-black" : "text-accent-ink"}>
            {index}
          </span>
          <span
            aria-hidden
            className={cn(
              "h-px w-10",
              inverted ? "bg-black/30" : "bg-border-strong",
            )}
          />
          <span>{label}</span>
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-5 text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.9rem]",
            inverted ? "text-black" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-7 sm:text-lg",
              align === "center" && "mx-auto",
              inverted ? "text-black/70" : "text-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
