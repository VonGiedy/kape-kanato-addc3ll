// app/components/interactive/PostHarvestProcessGuide.jsx
"use client";
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const PROCESSES = [
  {
    id: "washed",
    name: "Washed (Wet Process)",
    tag: "Clean & Crisp",
    duration: "18–24 hours fermentation + 10–14 days drying",
    moistureTarget: "10.5% – 11.5%",
    phRange: "4.2 – 4.5 pH",
    summary:
      "Skin and pulp are removed immediately using a depulper. Parchment seeds ferment briefly in spring water tanks until sticky mucilage breaks down, then are thoroughly washed and sun-dried.",
    flavorNotes: ["Crisp citrus acidity", "Floral jasmine", "Clean black tea finish"],
    philippineExamples: "Benguet (Atok), Bukidnon MILALITTRA Arabica"
  },
  {
    id: "honey",
    name: "Honey (Pulped Natural)",
    tag: "Balanced Sweetness",
    duration: "14–22 days shaded drying",
    moistureTarget: "11% – 12%",
    phRange: "4.3 – 4.6 pH",
    summary:
      "Cherry skin is removed, leaving the sweet golden mucilage intact on the parchment during raised-bed drying. Using far less water than washed processing, it preserves sugary stone-fruit notes.",
    flavorNotes: ["Raw wild honey", "Stone fruit sweetness", "Smooth balanced body"],
    philippineExamples: "Mount Apo Kapatagan & Cordillera micro-lots"
  },
  {
    id: "natural",
    name: "Natural (Dry Process)",
    tag: "Fruity & Full-Bodied",
    duration: "20–30 days whole-cherry drying",
    moistureTarget: "10.5% – 11.5%",
    phRange: "3.9 – 4.2 pH",
    summary:
      "Ripe whole cherries are hand-sorted and spread directly onto raised drying tables with frequent turning. Sugars in the intact fruit slowly infuse the seed over several weeks.",
    flavorNotes: ["Ripe berries & tropical fruit", "Cocoa nibs", "Heavy syrupy body"],
    philippineExamples: "Sultan Kudarat Fine Robusta, Lipa Kapeng Barako"
  },
  {
    id: "anaerobic",
    name: "Anaerobic Maceration",
    tag: "Experimental Specialty",
    duration: "36–72 hours in sealed tank + slow drying",
    moistureTarget: "10.5% – 11.5%",
    phRange: "3.8 – 4.1 pH",
    summary:
      "Ripe cherries or depulped seeds are placed in airtight stainless tanks with one-way valves so CO₂ displaces oxygen. ADDC3LL monitors time and pH closely to develop aromatic esters without off-notes.",
    flavorNotes: ["Strawberry & tropical aromatics", "Spice notes", "Bright winey complexity"],
    philippineExamples: "Mount Apo BACOFA Specialty Lots, ADDC3LL R&D Trials"
  }
];

export default function PostHarvestProcessGuide({ onOpenArticle }) {
  const [selectedId, setSelectedId] = useState("washed");
  const active = PROCESSES.find((p) => p.id === selectedId) || PROCESSES[0];

  return (
    <div className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-umber block mb-1.5">
            Post-Harvest Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
            Processing & Fermentation Methods
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            How fruit skin, mucilage, and fermentation time shape cup clarity, sweetness, and body before roasting.
          </p>
        </div>

        {onOpenArticle && (
          <button
            onClick={() => onOpenArticle("harvesting-processing")}
            className="inline-flex items-center gap-2 text-xs font-bold text-espresso bg-oat hover:bg-border/50 px-4 py-2.5 rounded-full border border-border transition-colors shrink-0 self-start md:self-auto"
          >
            <BookOpen size={14} className="text-umber" />
            <span>Read Full Guide</span>
          </button>
        )}
      </div>

      {/* Method Selector Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PROCESSES.map((proc) => {
          const isSelected = proc.id === selectedId;
          return (
            <button
              key={proc.id}
              onClick={() => setSelectedId(proc.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-espresso text-cream border-espresso shadow-sm"
                  : "bg-oat text-espresso border-border hover:bg-border/50"
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                  isSelected ? "text-caramel" : "text-umber"
                }`}
              >
                {proc.tag}
              </span>
              <span className="font-bold text-xs sm:text-sm line-clamp-1">
                {proc.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Details Card */}
      <div className="bg-oat p-6 sm:p-8 rounded-3xl border border-border grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-serif font-bold text-2xl text-espresso">
            {active.name}
          </h3>
          <p className="text-sm text-espresso/90 leading-relaxed">
            {active.summary}
          </p>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-2">
              Typical Cup Profile
            </span>
            <div className="flex flex-wrap gap-2">
              {active.flavorNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-cream text-espresso text-xs font-semibold px-3 py-1 rounded-full border border-border"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-cream p-5 rounded-2xl border border-border space-y-3 text-xs">
          <div className="p-3 bg-oat rounded-xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block">Timeline</span>
            <span className="font-bold text-espresso">{active.duration}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-oat rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block">Target Moisture</span>
              <span className="font-mono font-bold text-umber">{active.moistureTarget}</span>
            </div>
            <div className="p-3 bg-oat rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block">Target pH Range</span>
              <span className="font-mono font-bold text-umber">{active.phRange}</span>
            </div>
          </div>
          <div className="p-3 bg-oat rounded-xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block">Notable Philippine Coffees</span>
            <span className="font-semibold text-espresso">{active.philippineExamples}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

