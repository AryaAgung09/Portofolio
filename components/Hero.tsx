import { ArrowDownIcon, CodeIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";
import TechOrbit from "./TechOrbit";

const socials = [
  { href: "https://github.com", label: "GitHub", Icon: GithubIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
];

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.12), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-32 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="mb-4 font-mono text-sm text-indigo-600">
              Halo, perkenalkan saya
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Arya <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Agung Setiawan</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-xl font-medium text-zinc-800 sm:text-2xl">
              Mahasiswa Teknologi Rekayasa Perangkat Lunak (TRPL)
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 max-w-lg text-zinc-600">
              Saya seorang mahasiswa yang antusias mengembangkan aplikasi web dan
              mobile. Berfokus pada teknologi modern, code yang bersih, dan
              pengalaman pengguna yang baik.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#proyek"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110"
              >
                Lihat Proyek
              </a>
              <a
                href="#kontak"
                className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-800 transition-colors hover:border-indigo-500 hover:text-indigo-600"
              >
                Hubungi Saya
              </a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-sm text-zinc-500">Ikuti saya:</span>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all hover:border-indigo-500 hover:text-indigo-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Reveal direction="scale" delay={300}>
            <TechOrbit />
          </Reveal>
        </div>
      </div>

      <a
        href="#tentang"
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-indigo-500 hover:text-indigo-600"
      >
        <ArrowDownIcon className="h-5 w-5 animate-bounce" />
      </a>

      <CodeIcon className="pointer-events-none absolute -right-10 top-24 h-40 w-40 text-zinc-900/[0.04]" />
    </section>
  );
}
