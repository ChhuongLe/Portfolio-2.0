const links = [
  { label: "Email", href: "mailto:chhuongcle@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/chhuongle" },
  { label: "GitHub", href: "https://github.com/ChhuongLe" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-ivory">
          Get in touch
        </h2>
        <p className="mt-4 text-muted">Come speak geek with me</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-accent underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
