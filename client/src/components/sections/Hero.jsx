import { PROFILE } from "../../data/constants.js";

export default function Hero() {
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

            <div className="hero-identity">
              <div className="hero-heading">
                <p className="hero-role">Full Stack Developer · Backend &amp; AI Engineering</p>
                <h1 className="hero-title">
                  <span className="hero-name hero-name-1">Shivam</span>
                  <span className="hero-name hero-name-2">Sagar<span className="text-rust">.</span></span>
                </h1>

                <div className="hero-current">
                  <span className="hero-current-label">Currently</span>
                  <span className="hero-current-line" />
                  <span>Backend AI Engineering · FlyRank AI</span>
                </div>
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
        </div>
      </div>
    </section>
  );
}
