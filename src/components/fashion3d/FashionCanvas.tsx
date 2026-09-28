import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { createGarmentModel, ColorwayKey, GarmentInstance } from './garmentModel';

export type CameraPreset = 'orbit' | 'front' | 'angle' | 'detail';

interface FashionCanvasProps {
  colorway: ColorwayKey;
  cameraPreset?: CameraPreset;
  scrollProgress?: number; // 0 to 1 from scroll
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
}

export const FashionCanvas: React.FC<FashionCanvasProps> = ({
  colorway,
  cameraPreset = 'orbit',
  scrollProgress = 0.5,
  onInteractionStart,
  onInteractionEnd,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const garmentRef = useRef<GarmentInstance | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lightsRef = useRef<{
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    fillLight: THREE.DirectionalLight;
    accentLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
  } | null>(null);

  // Interaction & damping states
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    userRotX: 0,
    userRotY: 0,
    lastInteractionTime: 0,
  });

  // Current camera preset
  const presetRef = useRef<CameraPreset>(cameraPreset);
  useEffect(() => {
    presetRef.current = cameraPreset;
    if (cameraPreset !== 'orbit') {
      mouseState.current.lastInteractionTime = performance.now();
    }
  }, [cameraPreset]);

  // Update colorway smoothly
  useEffect(() => {
    if (garmentRef.current) {
      garmentRef.current.setColorway(colorway);
    }
  }, [colorway]);

  // Main Three.js lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const isMobile = window.innerWidth < 768;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Studio subtle background fog to blend soft floor into deep charcoal
    scene.fog = new THREE.FogExp2('#141312', 0.045);

    // 2. Camera (Cinematic editorial compression)
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.15, 5.2);
    cameraRef.current = camera;

    // 3. Renderer with high-end color grading
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Luxury Studio Lighting Setup
    // Key Light: Soft warm ivory key from front-top-right
    const keyLight = new THREE.DirectionalLight('#FFF5E6', 2.4);
    keyLight.position.set(2.8, 4.0, 3.5);
    scene.add(keyLight);

    // Rim Light: Cool champagne edge light from rear-left to contour garment silhouette
    const rimLight = new THREE.DirectionalLight('#E8DCBE', 3.2);
    rimLight.position.set(-3.2, 2.5, -2.8);
    scene.add(rimLight);

    // Fill Light: Soft warm ambient bounce from low-front-left
    const fillLight = new THREE.DirectionalLight('#D0C0AA', 1.0);
    fillLight.position.set(-2.2, -1.2, 3.0);
    scene.add(fillLight);

    // Ambient studio base
    const ambientLight = new THREE.AmbientLight('#262320', 0.85);
    scene.add(ambientLight);

    // Champagne Accent Point Light floating near the atelier label & lapels
    const accentLight = new THREE.PointLight('#F0D2A6', 1.5, 8);
    accentLight.position.set(0.6, 1.4, 1.8);
    scene.add(accentLight);

    lightsRef.current = { keyLight, rimLight, fillLight, accentLight, ambientLight };

    // 5. Studio Dust / Champagne Atmosphere Motes
    const particleCount = isMobile ? 25 : 65;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.8 + 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      particleSpeeds[i] = 0.003 + Math.random() * 0.006;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: '#E8D4B8',
      size: isMobile ? 0.025 : 0.032,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. Garment 3D Instance
    const garment = createGarmentModel(colorway);
    scene.add(garment.group);
    garmentRef.current = garment;

    // 7. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Main Render & Cinematic Animation Loop
    let lastTime = performance.now();
    let idleAngle = 0;

    const renderLoop = (now: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now * 0.001;

      const m = mouseState.current;
      const isUserEngaged = m.isDragging || now - m.lastInteractionTime < 3200;

      // Smooth mouse damping
      m.currentX += (m.targetX - m.currentX) * 0.045;
      m.currentY += (m.targetY - m.currentY) * 0.045;

      // Target camera framing based on Preset
      let targetCamX = m.currentX * 0.5;
      let targetCamY = 0.15 + m.currentY * 0.3;
      let targetCamZ = 5.2;
      let targetLookAtY = 0.05;

      if (presetRef.current === 'detail') {
        targetCamX = 0.2 + m.currentX * 0.2;
        targetCamY = 0.95 + m.currentY * 0.15;
        targetCamZ = 2.8;
        targetLookAtY = 0.95;
      } else if (presetRef.current === 'front') {
        targetCamX = m.currentX * 0.25;
        targetCamY = 0.1 + m.currentY * 0.2;
        targetCamZ = 5.0;
        targetLookAtY = 0.0;
      } else if (presetRef.current === 'angle') {
        targetCamX = 1.6 + m.currentX * 0.3;
        targetCamY = 0.3 + m.currentY * 0.25;
        targetCamZ = 4.6;
        targetLookAtY = 0.1;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.lookAt(0, targetLookAtY, 0);

      // Garment Animation:
      // 1. Slow 360° idle rotation
      if (presetRef.current === 'orbit' && !isUserEngaged) {
        idleAngle += delta * 0.14; // ~45s per full 360° turn
      }

      // 2. Gentle levitation / floating bobbing
      const levitation = Math.sin(time * 0.9) * 0.06;
      garment.group.position.y = levitation;

      // 3. User manual rotation blend
      if (!m.isDragging) {
        // Slowly return user tilt toward 0
        m.userRotX *= 0.96;
      }

      let targetRotY = idleAngle + m.userRotY + m.currentX * 0.45;
      if (presetRef.current === 'front') targetRotY = m.userRotY + m.currentX * 0.2;
      if (presetRef.current === 'angle') targetRotY = Math.PI * 0.25 + m.userRotY + m.currentX * 0.2;
      if (presetRef.current === 'detail') targetRotY = Math.PI * 0.1 + m.userRotY + m.currentX * 0.15;

      garment.group.rotation.y += (targetRotY - garment.group.rotation.y) * 0.05;
      garment.group.rotation.x += (m.userRotX - m.currentY * 0.18 - garment.group.rotation.x) * 0.05;
      garment.group.rotation.z = Math.sin(time * 0.7) * 0.012; // subtle sway

      // Update soft cloth breathing and vertex dynamics
      garment.update(time, isUserEngaged);

      // Update dust motes
      const pPos = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3 + 1] += particleSpeeds[i] * 0.6;
        // Wrap around vertically
        if (pPos[i * 3 + 1] > 2.8) {
          pPos[i * 3 + 1] = -1.8;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.015;

      // Subtle dynamic accent light orbit
      accentLight.position.x = Math.sin(time * 0.5) * 1.5;
      accentLight.position.z = 2.2 + Math.cos(time * 0.4) * 0.6;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      garment.dispose();
      renderer.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update dynamic scroll scaling and lighting
  useEffect(() => {
    if (!garmentRef.current || !rendererRef.current || !lightsRef.current) return;

    // Scroll progress scales garment from 0.84 to 1.02
    // and gently brightens lighting as section enters focus
    const factor = Math.max(0, Math.min(1, scrollProgress));
    const targetScale = 0.84 + factor * 0.18;
    garmentRef.current.group.scale.set(targetScale, targetScale, targetScale);

    // Adjust exposure subtly
    rendererRef.current.toneMappingExposure = 0.98 + factor * 0.16;

    // Key light intensity
    lightsRef.current.keyLight.intensity = 2.0 + factor * 0.6;
  }, [scrollProgress]);

  // Mouse & Touch Interaction Handlers
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const m = mouseState.current;
    m.isDragging = true;
    m.dragStartX = e.clientX;
    m.dragStartY = e.clientY;
    m.lastInteractionTime = performance.now();
    onInteractionStart?.();
  }, [onInteractionStart]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const m = mouseState.current;

    // Normalized mouse [-1 to 1]
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    m.targetX = normX;
    m.targetY = normY;

    if (m.isDragging) {
      const deltaX = e.clientX - m.dragStartX;
      const deltaY = e.clientY - m.dragStartY;
      m.dragStartX = e.clientX;
      m.dragStartY = e.clientY;
      m.userRotY += deltaX * 0.007;
      m.userRotX += deltaY * 0.005;
      m.userRotX = Math.max(-0.4, Math.min(0.4, m.userRotX));
      m.lastInteractionTime = performance.now();
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    mouseState.current.isDragging = false;
    mouseState.current.lastInteractionTime = performance.now();
    onInteractionEnd?.();
  }, [onInteractionEnd]);

  const handlePointerLeave = useCallback(() => {
    const m = mouseState.current;
    m.isDragging = false;
    m.targetX = 0;
    m.targetY = 0;
    onInteractionEnd?.();
  }, [onInteractionEnd]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none"
      title="House of Aure Atelier 3D Exhibition — Drag to rotate, scroll to zoom"
    />
  );
};
