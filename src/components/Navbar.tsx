import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Search, Heart, ShoppingBag, Menu, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activePage,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', id: 'shop' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'Collections', id: 'collections' },
    { label: 'Men', id: 'men' },
    { label: 'Women', id: 'women' },
    { label: 'About', id: 'about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF9F5]/92 backdrop-blur-md py-3.5 border-b border-[#EAE4D7] shadow-xs'
            : 'bg-gradient-to-b from-[#141414]/75 via-[#141414]/30 to-transparent py-5 text-white'
        }`}
      >
        {/* Subtle Luxury Scroll Progress Hairline Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A880] via-[#E8DFD1] to-[#C5A880] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark / Emblem */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 border ${
                  isScrolled
                    ? 'bg-[#F4EFE6] text-[#141414] border-[#E5DECF]'
                    : 'bg-[#FAF9F5] text-[#141414] border-white/30'
                }`}
              >
                <span className="font-bold text-[0.62rem] leading-none">HA</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold tracking-tight text-base sm:text-lg leading-none transition-colors ${
                    isScrolled ? 'text-[#141414]' : 'text-white'
                  }`}
                  style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                  House of Aure
                </span>
                <span
                  className={`text-[0.55rem] sm:text-[0.6rem] tracking-wider uppercase opacity-75 mt-0.5 ${
                    isScrolled ? 'text-[#736E68]' : 'text-neutral-300'
                  }`}
                >
                  Golden moments, Everyday
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs uppercase tracking-[0.16em] font-medium">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#C5A880] focus-visible:outline-none ${
                    isScrolled
                      ? isActive
                        ? 'text-[#141414] font-semibold'
                        : 'text-[#5C5751]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-colors focus-visible:outline-none ${
                isScrolled ? 'hover:bg-[#F2EDE2] text-[#141414]' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className={`p-2 rounded-full transition-colors relative focus-visible:outline-none ${
                isScrolled ? 'hover:bg-[#F2EDE2] text-[#141414]' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A880] text-[#141414] text-[0.6rem] font-bold flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all focus-visible:outline-none ${
                isScrolled
                  ? 'bg-[#141414] text-[#FAF9F5] hover:bg-[#2C2B29]'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/20'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => onNavigate('mobile-menu')}
              className={`md:hidden p-2 rounded-full transition-colors focus-visible:outline-none ${
                isScrolled ? 'hover:bg-[#F2EDE2] text-[#141414]' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.7]" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
