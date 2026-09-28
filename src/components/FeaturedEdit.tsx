import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface FeaturedEditProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

export const FeaturedEdit: React.FC<FeaturedEditProps> = ({
  products,
  onSelectProduct,
  onQuickAdd
}) => {
  const editProducts = products.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#EAE3D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#A3845B] font-semibold">
                Curator's Selection
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#141414] tracking-tight mt-1">
                The Aure Edit
              </h2>
              <p className="text-sm sm:text-base text-[#736E68] font-light mt-2 max-w-md">
                Key foundational silhouettes defined by balanced proportions, hand-finished seams, and luxurious natural textiles.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Featured Products in Horizontal Editorial Presentation with staggered scroll motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {editProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col bg-[#F5EFE4] p-5 sm:p-7 rounded-xs border border-[#E8DFD1] hover:border-[#D5C7B4] transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/40 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 text-[0.65rem] uppercase tracking-widest text-[#736E68] bg-[#FAF9F5]/90 px-2 py-0.5 font-medium">
                  {`No. 0${idx + 1}`}
                </div>
              </div>

              {/* Information */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#736E68] mb-1">
                    <span className="uppercase tracking-widest">{product.category}</span>
                    <span className="tabular-nums font-medium text-[#141414] text-sm">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#141414] font-normal group-hover:text-[#A3845B] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#736E68] font-light leading-relaxed mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 text-[0.7rem] text-[#8C8377] italic">
                    Fabric: {product.fabric}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFD1] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#141414] group-hover:text-[#A3845B] transition-colors flex items-center gap-1.5">
                    View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Default');
                    }}
                    className="p-2 rounded-full bg-[#141414] text-[#FAF9F5] hover:bg-[#A3845B] transition-colors"
                    aria-label="Add to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
