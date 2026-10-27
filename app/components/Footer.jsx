"use client";
import React from 'react';
import { Coffee, MapPin, Heart, BookOpen, ExternalLink, Mail } from 'lucide-react';

export default function Footer({ setCurrentView, onOpenGlossary }) {
  return (
    <footer className="bg-espresso text-cream border-t border-white/10 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-roast text-cream rounded-2xl flex items-center justify-center">
                <Coffee size={22} className="text-caramel" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-cream block">Kape Kanato</span>
                <span className="text-xs uppercase font-bold text-caramel tracking-wider">
                  ADDC3LL Initiative
                </span>
              </div>
            </div>

            <p className="text-sm text-oat/80 max-w-sm leading-relaxed">
              A comprehensive open-access coffee education and sensory learning platform developed for the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL).
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-oat/60">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-caramel shrink-0" />
                <span>Marilog, Davao City · Ateneo de Davao University & Mindanao Coffee Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-caramel shrink-0" />
                <a href="mailto:addc3ll@addu.edu.ph" className="hover:text-cream transition-colors">
                  addc3ll@addu.edu.ph
                </a>
              </div>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-caramel">
              Learning Guides
            </h5>
            <ul className="space-y-2 text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('fundamentals')} className="hover:text-cream transition-colors">
                  Coffee Fundamentals
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('farm')} className="hover:text-cream transition-colors">
                  Farm to Cup Journey
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-cream transition-colors">
                  Extraction Science
                </button>
              </li>
              <li>
                <button onClick={onOpenGlossary} className="hover:text-cream transition-colors">
                  Coffee Glossary A–Z
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-caramel">
              Interactive Tools
            </h5>
            <ul className="space-y-2 text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-cream transition-colors">
                  Brew Ratio Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-cream transition-colors">
                  Live Pour Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('brewing')} className="hover:text-cream transition-colors">
                  Drink Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('quiz')} className="hover:text-cream transition-colors">
                  Coffee IQ Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage & Lab */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-caramel">
              Philippine Coffee
            </h5>
            <ul className="space-y-2 text-sm text-oat/80">
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-cream transition-colors">
                  Mount Apo Specialty
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-cream transition-colors">
                  Bukidnon High-Altitude
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-cream transition-colors">
                  Sultan Kudarat Robusta
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('philippine')} className="hover:text-cream transition-colors">
                  Kapeng Barako Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-cream transition-colors">
                  ADDC3LL Facilities & Training
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Prototype Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-oat/60 gap-4 border-t border-white/5 mt-4">
          <p>© {new Date().getFullYear()} Kape Kanato · Educational Web Prototype for ADDC3LL.</p>
          <p className="text-center md:text-right max-w-xl text-[11px] text-oat/50">
            <strong>Disclaimer:</strong> This website is an academic proof-of-concept prototype for demonstration and educational purposes. It is not an official publication of Ateneo de Davao University.
          </p>
        </div>
      </div>
    </footer>
  );
}

