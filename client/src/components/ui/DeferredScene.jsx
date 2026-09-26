/**
 * Lazy optional WebGL boundary. Visibility mounts/unmounts scenes to release offscreen resources; re-entry starts a fresh scene. Suspense leaves no placeholder. Outer boundary catches React-delivered errors including lazy import failures. Keep imports dynamic.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { Component, lazy, Suspense } from "react";
/* Import useVisible from ../../hooks/useVisible.js; edit that module for the shared implementation. */
import useVisible from "../../hooks/useVisible.js";

/* Dynamically imported particle component; keep lazy() to avoid eager Three.js download. */
const Particles = lazy(() => import("./AuraParticleCanvas.jsx"));
/* Dynamically imported career scene; loaded only when first rendered. */
const Experience = lazy(() => import("./ExperienceThreeScene.jsx"));

/* Lazy optional WebGL boundary. Visibility mounts/unmounts scenes to release offscreen resources; re-entry starts a fresh scene. Suspense leaves no placeholder. Outer boundary catches React-delivered errors including lazy import failures. Keep imports dynamic. */
class DecorationBoundary extends Component {
  /* Instance state retained for the lifetime of this boundary. */
  state = { failed: false };
  /* Mark the mounted decorative boundary failed so its next render can return no decoration. */
  static getDerivedStateFromError() { return { failed: true }; }
  /* Return the protected UI unless this mounted boundary has caught an error. */
  render() { return this.state.failed ? null : this.props.children; }
}

/* Lazy optional WebGL boundary. Visibility mounts/unmounts scenes to release offscreen resources; re-entry starts a fresh scene. Suspense leaves no placeholder. Outer boundary catches React-delivered errors including lazy import failures. Keep imports dynamic. */
export default function DeferredScene({ kind = "particles", ...props }) {
  /* Observe the wrapper through ref and use visible to mount the expensive scene only near the viewport in an active tab. */
  const [ref, visible] = useVisible();
  /* Selected lazy scene: experience kind selects orbitals; default selects particles. */
  const Scene = kind === "experience" ? Experience : Particles;
  return (
    /* Render div for this content group. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */
    <div ref={ref} style={{ width: "100%", height: "100%" }} aria-hidden="true">
      {/* Hide React-delivered decoration errors without replacing portfolio content. */}<DecorationBoundary>
        {/* No placeholder while the lazy module downloads; content outside remains usable. */}<Suspense fallback={null}>{visible && <Scene {...props} />}</Suspense>
      </DecorationBoundary>
    </div>
  );
}
