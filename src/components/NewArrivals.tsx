import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ScrollReveal } from './ScrollReveal';

interface NewArrivalsProps {
  products: Product[];
  onQuickAdd: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onViewAll: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onQuickAdd,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onViewAll
}) => {
  const newArrivalList = products.filter((p) => p.isNewArrival).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EAE3D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal variant="fade-up" duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Drop 02 · 2026
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#141414] font-normal tracking-tight mt-1">
                New Arrivals
              </h2>
              <p className="text-[#736E68] text-sm sm:text-base mt-2 font-light max-w-lg">
                Pieces designed for every golden moment. Crafted in breathable long-staple cottons, silks, and architectural tailoring.
              </p>
            </div>

            <button
              onClick={onViewAll}
              className="group mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#141414] hover:text-[#A3845B] transition-colors focus-visible:outline-none"
            >
              <span>View All Pieces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* 4-column desktop, 2-3 column tablet, 2-column mobile with staggered scroll entrance */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivalList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: (idx % 4) * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <ProductCard
                product={product}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
