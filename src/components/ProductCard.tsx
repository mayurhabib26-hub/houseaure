import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    onQuickAdd(product, defaultSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE2] rounded-xs border border-[#EAE3D5]/70">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Secondary Hover Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-[#141414] text-[#FAF9F5]'
              : 'bg-white/80 text-[#141414] hover:bg-white backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Status Tag (Zero-pill text styling) */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[0.62rem] uppercase tracking-[0.16em] font-medium text-[#141414] bg-[#FAF9F5]/90 px-2 py-0.5 backdrop-blur-xs">
              New Drop
            </span>
          </div>
        )}

        {/* Quick Add overlay button */}
        <div className="absolute inset-x-3 bottom-3 z-10 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAddClick}
            className="w-full py-2.5 px-4 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-2 hover:bg-[#2C2B29] transition-colors shadow-md"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex flex-col">
        {/* Category kicker */}
        <div className="flex items-center justify-between text-xs text-[#736E68]">
          <span className="uppercase tracking-[0.14em] text-[0.68rem]">{product.category}</span>
          <span className="text-[0.7rem] tabular-nums font-normal text-[#9B958D]">
            {product.sizes.join(' · ')}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-sm sm:text-base text-[#141414] mt-1 group-hover:text-[#A3845B] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price & Color preview */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-sm text-[#141414] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9B958D] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                className={`w-3 h-3 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? 'ring-1 ring-[#141414] ring-offset-1 scale-110 border-transparent'
                    : 'border-[#CCC5B8]'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select ${c.name} color`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
