import {
  Clock,
  Compass,
  MessageCircle,
  Puzzle,
  RefreshCw,
  Users,
  type LucideIcon,
} from "lucide-react";
import { softSkills, type SoftSkill } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const iconMap: Record<SoftSkill["icon"], LucideIcon> = {
  message: MessageCircle,
  users: Users,
  puzzle: Puzzle,
  clock: Clock,
  compass: Compass,
  refresh: RefreshCw,
};

export default function SoftSkills() {
  return (
    <section
      id="soft-skills"
      className="scroll-mt-24 border-y border-border bg-surface/35 py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="03"
            label="Cara kerja"
            title={
              <>
                Yang saya bawa
                <br />
                <span className="text-muted">selain stack.</span>
              </>
            }
            description="Teknologi bisa dipelajari dalam hitungan minggu. Cara berpikir dan bekerja dengan orang lain adalah yang membuat sebuah proyek sampai ke garis akhir."
          />

          
        </div>

        <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {softSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon];

            return (
              <Reveal key={skill.title} delay={(index % 2) * 0.06} amount={0.3}>
                <li className="group border-t border-border py-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 pl-11 text-sm leading-6 text-muted">
                    {skill.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
