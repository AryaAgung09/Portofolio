import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

/**
 * Peta ikon teknologi. Kunci string dipakai di data/portfolio.ts
 * supaya file data tetap bebas dari import komponen.
 */
const techIcons: Record<string, IconType> = {
  html5: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  laravel: SiLaravel,
  php: SiPhp,
  node: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  rest: TbApi,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  mongodb: SiMongodb,
  git: SiGit,
  docker: SiDocker,
  figma: SiFigma,
  vercel: SiVercel,
  linux: SiLinux,
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
