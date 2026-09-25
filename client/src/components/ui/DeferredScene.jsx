import { Component, lazy, Suspense } from "react";
import useVisible from "../../hooks/useVisible.js";

const Particles = lazy(() => import("./AuraParticleCanvas.jsx"));
const Experience = lazy(() => import("./ExperienceThreeScene.jsx"));

class DecorationBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function DeferredScene({ kind = "particles", ...props }) {
  const [ref, visible] = useVisible();
  const Scene = kind === "experience" ? Experience : Particles;
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <DecorationBoundary>
        <Suspense fallback={null}>{visible && <Scene {...props} />}</Suspense>
      </DecorationBoundary>
    </div>
  );
}
