"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type NeuformMode = "dark" | "light";
type NeuformModePreference = NeuformMode | "auto";

type FocusTarget = {
  selector: string;
  role: "background" | "ui";
  width?: string;
};

type BakeKnobs = {
  size: number;
  gap: number;
  length: number;
  density: number;
  strokeWidth: number;
  mode: NeuformMode;
};

type EffectDefinition = {
  title: string;
  source: string;
  background: string | ((mode: NeuformMode) => string);
  defaultMode?: NeuformModePreference;
  supportsMode?: boolean;
  targets: readonly FocusTarget[];
  focusCss?: string;
  patch?: (source: string, knobs: BakeKnobs) => string;
};

export type ParticleDriftProps = {
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const PARTICLE_DRIFT_DEFAULTS = {
  mode: "dark" as NeuformMode,
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const LIGHT_PAPER = "#eef1f6";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function scaleCount(base: number, density: number, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

function resolveMode(
  mode: NeuformMode | number | string | undefined,
  fallback: NeuformMode = "dark",
): NeuformMode {
  if (mode === undefined || mode === null) return fallback;
  if (mode === "light" || mode === 1 || mode === "1") return "light";
  return "dark";
}

function readAutomaticMode(): NeuformMode {
  if (typeof document === "undefined" || typeof window === "undefined")
    return "dark";
  const root = document.documentElement;
  const declared = root.dataset.scheme ?? root.dataset.theme;
  if (declared === "light" || declared === "dark") return declared;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useAutomaticMode(enabled: boolean) {
  const [mode, setMode] = useState<NeuformMode>(readAutomaticMode);

  useEffect(() => {
    if (
      !enabled ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    )
      return undefined;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setMode(readAutomaticMode());
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-scheme", "data-theme"],
    });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, [enabled]);

  return mode;
}

function resolveBackground(
  background: EffectDefinition["background"],
  mode: NeuformMode,
) {
  return typeof background === "function" ? background(mode) : background;
}

// Verbatim content of particle-drift.html (self-contained hero markup + canvas particle script),
// re-encoded as a regular string to avoid nested template literal issues.
// Rendered inside a sandboxed iframe via srcDoc.
const PARTICLE_DRIFT_SOURCE = '<!doctype html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <title>Zenith Compute Network</title>\n' +
'    <script src="https://cdn.tailwindcss.com"></script>\n' +
'    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>\n' +
'    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>\n' +
'    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>\n' +
'    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400&display=swap" rel="stylesheet">\n' +
'</head>\n' +
'<body class="bg-[#030509] min-h-screen flex items-center justify-center p-4 md:p-12 font-sans antialiased text-[#FFFFFF] overflow-x-hidden selection:bg-[#60A5FA] selection:text-[#030509]">\n' +
'\n' +
'    <!-- Gradient Border Shell Technique -->\n' +
'    <div class="w-full max-w-[1440px] shadow-[0px_100px_80px_rgba(0,0,0,0.12),_0px_41.8px_33.4px_rgba(0,0,0,0.086),_0px_22.3px_17.9px_rgba(0,0,0,0.07)]" style="display:inline-block; padding:1px; border-radius:24px; background:linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0));">\n' +
'\n' +
'        <!-- Main Inner Surface -->\n' +
'        <div class="relative w-full flex flex-col md:flex-row overflow-hidden min-h-[600px] md:min-h-[650px]" style="background:#030509; border-radius:23px; box-shadow:rgba(255, 255, 255, 0.02) 0px 0px 40px 0px inset;">\n' +
'\n' +
'            <!-- Canvas Particle System Background Field -->\n' +
'            <canvas id="particle-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100"></canvas>\n' +
'\n' +
'            <!-- Matte Noise Texture Overlay -->\n' +
'            <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-10" style="background-image: url(\'data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E\');"></div>\n' +
'\n' +
'            <!-- Left Column: Copy & Controls -->\n' +
'            <div class="w-full md:w-[38%] px-8 lg:px-16 py-10 md:py-14 flex flex-col justify-between relative z-20 shrink-0 border-r border-white/5">\n' +
'\n' +
'                <!-- Lineart Detail: Corner Brackets -->\n' +
'                <div class="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/20"></div>\n' +
'                <div class="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/20"></div>\n' +
'                <div class="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/20"></div>\n' +
'                <div class="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/20"></div>\n' +
'\n' +
'                <!-- Top Badge -->\n' +
'                <div class="fade-in-el opacity-0 inline-flex items-center gap-2 px-3 py-1 text-xs font-light tracking-widest uppercase mb-16 border border-white/10 text-[#60A5FA] rounded-full w-max bg-white/5 backdrop-blur-sm">\n' +
'                    <iconify-icon icon="solar:server-square-linear" stroke-width="1.5" class="text-sm"></iconify-icon>\n' +
'                    ZENITH COMPUTE\n' +
'                </div>\n' +
'\n' +
'                <!-- Heading (Playfair Display) -->\n' +
'                <div>\n' +
'                    <h1 id="hero-heading" class="text-5xl md:text-7xl tracking-tight text-[#FFFFFF] mb-6 leading-none opacity-0 font-light" style="font-family: \'Playfair Display\', serif;">\n' +
'                        Infinite execution threads.<br>The cognitive backbone.\n' +
'                    </h1>\n' +
'\n' +
'                    <!-- Body Text -->\n' +
'                    <p class="fade-in-el opacity-0 text-[#9CA3AF] text-lg leading-relaxed max-w-[320px] font-light mb-8" style="font-family: \'Inter\', sans-serif;">\n' +
'                        An autonomous state-management protocol synchronizing distributed workloads across edge micro-clusters and centralized servers. Adjust the target environment to refine processing speed.\n' +
'                    </p>\n' +
'                    \n' +
'                    <!-- Primary Action Button -->\n' +
'                    <button class="fade-in-el opacity-0 bg-[#60A5FA] text-[#030509] px-8 py-3.5 rounded-full text-sm font-light w-max hover:bg-blue-300 transition-colors flex items-center gap-2" style="font-family: \'Inter\', sans-serif;">\n' +
'                        Provision Network\n' +
'                        <iconify-icon icon="solar:cpu-linear" stroke-width="1.5" class="text-lg"></iconify-icon>\n' +
'                    </button>\n' +
'                </div>\n' +
'\n' +
'                <!-- Custom Slider Control -->\n' +
'                <div class="fade-in-el opacity-0 mt-16 pt-8 w-full relative">\n' +
'                    <!-- Track Line -->\n' +
'                    <div class="w-full h-[1px] bg-white/10 relative">\n' +
'                        <!-- Thumb / Active Indicator -->\n' +
'                        <div class="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#60A5FA] rounded-full shadow-[0_0_12px_rgba(96,165,250,0.6)]"></div>\n' +
'                    </div>\n' +
'                    \n' +
'                    <!-- Labels -->\n' +
'                    <div class="flex justify-between mt-4 w-full" style="font-family: \'Inter\', sans-serif;">\n' +
'                        <span class="text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer">Local</span>\n' +
'                        <span class="text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer">Edge</span>\n' +
'                        <span class="text-xs font-light tracking-widest uppercase text-[#60A5FA] cursor-default">Ring</span>\n' +
'                        <span class="text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer">Core</span>\n' +
'                        <span class="text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer">Cloud</span>\n' +
'                    </div>\n' +
'                </div>\n' +
'\n' +
'            </div>\n' +
'\n' +
'            <!-- Right Column: Media Frame -->\n' +
'            <div class="w-full md:w-[62%] relative bg-transparent overflow-hidden min-h-[400px] md:min-h-0 border-t md:border-t-0 border-white/5 pointer-events-none" style="transform-style: preserve-3d;">\n' +
'                \n' +
'                <!-- Deep Integration Gradients -->\n' +
'                <div class="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-[#030509] via-transparent to-transparent opacity-90"></div>\n' +
'                <div class="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#030509] via-[#030509]/30 to-transparent opacity-80"></div>\n' +
'                \n' +
'                <!-- Glassmorphism Floating Logic Card -->\n' +
'                <div id="floating-card" class="absolute top-[25%] right-[12%] z-40 bg-white/[0.03] backdrop-blur-xl border border-[#60A5FA]/20 p-5 rounded-2xl shadow-[0_22px_40px_rgba(0,0,0,0.4)] w-[220px] text-[#60A5FA] pointer-events-auto">\n' +
'                    <div class="flex items-center gap-3 mb-4">\n' +
'                        <div class="w-8 h-8 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] flex items-center justify-center">\n' +
'                            <iconify-icon icon="solar:transfer-horizontal-linear" stroke-width="1.5"></iconify-icon>\n' +
'                        </div>\n' +
'                        <span class="text-xs uppercase tracking-widest font-light" style="font-family: \'Inter\', sans-serif;">Throughput</span>\n' +
'                    </div>\n' +
'                    <div class="text-3xl leading-9 tracking-tighter mb-1" style="font-family: \'Inter\', sans-serif;">128.6 PB/s</div>\n' +
'                    <div class="text-xs uppercase tracking-widest text-[#60A5FA]/60" style="font-family: \'Inter\', sans-serif;">Sync Efficiency</div>\n' +
'                </div>\n' +
'\n' +
'            </div>\n' +
'        </div>\n' +
'    </div>\n' +
'\n' +
'    <script>\n' +
'        document.addEventListener("DOMContentLoaded", () => {\n' +
'            gsap.registerPlugin(ScrollTrigger);\n' +
'\n' +
'            // --- ASCII Particle System Implementation ---\n' +
'            const canvas = document.getElementById(\'particle-canvas\');\n' +
'            const ctx = canvas.getContext(\'2d\');\n' +
'\n' +
'            let width, height;\n' +
'            let nodes = [];\n' +
'            let beams = [];\n' +
'            const chars = \'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()\'.split(\'\');\n' +
'            const isCompact = () => window.matchMedia(\'(max-width: 767px)\').matches;\n' +
'            let compact = isCompact();\n' +
'            let lastFrame = 0;\n' +
'            let mouse = { x: -1000, y: -1000 };\n' +
'\n' +
'            function resize() {\n' +
'                width = canvas.clientWidth;\n' +
'                height = canvas.clientHeight;\n' +
'                compact = isCompact();\n' +
'                const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5);\n' +
'                canvas.width = width * dpr;\n' +
'                canvas.height = height * dpr;\n' +
'                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n' +
'            }\n' +
'\n' +
'            window.addEventListener(\'resize\', () => {\n' +
'                resize();\n' +
'                initParticles();\n' +
'            });\n' +
'\n' +
'            window.addEventListener(\'mousemove\', e => {\n' +
'                const rect = canvas.getBoundingClientRect();\n' +
'                mouse.x = e.clientX - rect.left;\n' +
'                mouse.y = e.clientY - rect.top;\n' +
'            });\n' +
'            window.addEventListener(\'message\', e => {\n' +
'                if (e.source !== window.parent || !e.data || e.data.type !== \'particle-drift-pointer\') return;\n' +
'                if (e.data.action === \'leave\') {\n' +
'                    mouse.x = -1000;\n' +
'                    mouse.y = -1000;\n' +
'                    return;\n' +
'                }\n' +
'                const rect = canvas.getBoundingClientRect();\n' +
'                mouse.x = e.data.clientX - rect.left;\n' +
'                mouse.y = e.data.clientY - rect.top;\n' +
'            });\n' +
'\n' +
'            function initParticles() {\n' +
'                nodes = Array.from({ length: compact ? 18 : 56 }).map(() => ({\n' +
'                    x: Math.random() * width,\n' +
'                    y: Math.random() * height,\n' +
'                    vy: (Math.random() * 0.4) + 0.1,\n' +
'                    char: chars[Math.floor(Math.random() * chars.length)]\n' +
'                }));\n' +
'\n' +
'                beams = Array.from({ length: compact ? 4 : 16 }).map(() => ({\n' +
'                    x: Math.random() * width,\n' +
'                    y: Math.random() * height,\n' +
'                    length: Math.random() * 100 + 50,\n' +
'                    speed: (Math.random() * 6) + 3,\n' +
'                    opacity: Math.random() * 0.5 + 0.3\n' +
'                }));\n' +
'            }\n' +
'\n' +
'            resize();\n' +
'            initParticles();\n' +
'\n' +
'            function draw(now = performance.now()) {\n' +
'                if (document.hidden) return;\n' +
'                if (now - lastFrame < 1000 / 30) {\n' +
'                    requestAnimationFrame(draw);\n' +
'                    return;\n' +
'                }\n' +
'                lastFrame = now;\n' +
'                ctx.clearRect(0, 0, width, height);\n' +
'\n' +
'                // 1. Upward Beams (Fast)\n' +
'                beams.forEach(b => {\n' +
'                    b.y -= b.speed;\n' +
'                    if (b.y + b.length < 0) {\n' +
'                        b.y = height + 100;\n' +
'                        b.x = Math.random() * width;\n' +
'                    }\n' +
'                    let g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);\n' +
'                    g.addColorStop(0, \'rgba(96, 165, 250, \' + b.opacity + \')\');\n' +
'                    g.addColorStop(1, \'transparent\');\n' +
'                    ctx.strokeStyle = g;\n' +
'                    ctx.lineWidth = 1.5;\n' +
'                    ctx.beginPath();\n' +
'                    ctx.moveTo(b.x, b.y);\n' +
'                    ctx.lineTo(b.x, b.y + b.length);\n' +
'                    ctx.stroke();\n' +
'                });\n' +
'\n' +
'                // 2. Interactive Nodes (ASCII)\n' +
'                ctx.font = \'12px monospace\';\n' +
'                ctx.textAlign = \'center\';\n' +
'                ctx.textBaseline = \'middle\';\n' +
'                \n' +
'                // Proximity Lines\n' +
'                ctx.lineWidth = 0.5;\n' +
'                for(let i = 0; i < nodes.length; i++) {\n' +
'                    let n1 = nodes[i];\n' +
'                    for(let j = i + 1; j < nodes.length; j++) {\n' +
'                        if (compact && j - i > 6) break;\n' +
'                        let n2 = nodes[j];\n' +
'                        let d = Math.hypot(n1.x - n2.x, n1.y - n2.y);\n' +
'                        if(d < 120) {\n' +
'                            ctx.strokeStyle = \'rgba(156, 163, 175, \' + (0.15 * (1 - d/120)) + \')\';\n' +
'                            ctx.beginPath(); \n' +
'                            ctx.moveTo(n1.x, n1.y); \n' +
'                            ctx.lineTo(n2.x, n2.y); \n' +
'                            ctx.stroke();\n' +
'                        }\n' +
'                    }\n' +
'                }\n' +
'\n' +
'                nodes.forEach(n => {\n' +
'                    n.y += n.vy; // Slow drift\n' +
'                    if(n.y > height + 20) {\n' +
'                        n.y = -20;\n' +
'                        n.x = Math.random() * width;\n' +
'                    }\n' +
'\n' +
'                    let dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);\n' +
'\n' +
'                    // Dynamic Character Swap\n' +
'                    if (dist < 180 || Math.random() > 0.98) n.char = chars[Math.floor(Math.random() * chars.length)];\n' +
'\n' +
'                    // Mouse Connection\n' +
'                    if (dist < 180) {\n' +
'                        ctx.strokeStyle = \'rgba(96, 165, 250, \' + (0.5 * (1 - dist/180)) + \')\';\n' +
'                        ctx.beginPath(); \n' +
'                        ctx.moveTo(n.x, n.y); \n' +
'                        ctx.lineTo(mouse.x, mouse.y); \n' +
'                        ctx.stroke();\n' +
'                    }\n' +
'\n' +
'                    ctx.fillStyle = dist < 180 ? \'#60A5FA\' : \'rgba(156, 163, 175, 0.4)\';\n' +
'                    ctx.fillText(n.char, n.x, n.y);\n' +
'                });\n' +
'\n' +
'                requestAnimationFrame(draw);\n' +
'            }\n' +
'            document.addEventListener(\'visibilitychange\', () => {\n' +
'                if (!document.hidden) requestAnimationFrame(draw);\n' +
'            });\n' +
'            draw();\n' +
'\n' +
'            // --- GSAP Timeline Reveals ---\n' +
'            const heading = document.getElementById(\'hero-heading\');\n' +
'            \n' +
'            // Staggered vertical masked word setup\n' +
'            const words = heading.innerHTML.trim().split(/(<br\\s*\\/?>|\\s+)/).filter(w => w.trim().length > 0 || w.toLowerCase().includes(\'<br\'));\n' +
'            let newHTML = \'\';\n' +
'            words.forEach(word => {\n' +
'                if(word.toLowerCase().includes(\'<br\')) {\n' +
'                    newHTML += \'<br/>\';\n' +
'                } else if (word.trim() !== \'\') {\n' +
'                    newHTML += \'<span class="inline-block overflow-hidden align-bottom pb-1 -mb-1"><span class="reveal-word inline-block translate-y-full opacity-0">\' + word + \'</span></span> \';\n' +
'                }\n' +
'            });\n' +
'            heading.innerHTML = newHTML;\n' +
'            heading.style.opacity = 1;\n' +
'\n' +
'            const tl = gsap.timeline({ \n' +
'                scrollTrigger: {\n' +
'                    trigger: heading,\n' +
'                    start: "top 85%"\n' +
'                },\n' +
'                delay: 0.1 \n' +
'            });\n' +
'\n' +
'            tl.to(\'.reveal-word\', {\n' +
'                y: 0,\n' +
'                opacity: 1,\n' +
'                duration: 1.2,\n' +
'                stagger: 0.04,\n' +
'                ease: "power4.out"\n' +
'            }, 0);\n' +
'\n' +
'            tl.to(\'.fade-in-el\', {\n' +
'                opacity: 1,\n' +
'                y: 0,\n' +
'                duration: 1,\n' +
'                stagger: 0.15,\n' +
'                ease: "power3.out"\n' +
'            }, 0.6);\n' +
'\n' +
'            // Canvas Timeline Integration\n' +
'            tl.to(canvas, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0.2);\n' +
'\n' +
'            // Floating Logic independent 3D shifts\n' +
'            gsap.to(\'#floating-card\', {\n' +
'                y: "-=12",\n' +
'                rotationX: 4,\n' +
'                rotationY: -4,\n' +
'                duration: 4,\n' +
'                yoyo: true,\n' +
'                repeat: -1,\n' +
'                ease: "sine.inOut"\n' +
'            });\n' +
'        });\n' +
'    </script>\n' +
'</body>\n' +
'</html>';

const PARTICLE_DRIFT_DEFINITION: EffectDefinition = {
  title: "Particle Drift",
  source: PARTICLE_DRIFT_SOURCE,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_PAPER : "#030509"),
  targets: [{ selector: "#particle-canvas", role: "background" }],
  patch(source, { size, length, density, mode }) {
    const link = Math.round(120 * length);
    const proximityAlpha = mode === "light" ? 0.22 : 0.15;
    let next = source
      .replace(
        "Array.from({ length: compact ? 28 : 90 })",
        `Array.from({ length: compact ? ${scaleCount(28, density, 8)} : ${scaleCount(90, density, 12)} })`,
      )
      .replace(
        "Array.from({ length: compact ? 6 : 25 })",
        `Array.from({ length: compact ? ${scaleCount(6, density, 3)} : ${scaleCount(25, density, 4)} })`,
      )
      .replace(
        "length: Math.random() * 100 + 50,",
        `length: (Math.random() * 100 + 50) * ${length},`,
      )
      .replace(
        "n.y += n.vy; // Slow drift",
        "n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift",
      )
      .replace(
        "b.y -= b.speed;",
        "b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      )
      .replace("if(d < 120) {", `if(d < ${link}) {`)
      .replace("0.15 * (1 - d/120)", `${proximityAlpha} * (1 - d/${link})`)
      .replace(
        "ctx.lineWidth = 1.5;",
        `ctx.lineWidth = ${Number((1.5 * size).toFixed(2))};`,
      );
    if (mode === "light") {
      next = next
        .replaceAll("rgba(96, 165, 250,", "rgba(37, 99, 235,")
        .replaceAll("rgba(156, 163, 175,", "rgba(36, 48, 68,")
        .replace(
          "ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(36, 48, 68, 0.4)';",
          "ctx.fillStyle = dist < 180 ? '#2563EB' : 'rgba(36, 48, 68, 0.55)';",
        );
    }
    return next;
  },
};

function buildFocusedDocument(
  definition: EffectDefinition,
  knobs: BakeKnobs & {
    speed: number;
    opacity: number;
  },
) {
  const mode = knobs.mode;
  const background = resolveBackground(definition.background, mode);
  const targetJson = JSON.stringify(definition.targets).replace(
    /</g,
    "\\u003c",
  );
  const controlsJson = JSON.stringify({
    mode,
    speed: knobs.speed,
    size: knobs.size,
    gap: knobs.gap,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    opacity: knobs.opacity,
  }).replace(/</g, "\\u003c");
  const patchedSource = definition.patch
    ? definition.patch(definition.source, {
        size: knobs.size,
        gap: knobs.gap,
        length: knobs.length,
        density: knobs.density,
        strokeWidth: knobs.strokeWidth,
        mode,
      })
    : definition.source;
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
${definition.focusCss ?? ""}
</style>`;
  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener("load", isolate, { once: true });
})();
</script>`;
  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export default function ParticleDrift({
  mode,
  speed = PARTICLE_DRIFT_DEFAULTS.speed,
  size = PARTICLE_DRIFT_DEFAULTS.size,
  gap = PARTICLE_DRIFT_DEFAULTS.gap,
  length = PARTICLE_DRIFT_DEFAULTS.length,
  density = PARTICLE_DRIFT_DEFAULTS.density,
  strokeWidth = PARTICLE_DRIFT_DEFAULTS.strokeWidth,
  opacity = PARTICLE_DRIFT_DEFAULTS.opacity,
  hue = PARTICLE_DRIFT_DEFAULTS.hue,
  saturation = PARTICLE_DRIFT_DEFAULTS.saturation,
  brightness = PARTICLE_DRIFT_DEFAULTS.brightness,
  className,
  style,
}: ParticleDriftProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const requestedMode =
    mode ??
    PARTICLE_DRIFT_DEFINITION.defaultMode ??
    PARTICLE_DRIFT_DEFAULTS.mode;
  const automaticMode = useAutomaticMode(requestedMode === "auto");
  const resolvedMode =
    requestedMode === "auto"
      ? automaticMode
      : resolveMode(requestedMode, PARTICLE_DRIFT_DEFAULTS.mode);
  const background = resolveBackground(
    PARTICLE_DRIFT_DEFINITION.background,
    resolvedMode,
  );
  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeGap = clamp(gap, 0, 64);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 8);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  // Rebuild when baked geometry/mode knobs change. Speed/opacity stay live via postMessage + time wrap.
  const source = useMemo(
    () =>
      buildFocusedDocument(PARTICLE_DRIFT_DEFINITION, {
        mode: resolvedMode,
        speed: PARTICLE_DRIFT_DEFAULTS.speed,
        size: safeSize,
        gap: safeGap,
        length: safeLength,
        density: safeDensity,
        strokeWidth: safeStrokeWidth,
        opacity: PARTICLE_DRIFT_DEFAULTS.opacity,
      }),
    [resolvedMode, safeDensity, safeGap, safeLength, safeSize, safeStrokeWidth],
  );

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: resolvedMode,
          speed: safeSpeed,
          size: safeSize,
          gap: safeGap,
          length: safeLength,
          density: safeDensity,
          strokeWidth: safeStrokeWidth,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [
    resolvedMode,
    safeDensity,
    safeGap,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
    safeStrokeWidth,
    source,
  ]);

  useEffect(() => {
    let pointerFrame = 0;
    let latestPointer: PointerEvent | null = null;
    const sendPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      latestPointer = event;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!latestPointer) return;
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "particle-drift-pointer",
            clientX: latestPointer.clientX,
            clientY: latestPointer.clientY,
          },
          "*",
        );
      });
    };
    const resetPointer = () => {
      latestPointer = null;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      iframeRef.current?.contentWindow?.postMessage(
        { type: "particle-drift-pointer", action: "leave" },
        "*",
      );
    };

    window.addEventListener("pointermove", sendPointer, { passive: true });
    document.addEventListener("pointerleave", resetPointer);
    return () => {
      window.removeEventListener("pointermove", sendPointer);
      document.removeEventListener("pointerleave", resetPointer);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title={PARTICLE_DRIFT_DEFINITION.title}
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
        ...style,
      }}
    />
  );
}