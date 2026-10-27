import Reveal from "./Reveal";



export default function About() {
  return (
    <section id="tentang" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-sm text-indigo-600"># tentang-saya</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Kenalan Lebih <span className="text-indigo-600">Dekat</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal direction="left">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/40 to-violet-600/40 blur-xl" />
              <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-zinc-200 bg-white">
                <span className="bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-8xl font-bold text-transparent">
                  AA
                </span>
              </div>
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-emerald-600 shadow-xl">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                Tersedia untuk kolaborasi
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal direction="right">
<h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Halo, saya Arya Agung Setiawan
              </h3>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <p className="mt-4 leading-8 text-zinc-600">
                Saya adalah mahasiswa{" "}
                <span className="font-medium text-zinc-800">
                  Teknologi Rekayasa Perangkat Lunak (TRPL)
                </span>{" "}
                yang sedang menempuh pendidikan di jenjang Diploma 4. Saya tertarik
                pada pengembangan web dan mobile, serta senang belajar teknologi
                baru dan menerapkannya dalam proyek nyata.
              </p>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <p className="mt-4 leading-8 text-zinc-600">
                Bagi saya, menulis kode bukan sekadar membuat program berjalan —
                tapi tentang membangun solusi yang bermanfaat, mudah dirawat, dan
                nyaman digunakan oleh banyak orang. Saya aktif mengerjakan tugas
                perkuliahan, proyek pribadi, hingga kolaborasi tim untuk terus
                mengasah kemampuan.
              </p>
            </Reveal>

            
          </div>
        </div>
      </div>
    </section>
  );
}
