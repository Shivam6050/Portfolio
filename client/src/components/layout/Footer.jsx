import { PROFILE } from "../../data/constants.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div><strong>{PROFILE.name}</strong><span>{PROFILE.title}</span></div><div className="footer-links"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${PROFILE.email}`}>Email ↗</a></div>
        <a className="u-link w-fit" href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
