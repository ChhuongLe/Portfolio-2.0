import Image from "next/image";
import TerminalOutput from "./TerminalOutput";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <Image
        src="/portfolio-avatar.png"
        alt="Chhuong Le"
        width={112}
        height={112}
        priority
        className="mb-8 h-28 w-28 rounded-full border border-hairline object-cover"
      />
      <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-ivory">
        Chhuong Le
      </h1>
      <div className="mt-8 w-full max-w-md overflow-hidden rounded-xl border border-hairline bg-ink-raised text-left shadow-2xl shadow-black/40">
        <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-muted">zsh</span>
        </div>
        <div className="px-4 py-4 font-mono text-sm sm:text-base">
          <p>
            <span className="text-accent">chhuong</span>
            <span className="text-muted">@neuralink ~ % </span>
            <span className="text-ivory">whoami</span>
          </p>
          <TerminalOutput />
        </div>
      </div>
    </section>
  );
}
