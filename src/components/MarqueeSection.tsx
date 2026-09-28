import React from 'react';

export const MarqueeSection: React.FC = () => {
  const statements = [
    'HOUSE OF AURE',
    'GOLDEN MOMENTS, EVERYDAY',
    'TIMELESS REFINEMENT',
    'DESIGNED FOR YOU',
    'AUTUMN / WINTER 2026',
    'ORGANIC FLAX & SILK'
  ];

  return (
    <div className="w-full bg-[#181716] text-[#FAF9F5] py-4.5 overflow-hidden border-y border-[#292725] select-none">
      <div className="flex items-center whitespace-nowrap overflow-hidden">
        {/* Repeating tracks for smooth infinite scroll */}
        <div className="flex shrink-0 items-center justify-around gap-10 min-w-full animate-[marquee_35s_linear_infinite]">
          {statements.map((text, i) => (
            <div key={`track1-${i}`} className="flex items-center gap-10">
              <span className="font-editorial text-lg sm:text-xl tracking-[0.2em] font-light text-[#E8DFD1]">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70" />
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-around gap-10 min-w-full animate-[marquee_35s_linear_infinite]" aria-hidden="true">
          {statements.map((text, i) => (
            <div key={`track2-${i}`} className="flex items-center gap-10">
              <span className="font-editorial text-lg sm:text-xl tracking-[0.2em] font-light text-[#E8DFD1]">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
