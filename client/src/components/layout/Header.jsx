import { useState } from "react";
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";

const links = PORTFOLIO_CONFIG.navigation;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a href="#top" className="brand-mark" aria-label="Shivam Sagar — home">
          <span className="brand-mark-glass" aria-hidden="true">
            <img
              src="/assets/portfolio-logo.png"
              alt=""
              className="portfolio-logo"
            />
          </span>
          <span className="brand-mark-word">
            SHIVAM<span>.</span>
          </span>
        </a>

        <nav className="desktop-nav hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => (
            <a key={href} className="nav-pill" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="header-github"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="btn-ink hidden sm:inline-flex"
            href={`mailto:${PROFILE.email}`}
          >
            Let's talk <span aria-hidden>↗</span>
          </a>
        </div>

        <button
          className="mobile-menu-button inline-flex h-10 w-10 items-center justify-center border border-ink/15 md:hidden"
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
          <div className="mobile-menu absolute left-5 right-5 top-20 border border-ink/10 bg-paper p-3 shadow-lg md:hidden">
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
      </div>
    </header>
  );
}
