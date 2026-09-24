import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#141413";
const RUST = "#b8431a";

const RIBBONS = [
  {
    color: INK,
    radius: 0.032,
    opacity: 0.72,
    points: [[0, 0, 0], [0.22, 0.1, -0.12], [0.8, 0.55, -0.28], [1.75, 0.8, -0.18]]
  },
  {
    color: RUST,
    radius: 0.025,
    opacity: 0.9,
    points: [[0, 0, 0.04], [-0.12, 0.18, -0.08], [-0.72, 0.72, -0.02], [-1.5, 1.08, 0.18]]
  },
  {
    color: INK,
    radius: 0.018,
    opacity: 0.46,
    points: [[0, 0, -0.02], [-0.2, -0.1, -0.18], [-0.88, -0.38, -0.08], [-1.72, -0.62, 0.08]]
  },
  {
    color: RUST,
    radius: 0.014,
    opacity: 0.58,
    points: [[0, 0, 0.02], [0.08, -0.2, -0.1], [0.56, -0.72, 0.04], [1.32, -1.16, 0.18]]
  }
];

function Ribbon({ points, color, radius, opacity, index, motion }) {
  const ref = useRef(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(
      points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,
      "catmullrom",
      0.65
    ),
    [points]
  );

  useFrame((state, delta) => {
    if (!ref.current || !motion) return;
    const targetX = state.pointer.y * (0.025 + index * 0.004);
    const targetY = state.pointer.x * (0.035 + index * 0.004);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 4, delta);
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 4, delta);
  });

  return (
    <group ref={ref}>
      <mesh>
        <tubeGeometry args={[curve, 72, radius, 7, false]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function OriginCore({ motion }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current || !motion) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.035;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, pulse, 5, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, pulse, 5, delta);
  });

  return (
    <group ref={ref}>
      <mesh rotation={[0.35, 0.2, -0.2]}>
        <boxGeometry args={[0.22, 0.22, 0.16]} />
        <meshBasicMaterial color={INK} transparent opacity={0.86} />
      </mesh>
      <mesh rotation={[-0.35, -0.2, 0.2]} scale={0.72}>
        <boxGeometry args={[0.22, 0.22, 0.16]} />
        <meshBasicMaterial color={RUST} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function DepthPlanes({ motion }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current || !motion) return;
    ref.current.rotation.z = THREE.MathUtils.damp(
      ref.current.rotation.z,
      state.pointer.x * 0.018,
      3,
      delta
    );
  });

  return (
    <group ref={ref}>
      <mesh position={[0.45, 0.12, -0.38]} rotation={[0.08, -0.16, -0.22]}>
        <boxGeometry args={[1.55, 0.018, 0.018]} />
        <meshBasicMaterial color={INK} transparent opacity={0.2} />
      </mesh>
      <mesh position={[-0.38, -0.34, -0.3]} rotation={[-0.12, 0.18, 0.36]}>
        <boxGeometry args={[1.28, 0.014, 0.014]} />
        <meshBasicMaterial color={RUST} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function Scene({ motion }) {
  return (
    <group position={[0, 0, -0.7]}>
      <DepthPlanes motion={motion} />
      {RIBBONS.map((ribbon, index) => (
        <Ribbon key={index} {...ribbon} index={index} motion={motion} />
      ))}
      <OriginCore motion={motion} />
    </group>
  );
}

export default function HeroThreeScene() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="hero-3d-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Scene motion={!reducedMotion} />
      </Canvas>
    </div>
  );
}
