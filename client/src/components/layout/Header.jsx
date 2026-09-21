import { useState } from "react";
import { PROFILE } from "../../data/constants.js";

const links = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Contact", "#contact"]
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
      <a href="#top" className="font-mono text-xs font-bold tracking-[0.18em] uppercase">
        SS<span className="text-rust">.</span>
      </a>

      <nav className="hidden items-center gap-2 md:flex">
        {links.map(([label, href]) => (
          <a key={href} className="nav-pill" href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a className="btn-ink hidden sm:inline-flex" href={`mailto:${PROFILE.email}`}>
        Let's talk <span aria-hidden>↗</span>
      </a>

      <button
        className="inline-flex h-10 w-10 items-center justify-center border border-ink/15 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="space-y-1.5">
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </span>
      </button>

      {open && (
        <div className="absolute left-5 right-5 top-20 border border-ink/10 bg-paper p-3 shadow-lg md:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/10 px-3 py-4 font-mono text-xs uppercase tracking-widest last:border-0"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
