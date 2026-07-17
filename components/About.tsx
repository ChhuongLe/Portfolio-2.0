import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-ink-raised px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-ivory">
            About
          </h2>
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-lg leading-relaxed text-muted">
            As an IT Systems Engineer with a background in software development, I
            specialize in building resilient, automated infrastructure and
            high-performance endpoint solutions. I thrive on architecting complex
            virtualized environments, implementing zero-trust security frameworks,
            and streamlining workflows through custom parametric engineering.
            Whether I am optimizing enterprise-grade server stacks or debugging
            bare-metal kernel configurations, I am driven by a passion for solving
            intricate technical challenges and building scalable, self-hosted
            systems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
