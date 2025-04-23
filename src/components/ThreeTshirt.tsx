
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh, Group, Euler } from 'three';
import { OrbitControls } from '@react-three/drei';

function TShirtModel({ rotation }: { rotation: [number, number, number] }) {
  // Simple approximation: body (cylinder), sleeves (2 boxes), neck (torus)
  const body = useRef<Mesh>(null);
  const leftSleeve = useRef<Mesh>(null);
  const rightSleeve = useRef<Mesh>(null);

  return (
    <group rotation={rotation}>
      {/* T-shirt Body */}
      <mesh ref={body} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.95, 2.1, 32]} />
        <meshPhysicalMaterial color="#9b87f5" roughness={.35} metalness={.25} clearcoat={.5} transparent opacity={0.93} />
      </mesh>
      {/* Left Sleeve */}
      <mesh ref={leftSleeve} position={[-1, 0.5, 0]} rotation={[0, 0, 0.33]}>
        <boxGeometry args={[0.64, 0.67, 1.1]} />
        <meshPhysicalMaterial color="#9b87f5" roughness={.5} metalness={.15} opacity={0.86} transparent />
      </mesh>
      {/* Right Sleeve */}
      <mesh ref={rightSleeve} position={[1, 0.5, 0]} rotation={[0, 0, -0.33]}>
        <boxGeometry args={[0.64, 0.67, 1.1]} />
        <meshPhysicalMaterial color="#9b87f5" roughness={.5} metalness={.15} opacity={0.86} transparent />
      </mesh>
      {/* Neck (Torus) */}
      <mesh position={[0, 1.08, 0]}>
        <torusGeometry args={[0.32, 0.12, 18, 36]} />
        <meshPhysicalMaterial color="#fff" roughness={0.6} metalness={0.14} />
      </mesh>
    </group>
  );
}

export default function ThreeTshirt() {
  // Rotation state — controlled by mouse or drag
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  // For drag
  const dragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mouse drag handler
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
      Math.max(-Math.PI/5, Math.min(Math.PI/5, rot[0] + dy * 0.01)),
      rot[1] + dx * 0.015,
      0,
    ]);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  // Desktop: mouse move for rotation; Mobile: drag
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 380,
        height: 360,
        margin: '0 auto',
        touchAction: 'none',
        borderRadius: '2rem',
        boxShadow: '0 4px 48px #9b87f532, 0 1px 5px #fff3'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          borderRadius: '2rem',
        }}
        camera={{ position: [0, 0.6, 4.4], fov: 34 }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 2.7, 7]} intensity={0.85} />
        <TShirtModel rotation={rotation} />
      </Canvas>
    </div>
  );
}
