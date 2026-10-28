import { profile, site, socials } from "@/data/portfolio";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SectionIndicator from "@/components/layout/SectionIndicator";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import SoftSkills from "@/components/sections/SoftSkills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";

const marqueeItems = [
  "TypeScript",
  "Next.js",
  "React",
  "Laravel",
  "PostgreSQL",
  "Tailwind CSS",
  "Node.js",
  "GSAP",
  "Framer Motion",
  "Prisma",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Full-stack Developer",
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Batam",
    addressRegion: "Kepulauan Riau",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.university,
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Laravel",
    "PostgreSQL",
    "Software Engineering",
  ],
  sameAs: socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollProgress />
      <Navbar />
      <SectionIndicator />

      <main id="konten" className="relative">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Skills />
        <SoftSkills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
