// app/components/StudioBanner.jsx
"use client";
import React from 'react';
import StudioBeans from './StudioBeans';

export default function StudioBanner({
  topLeft = "Kape Kanato · ADDC3LL",
  topRight = "Ateneo de Davao University",
  flankLeft = "Coffee",
  flankRight = "Research",
  title,
  description,
  showCup = true,
  children
}) {
  return (
    <section
      className="studio-glass-card text-white rounded-[2.25rem] overflow-hidden shadow-[0_24px_60px_rgba(12,6,2,0.35)] relative px-6 sm:px-12 pt-7 pb-10 sm:pb-12 select-none"
    >
      {/* Flat-lay Studio Roasted Beans */}
      <StudioBeans compact />

      {/* Top Overhead Ceramic Crema Cup Accent */}
      {showCup && (
        <div
          className="pointer-events-none absolute -top-28 sm:-top-32 left-1/2 -translate-x-1/2 w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(12,6,2,0.75)] ring-4 ring-white/85 z-10 opacity-95"
        >
          <img
            src="/hero-cup-topdown.jpg"
            alt="Top-down espresso cup crema"
            className="w-full h-full object-cover scale-[1.82]"
          />
        </div>
      )}

      {/* Top Flanking Architectural Line */}
      <div className="relative z-20 flex items-center justify-between text-[11px] sm:text-xs font-medium tracking-wide text-white/75 pb-6">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel" />
          <span>{topLeft}</span>
        </span>
        <span className="font-mono text-[10px] sm:text-xs tracking-wider text-white/70">
          {topRight}
        </span>
      </div>

      {/* Main Centered Editorial Stage */}
      <div className={`relative z-20 text-center max-w-5xl mx-auto ${showCup ? 'pt-20 sm:pt-24' : 'pt-4'}`}>
        
        {/* Flanking Editorial Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-4 mb-5">
          <div className="hidden md:block md:col-span-3 text-right pr-4">
            <span className="font-display font-bold text-xl lg:text-2xl tracking-tight text-white/95">
              {flankLeft}
            </span>
          </div>

          <div className="md:col-span-6 px-2">
            <p className="text-xs sm:text-sm text-oat/85 leading-relaxed font-normal max-w-xl mx-auto">
              {description}
            </p>
          </div>

          <div className="hidden md:block md:col-span-3 text-left pl-4">
            <span className="font-display font-bold text-xl lg:text-2xl tracking-tight text-white/95">
              {flankRight}
            </span>
          </div>
        </div>

        {/* Display Title */}
        <h1 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-[4.25rem] tracking-[-0.03em] leading-[0.95] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
          {title}
        </h1>
      </div>

      {/* Optional Bottom Slot */}
      {children && (
        <div className="relative z-20 mt-8 pt-6 border-t border-white/10">
          {children}
        </div>
      )}
    </section>
  );
}
