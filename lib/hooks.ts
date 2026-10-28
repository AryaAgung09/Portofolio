"use client";

import { useEffect, useState } from "react";

/**
 * Melacak section yang sedang berada di tengah viewport.
 * Dipakai oleh navbar dan indikator dot agar keduanya selalu sinkron.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-42% 0px -48% 0px",
        threshold: [0, 0.05, 0.25, 0.5, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** True setelah halaman discroll melewati ambang tertentu. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
