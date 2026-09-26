/**
 * Legacy optional WebGL toolkit experiment, currently not imported by Stack. Live toolkit effects are in Stack.jsx and index.css. If reconnecting, use DeferredScene/lazy loading and retain reduced-motion handling and matching buffer counts.
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

/* Legacy toolkit node count; must exceed one because spacing divides by count minus one. */
const NODE_COUNT = 18;

/* Legacy spherical nodes/rings and links; golden-angle spacing and axis scales define the composition. */
function ToolkitSystem({ motion }) {
  /* Legacy scene group ref; transforms affect all nested nodes/rings. */
  const root = useRef(null);
  /* Central mesh ref; useFrame mutates its transform without rerendering React. */
  const core = useRef(null);
  /* Legacy inner wireframe mesh ref, rotated separately to create layered depth. */
  const inner = useRef(null);
  /* Mutable mesh-ref array indexed like the rendered ring list. */
  const rings = useRef([]);

  /* Golden-angle node distribution; XYZ multipliers set ellipsoid proportions. */
  const nodes = useMemo(() => Array.from({ length: NODE_COUNT }, (_, i) => {
    /* Golden angle in radians for approximately even spherical placement. */
    const golden = Math.PI * (3 - Math.sqrt(5));
    /* Normalized vertical coordinate, distributed from +1 to -1 for spherical node placement. */
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    /* Base orbit radius with deterministic variation; larger values widen the particle field. */
    const radius = Math.sqrt(1 - y * y);
    /* Golden-angle rotation multiplied by node index to spread nodes around the sphere. */
    const theta = golden * i;
    /* Return { position: [ Math.cos(theta) * radius * 1.75, y * 1.75, Math.sin(theta) * radius * 1.15 ], pha; this ends the current function path. */
    return {
      /* XYZ coordinates in scene units; edit axes to reposition geometry. */
      position: [
        Math.cos(theta) * radius * 1.75,
        y * 1.75,
        Math.sin(theta) * radius * 1.15
      ],
      /* Offset staggering periodic particle movement. */
      phase: i * 0.37
    };
  }), []);

  /* Memoized legacy toolkit XYZ buffer; frame updates reuse the allocation. */
  const particlePositions = useMemo(() => {
    /* Number of particles; also update the matching Float32Array allocation and bufferAttribute count when changing. */
    const count = 110;
    /* Writable position buffer; signal needsUpdate after CPU-side edits. */
    const arr = new Float32Array(count * 3);
    /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
    for (let i = 0; i < count; i += 1) {
      /* Angle in radians; cosine/sine below map it onto the particle orbit. */
      const a = (i / count) * Math.PI * 2;
      /* Particle radius with deterministic index-based variation. */
      const r = 1.5 + ((i * 31) % 100) / 90;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3] = Math.cos(a) * r;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 1] = ((i * 47) % 100) / 50 - 1;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 2] = Math.sin(a) * r * 0.55;
    }
    /* Return arr; this ends the current function path. */
    return arr;
  }, []);

  /* Particle definitions or Points ref in this local scope; the frame loop uses it to access stable particle data/geometry. */
  const particles = useRef(null);

  /* Run in the Three.js frame loop. Mutate refs/buffers instead of React state; delta is elapsed seconds. */
  useFrame((state, delta) => {
    /* Guard: !motion. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!motion) return;
    /* Elapsed animation seconds, or zero for a static pose; multipliers below control frequency. */
    const t = state.clock.elapsedTime;

    /* Guard: root.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (root.current) {
      /* Pointer-driven X-axis target; damp smooths the approach using frame delta. */
      const targetX = state.pointer.y * 0.11;
      /* Pointer-driven Y-axis target; keep multipliers modest for readable content. */
      const targetY = state.pointer.x * 0.14;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetX, 2.2, delta);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY, 2.2, delta);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      root.current.rotation.z += delta * 0.025;
    }

    /* Guard: core.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (core.current) {
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      core.current.rotation.x += delta * 0.18;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      core.current.rotation.y += delta * 0.32;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      core.current.rotation.z += delta * 0.12;
      /* Uniform scale modulation; sine amplitude sets expansion/contraction strength. */
      const pulse = 1 + Math.sin(t * 2.1) * 0.035;
      /* Scale all three axes together so pulsing preserves the shape proportions. */
      core.current.scale.setScalar(pulse);
    }

    /* Guard: inner.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (inner.current) {
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      inner.current.rotation.x -= delta * 0.26;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      inner.current.rotation.y += delta * 0.38;
    }

    /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
    rings.current.forEach((ring, index) => {
      /* Guard: !ring. Run the following branch only when true; preserve early returns when modifying this flow. */
      if (!ring) return;
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      ring.rotation.z += delta * (0.08 + index * 0.025);
      /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
      ring.rotation.x += delta * (index === 1 ? 0.035 : 0.015);
    });

    /* Guard: particles.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (particles.current) {
      /* Writable position buffer; signal needsUpdate after CPU-side edits. */
      const arr = particles.current.geometry.attributes.position.array;
      /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
      for (let i = 0; i < arr.length; i += 3) {
        /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
        arr[i + 1] += delta * 0.018;
        /* Guard: arr[i + 1] > 1.15. Run the following branch only when true; preserve early returns when modifying this flow. */
        if (arr[i + 1] > 1.15) arr[i + 1] = -1.15;
      }
      /* Mark CPU-side geometry/texture edits for upload to the GPU on the next render. */
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    /* Transform children together; positions use scene units and rotations use radians. */
    <group ref={root} position={[0.55, 0, -0.7]} scale={0.92}>
      {/* Three.js point cloud; position buffers live under geometry.attributes. */}<points ref={particles}>
        {/* Own the particle vertex buffers. */}<bufferGeometry>
          {/* Attach XYZ float data; count is vertices, itemSize=3 is floats per point. Keep both aligned with allocation. */}<bufferAttribute
            attach="attributes-position"
            count={110}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        {/* Sprite appearance: size/opacity/color control visibility; transparent enables alpha, depthWrite=false avoids occlusion artifacts. */}<pointsMaterial
          size={0.026}
          color={RUST}
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={core}>
        {/* Polyhedron args are radius and subdivision detail; more detail adds edges. */}<icosahedronGeometry args={[0.68, 1]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh ref={inner} scale={0.46}>
        {/* Polyhedron args are radius and subdivision detail; more detail adds edges. */}<icosahedronGeometry args={[0.68, 1]} />
        {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
          color={RUST}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {[0, 1, 2].map((index) => (
        /* Combine geometry/material; position/rotation/scale define initial transform. */
        <mesh
          key={index}
          ref={(node) => { /* Store the mounted ring mesh at its render index for per-frame animation; React clears it on unmount. */ rings.current[index] = node; }}
          rotation={[
            index * 0.75,
            index * 0.5,
            index * 0.9
          ]}
        >
          {/* Ring args are radius, tube thickness, radial segments, and tubular segments. */}<torusGeometry args={[
            0.95 + index * 0.22,
            0.006 + index * 0.002,
            8,
            128
          ]} />
          {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
            color={index === 1 ? INK : RUST}
            transparent
            opacity={index === 1 ? 0.12 : 0.24}
          />
        </mesh>
      ))}

      {nodes.map((node, index) => (
        /* Transform children together; positions use scene units and rotations use radians. */
        <group key={index} position={node.position}>
          {/* Combine geometry/material; position/rotation/scale define initial transform. */}<mesh>
            {/* Sphere args are radius and segment counts; more segments cost rendering work. */}<sphereGeometry args={[index % 4 === 0 ? 0.055 : 0.032, 10, 10]} />
            {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
              color={index % 4 === 0 ? RUST : INK}
              transparent
              opacity={index % 4 === 0 ? 0.72 : 0.35}
            />
          </mesh>
        </group>
      ))}

      {nodes.filter((_, i) => i % 2 === 0).map((node, index) => {
        /* Choose a wrapped partner index for this legacy connector; changing the offset changes the network pattern. */
        const next = nodes[(index * 2 + 5) % nodes.length];
        /* Connector start endpoint as a Three.js vector. */
        const start = new THREE.Vector3(...node.position);
        /* Connector end endpoint as a Three.js vector. */
        const end = new THREE.Vector3(...next.position);
        /* Average link endpoint position; the connector cylinder is centered here. */
        const midpoint = start.clone().add(end).multiplyScalar(0.5);
        /* Endpoint difference vector gives connector orientation and length. */
        const direction = end.clone().sub(start);
        /* Distance between connector endpoints; cylinder height must match it. */
        const length = direction.length();

        return (
          /* Combine geometry/material; position/rotation/scale define initial transform. */
          <mesh
            key={"link-" + index}
            position={midpoint}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.normalize()
            )}
          >
            {/* Connector args are top/bottom radius, length, and radial segments; mesh quaternion sets direction. */}<cylinderGeometry args={[0.004, 0.004, length, 6]} />
            {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial
              color={RUST}
              transparent
              opacity={0.13}
            />
          </mesh>
        );
      })}

      {/* Point light affects lit materials; meshBasicMaterial remains unaffected. */}<pointLight color={RUST} intensity={0.25} distance={4} />
    </group>
  );
}

/* Legacy optional WebGL toolkit experiment, currently not imported by Stack. Live toolkit effects are in Stack.jsx and index.css. If reconnecting, use DeferredScene/lazy loading and retain reduced-motion handling and matching buffer counts. */
export default function ToolkitThreeScene() {
  /* User motion preference; preserve static content when animation is disabled. */
  const reducedMotion = useReducedMotion();
  return (
    /* WebGL host: dpr caps resolution; camera controls framing; alpha preserves transparency; demand renders static reduced-motion scenes. */
    <Canvas
      dpr={[1, 1.5]}
      camera={{ /* XYZ coordinates in scene units; edit axes to reposition geometry. */ position: [0, 0, 5], fov: 35, near: 0.1, far: 20 }}
      gl={{
        /* Enable smoother WebGL edges; alpha preserves transparency and powerPreference is a browser GPU hint, not a guarantee. */
        antialias: true,
        /* Allow a transparent canvas background so the paper color remains visible. */
        alpha: true,
        /* Hint which GPU/power profile to prefer; browser/hardware makes the final choice. */
        powerPreference: "high-performance"
      }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      {/* Render ToolkitSystem; edit its imported component for behavior instead of duplicating it here. */}<ToolkitSystem motion={!reducedMotion} />
    </Canvas>
  );
}
