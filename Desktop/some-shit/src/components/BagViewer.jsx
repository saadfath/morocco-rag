import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useRef } from 'react';
import useOrderStore from '../store/useOrderStore';

/**
 * Procedural 3D Tote Bag mesh
 * Renders a rectangular tote with handles and sequin texture
 */
function ToteBag() {
  const meshRef = useRef();
  const sequinColor = useOrderStore((state) => state.sequinColor);
  const sequinStyle = useOrderStore((state) => state.sequinStyle);

  const roughness = sequinStyle === 'glossy' ? 0.2 : 0.9;

  return (
    <group>
      {/* Main bag body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 3, 1]} />
        <meshStandardMaterial
          color={sequinColor}
          roughness={roughness}
          metalness={0.4}
        />
      </mesh>

      {/* Left handle */}
      <mesh position={[-0.7, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color={sequinColor} roughness={roughness} />
      </mesh>

      {/* Right handle */}
      <mesh position={[0.7, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color={sequinColor} roughness={roughness} />
      </mesh>
    </group>
  );
}

/**
 * Procedural 3D Clutch Bag mesh
 * Renders a slim box clutch with metal frame and front panel
 */
function ClutchBag() {
  const frameColor = useOrderStore((state) => state.frameColor);
  const panelColor = useOrderStore((state) => state.panelColor);

  const frameColorMap = {
    gold: '#C9A84C',
    silver: '#C0C0C0',
    'rose-gold': '#E0BFB8',
  };

  return (
    <group>
      {/* Main clutch body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.8, 0.6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Front panel */}
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[2.6, 1.5]} />
        <meshStandardMaterial color={panelColor} roughness={0.4} />
      </mesh>

      {/* Frame edges (top) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3.1, 0.08, 0.7]} />
        <meshStandardMaterial
          color={frameColorMap[frameColor]}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Frame edges (bottom) */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[3.1, 0.08, 0.7]} />
        <meshStandardMaterial
          color={frameColorMap[frameColor]}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Chain attachment left */}
      <mesh position={[-1.4, 0.9, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={frameColorMap[frameColor]}
          metalness={0.9}
        />
      </mesh>

      {/* Chain attachment right */}
      <mesh position={[1.4, 0.9, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={frameColorMap[frameColor]}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

/**
 * Main 3D viewer component with React Three Fiber
 * Displays the selected bag type with live customization updates
 */
export default function BagViewer() {
  const bagType = useOrderStore((state) => state.bagType);

  return (
    <div className="w-full h-full min-h-[400px] bg-zinc-900 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="studio" />
        
        {bagType === 'tote' ? <ToteBag /> : <ClutchBag />}
        
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
