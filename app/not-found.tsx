import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="grid-field absolute inset-0" />
      <div
        aria-hidden
        className="aurora absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
      />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          <Compass className="h-3 w-3 text-accent-ink" aria-hidden />
          Error 404
        </p>

        <h1 className="mt-6 text-[clamp(3.5rem,12vw,8rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-foreground">
          404<span className="text-accent">.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-muted">
          Halaman yang kamu cari tidak ada—mungkin sudah dipindahkan, atau URL-nya
          salah ketik.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            Kembali ke beranda
          </Link>
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink"
          >
            Lihat proyek
          </Link>
        </div>
      </div>
    </main>
  );
}
