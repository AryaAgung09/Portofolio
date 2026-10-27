import { ArrowUpRightIcon, FileCodeIcon } from "./icons";
import Reveal from "./Reveal";

const projects = [
  {
    title: "Sistem Manajemen Inventaris",
    desc: "Aplikasi web untuk mengelola stok barang dengan fitur CRUD, laporan, dan role admin/staff. Dibangun untuk tugas praktik mata kuliah.",
    tech: ["Laravel", "MySQL", "Tailwind CSS"],
    accent: "from-indigo-500 to-blue-500",
  },
  {
    title: "Website UMKM Desa",
    desc: "Platform promosi produk UMKM desa lengkap dengan katalog, keranjang, dan sistem pesan sederhana untuk mendukung program MBKM.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    accent: "from-violet-500 to-purple-500",
  },
  {
    title: "Aplikasi Absensi Mahasiswa",
    desc: "Aplikasi mobile pencatatan kehadiran mahasiswa berbasis QR code dengan sinkronisasi data real-time ke dashboard dosen.",
    tech: ["Flutter", "Firebase"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Portofolio Digital",
    desc: "Website portofolio pribadi dengan desain modern, responsive, dan optimasi performa. Menerapkan SEO dasar dan best practice.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "API Rest Perpustakaan",
    desc: "Backend REST API untuk sistem perpustakaan dengan autentikasi JWT, dokumentasi API, dan pengelolaan data buku serta peminjaman.",
    tech: ["Node.js", "Express", "MongoDB"],
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Dashboard Monitoring IoT",
    desc: "Dashboard visualisasi data sensor suhu dan kelembaban secara real-time menggunakan WebSocket untuk proyek riset kampus.",
    tech: ["React", "Chart.js", "WebSocket"],
    accent: "from-rose-500 to-pink-500",
  },
];

export default function Projects() {
  return (
    <section id="proyek" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-sm text-indigo-600"># proyek</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Proyek <span className="text-indigo-600">Pilihan</span>
              </h2>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-indigo-600"
            >
              <FileCodeIcon className="h-4 w-4" />
              Lihat semua di GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 140} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10">
                <div
                  className={`flex h-32 items-center justify-center bg-gradient-to-br ${project.accent} opacity-90 transition-opacity group-hover:opacity-100`}
                >
                  <FileCodeIcon className="h-12 w-12 text-white/90" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {project.title}
                    </h3>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Lihat proyek ${project.title}`}
                      className="shrink-0 text-zinc-500 transition-colors group-hover:text-indigo-600"
                    >
                      <ArrowUpRightIcon className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-700"
                      >
                        {tech}
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
