"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ProjectArtwork from "./ProjectArtwork";

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
};

export default function ProjectCard({
  project,
  onOpen,
  featured = false,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const maxTilt = featured ? 1.6 : 3.4;

  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 180, damping: 22 },
  );
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 180, damping: 22 },
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1400,
      }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/55 transition-colors duration-300 hover:border-accent/40",
        featured && "lg:grid lg:grid-cols-[1.04fr_0.96fr]",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Lihat studi kasus ${project.title}`}
        className={cn(
          "relative block w-full overflow-hidden text-left",
          featured && "lg:h-full",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            featured
              ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[380px]"
              : "aspect-[16/10]",
          )}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.035]">
            <ProjectArtwork project={project} />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95"
          />

          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold text-accent-foreground">
              Buka studi kasus
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>

          {featured ? (
            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
              Proyek unggulan
            </span>
          ) : null}
        </div>
      </button>

      <div className={cn("flex flex-1 flex-col p-5", featured && "lg:p-7")}>
        <div className="flex items-center justify-between gap-3 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
          <span>
            {project.category} · {project.year}
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                project.status === "Selesai" ? "bg-accent" : "bg-amber-400",
              )}
            />
            {project.status}
          </span>
        </div>

        <h3
          className={cn(
            "mt-2.5 text-2xl font-semibold tracking-[-0.035em] text-foreground",
            featured && "sm:text-[2rem]",
          )}
        >
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {project.tagline}
        </p>

        {featured ? (
          <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-muted/85">
            {project.description}
          </p>
        ) : null}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.06em] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <button
            type="button"
            onClick={onOpen}
            className="group/detail inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-strong transition-colors hover:text-accent-ink"
          >
            Lihat detail
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/detail:-translate-y-0.5 group-hover/detail:translate-x-0.5"
              aria-hidden
            />
          </button>

          <div className="flex items-center gap-1.5">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositori ${project.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-accent-ink"
              >
                <SiGithub className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo ${project.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-accent-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
