import {
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Radio,
} from "lucide-react";
import { navigation, profile } from "@/data/portfolio";
import LocalTime from "@/components/ui/LocalTime";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.5fr_0.6fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Mari terhubung
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-4 inline-flex items-center gap-2 text-xl font-medium tracking-tight text-foreground transition-colors hover:text-accent-ink sm:text-2xl"
            >
              {profile.email}
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <p className="mt-4 hidden max-w-sm text-sm leading-6 text-muted md:block">
              Terbuka untuk magang, proyek freelance kecil, atau sekadar
              bertukar pikiran soal produk dan teknologi.
            </p>
            <SocialLinks
              className="mt-4 md:mt-6"
              size="sm"
              icons={["linkedin", "github"]}
            />
          </div>

          <nav
            aria-label="Tautan cepat"
            className="hidden md:block"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted-strong transition-colors hover:text-accent-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Lokasi & waktu
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-strong">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
                <span>
                  {profile.location}
                  <br />
                  <span className="text-muted">GMT+7</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Radio className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
                <span>
                  Sekarang <LocalTime timeZone={profile.timeZone} />
                </span>
              </li>
            </ul>

            <a
              href="#kontak"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-strong transition-colors hover:border-accent/60 hover:text-accent-ink"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </a>
          </div>
        </div>

        <div className="mt-16 select-none overflow-hidden border-t border-border pt-8 sm:mt-20">
          <p
            aria-hidden
            className="text-outline whitespace-nowrap text-[12.5vw] font-semibold leading-[0.78] tracking-[-0.065em]"
          >
            ARYA AGUNG
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#beranda"
            className="group inline-flex items-center gap-2 font-medium text-muted-strong transition-colors hover:text-accent-ink"
          >
            Kembali ke atas
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
