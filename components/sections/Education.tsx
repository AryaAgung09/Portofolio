"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Award,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { timeline, type TimelineType } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const typeStyles: Record<
  TimelineType,
  { icon: LucideIcon; badge: string; dot: string }
> = {
  Pendidikan: {
    icon: GraduationCap,
    badge: "border-accent/30 bg-accent-soft text-accent-ink",
    dot: "bg-accent",
  },
  Pengalaman: {
    icon: Briefcase,
    badge: "border-sky-400/25 bg-sky-400/10 text-sky-600 dark:text-sky-300",
    dot: "bg-sky-400",
  },
  Organisasi: {
    icon: Users,
    badge:
      "border-violet-400/25 bg-violet-400/10 text-violet-600 dark:text-violet-300",
    dot: "bg-violet-400",
  },
  Sertifikasi: {
    icon: Award,
    badge:
      "border-amber-400/25 bg-amber-400/10 text-amber-600 dark:text-amber-300",
    dot: "bg-amber-400",
  },
};

export default function Education() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [-70, 90]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  /* Garis timeline digambar progresif mengikuti scroll. */
  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 72%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          },
        );
      }, list);

      cleanup = () => context.revert();
    };

    void init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  /* Item yang sedang berada di tengah layar menjadi "aktif". */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-timeline-item]"),
    );

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = items.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const activeItem = timeline[active] ?? timeline[0];

  return (
    <section
      ref={sectionRef}
      id="pendidikan"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/30 py-24 sm:py-32"
    >
      {/* Parallax dekorasi */}
      <motion.div
        aria-hidden
        suppressHydrationWarning
        style={{ y: reduceMotion ? 0 : decorY, rotate: reduceMotion ? 0 : decorRotate }}
        className="pointer-events-none absolute -left-24 top-24 hidden h-64 w-64 rounded-[3rem] border border-accent/20 lg:block"
      />
      <motion.div
        aria-hidden
        suppressHydrationWarning
        style={{ y: reduceMotion ? 0 : decorY }}
        className="pointer-events-none absolute -right-16 bottom-24 hidden h-40 w-40 rounded-full bg-accent/[0.07] blur-2xl lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="05"
          label="Perjalanan"
          title={
            <>
              Perjalanan.
              <br />
              <span className="text-muted">Lapisan demi lapisan.</span>
            </>
          }
          description="Pendidikan, pengalaman, dan organisasi yang membentuk cara saya bekerja—diurutkan dari yang paling baru."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          {/* Panel tahun aktif (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Sedang disorot
              </p>

              <div className="mt-4 flex items-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeItem.year}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[6.5rem] font-semibold leading-none tracking-[-0.07em] text-foreground"
                  >
                    {activeItem.year}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-2 self-end pb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  / 2026
                </span>
              </div>

              <div className="mt-6 min-h-[132px] border-t border-border pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent-ink">
                  {activeItem.type}
                </p>
                <p className="mt-2 text-lg font-medium leading-7 tracking-tight text-foreground">
                  {activeItem.title}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {activeItem.organization}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5">
                {timeline.map((item, index) => (
                  <span
                    key={`${item.year}-${item.title}`}
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-300",
                      index <= active ? "bg-accent" : "bg-border-strong/50",
                    )}
                  />
                ))}
              </div>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(timeline.length).padStart(2, "0")} entri
              </p>

              <nav aria-label="Lompat ke entri riwayat" className="mt-7">
                <ul className="space-y-1">
                  {timeline.map((item, index) => (
                    <li key={`${item.year}-nav-${item.title}`}>
                      <a
                        href={`#riwayat-${index}`}
                        aria-current={index === active ? "true" : undefined}
                        className={cn(
                          "flex items-baseline justify-between gap-3 rounded-lg py-1.5 text-[11px] transition-colors",
                          index === active
                            ? "text-foreground"
                            : "text-muted hover:text-muted-strong",
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        <span className="shrink-0 font-mono text-[9px] tabular-nums text-muted/70">
                          {item.year}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Timeline */}
          <div ref={listRef} className="relative">
            <div
              aria-hidden
              className="absolute bottom-2 left-2 top-2 w-px -translate-x-1/2 bg-border-strong/40"
            >
              <div
                ref={lineRef}
                className="h-full w-px origin-top bg-accent"
              />
            </div>

            <ol className="space-y-3">
              {timeline.map((item, index) => {
                const style = typeStyles[item.type];
                const Icon = style.icon;
                const isActive = index === active;

                return (
                  <li
                    key={`${item.year}-${item.title}`}
                    id={`riwayat-${index}`}
                    data-timeline-item
                    className="relative scroll-mt-28 pl-8 sm:pl-10"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-2 top-6 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background transition-all duration-300",
                        isActive
                          ? "scale-110 border-accent"
                          : "border-border-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all duration-300",
                          isActive ? style.dot : "bg-muted/50",
                        )}
                      />
                    </span>

                    <Reveal delay={0.04} amount={0.15}>
                      <article
                        className={cn(
                          "group rounded-2xl border bg-background/70 p-5 transition-all duration-300 sm:p-6",
                          isActive
                            ? "border-accent/35 shadow-[0_18px_45px_-30px_var(--shadow-color)]"
                            : "border-border hover:border-border-strong",
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                              style.badge,
                            )}
                          >
                            <Icon className="h-3 w-3" aria-hidden />
                            {item.type}
                          </span>

                          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                            {item.period}
                            {item.current ? (
                              <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[7.5px] text-accent-ink">
                                now
                              </span>
                            ) : null}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] text-muted-strong">
                          {item.organization}
                          <span aria-hidden className="mx-1.5 text-muted/50">
                            ·
                          </span>
                          <span className="text-muted">{item.location}</span>
                        </p>
                        <p className="mt-2.5 text-[13.5px] leading-6 text-muted">
                          {item.description}
                        </p>

                        {item.highlights?.length ? (
                          <ul className="mt-3 space-y-1.5">
                            {item.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="flex items-start gap-2 text-[12.5px] leading-5 text-muted-strong"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-accent"
                                />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.05em] text-muted"
                            >
                              {tag}
                            </span>
                          ))}

                          {item.credentialUrl ? (
                            <a
                              href={item.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-muted-strong transition-colors hover:text-accent-ink"
                            >
                              Kredensial
                              <ExternalLink className="h-2.5 w-2.5" aria-hidden />
                            </a>
                          ) : null}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
