import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  initialCategory?: string;
  onQuickAdd: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory,
  onQuickAdd,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Essentials', 'Outerwear', 'Accessories'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize as any)) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured / default
      });
  }, [products, selectedCategory, selectedSize, maxPrice, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            The Catalogue
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#141414] font-normal tracking-tight mt-1">
            Shop Collection
          </h1>
          <p className="text-sm sm:text-base text-[#736E68] mt-2 font-light">
            Explore the House of Aure collection — engineered for longevity and effortless presence.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-[#EAE3D5] pb-6 mb-8 gap-4">
          {/* Category tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs whitespace-nowrap transition-colors ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#141414] text-[#FAF9F5]'
                    : 'bg-[#F4EFE6] text-[#736E68] hover:text-[#141414] hover:bg-[#EAE4D7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls: Sorting & Filter Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-2 text-xs text-[#736E68]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#141414]" />
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F4EFE6] border border-[#EAE3D5] text-[#141414] py-1.5 px-3 rounded-xs text-xs font-medium focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#F4EFE6] border border-[#EAE3D5] text-[#141414] text-xs font-medium rounded-xs hover:bg-[#EAE4D7] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFiltersMobile && (
          <div className="bg-[#F4EFE6] p-6 rounded-xs border border-[#EAE3D5] mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Size Filter */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#736E68] font-semibold mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-all ${
                      selectedSize === s
                        ? 'bg-[#141414] text-white border-[#141414]'
                        : 'bg-white text-[#736E68] border-[#DDD6C8] hover:border-[#141414]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-widest text-[#736E68] font-semibold mb-2">
                <span>Maximum Price</span>
                <span className="text-[#141414] tabular-nums font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#141414] cursor-pointer"
              />
              <div className="flex justify-between text-[0.65rem] text-[#8C8377] mt-1">
                <span>₹1,500</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Reset */}
            <div className="flex items-end sm:justify-end">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSize('All');
                  setMaxPrice(10000);
                  setSortBy('featured');
                }}
                className="text-xs uppercase tracking-widest text-[#A3845B] hover:text-[#141414] font-semibold underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="mb-8 flex items-center justify-between text-xs text-[#736E68]">
          <span>Showing {filteredProducts.length} items</span>
          {(selectedCategory !== 'All' || selectedSize !== 'All') && (
            <span className="text-xs text-[#A3845B]">
              Filtered by: {selectedCategory !== 'All' ? selectedCategory : ''}{' '}
              {selectedSize !== 'All' ? `· Size ${selectedSize}` : ''}
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-editorial text-3xl text-[#141414]">No garments match your filters</p>
            <p className="text-sm text-[#736E68] mt-2 font-light">
              Try adjusting your price range or clearing selected sizes.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSize('All');
                setMaxPrice(10000);
              }}
              className="mt-6 px-6 py-2.5 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
