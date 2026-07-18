import { experience } from "@/data/experience";
import ExperienceItem from "./ExperienceItem";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-ivory">
            Experience
          </h2>
        </Reveal>
        <ul className="mt-6">
          {experience.map((entry, index) => (
            <ExperienceItem
              key={`${entry.role}-${entry.start}-${index}`}
              entry={entry}
              delay={index * 60}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
