import * as THREE from 'three';
import { createFabricTexture, createContactShadowTexture } from './fabricTexture';

import ivoryFrontImg from '../../assets/images/floating_ivory_coat.jpg';
import ivoryBackImg from '../../assets/images/floating_ivory_coat_back.jpg';
import charcoalImg from '../../assets/images/floating_charcoal_coat.jpg';
import sandstoneImg from '../../assets/images/floating_sandstone_coat.jpg';

export type ColorwayKey = 'ivory' | 'charcoal' | 'sandstone';

export interface ColorwayConfig {
  name: string;
  subname: string;
  baseColor: string;
  sheenColor: string;
  frontImageUrl: string;
  backImageUrl: string;
  silhouette: string;
  weight: string;
  origin: string;
}

export const COLORWAYS: Record<ColorwayKey, ColorwayConfig> = {
  ivory: {
    name: 'Warm Ivory Silk',
    subname: 'Mulberry raw silk & tropical virgin wool',
    baseColor: '#ECE5D8',
    sheenColor: '#FAF7F2',
    frontImageUrl: ivoryFrontImg,
    backImageUrl: ivoryBackImg,
    silhouette: 'Oversized Architectural Drape',
    weight: '460 GSM Double-Faced',
    origin: 'Biella, Italy',
  },
  charcoal: {
    name: 'Charcoal Cashmere',
    subname: 'High-twist combed Italian cashmere & alpaca',
    baseColor: '#242221',
    sheenColor: '#6B635B',
    frontImageUrl: charcoalImg,
    backImageUrl: ivoryBackImg, // will be tinted
    silhouette: 'Structured Editorial Silhouette',
    weight: '520 GSM Cashmere Blend',
    origin: 'Florence, Italy',
  },
  sandstone: {
    name: 'Sandstone Wool',
    subname: 'Normandy flax & double-faced camel wool',
    baseColor: '#D3C6B5',
    sheenColor: '#EFE7DC',
    frontImageUrl: sandstoneImg,
    backImageUrl: ivoryBackImg, // will be tinted
    silhouette: 'Relaxed Kimono Overcoat',
    weight: '480 GSM Heavy Twill',
    origin: 'Normandy, France',
  },
};

export interface GarmentInstance {
  group: THREE.Group;
  frontMesh: THREE.Mesh;
  backMesh: THREE.Mesh;
  frontMaterial: THREE.MeshStandardMaterial;
  backMaterial: THREE.MeshStandardMaterial;
  shadowMesh: THREE.Mesh;
  update: (time: number, isHovered: boolean) => void;
  setColorway: (key: ColorwayKey) => void;
  dispose: () => void;
}

/**
 * Creates the high-fidelity living 3D cloth surface with authentic photography,
 * sculptural curvature, two-sided 360° volume, and cloth breathing dynamics.
 */
export function createGarmentModel(initialColorway: ColorwayKey = 'ivory'): GarmentInstance {
  const rootGroup = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();

  // Pre-load all textures
  const frontTextures: Record<ColorwayKey, THREE.Texture> = {
    ivory: textureLoader.load(COLORWAYS.ivory.frontImageUrl),
    charcoal: textureLoader.load(COLORWAYS.charcoal.frontImageUrl),
    sandstone: textureLoader.load(COLORWAYS.sandstone.frontImageUrl),
  };

  const backTexture = textureLoader.load(ivoryBackImg);

  [...Object.values(frontTextures), backTexture].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
  });

  const fabricBump = createFabricTexture();

  // 1. Parametric Cloth Geometries (Front and Back)
  const width = 2.65;
  const height = 3.53;
  const segmentsX = 48;
  const segmentsY = 48;

  const createCurvedCloth = (isBack: boolean) => {
    const geom = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    const pos = geom.attributes.position;
    const count = pos.count;
    const basePos = new Float32Array(pos.array.length);
    const weights = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const normX = x / (width * 0.5); // -1 to +1
      const normY = (height * 0.5 - y) / height; // 0 (top) to 1 (hem)

      // Torso curvature
      const torsoCurve = (Math.cos(normX * (Math.PI * 0.45)) * 0.14 - 0.07) * (isBack ? -1 : 1);
      const foldRipple = Math.sin(normX * Math.PI * 3.5) * (0.024 * Math.pow(normY, 1.2));
      const zOffset = isBack ? -0.05 : 0.05;

      const z = torsoCurve + foldRipple + zOffset;
      pos.setZ(i, z);

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      weights[i] = Math.pow(normY, 1.35);
    }

    geom.computeVertexNormals();
    return { geom, basePos, weights };
  };

  const frontData = createCurvedCloth(false);
  const backData = createCurvedCloth(true);

  // 2. High-End Physical Materials
  const frontMaterial = new THREE.MeshStandardMaterial({
    map: frontTextures[initialColorway],
    bumpMap: fabricBump,
    bumpScale: 0.002,
    roughness: 0.8,
    metalness: 0.03,
  });

  const backMaterial = new THREE.MeshStandardMaterial({
    map: backTexture,
    bumpMap: fabricBump,
    bumpScale: 0.002,
    roughness: 0.82,
    metalness: 0.03,
  });

  const frontMesh = new THREE.Mesh(frontData.geom, frontMaterial);
  frontMesh.castShadow = true;
  frontMesh.receiveShadow = true;
  rootGroup.add(frontMesh);

  const backMesh = new THREE.Mesh(backData.geom, backMaterial);
  backMesh.rotation.y = Math.PI; // Face backwards
  backMesh.castShadow = true;
  backMesh.receiveShadow = true;
  rootGroup.add(backMesh);

  // 3. Studio Soft Floor Contact Shadow
  const shadowTex = createContactShadowTexture();
  const shadowGeom = new THREE.PlaneGeometry(3.6, 3.6);
  shadowGeom.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.position.set(0, -1.95, 0);
  rootGroup.add(shadowMesh);

  // 4. Update function: Organic cloth ripples on both front & back
  const update = (time: number, isHovered: boolean) => {
    const windSpeed = isHovered ? 1.5 : 1.05;
    const amp = isHovered ? 0.032 : 0.02;

    const animateCloth = (geom: THREE.BufferGeometry, basePos: Float32Array, weights: Float32Array) => {
      const pos = geom.attributes.position;
      const array = pos.array as Float32Array;
      const len = pos.count;

      for (let i = 0; i < len; i++) {
        const weight = weights[i];
        if (weight > 0.03) {
          const baseX = basePos[i * 3];
          const baseY = basePos[i * 3 + 1];
          const baseZ = basePos[i * 3 + 2];

          const waveX = Math.sin(time * windSpeed + baseY * 2.2) * (amp * 0.4) * weight;
          const waveZ = (
            Math.sin(time * (windSpeed * 0.9) + baseX * 2.8 + baseY * 1.6) * 0.65 +
            Math.cos(time * (windSpeed * 1.3) + baseY * 3.2) * 0.35
          ) * amp * weight;

          array[i * 3] = baseX + waveX;
          array[i * 3 + 1] = baseY;
          array[i * 3 + 2] = baseZ + waveZ;
        }
      }
      pos.needsUpdate = true;
      geom.computeVertexNormals();
    };

    animateCloth(frontData.geom, frontData.basePos, frontData.weights);
    animateCloth(backData.geom, backData.basePos, backData.weights);

    // Floor shadow breathing
    const shadowBreath = 1 + Math.sin(time * 0.9) * 0.05;
    shadowMesh.scale.set(shadowBreath, 1, shadowBreath);
  };

  // 5. Colorway switcher
  const setColorway = (key: ColorwayKey) => {
    if (frontTextures[key]) {
      frontMaterial.map = frontTextures[key];
      frontMaterial.needsUpdate = true;
    }
    // Tint back to harmonize with selected colorway
    if (key === 'charcoal') {
      backMaterial.color.set('#3A3735');
    } else if (key === 'sandstone') {
      backMaterial.color.set('#D8CEBF');
    } else {
      backMaterial.color.set('#FFFFFF');
    }
    backMaterial.needsUpdate = true;
  };

  const dispose = () => {
    frontData.geom.dispose();
    backData.geom.dispose();
    frontMaterial.dispose();
    backMaterial.dispose();
    shadowGeom.dispose();
    shadowMat.dispose();
    shadowTex.dispose();
    fabricBump.dispose();
    Object.values(frontTextures).forEach((tex) => tex.dispose());
    backTexture.dispose();
  };

  return {
    group: rootGroup,
    frontMesh,
    backMesh,
    frontMaterial,
    backMaterial,
    shadowMesh,
    update,
    setColorway,
    dispose,
  };
}
