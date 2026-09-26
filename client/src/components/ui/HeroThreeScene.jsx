/**
 * Legacy wrapper not used by current Hero, which uses DeferredScene. This wrapper reads reduced motion per render rather than subscribing. Do not accidentally restore eager Three.js loading by importing it into the active page.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import AuraParticleCanvas from ./AuraParticleCanvas.jsx; edit that module for the shared implementation. */
import AuraParticleCanvas from "./AuraParticleCanvas.jsx";

/* Legacy wrapper not used by current Hero, which uses DeferredScene. This wrapper reads reduced motion per render rather than subscribing. Do not accidentally restore eager Three.js loading by importing it into the active page. */
export default function HeroThreeScene() {
  /* User motion preference; preserve static content when animation is disabled. */
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    /* Render div with styling hook hero-3d-canvas. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */
    <div className="hero-3d-canvas" aria-hidden="true">
      {/* Shared particle decoration. Sections alias DeferredScene by this name; speedMultiplier/spreadMultiplier tune the effect. */}<AuraParticleCanvas motion={!reducedMotion} />
    </div>
  );
}
