import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Compass, Feather, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FashionStoryProps {
  onExploreAbout: () => void;
}

export const FashionStory: React.FC<FashionStoryProps> = ({ onExploreAbout }) => {
  const storyRef1 = useRef<HTMLDivElement | null>(null);
  const storyRef2 = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: scroll1 } = useScroll({
    target: storyRef1,
    offset: ['start end', 'end start']
  });

  const { scrollYProgress: scroll2 } = useScroll({
    target: storyRef2,
    offset: ['start end', 'end start']
  });

  const imageY1 = useTransform(scroll1, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-6%', '6%']);
  const imageY2 = useTransform(scroll2, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section className="py-24 sm:py-36 bg-[#F4EFE6] border-b border-[#EAE3D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <ScrollReveal variant="fade-up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#A3845B] font-semibold">
              Philosophy
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-light text-[#141414] tracking-tight mt-2">
              More than clothing.
            </h2>
            <p className="text-base sm:text-lg text-[#736E68] font-light mt-4 leading-relaxed">
              Every piece is designed around the moments that stay with you — the everyday moments that quietly become unforgettable.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Row 1: Image Left, Text Right */}
        <div ref={storyRef1} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-[4/3] rounded-xs overflow-hidden shadow-lg border border-[#E5DECF] bg-white">
              <motion.img
                style={{ y: imageY1, scale: 1.08 }}
                src="/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg"
                alt="House of Aure Fabric Craftsmanship"
                className="w-full h-full object-cover object-center filter brightness-[0.95]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            {/* Architectural accent note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 hidden sm:block bg-[#FAF9F5] p-5 border border-[#E5DECF] shadow-md max-w-xs"
            >
              <span className="text-[0.65rem] uppercase tracking-widest text-[#A3845B] font-semibold block">
                TEXTILE ARCHIVE
              </span>
              <p className="text-xs text-[#141414] font-medium mt-1">
                Normandy certified flax, Giza compact cotton, and 22-momme mulberry silk.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center lg:pl-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#736E68] font-medium">
              Chapter I · Material Purity
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal mt-2 mb-5">
              Tactile Noble & Ethical Origins
            </h3>
            <p className="text-sm sm:text-base text-[#5C5751] font-light leading-relaxed mb-6">
              True luxury lives in how a garment rests upon your skin. We obsess over weight, drape, and breathability. Our buttons are turned from natural corozo nut and mother-of-pearl, never synthetic resin.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5DECF]">
              <div>
                <span className="font-editorial text-2xl text-[#141414]">100%</span>
                <span className="text-xs text-[#736E68] block mt-0.5">Natural fibers & dyes</span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#141414]">Zero</span>
                <span className="text-xs text-[#736E68] block mt-0.5">Harmful synthetic blends</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Story Row 2: Text Left, Image Right */}
        <div ref={storyRef2} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 lg:pr-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#736E68] font-medium">
              Chapter II · Architectural Proportions
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal mt-2 mb-5">
              Engineered with Effortless Ease
            </h3>
            <p className="text-sm sm:text-base text-[#5C5751] font-light leading-relaxed mb-6">
              Our patterns are drafted to accommodate natural posture and movement without breaking line. From relaxed drop shoulders to clean waistbands with concealed flexibility, every detail serves your life.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreAbout}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#141414] hover:text-[#A3845B] transition-colors py-2 border-b border-[#141414] hover:border-[#A3845B]"
              >
                <span>Read the House Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="aspect-[4/3] rounded-xs overflow-hidden shadow-lg border border-[#E5DECF] bg-white">
              <motion.img
                style={{ y: imageY2, scale: 1.08 }}
                src="/src/assets/images/hero_fashion_editorial_1790604359254.jpg"
                alt="House of Aure Design Studio"
                className="w-full h-full object-cover object-center filter brightness-[0.92]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
