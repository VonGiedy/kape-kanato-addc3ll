// app/components/Navbar.jsx
"use client";
import React, { useState } from 'react';
import { Search, Bookmark, HelpCircle, Menu, X } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  onOpenSearch, 
  onOpenGlossary, 
  bookmarkCount, 
  onOpenBookmarks 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'farm', label: 'Farm to Cup' },
    { id: 'brewing', label: 'Brewing' },
    { id: 'philippine', label: 'Origins' },
    { id: 'community', label: 'Achievements' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' },
  ];

  const handleNav = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Floating Brand Pill */}
        <button 
          onClick={() => handleNav('home')}
          className="pointer-events-auto flex items-center gap-2.5 bg-[#1B110A]/75 hover:bg-[#1B110A]/90 backdrop-blur-xl border border-white/15 hover:border-caramel/45 rounded-full pl-1.5 pr-4 py-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.38)] transition-all group shrink-0 select-none"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center shadow-sm">
            <img 
              src="/addc3ll-logo.jpg" 
              alt="ADDC3LL Official Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xs sm:text-sm font-black uppercase tracking-[-0.02em] text-white leading-none">
              Kape Kanato
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.14em] font-mono font-bold bg-white/12 text-caramel px-2 py-0.5 rounded-full border border-white/10">
              ADDC3LL
            </span>
          </div>
        </button>

        {/* Center Floating Navigation Pill Dock (Desktop) */}
        <nav className="hidden lg:flex pointer-events-auto items-center gap-1 bg-[#1B110A]/75 backdrop-blur-xl border border-white/15 rounded-full p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wide transition-all ${
                  isActive
                    ? 'bg-white text-espresso font-bold shadow-sm'
                    : 'text-white/75 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Floating Action Pills */}
        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
          {/* Search Pill */}
          <button
            onClick={onOpenSearch}
            className="h-10 sm:h-11 px-3.5 rounded-full bg-[#1B110A]/75 hover:bg-[#1B110A]/90 backdrop-blur-xl border border-white/15 hover:border-caramel/45 text-white/85 hover:text-white shadow-[0_12px_36px_rgba(0,0,0,0.38)] flex items-center gap-2 text-xs font-semibold transition-all"
            title="Search archive & curriculum (⌘K)"
            aria-label="Search"
          >
            <Search size={14} strokeWidth={2.2} className="text-caramel" />
            <span className="hidden xl:inline text-[11px]">Search</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full border border-white/10 text-white/80">
              ⌘K
            </kbd>
          </button>

          {/* Coffee Glossary Circle Pill */}
          <button
            onClick={onOpenGlossary}
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1B110A]/75 hover:bg-[#1B110A]/90 backdrop-blur-xl border border-white/15 hover:border-caramel/45 text-white/85 hover:text-white shadow-[0_12px_36px_rgba(0,0,0,0.38)] items-center justify-center transition-all"
            title="Coffee Glossary A–Z"
            aria-label="Glossary"
          >
            <HelpCircle size={17} strokeWidth={2} />
          </button>

          {/* Saved Bookmarks Circle Pill */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1B110A]/75 hover:bg-[#1B110A]/90 backdrop-blur-xl border border-white/15 hover:border-caramel/45 text-caramel shadow-[0_12px_36px_rgba(0,0,0,0.38)] flex items-center justify-center transition-all relative"
              title="View Bookmarked Articles"
              aria-label="Saved Bookmarks"
            >
              <Bookmark size={16} strokeWidth={2.2} className="fill-current" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white ring-2 ring-[#1B110A]" />
            </button>
          )}

          {/* Mobile Menu Pill */}
          <button 
            className="lg:hidden w-10 h-10 rounded-full bg-[#1B110A]/75 hover:bg-[#1B110A]/90 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.38)] transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} strokeWidth={2.2} /> : <Menu size={18} strokeWidth={2.2} />}
          </button>
        </div>

      </div>

      {/* Floating Mobile Drawer Card */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-3 mx-auto max-w-md bg-[#1B110A]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
                    isActive
                      ? 'bg-white text-espresso font-bold shadow-sm'
                      : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15 font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/75">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-1.5 hover:text-white font-semibold py-1"
            >
              <Search size={14} className="text-caramel" /> Search Studio
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGlossary();
              }}
              className="flex items-center gap-1.5 hover:text-white font-semibold py-1"
            >
              <HelpCircle size={14} className="text-caramel" /> A–Z Glossary
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
