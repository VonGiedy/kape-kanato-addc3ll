"use client";
import React, { useState } from 'react';
import { 
  MapPin, Sparkles, Filter, ArrowRight, 
  Coffee, Droplets, Calendar, Award, ChevronRight, X 
} from 'lucide-react';
import { PHILIPPINE_REGIONS } from '../../data/regions';
import FlavorWheelExplorer from '../FlavorWheelExplorer';

export default function PhilippineCoffeeView({ onStartTimerForRegion }) {
  const [selectedIsland, setSelectedIsland] = useState('All');
  const [selectedVarietal, setSelectedVarietal] = useState('All');
  const [activeRegionModal, setActiveRegionModal] = useState(null);

  // Filtered regions
  const filteredRegions = PHILIPPINE_REGIONS.filter(region => {
    const matchesIsland = selectedIsland === 'All' || region.islandGroup === selectedIsland;
    const matchesVarietal = selectedVarietal === 'All' || 
      region.varietals.some(v => v.toLowerCase().includes(selectedVarietal.toLowerCase()));
    return matchesIsland && matchesVarietal;
  });

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-espresso text-cream py-14 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-roast text-caramel text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Module 4 · Philippine Heritage & Terroir
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Philippine Coffee Origins
          </h1>
          <p className="text-base sm:text-lg text-oat/90 leading-relaxed">
            From the misty volcanic peaks of Mount Apo to the lush valleys of Bukidnon and heritage groves of Lipa, explore the unique microclimates and indigenous farming communities shaping Philippine specialty coffee.
          </p>
        </div>
      </div>

      {/* Region Directory with Interactive Filters */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              Regional Coffee Directory
            </h2>
            <p className="text-sm text-muted mt-1">
              Filter by island archipelago or coffee species to discover local cooperatives and cup attributes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-cream p-1 rounded-xl border border-border">
              {['All', 'Mindanao', 'Luzon'].map(island => (
                <button
                  key={island}
                  onClick={() => setSelectedIsland(island)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedIsland === island
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'text-muted hover:text-espresso'
                  }`}
                >
                  {island}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-cream p-1 rounded-xl border border-border">
              {['All', 'Arabica', 'Robusta', 'Liberica'].map(variety => (
                <button
                  key={variety}
                  onClick={() => setSelectedVarietal(variety)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedVarietal === variety
                      ? 'bg-roast text-cream shadow-sm'
                      : 'text-muted hover:text-espresso'
                  }`}
                >
                  {variety}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegions.map((region) => (
            <div
              key={region.id}
              onClick={() => setActiveRegionModal(region)}
              className="group bg-cream rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={region.imgUrl}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-espresso/80 backdrop-blur-sm text-cream text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {region.islandGroup}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs font-semibold text-roast mb-1">
                    <MapPin size={13} />
                    <span>{region.province}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-xs text-muted font-mono mb-3">
                    Elevation: {region.elevation}
                  </p>
                  <p className="text-xs text-muted line-clamp-3 leading-relaxed mb-4">
                    {region.description}
                  </p>

                  {/* Flavor note badges */}
                  <div className="flex flex-wrap gap-1">
                    {region.flavorNotes.slice(0, 3).map((note, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-oat text-roast px-2 py-0.5 rounded-md border border-border">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
                  <span>View Origin Details</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flavor Matcher Integration */}
      <section>
        <FlavorWheelExplorer onSelectRegion={(r) => setActiveRegionModal(r)} />
      </section>

      {/* Region Detail Modal */}
      {activeRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-cream w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-oat/90 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-roast" />
                <h4 className="font-serif font-bold text-espresso text-xl">
                  {activeRegionModal.name}
                </h4>
              </div>
              <button
                onClick={() => setActiveRegionModal(null)}
                className="p-2 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              {activeRegionModal.imgUrl && (
                <div className="h-56 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 overflow-hidden relative">
                  <img 
                    src={activeRegionModal.imgUrl} 
                    alt={activeRegionModal.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/30" />
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-roast block mb-1">
                  {activeRegionModal.islandGroup} · {activeRegionModal.province}
                </span>
                <h2 className="text-3xl font-serif font-bold text-espresso">
                  {activeRegionModal.name}
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed mt-3">
                  {activeRegionModal.description}
                </p>
              </div>

              {/* Terroir Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-oat p-4 rounded-2xl border border-border text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Elevation</span>
                  <span className="font-bold text-espresso">{activeRegionModal.elevation}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Harvest Season</span>
                  <span className="font-bold text-espresso">{activeRegionModal.harvestSeason}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Primary Processes</span>
                  <span className="font-bold text-espresso">{activeRegionModal.processStyles.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">Key Species</span>
                  <span className="font-bold text-espresso">{activeRegionModal.varietals.join(', ')}</span>
                </div>
              </div>

              {/* Flavor Profile Badges */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
                  Signature Cupping Notes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRegionModal.flavorNotes.map((note, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-full text-xs font-bold bg-roast text-cream shadow-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cooperatives & Community Spotlight */}
              <div className="bg-oat p-5 rounded-2xl border border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-roast block mb-2">
                  Local Cooperatives & Partner Farmers:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted list-disc list-inside">
                  {activeRegionModal.cooperatives.map((coop, i) => (
                    <li key={i} className="font-medium text-espresso">{coop}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Brewing Technique */}
              <div className="p-4 bg-espresso text-cream rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-caramel uppercase tracking-wider block">
                    Ideal Brew Method:
                  </span>
                  <span className="font-serif font-bold text-lg text-cream">
                    {activeRegionModal.bestBrewMethod} ({activeRegionModal.recommendedRatio})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveRegionModal(null);
                    if (onStartTimerForRegion) onStartTimerForRegion(activeRegionModal);
                  }}
                  className="bg-caramel hover:bg-amber-500 text-espresso px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Coffee size={16} />
                  <span>Brew This Origin</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

