/**
 * Introduction uses PROFILE and PORTFOLIO_CONFIG.hero. The first experience entry supplies the current role. AuraParticleCanvas is intentionally an alias for DeferredScene to keep Three.js out of the initial bundle.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Lazy scene boundary, aliased here by its visual role; preserve this import to keep viewport-based loading. */
import AuraParticleCanvas from "../ui/DeferredScene.jsx";
/* Import PROFILE, PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";

/* Introduction uses PROFILE and PORTFOLIO_CONFIG.hero. The first experience entry supplies the current role. AuraParticleCanvas is intentionally an alias for DeferredScene to keep Three.js out of the initial bundle. */
export default function Hero() {
  /* Read introduction labels/status from PORTFOLIO_CONFIG rather than hardcoding component text. */
  const { hero, availability, timezone } = PORTFOLIO_CONFIG;
  /* First experience entry; reorder PROFILE.experience to change the hero current role. */
  const currentRole = PROFILE.experience?.[0];
  /* Role/company label derived from the first experience entry; empty when no current role exists. */
  const current = currentRole ? `${currentRole.role} · ${currentRole.company}` : "";
  return (
    /* Page section anchored by top; update navigation destinations if renaming the ID. */
    <section id="top" className="hero-section">
      {/* Render div with styling hook hero-container. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-container">
        {/* Render div with styling hook hero-kicker. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-kicker">
          {/* Render span with styling hook eyebrow. Change its content binding for copy, classes/CSS for layout. */}<span className="eyebrow"><i /> {availability}</span>
          {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>{timezone}</span>
        </div>

        {/* Render div with styling hook hero-layout. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-layout">
          {/* Render div with styling hook hero-main. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-main">
            {/* Render p with styling hook sec-num. Change its content binding for copy, classes/CSS for layout. */}<p className="sec-num">{hero.sectionNumber}</p>

            {/* Render div with styling hook hero-identity. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-identity">
              {/* Render div with styling hook hero-heading. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-heading">
                {/* Render p with styling hook hero-role. Change its content binding for copy, classes/CSS for layout. */}<p className="hero-role">{PROFILE.title}</p>
                {/* Level-1 heading; edit referenced text/data without breaking heading hierarchy. */}<h1 className="hero-title">
                  {/* Render span with styling hook hero-name hero-name-1. Change its content binding for copy, classes/CSS for layout. */}<span className="hero-name hero-name-1">{PROFILE.firstName}</span>
                  {/* Render span with styling hook hero-name hero-name-2. Change its content binding for copy, classes/CSS for layout. */}<span className="hero-name hero-name-2">{PROFILE.lastName}<span className="text-rust">.</span></span>
                </h1>

                {/* Render div with styling hook hero-current. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-current">
                  {/* Render span with styling hook hero-current-label. Change its content binding for copy, classes/CSS for layout. */}<span className="hero-current-label">{hero.currentLabel}</span>
                  {/* Render span with styling hook hero-current-line. Change its content binding for copy, classes/CSS for layout. */}<span className="hero-current-line" />
                  {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>{current}</span>
                </div>
              </div>

              {/* Portrait group containing image and caption; edit PROFILE.photo for the bitmap. */}<figure className="profile-frame">
                {/* Render div with styling hook profile-particle-field. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<div className="profile-particle-field" aria-hidden="true">
                  {/* Shared particle decoration. Sections alias DeferredScene by this name; speedMultiplier/spreadMultiplier tune the effect. */}<AuraParticleCanvas motion speedMultiplier={0.55} />
                </div>
                {/* Render div with styling hook profile-photo. Change its content binding for copy, classes/CSS for layout. */}<div className="profile-photo">
                  {/* Image: src selects asset, alt provides text replacement, loading/decoding tune fetching/rendering. Preserve original brand proportions. */}<img src={PROFILE.photo} alt="Portrait of Shivam Sagar" fetchPriority="high" decoding="async" />
                </div>
                {/* Portrait caption; edit PROFILE.photo for the bitmap. */}<figcaption className="profile-caption">
                  {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>SHIVAM / SS</span>
                  {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>PROFILE</span>
                </figcaption>
              </figure>
            </div>

            {/* Render div with styling hook hero-bottom. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-bottom">
              {/* Render p with styling hook hero-summary. Change its content binding for copy, classes/CSS for layout. */}<p className="hero-summary">{PROFILE.summary}</p>
              {/* Render div with styling hook hero-actions. Change its content binding for copy, classes/CSS for layout. */}<div className="hero-actions">
                {/* Link destination: #work. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="btn-ink" href="#work">View selected work ↘</a>
                {/* Link destination: `mailto:${PROFILE.email}`. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="tag" href={`mailto:${PROFILE.email}`}>Get in touch ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
