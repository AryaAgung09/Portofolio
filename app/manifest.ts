import type { MetadataRoute } from "next";
import { profile, site } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portofolio`,
    short_name: profile.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#08090b",
    lang: "id",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
