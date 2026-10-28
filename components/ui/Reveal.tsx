"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Jeda animasi dalam detik. */
  delay?: number;
  /** Arah datangnya elemen. */
  direction?: Direction;
  /** Seberapa banyak elemen harus terlihat (0–1). */
  amount?: number;
  /** Animasi hanya sekali (default) atau setiap kali masuk viewport. */
  once?: boolean;
};

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

/**
 * Pembungkus animasi masuk saat elemen memasuki viewport.
 * `data-reveal` dipakai oleh fallback <noscript> di layout.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.2,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
