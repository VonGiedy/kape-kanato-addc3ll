"use client";
import React, { useState } from 'react';
import { SPECIALTY_DRINKS } from '../data/brewingMethods';
import { Coffee, Droplets, Sparkles, Check, Info } from 'lucide-react';

export default function DrinkVisualizer() {
  const [selectedDrinkId, setSelectedDrinkId] = useState('flat-white');
  const drink = SPECIALTY_DRINKS.find(d => d.id === selectedDrinkId) || SPECIALTY_DRINKS[0];

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Coffee size={14} /> Barista Anatomy Lab
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Espresso & Milk Drink Visualizer
          </h3>
          <p className="text-muted text-sm mt-1">
            Compare recipes, liquid ratios, and caffeine content across classic cafe drinks.
          </p>
        </div>
      </div>

      {/* Drink Buttons Bar */}
      <div className="mt-6 flex flex-wrap gap-2">
        {SPECIALTY_DRINKS.map((d) => {
          const isSelected = d.id === selectedDrinkId;
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDrinkId(d.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-espresso text-cream shadow-md scale-105'
                  : 'bg-oat text-muted hover:text-espresso hover:bg-border/60'
              }`}
            >
              {isSelected && <Check size={14} className="text-caramel" />}
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Main Visualizer Area */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Animated Glass Cup (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-oat/50 rounded-3xl border border-border">
          <div className="relative w-44 h-64 border-4 border-espresso/70 rounded-b-3xl rounded-t-lg bg-cream/60 overflow-hidden flex flex-col-reverse shadow-inner p-1">
            {drink.layers.map((layer, idx) => (
              <div
                key={idx}
                style={{ height: `${layer.percent}%` }}
                className={`${layer.color} w-full transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-cream/90 shadow-sm border-t border-black/10`}
              >
                <span className="truncate px-1 drop-shadow-sm text-espresso/90">
                  {layer.name} ({layer.percent}%)
                </span>
              </div>
            ))}
          </div>
          <div className="w-48 h-3 bg-border rounded-full mt-3 shadow-sm" />
          <span className="text-[11px] font-mono font-bold text-muted mt-2 uppercase tracking-wider">
            Glass Cross-Section
          </span>
        </div>

        {/* Recipe & Ratios Description (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-serif font-bold text-espresso">
                {drink.name}
              </h4>
              <span className="text-xs bg-roast text-cream font-bold px-2.5 py-0.5 rounded-full">
                {drink.volumeOz}
              </span>
            </div>
            <p className="text-muted text-base mt-2 leading-relaxed">
              {drink.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-oat p-4 rounded-2xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block">Est. Caffeine</span>
              <span className="font-serif font-bold text-espresso text-xl">{drink.caffeineMg}</span>
            </div>
            <div className="bg-oat p-4 rounded-2xl border border-border">
              <span className="text-[10px] uppercase font-bold text-muted block">Serving Volume</span>
              <span className="font-serif font-bold text-espresso text-xl">{drink.volumeOz}</span>
            </div>
          </div>

          {/* Layer Breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted block">
              Layer Composition & Ingredients:
            </span>
            <div className="space-y-2">
              {drink.layers.map((layer, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm p-2 rounded-xl bg-oat/70 border border-border">
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full ${layer.color} border border-black/20`} />
                    <span className="font-semibold text-espresso">{layer.name}</span>
                  </div>
                  <span className="font-mono text-muted text-xs font-bold">{layer.percent}% of cup</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

