"use client";
import React, { useState } from 'react';
import { Droplets, Play, Clock, Sliders, Coffee, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import BrewCalculator from '../BrewCalculator';
import DrinkVisualizer from '../DrinkVisualizer';
import StudioBanner from '../StudioBanner';
import { BREWING_METHODS } from '../../data/brewingMethods';

export default function BrewingView({ onStartTimer, onOpenArticle }) {
  const [selectedGuideId, setSelectedGuideId] = useState('v60');

  const selectedGuide = BREWING_METHODS.find(m => m.id === selectedGuideId) || BREWING_METHODS[0];

  return (
    <div className="space-y-16 animate-fade-up max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Studio Editorial Header */}
      <StudioBanner
        topLeft="Module 03 · Extraction Lab"
        topRight="ADDC3LL · Davao City"
        flankLeft="Precision"
        flankRight="Extraction"
        title="BREWING STUDIO"
        description="Master your daily pour with our coffee-to-water ratio calculator, step-by-step brew timer with gentle chimes, and classic cafe drink guide."
      />

      {/* Interactive Brew Calculator & Live Timer Trigger */}
      <section>
        <BrewCalculator onStartTimer={onStartTimer} />
      </section>

      {/* Drink Visualizer Section */}
      <section>
        <DrinkVisualizer />
      </section>

      {/* Step-by-Step Equipment & Method Guides */}
      <section className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10">
        <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-oat text-umber px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] mb-2 border border-border">
              <Clock size={13} className="text-caramel" /> Method Encyclopedia
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
              Detailed Brewing Guides
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Select a device to inspect recipe parameters, pour choreography, and calibrated extraction tips.
            </p>
          </div>

          <button
            onClick={() => onStartTimer(selectedGuide, selectedGuide.defaultDose, selectedGuide.defaultRatio, selectedGuide.defaultWater)}
            className="bg-umber hover:bg-espresso text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
          >
            <Play size={15} className="text-caramel fill-current" />
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

