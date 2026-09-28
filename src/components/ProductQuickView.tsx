import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Plus, Minus, Check, ShieldCheck, RefreshCw, Truck, Ruler } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onBuyNow: (product: Product, size: string, color: string, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#121212]/70 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#FAF9F5] rounded-xs shadow-2xl overflow-hidden border border-[#EAE3D5] text-[#141414] my-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#141414] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 stroke-[1.6]" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Left Column: Gallery */}
                <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F4EFE6] border-b lg:border-b-0 lg:border-r border-[#EAE3D5] flex flex-col items-center justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-md rounded-xs overflow-hidden bg-white/60 shadow-sm border border-[#E2DACB]">
                    <img
                      src={activeImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Thumbnail Row */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-3 mt-4">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(img)}
                          className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                            activeImage === img ? 'border-[#141414]' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Sticky Product Info */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Category kicker */}
                    <div className="flex items-center justify-between text-xs text-[#736E68] uppercase tracking-widest font-medium mb-1">
                      <span>{product.category}</span>
                      <span className="text-[#3B704C] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B704C]" />
                        In Stock & Ready to Dispatch
                      </span>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal leading-tight">
                      {product.name}
                    </h2>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="font-editorial text-3xl font-medium text-[#141414] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#9B958D] line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-[0.7rem] text-[#736E68] uppercase tracking-wider">
                        Inclusive of all taxes
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C5751] font-light leading-relaxed mt-4">
                      {product.description}
                    </p>

                    <div className="mt-3 text-xs text-[#8C8377] font-medium">
                      Composition: <span className="font-normal text-[#141414]">{product.fabric}</span>
                    </div>

                    {/* Color Selector */}
                    <div className="mt-6 pt-5 border-t border-[#EAE3D5]">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="uppercase tracking-widest text-[#736E68] font-medium">
                          Color: <strong className="text-[#141414]">{selectedColor}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.name)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs transition-all ${
                              selectedColor === c.name
                                ? 'border-[#141414] bg-[#F2EDE2] font-semibold text-[#141414]'
                                : 'border-[#E0D7C6] bg-transparent text-[#736E68] hover:border-[#141414]'
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="uppercase tracking-widest text-[#736E68] font-medium">
                          Size: <strong className="text-[#141414]">{selectedSize}</strong>
                        </span>
                        <button
                          onClick={() => setShowSizeGuide(!showSizeGuide)}
                          className="flex items-center gap-1 text-[#A3845B] hover:text-[#141414] transition-colors underline"
                        >
                          <Ruler className="w-3 h-3" />
                          Size Guide
                        </button>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`py-2 rounded-xs text-xs font-medium uppercase tracking-wider transition-all border ${
                              selectedSize === s
                                ? 'bg-[#141414] text-[#FAF9F5] border-[#141414]'
                                : 'bg-transparent text-[#141414] border-[#E0D7C6] hover:border-[#141414]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {showSizeGuide && (
                        <div className="mt-3 p-3 bg-[#F4EFE6] border border-[#E5DECF] rounded-xs text-[0.7rem] text-[#5C5751]">
                          <p className="font-semibold text-[#141414] mb-1">Standard Tailoring Measurements (Inches):</p>
                          <div className="grid grid-cols-4 gap-2 text-center pt-1 border-t border-[#E0D7C6]">
                            <span>S: Chest 38"</span>
                            <span>M: Chest 40"</span>
                            <span>L: Chest 42"</span>
                            <span>XL: Chest 44"</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-xs uppercase tracking-widest text-[#736E68] font-medium">Quantity</span>
                      <div className="flex items-center border border-[#E0D7C6] rounded-xs bg-[#F7F4EC]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-2.5 py-1 text-[#141414] hover:bg-[#EAE4D7] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-2.5 py-1 text-[#141414] hover:bg-[#EAE4D7] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-[#EAE3D5] space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleAdd}
                        className="flex-1 py-3.5 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#2C2B29] transition-colors rounded-xs shadow-md"
                      >
                        {addedSuccess ? (
                          <>
                            <Check className="w-4 h-4 text-[#C5A880]" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <span>Add to Bag</span>
                        )}
                      </button>

                      <button
                        onClick={() => onToggleWishlist(product)}
                        className={`p-3.5 rounded-xs border transition-colors ${
                          isWishlisted
                            ? 'bg-[#141414] text-[#FAF9F5] border-[#141414]'
                            : 'border-[#E0D7C6] text-[#141414] hover:border-[#141414]'
                        }`}
                        aria-label="Wishlist toggle"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <button
                      onClick={handleBuy}
                      className="w-full py-3.5 bg-[#C5A880] text-[#141414] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#B39366] transition-colors rounded-xs"
                    >
                      Buy Now with 1-Click
                    </button>

                    {/* Trust Perks */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EAE3D5] text-center text-[0.68rem] text-[#736E68]">
                      <div className="flex flex-col items-center gap-1">
                        <Truck className="w-4 h-4 text-[#141414]" />
                        <span>Free Shipping &gt; ₹2,999</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="w-4 h-4 text-[#141414]" />
                        <span>14-Day Easy Returns</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-[#141414]" />
                        <span>Certified Authentic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
