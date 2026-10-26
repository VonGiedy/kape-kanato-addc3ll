"use client";
import React, { useState } from 'react';
import { PHILIPPINE_REGIONS } from '../data/regions';
import { Sparkles, MapPin, ArrowRight, Check } from 'lucide-react';

const FLAVOR_CATEGORIES = [
  {
    category: "Fruity",
    color: "bg-rose-100 text-rose-800 border-rose-300",
    notes: ["Strawberry", "Tropical Fruit", "Crisp Apple", "Jackfruit (Langka)", "Fig", "Sweet Orange"]
  },
  {
    category: "Floral & Herb",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    notes: ["Jasmine Floral", "Citrus Blossom", "Lemongrass", "Black Tea"]
  },
  {
    category: "Sweet & Sugar",
    color: "bg-amber-100 text-amber-900 border-amber-300",
    notes: ["Wild Honey", "Brown Sugar", "Caramel", "Molasses", "Panutsa", "Cane Sugar"]
  },
  {
    category: "Chocolate & Nutty",
    color: "bg-stone-200 text-stone-900 border-stone-400",
    notes: ["Dark Chocolate", "Roasted Hazelnut", "Toasted Cacao", "Cocoa Nibs", "Almond"]
  },
  {
    category: "Spiced & Earthy",
    color: "bg-orange-100 text-orange-900 border-orange-300",
    notes: ["Clove Spice", "Anise", "Cedar Wood", "Smoky Pine"]
  }
];

export default function FlavorWheelExplorer({ onSelectRegion }) {
  const [selectedNote, setSelectedNote] = useState("Strawberry");

  // Find all regions whose flavorNotes include or match the selectedNote
  const matchingRegions = PHILIPPINE_REGIONS.filter(region =>
    region.flavorNotes.some(n => n.toLowerCase().includes(selectedNote.toLowerCase()) || selectedNote.toLowerCase().includes(n.toLowerCase()))
  );

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
      <div className="pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Sensory Flavor Matcher
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
          Explore Philippine Flavors
        </h3>
        <p className="text-muted text-sm mt-1">
          Select a tasting note below to discover which Philippine mountain origins, cultivars, and processing methods yield that flavor.
        </p>
      </div>

      {/* Flavor categories and pills */}
      <div className="mt-6 space-y-4">
        {FLAVOR_CATEGORIES.map((cat) => (
          <div key={cat.category} className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              {cat.category} Notes
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.notes.map((note) => {
                const isSelected = selectedNote === note;
                return (
                  <button
                    key={note}
                    onClick={() => setSelectedNote(note)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-espresso text-cream border-espresso shadow-md scale-105'
                        : `${cat.color} hover:opacity-90`
                    }`}
                  >
                    {isSelected && <Check size={12} className="text-caramel" />}
                    {note}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Matching Philippine Origins Results */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Regions featuring "{selectedNote}":
          </span>
          <span className="text-xs font-bold text-roast">
            {matchingRegions.length} origin{matchingRegions.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {matchingRegions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingRegions.map((region) => (
              <div
                key={region.id}
                onClick={() => onSelectRegion(region)}
                className="bg-oat hover:bg-border/40 p-5 rounded-2xl border border-border cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-roast flex items-center gap-1">
                      <MapPin size={14} /> {region.islandGroup} · {region.province}
                    </span>
                    <span className="text-xs font-mono text-muted">{region.elevation}</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-espresso group-hover:text-roast transition-colors">
                    {region.name}
                  </h4>
                  <p className="text-xs text-muted mt-1.5 line-clamp-2">
                    {region.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {region.varietals.slice(0, 2).map((v, i) => (
                      <span key={i} className="text-[10px] bg-cream px-2 py-0.5 rounded-md font-semibold text-espresso border border-border">
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-roast flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-oat rounded-2xl text-muted text-sm">
            No exact matching Philippine origin recorded for this specific note yet. Try clicking another note!
          </div>
        )}
      </div>
    </div>
  );
}

