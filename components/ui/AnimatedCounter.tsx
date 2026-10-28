"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/motion";
import { formatDecimal, cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  /** Durasi animasi dalam detik. */
  duration?: number;
};

/**
 * Angka yang menghitung naik saat pertama kali terlihat.
 * Jika reduced motion aktif, angka langsung tampil di nilai akhir.
 */
export default function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  className,
  duration = 1.7,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  /*
   * Nilai akhir dipakai sebagai render pertama agar HTML server dan klien sama
   * (mencegah hydration mismatch). Animasi hitung naik dimulai saat masuk
   * viewport, kecuali pengunjung memilih reduced motion.
   */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, reduceMotion, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatDecimal(display, decimals)}
      {suffix}
    </span>
  );
}
