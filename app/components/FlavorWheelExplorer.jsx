"use client";
import React, { useState } from 'react';
import { PHILIPPINE_REGIONS } from '../data/regions';
import { Sparkles, MapPin, ArrowRight, X } from 'lucide-react';

const QUICK_NOTES = [
  "Strawberry", "Wild Honey", "Jasmine Floral", "Dark Chocolate", 
  "Jackfruit (Langka)", "Crisp Apple", "Roasted Hazelnut", 
  "Sweet Orange", "Lemongrass", "Clove Spice", "Caramel"
];

export default function FlavorWheelExplorer({ onSelectRegion }) {
  const [selectedNote, setSelectedNote] = useState("Strawberry");

  const matchingRegions = selectedNote
    ? PHILIPPINE_REGIONS.filter(region =>
        region.flavorNotes.some(n => 
          n.toLowerCase().includes(selectedNote.toLowerCase()) || 
          selectedNote.toLowerCase().includes(n.toLowerCase())
        )
      )
    : [];

  return (
    <div className="bg-cream rounded-2xl border border-border p-4 sm:p-5 shadow-sm space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-caramel" />
          <span className="text-xs font-bold uppercase tracking-wider text-espresso">
            Flavor Matcher
          </span>
          <span className="text-[11px] text-muted hidden sm:inline">
            — Select a note to quickly find matching origins
          </span>
        </div>

        {selectedNote && (
          <button
            onClick={() => setSelectedNote(null)}
            className="text-[11px] font-semibold text-muted hover:text-espresso flex items-center gap-1 transition-colors"
          >
            Clear <X size={12} />
          </button>
        )}
      </div>

      {/* Compact Flavor Pills in a tight wrap */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_NOTES.map((note) => {
          const isSelected = selectedNote === note;
          return (
            <button
              key={note}
              onClick={() => setSelectedNote(isSelected ? null : note)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-espresso text-cream shadow-sm'
                  : 'bg-oat text-muted hover:text-espresso hover:bg-border/60 border border-border/80'
              }`}
            >
              {note}
            </button>
          );
        })}
      </div>

      {/* Compact Matching Origins Inline Strip */}
      {selectedNote && (
        <div className="pt-2.5 border-t border-border/70 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted font-medium text-[11px]">
            Found in:
          </span>
          {matchingRegions.length > 0 ? (
            matchingRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => onSelectRegion(region)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-oat hover:bg-roast hover:text-cream text-espresso font-semibold border border-border transition-all group text-xs"
              >
                <MapPin size={12} className="text-roast group-hover:text-cream" />
                <span>{region.name}</span>
                <span className="text-[10px] text-muted group-hover:text-cream/80 font-normal">({region.islandGroup})</span>
                <ArrowRight size={12} className="text-muted group-hover:text-cream group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))
          ) : (
            <span className="text-muted italic text-[11px]">No matching origin cataloged for this note.</span>
          )}
        </div>
      )}
    </div>
  );
}
