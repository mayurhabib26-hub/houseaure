import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct
}) => {
  const wishlistedItems = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#121212]/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between text-[#141414]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#EAE3D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-current text-[#141414]" />
                  <h3 className="font-editorial text-2xl font-normal">Wishlist</h3>
                  <span className="text-xs text-[#736E68] font-normal tabular-nums">
                    ({wishlistedItems.length})
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 -mr-1.5 text-[#736E68] hover:text-[#141414] transition-colors"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#EAE3D5]">
                {wishlistedItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#F2EDE2] flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-[#A3845B]" />
                    </div>
                    <p className="font-editorial text-2xl text-[#141414]">Your wishlist is empty</p>
                    <p className="text-xs text-[#736E68] mt-1 max-w-xs font-light">
                      Save pieces you cherish to revisit them at any moment.
                    </p>
                  </div>
                ) : (
                  wishlistedItems.map((product) => (
                    <div key={product.id} className="py-5 flex gap-4">
                      <div
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="w-20 h-24 bg-[#F2EDE2] overflow-hidden rounded-xs shrink-0 cursor-pointer border border-[#EAE3D5]"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4
                              onClick={() => {
                                onSelectProduct(product);
                                onClose();
                              }}
                              className="font-medium text-sm text-[#141414] cursor-pointer hover:text-[#A3845B] transition-colors line-clamp-1"
                            >
                              {product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveFromWishlist(product)}
                              className="text-[#9B958D] hover:text-[#B23B3B] transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#736E68] mt-0.5">{product.category}</p>
                          <p className="text-xs font-medium text-[#141414] mt-1 tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              onMoveToCart(product);
                              onRemoveFromWishlist(product);
                            }}
                            className="w-full py-2 px-3 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 hover:bg-[#2C2B29] transition-colors rounded-xs"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistedItems.length > 0 && (
                <div className="p-6 bg-[#F4EFE6] border-t border-[#EAE3D5]">
                  <p className="text-xs text-[#736E68] text-center font-light mb-3">
                    Items in your wishlist remain saved in your local session.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-3 border border-[#141414] text-[#141414] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#141414] hover:text-[#FAF9F5] transition-colors rounded-xs"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
