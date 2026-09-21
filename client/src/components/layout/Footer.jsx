import { PROFILE } from "../../data/constants.js";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>Built with React · Node · MongoDB</span>
        <a className="u-link w-fit" href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
