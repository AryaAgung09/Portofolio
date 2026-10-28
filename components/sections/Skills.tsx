"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MousePointerClick, Plus, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  familiarTools,
  skills,
  type Skill,
  type SkillCategory,
} from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";

type Filter = "Semua" | SkillCategory;

const filters: Filter[] = ["Semua", "Frontend", "Backend", "Database", "Tools"];

const totalCategories = filters.filter((item) => item !== "Semua").length;

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const [selected, setSelected] = useState<string | null>(null);
  const [columns, setColumns] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tileGridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      filter === "Semua"
        ? skills
        : skills.filter((skill) => skill.category === filter),
    [filter],
  );

  const active = visible.find((skill) => skill.name === selected) ?? visible[0];
  const activeIndex = Math.max(
    visible.findIndex((skill) => skill.name === active.name),
    0,
  );
  const brand = active.color ?? "var(--accent)";

  const remainder = columns > 0 ? visible.length % columns : 0;
  const fillerSpan = remainder > 0 ? columns - remainder : 0;

  const countFor = (item: Filter) =>
    item === "Semua"
      ? skills.length
      : skills.filter((skill) => skill.category === item).length;

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setSelected(null);
  };

  /**
   * Jumlah kolom dibaca dari grid supaya sisa baris terakhir bisa diisi
   * satu petak "terus bertambah" tanpa menyisakan ikon yang menggantung.
   */
  useEffect(() => {
    const node = tileGridRef.current;
    if (!node) return;

    const measure = () => {
      const template = getComputedStyle(node).gridTemplateColumns;
      const count = template.split(" ").filter(Boolean).length;
      setColumns(template === "none" ? 0 : count);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [filter]);

  /* Escape menutup kartu detail versi mobile. */
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  /* Sorotan lembut mengikuti kursor di atas grid ikon. */
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
            {totalCategories} kategori
            <br />
            klik untuk detail
          </p>
        </div>

        {/* Filter kategori */}
        <div className="mt-12 flex flex-col gap-3 border-y border-border py-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter kategori keahlian"
            className="flex flex-wrap items-center gap-1.5"
          >
            {filters.map((item) => {
              const isActive = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => changeFilter(item)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-surface/70 hover:text-foreground",
                  )}
                >
                  {item}
                  <span
                    className={cn(
                      "font-mono text-[9px] tabular-nums",
                      isActive ? "text-black/55" : "text-muted/60",
                    )}
                  >
                    {String(countFor(item)).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <MousePointerClick className="h-3 w-3 text-accent-ink" aria-hidden />
            Klik ikon untuk detail
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          {/* Grid ikon */}
          <div
            ref={spotlightRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative isolate"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(220px circle at var(--spot-x, -200px) var(--spot-y, -200px), color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
                opacity: "var(--spot-o, 0)",
              }}
            />

            <div
              key={filter}
              ref={tileGridRef}
              className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 xl:grid-cols-5"
            >
              {visible.map((skill, index) => {
                const isActive = skill.name === active.name;
                const skillBrand = skill.color ?? "var(--accent)";

                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelected(skill.name)}
                    aria-pressed={isActive}
                    aria-label={`${skill.name} — ${skill.note}`}
                    style={{
                      animationDelay: `${Math.min(index * 26, 360)}ms`,
                    }}
                    className={cn(
                      "group/tile relative isolate flex aspect-square animate-fade-in flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 py-3 text-center transition-[transform,border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:animate-none",
                      isActive
                        ? "border-accent/55 bg-accent/[0.07]"
                        : "border-border bg-surface/40 hover:-translate-y-1 hover:border-border-strong hover:bg-surface/75",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-0 transition-opacity duration-500",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover/tile:opacity-100",
                      )}
                      style={{
                        background: `radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, ${skillBrand} 16%, transparent), transparent 72%)`,
                      }}
                    />

                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-2 top-1.5 font-mono text-[7.5px] tabular-nums transition-colors",
                        isActive
                          ? "text-accent-ink"
                          : "text-muted/40 group-hover/tile:text-muted/70",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute right-2 top-2 h-1.5 w-1.5 rounded-full transition-opacity",
                        isActive
                          ? "opacity-100"
                          : "opacity-35 group-hover/tile:opacity-80",
                      )}
                      style={{ backgroundColor: skillBrand }}
                    />

                    <span
                      className={cn(
                        "relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300",
                        isActive
                          ? "border-accent/30 bg-background/70"
                          : "border-transparent",
                      )}
                    >
                      <TechIcon
                        name={skill.icon}
                        color={skill.color}
                        className={cn(
                          "h-6 w-6 transition-transform duration-500 group-hover/tile:-translate-y-0.5 group-hover/tile:rotate-6 group-hover/tile:scale-110 sm:h-7 sm:w-7",
                          isActive && "animate-float-slow",
                          !skill.color &&
                            "text-muted-strong group-hover/tile:text-accent-ink",
                        )}
                      />
                    </span>

                    <span
                      className={cn(
                        "relative z-10 w-full truncate text-[10px] font-medium leading-4 tracking-tight transition-colors sm:text-[10.5px]",
                        isActive
                          ? "text-foreground"
                          : "text-muted group-hover/tile:text-muted-strong",
                      )}
                    >
                      {skill.name}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-px transition-opacity duration-300",
                        isActive
                          ? "bg-accent/60 opacity-100"
                          : "bg-accent/40 opacity-0 group-hover/tile:opacity-100",
                      )}
                    />
                  </button>
                );
              })}

              {fillerSpan > 0 ? (
                <div
                  style={{
                    gridColumn: `span ${fillerSpan} / span ${fillerSpan}`,
                    animationDelay: "140ms",
                  }}
                  className={cn(
                    "flex animate-fade-in items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/20 p-3 motion-reduce:animate-none",
                    fillerSpan === 1 ? "flex-col text-center" : "px-5 py-4",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong/60 text-muted">
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div className={cn(fillerSpan > 1 && "text-left")}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      Terus bertambah
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-muted/70">
                      Ruang untuk alat berikutnya
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Panel detail (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/55 p-6">
                <div
                  aria-hidden
                  className="grid-field absolute inset-0 opacity-30"
                />
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
                    total={visible.length}
                  />
                </div>
              </div>

              <p className="mt-3 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted/70">
                <Sparkles className="h-3 w-3 text-accent-ink" aria-hidden />
                Detail diperbarui saat ikon dipilih
              </p>
            </div>
          </aside>
        </div>

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
              <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-background/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-25 blur-2xl"
                  style={{ backgroundColor: brand }}
                />
                <div className="relative">
                  <SkillDetail
                    skill={active}
                    index={activeIndex}
                    total={visible.length}
                    onClose={() => setSelected(null)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Teknologi lain */}
        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-border bg-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
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
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: brand }}
          />
          {skill.category}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tabular-nums text-muted/70">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail keahlian"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 animate-spin-slow rounded-2xl border border-dashed border-border-strong/70"
          />
          <span
            aria-hidden
            className="absolute inset-2 rounded-full opacity-30 blur-xl"
            style={{ backgroundColor: brand }}
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/80">
            <TechIcon
              name={skill.icon}
              color={skill.color}
              className={cn(
                "h-6 w-6",
                !skill.color && "text-muted-strong",
              )}
            />
          </span>
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

      <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/70">
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
