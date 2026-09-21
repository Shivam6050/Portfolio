import { useEffect, useState } from "react";
import { PROFILE } from "../../data/constants.js";
import { useApp } from "../../context/AppContext.jsx";
import FlyRankLogo from "../logos/FlyRankLogo.jsx";
import GfGLogo from "../logos/GfGLogo.jsx";
import Logo from "../ui/Logo.jsx";

export default function Hero() {
  const { stats, error } = useApp();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="section-shell pb-20 pt-10 sm:pb-28 sm:pt-16 lg:pb-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
        <div>
          <p className="sec-num">01 / introduction</p>
          <p className="mb-5 max-w-xl font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Full Stack Developer · Backend & AI Engineering
          </p>
          <h1 className="hero-title">
            <span className="hero-name hero-name-1">Shivam</span>
            <span className="hero-name hero-name-2">Sagar<span className="text-rust">.</span></span>
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-base leading-7 text-muted sm:text-lg">
            {PROFILE.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-ink" href="#work">View selected work ↘</a>
            <a className="tag" href={`mailto:${PROFILE.email}`}>Available for conversations</a>
          </div>
        </div>

        <aside className="border-l border-ink/10 pl-5 lg:mb-2">
          <div className="mb-7 flex items-center gap-3">
            <FlyRankLogo size={52} />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Recent experience</p>
              <p className="font-serif text-xl italic">FlyRank AI</p>
              <p className="font-mono text-[9px] text-muted">Backend AI Engineering</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-y border-ink/10 py-5">
            <GfGLogo size={34} />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">MERN · full stack</span>
            {["react", "nodedotjs", "mongodb"].map((name) => (
              <Logo key={name} name={name} label={name} size={22} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 font-mono text-[9px] uppercase tracking-widest text-muted">
            <div>
              <span className="block text-ink">IST {time || "--:--:--"}</span>
              live local time
            </div>
            <div>
              <span className="block text-ink">{Number(stats.views || 0).toLocaleString("en-IN")}</span>
              portfolio views
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
            <span className={`api-status-dot ${error ? "bg-rust" : "bg-moss"}`} />
            <span>{error ? "API offline" : "API connected"}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
