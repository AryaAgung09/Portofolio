import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Geist } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { profile, site } from "@/data/portfolio";
import ParticleDrift from "@/components/ui/particle-drift";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.shortName}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: `${profile.name} — Portofolio`,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#08090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(spaceGrotesk.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <noscript>
          {/* Tanpa JavaScript, semua konten tetap terlihat. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain min-h-svh bg-background text-foreground antialiased">
        <ParticleDrift
          mode="auto"
          speed={1}
          size={1}
          gap={2}
          length={1}
          density={1}
          strokeWidth={1}
          opacity={1}
          className="fixed inset-0 z-0 pointer-events-none"
        />
        <Providers>
          <a href="#konten" className="skip-link">
            Lewati ke konten
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
