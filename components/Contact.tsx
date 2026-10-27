import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import Reveal from "./Reveal";

const contactInfo = [
  {
    Icon: MailIcon,
    label: "Email",
    value: "aryasirega23@gmail.com",
    href: "mailto:aryasirega23@gmail.com",
  },
  {
    Icon: PhoneIcon,
    label: "Telepon",
    value: "+62 89674216844",
    href: "tel:+6289674216844",
  },
  {
    Icon: MapPinIcon,
    label: "Lokasi",
    value: "Batam, Kepulauan Riau, Indonesia",
    href: undefined,
  },
];

const socials = [
  { href: "https://github.com", label: "GitHub", Icon: GithubIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
];

export default function Contact() {
  return (
    <section id="kontak" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
<p className="font-mono text-sm text-indigo-600"># kontak</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Mari <span className="text-indigo-600">Berkolaborasi</span>
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-zinc-600">
            Punya proyek menarik, tugas kuliah, atau sekadar ingin bertukar ide
            seputar teknologi? Jangan ragu untuk menghubungi saya. Saya selalu
            terbuka untuk kesempatan baru.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="left">
            <div className="flex flex-col gap-4">
            {contactInfo.map(({ Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-zinc-500">{label}</span>
                    <span className="mt-0.5 block font-medium text-zinc-800">
                      {value}
                    </span>
                  </span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-colors hover:border-indigo-400"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
                >
                  {content}
                </div>
              );
            })}

            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-zinc-500">Media sosial:</span>
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
          </div>
          </Reveal>

          <Reveal direction="right">
          <form className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nama"
                  className="text-sm font-medium text-zinc-700"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Nama kamu"
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@contoh.com"
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="pesan"
                className="text-sm font-medium text-zinc-700"
              >
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                placeholder="Tulis pesan kamu di sini..."
                className="resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110"
            >
              Kirim Pesan
            </button>
            <p className="text-center text-xs text-zinc-500">
              Form ini menampilkan pesan melalui email kamu.
            </p>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
