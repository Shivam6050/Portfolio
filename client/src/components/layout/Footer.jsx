import { PROFILE } from "../../data/constants.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div><strong>{PROFILE.name}</strong><span>{PROFILE.title}</span></div><div className="footer-links"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${PROFILE.email}`}>Email ↗</a></div>
        <a className="u-link w-fit" href="#top">Back to top ↑</a>
      </div>
      <div className="section-shell artist-credit">
        <a className="artist-signature" href="https://github.com/Shivam6050/Portfolio" target="_blank" rel="noreferrer" aria-label="Shivam Sagar — original portfolio repository">
          <span className="artist-signature-name">Shivam Sagar<span className="artist-signature-dot">.</span></span>
          <svg viewBox="0 0 240 24" aria-hidden="true" focusable="false"><path d="M8 16C60 5 135 3 225 8M155 6l-18 15 51-12" /></svg>
        </a>
        <div className="artist-credit-copy">
          <p>A personal creation by {PROFILE.name}.</p>
          <a href="/authorship.txt">© 2026 {PROFILE.name} · Authorship &amp; rights ↗</a>
        </div>
      </div>
    </footer>
  );
}
