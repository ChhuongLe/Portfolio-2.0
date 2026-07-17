import { experience } from "@/data/experience";
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
            <li
              key={`${entry.role}-${entry.start}-${index}`}
              className="flex flex-col gap-1 border-t border-hairline py-6 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <p className="text-ivory">
                {entry.role}
                {entry.company && (
                  <span className="text-muted"> — {entry.company}</span>
                )}
              </p>
              <p className="whitespace-nowrap text-sm text-muted">
                {entry.start} – {entry.end}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
