"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

// Define the hook curve statically
const curvePoints = [
  new THREE.Vector3(0, 0, 0),      // Shaft bottom
  new THREE.Vector3(-0.05, -0.4, 0), // Start curve
  new THREE.Vector3(-0.3, -0.7, 0),  // Bottom right of pocket
  new THREE.Vector3(-0.6, -0.7, 0),  // Bottom left of pocket
  new THREE.Vector3(-0.8, -0.3, 0),  // Up curve
  new THREE.Vector3(-0.6, 0.1, 0),   // Tip pointing inward
];
const hookCurve = new THREE.CatmullRomCurve3(curvePoints);

// Shared non-reactive state
const sharedState = {
  hookPosition: new THREE.Vector3(),
  hookVelocity: new THREE.Vector3(),
  hookRotation: new THREE.Euler(),
  isActive: false,
  attractedItemId: null // Track which item is currently being pulled
};

const HOOK_SCALE = 0.4; // Even smaller for better proportions

// Pre-compute USB Body Geometry with rounded corners
const usbBodyGeom = (() => {
  const shape = new THREE.Shape();
  const w = 0.4;
  const h = 0.8;
  const r = 0.08; // Radius of corners
  
  shape.moveTo(-w/2 + r, -h/2);
  shape.lineTo(w/2 - r, -h/2);
  shape.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
  shape.lineTo(w/2, h/2 - r);
  shape.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
  shape.lineTo(-w/2 + r, h/2);
  shape.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
  shape.lineTo(-w/2, -h/2 + r);
  shape.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
  
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02
  });
  geom.center();
  return geom;
})();

const Flag = () => {
  const flagRef = useRef(null);
  
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, c.width, c.height);
      
      ctx.strokeStyle = '#ff5500';
      ctx.lineWidth = 12;
      ctx.setLineDash([20, 15]);
      ctx.strokeRect(20, 20, c.width - 40, c.height - 40);
      
      ctx.fillStyle = '#222222';
      ctx.font = 'bold 90px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('innvikta', c.width / 2, c.height / 2);
    }
    return c;
  }, []);
  
  const texture = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);

  useFrame((state) => {
    if (!flagRef.current) return;
    const geom = flagRef.current.geometry;
    const position = geom.attributes.position;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const amp = (x + 0.2) * 0.4; 
      const z = Math.sin(x * 12 + time * 6) * amp;
      position.setZ(i, z);
    }
    geom.computeVertexNormals();
    position.needsUpdate = true;
  });

  return (
    <mesh ref={flagRef} position={[0.2, 0, 0]}>
      <planeGeometry args={[0.4, 0.2, 12, 6]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Ambient Particles for depth and atmosphere
const AmbientParticles = ({ count = 40 }) => {
  const mesh = useRef(null);
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 25;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ff5500"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Component for the fishing line
const FishingLine = ({ hookRef }) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!meshRef.current || !hookRef.current) return;

    // Origin point at the top RIGHT of the page (slightly off-screen in Y)
    const topPoint = new THREE.Vector3(viewport.width / 2.5, viewport.height / 2 + 2, 0);
    
    // Center top of the hook (using the group position directly)
    const hookAttachPoint = hookRef.current.position.clone();

    const distance = topPoint.distanceTo(hookAttachPoint);
    
    // Line stretching based on hook velocity
    const speed = sharedState.hookVelocity.length();
    const stretch = 1 + speed * 0.5;
    
    // Position at the midpoint
    meshRef.current.position.copy(topPoint).add(hookAttachPoint).multiplyScalar(0.5);
    
    // Scale length to match distance, but thinner when moving fast
    meshRef.current.scale.set(1 / stretch, distance, 1 / stretch);
    
    // Rotate to look at the hook attach point
    meshRef.current.lookAt(hookAttachPoint);
    meshRef.current.rotateX(Math.PI / 2); // Align cylinder axis
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.01, 0.01, 1, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </mesh>
  );
};

const Hook = () => {
  const hookRef = useRef(null);
  const { viewport, gl } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHookActive = useStore((state) => state.isHookActive);
  const setIsHookActive = useStore((state) => state.setIsHookActive);
  const finishCollection = useStore((state) => state.finishCollection);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hookRef.current && viewport.height) {
      // Start the hook ABOVE the viewport for a "drop-in" effect
      hookRef.current.position.set(viewport.width / 2.5, viewport.height / 2 + 5, 0);
      setHasEntered(true);
    }
  }, [viewport.height, viewport.width]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gl]);

  const resetGame = useStore((state) => state.resetGame);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'e' || e.key === 'E') {
        setIsHookActive(!isHookActive);
        if (!isHookActive && hookRef.current) {
          // When activating, snap targetPos to current position to avoid jumps
          targetPos.current.copy(hookRef.current.position);
        }
      }
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHookActive, setIsHookActive, resetGame]);

  useEffect(() => {
    sharedState.isActive = isHookActive;
    if (!isHookActive) {
      finishCollection();
    }
  }, [isHookActive, finishCollection]);

  useFrame((state) => {
    if (!hookRef.current) return;
    
    // ... mouse to world pos logic ...
    const vector = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    const worldPos = state.camera.position.clone().add(dir.multiplyScalar(distance));

    if (isHookActive) {
      targetPos.current.set(
        worldPos.x,
        worldPos.y + 0.7 * HOOK_SCALE,
        0
      );
    } else {
      // Resting: top-right of scene, aligned with the fishing line origin with a gentle bobbing
      const bob = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      targetPos.current.set(viewport.width / 2.5, viewport.height / 2.8 + bob, 0);
      
      // Reset attraction when hook is not active
      sharedState.attractedItemId = null;
    }

    const oldPos = hookRef.current.position.clone();
    hookRef.current.position.lerp(targetPos.current, 0.1); // Smoother, animated following
    
    sharedState.hookVelocity.subVectors(hookRef.current.position, oldPos);
    sharedState.hookPosition.copy(hookRef.current.position);
    sharedState.hookRotation.copy(hookRef.current.rotation);

    hookRef.current.rotation.z = -sharedState.hookVelocity.x * 1.5;
    
    const speed = sharedState.hookVelocity.length();
    hookRef.current.scale.set(HOOK_SCALE, HOOK_SCALE * (1 + speed * 1), HOOK_SCALE);

    // Update Threat Notification DOM position
    const threatNotification = document.getElementById('threat-notification-wrapper');
    if (threatNotification) {
      const screenPos = hookRef.current.position.clone();
      screenPos.project(state.camera);
      const rect = state.gl.domElement.getBoundingClientRect();
      const x = (screenPos.x * 0.5 + 0.5) * rect.width;
      const y = (-(screenPos.y * 0.5) + 0.5) * rect.height;
      threatNotification.style.transform = `translate(${x + 60}px, ${y - 40}px)`;
    }
  });

  return (
    <>
      <group ref={hookRef}>
        {/* 1. White Thread Grip Section (TOP) */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.3, 16]} />
          <meshStandardMaterial
            color="#f5f5f5"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>

        {/* 2. Black Wrapped Thread Area */}
        <group position={[0, -0.3, 0]}>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[0, -i * 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.06, 0.008, 8, 16]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            </mesh>
          ))}
        </group>

        {/* 3. Flag Attachment */}
        <group position={[0, -0.55, 0]}>
          <Flag />
        </group>

        {/* 4. Main Orange Hook Body */}
        <group position={[0, -0.7, 0]}>
          <mesh castShadow>
            <tubeGeometry args={[hookCurve, 32, 0.06, 8, false]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff3300"
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>

          {/* Sharp Hook Tip */}
          <mesh position={[-0.6, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <coneGeometry args={[0.06, 0.2, 16]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff3300"
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.1}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
            />
          </mesh>
        </group>
      </group>

      {/* Fishing Line attached to the hook center top */}
      <FishingLine hookRef={hookRef} />
    </>
  );
};

const Collectible = ({ position, id, type }) => {
  const groupRef = useRef(null);
  const iconGroupRef = useRef(null);
  
  const frameShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.25; // Smaller Square
    const h = 0.25; // Smaller Square
    const r = 0.03;
    
    s.moveTo(-w/2 + r, -h/2);
    s.lineTo(w/2 - r, -h/2);
    s.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
    s.lineTo(w/2, h/2 - r);
    s.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
    s.lineTo(-w/2 + r, h/2);
    s.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
    s.lineTo(-w/2, -h/2 + r);
    s.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
    
    // Hole in top right
    const holePath = new THREE.Path();
    holePath.absarc(0.08, 0.08, 0.025, 0, Math.PI * 2, true);
    s.holes.push(holePath);
    
    return s;
  }, []);

  const frameGeom = useMemo(() => {
    const geom = new THREE.ExtrudeGeometry(frameShape, {
        depth: 0.03,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.01,
        bevelThickness: 0.01
      });
    geom.center();
    return geom;
  }, [frameShape]);

  const texturePath = {
    'whatsapp': '/whatsapp.svg',
    'vishing': '/phone.svg',
    'qr': '/qrcode.svg',
    'usb': '/usb.svg',
    'smishing': '/sms.svg',
    'email': '/file.svg'
  }[type] || '/qrcode.svg';

  const cardTexture = useTexture(texturePath);
  
  const currentPos = useRef(new THREE.Vector3(...position));
  const collectItem = useStore((state) => state.collectItem);
  const collectibles = useStore((state) => state.collectibles);
  const item = collectibles.find(c => c.id === id);
  
  const uParam = useRef(0.5);
  const uVelocity = useRef(0.0);
  
  const prevCollected = useRef(item?.isCollected);
  
  useEffect(() => {
    if (item?.isCollected && !prevCollected.current) {
      uParam.current = 1.0; 
    }
    prevCollected.current = item?.isCollected;
  }, [item?.isCollected]);

  // Reset internal state when global reset happens
  useEffect(() => {
    if (!item?.isCollected && !item?.isInTray && groupRef.current) {
      uParam.current = 0.5;
      uVelocity.current = 0.0;
      groupRef.current.visible = true;
      currentPos.current.set(...position);
    }
  }, [item?.isCollected, item?.isInTray, position]);
  
  const targetU = 0.5;
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    if (item?.isInTray) {
      if (uParam.current > 0.05) {
        uParam.current -= 0.05; 
        const localPos = hookCurve.getPointAt(uParam.current).clone();
        localPos.y -= 0.65; 
        localPos.multiplyScalar(HOOK_SCALE);
        const worldPos = localPos.clone().applyEuler(sharedState.hookRotation).add(sharedState.hookPosition);
        currentPos.current.copy(worldPos);
        groupRef.current.position.copy(currentPos.current);
      } else {
        const topPoint = new THREE.Vector3(viewport.width / 2.5, viewport.height / 2 + 2, 0);
        currentPos.current.lerp(topPoint, 0.05);
        groupRef.current.position.copy(currentPos.current);
        const targetScale = 0.2;
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
        if (currentPos.current.distanceTo(topPoint) < 0.5) {
          groupRef.current.visible = false;
        }
      }
      return; 
    }

    const tipPointLocal = hookCurve.getPointAt(1.0).clone();
    tipPointLocal.y -= 0.65; 
    tipPointLocal.multiplyScalar(HOOK_SCALE);
    
    const tipPointWorld = tipPointLocal.clone().applyEuler(sharedState.hookRotation).add(sharedState.hookPosition);
    const distToTip = currentPos.current.distanceTo(tipPointWorld);

    // Reduced attraction range to 0.8 for a "very close" feel
    const isInRange = distToTip < 0.8 && sharedState.isActive;
    const isBeingAttracted = sharedState.attractedItemId === id;
    const canAttract = isInRange && (sharedState.attractedItemId === null || isBeingAttracted);

    const targetScale = isBeingAttracted ? 1.2 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (item?.isCollected) {
      const springK = 0.02; // Slower spring
      const damping = 0.92; // More damping
      const force = (targetU - uParam.current) * springK;
      uVelocity.current = (uVelocity.current + force) * damping;
      uParam.current += uVelocity.current;
      uParam.current = Math.max(0, Math.min(1, uParam.current));

      const localPos = hookCurve.getPointAt(uParam.current).clone();
      localPos.y -= 0.65; 
      localPos.multiplyScalar(HOOK_SCALE);
      
      const worldPos = localPos.clone().applyEuler(sharedState.hookRotation).add(sharedState.hookPosition);
      const hookSpeed = sharedState.hookVelocity.length();
      const jiggle = Math.sin(state.clock.getElapsedTime() * 1.2 + parseInt(id)) * (0.001 + hookSpeed * 0.03);
      worldPos.y += jiggle;

      currentPos.current.copy(worldPos);
      groupRef.current.position.copy(currentPos.current);
      
      if (iconGroupRef.current) {
        const swing = Math.sin(state.clock.getElapsedTime() * 0.5 + parseInt(id)) * (0.01 + hookSpeed * 0.4);
        iconGroupRef.current.rotation.z = swing;
      }
      groupRef.current.rotation.set(0, 0, 0);
      
    } else if (canAttract) {
      // We are the chosen one! Claim the hook if not already claimed
      if (sharedState.attractedItemId === null) {
        sharedState.attractedItemId = id;
      }

      currentPos.current.lerp(tipPointWorld, 0.015); // Much slower attraction
      groupRef.current.position.copy(currentPos.current);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, sharedState.hookRotation.z - Math.PI / 4, 0.05);
      
      if (distToTip < 0.12) {
        collectItem(id);
        sharedState.attractedItemId = null; // Release hook for next item
      }
    } else {
      // If we were the chosen one but hook was deactivated or we lost range
      if (sharedState.attractedItemId === id && !canAttract) {
        sharedState.attractedItemId = null;
      }

      const targetVec = new THREE.Vector3(...position);
      currentPos.current.copy(targetVec);
      currentPos.current.y += Math.sin(state.clock.getElapsedTime() * 0.6 + parseInt(id)) * 0.08;
      
      groupRef.current.position.copy(currentPos.current);
      groupRef.current.rotation.set(0, 0, 0);
      
      if (iconGroupRef.current) {
        iconGroupRef.current.rotation.set(
          Math.sin(state.clock.getElapsedTime() * 0.6 + parseInt(id)) * 0.1,
          0,
          Math.sin(state.clock.getElapsedTime() * 0.4 + parseInt(id)) * 0.12
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.1, 0]}>
        <group ref={iconGroupRef}>
          <group scale={[0.8, 0.8, 0.8]}>
            <mesh geometry={frameGeom} position={[-0.1, -0.1, 0]} receiveShadow>
              <meshStandardMaterial 
                color="#ffd8a8"
                roughness={0.2}
                metalness={0.05}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
            <mesh position={[-0.1, -0.1, 0.05]} castShadow>
              <planeGeometry args={[0.18, 0.18]} />
              <meshBasicMaterial map={cardTexture} transparent={true} depthWrite={false} opacity={0.8} />
            </mesh>
            <mesh position={[0, 0.06, 0]} rotation={[0, Math.PI / 4, 0]}>
              <torusGeometry args={[0.07, 0.01, 8, 16]} />
              <meshStandardMaterial
                color="#ff5500"
                roughness={0.9}
              />
              <mesh>
                <torusGeometry args={[0.09, 0.002, 16, 32]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
              </mesh>
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

const PositionEditor = ({ collectibles, updatePosition }) => {
  return (
    <div className="absolute top-4 left-4 right-16 z-[100] bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/50 flex flex-row items-center gap-4 overflow-x-auto pointer-events-auto no-scrollbar">
      <div className="flex items-center gap-2 pr-4 border-r border-slate-200 shrink-0">
        <div className="p-1.5 bg-orange-100 rounded-lg">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </div>
        <span className="font-black text-slate-800 text-[10px] uppercase tracking-tighter">Editor</span>
      </div>
      
      <div className="flex flex-row items-center gap-6">
        {collectibles.map((item) => (
          <div key={item.id} className="flex flex-row items-center gap-4 bg-slate-50/50 p-2 rounded-xl border border-slate-100 shrink-0">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">{item.type}</span>
              <div className="flex gap-2">
                 <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] text-slate-400 font-bold">X: <span className="text-orange-500">{item.position[0].toFixed(1)}</span></span>
                    <input 
                      type="range" min="-7" max="7" step="0.1" 
                      value={item.position[0]} 
                      onChange={(e) => updatePosition(item.id, [parseFloat(e.target.value), item.position[1], 0])}
                      className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] text-slate-400 font-bold">Y: <span className="text-orange-500">{item.position[1].toFixed(1)}</span></span>
                    <input 
                      type="range" min="-4" max="4" step="0.1" 
                      value={item.position[1]} 
                      onChange={(e) => updatePosition(item.id, [item.position[0], parseFloat(e.target.value), 0])}
                      className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Scene = () => {
  const collectibles = useStore((state) => state.collectibles);
  const updatePosition = useStore((state) => state.updatePosition);
  const isHookActive = useStore((state) => state.isHookActive);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className={`absolute inset-0 z-10 ${isHookActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ pointerEvents: isHookActive ? 'auto' : 'none' }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2.0} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[0, 0, 3]} intensity={0.8} />
        
        <Suspense fallback={null}>
          <AmbientParticles />
          <Hook />

          {collectibles.map((item) => (
            <Collectible key={item.id} id={item.id} position={item.position} type={item.type} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
