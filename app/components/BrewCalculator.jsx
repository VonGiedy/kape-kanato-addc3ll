"use client";
import React, { useState } from 'react';
import { BREWING_METHODS } from '../data/brewingMethods';
import { Play, Sparkles, Scale, Droplets, Clock, Flame, Sliders, Info, Check } from 'lucide-react';

export default function BrewCalculator({ onStartTimer }) {
  const [selectedMethodId, setSelectedMethodId] = useState('v60');
  const selectedMethod = BREWING_METHODS.find(m => m.id === selectedMethodId) || BREWING_METHODS[0];

  const [dose, setDose] = useState(selectedMethod.defaultDose);
  const [ratio, setRatio] = useState(selectedMethod.defaultRatio);

  // When changing method, reset to its defaults
  const handleMethodChange = (methodId) => {
    const nextMethod = BREWING_METHODS.find(m => m.id === methodId);
    setSelectedMethodId(methodId);
    if (nextMethod) {
      setDose(nextMethod.defaultDose);
      setRatio(nextMethod.defaultRatio);
    }
  };

  const totalWater = Math.round(dose * ratio);
  const bloomWater = Math.round(dose * 2.5);
  const estimatedYield = Math.round(totalWater - dose * 2); // grounds absorb ~2x their weight

  const handleQuickPreset = (presetDose, presetRatio) => {
    setDose(presetDose);
    if (presetRatio) setRatio(presetRatio);
  };

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders size={14} /> Interactive Brewing Lab
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Brew Ratio & Water Calculator
          </h3>
          <p className="text-muted text-sm mt-1">
            Dial in exact bean weight, water volume, and extraction timing for your favorite method.
          </p>
        </div>

        {/* Start Timer CTA */}
        <button
          onClick={() => onStartTimer(selectedMethod, dose, ratio, totalWater)}
          className="bg-espresso hover:bg-roast text-cream px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all"
        >
          <Play size={18} className="text-caramel fill-current" />
          <span>Start Live Brew Assistant</span>
        </button>
      </div>

      {/* Brew Method Selector */}
      <div className="mt-6">
        <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-3">
          Select Brewing Device / Method
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {BREWING_METHODS.map((method) => {
            const isSelected = method.id === selectedMethodId;
            return (
              <button
                key={method.id}
                onClick={() => handleMethodChange(method.id)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-espresso text-cream border-espresso shadow-md ring-2 ring-roast/50'
                    : 'bg-oat/70 hover:bg-oat text-espresso border-border hover:border-roast/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-caramel' : 'text-roast'}`}>
                    {method.id === 'kape-kaldero' ? 'PH Classic' : 'Method'}
                  </span>
                  {isSelected && <Check size={14} className="text-caramel" />}
                </div>
                <div className="font-bold text-sm leading-snug line-clamp-2">
                  {method.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Controls: Sliders & Outputs */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Dose Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Scale size={14} className="text-roast" /> Ground Coffee Dose
              </label>
              <span className="text-2xl font-serif font-black text-espresso">
                {dose} <span className="text-sm font-sans font-semibold text-muted">grams</span>
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="75"
              step="1"
              value={dose}
              onChange={(e) => setDose(Number(e.target.value))}
              className="w-full accent-roast cursor-pointer h-2 bg-border rounded-lg"
            />

            <div className="flex gap-2 mt-2">
              {[
                { label: 'Single Cup (15g)', dose: 15 },
                { label: '2 Cups (30g)', dose: 30 },
                { label: 'Family Pot (45g)', dose: 45 },
                { label: 'Big Batch (60g)', dose: 60 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setDose(preset.dose)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                    dose === preset.dose
                      ? 'bg-roast text-cream border-roast'
                      : 'bg-oat text-muted hover:text-espresso border-border'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brew Ratio Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Droplets size={14} className="text-roast" /> Coffee to Water Ratio
              </label>
              <span className="text-2xl font-serif font-black text-espresso">
                1 : {ratio}
              </span>
            </div>

            <input
              type="range"
              min={selectedMethod.minRatio || 10}
              max={selectedMethod.maxRatio || 19}
              step="0.5"
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full accent-roast cursor-pointer h-2 bg-border rounded-lg"
            />

            <div className="flex gap-2 mt-2">
              {[
                { label: 'Bold (1:14)', r: 14 },
                { label: 'Balanced (1:16)', r: 16 },
                { label: 'Light & Delicate (1:17)', r: 17 }
              ].map((rPreset) => (
                <button
                  key={rPreset.label}
                  onClick={() => setRatio(rPreset.r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                    ratio === rPreset.r
                      ? 'bg-roast text-cream border-roast'
                      : 'bg-oat text-muted hover:text-espresso border-border'
                  }`}
                >
                  {rPreset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Method Parameters Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-oat/70 rounded-2xl border border-border">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Grind Size</span>
              <span className="font-bold text-espresso text-xs sm:text-sm">{selectedMethod.grindSize}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Water Temp</span>
              <span className="font-bold text-espresso text-xs sm:text-sm">{selectedMethod.waterTemp}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Est. Total Time</span>
              <span className="font-bold text-espresso text-xs sm:text-sm">
                {Math.floor(selectedMethod.totalTimeSec / 60)}m {selectedMethod.totalTimeSec % 60 ? `${selectedMethod.totalTimeSec % 60}s` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Calculated Results Card (5 Cols) */}
        <div className="lg:col-span-5 bg-espresso text-cream p-6 rounded-3xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span className="text-xs uppercase font-bold tracking-wider text-caramel">
                Recipe Formulation
              </span>
              <span className="text-xs text-oat/70 font-mono">
                {selectedMethod.name}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-oat/80">Total Brew Water</span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-cream">
                  {totalWater} <span className="text-sm font-sans font-normal text-caramel">ml / g</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                <span className="text-oat/70">Recommended Bloom Water (0:45)</span>
                <span className="font-mono font-bold text-cream">~{bloomWater} g</span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                <span className="text-oat/70">Final Beverage In Cup</span>
                <span className="font-mono font-bold text-cream">~{estimatedYield} ml</span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                <span className="text-oat/70">Brew Strength Profile</span>
                <span className="font-bold text-caramel">
                  {ratio <= 13 ? 'Intense / Syrupy' : ratio <= 15.5 ? 'Rich & Full' : ratio <= 16.5 ? 'Golden Cup Balance' : 'Delicate & Floral'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => onStartTimer(selectedMethod, dose, ratio, totalWater)}
              className="w-full bg-caramel hover:bg-amber-500 text-espresso font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <Play size={18} className="fill-current" />
              <span>Launch Live Brew Timer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

