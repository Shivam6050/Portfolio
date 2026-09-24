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


const PARTICLE_COUNT = 96;

function SparkBurst({ motion }) {
  const points = useRef(null);
  const velocities = useRef([]);
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useMemo(() => {
    velocities.current = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (index / PARTICLE_COUNT) * Math.PI * 2 + (index % 7) * 0.13;
      const spread = 0.65 + ((index * 17) % 31) / 100;
      return new THREE.Vector3(
        Math.cos(angle) * spread,
        Math.sin(angle) * spread * 0.78 + 0.18,
        ((index % 9) - 4) * 0.018
      );
    });
  }, []);

  const seeds = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }, (_, index) => (index * 0.037) % 1),
    []
  );

  useFrame((state, delta) => {
    if (!points.current || !motion) return;

    const elapsed = state.clock.elapsedTime;
    const cycle = (elapsed % 2.6) / 2.6;
    const burst = cycle < 0.82;
    const geometry = points.current.geometry;
    const position = geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const velocity = velocities.current[i];
      const localTime = burst
        ? Math.max(0, cycle * 2.9 - seeds[i] * 0.55)
        : 0;

      if (!burst || localTime <= 0) {
        position[i * 3] = 0;
        position[i * 3 + 1] = 0;
        position[i * 3 + 2] = 0;
        continue;
      }

      const drag = Math.max(0, 1 - localTime * 0.28);
      position[i * 3] = velocity.x * localTime * drag;
      position[i * 3 + 1] =
        velocity.y * localTime * drag - 0.24 * localTime * localTime;
      position[i * 3 + 2] = velocity.z * localTime - 0.18;
    }

    geometry.attributes.position.needsUpdate = true;

    const targetX = state.pointer.y * 0.018;
    const targetY = state.pointer.x * 0.022;
    points.current.rotation.x = THREE.MathUtils.damp(
      points.current.rotation.x,
      targetX,
      3,
      delta
    );
    points.current.rotation.y = THREE.MathUtils.damp(
      points.current.rotation.y,
      targetY,
      3,
      delta
    );
  });

  return (
    <points ref={points} position={[0, 0, 0.12]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        color={RUST}
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EmberTrail({ motion }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current || !motion) return;
    const pulse = 0.72 + Math.sin(state.clock.elapsedTime * 5.2) * 0.18;
    ref.current.scale.setScalar(pulse);
    ref.current.rotation.z += delta * 0.7;
  });

  return (
    <group ref={ref} position={[0, 0, 0.18]}>
      <mesh>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          color={RUST}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Scene({ motion }) {
  return (
    <group position={[0, 0, -0.7]}>
      <DepthPlanes motion={motion} />
      <SparkBurst motion={motion} />
      <EmberTrail motion={motion} />
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
