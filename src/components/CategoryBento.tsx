import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface CategoryBentoProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryBento: React.FC<CategoryBentoProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] border-b border-[#EAE3D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A3845B] font-semibold">
              Curated Wardrobe
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#141414] font-normal tracking-tight mt-1">
              Shop by Category
            </h2>
            <p className="text-[#736E68] text-sm sm:text-base mt-2 font-light">
              Distinctive cuts engineered with architectural restraint and tactile fabrics.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout with staggered scroll reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 auto-rows-[280px] sm:auto-rows-[340px]">
          {/* Men (spans 3 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCategory('Men')}
            className="md:col-span-3 group relative overflow-hidden rounded-xs cursor-pointer bg-[#EAE4D7]"
          >
            <img
              src="/src/assets/images/bento_menswear_tailoring_1790604372489.jpg"
              alt="Men Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-[#141414]/25 to-transparent transition-opacity duration-300 group-hover:from-[#141414]/90" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E5DECF] font-medium">
                  Refined Tailoring
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl font-normal mt-0.5">
                  Men
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-xs line-clamp-1">
                  Breathable cottons, relaxed jackets & pleated trousers
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-xs group-hover:bg-white group-hover:text-[#141414] group-hover:border-white transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Women (spans 3 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCategory('Women')}
            className="md:col-span-3 group relative overflow-hidden rounded-xs cursor-pointer bg-[#EAE4D7]"
          >
            <img
              src="/src/assets/images/bento_womens_drape_1790604385297.jpg"
              alt="Women Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-[#141414]/25 to-transparent transition-opacity duration-300 group-hover:from-[#141414]/90" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E5DECF] font-medium">
                  Sensual Silks
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl font-normal mt-0.5">
                  Women
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-xs line-clamp-1">
                  Mulberry silk slip dresses & fluid sculptural knits
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-xs group-hover:bg-white group-hover:text-[#141414] group-hover:border-white transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Outerwear (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCategory('Outerwear')}
            className="md:col-span-2 group relative overflow-hidden rounded-xs cursor-pointer bg-[#EAE4D7]"
          >
            <img
              src="/src/assets/images/product_tailored_jacket_1790604459666.jpg"
              alt="Outerwear Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E5DECF] font-medium">
                  Structured
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal">
                  Outerwear
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#141414] transition-all shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          {/* Essentials (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCategory('Essentials')}
            className="md:col-span-2 group relative overflow-hidden rounded-xs cursor-pointer bg-[#EAE4D7]"
          >
            <img
              src="/src/assets/images/product_overshirt_sand_1790604509458.jpg"
              alt="Essentials Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E5DECF] font-medium">
                  Foundations
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal">
                  Essentials
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#141414] transition-all shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          {/* Accessories (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCategory('Accessories')}
            className="md:col-span-2 group relative overflow-hidden rounded-xs cursor-pointer bg-[#EAE4D7]"
          >
            <img
              src="/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg"
              alt="Accessories Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E5DECF] font-medium">
                  Artisanal
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal">
                  Accessories
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#141414] transition-all shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
