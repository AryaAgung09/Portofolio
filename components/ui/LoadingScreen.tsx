"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIsVisible(true), 0);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion ? 500 : 1600;
    const startedAt = Date.now();

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const completion = Math.min(elapsed / duration, 1);
      setProgress(Math.round(completion * 92));
    }, 50);

    let hideTimer: number | undefined;
    const finishTimer = window.setTimeout(() => {
      window.clearInterval(progressTimer);
      setProgress(100);
      hideTimer = window.setTimeout(() => {
        onComplete();
        setIsVisible(false);
      }, reducedMotion ? 0 : 180);
    }, duration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(finishTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="portfolio-loading-screen"
          role="status"
          aria-live="polite"
          aria-label="Memuat portofolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex min-h-svh items-center justify-center overflow-hidden bg-[#080d16] px-6 text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(147,197,253,0.4) 0.7px, transparent 0.7px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse at center, black, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[100px]"
          />

          <div className="relative flex w-full max-w-[300px] flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-7 flex h-[68px] w-[68px] items-center justify-center"
            >
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-blue-200/15 border-t-blue-200/80"
              />
              <span className="font-heading text-lg font-medium tracking-[-0.06em] text-blue-100">
                {profile.initials}
              </span>
            </motion.div>

            <p className="text-sm font-medium tracking-wide text-white/85">
              {profile.shortName}
            </p>
            <p className="mt-1.5 text-xs text-white/45">
              Menyiapkan portofolio
            </p>

            <div className="mt-8 w-full">
              <div
                role="progressbar"
                aria-label="Progres pemuatan"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-px w-full overflow-hidden bg-white/10"
              >
                <motion.div
                  className="h-full origin-left bg-blue-200/90"
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-wide text-white/35">
                  MEMUAT
                </span>
                <span className="font-mono text-[9px] tabular-nums text-white/45">
                  {progress.toString().padStart(2, "0")}%
                </span>
              </div>
            </div>

            <div className="mt-7">
              <button
                type="button"
                onClick={() => {
                  onComplete();
                  setIsVisible(false);
                }}
                className="text-[11px] text-white/40 transition-colors hover:text-white/80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                Lewati
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
