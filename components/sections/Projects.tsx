"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  projects,
  socials,
  type Project,
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
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const scrollToProject = (index: number) => {
    const carousel = carouselRef.current;
    const slide = carousel?.querySelector<HTMLElement>(
      `[data-project-index="${index}"]`,
    );
    if (!carousel || !slide) return;

    const left =
      carousel.scrollLeft +
      slide.getBoundingClientRect().left -
      carousel.getBoundingClientRect().left -
      (carousel.clientWidth - slide.clientWidth) / 2;

    carousel.scrollTo({
      left,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    const slides = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-project-index]"),
    );
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const slide of slides) {
      const distance = Math.abs(
        slide.getBoundingClientRect().left +
          slide.getBoundingClientRect().width / 2 -
          center,
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = Number(slide.dataset.projectIndex);
      }
    }

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  };

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
            description="Proyek web, IoT, dan repositori pilihan. Buka detail untuk melihat cakupan proyek serta tautan sumber informasinya."
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

        {projects.length > 0 ? (
          <div className="mt-10 sm:mt-12">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              role="region"
              aria-roledescription="carousel"
              aria-label="Carousel proyek"
              className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex items-stretch gap-4 py-2">
                <span
                  aria-hidden
                  className="w-[14%] shrink-0 sm:w-[11%] lg:w-[10%]"
                />
                {projects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    data-project-index={index}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${project.title}, ${index + 1} dari ${projects.length}`}
                    className="w-[72%] max-w-[920px] shrink-0 snap-center sm:w-[78%] lg:w-[80%]"
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0.55 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onOpen={() => setSelected(project)}
                    />
                  </motion.div>
                ))}
                <span
                  aria-hidden
                  className="w-[14%] shrink-0 sm:w-[11%] lg:w-[10%]"
                />
              </div>
            </div>

            <div className="mx-auto mt-5 flex max-w-[920px] items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToProject(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Lihat proyek sebelumnya"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <div className="flex min-w-0 flex-col items-center gap-3">
                <p
                  aria-live="polite"
                  className="text-sm font-medium tabular-nums text-muted-strong"
                >
                  {String(activeIndex + 1).padStart(2, "0")}{" "}
                  <span className="text-muted">/</span>{" "}
                  {String(projects.length).padStart(2, "0")}
                </p>
                <div
                  role="group"
                  aria-label="Pilih proyek"
                  className="flex max-w-full flex-wrap justify-center gap-2"
                >
                  {projects.map((project, index) => (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={() => scrollToProject(index)}
                      aria-label={`Tampilkan proyek ${project.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      className={cn(
                        "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        index === activeIndex
                          ? "w-7 bg-accent"
                          : "w-2 bg-border-strong hover:bg-muted",
                      )}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToProject(activeIndex + 1)}
                disabled={activeIndex === projects.length - 1}
                aria-label="Lihat proyek berikutnya"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        ) : null}

        {projects.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            Belum ada proyek untuk ditampilkan.
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
