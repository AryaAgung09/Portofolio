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
 *  Data proyek ditautkan ke repositori GitHub publik pemilik portofolio.
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
  /** Kunci ikon teknologi dari components/ui/TechIcon.tsx. */
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
  | "repository"
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
  /** Label tautan demo, bila tujuannya bukan aplikasi langsung. */
  demoLabel?: string;
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
  /** Fakta proyek yang tampil di modal, bila tersedia. */
  metrics?: { label: string; value: string }[];
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
    "Saya memiliki ketertarikan dalam dunia teknologi dan selalu bersemangat mempelajari hal baru, mulai dari logika pemrograman hingga bagaimana sebuah karya dapat dinikmati oleh penggunanya.",
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
  { name: "JavaScript", icon: "javascript", category: "Frontend", note: "ES2024, DOM, async patterns", color: "#F7DF1E" },
  { name: "TypeScript", icon: "typescript", category: "Frontend", note: "Type-safe app & API contracts", color: "#3178C6" },
  { name: "React", icon: "react", category: "Frontend", note: "Komponen, hooks, state", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs", category: "Frontend", note: "App Router, SSR, optimasi" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend", note: "Design system & responsif", color: "#06B6D4" },
  { name: "Flutter", icon: "flutter", category: "Frontend", note: "Pengembangan aplikasi lintas platform", color: "#02569B" },

  // Backend
  { name: "Laravel", icon: "laravel", category: "Backend", note: "REST API, Eloquent, queue", color: "#FF2D20" },
  { name: "PHP", icon: "php", category: "Backend", note: "OOP, PSR, kompatibilitas", color: "#777BB4" },
  { name: "Node.js", icon: "node", category: "Backend", note: "Service, scripting, tooling", color: "#5FA04E" },
  { name: "Python", icon: "python", category: "Backend", note: "Scripting & analisis data", color: "#3776AB" },

  // Database
  { name: "MySQL", icon: "mysql", category: "Database", note: "Relasi, index, query tuning", color: "#4479A1" },
  { name: "Prisma", icon: "prisma", category: "Database", note: "Type-safe ORM & migrasi" },

  // Tools
  { name: "Git & GitHub", icon: "git", category: "Tools", note: "Branching, review, CI dasar", color: "#F05032" },
  { name: "Figma", icon: "figma", category: "Tools", note: "Wireframe & handoff desain", color: "#F24E1E" },
  { name: "Vercel", icon: "vercel", category: "Tools", note: "Deploy, preview, analytics" },
  { name: "Microsoft Word", icon: "word", category: "Tools", note: "Pengolahan dan tata letak dokumen", color: "#2B579A" },
  { name: "Microsoft Excel", icon: "excel", category: "Tools", note: "Pengolahan data, tabel, dan rumus", color: "#217346" },
  { name: "Canva", icon: "canva", category: "Tools", note: "Desain visual dan materi presentasi", color: "#00C4CC" },
  { name: "draw.io", icon: "drawio", category: "Tools", note: "Diagram alur dan pemodelan sistem", color: "#F08705" },
  { name: "Visual Studio Code", icon: "vscode", category: "Tools", note: "Editor kode dan lingkungan pengembangan", color: "#007ACC" },
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
    slug: "park-quest",
    title: "Park Quest",
    tagline: "Aplikasi parkir pintar dengan ketersediaan real-time dan gamifikasi.",
    description:
      "Aplikasi yang membantu pengguna menemukan slot parkir kosong menggunakan informasi ketersediaan real-time dan kontribusi pengguna. Berdasarkan deskripsi dan poster di Pamer.in, pengguna dapat mencari area parkir, berbagi informasi slot, memperoleh poin, menyelesaikan klaim harian, dan melihat leaderboard.",
    category: "Mobile",
    year: "2024",
    role: "Anggota tim proyek PBL",
    status: "Selesai",
    tags: ["Aplikasi Mobile", "Parkir Pintar", "Gamifikasi"],
    demoUrl:
      "https://pbl.polibatam.ac.id/pamerinNew/detail.php?title=park-quest-sistem-parkir-pintar-dan-pendekatan-gamifikasi-&id=MjQ0MQ==&ta=NQ==&id_tim=Mjc3Mw==",
    demoLabel: "Lihat di Pamer.in",
    image: "/images/projects/park-quest-poster.webp",
    artwork: {
      kind: "repository",
      accent: "#F5C928",
      url: "pbl.polibatam.ac.id / Pamer.in",
    },
    highlights: [
      "Membantu pengguna menemukan area dan slot parkir yang tersedia.",
      "Memanfaatkan informasi ketersediaan parkir real-time dan kontribusi pengguna.",
      "Mendukung berbagi informasi slot parkir.",
      "Menggunakan poin, klaim harian, misi, dan leaderboard sebagai elemen gamifikasi.",
    ],
  },
  {
    slug: "smart-lab",
    title: "SMART LAB",
    tagline: "Display ketersediaan laboratorium berbasis IoT.",
    description:
      "Sistem untuk menampilkan status ketersediaan laboratorium secara real-time melalui display di dekat ruangan dan dashboard web. Menurut deskripsi Pamer.in, proyek ini juga dirancang untuk menampilkan ketersediaan dosen di ruang dosen serta terintegrasi dengan PenRu IF.",
    category: "Web App",
    year: "2025",
    role: "Anggota tim SMART LAB",
    status: "Selesai",
    tags: ["IoT", "Dashboard Web", "Monitoring Real-time"],
    demoUrl:
      "https://pbl.polibatam.ac.id/pamerinNew/detail.php?title=display-ketersediaan-laboratorium&id=MzMzMg==&ta=Ng==&id_tim=NDE5NQ==",
    demoLabel: "Lihat di Pamer.in",
    image: "/images/projects/smart-lab-poster.webp",
    artwork: {
      kind: "repository",
      accent: "#42A5F5",
      url: "pbl.polibatam.ac.id / Pamer.in",
    },
    highlights: [
      "Menampilkan status ruangan: tersedia, digunakan, atau maintenance.",
      "Menyediakan display status di samping pintu laboratorium.",
      "Mengelola informasi melalui dashboard web.",
      "Merencanakan integrasi dengan PenRu IF.",
    ],
  },
  {
    slug: "pesantrenkita",
    title: "PESANTRENKITA",
    tagline: "Aplikasi web terintegrasi untuk pengelolaan administrasi pesantren.",
    description:
      "Proyek PBL untuk membantu pesantren mengelola data santri, kehadiran, perizinan, keuangan, dan laporan secara terpusat. Mengacu pada halaman Pamer.in dan poster proyek, sistem ini ditujukan untuk menggantikan proses manual dengan alur digital yang lebih tertata. Pengembangan menggunakan metode Agile secara iteratif dari analisis kebutuhan hingga pengujian.",
    category: "Web App",
    year: "2026",
    role: "Anggota tim PBL618",
    status: "Selesai",
    tags: [],
    demoUrl:
      "https://pbl.polibatam.ac.id/pamerinNew/detail.php?title=pesantrenkita---aplikasi-web-untuk-pengelolaan-santri-&id=NTIzNg==&ta=OA==&id_tim=Nzk0OA==",
    demoLabel: "Lihat di Pamer.in",
    image: "/images/projects/pesantrenkita-poster.png",
    artwork: {
      kind: "repository",
      accent: "#48C987",
      url: "pbl.polibatam.ac.id / Pamer.in",
    },
    highlights: [
      "Pengelolaan data pribadi, riwayat pendidikan, dan status santri secara terpusat.",
      "Pencatatan kehadiran dan perizinan santri secara digital.",
      "Pengelolaan pemasukan, pengeluaran, dan donasi pesantren.",
      "Dashboard serta laporan untuk pemantauan administrasi dan akademik.",
    ],
  },
  {
    slug: "smartops",
    title: "SmartOps",
    tagline: "Platform operasional untuk HR, payroll, keuangan, dan dokumen.",
    description:
      "Aplikasi manajemen operasional berbasis peran dengan modul karyawan, absensi, pengajuan, cuti, payroll, keuangan, dokumen, dan notifikasi. UI Next.js terhubung ke API server yang memeriksa sesi dan akses fitur sebelum membaca atau mengubah data relasional melalui Prisma. Repositori menjelaskan aplikasi ini sebagai proyek yang masih dikembangkan.",
    category: "Web App",
    year: "2026",
    role: "Developer",
    status: "Dalam pengembangan",
    tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "NextAuth.js"],
    repoUrl: "https://github.com/AryaAgung09/SmartOps",
    image: "/images/projects/smartops-hr-dashboard.png",
    artwork: {
      kind: "repository",
      accent: "#C6F24E",
      url: "github.com/AryaAgung09/SmartOps",
    },
    highlights: [
      "Membangun alur pengelolaan karyawan, absensi, cuti, pengajuan, dan payroll.",
      "Menambahkan modul keuangan, termasuk vendor, anggaran, pengeluaran, invoice, dan pembayaran.",
      "Menggunakan sesi JWT serta pemeriksaan akses fitur pada halaman dan API.",
      "Mengelola data relasional menggunakan Prisma dengan MariaDB/MySQL.",
    ],
  },
  {
    slug: "nexora-energy",
    title: "NUSANTARA MINERAL ENERGI",
    tagline: "Menggerakkan potensi, membangun masa depan.",
    description:
      "Website korporat konseptual PT Nusantara Mineral Energi (NME) yang menampilkan narasi “Menggerakkan potensi, membangun masa depan” serta profil perusahaan, area bisnis, proyek, hubungan investor, berita, keberlanjutan, karier, dan kontak. Konten dan data operasional bersifat ilustratif, bukan informasi perusahaan nyata.",
    category: "Web App",
    year: "2026",
    role: "Developer",
    status: "Selesai",
    tags: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
    repoUrl: "https://github.com/AryaAgung09/NME",
    image: "/images/projects/nme-homepage.webp",
    artwork: {
      kind: "repository",
      accent: "#7DD3FC",
      url: "github.com/AryaAgung09/NME",
    },
    highlights: [
      "Membuat halaman korporat dengan rute detail dinamis untuk bisnis, proyek, dan berita.",
      "Menyediakan pilihan bahasa Indonesia dan Inggris.",
      "Menggabungkan animasi GSAP, Lenis, dan Framer Motion dengan dukungan reduced motion.",
      "Formulir kontak memakai validasi server; README menyebut pengiriman email belum terhubung.",
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
      "Berperan aktif dalam pengerjaan proyek riil industri dalam PBL (Project Based Learning)",
      "Fokus pada pengembangan web full-stack dan arsitektur backend.",
    ],
    tags: ["Software Engineering", "Web", "Database", "Project Management"],
    current: true,
  },
  {
    type: "Pengalaman",
    year: "2025",
    period: "2025 Maret - juni",
    title: "IT Support",
    organization: "PT The Costume Magnifique",
    location: "Batam, Indonesia",
    description:
      "Berpengalaman dalam melakukan troubleshooting perangkat lunak, instalasi aplikasi kerja sesuai standar perusahaan, serta memastikan kelancaran sistem komputer karyawan guna mendukung produktivitas operasional.",
    highlights: [
      "konfigurasi perangkat pendukung rapat dan operasional harian.",
      "Bekerja sama dengan tim pengembang (developer) untuk mendiskusikan temuan bug, menguji ulang hasil perbaikan (patch), dan memastikan sistem kembali stabil.",
    ],
    tags: ["Teaching", "Web Development", "Mentoring"],
    current: false,
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
    tags: ["IPS", "Organisasi",],
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
