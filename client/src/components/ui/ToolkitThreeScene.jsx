import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RUST = "#b8431a";
const INK = "#141413";

const NODE_COUNT = 18;

function ToolkitSystem() {
  const root = useRef(null);
  const core = useRef(null);
  const inner = useRef(null);
  const rings = useRef([]);

  const nodes = useMemo(() => Array.from({ length: NODE_COUNT }, (_, i) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return {
      position: [
        Math.cos(theta) * radius * 1.75,
        y * 1.75,
        Math.sin(theta) * radius * 1.15
      ],
      phase: i * 0.37
    };
  }), []);

  const particlePositions = useMemo(() => {
    const count = 110;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2;
      const r = 1.5 + ((i * 31) % 100) / 90;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = ((i * 47) % 100) / 50 - 1;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.55;
    }
    return arr;
  }, []);

  const particles = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (root.current) {
      const targetX = state.pointer.y * 0.11;
      const targetY = state.pointer.x * 0.14;
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetX, 2.2, delta);
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY, 2.2, delta);
      root.current.rotation.z += delta * 0.025;
    }

    if (core.current) {
      core.current.rotation.x += delta * 0.18;
      core.current.rotation.y += delta * 0.32;
      core.current.rotation.z += delta * 0.12;
      const pulse = 1 + Math.sin(t * 2.1) * 0.035;
      core.current.scale.setScalar(pulse);
    }

    if (inner.current) {
      inner.current.rotation.x -= delta * 0.26;
      inner.current.rotation.y += delta * 0.38;
    }

    rings.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.z += delta * (0.08 + index * 0.025);
      ring.rotation.x += delta * (index === 1 ? 0.035 : 0.015);
    });

    if (particles.current) {
      const arr = particles.current.geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += delta * 0.018;
        if (arr[i + 1] > 1.15) arr[i + 1] = -1.15;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={root} position={[0.55, 0, -0.7]} scale={0.92}>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={110}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.026}
          color={RUST}
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh ref={inner} scale={0.46}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color={RUST}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(node) => { rings.current[index] = node; }}
          rotation={[
            index * 0.75,
            index * 0.5,
            index * 0.9
          ]}
        >
          <torusGeometry args={[
            0.95 + index * 0.22,
            0.006 + index * 0.002,
            8,
            128
          ]} />
          <meshBasicMaterial
            color={index === 1 ? INK : RUST}
            transparent
            opacity={index === 1 ? 0.12 : 0.24}
          />
        </mesh>
      ))}

      {nodes.map((node, index) => (
        <group key={index} position={node.position}>
          <mesh>
            <sphereGeometry args={[index % 4 === 0 ? 0.055 : 0.032, 10, 10]} />
            <meshBasicMaterial
              color={index % 4 === 0 ? RUST : INK}
              transparent
              opacity={index % 4 === 0 ? 0.72 : 0.35}
            />
          </mesh>
        </group>
      ))}

      {nodes.filter((_, i) => i % 2 === 0).map((node, index) => {
        const next = nodes[(index * 2 + 5) % nodes.length];
        const start = new THREE.Vector3(...node.position);
        const end = new THREE.Vector3(...next.position);
        const midpoint = start.clone().add(end).multiplyScalar(0.5);
        const direction = end.clone().sub(start);
        const length = direction.length();

        return (
          <mesh
            key={"link-" + index}
            position={midpoint}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.normalize()
            )}
          >
            <cylinderGeometry args={[0.004, 0.004, length, 6]} />
            <meshBasicMaterial
              color={RUST}
              transparent
              opacity={0.13}
            />
          </mesh>
        );
      })}

      <pointLight color={RUST} intensity={0.25} distance={4} />
    </group>
  );
}

export default function ToolkitThreeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 35, near: 0.1, far: 20 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      frameloop="always"
    >
      <ToolkitSystem />
    </Canvas>
  );
}
