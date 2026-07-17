import Image from "next/image";

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
      <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
        IT Systems Engineer @ Neuralink
      </p>
    </section>
  );
}
