"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { useIntroFinished } from "@/components/providers/Providers";
import SocialLinks from "@/components/ui/SocialLinks";
import Typewriter from "./hero/Typewriter";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
});

export default function Hero() {
  const introFinished = useIntroFinished();

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-10 pt-20 sm:pt-24 lg:block lg:pb-16 lg:pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={
          introFinished
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 36, scale: 0.96 }
        }
        transition={{ duration: 0.48, ease: EASE_OUT }}
        className="relative z-10 h-[clamp(220px,32svh,300px)] w-full max-w-[360px] shrink-0 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-0 lg:h-full lg:max-w-none"
      >
        {introFinished ? (
          <Lanyard
            frontImage={profile.photo}
            imageFit="contain"
            size={0.5}
            anchor="right"
            strapColor="#17191d"
            strapWidth={0.7}
            strapLength={0.42}
            breeze={0.12}
            metal="silver"
            finish="glossy"
            interactive
            className="pointer-events-auto h-full w-full"
          />
        ) : null}
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-2 px-5 sm:px-8 lg:pointer-events-none lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative z-10 flex origin-center flex-col items-center justify-center py-5 text-center sm:py-7 lg:pointer-events-auto lg:-translate-x-8 lg:-translate-y-3 lg:origin-left lg:scale-[0.92] lg:items-start lg:py-0 lg:text-left"
        >
          <h1 className="mx-auto max-w-[680px] text-balance text-[clamp(2rem,8.5vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-[clamp(2.8rem,6.1vw,5.4rem)] lg:mx-0">
            Halo, saya{" "}
            <span className="text-accent-ink">{profile.shortName}</span>
            <span className="block">Agung Setiawan</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
            className="mt-5 flex min-h-[30px] items-baseline justify-center gap-3 lg:justify-start"
          >
            <Typewriter
              words={profile.roles}
              className="text-lg font-medium tracking-tight text-accent-ink sm:text-xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT }}
            className="mt-6 max-w-[570px] text-base leading-7 text-muted-strong sm:text-lg sm:leading-8"
          >
            {profile.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#proyek"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Lihat proyek
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/5"
            >
              Hubungi saya
              <Send className="h-3.5 w-3.5" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48, ease: EASE_OUT }}
            className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
          >
            <span className="text-xs font-semibold tracking-[0.12em] text-muted">
              TEMUKAN SAYA
            </span>
            <SocialLinks size="sm" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
