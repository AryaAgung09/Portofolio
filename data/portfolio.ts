/**
 * ============================================================================
 *  DATA PORTOFOLIO
 * ============================================================================
 *  Semua konten pribadi ada di file ini. Komponen UI hanya membaca dari sini,
 *  jadi kamu bisa mengganti data diri, proyek, dan riwayat tanpa menyentuh
 *  kode komponen.
 *
 *  Cara cepat:
 *  1. Ganti `profile`, `socials`, dan `stats`.
 *  2. Ganti `skills`, `softSkills`, `projects`, dan `timeline`.
 *  3. Simpan foto cutout (PNG/WebP transparan) di /public/images/profile/
 *     lalu sesuaikan `profile.photo`, `photoWidth`, dan `photoHeight`.
 *
 *  Catatan: teks dan tautan proyek di bawah adalah placeholder realistis.
 *  Ganti dengan pencapaian dan tautan asli sebelum dipublikasikan.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Tipe data                                                                  */
/* -------------------------------------------------------------------------- */

/** ID section yang dipakai untuk anchor, navbar, dan indikator scroll. */
export type SectionId =
  | "beranda"
  | "tentang"
  | "keahlian"
  | "proyek"
  | "pendidikan"
  | "kontak";

export interface NavItem {
  /** ID section tanpa tanda #. */
  id: SectionId;
  /** Label yang tampil di navbar. */
  label: string;
}

export interface SocialLink {
  /** Nama platform, juga dipakai sebagai aria-label. */
  label: string;
  /** URL lengkap. Gunakan mailto: untuk email. */
  href: string;
  /** Kunci ikon. Lihat components/ui/TechIcon.tsx dan SocialLinks.tsx. */
  icon: "github" | "linkedin" | "instagram" | "mail";
}



export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  /** Nama teknologi. */
  name: string;
  /** Kunci ikon Simple Icons (react-icons/si). */
  icon: string;
  /** Kategori untuk pengelompokan kartu. */
  category: SkillCategory;
  /** Satu frasa tentang apa yang biasanya kamu kerjakan dengannya. */
  note: string;
  /** Warna brand ikon (opsional; kosongkan untuk ikon monokrom). */
  color?: string;
}

export interface SoftSkill {
  /** Judul singkat. */
  title: string;
  /** Satu kalimat penjelasan. */
  description: string;
  /** Kunci ikon Lucide. Lihat components/sections/SoftSkills.tsx. */
  icon: "message" | "users" | "puzzle" | "clock" | "compass" | "refresh";
}

export type ProjectCategory = "Web App" | "Mobile" | "Backend";

/** Jenis visual thumbnail yang digambar dengan CSS (tanpa aset gambar). */
export type ArtworkKind =
  | "dashboard"
  | "pos"
  | "mobile"
  | "api"
  | "map"
  | "portfolio";

export interface Project {
  /** Slug unik; dipakai sebagai key dan untuk analitik. */
  slug: string;
  /** Nama proyek. */
  title: string;
  /** Kalimat pendek yang tampil di kartu. */
  tagline: string;
  /** Deskripsi lengkap untuk modal detail. */
  description: string;
  /** Kategori untuk filter. */
  category: ProjectCategory;
  /** Tahun pengerjaan. */
  year: string;
  /** Peranmu dalam proyek ini. */
  role: string;
  /** Status proyek. */
  status: "Selesai" | "Dalam pengembangan";
  /** Teknologi yang digunakan. */
  tags: string[];
  /** URL demo langsung (opsional). */
  demoUrl?: string;
  /** URL repositori (opsional). */
  repoUrl?: string;
  /**
   * Path screenshot asli di /public/images/projects/ (opsional).
   * Jika diisi, kartu memakai next/image. Jika kosong, dipakai artwork CSS.
   */
  image?: string;
  /** Konfigurasi artwork pengganti screenshot. */
  artwork: {
    kind: ArtworkKind;
    /** Warna aksen khas proyek (hex). */
    accent: string;
    /** Label kecil di artwork, misalnya nama domain. */
    url: string;
  };
  /** Angka-angka penting yang tampil di modal. */
  metrics: { label: string; value: string }[];
  /** Poin-poin kontribusi / fitur utama. */
  highlights: string[];
  /** Tandai satu proyek sebagai unggulan (kartu lebih besar). */
  featured?: boolean;
}

export type TimelineType = "Pendidikan" | "Pengalaman" | "Organisasi" | "Sertifikasi";

export interface TimelineItem {
  /** Kategori untuk badge dan warna. */
  type: TimelineType;
  /** Tahun untuk panel besar di sisi kiri (mis. "2025"). */
  year: string;
  /** Rentang waktu yang tampil, mis. "2023 — Sekarang". */
  period: string;
  /** Judul posisi / program studi. */
  title: string;
  /** Institusi / perusahaan / penyelenggara. */
  organization: string;
  /** Kota atau mode (Online). */
  location: string;
  /** Deskripsi singkat. */
  description: string;
  /** Pencapaian atau detail tambahan. */
  highlights?: string[];
  /** Tag kecil di bagian bawah kartu. */
  tags: string[];
  /** Tandai entri yang masih berjalan. */
  current?: boolean;
  /** URL sertifikat / kredensial (opsional). */
  credentialUrl?: string;
}

/* -------------------------------------------------------------------------- */
/*  Profil                                                                     */
/* -------------------------------------------------------------------------- */

export const profile = {
  /** Nama lengkap. */
  name: "Arya Agung Setiawan",
  /** Nama pendek untuk sapaan. */
  shortName: "Arya",
  /** Inisial untuk logo. */
  initials: "AA",
  /** Peran yang diketik bergantian di hero. */
  roles: [
    "Software Enginner",
    "Full-stack Developer",
    "Computer Science Student",
    
  ],
  /** Kalimat utama di hero (satu baris pendukung). */
  headline:
    "Saya membangun aplikasi web yang rapi di balik layar dan nyaman dipakai di depan layar.",
  /** Deskripsi pendek di hero. */
  intro:
    "Mahasiswa Teknologi Rekayasa Perangkat Lunak (TRPL), Jurusan Teknik Informatika di Politeknik Negeri Batam yang memiliki minat dalam pengembangan aplikasi web dan mobile  Berpengalaman mengerjakan berbagai proyek  selama perkuliahan serta terbiasa menghadapi dan menyelesaikan permasalahan teknis pada komputer dan pengembangan sistem. Memiliki kemampuan problem solving yang baik, cepat belajar, dan selalu bersemangat untuk mempelajari hal-hal baru di bidang teknologi",
  /** Paragraf untuk section Tentang. */
  bio: [
    "Ketertarikan saya terhadap dunia teknologi berawal dari rasa ingin tahu tentang bagaimana sebuah ide dapat diwujudkan menjadi produk digital yang benar-benar bermanfaat. Dari sana, saya terus belajar untuk tidak hanya membuat aplikasi yang berfungsi, tetapi juga membangun sistem yang terstruktur, efisien, dan mudah dikembangkan.",
    
    "Selain kemampuan teknis di bidang pengembangan perangkat lunak, saya juga memiliki keterampilan dalam administrasi dan pengelolaan dokumen. Saya terbiasa menyusun, mengatur, dan mengelola berbagai dokumen akademik serta menggunakan Microsoft Word untuk pengolahan dokumen dan Microsoft Excel untuk pengolahan data, tabel, dan kebutuhan administrasi. Saya juga mampu menggunakan berbagai perangkat lunak pendukung kegiatan perkuliahan dan penyusunan tugas akademik.",
  ],
  /** Status ketersediaan yang tampil di hero dan kontak. */
  availability: "Terbuka untuk magang & kolaborasi",
  /** Kota untuk info kontak. */
  location: "Batam, Kepulauan Riau",
  /** Versi pendek lokasi. */
  locationShort: "Batam, ID",
  /** Zona waktu untuk jam lokal di footer. */
  timeZone: "Asia/Jakarta",
  /** Email utama. */
  email: "aryaagungsiregar23@gmail.com",
  /** Nomor telepon (tampilan). */
  phone: "+62 896-7421-6844",
  /** Nomor telepon untuk tautan tel:. */
  phoneHref: "tel:+6289674216844",
  /** Foto profil cutout (latar transparan) di folder public. */
  photo: "/images/profile/arya-agung-cutout.webp",
  /** Lebar asli foto—dipakai agar rasio potret tidak bergeser. */
  photoWidth: 534,
  /** Tinggi asli foto. */
  photoHeight: 923,
  /** Alt text foto—jelaskan siapa dan konteksnya. */
  photoAlt:
    "Potret Arya Agung Setiawan mengenakan jaket almamater navy",
  /** Kampus. */
  university: "Politeknik Negeri Batam",
  /** Program studi. */
  major: "D4 Teknologi Rekayasa Perangkat Lunak",
  /** Tahun angkatan. */
  batch: "Angkatan 2023",
  /** IPK saat ini (string agar format desimal tetap). */
  gpa: "3.72",
  /** Hal yang sedang dipelajari—tampil di kartu Tentang. */
  learning: ["System design", "Testing", "Design systems"],
  /** Prinsip kerja singkat. */
  principles: [
    "Sederhana dulu, baru cerdas.",
    "Aksesibel secara default.",
    "Ukur, jangan menebak.",
  ],
} as const;

export interface Stat {
  /** Angka yang dianimasikan naik. */
  value: number;
  /** Jumlah angka di belakang koma (opsional). */
  decimals?: number;
  /** Akhiran, mis. "+". */
  suffix?: string;
  /** Label utama. */
  label: string;
  /** Keterangan kecil di bawah label (opsional). */
  note?: string;
}

/** Statistik yang dihitung naik di section Tentang. */
export const stats: Stat[] = [];

/** Tautan sosial. Ganti href dengan akunmu. */
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/AryaAgung09", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arya-agung-3867b8421/", icon: "linkedin" },
  { label: "Email", href: "mailto:aryaagungsiregar23@gmail.com", icon: "mail" },
];

/** Navigasi utama. Urutan di sini menentukan urutan navbar. */
export const navigation: NavItem[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "keahlian", label: "Keahlian" },
  { id: "proyek", label: "Proyek" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "kontak", label: "Kontak" },
];

/* -------------------------------------------------------------------------- */
/*  Keahlian                                                                   */
/* -------------------------------------------------------------------------- */

export const skills: Skill[] = [
  // Frontend
  { name: "HTML & CSS", icon: "html5", category: "Frontend", note: "Semantik, layout, dan animasi", color: "#E34F26" },
  { name: "JavaScript", icon: "javascript", category: "Frontend", note: "ES2024, DOM, async patterns", color: "#F7DF1E" },
  { name: "TypeScript", icon: "typescript", category: "Frontend", note: "Type-safe app & API contracts", color: "#3178C6" },
  { name: "React", icon: "react", category: "Frontend", note: "Komponen, hooks, state", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs", category: "Frontend", note: "App Router, SSR, optimasi" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend", note: "Design system & responsif", color: "#06B6D4" },

  // Backend
  { name: "Laravel", icon: "laravel", category: "Backend", note: "REST API, Eloquent, queue", color: "#FF2D20" },
  { name: "PHP", icon: "php", category: "Backend", note: "OOP, PSR, kompatibilitas", color: "#777BB4" },
  { name: "Node.js", icon: "node", category: "Backend", note: "Service, scripting, tooling", color: "#5FA04E" },
  { name: "Express", icon: "express", category: "Backend", note: "Routing, middleware, auth" },
  { name: "Python", icon: "python", category: "Backend", note: "Scripting & analisis data", color: "#3776AB" },
  { name: "REST API", icon: "rest", category: "Backend", note: "Desain endpoint & validasi" },

  // Database
  { name: "MySQL", icon: "mysql", category: "Database", note: "Relasi, index, query tuning", color: "#4479A1" },
  { name: "PostgreSQL", icon: "postgresql", category: "Database", note: "Skema relasional & JSONB", color: "#4169E1" },
  { name: "Prisma", icon: "prisma", category: "Database", note: "Type-safe ORM & migrasi" },
  { name: "MongoDB", icon: "mongodb", category: "Database", note: "Dokumen & agregasi", color: "#47A248" },

  // Tools
  { name: "Git & GitHub", icon: "git", category: "Tools", note: "Branching, review, CI dasar", color: "#F05032" },
  { name: "Docker", icon: "docker", category: "Tools", note: "Container untuk development", color: "#2496ED" },
  { name: "Figma", icon: "figma", category: "Tools", note: "Wireframe & handoff desain", color: "#F24E1E" },
  { name: "Vercel", icon: "vercel", category: "Tools", note: "Deploy, preview, analytics" },
  { name: "Linux", icon: "linux", category: "Tools", note: "CLI, server, permission", color: "#FCC624" },
];

/** Teknologi tambahan yang belum masuk daftar utama. */
export const familiarTools = [
  "Flutter",
  "Firebase",
  "Supabase",
  "Alpine.js",
  "Framer Motion",
  "GSAP",
  "Postman",
  "GitHub Actions",
];

/** Soft skills dan satu kalimat penjelasnya. */
export const softSkills: SoftSkill[] = [
  {
    title: "Komunikasi",
    description: "Menyampaikan ide rumit dengan bahasa yang bisa dipahami semua orang.",
    icon: "message",
  },
  {
    title: "Kolaborasi",
    description: "Nyaman bekerja lintas peran, dari desainer sampai backend.",
    icon: "users",
  },
  {
    title: "Problem solving",
    description: "Memecah masalah besar menjadi langkah kecil yang bisa diuji.",
    icon: "puzzle",
  },
  {
    title: "Manajemen waktu",
    description: "Menjaga scope tetap realistis tanpa mengorbankan kualitas.",
    icon: "clock",
  },
  {
    title: "Kepemimpinan",
    description: "Mengambil inisiatif, memberi arah, dan tetap membuka diskusi.",
    icon: "compass",
  },
  {
    title: "Adaptabilitas",
    description: "Cepat menyesuaikan diri dengan tools, kebutuhan, dan ritme tim baru.",
    icon: "refresh",
  },
];

/* -------------------------------------------------------------------------- */
/*  Proyek                                                                     */
/* -------------------------------------------------------------------------- */

/** Opsi filter. "Semua" selalu tersedia. */
export const projectCategories = ["Semua", "Web App", "Mobile", "Backend"] as const;
export type ProjectFilter = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    slug: "ruangbaca",
    title: "RuangBaca",
    tagline: "Perpustakaan digital yang membuat peminjaman buku terasa seperti checkout.",
    description:
      "Platform perpustakaan digital untuk mengelola katalog, anggota, peminjaman, dan denda dalam satu dashboard. Saya merancang skema database relasional, REST API, serta antarmuka admin yang tetap responsif ketika menampilkan ribuan judul.",
    category: "Web App",
    year: "2025",
    role: "Full-stack Developer",
    status: "Selesai",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "dashboard", accent: "#C6F24E", url: "ruangbaca.app" },
    metrics: [
      { label: "Judul terkelola", value: "2.4k" },
      { label: "Waktu muat", value: "<1s" },
      { label: "Uptime", value: "99.9%" },
    ],
    highlights: [
      "Merancang 9 tabel relasional dan 24 endpoint REST dengan validasi berlapis.",
      "Membangun dashboard admin dengan pencarian, filter, dan pagination server-side.",
      "Menambahkan role-based access untuk admin, pustakawan, dan anggota.",
      "Menulis unit test untuk alur peminjaman dan perhitungan denda.",
    ],
    featured: true,
  },
  {
    slug: "kasirku",
    title: "KasirKu",
    tagline: "Point of sale ringan untuk UMKM yang tidak sempat belajar software rumit.",
    description:
      "Aplikasi kasir untuk warung dan kafe kecil: kelola produk, catat transaksi, cetak struk, dan lihat rekap harian. Fokus utamanya adalah alur tiga ketukan—pilih produk, bayar, selesai—agar tetap cepat saat antrean panjang.",
    category: "Web App",
    year: "2025",
    role: "Full-stack Developer",
    status: "Selesai",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "Alpine.js"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "pos", accent: "#7DD3FC", url: "kasirku.id" },
    metrics: [
      { label: "Transaksi / hari", value: "180+" },
      { label: "Error rate", value: "0.2%" },
      { label: "Setup", value: "<5 mnt" },
    ],
    highlights: [
      "Membangun alur transaksi cepat dengan dukungan keyboard dan barcode.",
      "Menyimpan rekap penjualan harian dan ekspor CSV tanpa spreadsheet tambahan.",
      "Menerapkan optimistic UI untuk keranjang agar terasa instan di perangkat lambat.",
    ],
  },
  {
    slug: "jejak",
    title: "Jejak",
    tagline: "Jurnal perjalanan yang mencatat tempat, bukan sekadar unggahan.",
    description:
      "Aplikasi mobile untuk mendokumentasikan perjalanan: pin lokasi, catatan singkat, foto, dan statistik jarak. Data disinkronkan ke cloud dan tetap bisa dibuka offline lewat cache lokal.",
    category: "Mobile",
    year: "2024",
    role: "Mobile Developer",
    status: "Selesai",
    tags: ["Flutter", "Firebase", "Google Maps", "Riverpod"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "mobile", accent: "#FCD34D", url: "jejak.app" },
    metrics: [
      { label: "Perjalanan", value: "120+" },
      { label: "Offline-first", value: "Ya" },
      { label: "Rilis", value: "v1.2" },
    ],
    highlights: [
      "Menerapkan offline-first dengan antrean sinkronisasi saat koneksi kembali.",
      "Mengintegrasikan peta, geocoding, dan penyimpanan foto terkompresi.",
      "Mendesain ulang alur tambah perjalanan dari 7 langkah menjadi 3.",
    ],
  },
  {
    slug: "sirkuit-api",
    title: "Sirkuit API",
    tagline: "REST API manajemen event dengan autentikasi dan dokumentasi yang jelas.",
    description:
      "Backend untuk platform event kampus: autentikasi JWT, manajemen peserta, tiket, dan notifikasi email. Dokumentasi OpenAPI dibuat sebagai kontrak agar tim frontend bisa bergerak paralel.",
    category: "Backend",
    year: "2024",
    role: "Backend Developer",
    status: "Selesai",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "OpenAPI"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "api", accent: "#F0ABFC", url: "api.sirkuit.dev" },
    metrics: [
      { label: "Endpoint", value: "31" },
      { label: "Latensi p95", value: "84ms" },
      { label: "Test coverage", value: "87%" },
    ],
    highlights: [
      "Mendesain autentikasi JWT dengan refresh token dan pemisahan role.",
      "Menulis dokumentasi OpenAPI yang dipakai langsung oleh tim frontend.",
      "Menambahkan rate limiting dan validasi payload untuk endpoint publik.",
    ],
  },
  {
    slug: "peta-umkm",
    title: "PetaUMKM",
    tagline: "Peta interaktif yang membantu warga menemukan UMKM di sekitar Batam.",
    description:
      "Direktori UMKM berbasis peta dengan kategori usaha, jam buka, dan tautan WhatsApp. Data dikurasi bersama komunitas, lalu ditampilkan dengan pencarian dan filter yang ramah pengguna.",
    category: "Web App",
    year: "2025",
    role: "Frontend Developer",
    status: "Dalam pengembangan",
    tags: ["React", "Leaflet", "Supabase", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "map", accent: "#5EEAD4", url: "petaumkm.id" },
    metrics: [
      { label: "Titik UMKM", value: "240" },
      { label: "Kategori", value: "12" },
      { label: "Kontributor", value: "18" },
    ],
    highlights: [
      "Membangun peta dengan clustering dan filter kategori yang responsif.",
      "Menyediakan formulir kontribusi data dengan moderasi sederhana.",
      "Mengoptimalkan render peta agar tetap mulus di perangkat mid-range.",
    ],
  },
  {
    slug: "portofolio-2026",
    title: "Portofolio 2026",
    tagline: "Situs yang sedang kamu baca—dirancang sebagai sistem, bukan satu halaman.",
    description:
      "Portofolio ini dibangun dengan Next.js App Router, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, dan Lenis. Semua konten dipisahkan ke satu file data, animasi menghormati prefers-reduced-motion, dan setiap section punya peran dalam alur cerita.",
    category: "Web App",
    year: "2026",
    role: "Designer & Developer",
    status: "Selesai",
    tags: ["Next.js", "TypeScript", "Framer Motion", "GSAP", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/",
    artwork: { kind: "portfolio", accent: "#C4B5FD", url: "aryaagung.dev" },
    metrics: [
      { label: "Lighthouse", value: "98" },
      { label: "Section", value: "9" },
      { label: "Dependency", value: "6" },
    ],
    highlights: [
      "Merancang design token dan mode gelap/terang dengan CSS variables.",
      "Menggabungkan animasi masuk per elemen, parallax, dan timeline yang digambar saat scroll.",
      "Menjaga konten tetap terbaca tanpa JavaScript dan menghormati reduced motion.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Pendidikan & pengalaman                                                    */
/* -------------------------------------------------------------------------- */

export const timeline: TimelineItem[] = [
  {
    type: "Pendidikan",
    year: "2023",
    period: "2023 — Sekarang",
    title: "D4 Teknologi Rekayasa Perangkat Lunak",
    organization: "Politeknik Negeri Batam",
    location: "Batam, Indonesia",
    description:
      "Mendalami rekayasa perangkat lunak dari hulu ke hilir: analisis kebutuhan, perancangan sistem, pemrograman web dan mobile, basis data, sampai manajemen proyek.",
    highlights: [
      "IPK saat ini 3.72 / 4.00.",
      "Fokus pada pengembangan web full-stack dan arsitektur backend.",
    ],
    tags: ["Software Engineering", "Web", "Database", "Project Management"],
    current: true,
  },
  {
    type: "Pengalaman",
    year: "2025",
    period: "2025 — Sekarang",
    title: "Asisten Laboratorium Pemrograman",
    organization: "Politeknik Negeri Batam",
    location: "Batam, Indonesia",
    description:
      "Mendampingi mahasiswa dalam praktikum pemrograman web dan basis data, mulai dari debugging hingga review struktur kode.",
    highlights: [
      "Membimbing 60+ mahasiswa per semester.",
      "Menyusun modul praktikum dan studi kasus yang dipakai lintas kelas.",
    ],
    tags: ["Teaching", "Web Development", "Mentoring"],
    current: true,
  },
  {
    type: "Pengalaman",
    year: "2024",
    period: "2024 — 2025",
    title: "Web Developer Intern",
    organization: "PT Digital Nusantara",
    location: "Batam, Indonesia",
    description:
      "Magang di tim produk digital, mengerjakan dashboard internal dan integrasi API untuk kebutuhan operasional perusahaan.",
    highlights: [
      "Memangkas waktu muat dashboard sekitar 40% lewat query tuning dan caching.",
      "Berkolaborasi dengan desainer dan tim operasional dalam siklus dua minggu.",
    ],
    tags: ["Laravel", "MySQL", "REST API", "Agile"],
  },
  {
    type: "Sertifikasi",
    year: "2024",
    period: "2024",
    title: "Belajar Pengembangan Web Intermediate",
    organization: "Dicoding Indonesia",
    location: "Online",
    description:
      "Kelas intensif tentang arsitektur aplikasi web, konsumsi API, testing, dan standar aksesibilitas.",
    tags: ["Web Fundamentals", "Testing", "Accessibility"],
    credentialUrl: "https://www.dicoding.com/",
  },
  {
    type: "Organisasi",
    year: "2023",
    period: "2023 — 2024",
    title: "Staff Divisi Media & Teknologi",
    organization: "Himpunan Mahasiswa TRPL",
    location: "Batam, Indonesia",
    description:
      "Mengelola situs dan media sosial himpunan, serta menjadi tim teknis untuk acara kampus.",
    highlights: [
      "Membangun ulang situs himpunan bersama tiga anggota tim.",
      "Menjadi dokumentator dan operator teknis di lima acara jurusan.",
    ],
    tags: ["Teamwork", "Leadership", "Web"],
  },
  {
    type: "Pendidikan",
    year: "2020",
    period: "2020 — 2023",
    title: "SMA — Ilmu Pengetahuan Sosial",
    organization: "SMA Negeri 8 Batam",
    location: "Batam, Indonesia",
    description:
      "Aktif dalam kegiatan organisasi sekolah dan kompetisi yang melatih komunikasi, riset, serta disiplin diri.",
    tags: ["IPS", "Organisasi", "Public Speaking"],
  },
];

/* -------------------------------------------------------------------------- */
/*  SEO                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Konfigurasi situs untuk metadata, OG image, sitemap, dan robots.
 * Ganti `url` dengan domain finalmu sebelum deploy.
 */
export const site = {
  url: "https://aryaagung.dev",
  title: "Arya Agung — Full-stack Developer & CS Student",
  description:
    "Portofolio Arya Agung Setiawan, mahasiswa Teknologi Rekayasa Perangkat Lunak di Politeknik Negeri Batam. Full-stack developer yang fokus pada TypeScript, Laravel, dan antarmuka web yang aksesibel.",
  keywords: [
    "Arya Agung",
    "portofolio developer",
    "full-stack developer Indonesia",
    "mahasiswa TRPL",
    "Next.js developer",
    "Laravel developer",
    "Politeknik Negeri Batam",
  ],
  locale: "id_ID",
  twitterHandle: "@aryagung",
} as const;
