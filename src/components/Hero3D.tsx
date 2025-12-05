import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Sphere,
  Icosahedron,
  Torus,
  MeshDistortMaterial,
  Float,
  Sparkles,
  Stars,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import styles from './Hero3D.module.css';

const CyberneticCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Core pulsation
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y = t * 0.5;
    }

    // Shell distortion movement
    if (shellRef.current) {
      shellRef.current.rotation.x = t * 0.2;
      shellRef.current.rotation.z = t * 0.1;
    }

    // Ring rotations (Gyroscopic effect)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3;
      ring2Ref.current.rotation.y = t * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.4;
      ring3Ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group scale={[1.2, 1.2, 1.2]}>
      {/* Inner Glowing Nucleus */}
      <Icosahedron args={[1, 1]} ref={coreRef}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          roughness={0}
          metalness={1}
        />
      </Icosahedron>

      {/* Outer Distorted Shell */}
      <Sphere args={[1.4, 64, 64]} ref={shellRef}>
        <MeshDistortMaterial
          color="#4444ff"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Orbital Rings */}
      <Torus args={[2.2, 0.05, 16, 100]} ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1.5} toneMapped={false} />
      </Torus>

      <Torus args={[2.6, 0.05, 16, 100]} ref={ring2Ref} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} toneMapped={false} />
      </Torus>

      <Torus args={[3.0, 0.05, 16, 100]} ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} toneMapped={false} />
      </Torus>
    </group>
  );
};

const Hero3D = () => {
  return (
    <div className={styles.hero3dWrapper}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />

        {/* Floating Animation Container */}
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <CyberneticCore />
        </Float>

        {/* Environment Effects */}
        <Sparkles
          count={100}
          scale={10}
          size={2}
          speed={0.4}
          opacity={0.5}
          color="#00ffff"
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;
