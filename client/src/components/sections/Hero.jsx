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
    <section id="top" className="section-shell hero-section">
      <div className="hero-grid">
        <div className="hero-main">
          <div className="hero-kicker"><span className="eyebrow"><i /> Available for conversations</span><span>India · IST</span></div>
          <p className="sec-num">01 / introduction</p>
          <p className="hero-role">
            Full Stack Developer · Backend & AI Engineering
          </p>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <h1 className="hero-title">
                <span className="hero-name hero-name-1">Shivam</span>
                <span className="hero-name hero-name-2">Sagar<span className="text-rust">.</span></span>
              </h1>
            </div>
            <div className="profile-frame">
              <div className="profile-photo"><img src={PROFILE.photo} alt="Portrait of Shivam Sagar" /></div><div className="profile-caption"><span>SHIVAM / SS</span><span>PROFILE</span></div>
            </div>
          </div>
          <div className="hero-bottom"><p className="hero-summary">
            {PROFILE.summary}
          </p><div className="hero-actions">
            <a className="btn-ink" href="#work">View selected work ↘</a>
            <a className="tag" href={`mailto:${PROFILE.email}`}>Available for conversations</a>
          </div></div>
        </div>

        <aside className="hero-aside">
          <div className="aside-label">Current profile</div><div className="experience-signal">
            <FlyRankLogo size={52} />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Recent experience</p>
              <p className="font-serif text-xl italic">FlyRank AI</p>
              <p className="font-mono text-[9px] text-muted">Backend AI Engineering</p>
            </div>
          </div>

          <div className="experience-signal secondary">
            <GfGLogo size={34} />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">MERN · full stack</span>
            {["react", "nodedotjs", "mongodb"].map((name) => (
              <Logo key={name} name={name} label={name} size={22} />
            ))}
          </div>

          <div className="aside-metrics">
            <div>
              <span className="block text-ink">IST {time || "--:--:--"}</span>
              live local time
            </div>
            <div>
              <span className="block text-ink">{Number(stats.views || 0).toLocaleString("en-IN")}</span>
              portfolio views
            </div>
          </div>

          <div className="proof-row">
            <span>Public work &amp; source</span><a href={PROFILE.github} target="_blank" rel="noreferrer">↗</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
