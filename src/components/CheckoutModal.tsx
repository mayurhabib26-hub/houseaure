import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, Smartphone, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42, Boulevard Residence, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    paymentMethod: 'upi'
  });
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 2999 ? 0 : 250;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderId = `AURE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);
    setStep('confirmed');
    onOrderSuccess();
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
            onClick={step === 'confirmed' ? onClose : undefined}
            className="fixed inset-0 bg-[#121212]/75 backdrop-blur-xs"
          />

          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-[#FAF9F5] rounded-xs shadow-2xl border border-[#EAE3D5] text-[#141414] overflow-hidden my-6"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#EAE3D5] flex items-center justify-between bg-[#F4EFE6]">
                <div>
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#A3845B] font-semibold">
                    House of Aure · Concierge Checkout
                  </span>
                  <h3 className="font-editorial text-2xl font-normal">
                    {step === 'confirmed' ? 'Order Confirmed' : 'Checkout & Delivery'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-[#736E68] hover:text-[#141414] transition-colors"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {step === 'confirmed' ? (
                <div className="p-8 sm:p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#3B704C] flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    Payment Verified
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#141414] font-normal mt-1">
                    Thank you for your patronage.
                  </h2>
                  <p className="text-sm text-[#736E68] mt-2 max-w-md font-light leading-relaxed">
                    Order <strong className="text-[#141414]">{orderId}</strong> has been confirmed. Our atelier has begun preparing your garment in signature packaging.
                  </p>

                  <div className="mt-8 p-5 bg-[#F4EFE6] rounded-xs border border-[#E5DECF] w-full max-w-md text-left text-xs space-y-2">
                    <div className="flex justify-between text-[#736E68]">
                      <span>Recipient</span>
                      <span className="font-medium text-[#141414]">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between text-[#736E68]">
                      <span>Destination</span>
                      <span className="font-medium text-[#141414]">{formData.city}, {formData.pincode}</span>
                    </div>
                    <div className="flex justify-between text-[#736E68]">
                      <span>Total Paid</span>
                      <span className="font-bold text-[#141414]">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[#736E68]">
                      <span>Estimated Delivery</span>
                      <span className="font-medium text-[#3B704C]">2-3 Business Days</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-8 px-8 py-3 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2C2B29] transition-colors rounded-xs"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Shipping Form */}
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="text-xs uppercase tracking-[0.18em] text-[#736E68] font-semibold">
                        Shipping Address (India)
                      </h4>

                      <div>
                        <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] uppercase tracking-wider text-[#736E68] mb-1">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xs text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                          />
                        </div>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="pt-4 border-t border-[#EAE3D5]">
                        <h4 className="text-xs uppercase tracking-[0.18em] text-[#736E68] font-semibold mb-3">
                          Select Payment Mode
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                            className={`p-3 rounded-xs border text-left flex flex-col justify-between transition-all ${
                              formData.paymentMethod === 'upi'
                                ? 'border-[#141414] bg-[#F2EDE2]'
                                : 'border-[#E0D7C6] bg-white'
                            }`}
                          >
                            <Smartphone className="w-4 h-4 mb-2 text-[#141414]" />
                            <span className="text-xs font-semibold">UPI / QR</span>
                            <span className="text-[0.65rem] text-[#736E68]">GooglePay, PhonePe</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                            className={`p-3 rounded-xs border text-left flex flex-col justify-between transition-all ${
                              formData.paymentMethod === 'card'
                                ? 'border-[#141414] bg-[#F2EDE2]'
                                : 'border-[#E0D7C6] bg-white'
                            }`}
                          >
                            <CreditCard className="w-4 h-4 mb-2 text-[#141414]" />
                            <span className="text-xs font-semibold">Cards</span>
                            <span className="text-[0.65rem] text-[#736E68]">Visa, MasterCard, Amex</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                            className={`p-3 rounded-xs border text-left flex flex-col justify-between transition-all ${
                              formData.paymentMethod === 'cod'
                                ? 'border-[#141414] bg-[#F2EDE2]'
                                : 'border-[#E0D7C6] bg-white'
                            }`}
                          >
                            <Banknote className="w-4 h-4 mb-2 text-[#141414]" />
                            <span className="text-xs font-semibold">COD</span>
                            <span className="text-[0.65rem] text-[#736E68]">Pay on delivery</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5 bg-[#F4EFE6] p-5 rounded-xs border border-[#E5DECF] flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.18em] text-[#736E68] font-semibold mb-3">
                          Order Summary ({items.length} items)
                        </h4>

                        <div className="max-h-52 overflow-y-auto divide-y divide-[#EAE3D5] pr-1">
                          {items.map((item, idx) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.product.image}
                                  alt=""
                                  className="w-10 h-12 object-cover rounded-xs border border-[#E0D7C6]"
                                />
                                <div>
                                  <p className="font-medium text-[#141414] line-clamp-1">{item.product.name}</p>
                                  <p className="text-[0.65rem] text-[#736E68]">
                                    Size: {item.selectedSize} · Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-medium text-[#141414] tabular-nums">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E0D7C6] space-y-1.5 text-xs text-[#736E68]">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-[#E0D7C6] text-sm font-semibold text-[#141414]">
                            <span>Total</span>
                            <span className="tabular-nums font-editorial text-xl">₹{total.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E0D7C6]">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#141414] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#2C2B29] transition-colors rounded-xs shadow-md"
                        >
                          <span>Confirm & Place Order</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="mt-3 flex items-center justify-center gap-2 text-[0.65rem] text-[#736E68]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#3B704C]" />
                          <span>256-Bit SSL Encrypted & Protected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
