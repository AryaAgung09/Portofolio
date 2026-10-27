import Reveal from "./Reveal";
import { BoxIcon, BrushIcon, CodeIcon, DatabaseIcon, LayersIcon, SparklesIcon } from "./icons";

const skills = [
  {
    name: "HTML & CSS",
    level: "Mahir",
    desc: "Semantik, layout responsif, animasi",
  },
  {
    name: "JavaScript / TypeScript",
    level: "Menengah",
    desc: "ES6+, DOM, async, type safety",
  },
  {
    name: "React / Next.js",
    level: "Menengah",
    desc: "SPA, SSR, komponen, hooks",
  },
  {
    name: "Tailwind CSS",
    level: "Mahir",
    desc: "Utility-first, desain cepat & konsisten",
  },
  {
    name: "PHP / Laravel",
    level: "Menengah",
    desc: "REST API, backend, database",
  },
  {
    name: "MySQL / PostgreSQL",
    level: "Menengah",
    desc: "Perancangan & query database",
  },
  {
    name: "Git & GitHub",
    level: "Menengah",
    desc: "Version control, kolaborasi tim",
  },
  {
    name: "Flutter",
    level: "Dasar",
    desc: "Aplikasi mobile lintas platform",
  },
];

const tools = [
  { name: "VS Code", Icon: CodeIcon },
  { name: "Figma", Icon: BrushIcon },
  { name: "Canva", Icon: SparklesIcon },
  { name: "Draw.io", Icon: BoxIcon },
  { name: "Docker (Dasar)", Icon: LayersIcon },
  { name: "Vercel", Icon: BoxIcon },
  { name: "laragon", Icon: DatabaseIcon },
  { name: "GitHub", Icon: BoxIcon },
];

const softSkills = [
  "Komunikasi",
  "Kerja Sama Tim",
  "Problem Solving",
  "Adaptif",
  "Manajemen Waktu",
  "Berpikir Kritis",
];

export default function Skills() {
  return (
    <section id="keahlian" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-sm text-indigo-600"># keahlian</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Keahlian & <span className="text-indigo-600">Teknologi</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 2) * 120}>
              <div className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-indigo-400">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-zinc-900">{skill.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      skill.level === "Mahir"
                        ? "bg-indigo-500/10 text-indigo-700"
                        : skill.level === "Menengah"
                          ? "bg-sky-500/10 text-sky-700"
                          : "bg-zinc-500/10 text-zinc-600"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-600">{skill.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12">
            <h3 className="font-mono text-sm text-zinc-600">
              Alat yang biasa saya pakai
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {tools.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-zinc-800">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10">
            <h3 className="font-mono text-sm text-zinc-600">Soft skill</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
