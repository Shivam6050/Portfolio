/**
 * Desktop/mobile navigation. Edit PORTFOLIO_CONFIG.navigation for labels and destinations; anchors must match section IDs. CSS also overrides navigation at 768-900px. Preserve expanded/controls attributes and Escape handling.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useState } from "react";
/* Import PROFILE, PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";

/* Ordered navigation label/anchor pairs from PORTFOLIO_CONFIG. */
const links = PORTFOLIO_CONFIG.navigation;

/* Desktop/mobile navigation. Edit PORTFOLIO_CONFIG.navigation for labels and destinations; anchors must match section IDs. CSS also overrides navigation at 768-900px. Preserve expanded/controls attributes and Escape handling. */
export default function Header() {
  /* Local mobile-menu visibility state; link clicks and Escape reset it. */
  const [open, setOpen] = useState(false);

  return (
    /* Render header with styling hook site-header. Change its content binding for copy, classes/CSS for layout. */
    <header className="site-header">
      {/* Render div with styling hook section-shell header-inner. Change its content binding for copy, classes/CSS for layout. */}<div className="section-shell header-inner">
        {/* Link destination: #top. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a href="#top" className="brand-mark" aria-label="Shivam Sagar — home">
          {/* Render span with styling hook brand-mark-word. Change its content binding for copy, classes/CSS for layout. */}<span className="brand-mark-word">
            SHIVAM{/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>.</span>
          </span>
        </a>

        {/* Navigation landmark; ID/label must match the mobile toggle aria-controls when applicable. */}<nav className="desktop-nav hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => (
            /* Link destination: href. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */
            <a key={href} className="nav-pill" href={href}>
              {label}
            </a>
          ))}
        </nav>

        {/* Render div with styling hook header-actions. Change its content binding for copy, classes/CSS for layout. */}<div className="header-actions">
          {/* Link destination: PROFILE.github. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a
            className="header-github"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          {/* Link destination: `mailto:${PROFILE.email}`. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a
            className="btn-ink hidden sm:inline-flex"
            href={`mailto:${PROFILE.email}`}
          >
            Let's talk {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span aria-hidden>↗</span>
          </a>
        </div>

        {/* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */}<button
          className="mobile-menu-button inline-flex h-10 w-10 items-center justify-center border border-ink/15 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onKeyDown={(event) => { /* Guard: event.key === "Escape". Run the following branch only when true; preserve early returns when modifying this flow. */ if (event.key === "Escape") setOpen(false); }}
          onClick={() => setOpen((value) => !value)}
        >
          {/* Render span with styling hook space-y-1.5. Change its content binding for copy, classes/CSS for layout. */}<span className="space-y-1.5">
            {/* Render span with styling hook block h-px w-5 bg-ink. Change its content binding for copy, classes/CSS for layout. */}<span className="block h-px w-5 bg-ink" />
            {/* Render span with styling hook block h-px w-5 bg-ink. Change its content binding for copy, classes/CSS for layout. */}<span className="block h-px w-5 bg-ink" />
          </span>
        </button>

        {open && (
          /* Navigation landmark; ID/label must match the mobile toggle aria-controls when applicable. */
          <nav id="mobile-navigation" aria-label="Mobile navigation" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} className="mobile-menu absolute left-5 right-5 top-20 border border-ink/10 bg-paper p-3 shadow-lg md:hidden">
            {links.map(([label, href]) => (
              /* Link destination: href. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b border-ink/10 px-3 py-4 font-mono text-xs uppercase tracking-widest last:border-0"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
