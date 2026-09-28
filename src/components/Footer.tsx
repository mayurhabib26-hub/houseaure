import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCategory }) => {
  return (
    <footer className="bg-[#121212] text-[#FAF9F5] border-t border-[#262422] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#262422]">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Circular Emblem Logo matching reference */}
            <div className="mb-5">
              <BrandLogo variant="emblem" size="md" inverted={false} />
            </div>
            <span
              className="font-bold tracking-tight text-2xl text-white leading-none"
              style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            >
              House of Aure
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mt-1.5 font-medium">
              Golden moments, Everyday
            </p>
            <p className="text-xs text-neutral-400 font-light mt-4 max-w-sm leading-relaxed">
              An independent contemporary fashion house dedicated to timeless silhouettes, honest natural materials, and quiet refinement.
            </p>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCategory('Men')}
                  className="hover:text-white transition-colors"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCategory('Women')}
                  className="hover:text-white transition-colors"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCategory('Essentials')}
                  className="hover:text-white transition-colors"
                >
                  Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCategory('Outerwear')}
                  className="hover:text-white transition-colors"
                >
                  Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCategory('Accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Textile Archives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Craft & Atelier
                </button>
              </li>
              <li>
                <a
                  href="mailto:concierge@houseofaure.com"
                  className="hover:text-white transition-colors"
                >
                  Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Garment Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Size & Fitting Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Frequently Asked Questions
                </span>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Social
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light gap-4">
          <div>
            © 2026 House of Aure. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>·</span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span>·</span>
            <span>India / INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
