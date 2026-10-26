"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './components/views/HomeView';
import FundamentalsView from './components/views/FundamentalsView';
import FarmToCupView from './components/views/FarmToCupView';
import BrewingView from './components/views/BrewingView';
import PhilippineCoffeeView from './components/views/PhilippineCoffeeView';
import QuizView from './components/views/QuizView';
import AboutAddc3llView from './components/views/AboutAddc3llView';

// Modals
import ArticleModal from './components/ArticleModal';
import BrewTimerModal from './components/BrewTimerModal';
import SearchModal from './components/SearchModal';
import GlossaryModal from './components/GlossaryModal';

import { BREWING_METHODS } from './data/brewingMethods';
import { ARTICLES } from './data/articles';

export default function KapeKanatoApp() {
  const [currentView, setCurrentView] = useState('home');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryInitialSearch, setGlossaryInitialSearch] = useState('');
  
  // Brew Timer Modal State
  const [activeTimerConfig, setActiveTimerConfig] = useState(null);

  // Bookmarks State (persisted in localStorage)
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kape_kanato_bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id) => {
    let nextBookmarks;
    if (bookmarks.includes(id)) {
      nextBookmarks = bookmarks.filter(b => b !== id);
    } else {
      nextBookmarks = [...bookmarks, id];
    }
    setBookmarks(nextBookmarks);
    try {
      localStorage.setItem('kape_kanato_bookmarks', JSON.stringify(nextBookmarks));
    } catch (e) {
      // ignore
    }
  };

  // Keyboard shortcut for Cmd+K Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Lock body scroll when modal is open
  const isAnyModalOpen = Boolean(
    activeArticleId || activeTimerConfig || searchOpen || glossaryOpen || showBookmarksDrawer
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAnyModalOpen]);

  // Handlers
  const handleOpenArticle = (id) => {
    setActiveArticleId(id);
  };

  const handleStartTimer = (method, dose, ratio, water) => {
    setActiveTimerConfig({
      method: method || BREWING_METHODS[0],
      dose: dose || method?.defaultDose || 15,
      ratio: ratio || method?.defaultRatio || 16,
      water: water || Math.round((dose || 15) * (ratio || 16))
    });
  };

  const handleStartTimerForRegion = (region) => {
    // Pick V60 as default or matching method
    const v60Method = BREWING_METHODS.find(m => m.id === 'v60') || BREWING_METHODS[0];
    handleStartTimer(v60Method, 15, 16, 240);
  };

  const handleOpenGlossaryWithTerm = (term = '') => {
    setGlossaryInitialSearch(term);
    setGlossaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-oat text-espresso font-sans flex flex-col selection:bg-roast selection:text-cream">
      
      {/* Sticky Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGlossary={() => handleOpenGlossaryWithTerm('')}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-16 pt-4 sm:pt-6">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            onOpenArticle={handleOpenArticle}
            onSelectRegion={() => setCurrentView('philippine')}
            onOpenTimerDirectly={() => handleStartTimer(BREWING_METHODS[0], 15, 16, 240)}
            onOpenGlossary={() => handleOpenGlossaryWithTerm('')}
          />
        )}

        {currentView === 'fundamentals' && (
          <FundamentalsView
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentView === 'farm' && (
          <FarmToCupView
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentView === 'brewing' && (
          <BrewingView
            onStartTimer={handleStartTimer}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentView === 'philippine' && (
          <PhilippineCoffeeView
            onStartTimerForRegion={handleStartTimerForRegion}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            onExploreOrigins={() => setCurrentView('philippine')}
            onExploreFundamentals={() => setCurrentView('fundamentals')}
          />
        )}

        {currentView === 'about' && (
          <AboutAddc3llView />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenGlossary={() => handleOpenGlossaryWithTerm('')}
      />

      {/* Article Reader Modal */}
      {activeArticleId && (
        <ArticleModal
          articleId={activeArticleId}
          onClose={() => setActiveArticleId(null)}
          isBookmarked={bookmarks.includes(activeArticleId)}
          onToggleBookmark={toggleBookmark}
          onNavigateArticle={(nextId) => setActiveArticleId(nextId)}
        />
      )}

      {/* Live Brew Timer Assistant Modal */}
      {activeTimerConfig && (
        <BrewTimerModal
          method={activeTimerConfig.method}
          dose={activeTimerConfig.dose}
          ratio={activeTimerConfig.ratio}
          water={activeTimerConfig.water}
          onClose={() => setActiveTimerConfig(null)}
        />
      )}

      {/* Global Cmd+K Search Modal */}
      {searchOpen && (
        <SearchModal
          onClose={() => setSearchOpen(false)}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
          }}
          onSelectRegion={(r) => {
            setCurrentView('philippine');
          }}
          onSelectMethod={(m) => {
            setCurrentView('brewing');
          }}
          onOpenGlossary={(term) => {
            handleOpenGlossaryWithTerm(term);
          }}
        />
      )}

      {/* A-Z Coffee Glossary Modal */}
      {glossaryOpen && (
        <GlossaryModal
          initialSearch={glossaryInitialSearch}
          onClose={() => setGlossaryOpen(false)}
        />
      )}

      {/* Bookmarks Drawer Modal */}
      {showBookmarksDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-espresso/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream w-full max-w-md h-full shadow-2xl border-l border-border flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-serif font-bold text-xl text-espresso">
                  Saved Articles ({bookmarks.length})
                </h3>
                <p className="text-xs text-muted">Your bookmarked reading list</p>
              </div>
              <button
                onClick={() => setShowBookmarksDrawer(false)}
                className="p-2 rounded-xl bg-oat hover:bg-border/60 text-muted hover:text-espresso"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {bookmarks.length > 0 ? (
                bookmarks.map((bId) => {
                  const article = ARTICLES[bId];
                  if (!article) return null;
                  return (
                    <div
                      key={bId}
                      className="p-4 rounded-2xl bg-oat border border-border flex items-center justify-between hover:border-roast/50 transition-colors"
                    >
                      <div 
                        onClick={() => {
                          setShowBookmarksDrawer(false);
                          setActiveArticleId(bId);
                        }}
                        className="cursor-pointer flex-1"
                      >
                        <span className="text-[10px] uppercase font-bold text-roast">{article.category}</span>
                        <h4 className="font-bold text-sm text-espresso line-clamp-1">{article.title}</h4>
                      </div>
                      <button
                        onClick={() => toggleBookmark(bId)}
                        className="text-xs text-muted hover:text-rose-600 p-1"
                        title="Remove bookmark"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-muted text-sm">
                  You have not bookmarked any articles yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
