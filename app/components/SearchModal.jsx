"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, MapPin, Droplets, HelpCircle, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { PHILIPPINE_REGIONS } from '../data/regions';
import { BREWING_METHODS } from '../data/brewingMethods';
import { COFFEE_GLOSSARY } from '../data/glossary';

export default function SearchModal({ 
  onClose, 
  onSelectArticle, 
  onSelectRegion, 
  onSelectMethod,
  onOpenGlossary 
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const q = query.trim().toLowerCase();

  const matchedArticles = q 
    ? Object.values(ARTICLES).filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.category.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      ) 
    : [];

  const matchedRegions = q 
    ? PHILIPPINE_REGIONS.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.province.toLowerCase().includes(q) ||
        r.flavorNotes.some(f => f.toLowerCase().includes(q)) ||
        r.varietals.some(v => v.toLowerCase().includes(q))
      )
    : [];

  const matchedMethods = q 
    ? BREWING_METHODS.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.tagline.toLowerCase().includes(q)
      )
    : [];

  const matchedGlossary = q 
    ? COFFEE_GLOSSARY.filter(g => 
        g.term.toLowerCase().includes(q) || 
        g.definition.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const totalResults = matchedArticles.length + matchedRegions.length + matchedMethods.length + matchedGlossary.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-espresso/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-cream w-full max-w-2xl rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3 bg-oat/90">
          <Search size={22} className="text-roast shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, Mindanao origins, brewing methods, terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-espresso placeholder:text-muted/60 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs bg-border/60 hover:bg-border px-2 py-1 rounded-md text-muted"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-border/60 text-muted hover:text-espresso transition-colors ml-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-sm font-semibold text-muted">
                Try searching for:
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Mount Apo', 'Washed Process', 'V60 Pour Over', 'Kapeng Barako', 'Crema', 'First Crack', 'Bukidnon'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-oat hover:bg-border/60 text-espresso px-3 py-1.5 rounded-full border border-border transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-muted space-y-2">
              <p className="font-serif text-lg text-espresso">No matches found for "{query}"</p>
              <p className="text-xs">Try searching by keyword like "Arabica", "Ratio", "Sulu", or "Espresso".</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Articles section */}
              {matchedArticles.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">
                    Learning Articles ({matchedArticles.length})
                  </span>
                  <div className="space-y-2">
                    {matchedArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a.id);
                          onClose();
                        }}
                        className="p-3 bg-oat/70 hover:bg-border/60 rounded-2xl border border-border cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-espresso text-cream flex items-center justify-center shrink-0">
                            <BookOpen size={16} className="text-caramel" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-espresso group-hover:text-roast transition-colors">
                              {a.title}
                            </h5>
                            <span className="text-xs text-muted">{a.category} · {a.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-muted group-hover:text-espresso transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Philippine Regions section */}
              {matchedRegions.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">
                    Philippine Coffee Origins ({matchedRegions.length})
                  </span>
                  <div className="space-y-2">
                    {matchedRegions.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          onSelectRegion(r);
                          onClose();
                        }}
                        className="p-3 bg-oat/70 hover:bg-border/60 rounded-2xl border border-border cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-roast text-cream flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-caramel" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-espresso group-hover:text-roast transition-colors">
                              {r.name}
                            </h5>
                            <span className="text-xs text-muted">{r.province} · {r.elevation}</span>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-muted group-hover:text-espresso transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Brewing Methods */}
              {matchedMethods.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">
                    Brewing Guides & Equipment ({matchedMethods.length})
                  </span>
                  <div className="space-y-2">
                    {matchedMethods.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectMethod(m);
                          onClose();
                        }}
                        className="p-3 bg-oat/70 hover:bg-border/60 rounded-2xl border border-border cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-800 text-cream flex items-center justify-center shrink-0">
                            <Droplets size={16} className="text-cream" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-espresso group-hover:text-roast transition-colors">
                              {m.name}
                            </h5>
                            <span className="text-xs text-muted">{m.tagline}</span>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-muted group-hover:text-espresso transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {matchedGlossary.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">
                    Glossary Terms ({matchedGlossary.length})
                  </span>
                  <div className="space-y-2">
                    {matchedGlossary.map((g, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onClose();
                          onOpenGlossary(g.term);
                        }}
                        className="p-3 bg-cream hover:bg-oat rounded-2xl border border-border cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-oat text-roast flex items-center justify-center shrink-0">
                            <HelpCircle size={15} />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-espresso group-hover:text-roast transition-colors">
                              {g.term} <span className="text-[10px] text-muted font-normal uppercase">({g.category})</span>
                            </h5>
                            <p className="text-xs text-muted line-clamp-1">{g.definition}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-oat/80 border-t border-border flex items-center justify-between text-[11px] text-muted px-5">
          <span>Search the comprehensive Kape Kanato coffee database</span>
          <kbd className="bg-cream px-2 py-0.5 rounded border border-border">ESC to close</kbd>
        </div>

      </div>
    </div>
  );
}

