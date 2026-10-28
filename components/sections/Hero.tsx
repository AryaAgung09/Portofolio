"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import SocialLinks from "@/components/ui/SocialLinks";
import HeroPortrait from "./hero/HeroPortrait";
import Typewriter from "./hero/Typewriter";

const nameLineOne = ["Arya", "Agung"];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const gridY = useTransform(scrollY, [0, 900], [0, 110]);
  const ringY = useTransform(scrollY, [0, 900], [0, -150]);
  const glyphY = useTransform(scrollY, [0, 900], [0, 90]);
  const auroraY = useTransform(scrollY, [0, 900], [0, 160]);

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-16"
    >
      {/* Latar: grid, aurora, dan bentuk-bentuk kecil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          suppressHydrationWarning
          style={{ y: reduceMotion ? 0 : gridY }}
          className="grid-field absolute -inset-y-24 inset-x-0"
        />
        <motion.div
          suppressHydrationWarning
          style={{ y: reduceMotion ? 0 : auroraY }}
          className="aurora absolute -right-[18%] top-[6%] h-[78vmin] w-[78vmin] rounded-full opacity-55"
        />
        <div className="absolute left-[-12%] top-[4%] h-[42vmin] w-[42vmin] rounded-full bg-accent/[0.07] blur-[90px]" />

        <motion.div
          suppressHydrationWarning
          style={{ y: reduceMotion ? 0 : ringY }}
          className="absolute right-[6%] top-[16%] hidden h-28 w-28 rounded-full border border-accent/25 lg:block"
        >
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60" />
        </motion.div>

        <motion.span
          suppressHydrationWarning
          style={{ y: reduceMotion ? 0 : glyphY }}
          className="absolute left-[6%] top-[58%] hidden font-mono text-[13px] tracking-[0.2em] text-accent/35 md:block"
        >
          {"</>"}
        </motion.span>

        <span className="absolute left-[12%] top-[22%] h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent/40" />
        <span className="absolute right-[42%] top-[10%] font-mono text-lg text-muted/30">
          +
        </span>
        <span className="absolute bottom-[18%] left-[38%] font-mono text-sm text-muted/25">
          +
        </span>

        <p className="absolute bottom-24 right-8 hidden origin-bottom-right rotate-90 font-mono text-[9px] uppercase tracking-[0.28em] text-muted/50 lg:block">
          Portfolio / 2026
        </p>
        <p className="absolute bottom-8 left-8 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60 sm:block">
          01.13° N — 104.05° E
        </p>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:px-10">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 px-3.5 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-strong">
              {profile.availability} · 2026
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            Halo, saya
          </motion.p>

          <h1
            aria-label={profile.name}
            className="mt-3 text-[clamp(3.4rem,7.4vw,6.9rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-foreground"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              {nameLineOne.map((word, index) => (
                <span
                  key={word}
                  className="mr-[0.16em] inline-block overflow-hidden pb-[0.06em] align-bottom"
                >
                  <motion.span
                    initial={{ y: "112%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.14 + index * 0.07,
                      ease: EASE_OUT,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.3, ease: EASE_OUT }}
                className="inline-block"
              >
                Setiawan<span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease: EASE_OUT }}
            className="mt-6 flex min-h-[30px] flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Peran
            </span>
            <Typewriter
              words={profile.roles}
              className="text-lg font-medium tracking-tight text-foreground sm:text-xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56, ease: EASE_OUT }}
            className="mt-6 max-w-xl text-[17px] leading-7 text-muted-strong sm:text-lg sm:leading-8"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.63, ease: EASE_OUT }}
            className="mt-3 max-w-xl text-sm leading-6 text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#proyek"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_var(--shadow-color)]"
            >
              Lihat proyek
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
            <a
              href="#kontak"
              className="group inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-3.5 text-sm font-medium text-muted-strong transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent-ink"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Hubungi saya
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease: EASE_OUT }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Temukan saya
            </span>
            <span aria-hidden className="h-3 w-px bg-border-strong" />
            <SocialLinks size="sm" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE_OUT }}
          className="relative z-10 lg:pl-4"
        >
          <HeroPortrait />
        </motion.div>
      </div>

      <a
        href="#tentang"
        aria-label="Gulir ke bagian tentang saya"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-muted">
          Gulir
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-border-strong">
          <span className="absolute left-0 top-0 h-2 w-px animate-scroll-dot bg-accent" />
        </span>
        <ArrowDown className="h-3 w-3 text-muted" aria-hidden />
      </a>
    </section>
  );
}
