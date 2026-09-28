import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Sparkles, Move3d, Compass, Eye, ArrowRight, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { FashionCanvas, CameraPreset } from './fashion3d/FashionCanvas';
import { ColorwayKey, COLORWAYS } from './fashion3d/garmentModel';

interface SplineSceneProps {
  onExploreCollection?: () => void;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ onExploreCollection }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedColorway, setSelectedColorway] = useState<ColorwayKey>('ivory');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('orbit');
  const [isInteracting, setIsInteracting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-based parallax and scaling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [currentScrollProgress, setCurrentScrollProgress] = useState(0.5);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setCurrentScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const containerScale = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    shouldReduceMotion ? [1, 1, 1] : [0.96, 1, 0.97]
  );

  const containerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.25],
    [0.7, 1]
  );

  const activeColorConfig = COLORWAYS[selectedColorway];

  const handleExplore = () => {
    if (onExploreCollection) {
      onExploreCollection();
    } else {
      const shopSection = document.getElementById('featured-edit') || document.getElementById('new-arrivals');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="world-of-aure"
      className="relative py-24 sm:py-32 bg-[#121110] text-[#FAF9F5] overflow-hidden border-b border-[#242220]"
    >
      {/* Studio ambient warm ivory spotlight vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_60%_50%,rgba(197,168,128,0.08),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_40%_40%_at_20%_40%,rgba(232,223,209,0.04),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Editorial Philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal variant="fade-up" duration={0.8}>
              {/* Studio badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#1A1918]/80 backdrop-blur-xs mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="text-[0.68rem] uppercase tracking-[0.28em] text-[#E8DFD1] font-medium">
                  The World of Aure · Atelier 3D
                </span>
              </div>

              {/* Editorial Headline */}
              <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] mb-6 text-[#FAF9F5]">
                THE WORLD OF AURE
              </h2>

              <blockquote className="text-xl sm:text-2xl text-[#E8DFD1] font-editorial italic font-light leading-snug mb-6 border-l-2 border-[#C5A880]/60 pl-4 py-1">
                "Designed for the moments that become memories."
              </blockquote>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
                Suspended in cinematic studio light, our oversized signature silhouette reflects quiet luxury in motion. Sculpted with architectural dropped shoulders and weight-balanced drapery, each piece breathes with living grace.
              </p>

              {/* Craftsmanship Pillars */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-800/90 mb-8">
                <div>
                  <span className="font-editorial text-2xl sm:text-3xl text-[#E8DFD1] block font-light">
                    01. Pure Form
                  </span>
                  <span className="text-xs text-neutral-400 mt-1.5 block leading-relaxed">
                    Architectural drape stripped of superfluous hardware.
                  </span>
                </div>
                <div>
                  <span className="font-editorial text-2xl sm:text-3xl text-[#E8DFD1] block font-light">
                    02. Tactile Noble
                  </span>
                  <span className="text-xs text-neutral-400 mt-1.5 block leading-relaxed">
                    Mulberry raw silk, double-faced cashmere, and combed flax.
                  </span>
                </div>
              </div>

              {/* Interactive Atelier Fabric Swatches */}
              <div className="mb-8 p-4 rounded-xs border border-neutral-800 bg-[#171615]/70 backdrop-blur-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[#C5A880] font-medium flex items-center gap-1.5">
                    <Eye className="w-3 h-3" /> Atelier Fabric Selection
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {activeColorConfig.name}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {(Object.keys(COLORWAYS) as ColorwayKey[]).map((key) => {
                    const col = COLORWAYS[key];
                    const isSelected = selectedColorway === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedColorway(key)}
                        className={`flex flex-col items-start p-2.5 rounded-xs border transition-all duration-300 text-left cursor-pointer ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#22201D] shadow-md shadow-black/40'
                            : 'border-neutral-800/80 bg-[#1A1918] hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5 w-full">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0 shadow-inner"
                            style={{ backgroundColor: col.baseColor }}
                          />
                          {isSelected && <Check className="w-3 h-3 text-[#C5A880] ml-auto" />}
                        </div>
                        <span className="text-[0.7rem] font-medium text-[#FAF9F5] leading-tight block">
                          {col.name.replace(/ Silk| Cashmere| Wool/, '')}
                        </span>
                        <span className="text-[0.62rem] text-neutral-400 leading-none mt-0.5">
                          {key === 'ivory' ? 'Silk' : key === 'charcoal' ? 'Cashmere' : 'Wool'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button & Interactive Hint */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleExplore}
                  className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FAF9F5] text-[#141414] hover:bg-[#E8DFD1] transition-all duration-300 rounded-xs text-xs uppercase tracking-[0.22em] font-medium shadow-lg hover:shadow-[#C5A880]/10 cursor-pointer"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#141414] group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <div className="flex items-center gap-2.5 text-xs text-neutral-400 px-2 py-2">
                  <Move3d className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="text-[0.75rem] leading-tight">
                    Drag to rotate 360° · Smooth idle levitation
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Garment Exhibition Display */}
          <motion.div
            style={{ scale: containerScale, opacity: containerOpacity }}
            className="lg:col-span-7 relative h-[440px] sm:h-[560px] lg:h-[620px] rounded-xs border border-neutral-800 bg-[#161514] overflow-hidden flex items-center justify-center shadow-2xl"
          >
            {/* Architectural Camera & Studio Watermark Crosshairs */}
            <div className="absolute top-4 left-4 z-20 text-[0.65rem] uppercase tracking-widest text-neutral-400 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span>GARMENT // AURE-JACKET-01</span>
            </div>

            <div className="absolute top-4 right-4 z-20 text-[0.65rem] uppercase tracking-widest text-neutral-400 font-mono">
              STUDIO ORBIT: 360°
            </div>

            {/* Camera Perspective Switcher Floating Toolbar */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full border border-neutral-800/90 bg-[#181716]/90 backdrop-blur-md shadow-xl">
              <button
                onClick={() => setCameraPreset('orbit')}
                className={`px-3 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  cameraPreset === 'orbit'
                    ? 'bg-[#C5A880] text-[#121110] font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-[#FAF9F5]'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>360° Orbit</span>
              </button>

              <button
                onClick={() => setCameraPreset('front')}
                className={`px-3 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  cameraPreset === 'front'
                    ? 'bg-[#C5A880] text-[#121110] font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-[#FAF9F5]'
                }`}
              >
                <span>Front Drape</span>
              </button>

              <button
                onClick={() => setCameraPreset('angle')}
                className={`px-3 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  cameraPreset === 'angle'
                    ? 'bg-[#C5A880] text-[#121110] font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-[#FAF9F5]'
                }`}
              >
                <span>3/4 Angle</span>
              </button>

              <button
                onClick={() => setCameraPreset('detail')}
                className={`px-3 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  cameraPreset === 'detail'
                    ? 'bg-[#C5A880] text-[#121110] font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-[#FAF9F5]'
                }`}
              >
                <span>Detail</span>
              </button>
            </div>

            {/* Bottom Left: Atelier Fabric Description */}
            <div className="absolute bottom-4 left-4 z-20 hidden sm:block text-[0.65rem] tracking-wider text-neutral-400 font-mono">
              <span className="text-[#C5A880]">FABRIC:</span> {activeColorConfig.subname}
            </div>

            {/* Bottom Right: Studio Lighting Preset */}
            <div className="absolute bottom-4 right-4 z-20 hidden sm:block text-[0.65rem] tracking-wider text-[#C5A880] font-mono">
              3-POINT STUDIO LIGHTING
            </div>

            {/* Brand seal floating subtle watermark in the center background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 z-0">
              <div className="w-56 h-56 rounded-full border border-[#C5A880]/30 flex items-center justify-center">
                <span className="text-[0.68rem] tracking-[0.35em] uppercase text-[#C5A880]">
                  House of Aure
                </span>
              </div>
            </div>

            {/* 3D WebGL Fashion Canvas */}
            <div className="relative z-10 w-full h-full">
              <FashionCanvas
                colorway={selectedColorway}
                cameraPreset={cameraPreset}
                scrollProgress={currentScrollProgress}
                onInteractionStart={() => setIsInteracting(true)}
                onInteractionEnd={() => setIsInteracting(false)}
              />
            </div>

            {/* Drag hint overlay that fades on interaction */}
            {!isInteracting && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-opacity duration-500 opacity-60">
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-neutral-400 bg-[#121110]/80 px-3 py-1 rounded-full border border-neutral-800 font-mono">
                  Drag to inspect garment
                </span>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
