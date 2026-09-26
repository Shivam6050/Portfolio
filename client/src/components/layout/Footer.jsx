/**
 * Contact links and artist attribution. Signature text/flourish are here; appearance is under .artist-* in index.css. Update COPYRIGHT.txt and public/authorship.txt together when changing attribution. This is not copy protection.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import PROFILE from ../../data/constants.js; edit that module for the shared implementation. */
import { PROFILE } from "../../data/constants.js";

/* Contact links and artist attribution. Signature text/flourish are here; appearance is under .artist-* in index.css. Update COPYRIGHT.txt and public/authorship.txt together when changing attribution. This is not copy protection. */
export default function Footer() {
  return (
    /* Render footer with styling hook site-footer. Change its content binding for copy, classes/CSS for layout. */
    <footer className="site-footer">
      {/* Render div with styling hook section-shell footer-inner. Change its content binding for copy, classes/CSS for layout. */}<div className="section-shell footer-inner">
        {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div><strong>{PROFILE.name}</strong><span>{PROFILE.title}</span></div><div className="footer-links"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${PROFILE.email}`}>Email ↗</a></div>
        {/* Link destination: #top. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="u-link w-fit" href="#top">Back to top ↑</a>
      </div>
      {/* Render div with styling hook section-shell artist-credit. Change its content binding for copy, classes/CSS for layout. */}<div className="section-shell artist-credit">
        {/* Link destination: https://github.com/Shivam6050/Portfolio. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="artist-signature" href="https://github.com/Shivam6050/Portfolio" target="_blank" rel="noreferrer" aria-label="Shivam Sagar — original portfolio repository">
          {/* Render span with styling hook artist-signature-name. Change its content binding for copy, classes/CSS for layout. */}<span className="artist-signature-name">Shivam Sagar<span className="artist-signature-dot">.</span></span>
          {/* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. Decorative: omitted from the accessibility tree. */}<svg viewBox="0 0 240 24" aria-hidden="true" focusable="false"><path d="M8 16C60 5 135 3 225 8M155 6l-18 15 51-12" /></svg>
        </a>
        {/* Render div with styling hook artist-credit-copy. Change its content binding for copy, classes/CSS for layout. */}<div className="artist-credit-copy">
          {/* Render p for this content group. Change its content binding for copy, classes/CSS for layout. */}<p>A personal creation by {PROFILE.name}.</p>
          {/* Link destination: /authorship.txt. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a href="/authorship.txt">© 2026 {PROFILE.name} · Authorship &amp; rights ↗</a>
        </div>
      </div>
    </footer>
  );
}
