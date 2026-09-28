import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount
}) => {
  const menuLinks = [
    { label: 'Shop All', target: 'shop', badge: '18 Styles' },
    { label: 'New Arrivals', target: 'new-arrivals', badge: 'Drop 02' },
    { label: 'Men', target: 'men' },
    { label: 'Women', target: 'women' },
    { label: 'Essentials', target: 'essentials' },
    { label: 'Collections', target: 'collections' },
    { label: 'About the House', target: 'about' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#FAF9F5] text-[#141414] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#EAE4D7] pb-5">
            <BrandLogo variant="compact" />
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[#141414] hover:text-[#C5A880] transition-colors focus-visible:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav list with staggered reveal */}
          <div className="flex flex-col py-8 space-y-4">
            {menuLinks.map((link, idx) => (
              <motion.button
                key={link.target}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * (idx + 1), duration: 0.4 }}
                onClick={() => {
                  onNavigate(link.target);
                  onClose();
                }}
                className="group flex items-center justify-between text-left py-2 border-b border-[#F0ECE1] focus-visible:outline-none"
              >
                <span className="font-editorial text-2xl sm:text-3xl text-[#141414] group-hover:text-[#A3845B] transition-colors flex items-center gap-3">
                  {link.label}
                  {link.badge && (
                    <span className="text-[0.65rem] font-sans uppercase tracking-widest text-[#736E68] font-normal">
                      · {link.badge}
                    </span>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 text-[#736E68] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Quick utility actions */}
          <div className="pt-6 border-t border-[#EAE4D7] flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#F2EDE2] rounded-md text-xs font-medium text-[#141414] hover:bg-[#EAE4D7] transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#F2EDE2] rounded-md text-xs font-medium text-[#141414] hover:bg-[#EAE4D7] transition-colors relative"
              >
                <Heart className="w-4 h-4" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#141414] text-[#FAF9F5] text-[0.6rem] flex items-center justify-center ml-0.5">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#141414] text-[#FAF9F5] rounded-md text-xs font-medium hover:bg-[#2C2B29] transition-colors relative"
              >
                <ShoppingBag className="w-4 h-4" />
                Bag
                {cartCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#C5A880] text-[#141414] text-[0.6rem] font-bold flex items-center justify-center ml-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-[#736E68] pt-2">
              <span>India · INR (₹)</span>
              <span>Complimentary shipping over ₹2,999</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
