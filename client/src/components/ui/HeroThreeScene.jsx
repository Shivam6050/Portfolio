import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#141413";
const RUST = "#b8431a";
const CREAM = "#f2ede4";

function SplineS({ motion }) {
  const group = useRef(null);
  const accent = useRef(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, 1.22, 0),
    new THREE.Vector3(0.52, 1.12, 0.14),
    new THREE.Vector3(0.78, 0.52, 0.08),
    new THREE.Vector3(0.18, 0.04, -0.02),
    new THREE.Vector3(-0.66, -0.34, 0.05),
    new THREE.Vector3(-0.72, -1.0, 0.12),
    new THREE.Vector3(0.68, -1.22, 0)
  ], false, "catmullrom", 0.55), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = motion ? state.pointer.y * 0.08 : 0;
    const targetY = motion ? state.pointer.x * 0.12 : 0;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    if (motion) group.current.rotation.z += delta * 0.035;
    if (accent.current) {
      const point = curve.getPointAt((state.clock.elapsedTime * 0.055) % 1);
      accent.current.position.lerp(point, 0.08);
    }
  });

  return (
    <group ref={group} rotation={[0, 0, -0.08]}>
      <mesh>
        <tubeGeometry args={[curve, 96, 0.105, 12, false]} />
        <meshStandardMaterial color={INK} roughness={0.26} metalness={0.62} />
      </mesh>
      <mesh scale={1.012}>
        <tubeGeometry args={[curve, 96, 0.027, 8, false]} />
        <meshStandardMaterial color={RUST} roughness={0.32} metalness={0.42} emissive={RUST} emissiveIntensity={0.08} />
      </mesh>
      <mesh ref={accent}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color={RUST} roughness={0.22} metalness={0.65} emissive={RUST} emissiveIntensity={0.22} />
      </mesh>
    </group>
  );
}

function OrbitRing({ rotation, scale = 1, speed = 0.15, motion }) {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (motion) {
      ref.current.rotation.z += delta * speed;
      ref.current.rotation.x += delta * speed * 0.22;
    }
    const targetX = motion ? state.pointer.y * 0.035 : 0;
    const targetY = motion ? state.pointer.x * 0.045 : 0;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, rotation[0] + targetX, 3, delta);
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, rotation[1] + targetY, 3, delta);
  });
  return (
    <mesh ref={ref} rotation={rotation} scale={scale}>
      <torusGeometry args={[1.38, 0.008, 8, 96]} />
      <meshBasicMaterial color={INK} transparent opacity={0.2} />
    </mesh>
  );
}

function Scene({ motion }) {
  return (
    <>
      <ambientLight intensity={1.7} color={CREAM} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#fff8ed" />
      <pointLight position={[-3, -2, 2]} intensity={7} distance={8} color={RUST} />
      <group position={[0.1, 0, 0]}>
        <SplineS motion={motion} />
        <OrbitRing rotation={[0.85, 0.25, 0.2]} scale={1.02} speed={0.12} motion={motion} />
        <OrbitRing rotation={[-0.4, 0.8, -0.45]} scale={1.18} speed={-0.08} motion={motion} />
      </group>
    </>
  );
}

export default function HeroThreeScene() {
  const reducedMotion = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="hero-3d-canvas">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 38, near: 0.1, far: 20 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Scene motion={!reducedMotion} />
      </Canvas>
    </div>
  );
}
