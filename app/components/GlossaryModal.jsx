"use client";
import React, { useState } from 'react';
import { X, Search, HelpCircle, BookOpen, Tag } from 'lucide-react';
import { COFFEE_GLOSSARY } from '../data/glossary';

export default function GlossaryModal({ initialSearch = '', onClose }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Sensory', 'Agronomy', 'Processing', 'Botany', 'Philippine Heritage', 'Roasting', 'Brewing'];

  const filteredGlossary = COFFEE_GLOSSARY.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-cream w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-oat/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-espresso text-cream flex items-center justify-center">
              <BookOpen size={20} className="text-caramel" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-espresso text-xl">
                Coffee Glossary A–Z
              </h4>
              <p className="text-xs text-muted">
                Essential vocabulary for coffee enthusiasts, farmers, and sensory cuppers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-oat/50 border-b border-border space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search coffee terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-border text-espresso placeholder:text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-roast"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-espresso text-cream'
                    : 'bg-cream text-muted hover:text-espresso border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-oat/70 border border-border hover:border-roast/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h5 className="font-serif font-bold text-lg text-espresso">
                    {item.term}
                  </h5>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cream text-roast border border-border shrink-0">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-muted text-sm">
              No coffee terms found matching your filter.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-oat/90 border-t border-border flex items-center justify-between text-xs text-muted px-6">
          <span>{filteredGlossary.length} terms cataloged</span>
          <span>Curated by ADDC3LL</span>
        </div>

      </div>
    </div>
  );
}

