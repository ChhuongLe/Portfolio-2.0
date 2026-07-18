const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline/60 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm sm:px-6">
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap font-medium tracking-tight text-ivory"
        >
          Chhuong Le
        </a>
        <ul className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
          {links.map((link) => (
            <li key={link.href} className="whitespace-nowrap">
              <a
                href={link.href}
                className="text-muted transition-colors hover:text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
