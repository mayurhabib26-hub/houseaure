import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const InstagramGrid: React.FC = () => {
  const socialImages = [
    {
      src: '/src/assets/images/bento_womens_drape_1790604385297.jpg',
      caption: 'Evening calm in pure Mulberry Silk slip.'
    },
    {
      src: '/src/assets/images/product_linen_shirt_1790604472438.jpg',
      caption: 'Linen textures drying in morning sun.'
    },
    {
      src: '/src/assets/images/bento_menswear_tailoring_1790604372489.jpg',
      caption: 'The single-pleat relaxed trouser in charcoal.'
    },
    {
      src: '/src/assets/images/editorial_campaign_scroll_1790604397622.jpg',
      caption: 'Autumn/Winter campaign moments.'
    },
    {
      src: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
      caption: 'Horn button details & hand-finished edges.'
    },
    {
      src: '/src/assets/images/product_tailored_jacket_1790604459666.jpg',
      caption: 'Architectural cuts for timeless wardrobes.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EAE3D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" duration={0.8}>
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A3845B] font-semibold flex items-center justify-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              @houseofaure
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal tracking-tight mt-1">
              Moments from the House
            </h2>
            <p className="text-xs sm:text-sm text-[#736E68] mt-2 font-light">
              Tag #HouseOfAure to be featured in our seasonal journal.
            </p>
          </div>
        </ScrollReveal>

        {/* 6-image grid with staggered scroll entrance */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {socialImages.map((item, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative aspect-square overflow-hidden rounded-xs bg-[#EAE4D7] border border-[#E5DECF]"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Hover overlay with Instagram icon */}
              <div className="absolute inset-0 bg-[#141414]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-[#E8DFD1] mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <span className="text-[0.68rem] font-light leading-snug line-clamp-2 text-neutral-200">
                  {item.caption}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border border-[#141414] text-[#141414] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#141414] hover:text-[#FAF9F5] transition-colors"
            >
              <span>Follow the Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
