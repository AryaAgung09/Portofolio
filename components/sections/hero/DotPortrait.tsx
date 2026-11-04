"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Dot Portrait - Canvas-based particle portrait similar to FIQTOR's implementation.
 * Particles form a face shape and react to mouse with physics:
 * - Spring back to home position
 * - Push away from pointer
 * - Breathe animation
 * - Burst on click
 * - Ripple effects on click near edges
 * Respects prefers-reduced-motion.
 */

// Generate dot positions in an oval/face shape
function generateFaceDots(
  width: number,
  height: number,
  density: number = 0.6
): { x: number; y: number; size: number }[] {
  const dots: { x: number; y: number; size: number }[] = [];
  const centerX = width / 2;
  const centerY = height * 0.55; // Slightly higher for face proportion
  const radiusX = width * 0.42;
  const radiusY = height * 0.48;

  // Grid spacing based on density
  const spacing = 3.5 / density;

  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Create oval face shape with some variation
      if (dist < 1) {
        // Add some noise for organic look
        const noise = (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 0.15;
        const adjustedDist = dist + noise;

        if (adjustedDist < 1) {
          // Size varies based on distance from center (smaller at edges)
          const baseSize = 1.8;
          const sizeVariation = (1 - adjustedDist) * 1.2 + Math.random() * 0.5;
          const size = Math.max(1, baseSize * sizeVariation);

          dots.push({
            x: x + (Math.random() - 0.5) * spacing * 0.3,
            y: y + (Math.random() - 0.5) * spacing * 0.3,
            size,
          });
        }
      }
    }
  }

  return dots;
}

interface DotPortraitProps {
  width?: number;
  height?: number;
  className?: string;
  dotColor?: string;
  backgroundColor?: string;
}

export default function DotPortrait({
  width = 400,
  height = 500,
  className = "",
  dotColor = "#ffffff",
  backgroundColor = "transparent",
}: DotPortraitProps) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [dots, setDots] = useState<{ x: number; y: number; size: number }[]>([]);

  // Physics constants (matching reference)
  const CFG = {
    fill: 0.94,
    hoverRadius: 0.17,
    push: 2.6,
    spring: 0.055,
    damping: 0.84,
    grow: 0.9,
    breathe: 0.07,
    introMs: 1600,
    burst: 16,
  };

  const ROW = 0.866;

  // Initialize dots
  useEffect(() => {
    const generatedDots = generateFaceDots(width, height, 0.7);
    setDots(generatedDots);
  }, [width, height]);

  const N = dots.length;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    if (N === 0) return;

    const root = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    // State arrays
    const hx = new Float32Array(N);
    const hy = new Float32Array(N);
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const sz = new Float32Array(N);
    const dw = new Float32Array(N);
    const sRaw = new Uint8Array(N);

    // Initialize positions
    for (let i = 0; i < N; i++) {
      hx[i] = dots[i].x;
      hy[i] = dots[i].y * ROW;
      sz[i] = dots[i].size;
      sRaw[i] = Math.round(dots[i].size * 255);
    }

    let W = 0;
    let H = 0;
    let dpr = 1;
    let scale = 1;
    let ox = 0;
    let oy = 0;
    let hoverR = 100;
    let introDone = false;
    let t0 = performance.now();

    const homeX = new Float32Array(N);
    const homeY = new Float32Array(N);

    let invert = false;
    let lastInvert = false;

    function readVar(names: string[], el: Element = document.documentElement): string {
      for (const n of names) {
        for (const target of [root!, el]) {
          const v = getComputedStyle(target).getPropertyValue(n).trim();
          if (v && v !== "inherit" && v !== "initial" && v !== "unset") return v;
        }
      }
      return "";
    }

    function luminance(color: string): number | null {
      const m = color.match(/^#([\da-f]{3})|([\da-f]{6})$/i);
      if (m) {
        const h = m[1] ? m[1].split("").map((c) => c + c).join("") : m[2];
        const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
      const rgb = color.match(/rgba?\(([\d\s.,]+)\)/);
      if (rgb) {
        const [r, g, b] = rgb[1].split(/[\s,]+/).slice(0, 3).map(Number);
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      }
      const named: Record<string, string> = {
        white: "#ffffff",
        black: "#000000",
      };
      const key = color.toLowerCase();
      return named[key] ? luminance(named[key]) : null;
    }

    function applySizeMapping() {
      for (let i = 0; i < N; i++) {
        sz[i] = invert ? (10 - sRaw[i]) / 9 : sRaw[i] / 9;
      }
    }

    function readPalette() {
      // Use --foreground which is dark in light mode, light in dark mode
      const fg = readVar(["--foreground"], root!);
      const base = fg || (readVar(["--background"], root!) === "#f2f0e9" ? "#0b0d0f" : "#f2f3ee");

      // --dot-invert is 1 in light theme, 0 in dark
      invert = readVar(["--dot-invert"], root!) === "1";
      if (invert !== lastInvert) {
        lastInvert = invert;
        applySizeMapping();
      }
      return { base };
    }

    function layout() {
      const r = root!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(W / width, H / height) * CFG.fill;
      ox = (W - width * scale) / 2;
      oy = (H - height * scale) / 2;
      hoverR = height * scale * CFG.hoverRadius;
      for (let i = 0; i < N; i++) {
        homeX[i] = ox + hx[i] * scale;
        homeY[i] = oy + hy[i] * scale;
        if (!introDone) {
          px[i] = homeX[i];
          py[i] = homeY[i];
        }
      }
    }

    function seedIntro() {
      introDone = false;
      t0 = performance.now();
      const cx = W / 2;
      const cy = H / 2;
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = (0.4 + Math.random() * 0.9) * Math.max(W, H) * 0.6;
        sx[i] = cx + Math.cos(a) * d;
        sy[i] = cy + Math.sin(a) * d;
        vx[i] = vy[i] = 0;
        dw[i] = Math.min(0.55, Math.hypot(homeX[i] - cx, homeY[i] - cy) / (Math.max(W, H) * 1.6)) + Math.random() * 0.18;
      }
    }

    const sx = new Float32Array(N);
    const sy = new Float32Array(N);

    function onDown(e: PointerEvent) {
      const r = root!.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.active = true;
    }

    function onMove(e: PointerEvent) {
      const r = root!.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    }

    function onUp(e: PointerEvent) {
      if (e.pointerType !== "mouse") leave();
    }

    const leave = () => {
      ptr.active = false;
      ptr.x = ptr.y = -9999;
    };

    const ptr = { x: -9999, y: -9999, active: false };

    const rings: { x: number; y: number; t: number; target: number }[] = [];
    let R = hoverR * 2.4;

    function burstAt(x: number, y: number, targetR: number) {
      rings.push({ x, y, t: performance.now(), target: targetR });
    }

    function onCanvasDown(e: PointerEvent) {
      if (e.button !== 0) return;
      onDown(e);
      const reach = Math.min(ptr.x, W - ptr.x, ptr.y, H - ptr.y);
      const target = Math.min(hoverR * 2.4, reach * 0.9);
      if (target >= hoverR * 0.35) {
        burstAt(ptr.x, ptr.y, target);
      }
      R = hoverR * 2.4;
    }

    function onResize() {
      clearTimeout(rt);
      rt = window.setTimeout(layout, 60);
    }

    let rt = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = window.setTimeout(layout, 60);
    });
    ro.observe(root!);

    // Initialize
    layout();
    readPalette();
    applySizeMapping();
    seedIntro();

    root!.addEventListener("pointermove", onMove);
    root!.addEventListener("pointerdown", onCanvasDown);
    root!.addEventListener("pointerup", onUp);
    root!.addEventListener("pointerleave", leave);
    root!.addEventListener("pointercancel", leave);
    window.addEventListener("resize", onResize);

    let running = true;
    let last = performance.now();
    let rafId = 0;

    function frame(now: number) {
      if (!running) return;
      rafId = requestAnimationFrame(frame);

      const elapsed = Math.min(2.2, (now - last) / 16.67);
      last = now;
      const ip = Math.min(1, (now - t0) / CFG.introMs);
      if (!introDone && ip >= 1) introDone = true;

      const cs = getComputedStyle(root!);
      const pal = readPalette();
      const dotScale = Number(cs.getPropertyValue("--dot-scale")) || 1;
      const dotFill = Number(cs.getPropertyValue("--dot-fill")) || 0.45;

      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = pal.base;
      ctx!.beginPath();

      const tm = now / 1000;
      const damp = Math.pow(CFG.damping, elapsed);
      const k = CFG.spring * elapsed;
      const breath = reduceMotion ? 0 : Math.sin(tm * 1.6 + hx[0] * 0.09 + hy[0] * 0.07) * CFG.breathe;

      for (let i = 0; i < N; i++) {
        let local = 1;
        if (!introDone) {
          local = ip;
        }

        let targetX = homeX[i];
        let targetY = homeY[i];
        if (!introDone) {
          targetX = sx[i] + (homeX[i] - sx[i]) * local;
          targetY = sy[i] + (homeY[i] - sy[i]) * local;
        }

        let ax = (targetX - px[i]) * k;
        let ay = (targetY - py[i]) * k;

        if (ptr.active) {
          const dx = px[i] - ptr.x;
          const dy = py[i] - ptr.y;
          const d = Math.hypot(dx, dy);
          if (d > 0.01) {
            const Rr = hoverR * 2.4;
            const target = Math.min(hoverR * 2.4, Math.min(ptr.x, W - ptr.x, ptr.y, H - ptr.y) * 0.9);
            if (d < Rr && d > 0.01) {
              const f = Math.pow(1 - d / Rr, 2) * CFG.push * (0.6 + Math.random() * 0.8);
              ax += (dx / d) * f;
              ay += (dy / d) * f;
            }
          }
        }

        vx[i] = (vx[i] + ax) * damp;
        vy[i] = (vy[i] + ay) * damp;
        px[i] += vx[i] * elapsed;
        py[i] += vy[i] * elapsed;

        const wave = reduceMotion ? 0 : Math.sin(tm * 1.6 + hx[i] * 0.09 + hy[i] * 0.07) * CFG.breathe;
        const r = Math.max(0.15, dotScale * dotFill * sz[i] * (1 + wave + breath));
        if (r < 0.15) continue;

        ctx!.moveTo(px[i] + r, py[i]);
        ctx!.arc(px[i], py[i], r, 0, 6.2832);
      }

      ctx!.fill();

      // Rings
      for (let j = rings.length - 1; j >= 0; j--) {
        const g = rings[j];
        const a = (now - g.t) / 900;
        if (a >= 1) {
          rings.splice(j, 1);
          continue;
        }
        const r = g.target * easeOut(a);
        if (r <= 0) continue;
        ctx!.globalAlpha = (1 - a) * 0.5;
        ctx!.strokeStyle = ctx!.fillStyle;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.arc(g.x, g.y, r, 0, 6.2832);
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      }
    }

    function easeOut(x: number) {
      return 1 - Math.pow(1 - x, 3);
    }

    frame(performance.now());

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      root!.removeEventListener("pointermove", onMove);
      root!.removeEventListener("pointerdown", onCanvasDown);
      root!.removeEventListener("pointerup", onUp);
      root!.removeEventListener("pointerleave", leave);
      root!.removeEventListener("pointercancel", leave);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      clearTimeout(rt);
    };
  }, [dots, N, width, height, reduceMotion, dotColor, backgroundColor]);

  // CSS variables for theming
  const style = {
    "--dot-color": dotColor,
    "--dot-fill": 0.45,
    "--dot-scale": 1,
    "--dot-invert": 0,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`dot-portrait ${className}`}
      style={{ width, height, ...style }}
      aria-label="Interactive dot portrait"
      role="img"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}