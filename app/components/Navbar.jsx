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
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'farm', label: 'Farm to Cup' },
    { id: 'brewing', label: 'Brewing' },
    { id: 'philippine', label: 'Origins' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' },
  ];

  const handleNav = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-border/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Wordmark (Clean & Editorial) */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-baseline gap-2.5 cursor-pointer group shrink-0 select-none py-2"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-espresso group-hover:text-roast transition-colors">
            Kape Kanato
          </span>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-muted/70 group-hover:text-roast transition-colors">
            ADDC3LL
          </span>
        </div>

        {/* Desktop Navigation Links (Minimalist Typography, No Cluttering Icons) */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm tracking-wide transition-all relative py-1 ${
                  isActive
                    ? 'text-espresso font-semibold'
                    : 'text-muted hover:text-espresso font-normal'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-roast rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Minimalist Icons with Generous Breathing Room */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-muted hover:text-espresso transition-colors rounded-lg hover:bg-oat/70"
            title="Search guide (⌘K)"
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          {/* Coffee Glossary */}
          <button
            onClick={onOpenGlossary}
            className="p-2 text-muted hover:text-espresso transition-colors rounded-lg hover:bg-oat/70 hidden sm:flex items-center"
            title="Coffee Glossary A–Z"
            aria-label="Glossary"
          >
            <HelpCircle size={18} strokeWidth={1.75} />
          </button>

          {/* Saved Bookmarks */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="p-2 text-roast hover:text-espresso transition-colors rounded-lg hover:bg-oat/70 relative"
              title="View Bookmarked Articles"
              aria-label="Saved Bookmarks"
            >
              <Bookmark size={18} strokeWidth={2} className="fill-current text-roast" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-caramel ring-2 ring-cream" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-espresso hover:text-roast transition-colors rounded-lg hover:bg-oat ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Clean & Minimalist) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-cream/98 backdrop-blur-xl border-b border-border shadow-lg px-6 py-6 animate-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleNav('home')}
              className={`text-left text-base tracking-wide transition-colors ${
                currentView === 'home' ? 'text-espresso font-semibold' : 'text-muted'
              }`}
            >
              Overview
            </button>

            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left text-base tracking-wide transition-colors ${
                    isActive ? 'text-espresso font-semibold' : 'text-muted'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-1.5 hover:text-espresso font-medium py-1"
              >
                <Search size={14} /> Search guide
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGlossary();
                }}
                className="flex items-center gap-1.5 hover:text-espresso font-medium py-1"
              >
                <HelpCircle size={14} /> A–Z Glossary
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
