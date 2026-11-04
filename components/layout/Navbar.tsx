"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/data/portfolio";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.id);
const desktopNavigation = navigation.filter((item) =>
  ["beranda", "tentang", "keahlian", "proyek", "pendidikan", "kontak"].includes(
    item.id,
  ),
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navigasi utama"
        className="pointer-events-auto absolute left-1/2 top-[18px] hidden h-12 w-[min(600px,calc(100vw-32px))] -translate-x-1/2 items-center rounded-full border border-foreground/10 bg-background/15 px-1 py-1 backdrop-blur-2xl backdrop-saturate-150 md:flex"
      >
        {desktopNavigation.map((item) => {
          const isActive = active === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex h-9 flex-1 items-center justify-center rounded-full px-3 text-[13px] font-semibold transition-colors duration-200 focus-visible:z-10",
                isActive
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-strong hover:text-foreground",
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[-5px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-foreground shadow-[0_0_9px_rgba(11,13,15,0.45)] dark:shadow-[0_0_9px_rgba(255,255,255,0.8)]"
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="pointer-events-auto absolute right-4 top-4 flex items-center md:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mt-[68px] overflow-hidden border-y border-border bg-background md:hidden"
          >
            <nav aria-label="Navigasi mobile" className="px-5 pb-6 pt-2">
              <ul className="flex flex-col">
                {navigation.map((item, index) => {
                  const isActive = active === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        delay: 0.04 * index,
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex w-full items-center justify-between py-3.5 text-lg font-medium tracking-tight transition-colors",
                          isActive
                            ? "text-accent-ink"
                            : "text-foreground hover:text-accent-ink",
                        )}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <a
                href="#kontak"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("kontak");
                }}
                className="mt-4 flex items-center justify-between rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground"
              >
                Mulai percakapan
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>

              <p className="mt-4 text-sm leading-6 text-muted">
                {profile.locationShort} · {profile.availability}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
