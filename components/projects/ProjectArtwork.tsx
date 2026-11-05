import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Code2,
  Lock,
  MapPin,
  Search,
  Star,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ProjectArtworkProps = {
  project: Project;
  className?: string;
};

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

/**
 * Thumbnail proyek yang digambar dengan HTML/CSS—bukan screenshot palsu.
 * Setiap jenis menampilkan potongan antarmuka yang benar-benar relevan dengan
 * proyeknya. Ganti dengan screenshot asli lewat field `image` di data.
 */
export default function ProjectArtwork({
  project,
  className,
}: ProjectArtworkProps) {
  const { accent, url, kind } = project.artwork;

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden bg-[#090c10] text-[#e9eef4]",
        className,
      )}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-[#11151b] px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 flex h-4 flex-1 items-center gap-1 overflow-hidden rounded-[3px] border border-white/[0.07] bg-white/[0.04] px-2 font-mono text-[6.5px] tracking-wide text-white/35">
          <Lock className="h-2 w-2 shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        <span className="hidden font-mono text-[6px] uppercase tracking-[0.14em] text-white/20 sm:block">
          {kind === "repository" ? "source repo" : "preview"}
        </span>
      </div>

      <div
        className={cn(
          "relative min-h-0 flex-1",
          !project.image && "bg-[#090c10]",
        )}
        style={project.image ? undefined : gridStyle}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <Kind project={project} accent={accent} />
        )}
      </div>
    </div>
  );
}

type KindProps = { project: Project; accent: string };

function Kind({ project, accent }: KindProps) {
  switch (project.artwork.kind) {
    case "repository":
      return <RepositoryArt project={project} accent={accent} />;
    case "dashboard":
      return <Dashboard accent={accent} />;
    case "pos":
      return <Pos accent={accent} />;
    case "mobile":
      return <Mobile accent={accent} />;
    case "api":
      return <Api accent={accent} />;
    case "map":
      return <MapArt accent={accent} />;
    case "portfolio":
      return <PortfolioArt accent={accent} />;
  }
}

function RepositoryArt({
  project,
  accent,
}: {
  project: Project;
  accent: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-6">
      <div>
        <div className="flex items-center gap-2 text-[8px] text-white/45 sm:text-[10px]">
          <Code2 className="h-3.5 w-3.5" style={{ color: accent }} aria-hidden />
          <span>AryaAgung09</span>
          <span aria-hidden>/</span>
          <span className="font-medium text-white/75">{project.slug}</span>
        </div>
        <h3 className="mt-5 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white sm:mt-7 sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-xl text-[10px] leading-5 text-white/55 sm:mt-3 sm:text-sm sm:leading-6">
          {project.tagline}
        </p>
      </div>

      <div>
        <ul className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[7px] text-white/65 sm:text-[9px]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 sm:mt-5 sm:pt-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/35 sm:text-[9px]">
            Public repository
          </span>
          <span
            className="flex items-center gap-1.5 text-[8px] font-medium sm:text-[10px]"
            style={{ color: accent }}
          >
            View source <ArrowUpRight className="h-3 w-3" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}

function Soft({ accent, value = 0.12 }: { accent: string; value?: number }) {
  return { backgroundColor: `${accent}${Math.round(value * 255).toString(16).padStart(2, "0")}` };
}

/* -------------------------------------------------------------------------- */
/*  Dashboard — RuangBaca                                                      */
/* -------------------------------------------------------------------------- */

function Dashboard({ accent }: { accent: string }) {
  const bars = [34, 58, 44, 72, 52, 84, 63, 94, 70, 56, 80, 66];

  return (
    <div className="flex h-full text-[7px]">
      <aside className="flex w-[21%] shrink-0 flex-col border-r border-white/[0.07] bg-[#0c1015] p-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className="flex h-4 w-4 items-center justify-center rounded-[3px] text-[6px] font-bold text-black"
            style={{ backgroundColor: accent }}
          >
            R
          </span>
          <span className="text-[7.5px] font-semibold">RuangBaca</span>
        </div>

        <div className="mt-4 space-y-1">
          {["Dashboard", "Katalog", "Anggota", "Peminjaman", "Laporan"].map(
            (item, index) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-1.5 rounded-[3px] px-1.5 py-1",
                  index === 0 ? "text-black" : "text-white/40",
                )}
                style={index === 0 ? Soft({ accent }) : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-[1px]"
                  style={{
                    backgroundColor: index === 0 ? accent : "rgba(255,255,255,0.16)",
                  }}
                />
                {item}
              </div>
            ),
          )}
        </div>

        <div className="mt-auto flex items-center gap-1.5 border-t border-white/[0.07] pt-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[5.5px]">
            AD
          </span>
          <div>
            <p className="text-[6px] text-white/70">Admin</p>
            <p className="text-[5px] text-white/30">Pustakawan</p>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-tight">Overview</p>
            <p className="mt-0.5 text-[5.5px] text-white/35">
              Selasa, 14 Januari 2026
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 items-center gap-1 rounded-[3px] border border-white/[0.08] px-1.5 text-[5.5px] text-white/40">
              <Search className="h-2 w-2" /> Cari
            </span>
            <span
              className="flex h-4 items-center rounded-[3px] px-1.5 text-[5.5px] font-medium text-black"
              style={{ backgroundColor: accent }}
            >
              + Tambah buku
            </span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            ["Total buku", "2.481", "+12%"],
            ["Anggota aktif", "312", "+8"],
            ["Dipinjam", "48", "hari ini"],
          ].map(([label, value, meta]) => (
            <div
              key={label}
              className="rounded-[4px] border border-white/[0.07] bg-white/[0.025] p-1.5"
            >
              <p className="text-[5.5px] text-white/40">{label}</p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-tight">
                {value}
              </p>
              <p className="mt-0.5 text-[5px]" style={{ color: accent }}>
                {meta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-[1.45fr_1fr] gap-1.5">
          <div className="rounded-[4px] border border-white/[0.07] bg-white/[0.025] p-2">
            <div className="flex items-center justify-between">
              <p className="text-[6.5px] font-medium">Peminjaman minggu ini</p>
              <span className="text-[5px] text-white/30">48 total</span>
            </div>
            <div className="mt-2 flex h-[62px] items-end gap-[3px]">
              {bars.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="flex-1 rounded-t-[1px]"
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      index === 7 ? accent : `${accent}55`,
                  }}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[4.5px] text-white/25">
              <span>Sen</span>
              <span>Rab</span>
              <span>Jum</span>
              <span>Min</span>
            </div>
          </div>

          <div className="rounded-[4px] border border-white/[0.07] bg-white/[0.025] p-2">
            <p className="text-[6.5px] font-medium">Aktivitas</p>
            <div className="mt-1.5 space-y-1.5">
              {[
                ["Nadia", "meminjam Clean Code"],
                ["Rizky", "mengembalikan Dune"],
                ["Sari", "menambah 3 buku"],
              ].map(([name, action]) => (
                <div key={name} className="flex items-start gap-1">
                  <span
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: `${accent}99` }}
                  />
                  <p className="text-[5px] leading-[1.5] text-white/40">
                    <span className="text-white/70">{name}</span> {action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  POS — KasirKu                                                              */
/* -------------------------------------------------------------------------- */

function Pos({ accent }: { accent: string }) {
  const products = [
    "Kopi susu",
    "Croissant",
    "Nasi goreng",
    "Es teh",
    "Roti bakar",
    "Air mineral",
  ];
  const prices = ["18.000", "22.000", "25.000", "8.000", "15.000", "5.000"];

  return (
    <div className="flex h-full text-[7px]">
      <main className="min-w-0 flex-1 p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="flex h-4 w-4 items-center justify-center rounded-[3px] text-[6px] font-bold text-black"
              style={{ backgroundColor: accent }}
            >
              K
            </span>
            <span className="text-[8px] font-semibold">KasirKu</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded-full border border-white/[0.08] px-1.5 py-0.5 text-[5px] text-white/45">
              Shift pagi
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[5px]">
              RA
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 rounded-[4px] border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[5.5px] text-white/30">
          <Search className="h-2 w-2" />
          Cari produk atau scan barcode...
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[6.5px] font-medium">Menu populer</p>
          <span className="text-[5px] text-white/30">12 produk</span>
        </div>

        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {products.map((product, index) => (
            <div
              key={product}
              className="rounded-[4px] border border-white/[0.07] bg-white/[0.025] p-1.5"
            >
              <div
                className="mb-1.5 flex h-7 items-center justify-center rounded-[3px] text-[8px]"
                style={{
                  backgroundColor: `${accent}${index % 2 === 0 ? "22" : "14"}`,
                }}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full opacity-70"
                  style={{ backgroundColor: accent }}
                />
              </div>
              <p className="truncate text-[5.5px] font-medium">{product}</p>
              <p className="mt-0.5 text-[5px] text-white/35">
                Rp {prices[index]}
              </p>
            </div>
          ))}
        </div>
      </main>

      <aside className="flex w-[33%] shrink-0 flex-col border-l border-white/[0.07] bg-[#0c1015] p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[7px] font-semibold">Pesanan #A-024</p>
          <span className="text-[5px] text-white/30">Dine in</span>
        </div>

        <div className="mt-2 space-y-1.5">
          {[
            ["2×", "Kopi susu", "36.000"],
            ["1×", "Croissant", "22.000"],
            ["1×", "Nasi goreng", "25.000"],
          ].map(([qty, name, price]) => (
            <div key={name} className="flex items-start justify-between gap-1">
              <div className="flex gap-1">
                <span
                  className="flex h-3 w-3 items-center justify-center rounded-[2px] text-[4.5px] text-black"
                  style={{ backgroundColor: accent }}
                >
                  {qty}
                </span>
                <span className="text-[5.5px] text-white/60">{name}</span>
              </div>
              <span className="text-[5px] text-white/40">{price}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-1 border-t border-white/[0.07] pt-1.5 text-[5.5px]">
          <div className="flex justify-between text-white/35">
            <span>Subtotal</span>
            <span>83.000</span>
          </div>
          <div className="flex justify-between text-white/35">
            <span>Pajak 10%</span>
            <span>8.300</span>
          </div>
          <div className="flex justify-between pt-1 text-[7px] font-semibold">
            <span>Total</span>
            <span style={{ color: accent }}>Rp 91.300</span>
          </div>
        </div>

        {/* Dekoratif: kartu pembungkus sudah berupa <button>, jadi ini <span>. */}
        <span
          aria-hidden
          className="mt-auto flex h-5 items-center justify-center rounded-[3px] text-[5.5px] font-semibold text-black"
          style={{ backgroundColor: accent }}
        >
          Bayar sekarang
        </span>
        <p className="mt-1 text-center text-[4.5px] text-white/25">
          Tekan Enter untuk konfirmasi
        </p>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile — Jejak                                                             */
/* -------------------------------------------------------------------------- */

function Mobile({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center gap-2 overflow-hidden px-3 py-3">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: `${accent}18` }}
      />

      <Phone accent={accent} className="-rotate-6 scale-[0.92] opacity-80" />
      <Phone accent={accent} className="z-10 rotate-3" />

      <div className="absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/40 px-2 py-1 font-mono text-[5px] uppercase tracking-[0.12em] text-white/40 backdrop-blur">
        iOS · Android
      </div>
    </div>
  );
}

function Phone({ accent, className }: { accent: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/18] h-[88%] shrink-0 rounded-[16px] border border-white/20 bg-[#0b0f14] p-1 shadow-2xl",
        className,
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] bg-[#0e141b]">
        <div className="flex items-center justify-between px-2 pt-1.5 text-[4.5px] text-white/60">
          <span>9:41</span>
          <span className="h-1 w-6 rounded-full bg-white/20" />
          <span>5G</span>
        </div>

        <div className="px-2 pt-1.5">
          <p className="text-[7px] font-semibold">Jejak</p>
          <p className="text-[4.5px] text-white/35">3 perjalanan bulan ini</p>
        </div>

        <div className="relative mx-2 mt-1.5 h-[46%] overflow-hidden rounded-[6px] bg-[#0a1017]">
          <svg
            viewBox="0 0 120 150"
            className="h-full w-full"
            aria-hidden
            preserveAspectRatio="none"
          >
            <path
              d="M-10 120 C30 90 20 40 60 30 S100 70 130 20"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="8"
            />
            <path
              d="M-10 120 C30 90 20 40 60 30 S100 70 130 20"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="60" cy="30" r="4" fill={accent} />
            <circle cx="60" cy="30" r="8" fill={`${accent}33`} />
            <circle cx="20" cy="101" r="2.5" fill="rgba(255,255,255,0.45)" />
            <circle cx="95" cy="56" r="2.5" fill="rgba(255,255,255,0.45)" />
          </svg>
          <span className="absolute left-1.5 top-1.5 rounded-[3px] bg-black/50 px-1 py-0.5 font-mono text-[4px] text-white/50">
            1.284 km
          </span>
        </div>

        <div className="mx-2 mt-1.5 space-y-1">
          {[
            ["Pantai Melayu", "12 Jan · 24 km"],
            ["Bukit Belah", "08 Jan · 18 km"],
          ].map(([name, meta]) => (
            <div
              key={name}
              className="flex items-center gap-1.5 rounded-[3px] border border-white/[0.06] bg-white/[0.025] p-1"
            >
              <span
                className="flex h-3 w-3 items-center justify-center rounded-[2px]"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                <MapPin className="h-1.5 w-1.5" />
              </span>
              <div>
                <p className="text-[4.5px] font-medium text-white/70">{name}</p>
                <p className="text-[4px] text-white/30">{meta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-around border-t border-white/[0.06] py-1.5 text-[4px] text-white/30">
          <span style={{ color: accent }}>Beranda</span>
          <span>Peta</span>
          <span>Statistik</span>
          <span>Profil</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  API — Sirkuit                                                              */
/* -------------------------------------------------------------------------- */

function Api({ accent }: { accent: string }) {
  const lines: { text: string; color?: string }[] = [
    { text: "{" },
    { text: '  "id": "evt_8f2a",', color: "#93c5fd" },
    { text: '  "name": "Tech Fest 2026",', color: "#93c5fd" },
    { text: '  "capacity": 240,', color: "#fcd34d" },
    { text: '  "status": "published",', color: accent },
    { text: '  "tickets": 186' },
    { text: "}" },
  ];

  return (
    <div className="flex h-full text-[7px]">
      <div className="flex min-w-0 flex-1 flex-col p-2.5 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="rounded-[2px] px-1 py-0.5 text-[5px] font-bold text-black" style={{ backgroundColor: accent }}>
              POST
            </span>
            <span className="text-[6px] text-white/60">/v1/events</span>
          </div>
          <span
            className="rounded-full px-1.5 py-0.5 text-[5px]"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            200 OK · 84ms
          </span>
        </div>

        <div className="mt-2 rounded-[4px] border border-white/[0.08] bg-black/30 p-2">
          {lines.map((line, index) => (
            <div key={line.text} className="flex gap-2 leading-[1.7]">
              <span className="w-3 shrink-0 text-right text-[5px] text-white/20">
                {index + 1}
              </span>
              <span
                className="text-[5.5px] text-white/65"
                style={line.color ? { color: line.color } : undefined}
              >
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            ["Latensi", "84ms"],
            ["Request", "12.4k"],
            ["Error", "0.2%"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[3px] border border-white/[0.07] p-1.5"
            >
              <p className="text-[4.5px] text-white/30">{label}</p>
              <p className="mt-0.5 text-[6.5px] font-semibold text-white/75">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-[34%] shrink-0 border-l border-white/[0.07] bg-[#0c1015] p-2.5">
        <p className="text-[5.5px] uppercase tracking-[0.12em] text-white/30">
          Endpoints
        </p>
        <div className="mt-1.5 space-y-1">
          {[
            ["GET", "/events", "200"],
            ["POST", "/events", "201"],
            ["PUT", "/events/:id", "200"],
            ["DEL", "/events/:id", "204"],
            ["GET", "/tickets", "200"],
          ].map(([method, route, status]) => (
            <div
              key={`${method}-${route}`}
              className="flex items-center gap-1 rounded-[3px] border border-white/[0.05] bg-white/[0.02] px-1 py-1"
            >
              <span
                className="w-4 shrink-0 text-[4px] font-bold"
                style={{
                  color:
                    method === "GET"
                      ? accent
                      : method === "POST"
                        ? "#93c5fd"
                        : method === "PUT"
                          ? "#fcd34d"
                          : "#f0abfc",
                }}
              >
                {method}
              </span>
              <span className="min-w-0 flex-1 truncate text-[4.5px] text-white/45">
                {route}
              </span>
              <span className="text-[4px] text-white/20">{status}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-[3px] border border-white/[0.06] p-1.5">
          <p className="text-[4px] uppercase tracking-[0.1em] text-white/25">
            Uptime
          </p>
          <p className="mt-0.5 text-[8px] font-semibold" style={{ color: accent }}>
            99.98%
          </p>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Map — PetaUMKM                                                             */
/* -------------------------------------------------------------------------- */

function MapArt({ accent }: { accent: string }) {
  const pins = [
    { x: 58, y: 34, label: "Kopi" },
    { x: 74, y: 58, label: "Batik" },
    { x: 42, y: 68, label: "Oleh-oleh" },
  ];

  return (
    <div className="relative h-full text-[7px]">
      <svg
        viewBox="0 0 400 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <rect width="400" height="260" fill="#0a0f15" />
        <g stroke="rgba(255,255,255,0.055)" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="260" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 52} x2="400" y2={i * 52} />
          ))}
        </g>
        <path
          d="M-20 180 C60 140 95 175 150 130 S260 95 310 120 S380 80 420 70"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="12"
        />
        <path
          d="M-20 180 C60 140 95 175 150 130 S260 95 310 120 S380 80 420 70"
          fill="none"
          stroke={`${accent}44`}
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <path
          d="M40 260 C70 210 120 200 140 150 S180 60 220 40"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <g fill="rgba(255,255,255,0.035)">
          <rect x="210" y="140" width="42" height="28" rx="2" />
          <rect x="270" y="160" width="52" height="34" rx="2" />
          <rect x="90" y="60" width="38" height="26" rx="2" />
          <rect x="300" y="40" width="46" height="30" rx="2" />
        </g>
      </svg>

      <div className="absolute left-2 top-2 w-[42%] rounded-[5px] border border-white/10 bg-[#0b0e13]/95 p-2 shadow-xl backdrop-blur">
        <div className="flex items-center gap-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-white/10 text-[6px] font-bold" style={{ color: accent }}>
            P
          </span>
          <span className="text-[7px] font-semibold">PetaUMKM</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 rounded-[3px] border border-white/[0.08] bg-white/[0.03] px-1.5 py-1 text-[4.5px] text-white/30">
          <Search className="h-2 w-2" /> Cari usaha...
        </div>
        <div className="mt-1.5 flex gap-1 overflow-hidden">
          {["Semua", "Kuliner", "Kriya"].map((tag, index) => (
            <span
              key={tag}
              className="rounded-full px-1.5 py-0.5 text-[4px]"
              style={
                index === 0
                  ? { backgroundColor: accent, color: "#08090b" }
                  : { border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1.5 space-y-1">
          {[
            ["Kedai Kopi Halaman", "4.9"],
            ["Batik Melayu", "4.7"],
          ].map(([name, rating]) => (
            <div key={name} className="flex items-center justify-between gap-1">
              <span className="truncate text-[4.5px] text-white/55">{name}</span>
              <span className="flex items-center gap-0.5 text-[4px]" style={{ color: accent }}>
                <Star className="h-1.5 w-1.5" /> {rating}
              </span>
            </div>
          ))}
        </div>
      </div>

      {pins.map((pin) => (
        <div
          key={pin.label}
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <span
            className="whitespace-nowrap rounded-full px-1.5 py-0.5 text-[4.5px] font-medium text-black shadow-lg"
            style={{ backgroundColor: accent }}
          >
            {pin.label}
          </span>
          <span
            className="mt-0.5 h-2 w-2 rotate-45"
            style={{ backgroundColor: accent }}
          />
        </div>
      ))}

      <div className="absolute bottom-2 right-2 flex flex-col overflow-hidden rounded-[3px] border border-white/10 bg-[#0b0e13]/90">
        {["+", "−"].map((symbol) => (
          <span
            key={symbol}
            className="flex h-3.5 w-3.5 items-center justify-center border-b border-white/10 text-[6px] text-white/50 last:border-b-0"
          >
            {symbol}
          </span>
        ))}
      </div>

      <div className="absolute bottom-2 left-2 rounded-[3px] bg-black/50 px-1.5 py-0.5 font-mono text-[4px] text-white/35">
        240 UMKM · Batam
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Portfolio — halaman ini                                                   */
/* -------------------------------------------------------------------------- */

function PortfolioArt({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[6px] font-semibold">
          <span className="h-2 w-2 rounded-[1px]" style={{ backgroundColor: accent }} />
          arya.agung
        </span>
        <div className="flex gap-1.5 text-[4.5px] text-white/35">
          <span>Tentang</span>
          <span>Proyek</span>
          <span>Kontak</span>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[4px] uppercase tracking-[0.2em] text-white/30">
            Full-stack developer
          </p>
          <p className="mt-1 text-[15px] font-semibold leading-[0.95] tracking-[-0.05em]">
            Build with
            <br />
            intent<span style={{ color: accent }}>.</span>
          </p>
          <p className="mt-1 max-w-[120px] text-[4.5px] leading-[1.6] text-white/35">
            Rapi di balik layar. Nyaman di depan mata.
          </p>
        </div>
        <div
          className="relative h-16 w-12 shrink-0 overflow-hidden rounded-[4px]"
          style={{ backgroundColor: `${accent}22` }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-9"
            style={{ backgroundColor: `${accent}55` }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-white/70">
            AA
          </span>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-1.5">
        {["01", "02", "03"].map((number, index) => (
          <div
            key={number}
            className="rounded-[3px] border border-white/[0.08] p-1.5"
            style={{
              backgroundColor:
                index === 0 ? `${accent}12` : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[3.5px] text-white/30">
                {number}
              </span>
              <ArrowUpRight className="h-1.5 w-1.5 text-white/30" />
            </div>
            <div
              className="mt-1 h-5 rounded-[2px]"
              style={{
                backgroundColor:
                  index === 0 ? `${accent}30` : "rgba(255,255,255,0.05)",
              }}
            />
            <div className="mt-1 h-0.5 w-3/4 rounded-full bg-white/15" />
            <div className="mt-0.5 h-0.5 w-1/2 rounded-full bg-white/10" />
          </div>
        ))}
      </div>

      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1">
        {["home", "work", "contact"].map((item, index) => (
          <span
            key={item}
            className="h-1 w-1 rounded-full"
            style={{
              backgroundColor:
                index === 0 ? accent : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-0.5 text-[4px] text-white/35">
        <Check className="h-1.5 w-1.5" style={{ color: accent }} /> Lighthouse 98
      </div>
    </div>
  );
}
