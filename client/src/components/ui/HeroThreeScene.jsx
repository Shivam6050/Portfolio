import AuraParticleCanvas from "./AuraParticleCanvas.jsx";

export default function HeroThreeScene() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="hero-3d-canvas" aria-hidden="true">
      <AuraParticleCanvas motion={!reducedMotion} />
    </div>
  );
}
