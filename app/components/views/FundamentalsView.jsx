"use client";
import React, { useState } from 'react';
import { BookOpen, ArrowRight, Check, Sparkles, Layers, Info } from 'lucide-react';
import { ARTICLES } from '../../data/articles';

const SPECIES_COMPARISON = [
  {
    name: "Coffea Arabica",
    chromosomes: "44 (Tetraploid)",
    optimalAltitude: "1,000 – 2,200 MASL",
    caffeine: "1.0% – 1.4%",
    sugars: "6% – 9% (High)",
    body: "Delicate to medium, tea-like",
    flavorNotes: "Bright acidity, berries, citrus, floral jasmine",
    philippineRegions: "Mt. Apo, Bukidnon, Benguet, Sagada"
  },
  {
    name: "Coffea Canephora (Robusta)",
    chromosomes: "22 (Diploid)",
    optimalAltitude: "200 – 1,000 MASL",
    caffeine: "1.8% – 2.7% (Very High)",
    sugars: "3% – 5% (Low)",
    body: "Heavy, syrupy, thick crema",
    flavorNotes: "Dark chocolate, roasted nuts, earthy spices, grain",
    philippineRegions: "Sultan Kudarat, Bukidnon, Sulu, Basilan"
  },
  {
    name: "Coffea Liberica (Barako)",
    chromosomes: "22 (Diploid)",
    optimalAltitude: "200 – 800 MASL",
    caffeine: "1.1% – 1.5%",
    sugars: "Moderate",
    body: "Dense, lingering, heavy",
    flavorNotes: "Pungent floral, ripe jackfruit (langka), cedar, dark cacao",
    philippineRegions: "Batangas, Cavite, Quezon, Davao"
  },
  {
    name: "Coffea Excelsa",
    chromosomes: "22 (Diploid)",
    optimalAltitude: "400 – 1,000 MASL",
    caffeine: "0.9% – 1.2%",
    sugars: "Moderate to high",
    body: "Medium, tart & tangy",
    flavorNotes: "Tart fruitiness, dried fig, blackberry, dark roast punch",
    philippineRegions: "Sultan Kudarat, Cavite, Compostela Valley"
  }
];

export default function FundamentalsView({ onOpenArticle }) {
  const [selectedLayer, setSelectedLayer] = useState('seed');

  const cherryLayers = {
    skin: {
      name: "Exocarp (Outer Skin)",
      color: "bg-red-600",
      description: "The protective exterior skin. Turns bright red, yellow, or orange at peak ripeness, indicating high sugar content."
    },
    pulp: {
      name: "Mesocarp (Fleshy Fruit Pulp)",
      color: "bg-amber-500",
      description: "The sweet, nutrient-rich flesh surrounding the seeds. In natural processing, this fruit pulp dries directly on the seed."
    },
    mucilage: {
      name: "Pectin / Mucilage Layer",
      color: "bg-amber-300 text-espresso",
      description: "The sticky, sugar-dense coating. The key actor in fermentation during washed, honey, and anaerobic processing."
    },
    parchment: {
      name: "Endocarp (Parchment Hull)",
      color: "bg-stone-300 text-espresso",
      description: "A tough cellulose hull that shields the green seed during resting and storage before final hulling."
    },
    silverskin: {
      name: "Spermoderm (Silverskin)",
      color: "bg-stone-200 text-espresso",
      description: "A thin inner membrane hugging the seed. During roasting, this flakes off as 'chaff'."
    },
    seed: {
      name: "Endosperm (The Coffee Seed / Bean)",
      color: "bg-roast",
      description: "The actual green seed containing caffeine, chlorogenic acids, sucrose, and lipids that transform into roasted coffee."
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-espresso text-cream py-14 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-roast text-caramel text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Module 1 · Botanical Foundations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Coffee Fundamentals
          </h1>
          <p className="text-base sm:text-lg text-oat/90 leading-relaxed">
            Understand the biology of the coffee cherry, compare the four commercial species cultivated in the Philippines, and explore the ancient history of the beverage.
          </p>
        </div>
      </div>

      {/* Core Educational Articles Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              Foundational Reading
            </h2>
            <p className="text-sm text-muted mt-1">
              Select an article to open the full reader with key takeaways and summaries.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {['what-is-coffee', 'species-guide', 'history'].map((articleId) => {
            const article = ARTICLES[articleId];
            if (!article) return null;
            return (
              <div
                key={articleId}
                onClick={() => onOpenArticle(articleId)}
                className="group bg-cream rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={article.imgUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-espresso/80 backdrop-blur-sm text-cream text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {article.readTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-roast block mb-1">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
                    <span>Read Full Article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Anatomy of the Coffee Cherry */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
        <div className="pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Layers size={14} /> Interactive Botanical Explorer
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Anatomy of the Coffee Cherry
          </h2>
          <p className="text-sm text-muted mt-1">
            Click on each botanical layer of the fruit to inspect its biological function and significance during post-harvest processing.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector buttons */}
          <div className="lg:col-span-5 space-y-2">
            {Object.entries(cherryLayers).map(([key, info]) => {
              const isSelected = selectedLayer === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLayer(key)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-espresso text-cream border-espresso shadow-md'
                      : 'bg-oat hover:bg-border/60 text-espresso border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${info.color} shadow-sm border border-black/20`} />
                    <span className="font-bold text-sm">{info.name}</span>
                  </div>
                  {isSelected && <ArrowRight size={16} className="text-caramel" />}
                </button>
              );
            })}
          </div>

          {/* Detailed Layer Inspection Card */}
          <div className="lg:col-span-7 bg-oat p-8 rounded-3xl border border-border flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-roast block mb-1">
                Botanical Cross-Section
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
                {cherryLayers[selectedLayer].name}
              </h3>
              <p className="text-base text-muted leading-relaxed mt-4">
                {cherryLayers[selectedLayer].description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
              <span>Botanical Genus: <strong className="text-espresso">Coffea</strong></span>
              <button 
                onClick={() => onOpenArticle('what-is-coffee')}
                className="font-bold text-roast hover:underline flex items-center gap-1"
              >
                Read deep-dive <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Commercial Species Comparison Table */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Philippine Biodiversity
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Comparing the 4 Commercial Coffee Species
          </h2>
          <p className="text-sm text-muted mt-1">
            The Philippines is among the select few countries worldwide commercially producing Arabica, Robusta, Liberica, and Excelsa simultaneously.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-oat/70 text-espresso">
                <th className="p-4 font-serif font-bold">Species</th>
                <th className="p-4 font-serif font-bold">Optimal Altitude</th>
                <th className="p-4 font-serif font-bold">Caffeine %</th>
                <th className="p-4 font-serif font-bold">Natural Sugars</th>
                <th className="p-4 font-serif font-bold">Cup Flavor Profile</th>
                <th className="p-4 font-serif font-bold">Philippine Hubs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SPECIES_COMPARISON.map((sp, idx) => (
                <tr key={idx} className="hover:bg-oat/40 transition-colors">
                  <td className="p-4 font-bold text-espresso">
                    {sp.name}
                    <span className="block text-[11px] text-muted font-normal">{sp.chromosomes}</span>
                  </td>
                  <td className="p-4 text-muted">{sp.optimalAltitude}</td>
                  <td className="p-4 font-mono font-semibold text-roast">{sp.caffeine}</td>
                  <td className="p-4 text-muted">{sp.sugars}</td>
                  <td className="p-4 text-espresso font-medium">{sp.flavorNotes}</td>
                  <td className="p-4 text-muted text-xs">{sp.philippineRegions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

