import AuraParticleCanvas from "../ui/AuraParticleCanvas.jsx";
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";

export default function Hero() {
  const { hero, availability, timezone } = PORTFOLIO_CONFIG;
  const currentRole = PROFILE.experience?.[0];
  const current = currentRole ? `${currentRole.role} · ${currentRole.company}` : "";
  return (
    <section id="top" className="hero-section">
      <div className="hero-container">
        <div className="hero-kicker">
          <span className="eyebrow"><i /> {availability}</span>
          <span>{timezone}</span>
        </div>

        <div className="hero-layout">
          <div className="hero-main">
            <p className="sec-num">{hero.sectionNumber}</p>

            <div className="hero-identity">
              <div className="hero-heading">
                <p className="hero-role">{PROFILE.title}</p>
                <h1 className="hero-title">
                  <span className="hero-name hero-name-1">{PROFILE.firstName}</span>
                  <span className="hero-name hero-name-2">{PROFILE.lastName}<span className="text-rust">.</span></span>
                </h1>

                <div className="hero-current">
                  <span className="hero-current-label">{hero.currentLabel}</span>
                  <span className="hero-current-line" />
                  <span>{current}</span>
                </div>
              </div>

              <figure className="profile-frame">
                <div className="profile-particle-field" aria-hidden="true">
                  <AuraParticleCanvas motion speedMultiplier={0.55} />
                </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
