import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import { socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function SocialIcon({
  icon,
  className,
}: {
  icon: (typeof socials)[number]["icon"];
  className?: string;
}) {
  switch (icon) {
    case "github":
      return <SiGithub aria-hidden className={className} />;
    case "linkedin":
      return <FaLinkedin aria-hidden className={className} />;
    case "instagram":
      return <SiInstagram aria-hidden className={className} />;
    case "mail":
      return <Mail aria-hidden className={className} />;
  }
}

type SocialLinksProps = {
  className?: string;
  /** Tampilan di atas bidang lime (kontak). */
  inverted?: boolean;
  /** Ukuran tombol. */
  size?: "sm" | "md";
};

export default function SocialLinks({
  className,
  inverted = false,
  size = "md",
}: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {socials.map((social) => {
        const external = social.href.startsWith("http");

        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "group inline-flex items-center justify-center rounded-full border transition-all duration-300",
                size === "md" ? "h-11 w-11" : "h-9 w-9",
                inverted
                  ? "border-black/20 text-black/70 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-accent"
                  : "border-border bg-surface/50 text-muted-strong hover:-translate-y-0.5 hover:border-accent/70 hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <SocialIcon
                icon={social.icon}
                className={size === "md" ? "h-[18px] w-[18px]" : "h-4 w-4"}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
