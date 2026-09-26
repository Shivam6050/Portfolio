/**
 * React error boundary around the Three Fiber Canvas; failed decoration disappears while page content remains. Props pass through unchanged. This handles errors React delivers to the boundary, not every browser/asynchronous failure.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { Component } from "react";
/* 3D rendering dependency; keep in lazy scene modules so it stays out of initial page JavaScript. */
import { Canvas } from "@react-three/fiber";

// Decorative WebGL must never prevent access to portfolio content or forms.
/* React error boundary around the Three Fiber Canvas; failed decoration disappears while page content remains. Props pass through unchanged. This handles errors React delivers to the boundary, not every browser/asynchronous failure. */
export default class SafeCanvas extends Component {
  /* Instance state retained for the lifetime of this boundary. */
  state = { failed: false };
  /* Mark the mounted decorative boundary failed so its next render can return no decoration. */
  static getDerivedStateFromError() { return { failed: true }; }
  /* Return the protected UI unless this mounted boundary has caught an error. */
  render() {
    /* Return this.state.failed ? null : <Canvas {...this.props} fallback={null} />; this ends the current function path. */
    return this.state.failed ? null : <Canvas {...this.props} fallback={null} />;
  }
}
