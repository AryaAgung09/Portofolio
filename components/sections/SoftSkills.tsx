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
      className="scroll-mt-24 border-y border-border bg-surface/35 py-12 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16 lg:px-10">
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

        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 sm:gap-x-10 sm:gap-y-2">
          {softSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon];

            return (
              <Reveal key={skill.title} delay={(index % 2) * 0.06} amount={0.3}>
                <li className="group h-full border-t border-border py-4 sm:py-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground sm:h-8 sm:w-8">
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                    </span>
                    <h3 className="text-sm font-medium tracking-tight text-foreground sm:text-lg">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted sm:mt-2.5 sm:pl-11 sm:text-sm sm:leading-6">
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
