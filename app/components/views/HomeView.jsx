"use client";
import React, { useState } from 'react';
import { 
  BookOpen, Sprout, Droplets, MapPin, Award, 
  ArrowRight, Sparkles, Sliders, Coffee, GraduationCap, 
  FlaskConical, Users, Info, HelpCircle
} from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import { PHILIPPINE_REGIONS } from '../../data/regions';

export default function HomeView({ 
  setCurrentView, 
  onOpenArticle, 
  onSelectRegion, 
  onOpenTimerDirectly, 
  onOpenGlossary 
}) {
  const [flavorMood, setFlavorMood] = useState('fruity');

  const moodRecommendations = {
    fruity: {
      title: "Mount Apo Anaerobic Natural (BACOFA)",
      origin: "Davao del Sur · 1,500 MASL · Bagobo-Tagabawa Community",
      notes: "Ripe strawberry, wild berries, lemongrass & cacao nibs",
      method: "Hario V60 (1:16 Ratio @ 93°C)",
      regionId: "mt-apo"
    },
    chocolate: {
      title: "Sultan Kudarat Fine Robusta (KFAC)",
      origin: "Kalamansig · 900 MASL · Direct Farmer Cooperative",
      notes: "Dark chocolate ganache, roasted hazelnut & sweet molasses",
      method: "French Press or Moka Pot (1:14 Ratio @ 91°C)",
      regionId: "sultan-kudarat"
    },
    floral: {
      title: "Bukidnon Miarayon Typica (MILALITTRA)",
      origin: "Kitanglad Range · 1,650 MASL · Talaandig Community",
      notes: "Jasmine blossom, crisp green apple & raw cane sugar",
      method: "Chemex or V60 (1:16.5 Ratio @ 92°C)",
      regionId: "bukidnon"
    },
    bold: {
      title: "Kapeng Barako Heritage (Liberica)",
      origin: "Cavite / Batangas · Lowland Shade-Grown",
      notes: "Aromatic jackfruit (langka), cedar wood & dark tablea",
      method: "Traditional Kape Kaldero or French Press (1:12 Ratio)",
      regionId: "batangas-cavite"
    }
  };

  const currentRecommendation = moodRecommendations[flavorMood];

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Hero Section: Centered on Ateneo de Davao & ADDC3LL */}
      <section className="relative bg-espresso text-cream rounded-3xl overflow-hidden shadow-2xl mt-4 border border-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1400" 
          alt="Mindanao coffee harvest" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />

        <div className="relative z-20 px-6 sm:px-12 py-16 sm:py-24 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-roast/90 text-cream text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-sm border border-cream/20">
            <GraduationCap size={15} className="text-caramel" />
            Ateneo de Davao University · ADDC3LL
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-cream">
            Connecting Research, Innovation & Agricultural Enterprise
          </h1>

          <p className="text-lg sm:text-xl text-oat/90 mb-8 leading-relaxed font-sans font-normal">
            The <strong>Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL)</strong> is a university initiative in partnership with the <strong>Mindanao Coffee Network</strong>. Based in <strong>Marilog, Davao City</strong>, the laboratory connects academic research with grassroots innovation in Mindanao's coffee and cacao sectors.
          </p>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setCurrentView('about')}
              className="bg-cream hover:bg-oat text-espresso px-6 sm:px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2 text-sm"
            >
              <FlaskConical size={18} className="text-roast" />
              <span>About the ADDC3LL Lab</span>
            </button>
            <button 
              onClick={() => setCurrentView('brewing')} 
              className="bg-caramel hover:bg-amber-500 text-espresso px-6 sm:px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2 text-sm"
            >
              <Sliders size={18} />
              <span>Interactive Brewing Lab</span>
            </button>
            <button 
              onClick={() => setCurrentView('philippine')} 
              className="bg-espresso/60 backdrop-blur-md border border-cream/30 text-cream hover:bg-espresso px-5 sm:px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 text-sm"
            >
              <MapPin size={18} className="text-caramel" />
              <span>Mindanao Terroir</span>
            </button>
          </div>
        </div>
      </section>

      {/* ADDC3LL Core Focus Pillars */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-2">
            Our Published Focus
          </span>
          <h2 className="text-3xl font-serif font-bold text-espresso leading-snug">
            Research, Training & Agro-enterprise in Mindanao
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
            Through its focus on training, technology transfer, and agro-enterprise development, ADDC3LL serves as an active link between academic knowledge and the practical needs of the agricultural community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Research & Innovation */}
          <div className="bg-oat p-6 rounded-2xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-espresso text-cream flex items-center justify-center">
              <BookOpen size={20} className="text-caramel" />
            </div>
            <h3 className="font-serif font-bold text-lg text-espresso">
              Research & Innovation
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Connecting university academic research with practical challenges and opportunities across Mindanao's coffee and cacao industries.
            </p>
          </div>

          {/* Card 2: Training & Technology Transfer */}
          <div className="bg-oat p-6 rounded-2xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-roast text-cream flex items-center justify-center">
              <Users size={20} className="text-caramel" />
            </div>
            <h3 className="font-serif font-bold text-lg text-espresso">
              Training & Technology Transfer
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Supporting the exchange of knowledge and processing technology between academic researchers and agricultural stakeholders.
            </p>
          </div>

          {/* Card 3: Agro-enterprise Development */}
          <div className="bg-oat p-6 rounded-2xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-cream flex items-center justify-center">
              <Coffee size={20} className="text-cream" />
            </div>
            <h3 className="font-serif font-bold text-lg text-espresso">
              Agro-enterprise Development
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Contributing to innovation and sustainable enterprise development within Mindanao's coffee and cacao agricultural sectors.
            </p>
          </div>
        </div>

        {/* Milestone Callout: IPOPHL Trademark */}
        <div className="mt-4 p-5 rounded-2xl bg-espresso text-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-caramel">
              Intellectual Property Milestone
            </span>
            <p className="text-sm text-oat/90 leading-snug">
              Registered with the <strong>Intellectual Property Office of the Philippines (IPOPHL)</strong> under <strong>Class 40</strong> for coffee roasting and processing (valid 2026–2036).
            </p>
          </div>
          <button
            onClick={() => setCurrentView('about')}
            className="px-4 py-2 bg-roast hover:bg-caramel hover:text-espresso rounded-xl text-xs font-bold transition-colors shrink-0 text-cream"
          >
            Read Institutional Brief
          </button>
        </div>
      </section>

      {/* Quick University & Lab Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Facility Location", value: "Marilog", sub: "Davao City, Philippines" },
          { label: "Partner Network", value: "MCN", sub: "Mindanao Coffee Network" },
          { label: "IPOPHL Class 40", value: "2026–36", sub: "Roasting & Processing Trademark" },
          { label: "Primary Sectors", value: "2 Sectors", sub: "Coffee & Cacao Innovation" }
        ].map((stat, i) => (
          <div key={i} className="bg-cream p-5 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted">{stat.label}</span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-serif font-black text-espresso">{stat.value}</span>
            </div>
            <span className="text-xs text-roast font-semibold">{stat.sub}</span>
          </div>
        ))}
      </section>

      {/* Daily Sensory Pairing: Rooted in Mindanao Lots */}
      <section className="bg-oat rounded-3xl border border-border p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 bg-cream text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-border">
              <Sparkles size={14} /> Sensory Exploration Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              What cup profile are you exploring today?
            </h2>
            <p className="text-sm text-muted mt-1">
              Select a flavor mood to view a featured Mindanao coffee and the recommended brewing ratio.
            </p>
          </div>

          {/* Flavor Mood Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'fruity', label: '🍓 Mount Apo Fruity' },
              { id: 'chocolate', label: '🍫 Sultan Kudarat Cocoa' },
              { id: 'floral', label: '🌸 Bukidnon Floral' },
              { id: 'bold', label: '🐗 Heritage Barako' }
            ].map((mood) => (
              <button
                key={mood.id}
                onClick={() => setFlavorMood(mood.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  flavorMood === mood.id
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-cream text-muted hover:text-espresso border border-border'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Recommendation Card */}
        <div className="mt-6 bg-cream p-6 rounded-2xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-roast">Featured Origin:</span>
              <span className="text-xs bg-oat px-2.5 py-0.5 rounded-full font-semibold text-muted border border-border">{currentRecommendation.origin}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-espresso">
              {currentRecommendation.title}
            </h3>
            <p className="text-sm text-muted">
              <span className="font-semibold text-espresso">Cupping Notes:</span> {currentRecommendation.notes}
            </p>
            <p className="text-sm text-muted">
              <span className="font-semibold text-espresso">ADDC3LL Recipe:</span> {currentRecommendation.method}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => {
                const reg = PHILIPPINE_REGIONS.find(r => r.id === currentRecommendation.regionId);
                if (reg) onSelectRegion(reg);
              }}
              className="bg-espresso hover:bg-roast text-cream px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Origin</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setCurrentView('brewing')}
              className="bg-oat hover:bg-border/60 text-espresso px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 border border-border"
            >
              <span>Brew Calculator</span>
              <Sliders size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Core Learning Modules Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
              Comprehensive Curriculum
            </span>
            <h2 className="text-3xl font-serif font-bold text-espresso">
              Educational Modules & Tools
            </h2>
            <p className="text-sm text-muted mt-1">
              Open-access coffee knowledge curated for students, researchers, baristas, and home coffee lovers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Fundamentals */}
          <div 
            onClick={() => setCurrentView('fundamentals')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-espresso text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen size={24} className="text-caramel" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                Coffee Fundamentals
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Cherry anatomy, comparing the 4 commercial species grown in the Philippines, and the rich history of coffee from Ethiopia to Batangas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>Explore Fundamentals</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Farm to Cup */}
          <div 
            onClick={() => setCurrentView('farm')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-roast text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sprout size={24} className="text-caramel" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                Farm to Cup Process
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Interactive stepper tracing tree cultivation, selective picking, washed vs natural vs anaerobic fermentation, and roasting thermodynamics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>View Processing Journey</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Brewing Lab */}
          <div 
            onClick={() => setCurrentView('brewing')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-amber-800 text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Droplets size={24} className="text-cream" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                Brewing Lab & Calculator
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Live brew ratio calculator, stage-by-stage pour assistant with audio cues, and interactive espresso drink layer visualizer.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>Launch Brewing Tools</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Philippine Origins */}
          <div 
            onClick={() => setCurrentView('philippine')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-emerald-800 text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MapPin size={24} className="text-cream" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                Philippine Origins Explorer
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Discover Mount Apo, Bukidnon, Sultan Kudarat, Sulu Archipelago, and Batangas Barako. Profiles, cooperatives, and brew tips.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>Explore Origins</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: About ADDC3LL */}
          <div 
            onClick={() => setCurrentView('about')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-stone-800 text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <FlaskConical size={24} className="text-caramel" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                ADDC3LL Facilities & Lab
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Tour the Ateneo de Davao cupping laboratory, sample roaster setup, student research programs, and book a training session.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>Learn About the Lab</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Coffee Quiz */}
          <div 
            onClick={() => setCurrentView('quiz')}
            className="group bg-cream rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-amber-600 text-cream rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Award size={24} className="text-cream" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mb-2 group-hover:text-roast transition-colors">
                Barista & Coffee IQ Quiz
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Test your knowledge of coffee processing, roasting physics, extraction science, and Philippine heritage. Earn your certificate badge!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
              <span>Take the 10-Question Quiz</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Origin Spotlight: Mount Apo & AdDU Extension */}
      <section className="bg-espresso text-cream rounded-3xl overflow-hidden p-8 sm:p-12 relative border border-border/20">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-roast text-cream text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Mindanao Heritage & Community Extension
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Mount Apo & Indigenous Farmer Cooperatives
          </h2>
          <p className="text-oat/90 text-base sm:text-lg leading-relaxed">
            On the volcanic slopes of Mount Apo (2,954 MASL), indigenous Bagobo-Tagabawa farmers and the Balutakay Coffee Farmers Association (BACOFA) collaborate with ADDC3LL researchers to refine post-harvest fermentation. The result: world-class specialty lots with wild strawberry, jasmine, and citrus complexity.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                const apo = PHILIPPINE_REGIONS.find(r => r.id === 'mt-apo');
                if (apo) onSelectRegion(apo);
              }}
              className="bg-caramel hover:bg-amber-500 text-espresso font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm"
            >
              <span>Explore Mount Apo Profile</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className="bg-espresso/50 border border-white/20 hover:bg-white/10 text-cream font-bold px-5 py-3 rounded-xl transition-all text-sm"
            >
              Contact ADDC3LL
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
