import { profile, stats } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProfileCard from "@/components/ui/ProfileCard";

export default function About() {
  return (
    <section id="tentang" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          {/* Kartu identitas */}
          <Reveal direction="left">
            <ProfileCard
              name={profile.name}
              title="Software Engineer"
              handle="AryaAgung09"
              status="Terbuka untuk kolaborasi"
              contactText="Hubungi"
              contactHref={`mailto:${profile.email}`}
              avatarUrl={profile.photo}
              avatarAlt={profile.photoAlt}
              holo={0.8}
              glare={0.5}
              tiltStrength={24}
              parallax={12}
              radius={16}
              enableTilt
              intro
              showUserInfo
              enableMobileTilt={false}
              theme="dark"
            />
          </Reveal>

          {/* Narasi */}
          <div>
            <Reveal direction="right">
              <p className="max-w-2xl text-xl leading-8 tracking-tight text-foreground sm:text-[1.35rem] sm:leading-9">
                Saya {profile.shortName}, mahasiswa {profile.major} di{" "}
                {profile.university}. Saya memiliki ketertarikan dalam pengembangan perangkat lunak, khususnya web development..
              </p>
            </Reveal>

            <div className="mt-7 space-y-5">
              {profile.bio.map((paragraph, index) => (
                <Reveal
                  key={paragraph.slice(0, 24)}
                  direction="right"
                  delay={0.06 + index * 0.05}
                >
                  <p className="max-w-2xl text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

         

            {/* Statistik */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06} amount={0.4}>
                  <div className="group h-full rounded-2xl border border-border bg-surface/50 p-4 transition-colors duration-300 hover:border-accent/40">
                    <p className="flex items-baseline text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-[2.1rem]">
                      <AnimatedCounter
                        value={stat.value}
                        decimals={stat.decimals ?? 0}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium text-muted-strong">
                      {stat.label}
                    </p>
                    {stat.note ? (
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                        {stat.note}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
