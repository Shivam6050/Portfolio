/**
 * Shared rust particles behind portrait, projects, and contact. Tune PARTICLE_COUNT for density, material size/opacity for appearance, caller speedMultiplier/spreadMultiplier for motion. Reuse typed arrays per frame; dispose textures on cleanup. Reduced motion uses a static demand frame.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useEffect, useMemo, useRef } from "react";
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
/* Particle count drives array size/loop/geometry; reduce for lower per-frame CPU work. */
const PARTICLE_COUNT = 180;

/* Draw a soft radial sprite onto an offscreen canvas, then upload via CanvasTexture. Materials provide color; disposal belongs to the owning effect. */
function createParticleTexture() {
  /* Sprite texture resolution in pixels; this is not the displayed particle size, which is set by pointsMaterial. */
  const size = 64;
  /* Offscreen HTML canvas used to build the particle texture; its pixel width/height are assigned before drawing. */
  const canvas = document.createElement("canvas");
  /* Set square texture pixel dimensions before drawing; resize the sprite via size rather than altering one axis alone. */
  canvas.width = size;
  /* Set square texture pixel dimensions before drawing; resize the sprite via size rather than altering one axis alone. */
  canvas.height = size;
  /* Offscreen 2D context used to paint the sprite texture. */
  const ctx = canvas.getContext("2d");
  /* Radial alpha falloff; stop positions and opacity tune soft particle edges. */
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  /* Keep the sprite center fully opaque; material color tints this white texture. */
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  /* Keep most of the disc nearly opaque before the soft edge fade; adjust this stop to change edge softness. */
  gradient.addColorStop(0.72, "rgba(255,255,255,0.98)");
  /* Fade the outer edge to transparent so particles do not render as square tiles. */
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  /* Select the radial gradient as the canvas paint source. */
  ctx.fillStyle = gradient;
  /* Paint the full sprite area; the gradient makes its border transparent. */
  ctx.fillRect(0, 0, size, size);
  /* Three.js CanvasTexture created from the painted canvas; the owning effect disposes it on unmount. */
  const texture = new THREE.CanvasTexture(canvas);
  /* Mark CPU-side geometry/texture edits for upload to the GPU on the next render. */
  texture.needsUpdate = true;
  /* Return texture; this ends the current function path. */
  return texture;
}


/* Allocate deterministic particle parameters/XYZ buffers once, then mutate geometry each frame without React state updates. */
function AuraParticles({ motion = true, speedMultiplier = 1, spreadMultiplier = 1 }) {
  /* Memoized texture; upload flag and dispose cleanup keep GPU resource ownership explicit. */
  const particleTexture = useMemo(createParticleTexture, []);
  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Mark CPU-side geometry/texture edits for upload to the GPU on the next render. */
    particleTexture.needsUpdate = true;
    /* Release the owned resource during cleanup; preserve disposal when changing scene/texture ownership. */
    return () => particleTexture.dispose();
  }, [particleTexture]);
  /* Three.js Points ref for direct geometry/rotation updates. */
  const points = useRef(null);
  /* Memoized deterministic particle parameters; the empty dependency array keeps phases stable across rerenders. */
  const data = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    /* Angle in radians; cosine/sine below map it onto the particle orbit. */
    const a = (i / PARTICLE_COUNT) * Math.PI * 2;
    /* One of three depth lanes (index modulo three) used to separate particles along Z. */
    const lane = i % 3;
    /* Deterministic per-particle speed variation; change the base/range to tune motion without random rerender jumps. */
    const speed = 0.17 + ((i * 19) % 13) / 120;
    /* Return { angle: a + Math.sin(i * 2.7) * 0.11, radius: 0.05 + ((i * 23) % 47) / 180, speed, spread: 0.7; this ends the current function path. */
    return {
      /* Base angle in radians for deterministic particle placement. */
      angle: a + Math.sin(i * 2.7) * 0.11,
      /* Base orbit radius in scene units. */
      radius: 0.05 + ((i * 23) % 47) / 180,
      /* Per-particle travel/rotation rate. */
      speed,
      /* Per-particle spread variation. */
      spread: 0.7 + ((i * 11) % 29) / 40,
      /* Particle depth group. */
      lane,
      /* Offset staggering periodic particle movement. */
      phase: (i * 0.173) % (Math.PI * 2),
      /* Base depth coordinate. */
      z: -0.25 + lane * 0.12
    };
  }), []);
  /* Reusable XYZ Float32Array; each point occupies three consecutive entries. */
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  /* Run in the Three.js frame loop. Mutate refs/buffers instead of React state; delta is elapsed seconds. */
  useFrame((state, delta) => {
    /* Guard: !points.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!points.current) return;
    /* Elapsed animation seconds, or zero for a static pose; multipliers below control frequency. */
    const t = motion ? state.clock.elapsedTime : 0;
    /* Writable position buffer; signal needsUpdate after CPU-side edits. */
    const arr = points.current.geometry.attributes.position.array;

    /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      /* Parameters for this loop particle, reused to calculate its three coordinates. */
      const p = data[i];
      /* Wrapped lifetime fraction; speedMultiplier changes repeat speed. */
      const cycle = (t * p.speed * speedMultiplier + p.phase) % 1;
      /* Outward travel radius scaled by spreadMultiplier. */
      const travel = (0.08 + cycle * 2.65) * spreadMultiplier;
      /* Sine-based radius modulation; reduce amplitude for quieter movement. */
      const breathing = 1 + Math.sin(t * 1.7 + p.phase) * 0.1;
      /* Sideways curved-path offset scaled by particle spread and lifetime. */
      const arc = Math.sin(cycle * Math.PI) * 0.62 * p.spread * spreadMultiplier;

      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3] = Math.cos(p.angle) * travel * p.spread * breathing +
        Math.cos(p.angle + Math.PI / 2) * arc;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 1] = Math.sin(p.angle) * travel * p.spread * breathing +
        Math.sin(p.angle + Math.PI / 2) * arc;
      /* Write an XYZ buffer coordinate: consecutive 3*i, 3*i+1, 3*i+2 entries are X, Y, Z. Keep bounds within allocated length. */
      arr[i * 3 + 2] = p.z + Math.sin(t * 1.25 + p.phase) * 0.16 + cycle * 0.35;
    }

    /* Mark CPU-side geometry/texture edits for upload to the GPU on the next render. */
    points.current.geometry.attributes.position.needsUpdate = true;

    /* Pointer-driven X-axis target; damp smooths the approach using frame delta. */
    const targetX = motion ? state.pointer.y * 0.035 : 0;
    /* Pointer-driven Y-axis target; keep multipliers modest for readable content. */
    const targetY = motion ? state.pointer.x * 0.05 : 0;
    /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, targetX, 3, delta);
    /* Change rotation in radians. damp smooths targets; delta-scaled increments preserve speed across frame rates. */
    points.current.rotation.y = THREE.MathUtils.damp(points.current.rotation.y, targetY, 3, delta);
  });

  return (
    /* Three.js point cloud; position buffers live under geometry.attributes. */
    <points ref={points}>
      {/* Own the particle vertex buffers. */}<bufferGeometry>
        {/* Attach XYZ float data; count is vertices, itemSize=3 is floats per point. Keep both aligned with allocation. */}<bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      {/* Sprite appearance: size/opacity/color control visibility; transparent enables alpha, depthWrite=false avoids occlusion artifacts. */}<pointsMaterial
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

/* Render the small center sphere and pulse its scale; sine amplitude controls visual intensity. */
function EmberCore({ motion }) {
  /* Mutable object/DOM handle; attach it to the rendered target before reading .current. Ref mutations do not trigger React renders. */
  const ref = useRef(null);
  /* Run in the Three.js frame loop. Mutate refs/buffers instead of React state; delta is elapsed seconds. */
  useFrame((state) => {
    /* Guard: !ref.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!ref.current) return;
    /* Uniform scale modulation; sine amplitude sets expansion/contraction strength. */
    const pulse = 0.9 + Math.sin((motion ? state.clock.elapsedTime : 0) * 2.8) * 0.1;
    /* Scale all three axes together so pulsing preserves the shape proportions. */
    ref.current.scale.setScalar(pulse);
  });

  return (
    /* Combine geometry/material; position/rotation/scale define initial transform. */
    <mesh ref={ref} position={[0, 0, 0.32]}>
      {/* Sphere args are radius and segment counts; more segments cost rendering work. */}<sphereGeometry args={[0.07, 12, 12]} />
      {/* Unlit material; wireframe draws edges and opacity requires transparent. Lights do not affect this material. */}<meshBasicMaterial color={RUST} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* Shared rust particles behind portrait, projects, and contact. Tune PARTICLE_COUNT for density, material size/opacity for appearance, caller speedMultiplier/spreadMultiplier for motion. Reuse typed arrays per frame; dispose textures on cleanup. Reduced motion uses a static demand frame. */
function Scene({ motion, speedMultiplier, spreadMultiplier }) {
  return (
    /* Transform children together; positions use scene units and rotations use radians. */
    <group position={[0, 0, -0.7]}>
      {/* Render AuraParticles; edit its imported component for behavior instead of duplicating it here. */}<AuraParticles motion={motion} speedMultiplier={speedMultiplier} spreadMultiplier={spreadMultiplier} />
      {/* Render EmberCore; edit its imported component for behavior instead of duplicating it here. */}<EmberCore motion={motion} />
    </group>
  );
}

/* Shared rust particles behind portrait, projects, and contact. Tune PARTICLE_COUNT for density, material size/opacity for appearance, caller speedMultiplier/spreadMultiplier for motion. Reuse typed arrays per frame; dispose textures on cleanup. Reduced motion uses a static demand frame. */
export default function AuraParticleCanvas({ motion = true, speedMultiplier = 1, spreadMultiplier = 1 }) {
  /* User motion preference; preserve static content when animation is disabled. */
  const reducedMotion = useReducedMotion();
  /* Continuous motion only when both caller and reduced-motion preference permit it. */
  const animate = motion && !reducedMotion;
  return (
    /* WebGL host: dpr caps resolution; camera controls framing; alpha preserves transparency; demand renders static reduced-motion scenes. */
    <Canvas
      dpr={[1, 1.5]}
      camera={{ /* XYZ coordinates in scene units; edit axes to reposition geometry. */ position: [0, 0, 5], fov: 36, near: 0.1, far: 20 }}
      gl={{ /* Enable smoother WebGL edges; alpha preserves transparency and powerPreference is a browser GPU hint, not a guarantee. */ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
    >
      {/* Render Scene; edit its imported component for behavior instead of duplicating it here. */}<Scene motion={animate} speedMultiplier={speedMultiplier} spreadMultiplier={spreadMultiplier} />
    </Canvas>
  );
}
