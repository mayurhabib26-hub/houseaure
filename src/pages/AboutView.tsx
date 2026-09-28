import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface AboutViewProps {
  onShopClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onShopClick }) => {
  return (
    <div className="pt-28 pb-24 bg-[#FAF9F5]">
      {/* Editorial Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 sm:mb-24">
        <div className="flex justify-center mb-6">
          <BrandLogo variant="emblem" size="lg" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
          About the House
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#141414] tracking-tight mt-2 mb-6">
          Golden moments, <br />
          <span className="italic font-normal">Everyday.</span>
        </h1>
        <p className="text-base sm:text-xl text-[#5C5751] font-light max-w-2xl mx-auto leading-relaxed">
          Founded in 2024, House of Aure was conceived as an antidote to disposable fashion — creating tactile, enduring garments designed around human moments that become memories.
        </p>
      </div>

      {/* Campaign imagery banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="aspect-[21/9] rounded-xs overflow-hidden shadow-xl border border-[#EAE3D5]">
          <img
            src="/src/assets/images/hero_fashion_editorial_1790604359254.jpg"
            alt="House of Aure Atelier & Studio"
            className="w-full h-full object-cover object-center filter brightness-[0.9]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Editorial Narrative */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-12">
        <div className="border-l-2 border-[#C5A880] pl-6 py-2">
          <p className="font-editorial text-2xl sm:text-3xl text-[#141414] font-light leading-snug">
            "A garment is not merely cloth; it is the physical medium through which we inhabit our days. When cut with care, it grants silence, confidence, and quiet grace."
          </p>
          <span className="text-xs uppercase tracking-widest text-[#736E68] mt-3 block">
            — Atelier Design Notes, Volume 01
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm sm:text-base text-[#5C5751] font-light leading-relaxed">
          <p>
            At House of Aure, every pattern originates from the human silhouette in motion. We study how fabric breaks across the shoulder, how linen softens under coastal breeze, and how structured wool provides warmth without rigid encumbrance.
          </p>
          <p>
            Our textiles are sourced exclusively from historical mills practicing ethical stewardship: organic long-staple cotton, Normandy certified flax, and mulberry silk with zero synthetic resin finishes.
          </p>
        </div>
      </div>

      {/* The 3 Pillars */}
      <div className="bg-[#F4EFE6] py-20 border-y border-[#EAE3D5] mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-start">
              <span className="font-editorial text-4xl text-[#C5A880] mb-2">01</span>
              <h3 className="font-editorial text-2xl text-[#141414] font-normal mb-2">
                Noble Materials
              </h3>
              <p className="text-xs sm:text-sm text-[#736E68] font-light leading-relaxed">
                Zero polyester blends. Every garment is crafted from 100% natural, biodegradable fibers designed to patina and soften with every golden wear.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <span className="font-editorial text-4xl text-[#C5A880] mb-2">02</span>
              <h3 className="font-editorial text-2xl text-[#141414] font-normal mb-2">
                Architectural Proportions
              </h3>
              <p className="text-xs sm:text-sm text-[#736E68] font-light leading-relaxed">
                Balanced lines that flatter naturally without constricting. Subtle dropped shoulders, single-pleat trousers, and bias-cut silks.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <span className="font-editorial text-4xl text-[#C5A880] mb-2">03</span>
              <h3 className="font-editorial text-2xl text-[#141414] font-normal mb-2">
                Conscious Cadence
              </h3>
              <p className="text-xs sm:text-sm text-[#736E68] font-light leading-relaxed">
                We release in limited, deliberate seasonal drops rather than endless fast-fashion cycles. Each piece is made to be treasured for years.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal mb-4">
          Experience the Wardrobe
        </h3>
        <p className="text-sm text-[#736E68] font-light mb-8 max-w-md mx-auto">
          Explore garments thoughtfully designed for everyday moments worth remembering.
        </p>
        <button
          onClick={onShopClick}
          className="px-8 py-3.5 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2B29] transition-colors rounded-xs shadow-md"
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
};
