"use client";
import React, { useState } from 'react';
import { Droplets, Play, Clock, Sliders, Coffee, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import BrewCalculator from '../BrewCalculator';
import DrinkVisualizer from '../DrinkVisualizer';
import { BREWING_METHODS } from '../../data/brewingMethods';

export default function BrewingView({ onStartTimer, onOpenArticle }) {
  const [selectedGuideId, setSelectedGuideId] = useState('v60');

  const selectedGuide = BREWING_METHODS.find(m => m.id === selectedGuideId) || BREWING_METHODS[0];

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-espresso text-cream py-14 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-roast text-caramel text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Module 3 · Extraction Science & Barista Lab
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Brewing Lab & Live Tools
          </h1>
          <p className="text-base sm:text-lg text-oat/90 leading-relaxed">
            Master the variables of coffee extraction: brew ratio, water temperature, grind size distribution, and pour dynamics with live digital tools.
          </p>
        </div>
      </div>

      {/* Interactive Brew Calculator & Live Timer Trigger */}
      <section>
        <BrewCalculator onStartTimer={onStartTimer} />
      </section>

      {/* Drink Visualizer Section */}
      <section>
        <DrinkVisualizer />
      </section>

      {/* Step-by-Step Equipment & Method Guides */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
        <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Clock size={14} /> Method Encyclopedia
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              Detailed Brewing Guides
            </h2>
            <p className="text-sm text-muted mt-1">
              Select a device to view recipe parameters, step-by-step pour choreography, and barista secrets.
            </p>
          </div>

          <button
            onClick={() => onStartTimer(selectedGuide, selectedGuide.defaultDose, selectedGuide.defaultRatio, selectedGuide.defaultWater)}
            className="bg-espresso hover:bg-roast text-cream px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <Play size={16} className="text-caramel fill-current" />
            <span>Launch Timer for {selectedGuide.name.split(' ')[0]}</span>
          </button>
        </div>

        {/* Method buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BREWING_METHODS.map((m) => {
            const isSelected = m.id === selectedGuideId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedGuideId(m.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-oat text-muted hover:text-espresso border border-border'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {/* Selected Guide Details */}
        <div className="mt-8 bg-oat p-6 sm:p-8 rounded-3xl border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div>
              <h3 className="text-2xl font-serif font-bold text-espresso">
                {selectedGuide.name}
              </h3>
              <p className="text-sm text-muted">{selectedGuide.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-cream px-3 py-1 rounded-full font-bold text-roast border border-border">
                Ratio 1:{selectedGuide.defaultRatio}
              </span>
              <span className="text-xs bg-cream px-3 py-1 rounded-full font-bold text-espresso border border-border">
                {selectedGuide.grindSize}
              </span>
            </div>
          </div>

          {/* Stepper instructions list */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              Step-by-Step Pour Choreography:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGuide.steps.map((st, i) => (
                <div key={i} className="bg-cream p-4 rounded-2xl border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-roast">Step {i + 1}: {st.title}</span>
                    <span className="text-[11px] font-mono text-muted bg-oat px-2 py-0.5 rounded">
                      {st.durationSec}s · Target: {st.targetWater}g
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {st.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Barista Pro Tips */}
          {selectedGuide.tips && (
            <div className="bg-cream p-5 rounded-2xl border border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-roast block mb-2">
                Barista Pro-Tips:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-muted list-disc list-inside">
                {selectedGuide.tips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Featured Extraction Science Article */}
      <section className="bg-espresso text-cream p-8 sm:p-10 rounded-3xl border border-border/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-caramel">
            Extraction Theory Article
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Dialing In the Golden Cup Standard
          </h3>
          <p className="text-sm text-oat/80 leading-relaxed">
            Understand how temperature, grind surface area, and dissolution kinetics determine whether your cup tastes bright and sweet or sour and dry.
          </p>
        </div>

        <button
          onClick={() => onOpenArticle('extraction-guide')}
          className="bg-caramel hover:bg-amber-500 text-espresso font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <span>Read Extraction Theory</span>
          <ArrowRight size={16} />
        </button>
      </section>

    </div>
  );
}

