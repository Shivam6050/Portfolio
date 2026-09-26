/**
 * Career orbital scene loaded by DeferredScene. Tune radii here, placement in .experience-3d-layer CSS. pointsGeometry is actually a Points ref: buffer access goes through .geometry.attributes. Keep particle count, array size, and geometry count aligned.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useMemo, useRef } from "react";
/* 3D rendering dependency; keep in lazy scene modules so it stays out of initial page JavaScript. */
import { useFrame } from "@react-three/fiber";
/* Import Canvas from ./SafeCanvas.jsx; edit that module for the shared implementation. */
import Canvas from "./SafeCanvas.jsx";
/* Import useReducedMotion from ../../hooks/useReducedMotion.js; edit that module for the shared implementation. */
import useReducedMotion from "../../hooks/useReducedMotion.js";
/* 3D rendering dependency; keep in lazy scene modules so it stays out of initial page JavaScript. */
import * as THREE from "three";

/* Rust material accent; coordinate color changes with CSS and Tailwind palette. */
const RUST = "#b8431a";
/* Dark wireframe color; opacity separately controls its strength. */
const INK = "#141413";

/* Animate career core/rings/particles together; keep typed-array length and vertex count synchronized. */
function CareerConstellation({ motion }) {
  /* Three.js group ref; useFrame updates its rotations for the whole constellation. */
  const group = useRef(null);
  /* Central mesh ref; useFrame mutates its transform without rerendering React. */
  const core = useRef(null);
  /* First orbital mesh ref; ring iteration applies index-specific angular speed. */
  const orbitA = useRef(null);
  /* Second orbital mesh ref; its initial orientation differs from the other rings. */
  const orbitB = useRef(null);
  /* Third orbital mesh ref; keep ref order aligned with per-ring speeds. */
  const orbitC = useRef(null);

  /* Particle definitions or Points ref in this local scope; the frame loop uses it to access stable particle data/geometry. */
  const particles = useMemo(() => {
    /* Number of particles; also update the matching Float32Array allocation and bufferAttribute count when changing. */
    const count = 90;
    /* Return Array.from({ length: count }, (_, i) => { const angle = (i / count) * Math.PI * 2; const radius; this ends the current function path. */
    return Array.from({ length: count }, (_, i) => {
      /* Angle in radians; the index distributes objects around a complete circle. */
      const angle = (i / count) * Math.PI * 2;
      /* Base orbit radius with deterministic variation; larger values widen the particle field. */
      const radius = 1.45 + ((i * 17) % 90) / 100;
      /* Return { angle, radius, speed: 0.08 + ((i * 13) % 17) / 160, phase: (i * 0.71) % (Math.PI * 2), y: ((i; this ends the current function path. */
      return {
        /* Base angle in radians for deterministic particle placement. */
        angle,
        /* Base orbit radius in scene units. */
        radius,
        /* Per-particle travel/rotation rate. */
        speed: 0.08 + ((i * 13) % 17) / 160,
        /* Offset staggering periodic particle movement. */
        phase: (i * 0.71) % (Math.PI * 2),
        /* Base vertical particle coordinate in scene units. */
        y: ((i * 29) % 100) / 100 - 0.5
      };
    });
  }, []);

  /* Reusable XYZ Float32Array; each point occupies three consecutive entries. */
  const positions = useMemo(() => new Float32Array(90 * 3), []);

  /* Run in the Three.js frame loop. Mutate refs/buffers instead of React state; delta is elapsed seconds. */
  useFrame((state, delta) => {
    /* Elapsed animation seconds, or zero for a static pose; multipliers below control frequency. */
    const t = motion ? state.clock.elapsedTime : 0;
    /* Guard: !motion. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!motion) delta = 0;
    /* Guard: group.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (group.current) {
      /* Pointer-driven X-axis target; damp smooths the approach using frame delta. */
      const targetX = motion ? state.pointer.y * 0.08 : 0;
      /* Pointer-driven Y-axis target; keep multipliers modest for readable content. */
      const targetY = motion ? state.pointer.x * 0.1 : 0;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.5, delta);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.5, delta);
    }

    /* Guard: core.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (core.current) {
      /* Uniform scale modulation; sine amplitude sets expansion/contraction strength. */
      const pulse = 1 + Math.sin(t * 2.2) * 0.045;
      /* Scale all three axes together so pulsing preserves the shape proportions. */
      core.current.scale.setScalar(pulse);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      core.current.rotation.x += delta * 0.18;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      core.current.rotation.y += delta * 0.24;
    }

    /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
    [orbitA, orbitB, orbitC].forEach((ref, index) => {
      /* Guard: !ref.current. Run the following branch only when true; preserve early returns when modifying this flow. */
      if (!ref.current) return;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      ref.current.rotation.z += delta * (0.12 + index * 0.045);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      ref.current.rotation.x += delta * (index === 1 ? 0.08 : 0.025);
    });

    /* Writable position buffer; signal needsUpdate after CPU-side edits. */
    const arr = pointsGeometry.current?.geometry?.attributes.position?.array;
    /* Guard: !arr. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!arr) return;

    /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
    for (let i = 0; i < particles.length; i += 1) {
      /* Parameters for this loop particle, reused to calculate its three coordinates. */
      const p = particles[i];
      /* Angle in radians; cosine/sine below map it onto the particle orbit. */
      const a = p.angle + t * p.speed;
      /* Gentle sinusoidal orbit expansion; the 0.06 amplitude controls the strength. */
      const breathe = 1 + Math.sin(t * 1.1 + p.phase) * 0.06;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3] = Math.cos(a) * p.radius * breathe;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 1] = p.y + Math.sin(t * 0.65 + p.phase) * 0.12;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 2] = Math.sin(a) * p.radius * 0.62;
    }

    /* Mark CPU-side geometry/texture edits for upload to the GPU on the next render. */
    pointsGeometry.current.geometry.attributes.position.needsUpdate = true;
  });

  /* Ref attaches to Points despite its name; access attributes through .geometry. */
  const pointsGeometry = useRef(null);

  return (
    /* Transform children together; positions use scene units and rotations use radians. */
    <group ref={group} position={[0.65, 0, -0.9]} scale={0.9}>
      {/* Three.js point cloud; position buffers live under geometry.attributes. */}<points ref={pointsGeometry}>
        {/* Own the particle vertex buffers. */}<bufferGeometry>
          {/* Attach XYZ float data; count is vertices, itemSize=3 is floats per point. Keep both aligned with allocation. */}<bufferAttribute
            attach="attributes-position"
            count={90}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        {/* Sprite appearance: size/opacity/color control visibility; transparent enables alpha, depthWrite=false avoids occlusion artifacts. */}<pointsMaterial
          size={0.035}
          color={RUST}
          transparent
          opacity={0.48}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={core}>
        {/* Polyhedron args are radius and subdivision detail; more detail adds edges. */}<icosahedronGeometry args={[0.48, 1]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh position={[0, 0, 0.02]}>
        {/* Polyhedron args are radius and subdivision detail; more detail adds edges. */}<icosahedronGeometry args={[0.17, 1]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
          color={RUST}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={orbitA} rotation={[Math.PI / 2.35, 0.15, 0]}>
        {/* Ring args are radius, tube thickness, radial segments, and tubular segments. */}<torusGeometry args={[0.7, 0.008, 8, 96]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial color={RUST} transparent opacity={0.36} />
      </mesh>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={orbitB} rotation={[0.35, Math.PI / 2.8, 0]}>
        {/* Ring args are radius, tube thickness, radial segments, and tubular segments. */}<torusGeometry args={[0.86, 0.006, 8, 96]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial color={INK} transparent opacity={0.18} />
      </mesh>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={orbitC} rotation={[1.05, 0.35, 0]}>
        {/* Ring args are radius, tube thickness, radial segments, and tubular segments. */}<torusGeometry args={[1.05, 0.005, 8, 96]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial color={RUST} transparent opacity={0.2} />
      </mesh>

      {[0, 1, 2, 3].map((index) => {
        /* Angle in radians; the index distributes objects around a complete circle. */
        const angle = (index / 4) * Math.PI * 2;
        return (
          /* Combine geometry/material; position/rotation/scale define initial transform. */
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.72,
              Math.sin(angle * 1.2) * 0.24,
              Math.sin(angle) * 0.72
            ]}
          >
            {/* Sphere args are radius and segment counts; more segments cost rendering work. */}<sphereGeometry args={[0.045, 12, 12]} />
            {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
              color={index % 2 ? INK : RUST}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}

      {/* Point light affects lit materials; meshBasicMaterial remains unaffected. */}<pointLight color={RUST} intensity={0.35} distance={3} />
    </group>
  );
}

/* Career orbital scene loaded by DeferredScene. Tune radii here, placement in .experience-3d-layer CSS. pointsGeometry is actually a Points ref: buffer access goes through .geometry.attributes. Keep particle count, array size, and geometry count aligned. */
export default function ExperienceThreeScene() {
  /* User motion preference; preserve static content when animation is disabled. */
  const reducedMotion = useReducedMotion();
  return (
    /* WebGL host: dpr caps resolution; camera controls framing; alpha preserves transparency; demand renders static reduced-motion scenes. */
    <Canvas
      dpr={[1, 1.5]}
      camera={{ /* XYZ coordinates in scene units; edit axes to reposition geometry. */ position: [0, 0, 4.6], fov: 34, near: 0.1, far: 20 }}
      gl={{ /* Enable smoother WebGL edges; alpha preserves transparency and powerPreference is a browser GPU hint, not a guarantee. */ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      {/* Render CareerConstellation; edit its imported component for behavior instead of duplicating it here. */}<CareerConstellation motion={!reducedMotion} />
    </Canvas>
  );
}
