import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onShopClick: () => void;
  onNewArrivalsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onNewArrivalsClick }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Parallax transforms on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '22%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[92vh] min-h-[640px] max-h-[1080px] overflow-hidden flex items-end sm:items-center bg-[#121212]"
    >
      {/* Background Image with subtle cinematic scale / parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src="/src/assets/images/hero_fashion_editorial_1790604359254.jpg"
          alt="House of Aure Autumn/Winter Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.04]"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>

      {/* 21st.dev Subtle Spotlight & Ambient Lighting Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,168,128,0.22),rgba(255,255,255,0))]" />

      {/* Measured Scrim for Media Overlay (Constitution compliant: min 4.5:1 text contrast) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#121212]/95 via-[#121212]/45 to-[#121212]/35" />

      {/* Hero Content with parallax lift and opacity fade */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col justify-end h-full"
      >
        <div className="max-w-3xl">
          {/* Subtle Season Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5DECF] font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block animate-pulse" />
              Autumn / Winter 2026 Collection
            </span>
          </motion.div>

          {/* Big Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF9F5] font-light leading-[1.05] tracking-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            Made for the moments <br className="hidden sm:block" />
            <span className="italic font-normal text-[#E8DFD1]">worth remembering.</span>
          </motion.h1>

          {/* Tagline Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed mb-8"
          >
            Contemporary essentials woven from certified organic flax and fine silks. Designed to move with you through every golden moment.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary Shimmer Button */}
            <button
              onClick={onShopClick}
              className="relative group overflow-hidden bg-[#FAF9F5] text-[#141414] px-8 py-3.5 rounded-sm font-medium text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#EAE4D7] shadow-lg flex items-center justify-center gap-3 focus-visible:outline-none"
            >
              {/* Shimmer sweep animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onNewArrivalsClick}
              className="px-7 py-3.5 rounded-sm border border-[#E5DECF]/40 text-[#FAF9F5] hover:bg-white/10 hover:border-[#FAF9F5] font-medium text-xs uppercase tracking-[0.18em] transition-all duration-300 backdrop-blur-xs flex items-center justify-center focus-visible:outline-none"
            >
              Explore New Arrivals
            </button>
          </motion.div>
        </div>

        {/* Bottom subtle trust indicators & Scroll to Explore hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#C5A880]">✦</span>
            <span>Crafted in Limited Quantities</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-[#C5A880]">
            <span>Scroll to Explore</span>
            <span className="w-8 h-[1px] bg-[#C5A880]/60 inline-block animate-pulse" />
          </div>

          <div className="flex items-center gap-6">
            <span>Free Express Delivery over ₹2,999</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">14-Day Easy Returns</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
