import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RUST = "#b8431a";
const PARTICLE_COUNT = 180;

function createParticleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.72, "rgba(255,255,255,0.98)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}


function AuraParticles({ motion = true, speedMultiplier = 1, spreadMultiplier = 1 }) {
  const particleTexture = useMemo(createParticleTexture, []);
  const points = useRef(null);
  const data = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const a = (i / PARTICLE_COUNT) * Math.PI * 2;
    const lane = i % 3;
    const speed = 0.17 + ((i * 19) % 13) / 120;
    return {
      angle: a + Math.sin(i * 2.7) * 0.11,
      radius: 0.05 + ((i * 23) % 47) / 180,
      speed,
      spread: 0.7 + ((i * 11) % 29) / 40,
      lane,
      phase: (i * 0.173) % (Math.PI * 2),
      z: -0.25 + lane * 0.12
    };
  }), []);
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame((state, delta) => {
    if (!points.current) return;
    const t = motion ? state.clock.elapsedTime : 0;
    const arr = points.current.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const p = data[i];
      const cycle = (t * p.speed * speedMultiplier + p.phase) % 1;
      const travel = (0.08 + cycle * 2.65) * spreadMultiplier;
      const breathing = 1 + Math.sin(t * 1.7 + p.phase) * 0.1;
      const arc = Math.sin(cycle * Math.PI) * 0.62 * p.spread * spreadMultiplier;

      arr[i * 3] = Math.cos(p.angle) * travel * p.spread * breathing +
        Math.cos(p.angle + Math.PI / 2) * arc;
      arr[i * 3 + 1] = Math.sin(p.angle) * travel * p.spread * breathing +
        Math.sin(p.angle + Math.PI / 2) * arc;
      arr[i * 3 + 2] = p.z + Math.sin(t * 1.25 + p.phase) * 0.16 + cycle * 0.35;
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    const targetX = motion ? state.pointer.y * 0.035 : 0;
    const targetY = motion ? state.pointer.x * 0.05 : 0;
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, targetX, 3, delta);
    points.current.rotation.y = THREE.MathUtils.damp(points.current.rotation.y, targetY, 3, delta);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={particleTexture}
        alphaTest={0.02}
        sizeAttenuation
        color={RUST}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EmberCore({ motion }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 0.9 + Math.sin((motion ? state.clock.elapsedTime : 0) * 2.8) * 0.1;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0, 0, 0.32]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={RUST} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Scene({ motion, speedMultiplier, spreadMultiplier }) {
  return (
    <group position={[0, 0, -0.7]}>
      <AuraParticles motion={motion} speedMultiplier={speedMultiplier} spreadMultiplier={spreadMultiplier} />
      <EmberCore motion={motion} />
    </group>
  );
}

export default function AuraParticleCanvas({ motion = true, speedMultiplier = 1, spreadMultiplier = 1 }) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const animate = motion && !reducedMotion;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
    >
      <Scene motion={animate} speedMultiplier={speedMultiplier} spreadMultiplier={spreadMultiplier} />
    </Canvas>
  );
}
