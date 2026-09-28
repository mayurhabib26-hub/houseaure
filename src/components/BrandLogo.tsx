import React from 'react';

interface BrandLogoProps {
  variant?: 'emblem' | 'wordmark' | 'compact' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'emblem',
  className = '',
  size = 'md',
  inverted = false
}) => {
  // Dimensions based on size
  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    hero: 'w-48 h-48 sm:w-56 sm:h-56'
  };

  const wordmarkSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl',
    hero: 'text-4xl sm:text-5xl md:text-6xl'
  };

  // If emblem variant, render the circular emblem matching the uploaded official logo
  if (variant === 'emblem') {
    return (
      <div
        className={`relative rounded-full flex flex-col items-center justify-center shrink-0 select-none shadow-sm transition-transform duration-300 hover:scale-[1.02] ${emblemSizes[size]} ${
          inverted ? 'bg-[#181716] text-[#F4EFE6] border border-[#2B2927]' : 'bg-[#F4EFE6] text-[#141414] border border-[#E5DECF]'
        } ${className}`}
        style={{
          boxShadow: inverted ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(197, 168, 128, 0.12)'
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-2 py-1">
          {/* Main Brand Title */}
          <span
            className="font-bold tracking-tight leading-none"
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: size === 'sm' ? '0.62rem' : size === 'md' ? '0.85rem' : size === 'lg' ? '1.45rem' : size === 'xl' ? '2.1rem' : '3rem',
              letterSpacing: '-0.03em'
            }}
          >
            House of Aure
          </span>

          {/* Official Tagline */}
          <span
            className="font-medium tracking-normal mt-0.5 opacity-80"
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: size === 'sm' ? '0.34rem' : size === 'md' ? '0.45rem' : size === 'lg' ? '0.75rem' : size === 'xl' ? '1.05rem' : '1.4rem',
              letterSpacing: '0.01em'
            }}
          >
            Golden moments, Everyday
          </span>

          {/* Since 2024 at bottom */}
          {(size === 'lg' || size === 'xl' || size === 'hero') && (
            <span
              className="mt-2.5 uppercase tracking-widest opacity-60 text-center font-medium"
              style={{
                fontSize: size === 'lg' ? '0.48rem' : size === 'xl' ? '0.65rem' : '0.8rem',
                letterSpacing: '0.18em'
              }}
            >
              Since 2024
            </span>
          )}
        </div>
      </div>
    );
  }

  // Compact lockup: small emblem badge + wordmark
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-9 h-9 rounded-full bg-[#F4EFE6] border border-[#E5DECF] flex flex-col items-center justify-center text-[#141414] shadow-xs shrink-0">
          <span className="font-bold text-[0.68rem] tracking-tight leading-none">HA</span>
          <span className="text-[0.32rem] tracking-widest uppercase opacity-75 mt-0.5">Aure</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight text-[#141414] leading-none">
            House of Aure
          </span>
          <span className="text-[0.62rem] text-[#736E68] tracking-wider mt-0.5 font-normal">
            Golden moments, Everyday
          </span>
        </div>
      </div>
    );
  }

  // Footer or wide wordmark
  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`font-bold tracking-tight text-current leading-none ${wordmarkSizes[size]}`}
        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.025em' }}
      >
        House of Aure
      </span>
      <span
        className="text-xs sm:text-sm tracking-wide text-current opacity-70 mt-1 font-normal"
        style={{ letterSpacing: '0.04em' }}
      >
        Golden moments, Everyday
      </span>
    </div>
  );
};
