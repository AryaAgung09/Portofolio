import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kunci workspace root ke folder proyek ini.
  //
  // Turbopack mendeteksi root dari lockfile terdekat. Karena di
  // C:\xampp\htdocs ada package-lock.json milik proyek lain, Next.js salah
  // menganggap C:\xampp\htdocs sebagai root. Akibatnya resolusi modul rusak
  // (mis. "Cannot find module 'lucide-react'") dan dev server menggantung.
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
