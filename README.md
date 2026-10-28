# Arya Agung — Portofolio

Portofolio pribadi untuk **Arya Agung Setiawan**, mahasiswa D4 Teknologi Rekayasa Perangkat Lunak di Politeknik Negeri Batam. Dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS v4.

Tema gelap sebagai default, aksen lime, tipografi Space Grotesk + JetBrains Mono. Seluruh konten pribadi berada di satu file: `data/portfolio.ts`.

---

## Fitur

- **Scrollytelling** — scroll progress bar, indikator section, reveal per elemen, dan parallax.
- **Hero** — nama dengan reveal per kata, typewriter peran, latar grid + aurora bergerak, potret dalam kartu yang terangkat keluar bingkai saat kursor mendekat (tilt 3D + cahaya mengikuti pointer).
- **Tentang** — narasi, kartu identitas, statistik dengan count-up.
- **Keahlian** — grid ikon interaktif per kategori, filter, spotlight mengikuti kursor, panel detail saat ikon dipilih, dan slot “terus bertambah” yang mengisi baris terakhir (tanpa persentase).
- **Soft skills** — daftar dengan ikon dan deskripsi singkat.
- **Proyek** — filter animasi, kartu dengan tilt/hover, thumbnail mini-UI yang digambar CSS, modal detail aksesibel (`<dialog>` native).
- **Pendidikan** — timeline dengan garis yang digambar progresif (GSAP ScrollTrigger), panel tahun aktif, parallax dekorasi.
- **Kontak** — panel lime, form dengan validasi, loading, sukses/gagal, honeypot, dan API route siap Resend.
- **Tema** — dark/light via `next-themes`, tanpa flash (script blocking).
- **Aksesibilitas** — semantic HTML, skip link, focus ring, `aria-*`, dialog native, dan `prefers-reduced-motion`.
- **SEO** — metadata, Open Graph image dinamis, Twitter card, JSON-LD Person, robots, sitemap, manifest, favicon SVG.

---

## Stack

| Bagian      | Tools                                                        |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router), React 19, TypeScript                 |
| Styling     | Tailwind CSS v4, CSS variables                                |
| Animasi     | Framer Motion, GSAP + ScrollTrigger, Lenis                    |
| Ikon        | lucide-react, react-icons                                     |
| Tema        | next-themes                                                   |
| Gambar      | next/image                                                    |
| Email       | Resend (opsional) via Route Handler                           |

---

## Mulai cepat

Prasyarat: **Node.js 20+** dan npm.

```bash
# 1. Install dependensi
npm install

# 2. Salin variabel lingkungan (opsional; form tetap jalan di mode demo)
# macOS/Linux
cp .env.example .env.local
# Windows PowerShell
Copy-Item .env.example .env.local

# 3. Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Scripts

| Perintah            | Fungsi                          |
| ------------------- | ------------------------------- |
| `npm run dev`       | Server pengembangan (Turbopack) |
| `npm run build`     | Build produksi                  |
| `npm run start`     | Jalankan hasil build            |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript tanpa emit           |

---

## Struktur folder

```text
.
├─ app/
│  ├─ api/contact/route.ts      # Validasi + Resend / mode demo
│  ├─ icon.svg                  # Favicon
│  ├─ layout.tsx                # Font, metadata, provider, skip link
│  ├─ manifest.ts               # Web app manifest
│  ├─ not-found.tsx             # Halaman 404
│  ├─ opengraph-image.tsx       # OG image 1200×630 (generated)
│  ├─ page.tsx                  # Komposisi seluruh section + JSON-LD
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ layout/
│  │  ├─ Footer.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ ScrollProgress.tsx
│  │  └─ SectionIndicator.tsx
│  ├─ projects/
│  │  ├─ ProjectArtwork.tsx     # Thumbnail mini-UI berbasis CSS
│  │  ├─ ProjectCard.tsx
│  │  └─ ProjectModal.tsx
│  ├─ providers/
│  │  └─ Providers.tsx          # Tema, MotionConfig, Lenis + GSAP
│  ├─ sections/
│  │  ├─ About.tsx
│  │  ├─ Contact.tsx
│  │  ├─ Education.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Skills.tsx
│  │  ├─ SoftSkills.tsx
│  │  └─ hero/
│  │     ├─ HeroPortrait.tsx
│  │     └─ Typewriter.tsx
│  └─ ui/
│     ├─ AnimatedCounter.tsx
│     ├─ LocalTime.tsx
│     ├─ Marquee.tsx
│     ├─ Reveal.tsx
│     ├─ SectionHeading.tsx
│     ├─ SocialLinks.tsx
│     ├─ TechIcon.tsx
│     └─ ThemeToggle.tsx
├─ data/
│  └─ portfolio.ts              # ⭐ Satu-satunya sumber konten
├─ lib/
│  ├─ hooks.ts                  # useActiveSection, useScrolled
│  ├─ motion.ts                 # easing & varian animasi
│  └─ utils.ts                  # cn, formatDecimal, currentYear
├─ public/
│  └─ images/profile/
│     └─ arya-agung.jpg
├─ styles/
│  └─ globals.css               # Token tema, utilitas, keyframes
├─ .env.example
├─ next.config.ts
└─ package.json
```

---

## Kustomisasi

### 1. Data diri

Buka `data/portfolio.ts`. Semua yang tampil di halaman berasal dari sini:

| Export             | Isi                                                     |
| ------------------ | ------------------------------------------------------- |
| `profile`          | Nama, peran, bio, email, telepon, lokasi, foto, kampus, IPK |
| `stats`            | Angka statistik di section Tentang                      |
| `socials`          | GitHub, LinkedIn, Instagram, email                      |
| `navigation`       | Label & urutan menu                                     |
| `skills`           | Nama, ikon, kategori, catatan, warna brand              |
| `familiarTools`    | Chip tools tambahan                                     |
| `softSkills`       | Judul, deskripsi, ikon                                  |
| `projects`         | Studi kasus lengkap                                     |
| `timeline`         | Pendidikan, pengalaman, organisasi, sertifikasi         |
| `site`             | URL, judul, deskripsi, keyword, handle Twitter          |

> Semua field punya komentar. Ganti teks placeholder dengan pencapaian asli sebelum dipublikasikan.

### 2. Foto

1. Siapkan foto **cutout** (latar transparan, PNG/WebP) di `public/images/profile/`. Foto saat ini: `arya-agung-cutout.webp` (534×923 px).
2. Jika nama file berbeda, ubah `profile.photo`, lalu sesuaikan `profile.photoWidth` dan `profile.photoHeight` dengan dimensi aslinya agar rasio kartu tidak bergeser.
3. Perbarui `profile.photoAlt` menjadi deskripsi foto yang sebenarnya (penting untuk screen reader).
4. Untuk screenshot proyek asli, letakkan di `public/images/projects/` lalu isi field `image` pada proyek terkait. Jika kosong, thumbnail mini-UI CSS yang dipakai.

### 3. Warna tema

Semua warna ada di `styles/globals.css`:

```css
:root {
  --background: #f2f0e9;   /* mode terang */
  --foreground: #0b0d0f;
  --accent: #c6f24e;       /* aksen utama */
  /* ... */
}

.dark {
  --background: #08090b;   /* mode gelap (default) */
  --foreground: #f2f3ee;
  --accent: #c6f24e;
  /* ... */
}
```

Mengganti `--accent` akan mengubah tombol, garis timeline, indikator section, dan highlight secara otomatis. Untuk aksen terang, pertahankan `--accent-foreground` gelap agar teks di atas tombol tetap kontras.

Nama font juga dipetakan di `@theme inline` (`--font-sans`, `--font-mono`).

### 4. Tipografi

Font diatur di `app/layout.tsx` dengan `next/font/google`:

```ts
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
```

Ganti import & variabelnya, lalu sesuaikan `--font-sans` / `--font-mono` di `styles/globals.css`.

### 5. Navigasi & section

- Tambah/hapus menu di `navigation` (`data/portfolio.ts`). ID harus sama dengan `id` pada elemen `<section>`.
- Komposisi section diatur di `app/page.tsx`.
- Indikator dot di kanan dan navbar membaca `navigation` secara otomatis.

### 6. Ikon teknologi

`components/ui/TechIcon.tsx` memetakan string `icon` dari data ke ikon Simple Icons. Untuk teknologi baru, import ikonnya dari `react-icons/si` dan tambahkan ke objek `techIcons`.

### 7. Domain & SEO

Sebelum deploy, ubah `site.url` di `data/portfolio.ts` menjadi domain final (mis. `https://aryaagung.dev`). Nilai ini dipakai untuk `metadataBase`, canonical, sitemap, robots, dan JSON-LD. OG image dibuat otomatis oleh `app/opengraph-image.tsx`.

---

## Form kontak

Form mengirim `POST /api/contact` dengan validasi server-side, honeypot anti-bot, dan rate limit sederhana (5 pesan / 10 menit / IP).

### Mode demo (default)

Tanpa variabel lingkungan, pesan divalidasi lalu dibalas sukses dengan penanda `demo: true`. UI menampilkan catatan bahwa email belum benar-benar terkirim. Cocok untuk mencoba alur tanpa akun layanan email.

### Mengaktifkan Resend

1. Buat akun di [resend.com](https://resend.com) dan verifikasi domain pengirim.
2. Buat API key.
3. Isi `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=aryasirega23@gmail.com
CONTACT_FROM_EMAIL="Portofolio Arya <halo@domainkamu.com>"
```

4. Restart `npm run dev` (atau redeploy di Vercel).

`CONTACT_FROM_EMAIL` harus memakai domain yang sudah diverifikasi di Resend. Untuk produksi dengan trafik tinggi, ganti rate limit in-memory di `app/api/contact/route.ts` dengan Upstash Redis atau Vercel KV.

Alternatif tanpa backend: ganti handler `handleSubmit` di `components/sections/Contact.tsx` untuk memanggil endpoint Formspree.

---

## Deploy ke Vercel

### Via dashboard

1. Push repo ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new), import repo.
3. Framework terdeteksi otomatis (Next.js). Tidak perlu mengubah build command.
4. Tambahkan environment variables (opsional): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
5. Deploy, lalu tambahkan domain kustom bila ada dan perbarui `site.url`.

### Via CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

---

## Aksesibilitas & performa

- `prefers-reduced-motion` dimatikan otomatis lewat `MotionConfig` dan media query CSS; tanpa JavaScript konten tetap terlihat.
- Modal proyek memakai `<dialog>` native (focus trap, Escape, backdrop).
- Semua gambar lewat `next/image`; foto hero memakai `loading="eager"` + `fetchPriority="high"`, sisanya lazy.
- Font di-self-host oleh `next/font` sehingga tidak ada request ke Google Fonts saat runtime.
- Form memiliki label, `aria-invalid`, `aria-describedby`, dan live region untuk status.
- Jalankan Lighthouse pada build produksi (`npm run build && npm run start`) untuk hasil paling akurat.

---

## Kredit

Dirancang dan dibangun sebagai portofolio pribadi. Konten proyek di `data/portfolio.ts` adalah placeholder realistis—ganti dengan proyek dan tautan asli sebelum dipublikasikan.
