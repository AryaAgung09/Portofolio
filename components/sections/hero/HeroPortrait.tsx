"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";

/**
 * Potret di dalam kartu. Saat kursor menyentuh kartu, foto terangkat
 * keluar dari bingkainya (clip melebar ke atas) sambil membesar,
 * ditambah tilt halus dan cahaya aksen yang mengikuti pointer.
 */
const photoClip = {
  rest: { clipPath: "inset(0% 0% 0% 0% round 1.45rem)" },
  hover: { clipPath: "inset(-24% 0% 0% 0% round 1.45rem)" },
};

const photoScale = {
  rest: { scale: 1 },
  hover: { scale: 1.18 },
};

export default function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);

  const active = !reduceMotion && popped;

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-4.5, 4.5]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4, -4]), {
    stiffness: 160,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [18, -24]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(x);
    pointerY.set(y);

    const glow = glowRef.current;
    if (glow) {
      glow.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
      glow.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
      glow.style.setProperty("--glow-opacity", "0.8");
    }
  };

  const resetTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    glowRef.current?.style.setProperty("--glow-opacity", "0.3");
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[400px] perspective-[1200px]"
    >
      {/* Cahaya aksen di belakang kartu, mengikuti pointer. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-8 transition-opacity duration-500 ease-out"
        style={{
          background:
            "radial-gradient(closest-side at var(--glow-x, 50%) var(--glow-y, 38%), color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)",
          opacity: "var(--glow-opacity, 0.3)",
        }}
      />

      <motion.div
        suppressHydrationWarning
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          y: reduceMotion ? 0 : parallax,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <motion.div
          initial="rest"
          animate={active ? "hover" : "rest"}
          variants={{ rest: { y: 0 }, hover: { y: -6 } }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          onPointerEnter={() => setPopped(true)}
          onPointerLeave={() => {
            setPopped(false);
            resetTilt();
          }}
          onFocus={() => setPopped(true)}
          onBlur={() => setPopped(false)}
          onPointerMove={handlePointerMove}
          className="relative rounded-[2rem] border border-black/10 bg-[var(--photo-frame)] p-2.5 shadow-[0_50px_100px_-35px_rgba(0,0,0,0.75)]"
        >
          <div className="relative aspect-[4/5]">
            {/* Latar foto */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#efeade_0%,#ddd6c5_100%)]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(198,242,78,0.24),transparent_65%)]"
              />
              <div
                aria-hidden
                className="grid-field absolute inset-0 opacity-40"
              />
            </div>

            {/* Foto: terangkat keluar dari bingkai saat kartu disentuh kursor */}
            <motion.div
              variants={photoClip}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="absolute inset-0"
            >
              <motion.div
                variants={photoScale}
                transition={{ type: "spring", stiffness: 170, damping: 20 }}
                className="absolute inset-0 origin-bottom"
              >
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 55vw, 400px"
                  className="select-none object-contain object-bottom"
                />
              </motion.div>
            </motion.div>

            <a
              href="#tentang"
              aria-label="Kenali Arya lebih dekat"
              className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 hover:rotate-45"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="flex items-center justify-between gap-4 px-3 py-3 text-[#0b0d0f]">
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight">
                {profile.shortName} / 2026
              </p>
              <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.14em] text-black/50">
                {profile.batch} · TRPL
              </p>
            </div>
            <span className="shrink-0 font-mono text-[9px] text-black/35">
              ID—01
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
