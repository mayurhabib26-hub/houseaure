import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#121212]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between text-[#141414]"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-[#EAE3D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#141414]" />
                  <h3 className="font-editorial text-2xl font-normal">Shopping Bag</h3>
                  <span className="text-xs text-[#736E68] font-normal tabular-nums">
                    ({items.reduce((acc, item) => acc + item.quantity, 0)})
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 -mr-1.5 text-[#736E68] hover:text-[#141414] transition-colors focus-visible:outline-none"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#EAE3D5]">
                <div className="flex items-center justify-between text-[0.7rem] text-[#5C5751] font-medium mb-1.5">
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="text-[#141414]">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for complimentary delivery
                    </span>
                  ) : (
                    <span className="text-[#3B704C] font-semibold">
                      ✓ You have unlocked complimentary express delivery
                    </span>
                  )}
                  <span className="tabular-nums font-semibold">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1 bg-[#E2DACB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#141414] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#EAE3D5]">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#F2EDE2] flex items-center justify-center mb-4">
                      <ShoppingBag className="w-6 h-6 text-[#A3845B]" />
                    </div>
                    <p className="font-editorial text-2xl text-[#141414]">Your bag is empty</p>
                    <p className="text-xs text-[#736E68] mt-1 max-w-xs font-light">
                      Explore the new collection to find pieces crafted for golden moments.
                    </p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="py-5 flex gap-4">
                      <div className="w-20 h-24 bg-[#F2EDE2] overflow-hidden rounded-xs shrink-0 border border-[#EAE3D5]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm text-[#141414] leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-[#9B958D] hover:text-[#B23B3B] transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-[#736E68] mt-1 flex items-center gap-2">
                            <span>Size: {item.selectedSize}</span>
                            <span>·</span>
                            <span>{item.selectedColor}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-[#E0D7C6] rounded-xs bg-[#F7F4EC]">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="p-1 hover:bg-[#EAE4D7] text-[#141414] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="p-1 hover:bg-[#EAE4D7] text-[#141414] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-medium text-sm text-[#141414] tabular-nums">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-[#F4EFE6] border-t border-[#EAE3D5] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#736E68]">
                    <span>Shipping</span>
                    <span>{remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-[#E2DACB]">
                    <span className="text-xs uppercase tracking-widest text-[#141414] font-medium">Subtotal</span>
                    <span className="font-editorial text-2xl text-[#141414] font-medium tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-[0.68rem] text-[#8C8377] font-light">
                    Taxes calculated at checkout. All orders arrive in our signature gift box.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      onCheckout();
                    }}
                    className="w-full py-3.5 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#2C2B29] transition-colors shadow-md rounded-xs"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
