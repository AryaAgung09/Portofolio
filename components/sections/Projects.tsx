"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  projectCategories,
  projects,
  socials,
  type Project,
  type ProjectFilter,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

const githubUrl =
  socials.find((social) => social.icon === "github")?.href ??
  "https://github.com/";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("Semua");
  const [selected, setSelected] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  const visibleProjects = useMemo(
    () =>
      filter === "Semua"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const countFor = (category: ProjectFilter) =>
    category === "Semua"
      ? projects.length
      : projects.filter((project) => project.category === category).length;

  const showFeatured = filter === "Semua";

  return (
    <section id="proyek" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-surface/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            label="Proyek"
            title={
              <>
                Karya terpilih.
                <br />
                <span className="text-muted">Buka, bukan cuma lihat.</span>
              </>
            }
            description="Enam studi kasus: apa masalahnya, keputusan apa yang saya ambil, dan bagaimana hasilnya. Klik kartu untuk membaca detail lengkapnya."
          />

          <Reveal delay={0.1} className="shrink-0">
            <p className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted lg:justify-end">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                {String(projects.length).padStart(2, "0")}
              </span>
              proyek terpilih
              <span aria-hidden className="mx-1 h-4 w-px bg-border-strong" />
              2024—2026
            </p>
          </Reveal>
        </div>

        {/* Filter kategori */}
        <div className="mt-10 flex flex-col gap-3 border-y border-border py-3 sm:flex-row sm:items-center sm:justify-between">
          <LayoutGroup id="project-filters">
            <div
              role="group"
              aria-label="Filter kategori proyek"
              className="flex flex-wrap items-center gap-1"
            >
              {projectCategories.map((category) => {
                const isActive = filter === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative isolate shrink-0 rounded-full px-2.5 py-2 text-[11.5px] font-medium transition-colors duration-200 sm:px-3.5 sm:text-[12px]",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                      />
                    ) : null}
                    <span className="relative flex items-center gap-1.5">
                      {category}
                      <span
                        className={cn(
                          "font-mono text-[9px] tabular-nums",
                          isActive ? "text-black/55" : "text-muted/60",
                        )}
                      >
                        {String(countFor(category)).padStart(2, "0")}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <p
            aria-live="polite"
            className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:block"
          >
            Menampilkan {String(visibleProjects.length).padStart(2, "0")} dari{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        {/* Grid proyek */}
        <motion.div
          layout={!reduceMotion}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => {
              const isFeatured = Boolean(project.featured) && showFeatured;

              return (
                <motion.div
                  key={project.slug}
                  layout={!reduceMotion}
                  initial={{ opacity: 0, y: 22, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -12, scale: 0.985 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={cn(
                    "min-w-0",
                    isFeatured && "md:col-span-2",
                  )}
                >
                  <ProjectCard
                    project={project}
                    featured={isFeatured}
                    onOpen={() => setSelected(project)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            Belum ada proyek di kategori ini. Coba filter lain.
          </p>
        ) : null}

        {/* CTA arsip */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface/40 p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-strong">
                <SiGithub className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium tracking-tight text-foreground">
                  Masih ada eksperimen kecil lainnya di GitHub.
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Latihan, potongan kode, dan proyek kuliah yang tidak masuk
                  studi kasus.
                </p>
              </div>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-strong transition-colors hover:border-accent/60 hover:bg-accent hover:text-accent-foreground"
            >
              Lihat repositori
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </Reveal>
      </div>

      {selected ? (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
