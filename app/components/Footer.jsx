// app/components/Footer.jsx
"use client";
import React from 'react';
import { MapPin, Mail } from 'lucide-react';

export default function Footer({ setCurrentView, onOpenGlossary }) {
  return (
    <footer className="bg-black/25 backdrop-blur-md text-cream border-t border-white/10 mt-24 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Giant Editorial Wordmark Top Strip */}
        <div className="pb-12 mb-12 border-b border-white/15 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-caramel block mb-2">
              Ateneo de Davao University · Davao City
            </span>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl tracking-[-0.03em] text-white leading-none">
              KAPE KANATO
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-oat/80 max-w-md leading-relaxed">
            Open-access coffee education, Mindanao origin guides, and agricultural enterprise research curated for the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg p-1 shrink-0 border border-white/20">
                <img 
                  src="/addc3ll-logo.jpg" 
                  alt="ADDC3LL Official Logo" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <span className="font-display text-xl font-black uppercase tracking-tight text-white block">ADDC3LL Studio</span>
                <span className="text-[10px] uppercase font-bold text-caramel tracking-[0.16em]">
                  Collaborative Learning Laboratory
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs text-oat/75">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-caramel shrink-0" />
                <span>Marilog, Davao City · Mindanao Coffee Network</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-caramel shrink-0" />
                <a href="mailto:addc3ll@addu.edu.ph" className="hover:text-white transition-colors font-medium">
                  addc3ll@addu.edu.ph
                </a>
              </div>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">
              Learning Guides
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('fundamentals')} className="hover:text-white transition-colors">
                  Coffee Fundamentals
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('farm')} className="hover:text-white transition-colors">
                  Farm to Cup Journey
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-white transition-colors">
                  Extraction Science
                </button>
              </li>
              <li>
                <button onClick={onOpenGlossary} className="hover:text-white transition-colors">
                  Coffee Glossary A–Z
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">
              Interactive Guides
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('fundamentals')} className="hover:text-white transition-colors">
                  Coffee Cherry Anatomy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('farm')} className="hover:text-white transition-colors">
                  Roast Stage Guide
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-white transition-colors">
                  Brew Ratio Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('quiz')} className="hover:text-white transition-colors">
                  Coffee IQ Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage & Lab */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">
              Philippine Coffee
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-white transition-colors">
                  Mount Apo Specialty
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-white transition-colors">
                  Bukidnon High-Altitude
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-white transition-colors">
                  Sultan Kudarat Robusta
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
                  ADDC3LL Facilities & Lab
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('community')} className="hover:text-white transition-colors text-caramel font-semibold">
                  Laboratory Achievements
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Prototype Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-oat/60 gap-4 mt-2">
          <p className="font-mono text-[11px]">© {new Date().getFullYear()} KAPE KANATO · ADDC3LL EDUCATIONAL STUDIO</p>
          <p className="text-center md:text-right max-w-xl text-[11px] text-oat/55">
            <strong>Disclaimer:</strong> Academic proof-of-concept prototype for demonstration and educational purposes. Not an official publication of Ateneo de Davao University.
          </p>
        </div>
      </div>
    </footer>
  );
}
