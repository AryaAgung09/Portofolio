"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MousePointerClick, Plus, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { familiarTools, skills, type Skill } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";

/**
 * Offset vertikal per ikon supaya susunannya terasa organik (tidak rata),
 * meniru benda-benda yang melayang di ruang kosong.
 */
const drift = [10, -8, 18, 0, -14, 22, 6, -20, 14, 26, -10, 8, -16, 20, 2, -22, 16, 10, -6, 24, 4];

/** Durasi & delay animasi berbeda tiap ikon agar tidak bergerak serempak. */
const floatTiming = (index: number) => {
  const duration = 5.5 + (index % 5) * 0.9;
  const delay = -(index % 7) * 0.7;
  return { duration, delay };
};

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const active = skills.find((skill) => skill.name === selected) ?? skills[0];
  const activeIndex = Math.max(
    skills.findIndex((skill) => skill.name === active.name),
    0,
  );
  const brand = active.color ?? "var(--accent)";

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = spotlightRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    node.style.setProperty("--spot-o", "1");
  };

  const handlePointerLeave = () => {
    spotlightRef.current?.style.setProperty("--spot-o", "0");
  };

  return (
    <section id="keahlian" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            label="Keahlian"
            title={
              <>
                Alat kerja saya.
                <br />
                <span className="text-muted">Terus bertambah.</span>
              </>
            }
            description="Bukan daftar logo untuk mengisi CV. Klik ikonnya untuk melihat bagaimana saya memakai tiap alat—dari prototipe sampai production."
          />
          <p className="hidden max-w-[210px] shrink-0 border-l border-border pl-5 font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted lg:block">
            {skills.length} teknologi
            <br />
            terus bertambah
            <br />
            klik untuk detail
          </p>
        </div>

        {/* Ruang melayang: ikon bebas tanpa kotak & tanpa kategori */}
        <div
          ref={spotlightRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative isolate mt-10 overflow-hidden rounded-[2rem] border border-border/40 bg-surface/20 px-4 py-12 sm:px-8 sm:py-16 lg:mt-12"
        >
          {/* Aurora lembut di belakang ikon */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 opacity-60"
            style={{
              background:
                "radial-gradient(60% 55% at 20% 20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%), radial-gradient(55% 60% at 80% 70%, color-mix(in srgb, #8b5cf6 10%, transparent), transparent 70%)",
            }}
          />
          {/* Sorotan mengikuti kursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(240px circle at var(--spot-x, -200px) var(--spot-y, -200px), color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
              opacity: "var(--spot-o, 0)",
            }}
          />

          <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:gap-x-10">
            {skills.map((skill, index) => {
              const isActive = skill.name === active.name;
              const skillBrand = skill.color ?? "var(--accent)";
              const { duration, delay } = floatTiming(index);
              const sizeClass =
                index % 4 === 0
                  ? "h-11 w-11 sm:h-12 sm:w-12"
                  : index % 3 === 0
                    ? "h-8 w-8 sm:h-9 sm:w-9"
                    : "h-9 w-9 sm:h-10 sm:w-10";

              return (
                <div
                  key={skill.name}
                  className="flex justify-center"
                  style={{ marginTop: drift[index % drift.length] }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setSelected(skill.name)}
                    aria-pressed={isActive}
                    aria-label={`${skill.name} — ${skill.note}`}
                    whileHover={{ scale: 1.12, y: -6 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="group/f relative flex w-[70px] flex-col items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[84px]"
                  >
                    {/* Wrapper animasi melayang */}
                    <span
                      className="relative flex items-center justify-center"
                      style={{
                        animation: `float-slow ${duration}s ease-in-out ${delay}s infinite`,
                      }}
                    >
                      {/* Halo brand */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute h-12 w-12 rounded-full blur-xl transition-all duration-500 sm:h-14 sm:w-14",
                          isActive
                            ? "opacity-60 sm:h-16 sm:w-16"
                            : "opacity-25 group-hover/f:opacity-55",
                        )}
                        style={{ backgroundColor: skillBrand }}
                      />

                      {/* Cincin tipis saat aktif — bukan kotak */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute rounded-full border transition-all duration-500",
                          isActive
                            ? "h-14 w-14 border-accent/45 opacity-100 sm:h-16 sm:w-16"
                            : "h-11 w-11 border-white/10 opacity-0 group-hover/f:opacity-100",
                        )}
                      />

                      <TechIcon
                        name={skill.icon}
                        color={skill.color}
                        className={cn(
                          "relative z-10 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] transition-transform duration-500",
                          sizeClass,
                          !skill.color && "text-muted-strong",
                          isActive && "scale-110",
                        )}
                      />
                    </span>

                    <span
                      className={cn(
                        "max-w-full truncate font-mono text-[8.5px] uppercase tracking-[0.1em] transition-colors sm:text-[9px]",
                        isActive
                          ? "text-accent-ink"
                          : "text-muted group-hover/f:text-muted-strong",
                      )}
                    >
                      {skill.name}
                    </span>
                  </motion.button>
                </div>
              );
            })}

            {/* Slot "terus bertambah" — ikut melayang */}
            <div className="flex justify-center" style={{ marginTop: 14 }}>
              <div className="flex w-[70px] flex-col items-center gap-2.5 sm:w-[84px]">
                <span
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-border-strong/60 text-muted sm:h-10 sm:w-10"
                  style={{ animation: "float-slow 6.4s ease-in-out -1.4s infinite" }}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted sm:text-[9px]">
                  Terus bertambah
                </span>
              </div>
            </div>
          </div>

          <p className="mt-12 flex items-center justify-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
            <MousePointerClick className="h-3 w-3 text-accent-ink" aria-hidden />
            Klik ikon untuk detail
          </p>
        </div>

        {/* Panel detail (desktop) */}
        <aside className="mt-6 hidden lg:block">
          <div className="sticky top-28">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div aria-hidden className="grid-field absolute inset-0 opacity-30" />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full opacity-20 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: brand }}
              />

              <div className="relative" aria-live="polite">
                <SkillDetail
                  key={active.name}
                  skill={active}
                  index={activeIndex}
                  total={skills.length}
                />
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
              <Sparkles className="h-3 w-3 text-accent-ink" aria-hidden />
              Detail diperbarui saat ikon dipilih
            </p>
          </div>
        </aside>

        {/* Detail versi mobile: muncul hanya setelah ikon dipilih */}
        <AnimatePresence>
          {selected ? (
            <motion.div
              key="skill-detail-mobile"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              role="region"
              aria-label={`Detail ${active.name}`}
              style={{ bottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
              className="fixed inset-x-3 z-40 lg:hidden"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border-strong/50 bg-background/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-25 blur-2xl"
                  style={{ backgroundColor: brand }}
                />
                <div className="relative">
                  <SkillDetail
                    skill={active}
                    index={activeIndex}
                    total={skills.length}
                    onClose={() => setSelected(null)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Teknologi lain */}
        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-border/50 bg-white/[0.03] p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-accent-ink">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-medium text-muted-strong">
                Juga familiar dengan {familiarTools.length} tools lain
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-muted">
                Dipakai sesekali untuk eksperimen dan proyek kecil.
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            {familiarTools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-border/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SkillDetail({
  skill,
  index,
  total,
  onClose,
}: {
  skill: Skill;
  index: number;
  total: number;
  onClose?: () => void;
}) {
  const brand = skill.color ?? "var(--accent)";

  return (
    <div className="animate-rise-in motion-reduce:animate-none">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-white/[0.05] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: brand }}
          />
          Alat kerja
        </span>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tabular-nums text-muted">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail keahlian"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>

      {/* Ikon melayang tanpa kotak */}
      <div className="mt-6 flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-2 rounded-full opacity-35 blur-xl"
            style={{ backgroundColor: brand, animation: "pulse-soft 6s ease-in-out infinite" }}
          />
          <span
            aria-hidden
            className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-border-strong/50"
          />
          <TechIcon
            name={skill.icon}
            color={skill.color}
            className={cn(
              "relative z-10 h-9 w-9 drop-shadow-[0_6px_14px_rgba(0,0,0,0.4)]",
              !skill.color && "text-muted-strong",
            )}
            style={{ animation: "float-slow 5s ease-in-out infinite" }}
          />
        </div>

        <div className="min-w-0 pt-0.5">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
            {skill.name}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-5 text-muted">
            {skill.note}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
          {skill.color ? "Warna brand" : "Ikon monokrom"}
        </span>
        {skill.color ? (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-strong">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            {skill.color}
          </span>
        ) : (
          <span className="font-mono text-[9px] text-muted">netral</span>
        )}
      </div>
    </div>
  );
}