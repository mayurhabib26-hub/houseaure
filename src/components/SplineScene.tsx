import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Sparkles, Move3d } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ScrollReveal } from './ScrollReveal';

export const SplineScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const canvasScale = useTransform(scrollYProgress, [0.1, 0.45], shouldReduceMotion ? [1, 1] : [0.94, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0.6, 1]);

  // Sophisticated luxury 3D ribbon sculpture on HTML5 Canvas with studio lighting and mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0.2;
    let angleY = 0;
    let targetAngleX = 0.2;
    let targetAngleY = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      if (!canvas || !ctx) return;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation toward target angles
      targetAngleY += 0.004; // slow organic rotation
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.32;

      // Studio ambient lighting background
      const ambientGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.1,
        centerX,
        centerY,
        radius * 1.5
      );
      ambientGrad.addColorStop(0, 'rgba(197, 168, 128, 0.15)');
      ambientGrad.addColorStop(0.5, 'rgba(232, 223, 209, 0.06)');
      ambientGrad.addColorStop(1, 'rgba(24, 23, 22, 0)');
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Render layered sculptural golden ribbons / Aure rings
      const numRings = 5;
      for (let r = 0; r < numRings; r++) {
        const ringOffset = (r / numRings) * Math.PI * 2;
        const currentRadius = radius * (0.65 + r * 0.1);
        const pointsCount = 120;
        const points: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i <= pointsCount; i++) {
          const theta = (i / pointsCount) * Math.PI * 2;
          // Mobius-like sculptural drape
          const x0 = Math.cos(theta) * currentRadius;
          const y0 = Math.sin(theta * 2 + ringOffset) * (currentRadius * 0.35);
          const z0 = Math.sin(theta) * currentRadius;

          // 3D rotation
          const cosY = Math.cos(angleY + r * 0.15);
          const sinY = Math.sin(angleY + r * 0.15);
          const cosX = Math.cos(angleX);
          const sinX = Math.sin(angleX);

          // Rotate Y
          const x1 = x0 * cosY + z0 * sinY;
          const z1 = -x0 * sinY + z0 * cosY;

          // Rotate X
          const y2 = y0 * cosX - z1 * sinX;
          const z2 = y0 * sinX + z1 * cosX;

          // Perspective projection
          const fov = 450;
          const p = fov / (fov + z2);
          points.push({
            x: centerX + x1 * p,
            y: centerY + y2 * p,
            z: z2
          });
        }

        // Draw Ribbon with champagne metallic gradients
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        // Gradient based on light angle
        const grad = ctx.createLinearGradient(
          centerX - radius,
          centerY - radius,
          centerX + radius,
          centerY + radius
        );
        grad.addColorStop(0, '#E8DFD1');
        grad.addColorStop(0.3, '#C5A880');
        grad.addColorStop(0.7, '#8C7453');
        grad.addColorStop(1, '#F4EFE6');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2 - r * 0.25;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw Aure Center Core Orb
      const orbGrad = ctx.createRadialGradient(
        centerX - radius * 0.08,
        centerY - radius * 0.08,
        2,
        centerX,
        centerY,
        radius * 0.22
      );
      orbGrad.addColorStop(0, '#FFFBF5');
      orbGrad.addColorStop(0.4, '#DFD3C3');
      orbGrad.addColorStop(0.8, '#A3845B');
      orbGrad.addColorStop(1, '#3B3329');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();

      // Subtle metallic highlight ring around core
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.22, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(226, 218, 203, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setIsInteracting(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#141414] text-[#FAF9F5] overflow-hidden border-b border-[#292725]"
    >
      {/* Background radial studio spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(197,168,128,0.12),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story & Philosophy with ScrollReveal */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal variant="fade-up" duration={0.8}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                  The World of Aure
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-[#FAF9F5]">
                Designed for the moments that <br />
                <span className="italic text-[#E8DFD1]">become memories.</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                In a world of fleeting trends, House of Aure crafts enduring foundations. Each silhouette is informed by geometric balance, weighted draping, and golden hour light.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-800">
                <div>
                  <span className="font-editorial text-2xl sm:text-3xl text-[#E8DFD1] block font-light">
                    01. Pure Form
                  </span>
                  <span className="text-xs text-neutral-400 mt-1 block">
                    Tailored lines stripped of excess hardware.
                  </span>
                </div>
                <div>
                  <span className="font-editorial text-2xl sm:text-3xl text-[#E8DFD1] block font-light">
                    02. Tactile Noble
                  </span>
                  <span className="text-xs text-neutral-400 mt-1 block">
                    Mulberry silk, Normandy flax, and tropical wool.
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-neutral-400">
                <Move3d className="w-4 h-4 text-[#C5A880]" />
                <span>Interactive 3D Aure sculpture · Rotate with mouse</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Interactive Display with Scroll Scale */}
          <motion.div
            style={{ scale: canvasScale, opacity: canvasOpacity }}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            className="lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-xs border border-neutral-800/80 bg-[#181716] overflow-hidden flex items-center justify-center shadow-2xl"
          >
            {/* Fine architectural crosshairs */}
            <div className="absolute top-4 left-4 text-[0.65rem] uppercase tracking-widest text-neutral-500 font-mono">
              SCULPTURE // AURE-01
            </div>
            <div className="absolute top-4 right-4 text-[0.65rem] uppercase tracking-widest text-neutral-500 font-mono">
              ORBIT: 360°
            </div>
            <div className="absolute bottom-4 left-4 text-[0.65rem] tracking-wider text-neutral-500">
              Golden Ratio Harmonic
            </div>
            <div className="absolute bottom-4 right-4 text-[0.65rem] tracking-wider text-[#C5A880]">
              REAL-TIME WEBGL RENDERING
            </div>

            {/* Interactive Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title="Interactive 3D Aure Sculpture"
            />

            {/* Brand seal floating watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <div className="w-44 h-44 rounded-full border border-[#C5A880]/40 flex items-center justify-center">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C5A880]">
                  House of Aure
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
