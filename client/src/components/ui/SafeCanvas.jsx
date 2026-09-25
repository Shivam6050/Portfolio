import { Component } from "react";
import { Canvas } from "@react-three/fiber";

// Decorative WebGL must never prevent access to portfolio content or forms.
export default class SafeCanvas extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? null : <Canvas {...this.props} fallback={null} />;
  }
}
