import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface EditorialContainerScrollProps {
  onDiscoverStory: () => void;
}

export const EditorialContainerScroll: React.FC<EditorialContainerScrollProps> = ({ onDiscoverStory }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 21st.dev Container Scroll Transformations
  const scale = useTransform(scrollYProgress, [0.1, 0.55], shouldReduceMotion ? [1, 1] : [0.88, 1]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.55], shouldReduceMotion ? [0, 0] : [14, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [0.6, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.45], shouldReduceMotion ? [0, 0] : [45, 0]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.8], shouldReduceMotion ? [1, 1] : [1.16, 1.02]);
  const imageY = useTransform(scrollYProgress, [0.1, 0.8], shouldReduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-36 bg-[#FAF9F5] overflow-hidden border-b border-[#EAE3D5] flex flex-col items-center"
      style={{ perspective: '1100px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Text Block with Scroll Motion */}
        <motion.div style={{ y: textY }} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A3845B] font-semibold">
            The Campaign Film
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-[#141414] tracking-tight mt-2 mb-4">
            Golden Moments, <br />
            <span className="italic">Everyday.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#736E68] font-light max-w-xl mx-auto leading-relaxed">
            House of Aure creates contemporary essentials designed to move with you through every moment — from morning stillness to twilight gatherings.
          </p>
          <div className="mt-6">
            <button
              onClick={onDiscoverStory}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#141414] hover:text-[#A3845B] transition-colors py-2 border-b border-[#141414] hover:border-[#A3845B]"
            >
              <span>Discover the Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* 21st.dev Container Scroll Frame with Smooth 3D Entrance */}
        <motion.div
          style={{
            scale,
            rotateX,
            opacity
          }}
          className="relative w-full aspect-[16/9] max-h-[720px] rounded-xs overflow-hidden shadow-2xl border border-[#E0D7C6] bg-[#141414]"
        >
          <motion.img
            style={{
              scale: imageScale,
              y: imageY
            }}
            src="/src/assets/images/editorial_campaign_scroll_1790604397622.jpg"
            alt="House of Aure Editorial Campaign Scene"
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Ambient Film Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Editorial Overlay Kicker */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white z-10">
            <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-[#E5DECF] font-medium block">
              Lookbook Series · Volume I
            </span>
            <span className="font-editorial text-xl sm:text-3xl text-white font-light">
              Atmosphere & Movement
            </span>
          </div>

          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-white/80 z-10 hidden sm:block">
            <span className="text-xs uppercase tracking-widest font-mono">
              35MM · NATURAL SUNLIGHT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
