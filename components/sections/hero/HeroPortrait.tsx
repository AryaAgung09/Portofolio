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
import { useRef, useState, useEffect } from "react";
import { profile } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";

/**
 * Potret center-stage tanpa kart/frame - bulat/oval.
 * Fitur interaktif:
 * 1. Tilt 3D mengikuti kursor (mouse) + spring physics
 * 2. Scale up + lift pada hover
 * 3. Accent glow mengikuti pointer
 * 4. Parallax vertikal saat scroll
 * 5. Floating animation idle
 * 6. Semua animasi menghormati prefers-reduced-motion
 */

export default function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking for 3D tilt
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-6, 6]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [5, -5]), {
    stiffness: 180,
    damping: 22,
  });

  // Hover scale
  const scale = useSpring(useMotionValue(isHovering ? 1.1 : 1), {
    stiffness: 220,
    damping: 24,
  });

  // Hover lift
  const liftY = useSpring(useMotionValue(isHovering ? -20 : 0), {
    stiffness: 200,
    damping: 22,
  });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [24, -32]);

  // Combined Y: parallax + lift
  const combinedY = useTransform(
    [parallax, liftY],
    (values: number[]) => values[0] + values[1]
  );

  // Mouse-following glow
  const glowX = useSpring(useTransform(pointerX, [0, 1], [-30, 30]), {
    stiffness: 140,
    damping: 20,
  });
  const glowY = useSpring(useTransform(pointerY, [0, 1], [-30, 30]), {
    stiffness: 140,
    damping: 20,
  });

  // Subtle accent glow - only on hover, no persistent yellow
  const hoverGlowOpacity = useSpring(useMotionValue(isHovering ? 0.35 : 0), {
    stiffness: 180,
    damping: 22,
  });

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
      glow.style.setProperty("--glow-opacity", "0.9");
    }
  };

  const handlePointerEnter = () => {
    if (reduceMotion) return;
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
    glowRef.current?.style.setProperty("--glow-opacity", "0");
  };

  // Sync motion values with hover state
  useEffect(() => {
    scale.set(isHovering ? 1.1 : 1);
    liftY.set(isHovering ? -20 : 0);
  }, [isHovering, scale, liftY]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[380px] perspective-[1400px]"
    >
      {/* Ambient glow behind the portrait, follows pointer - only visible on hover */}
      <motion.div
        ref={glowRef}
        aria-hidden
        style={{
          opacity: reduceMotion ? 0 : hoverGlowOpacity,
          background:
            "radial-gradient(closest-side at var(--glow-x, 50%) var(--glow-y, 35%), color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
        }}
        className="pointer-events-none absolute -inset-12 transition-opacity duration-500 ease-out"
      />

      {/* Floating particles around the portrait */}
      {!reduceMotion && (
        <>
          <div
            aria-hidden
            className="absolute -top-8 -right-10 h-24 w-24 rounded-full bg-accent/15 blur-[60px] animate-float-slow"
            style={{ animationDelay: "0s" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-6 -left-8 h-16 w-16 rounded-full bg-accent/10 blur-[40px] animate-float-slow"
            style={{ animationDelay: "-3s" }}
          />
          <div
            aria-hidden
            className="absolute top-1/3 -right-16 h-8 w-8 rounded-full bg-accent/20 blur-[30px] animate-float-medium"
            style={{ animationDelay: "-1.5s" }}
          />
          <div
            aria-hidden
            className="absolute bottom-1/3 -left-14 h-6 w-6 rounded-full bg-accent/15 blur-[20px] animate-float-medium"
            style={{ animationDelay: "-4s" }}
          />
        </>
      )}

      <motion.div
        suppressHydrationWarning
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handlePointerEnter}
        onBlur={handlePointerLeave}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scale,
          y: reduceMotion ? 0 : combinedY,
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
        className="relative"
      >
        {/* Decorative rings behind portrait - gradient orbiting rings */}
        {!reduceMotion && (
          <>
            {/* Outer gradient ring */}
            <motion.div
              animate={{
                rotate: [0, 360],
                borderRadius: ["50%", "45% 55% 48% 52%", "50%"],
              }}
              transition={{
                rotate: { duration: 30, ease: "linear", repeat: Infinity },
                borderRadius: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
              }}
              className="absolute -inset-8 rounded-[50%] pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, color-mix(in srgb, var(--accent) 35%, transparent) 25%, transparent 50%, color-mix(in srgb, var(--accent) 20%, transparent) 75%, transparent 100%)",
                mask: "radial-gradient(circle at center, transparent 68%, black 70%)",
                opacity: 0.4,
              }}
            />
            {/* Middle orbiting ring - counter rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              className="absolute -inset-14 rounded-[50%] pointer-events-none"
              style={{
                background: "conic-gradient(from 180deg, transparent 0%, color-mix(in srgb, var(--accent) 25%, transparent) 20%, transparent 45%, color-mix(in srgb, var(--accent) 15%, transparent) 70%, transparent 100%)",
                mask: "radial-gradient(circle at center, transparent 72%, black 74%)",
                opacity: 0.3,
              }}
            />
            {/* Inner subtle ring with pulse */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.25, 0.45, 0.25],
                rotate: 360,
              }}
              transition={{
                scale: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                opacity: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 40, ease: "linear", repeat: Infinity },
              }}
              className="absolute -inset-4 rounded-[50%] border border-accent/25 pointer-events-none"
            />
            {/* Floating accent dots orbiting */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              className="absolute -inset-18 rounded-[50%] pointer-events-none"
              style={{ opacity: 0.6 }}
            >
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50"
                  style={{
                    transformOrigin: "center center",
                    transform: `rotate(${angle}deg) translateY(-120%)`,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Portrait image - circular/oval cutout, no frame */}
        <div
          style={{
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 50px color-mix(in srgb, var(--accent) 30%, transparent))",
          }}
          className="relative aspect-[4/5] max-w-[380px] mx-auto"
        >
          {/* Circular mask container */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) 76vw, (max-width: 1024px) 50vw, 380px"
              className="select-none object-cover object-top"
            />
          </div>

          {/* CTA button to About section - positioned at bottom of circle */}
          <a
            href="#tentang"
            aria-label="Kenali Arya lebih dekat"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-300 hover:rotate-45 hover:scale-105 hover:shadow-[0_8px_24px_-8px_var(--accent)]"
          >
            <ArrowUpRight className="h-4.5 w-4.5" aria-hidden />
          </a>
        </div>

        {/* Floating label/badge near portrait on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isHovering && !reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, duration: 0.4 }}
          className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border px-4 py-2 text-sm font-medium text-foreground shadow-lg pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>{profile.shortName} / Full-stack Developer</span>
        </motion.div>
      </motion.div>
    </div>
  );
}