import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RUST = "#b8431a";
const INK = "#141413";

function CareerConstellation() {
  const group = useRef(null);
  const core = useRef(null);
  const orbitA = useRef(null);
  const orbitB = useRef(null);
  const orbitC = useRef(null);

  const particles = useMemo(() => {
    const count = 90;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.45 + ((i * 17) % 90) / 100;
      return {
        angle,
        radius,
        speed: 0.08 + ((i * 13) % 17) / 160,
        phase: (i * 0.71) % (Math.PI * 2),
        y: ((i * 29) % 100) / 100 - 0.5
      };
    });
  }, []);

  const positions = useMemo(() => new Float32Array(90 * 3), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const targetX = state.pointer.y * 0.08;
      const targetY = state.pointer.x * 0.1;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.5, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.5, delta);
    }

    if (core.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.045;
      core.current.scale.setScalar(pulse);
      core.current.rotation.x += delta * 0.18;
      core.current.rotation.y += delta * 0.24;
    }

    [orbitA, orbitB, orbitC].forEach((ref, index) => {
      if (!ref.current) return;
      ref.current.rotation.z += delta * (0.12 + index * 0.045);
      ref.current.rotation.x += delta * (index === 1 ? 0.08 : 0.025);
    });

    const arr = pointsGeometry.current?.geometry?.attributes.position?.array;
    if (!arr) return;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const a = p.angle + t * p.speed;
      const breathe = 1 + Math.sin(t * 1.1 + p.phase) * 0.06;
      arr[i * 3] = Math.cos(a) * p.radius * breathe;
      arr[i * 3 + 1] = p.y + Math.sin(t * 0.65 + p.phase) * 0.12;
      arr[i * 3 + 2] = Math.sin(a) * p.radius * 0.62;
    }

    pointsGeometry.current.geometry.attributes.position.needsUpdate = true;
  });

  const pointsGeometry = useRef(null);

  return (
    <group ref={group} position={[0.65, 0, -0.9]} scale={0.9}>
      <points ref={pointsGeometry}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={90}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={RUST}
          transparent
          opacity={0.48}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshBasicMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <icosahedronGeometry args={[0.17, 1]} />
        <meshBasicMaterial
          color={RUST}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh ref={orbitA} rotation={[Math.PI / 2.35, 0.15, 0]}>
        <torusGeometry args={[0.7, 0.008, 8, 96]} />
        <meshBasicMaterial color={RUST} transparent opacity={0.36} />
      </mesh>

      <mesh ref={orbitB} rotation={[0.35, Math.PI / 2.8, 0]}>
        <torusGeometry args={[0.86, 0.006, 8, 96]} />
        <meshBasicMaterial color={INK} transparent opacity={0.18} />
      </mesh>

      <mesh ref={orbitC} rotation={[1.05, 0.35, 0]}>
        <torusGeometry args={[1.05, 0.005, 8, 96]} />
        <meshBasicMaterial color={RUST} transparent opacity={0.2} />
      </mesh>

      {[0, 1, 2, 3].map((index) => {
        const angle = (index / 4) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.72,
              Math.sin(angle * 1.2) * 0.24,
              Math.sin(angle) * 0.72
            ]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial
              color={index % 2 ? INK : RUST}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}

      <pointLight color={RUST} intensity={0.35} distance={3} />
    </group>
  );
}

export default function ExperienceThreeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 34, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <CareerConstellation />
    </Canvas>
  );
}
