import Reveal from "./Reveal";

const education = [
  {
    period: "2023 — Sekarang",
    title: "D4 Teknologi Rekayasa Perangkat Lunak (TRPL)",
    institution: "Politeknik Negeri Batam",
    desc: "Menempuh pendidikan tinggi di bidang rekayasa perangkat lunak. Mempelajari rekayasa kebutuhan, perancangan sistem, pemrograman web & mobile, basis data, hingga manajemen proyek perangkat lunak.",
    tags: ["Rekayasa Perangkat Lunak", "Web", "Mobile", "Basis Data"],
    current: true,
  },
  {
    period: "2021 — 2024",
    title: "SMA — Jurusan Ilmu Pengetahuan Sosial (IPS)",
    institution: "SMAN 8 Batam",
    desc: "Menempuh pendidikan menengah atas jurusan IPS. Aktif mengikuti organisasi dan kegiatan sekolah yang mengasah kerja sama tim, komunikasi, dan disiplin diri.",
    tags: ["IPS", "Organisasi", "SMAN 8 Batam"],
    current: false,
  },
];

export default function Education() {
  return (
    <section id="pendidikan" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-sm text-indigo-600"># pendidikan</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Riwayat <span className="text-indigo-600">Pendidikan</span>
          </h2>
        </Reveal>

        <div className="relative mt-12 border-l border-zinc-200 pl-8 sm:pl-12">
          {education.map((item, i) => (
            <Reveal key={item.title} delay={i * 200} className="last:pb-0">
              <article className="relative pb-12">
              <span
                className={`absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 sm:-left-[57px] ${
                  item.current
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {item.current && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                )}
              </span>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-indigo-400">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-indigo-600">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                      Sedang berjalan
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-zinc-600">
                  {item.institution}
                </p>
                <p className="mt-3 leading-7 text-zinc-600">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-200/70 px-3 py-1 text-xs text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
