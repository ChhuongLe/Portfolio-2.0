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
            I have been cracking open computers since I was a kid &mdash; not
            because anything was broken, just to see what was inside. That
            same &ldquo;let me take this apart&rdquo; energy turned into a career:
            these days I am an IT Systems Engineer architecting virtualized
            environments, locking things down with zero-trust security, and
            automating away anything I have had to do twice. Give me a
            misbehaving server stack or a bare-metal kernel config that hates
            me, and I am genuinely happy.
          </p>
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-lg leading-relaxed text-muted">
            Off the clock I am probably at the gym adding another plate to the
            bar, because progressive overload works on servers and squats
            alike. I live in the East Bay with my soon-to-be wife and two
            cats who each believe they run the household &mdash; and honestly,
            the data backs them up.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
