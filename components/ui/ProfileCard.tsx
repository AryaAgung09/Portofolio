"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";

type ProfileCardProps = {
  avatarUrl: string;
  avatarAlt: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  contactHref?: string;
  holo?: number;
  glare?: number;
  tiltStrength?: number;
  parallax?: number;
  radius?: number;
  enableTilt?: boolean;
  intro?: boolean;
  showUserInfo?: boolean;
  enableMobileTilt?: boolean;
  theme?: "dark" | "light";
  onContactClick?: () => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function ProfileCard({
  avatarUrl,
  avatarAlt,
  name,
  title,
  handle,
  status,
  contactText,
  contactHref,
  holo = 0.8,
  glare = 0.5,
  tiltStrength = 23,
  parallax = 8,
  radius = 16,
  enableTilt = true,
  intro = true,
  showUserInfo = true,
  enableMobileTilt = false,
  theme = "dark",
  onContactClick,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    reducedMotionRef.current = motionPreference.matches;
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        pointerRef.current.active = false;
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        card.style.setProperty("--pc-active", "0");
        card.style.setProperty("--pc-shift-x", "0px");
        card.style.setProperty("--pc-shift-y", "0px");
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }
    };

    const introFrame = window.requestAnimationFrame(() => {
      if (intro && !motionPreference.matches) {
        card.style.transition =
          "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)";
      }
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    motionPreference.addEventListener("change", onMotionPreferenceChange);
    return () => {
      window.cancelAnimationFrame(introFrame);
      window.cancelAnimationFrame(frameRef.current);
      motionPreference.removeEventListener(
        "change",
        onMotionPreferenceChange,
      );
    };
  }, [intro]);

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    pointerRef.current.active = false;
    card.style.setProperty("--pc-active", "0");
    card.style.setProperty("--pc-shift-x", "0px");
    card.style.setProperty("--pc-shift-y", "0px");
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const moveTilt = (event: PointerEvent<HTMLDivElement>) => {
    const isTouch = event.pointerType !== "mouse";
    if (
      !enableTilt ||
      reducedMotionRef.current ||
      (isTouch && !enableMobileTilt)
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    pointerRef.current = {
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1),
      active: true,
    };
    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const card = cardRef.current;
      if (!card || !pointerRef.current.active) return;

      const { x, y } = pointerRef.current;
      const tilt = Math.min(1, Math.hypot(x, y));
      card.style.setProperty("--pc-active", String(tilt));
      card.style.setProperty("--pc-light-x", `${(x + 1) * 50}%`);
      card.style.setProperty("--pc-light-y", `${(y + 1) * 50}%`);
      card.style.setProperty("--pc-shift-x", `${x * parallax}px`);
      card.style.setProperty("--pc-shift-y", `${y * parallax}px`);
      card.style.transform = `perspective(1000px) rotateX(${-y * tiltStrength}deg) rotateY(${x * tiltStrength}deg)`;
    });
  };

  const cardStyle = {
    "--pc-radius": `${Math.max(0, radius)}px`,
    "--pc-holo": clamp(holo, 0, 1),
    "--pc-glare": clamp(glare, 0, 1),
    "--pc-active": 0,
    "--pc-light-x": "50%",
    "--pc-light-y": "50%",
    "--pc-shift-x": "0px",
    "--pc-shift-y": "0px",
    "--pc-surface":
      theme === "dark" ? "rgba(25, 34, 49, 0.92)" : "rgba(235, 240, 248, 0.94)",
    "--pc-ink": theme === "dark" ? "#f8fafc" : "#101827",
    "--pc-muted": theme === "dark" ? "rgba(226,232,240,.68)" : "#526071",
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      style={{
        ...cardStyle,
        transform: intro
          ? "perspective(1000px) rotateX(-6.6deg) rotateY(7.4deg)"
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      }}
      onPointerEnter={moveTilt}
      onPointerMove={moveTilt}
      onPointerLeave={resetTilt}
      onPointerUp={resetTilt}
      className="relative mx-auto w-full max-w-[360px] touch-pan-y [transform-style:preserve-3d] will-change-transform"
    >
      <div className="relative rounded-[calc(var(--pc-radius)+10px)] bg-[var(--pc-surface)] p-2.5 shadow-[0_22px_44px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[var(--pc-radius)] bg-[#0b1220]">
          <Image
            src={avatarUrl}
            alt={avatarAlt}
            fill
            sizes="(max-width: 1024px) 85vw, 360px"
            className="pointer-events-none object-contain object-bottom [transform:translate3d(var(--pc-shift-x),var(--pc-shift-y),0)]"
            draggable={false}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_var(--pc-light-x)_var(--pc-light-y),rgba(96,165,250,0.26),transparent_58%)] opacity-[calc(var(--pc-holo)*var(--pc-active))]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
          />
          <div className="absolute inset-x-4 bottom-4 text-white">
            <h3 className="text-xl font-semibold leading-tight tracking-tight">
              {name}
            </h3>
            <p className="mt-1 text-sm text-white/80">{title}</p>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_var(--pc-light-x)_var(--pc-light-y),rgba(255,255,255,0.35),transparent_54%)] opacity-[calc(var(--pc-glare)*var(--pc-active))] mix-blend-screen"
          />
        </div>

        {showUserInfo && (
          <div className="flex min-w-0 items-center gap-3 px-3 pb-1 pt-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--pc-ink)]">
                @{handle}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--pc-muted)]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                />
                {status}
              </p>
            </div>
            {contactHref ? (
              <a
                href={contactHref}
                aria-label={`${contactText} ${name}`}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[calc(var(--pc-radius)*0.75)] bg-white/10 px-3 text-[13px] font-semibold text-[var(--pc-ink)] transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 active:scale-[0.97]"
              >
                <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.8} />
                {contactText}
              </a>
            ) : (
              <button
                type="button"
                onClick={onContactClick}
                aria-label={`${contactText} ${name}`}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[calc(var(--pc-radius)*0.75)] bg-white/10 px-3 text-[13px] font-semibold text-[var(--pc-ink)] transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 active:scale-[0.97]"
              >
                <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.8} />
                {contactText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
