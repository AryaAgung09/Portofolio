import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaFileWord } from "react-icons/fa6";
import {
  SiDiagramsdotnet,
  SiFigma,
  SiGit,
  SiFlutter,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

/**
 * Peta ikon teknologi. Kunci string dipakai di data/portfolio.ts
 * agar data profil tidak mengimpor komponen ikon.
 */
const techIcons: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  flutter: SiFlutter,
  laravel: SiLaravel,
  php: SiPhp,
  node: SiNodedotjs,
  python: SiPython,
  mysql: SiMysql,
  prisma: SiPrisma,
  git: SiGit,
  figma: SiFigma,
  vercel: SiVercel,
  word: FaFileWord,
  drawio: SiDiagramsdotnet,
  vscode: VscVscode,
};

type TechIconProps = {
  name: string;
  className?: string;
  color?: string;
  style?: CSSProperties;
};

export default function TechIcon({
  name,
  className,
  color,
  style,
}: TechIconProps) {
  if (name === "word") {
    return (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 64 64"
        className={className}
        style={{ color, ...style }}
      >
        <defs>
          <linearGradient id="word-tile" x1="13" y1="8" x2="53" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#52D6EF" />
            <stop offset=".48" stopColor="#1689E8" />
            <stop offset="1" stopColor="#1554E8" />
          </linearGradient>
          <linearGradient id="word-panel" x1="30" y1="28" x2="55" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0876E8" />
            <stop offset="1" stopColor="#123EBB" />
          </linearGradient>
          <linearGradient id="word-badge" x1="4" y1="33" x2="26" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3687F5" />
            <stop offset="1" stopColor="#123BAA" />
          </linearGradient>
        </defs>
        <rect x="11" y="2" width="51" height="60" rx="12" fill="url(#word-tile)" />
        <path d="M11 27h39c6.627 0 12 5.373 12 12v11H23c-6.627 0-12-5.373-12-12V27Z" fill="url(#word-panel)" />
        <rect x="2" y="31" width="31" height="31" rx="7" fill="url(#word-badge)" />
        <path
          d="M8 37h5.2l2.2 14.1L18.6 37h5.2l3.2 20h-5.1l-1.6-12.5L17.6 57h-4.1l-2.7-12.5L9.1 57H4.4L8 37Z"
          fill="white"
        />
      </svg>
    );
  }

  if (name === "excel") {
    return (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 64 64"
        className={className}
        style={{ color, ...style }}
      >
        <defs>
          <linearGradient id="excel-tile" x1="13" y1="8" x2="53" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#91E85B" />
            <stop offset=".48" stopColor="#37B34A" />
            <stop offset="1" stopColor="#13833B" />
          </linearGradient>
          <linearGradient id="excel-panel" x1="30" y1="28" x2="57" y2="61" gradientUnits="userSpaceOnUse">
            <stop stopColor="#087A35" />
            <stop offset="1" stopColor="#075C2C" />
          </linearGradient>
          <linearGradient id="excel-badge" x1="4" y1="33" x2="26" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#20A568" />
            <stop offset="1" stopColor="#086543" />
          </linearGradient>
        </defs>
        <rect x="11" y="2" width="51" height="60" rx="12" fill="url(#excel-tile)" />
        <path d="M37 2h24c.6 0 1 .4 1 1v18c0 6.627-5.373 12-12 12H37V2Z" fill="#8BE65C" />
        <path d="M11 27h39c6.627 0 12 5.373 12 12v11H23c-6.627 0-12-5.373-12-12V27Z" fill="url(#excel-panel)" />
        <rect x="2" y="31" width="31" height="31" rx="7" fill="url(#excel-badge)" />
        <path
          d="M9 37h6l3.1 5.8 3.2-5.8h5.5l-5.6 9.5 5.9 10.5h-6l-3.3-6.4-3.5 6.4H8.5l6-10.2L9 37Z"
          fill="white"
        />
      </svg>
    );
  }

  if (name === "canva") {
    return (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 64 64"
        className={className}
        style={{ color, ...style }}
      >
        <path
          d="M0 16C0 7.163 7.163 0 16 0h32c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16Z"
          fill="url(#canva-gradient)"
        />
        <defs>
          <linearGradient
            id="canva-gradient"
            x1="4"
            y1="8"
            x2="58"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00C4CC" />
            <stop offset=".52" stopColor="#3286E8" />
            <stop offset="1" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fill="white"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="24"
          fontStyle="italic"
          fontWeight="600"
          letterSpacing="-1.7"
        >
          Canva
        </text>
      </svg>
    );
  }

  const Icon = techIcons[name];

  if (!Icon) {
    return (
      <span
        aria-hidden
        className={className}
        style={{
          display: "inline-block",
          width: "1em",
          height: "1em",
          borderRadius: "0.2em",
          background: "currentColor",
          opacity: 0.4,
        }}
      />
    );
  }

  return (
    <Icon
      aria-hidden
      focusable={false}
      className={className}
      style={{ color, ...style }}
    />
  );
}
