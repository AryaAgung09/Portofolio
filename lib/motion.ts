import type { Variants } from "framer-motion";

/**
 * Kurva easing yang dipakai konsisten di seluruh halaman.
 * Terasa cepat di awal, lembut di akhir—cocok untuk UI yang tenang.
 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Container untuk animasi stagger anak-anaknya. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

/** Anak dari staggerContainer: naik sedikit sambil muncul. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Variasi masuk untuk elemen tunggal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};
