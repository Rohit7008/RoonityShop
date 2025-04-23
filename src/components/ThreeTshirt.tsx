
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

// Realistic T-shirt: torus for neck, cylinder trunk, two mesh spheres for sleeves, and curved planes for structure & shape.
function RealisticTShirt({ rotation }: { rotation: [number, number, number] }) {
  // No need for refs; everything is static geometry
  return (
    <group rotation={rotation}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.73, 0.93, 2.18, 42, 2, true]} />
        <meshPhysicalMaterial
          color="#d3c6f8"
          roughness={0.30}
          metalness={0.16}
          clearcoat={0.86}
          clearcoatRoughness={0.46}
          transmission={0.085}
          sheen={1.0}
          sheenColor="#fff"
          ior={1.6}
          thickness={0.37}
        />
      </mesh>
      {/* Left Sleeve */}
      <mesh position={[-1.01, 0.57, 0]} rotation={[0, 0, 0.34]}>
        <sphereGeometry args={[0.48, 28, 16, 0, Math.PI, 0, Math.PI]} />
        <meshPhysicalMaterial
          color="#b2a4ed"
          roughness={0.36}
          metalness={0.14}
          sheen={0.5}
          transparent
          opacity={0.93}
        />
      </mesh>
      {/* Right Sleeve */}
      <mesh position={[1.01, 0.57, 0]} rotation={[0, 0, -0.34]}>
        <sphereGeometry args={[0.48, 28, 16, 0, Math.PI, 0, Math.PI]} />
        <meshPhysicalMaterial
          color="#b2a4ed"
          roughness={0.36}
          metalness={0.14}
          sheen={0.5}
          transparent
          opacity={0.93}
        />
      </mesh>
      {/* Neckband */}
      <mesh position={[0, 1.10, 0]}>
        <torusGeometry args={[0.33, 0.09, 26, 44]} />
        <meshPhysicalMaterial color="#fff" roughness={0.34} metalness={0.16} />
      </mesh>
      {/* Lower hem */}
      <mesh position={[0, -1.10, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.79, 0.07, 26, 48]} />
        <meshPhysicalMaterial color="#b2a4ed" roughness={0.33} metalness={0.09} opacity={0.94} transparent />
      </mesh>
      {/* Simulated subtle pattern/highlight */}
      <mesh position={[0, 0.25, 0.49]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.64, 1.5, 8, 8]} />
        <meshStandardMaterial color="#fff" opacity={0.18} transparent />
      </mesh>
    </group>
  );
}

export default function ThreeTshirt() {
  // State for 3D rotation
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const dragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Rotate smoothly with dragging or pointer move
  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { x, y } = lastPos.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    setRotation(rot => [
      Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, rot[0] + dy * 0.012)),
      rot[1] + dx * 0.022,
      0
    ]);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  // Also allow rotation on mouse move (not just drag)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) return; // prioritize drag
    // Map to rotation (screen X: 0 to width)
    const bounding = (e.target as HTMLDivElement).getBoundingClientRect();
    const xNorm = (e.clientX - bounding.left) / bounding.width;
    setRotation(([rx, , rz]) => [
      rx,
      (xNorm - 0.5) * Math.PI * 2,
      rz
    ]);
  };

  // Fully transparent and borderless!
  return (
    <div
      style={{
        width: '100%',
        height: '370px',
        position: 'relative',
        background: 'none',
        pointerEvents: 'auto', // allow pointer through for drag
        zIndex: 10, // on top of particles
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, toneMappingExposure: 1.13 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'none',
          pointerEvents: 'none' // Canvas doesn't block particle interactivity
        }}
        camera={{ position: [0, 0.6, 4.2], fov: 31 }}
        shadows
      >
        {/* Subtly colored lights for soft realism */}
        <ambientLight intensity={0.63} color="#b2a4ed" />
        <directionalLight
          position={[3.2, 2.8, 7]}
          intensity={0.87}
          color="#fffad7"
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        {/* Slight back rim light */}
        <directionalLight
          position={[-5, 5, -7]}
          intensity={0.28}
          color="#9b87f5"
        />
        <RealisticTShirt rotation={rotation} />
      </Canvas>
    </div>
  );
}
