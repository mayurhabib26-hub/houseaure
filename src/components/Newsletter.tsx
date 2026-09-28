import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#181716] text-[#FAF9F5] overflow-hidden border-b border-[#292725]">
      {/* Subtle luxury ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(197,168,128,0.1),transparent)]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal variant="fade-up" duration={0.8}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            Invitation
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#FAF9F5] tracking-tight mt-2 mb-4">
            Join the House.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg mx-auto leading-relaxed mb-8">
            Be the first to discover new collections, private preview invitations, and stories from House of Aure.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#242220] border border-[#C5A880]/40 p-6 rounded-xs max-w-md mx-auto flex items-center justify-center gap-3 text-sm text-[#E8DFD1]"
            >
              <Check className="w-5 h-5 text-[#C5A880]" />
              <span>Welcome to the House. Your private access code has been dispatched.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#201F1D] p-1.5 rounded-xs border border-[#3A3733] focus-within:border-[#C5A880] transition-colors shadow-lg">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="relative overflow-hidden group bg-[#FAF9F5] text-[#141414] px-6 py-3 rounded-xs font-medium text-xs uppercase tracking-[0.16em] hover:bg-[#E8DFD1] transition-all whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-[0.68rem] text-neutral-500 mt-3 font-light">
                By subscribing you agree to receive communications. Unsubscribe at any time.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
