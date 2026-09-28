import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ActivePage } from './types';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { MarqueeSection } from './components/MarqueeSection';
import { NewArrivals } from './components/NewArrivals';
import { CategoryBento } from './components/CategoryBento';
import { SplineScene } from './components/SplineScene';
import { EditorialContainerScroll } from './components/EditorialContainerScroll';
import { FeaturedEdit } from './components/FeaturedEdit';
import { FashionStory } from './components/FashionStory';
import { InstagramGrid } from './components/InstagramGrid';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { ProductQuickView } from './components/ProductQuickView';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShopView } from './pages/ShopView';
import { AboutView } from './pages/AboutView';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Aure Tailored Jacket
      selectedColor: 'Charcoal Black',
      selectedSize: 'L',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id, PRODUCTS[2].id]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product detail quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Default');
  };

  // Navigation handlers
  const handleNavigate = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'mobile-menu') {
      setIsMobileMenuOpen(true);
      return;
    }
    if (page === 'shop' || page === 'collections') {
      setSelectedCategoryFilter('All');
      setActivePage('shop');
    } else if (page === 'new-arrivals') {
      setSelectedCategoryFilter('New Arrivals');
      setActivePage('shop');
    } else if (['men', 'women', 'essentials', 'outerwear', 'accessories'].includes(page.toLowerCase())) {
      setSelectedCategoryFilter(page.charAt(0).toUpperCase() + page.slice(1));
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
  };

  const handleCategorySelect = (category: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedCategoryFilter(category);
    setActivePage('shop');
  };

  const handleBuyNow = (product: Product, size: string, color: string, qty: number) => {
    handleAddToCart(product, size, color, qty);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141414] font-sans flex flex-col selection:bg-[#E2DACB] selection:text-[#141414]">
      {/* 1. Cinematic Intro Screen on Initial Load */}
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      {/* 2. Sticky / Floating Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        activePage={activePage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            {/* 3. Full-screen Hero Section */}
            <Hero
              onShopClick={() => handleNavigate('shop')}
              onNewArrivalsClick={() => handleNavigate('new-arrivals')}
            />

            {/* 4. Magic UI Marquee Section */}
            <MarqueeSection />

            {/* 5. New Arrivals Section */}
            <NewArrivals
              products={PRODUCTS}
              onQuickAdd={(p, s, c) => handleAddToCart(p, s, c, 1)}
              onSelectProduct={(p) => setQuickViewProduct(p)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigate('new-arrivals')}
            />

            {/* 6. Shop by Category (BentoGrid) */}
            <CategoryBento onSelectCategory={handleCategorySelect} />

            {/* 7. Spline 3D Section: "THE WORLD OF AURE" */}
            <SplineScene onExploreCollection={() => handleNavigate('shop')} />

            {/* 8. Editorial Container Scroll Animation */}
            <EditorialContainerScroll onDiscoverStory={() => handleNavigate('about')} />

            {/* 9. Featured Collection: "THE AURE EDIT" */}
            <FeaturedEdit
              products={PRODUCTS}
              onSelectProduct={(p) => setQuickViewProduct(p)}
              onQuickAdd={(p, s, c) => handleAddToCart(p, s, c, 1)}
            />

            {/* 10. Fashion Story Section */}
            <FashionStory onExploreAbout={() => handleNavigate('about')} />

            {/* 11. Instagram / Social Editorial Grid */}
            <InstagramGrid />

            {/* 12. Minimalist Luxury Newsletter */}
            <Newsletter />
          </>
        )}

        {activePage === 'shop' && (
          <ShopView
            products={PRODUCTS}
            initialCategory={selectedCategoryFilter}
            onQuickAdd={(p, s, c) => handleAddToCart(p, s, c, 1)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activePage === 'about' && (
          <AboutView onShopClick={() => handleNavigate('shop')} />
        )}
      </main>

      {/* 13. Premium Editorial Footer */}
      <Footer onNavigate={handleNavigate} onOpenCategory={handleCategorySelect} />

      {/* Overlays, Drawers & Modals */}
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={PRODUCTS}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Product Quick View / PDP Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, s, c, qty) => handleAddToCart(p, s, c, qty)}
        onBuyNow={handleBuyNow}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Checkout Modal Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* Floating Back to Top Scroll Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141414]/90 backdrop-blur-xs text-[#FAF9F5] hover:bg-[#C5A880] hover:text-[#141414] transition-all duration-300 shadow-xl border border-[#3A3733]/50 flex items-center justify-center focus-visible:outline-none"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 stroke-[2]" />
        </button>
      )}
    </div>
  );
}
