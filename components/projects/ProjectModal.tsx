"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ProjectArtwork from "./ProjectArtwork";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

/**
 * Dialog detail proyek memakai elemen <dialog> native agar fokus
 * terperangkap, Escape bekerja, dan fokus kembali ke kartu setelah ditutup.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("portfolio:lock-scroll"));

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event("portfolio:unlock-scroll"));
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`project-title-${project.slug}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-[920px] overflow-visible bg-transparent text-foreground sm:w-[calc(100vw-3rem)]"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent
        className="relative max-h-[90svh] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-border bg-background shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
      >
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden rounded-t-[1.75rem] bg-[#090c10] sm:aspect-[16/8]">
            <ProjectArtwork project={project} />
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <span>{project.category}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{project.year}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{project.role}</span>
            <span
              className={cn(
                "ml-auto rounded-full px-2.5 py-1 text-[8px]",
                project.status === "Selesai"
                  ? "bg-accent-soft text-accent-ink"
                  : "bg-amber-400/10 text-amber-500 dark:text-amber-300",
              )}
            >
              {project.status}
            </span>
          </div>

          <h2
            id={`project-title-${project.slug}`}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl"
          >
            {project.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-strong">
            {project.tagline}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            {project.description}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-surface/60 p-3"
              >
                <dt className="text-[9px] leading-4 text-muted">
                  {metric.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 grid gap-7 sm:grid-cols-[1fr_0.8fr]">
            <div>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Yang saya kerjakan
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-[13.5px] leading-6 text-muted-strong"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                      <Check className="h-2.5 w-2.5" aria-hidden />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Teknologi
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.06em] text-muted-strong"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-border pt-5">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Buka demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink"
              >
                <SiGithub className="h-3.5 w-3.5" aria-hidden />
                Lihat kode
              </a>
            ) : null}
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted/60">
              <ExternalLink className="h-3 w-3" aria-hidden /> studi kasus
            </span>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}
