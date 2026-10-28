"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Provider global:
 * - next-themes: mode gelap/terang (default gelap).
 * - MotionConfig: hormati prefers-reduced-motion secara otomatis.
 * - Lenis: smooth scrolling + sinkronisasi dengan GSAP ScrollTrigger.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="arya-theme"
    >
      <MotionConfig reducedMotion="user">
        {children}
        <SmoothScroll />
      </MotionConfig>
    </NextThemesProvider>
  );
}

function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        lerp: 0.1,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onAnchorClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        const anchor = (event.target as HTMLElement | null)?.closest(
          'a[href^="#"]',
        );

        if (!(anchor instanceof HTMLAnchorElement)) return;

        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;

        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target, {
          offset: -84,
          duration: 1.25,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
        window.history.replaceState(null, "", hash);
      };

      const onLock = () => lenis.stop();
      const onUnlock = () => lenis.start();

      document.addEventListener("click", onAnchorClick);
      window.addEventListener("portfolio:lock-scroll", onLock);
      window.addEventListener("portfolio:unlock-scroll", onUnlock);

      cleanup = () => {
        document.removeEventListener("click", onAnchorClick);
        window.removeEventListener("portfolio:lock-scroll", onLock);
        window.removeEventListener("portfolio:unlock-scroll", onUnlock);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    void init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
