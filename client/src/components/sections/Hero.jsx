import { useEffect, useState } from "react";
import { PROFILE } from "../../data/constants.js";
import { useApp } from "../../context/AppContext.jsx";
import FlyRankLogo from "../logos/FlyRankLogo.jsx";
import GfGLogo from "../logos/GfGLogo.jsx";
import Logo from "../ui/Logo.jsx";

export default function Hero() {
  const { stats } = useApp();
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
    <section id="top" className="hero-section">
      <div className="hero-container">
        <div className="hero-kicker">
          <span className="eyebrow"><i /> Available for conversations</span>
          <span>India · IST</span>
        </div>

        <div className="hero-layout">
          <main className="hero-main">
            <p className="sec-num">01 / introduction</p>
            <p className="hero-role">Full Stack Developer · Backend &amp; AI Engineering</p>

            <div className="hero-identity">
              <div className="hero-heading">
                <h1 className="hero-title">
                  <span className="hero-name hero-name-1">Shivam</span>
                  <span className="hero-name hero-name-2">Sagar<span className="text-rust">.</span></span>
                </h1>
              </div>

              <figure className="profile-frame">
                <div className="profile-photo">
                  <img src={PROFILE.photo} alt="Portrait of Shivam Sagar" />
                </div>
                <figcaption className="profile-caption">
                  <span>SHIVAM / SS</span>
                  <span>PROFILE</span>
                </figcaption>
              </figure>
            </div>

            <div className="hero-bottom">
              <p className="hero-summary">{PROFILE.summary}</p>
              <div className="hero-actions">
                <a className="btn-ink" href="#work">View selected work ↘</a>
                <a className="tag" href={`mailto:${PROFILE.email}`}>Available for conversations</a>
              </div>
            </div>
          </main>

          <aside className="hero-aside">
            <div className="aside-label">Current profile</div>

            <div className="experience-signal recent-experience">
              <FlyRankLogo size={52} />
              <div className="signal-copy">
                <span className="signal-eyebrow">Recent experience</span>
                <strong>FlyRank AI</strong>
                <small>Backend AI Engineering</small>
              </div>
            </div>

            <div className="experience-signal stack-signal">
              <GfGLogo size={34} />
              <div className="signal-copy">
                <span className="signal-eyebrow">MERN · Full Stack</span>
                <div className="stack-logos">
                  <Logo name="react" label="React" size={20} />
                  <Logo name="nodedotjs" label="Node.js" size={20} />
                  <Logo name="mongodb" label="MongoDB" size={20} />
                </div>
              </div>
            </div>

            <div className="aside-metrics">
              <div className="metric">
                <span className="metric-label">Local time</span>
                <strong>{time || "--:--:--"}</strong>
                <small>IST · live</small>
              </div>
              <div className="metric">
                <span className="metric-label">Portfolio views</span>
                <strong>{Number(stats.views || 0).toLocaleString("en-IN")}</strong>
                <small>Public counter</small>
              </div>
            </div>

            <a className="proof-row" href={PROFILE.github} target="_blank" rel="noreferrer">
              <span>Public work &amp; source</span>
              <span aria-hidden>↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
