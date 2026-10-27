"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#pendidikan", label: "Pendidikan" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#beranda"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
            AA
          </span>
<span className="hidden sm:inline">
              Arya Agung<span className="text-indigo-600">.</span>
            </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-zinc-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#kontak"
          className="hidden rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400 md:inline-block"
        >
          Hubungi Saya
        </a>

        <button
          type="button"
          aria-label="Buka menu"
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white/95 px-6 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1 text-sm text-zinc-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
