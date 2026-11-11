// app/components/interactive/RoastProfileGuide.jsx
"use client";
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const ROAST_STAGES = [
  {
    id: "drying",
    name: "Drying Phase",
    tempRange: "100°C – 150°C",
    beanColor: "#8E9775",
    agtron: "Green → Pale Olive",
    aroma: "Fresh grass, raw peas, damp hay",
    chemistry:
      "Dense green seeds containing ~11% moisture absorb drum heat and evaporate free water before browning begins.",
    notes: "Not yet drinkable (underdeveloped). Essential foundation for uniform heat transfer.",
    bestFor: "Pre-development stage only"
  },
  {
    id: "maillard",
    name: "Yellowing & Maillard",
    tempRange: "155°C – 192°C",
    beanColor: "#C5A168",
    agtron: "Yellow → Cinnamon Tan",
    aroma: "Toasted bread, basmati rice, warm cereal",
    chemistry:
      "Amino acids react with simple sugars (non-enzymatic browning), generating hundreds of flavor compounds and expanding bean volume.",
    notes: "Too early if stopped here: thin, sour, and peanut-like cup.",
    bestFor: "Pre-First Crack transition"
  },
  {
    id: "light",
    name: "Light Roast (First Crack)",
    tempRange: "196°C – 204°C",
    beanColor: "#7F5130",
    agtron: "Agtron 75 – 85 · City Roast",
    aroma: "Bright citrus blossom, red berry, honey",
    chemistry:
      "Built-up steam and CO₂ fracture cellular walls with an audible 'First Crack'. Dropped shortly after crack finishes to preserve natural acids.",
    notes: "Vibrant origin terroir, tea-like clarity, juicy citrus acidity, and floral sweetness.",
    bestFor: "Hario V60 & AeroPress (Mt. Apo & Bukidnon Arabica)"
  },
  {
    id: "medium",
    name: "Medium Roast (City+ / Full City)",
    tempRange: "205°C – 216°C",
    beanColor: "#53311B",
    agtron: "Agtron 55 – 65 · Balanced Standard",
    aroma: "Caramel, roasted nuts, milk chocolate",
    chemistry:
      "Sugars caramelize deeper inside the seed, rounding out sharp organic acids into balanced chocolate and fruit sweetness.",
    notes: "Rounded body, ripe berry-chocolate harmony, clean sweet finish.",
    bestFor: "V60, Flat White, AeroPress & Everyday Cupping"
  },
  {
    id: "dark",
    name: "Dark Roast (Second Crack)",
    tempRange: "222°C – 232°C",
    beanColor: "#29160B",
    agtron: "Agtron 30 – 45 · Vienna / Barako",
    aroma: "Dark cacao, wood smoke, toasted spice",
    chemistry:
      "At Second Crack (~225°C), brittle cell structures rupture and natural coffee oils migrate onto the glossy dark bean surface.",
    notes: "Bold bitterness, low acidity, heavy syrupy body and dark chocolate punch.",
    bestFor: "Espresso Blends, Moka Pot & Kapeng Barako (Kaldero)"
  }
];

export default function RoastProfileGuide({ onOpenArticle }) {
  const [stageIndex, setStageIndex] = useState(3); // Default to Medium Roast
  const stage = ROAST_STAGES[stageIndex] || ROAST_STAGES[3];

  return (
    <div className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-umber block mb-1.5">
            Roast Development Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
            Roast Stages & Flavor Curve
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            Step through each thermal milestone to see how bean color, natural sugars, acidity, and ideal brewing methods evolve with heat.
          </p>
        </div>

        {onOpenArticle && (
          <button
            onClick={() => onOpenArticle("roasting-science")}
            className="inline-flex items-center gap-2 text-xs font-bold text-espresso bg-oat hover:bg-border/50 px-4 py-2.5 rounded-full border border-border transition-colors shrink-0 self-start md:self-auto"
          >
            <BookOpen size={14} className="text-umber" />
            <span>Read Roasting Science</span>
          </button>
        )}
      </div>

      {/* Interactive Stage Buttons + Slider */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ROAST_STAGES.map((item, idx) => {
            const isSelected = idx === stageIndex;
            return (
              <button
                key={item.id}
                onClick={() => setStageIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-espresso text-cream border-espresso shadow-sm font-bold"
                    : "bg-oat text-espresso border-border hover:bg-border/50 font-medium"
                }`}
              >
                <span
                  className="w-4 h-5 rounded-full shrink-0 border border-white/25 shadow-xs"
                  style={{ backgroundColor: item.beanColor }}
                />
                <div className="min-w-0">
                  <span className={`block text-[10px] font-mono ${isSelected ? "text-caramel" : "text-muted"}`}>
                    {item.tempRange.split("–")[0].trim()}
                  </span>
                  <span className="block text-xs truncate">{item.name.split("(")[0].trim()}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-1">
          <input
            type="range"
            min="0"
            max={ROAST_STAGES.length - 1}
            step="1"
            value={stageIndex}
            onChange={(e) => setStageIndex(Number(e.target.value))}
            className="w-full accent-umber cursor-pointer h-2 bg-border rounded-lg"
            aria-label="Select roast stage"
          />
        </div>
      </div>

      {/* Active Stage Summary Card */}
      <div className="bg-oat p-6 sm:p-8 rounded-3xl border border-border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Clean Bean Color Visual */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-cream rounded-2xl p-6 border border-border text-center space-y-3">
          <div
            className="w-20 h-28 rounded-full shadow-md border-2 border-black/15 flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: stage.beanColor }}
          >
            <div className="w-1 h-20 bg-black/30 rounded-full transform -rotate-6" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-umber block">
              {stage.tempRange}
            </span>
            <span className="text-[11px] text-muted">{stage.agtron}</span>
          </div>
        </div>

        {/* Clean Scientific Breakdown */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <h3 className="font-serif font-bold text-2xl text-espresso">
              {stage.name}
            </h3>
            <p className="text-xs sm:text-sm text-espresso/90 leading-relaxed mt-2">
              {stage.chemistry}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-cream p-3.5 rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">
                Primary Aromas
              </span>
              <span className="font-semibold text-espresso">{stage.aroma}</span>
            </div>
            <div className="bg-cream p-3.5 rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">
                Cup Character
              </span>
              <span className="font-semibold text-espresso">{stage.notes}</span>
            </div>
            <div className="bg-cream p-3.5 rounded-xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">
                Recommended Pairing
              </span>
              <span className="font-semibold text-umber">{stage.bestFor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

