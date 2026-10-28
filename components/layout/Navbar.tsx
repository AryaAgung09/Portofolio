"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/data/portfolio";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const sectionIds = navigation.map((item) => item.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(16);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-border bg-background/75 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#beranda"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name} — kembali ke beranda`}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-accent text-[12px] font-bold tracking-tight text-accent-foreground transition-transform duration-300 group-hover:rotate-3">
            {profile.initials}
            <span
              aria-hidden
              className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-background"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-tight text-foreground">
              arya agung
            </span>
            <span className="mt-1 whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.22em] text-muted">
              software engineer
            </span>
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center md:flex">
          {navigation.map((item) => {
            const isActive = active === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[13px] transition-colors duration-200 lg:px-3.5",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#kontak"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 lg:inline-flex"
          >
            Mari bicara
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Navigasi mobile" className="px-5 pb-6 pt-2">
              <ul className="flex flex-col">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.3 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors",
                        active === item.id
                          ? "text-accent-ink"
                          : "text-foreground",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-muted">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#kontak"
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-between rounded-2xl bg-accent px-5 py-4 text-sm font-semibold text-accent-foreground"
              >
                Mulai percakapan
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>

              <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-muted">
                {profile.locationShort} · {profile.availability}
              </p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
