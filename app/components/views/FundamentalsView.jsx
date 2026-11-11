"use client";
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import CoffeeCherryAnatomy from '../interactive/CoffeeCherryAnatomy';
import StudioBanner from '../StudioBanner';

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
  return (
    <div className="space-y-16 animate-fade-up max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Studio Editorial Header */}
      <StudioBanner
        topLeft="Module 01 · Botanical Foundations"
        topRight="ADDC3LL · Davao City"
        flankLeft="Botany"
        flankRight="Origins"
        title="COFFEE FUNDAMENTALS"
        description="Explore the botanical structure of a coffee cherry, compare the four commercial species grown across the Philippines, and trace coffee's global heritage."
      />

      {/* Core Educational Articles Grid */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel block mb-1">
              Curated Monographs
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
              Foundational Reading
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/75">
            Select an article to open the distraction-free reader with summaries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {['what-is-coffee', 'species-guide', 'history'].map((articleId) => {
            const article = ARTICLES[articleId];
            if (!article) return null;
            return (
              <div
                key={articleId}
                onClick={() => onOpenArticle(articleId)}
                className="group bg-cream text-espresso rounded-3xl overflow-hidden border border-border hover:border-umber/50 hover:shadow-[0_14px_35px_rgba(30,20,14,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={article.imgUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-espresso/85 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {article.readTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-umber block mb-1.5">
                      {article.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-espresso mb-2 group-hover:text-umber transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-umber group-hover:text-espresso">
                    <span>Read Full Article</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Anatomy of the Coffee Cherry & Bean */}
      <section>
        <CoffeeCherryAnatomy onOpenArticle={onOpenArticle} />
      </section>

      {/* Four Commercial Species Comparison Table */}
      <section className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10 overflow-hidden">
        <div className="pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 bg-oat text-umber px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] mb-2 border border-border">
            <Sparkles size={13} className="text-caramel" /> Philippine Biodiversity
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
            Comparing 4 Commercial Species
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            The Philippines is among the select few nations worldwide commercially cultivating Arabica, Robusta, Liberica, and Excelsa side-by-side.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-oat/70 text-espresso text-xs uppercase tracking-wider font-display">
                <th className="p-4 font-bold">Species</th>
                <th className="p-4 font-bold">Optimal Altitude</th>
                <th className="p-4 font-bold">Caffeine %</th>
                <th className="p-4 font-bold">Natural Sugars</th>
                <th className="p-4 font-bold">Cup Flavor Profile</th>
                <th className="p-4 font-bold">Philippine Hubs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs sm:text-sm">
              {SPECIES_COMPARISON.map((sp, idx) => (
                <tr key={idx} className="hover:bg-oat/50 transition-colors">
                  <td className="p-4 font-bold text-espresso">
                    {sp.name}
                    <span className="block text-[11px] font-mono text-muted font-normal mt-0.5">{sp.chromosomes}</span>
                  </td>
                  <td className="p-4 text-muted font-medium">{sp.optimalAltitude}</td>
                  <td className="p-4 font-mono font-bold text-umber">{sp.caffeine}</td>
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
