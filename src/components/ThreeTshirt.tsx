
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows } from '@react-three/drei';

// More realistic T-shirt with proper geometry and natural materials
function RealisticTShirt({ rotation }: { rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Add subtle autonomous movement
      meshRef.current.rotation.y = rotation[1];
      meshRef.current.rotation.x = rotation[0];
    }
  });

  return (
    <group ref={meshRef} rotation={rotation} position={[0, 0, 0]}>
      {/* Main body - more realistic with better proportions */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.73, 0.93, 2.18, 64, 6, true]} />
        <meshPhysicalMaterial
          color="#d3c6f8"
          roughness={0.24}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          transmission={0.06}
          thickness={0.6}
          envMapIntensity={0.8}
          sheen={0.8}
          sheenColor="#ffffff"
        />
      </mesh>
      
      {/* Left Sleeve - more realistic curved shape */}
      <mesh position={[-1.01, 0.57, 0]} rotation={[0, 0, 0.34]}>
        <cylinderGeometry args={[0.32, 0.42, 0.7, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#c0b3f5"
          roughness={0.28}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>
      
      {/* Right Sleeve - more realistic curved shape */}
      <mesh position={[1.01, 0.57, 0]} rotation={[0, 0, -0.34]}>
        <cylinderGeometry args={[0.32, 0.42, 0.7, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#c0b3f5"
          roughness={0.28}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Neckline - better collar shape */}
      <mesh position={[0, 1.10, 0]}>
        <torusGeometry args={[0.33, 0.09, 32, 48]} />
        <meshPhysicalMaterial 
          color="#e5e1fa" 
          roughness={0.25} 
          metalness={0.05} 
          clearcoat={0.3}
        />
      </mesh>
      
      {/* Lower hem - smoother appearance */}
      <mesh position={[0, -1.10, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.79, 0.07, 32, 64]} />
        <meshPhysicalMaterial 
          color="#c0b3f5" 
          roughness={0.28} 
          metalness={0.05} 
          clearcoat={0.3}
        />
      </mesh>
      
      {/* Subtle front texture/logo or pattern */}
      <mesh position={[0, 0.25, 0.7]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.64, 0.64]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          opacity={0.14} 
          transparent 
          roughness={0.4}
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* Fabric wrinkles/folds for realism */}
      <mesh position={[0, -0.3, 0.75]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.73, 0.73, 0.2, 32, 3]} />
        <meshPhysicalMaterial
          color="#d3c6f8"
          roughness={0.28}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          opacity={0.7}
          transparent
        />
      </mesh>
    </group>
  );
}

export default function ThreeTshirt() {
  // State for 3D rotation and movement
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const dragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationSpeed = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);

  // Handle mouse/touch interaction for rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    autoRotate.current = false; // Stop auto rotation when user interacts
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { x, y } = lastPos.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    
    rotationSpeed.current = { 
      x: dy * 0.003, 
      y: dx * 0.003 
    };
    
    setRotation(rot => [
      Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rot[0] + rotationSpeed.current.x)),
      rot[1] + rotationSpeed.current.y,
      0
    ]);
    
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
    // Re-enable auto rotation after inactivity
    setTimeout(() => {
      autoRotate.current = true;
    }, 3000);
  };

  // Subtle auto-rotation when not being interacted with
  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;
      
      if (autoRotate.current && !dragging.current) {
        setRotation(rotation => [
          rotation[0], 
          rotation[1] + 0.0005 * delta, 
          rotation[2]
        ]);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Also allow rotation on mouse move for subtle interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) return; // Don't interfere with active dragging
    
    // Only update on mouse move if not dragging
    const bounding = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const xNorm = (e.clientX - bounding.left) / bounding.width;
    const yNorm = (e.clientY - bounding.top) / bounding.height;
    
    // Add subtle tilt based on mouse position
    setRotation(([rx, ry, rz]) => [
      (yNorm - 0.5) * 0.3,
      (xNorm - 0.5) * 0.6 + ry,
      rz
    ]);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '370px',
        position: 'relative',
        background: 'transparent',
        pointerEvents: 'auto',
        zIndex: 10,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, toneMappingExposure: 1.2 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none'
        }}
        camera={{ position: [0, 0.6, 4.5], fov: 31 }}
        shadows
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.7} color="#b2a4ed" />
        
        {/* Main directional light - softer lighting */}
        <directionalLight
          position={[3.2, 2.8, 7]}
          intensity={0.85}
          color="#ffffff"
          castShadow
        />
        
        {/* Rim lighting for realism */}
        <directionalLight
          position={[-5, 5, -7]}
          intensity={0.35}
          color="#9b87f5"
        />
        
        {/* Fill light from below */}
        <directionalLight
          position={[0, -3, 2]}
          intensity={0.15}
          color="#e5e1fa"
        />

        {/* The t-shirt model itself */}
        <RealisticTShirt rotation={rotation} />
        
        {/* Subtle shadow under t-shirt */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.2}
          scale={6}
          blur={2.5}
        />
      </Canvas>
    </div>
  );
}
