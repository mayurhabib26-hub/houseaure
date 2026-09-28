import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation over 2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          y: '-100%',
          transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F4EC] text-[#141414] overflow-hidden select-none"
      >
        {/* Subtle luxury ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,218,203,0.45)_0%,rgba(247,244,236,1)_70%)] pointer-events-none" />

        {/* Ambient fine gold lines */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <BrandLogo variant="emblem" size="hero" />
          </motion.div>

          {/* Subtitle / Season kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736E68] font-medium"
          >
            <span>Autumn / Winter</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>2026 Collection</span>
          </motion.div>

          {/* Luxury hairline progress indicator */}
          <div className="w-48 h-[1.5px] bg-[#E5DECF] mt-10 overflow-hidden relative rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C5A880] to-[#141414]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            onClick={onComplete}
            className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-[#736E68] hover:text-[#141414] transition-colors py-1 px-3 border border-transparent hover:border-[#D5CDBD] rounded-sm"
          >
            Enter Now
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
