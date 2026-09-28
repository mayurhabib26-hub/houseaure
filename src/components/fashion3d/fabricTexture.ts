import * as THREE from 'three';

/**
 * Generates a photorealistic micro-twill weave normal/bump texture
 * replicating noble luxury fabrics (mulberry silk / high-twist wool / linen blend).
 */
export function createFabricTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base neutral midtone for bump mapping
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // High-frequency twill diagonal warp threads
  const step = 4;
  ctx.strokeStyle = '#999999';
  ctx.lineWidth = 1.2;

  for (let i = -size; i < size * 2; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }

  // Cross-weft threads with subtle alternating tension
  ctx.strokeStyle = '#6e6e6e';
  ctx.lineWidth = 0.9;
  for (let i = 0; i < size * 2; i += step * 2) {
    ctx.beginPath();
    ctx.moveTo(i, size);
    ctx.lineTo(i - size, 0);
    ctx.stroke();
  }

  // Fine organic fiber grain / wool fleck noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 28;
    const val = Math.min(255, Math.max(0, data[i] + noise));
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a soft studio floor contact shadow texture.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 15, center, center, size / 2 - 20);
  gradient.addColorStop(0, 'rgba(10, 9, 8, 0.55)');
  gradient.addColorStop(0.3, 'rgba(15, 14, 13, 0.35)');
  gradient.addColorStop(0.65, 'rgba(20, 19, 18, 0.12)');
  gradient.addColorStop(1, 'rgba(20, 19, 18, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, size / 2 - 20, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates the gold engraved House of Aure Atelier seal label texture.
 */
export function createAtelierLabelTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 180;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Brushed champagne gold background
  const goldGrad = ctx.createLinearGradient(0, 0, width, height);
  goldGrad.addColorStop(0, '#E8DFD1');
  goldGrad.addColorStop(0.3, '#C5A880');
  goldGrad.addColorStop(0.7, '#DFD3C3');
  goldGrad.addColorStop(1, '#9F835A');
  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle brushed metal lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Delicate border
  ctx.strokeStyle = 'rgba(40, 35, 30, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Typography
  ctx.fillStyle = '#1D1A17';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 32px serif';
  ctx.fillText('HOUSE OF AURE', width / 2, height / 2 - 18);

  ctx.font = '400 16px sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('ATELIER · NO. 01 / MILAN', width / 2, height / 2 + 24);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
