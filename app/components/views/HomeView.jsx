"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sprout, Droplets, MapPin, Award, 
  ArrowRight, Sparkles, Sliders, Coffee, GraduationCap, 
  FlaskConical, Users, Info, HelpCircle, ChevronLeft, ChevronRight
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState('mt-apo');

  const HERO_SLIDES = [
    {
      id: "slide-1",
      badge: "Ateneo de Davao University · ADDC3LL",
      badgeIcon: GraduationCap,
      headline: "Connecting Research, Innovation & Agricultural Enterprise",
      subtitle: "University Collaboration in Marilog, Davao City",
      description: "The Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL) is a university initiative in partnership with the Mindanao Coffee Network. Based in Marilog, Davao City, the laboratory connects academic research with grassroots innovation in Mindanao's coffee and cacao sectors.",
      primaryCta: { label: "About the ADDC3LL Lab", view: "about", icon: FlaskConical },
      secondaryCta: { label: "Interactive Brewing Lab", view: "brewing", icon: Sliders },
      tertiaryCta: { label: "Mindanao Terroir", view: "philippine", icon: MapPin },
      imgUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600",
      accentTag: "Marilog, Davao City · Academic Innovation Hub"
    },
    {
      id: "slide-2",
      badge: "Mindanao Terroir · 70–80% National Output",
      badgeIcon: MapPin,
      headline: "From Mount Apo to Bukidnon: Celebrating Our Heritage",
      subtitle: "Indigenous Agroforestry & Specialty Cultivars",
      description: "Mindanao is the coffee heartland of the Philippines. We champion sustainable highland agroforestry, post-harvest fermentation trials, and direct community partnerships alongside indigenous Bagobo-Tagabawa and Talaandig farming cooperatives across Mount Apo, Bukidnon, and Sultan Kudarat.",
      primaryCta: { label: "Explore Mindanao Origins", view: "philippine", icon: MapPin },
      secondaryCta: { label: "Farm to Cup Stepper", view: "farm", icon: Sprout },
      tertiaryCta: { label: "Species Comparison", view: "fundamentals", icon: BookOpen },
      imgUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1600",
      accentTag: "Indigenous Cooperatives · Volcanic Terroir"
    },
    {
      id: "slide-3",
      badge: "Specialty Education & Barista Tools",
      badgeIcon: Coffee,
      headline: "Precision Brewing Lab for Ateneans & Enthusiasts",
      subtitle: "Interactive Digital Tools & Extraction Dynamics",
      description: "Demystifying coffee extraction science with live digital tools. Master coffee-to-water ratios with our real-time calculator, follow step-by-step timed pours with Web Audio chimes, and explore espresso liquid proportions right from campus or home.",
      primaryCta: { label: "Launch Brewing Lab", view: "brewing", icon: Sliders },
      secondaryCta: { label: "Take Coffee IQ Quiz", view: "quiz", icon: Award },
      tertiaryCta: { label: "Coffee Fundamentals", view: "fundamentals", icon: BookOpen },
      imgUrl: "https://images.unsplash.com/photo-1495474472207-464a8d9cb90a?auto=format&fit=crop&q=80&w=1600",
      accentTag: "Live Timers · Ratio Calculators · Science of Extraction"
    },
    {
      id: "slide-4",
      badge: "Intellectual Property Milestone · IPOPHL",
      badgeIcon: Award,
      headline: "Official 10-Year Trademark: Roasting & Processing",
      subtitle: "Class 40 Registered Trademark (2026–2036)",
      description: "On February 27, 2026, ADDC3LL achieved registered trademark status with the Intellectual Property Office of the Philippines (IPOPHL) under Class 40 for coffee roasting and processing, valid for ten years. Formally announced by Ateneo de Davao University on May 11, 2026.",
      primaryCta: { label: "Read Institutional Milestone", view: "about", icon: FlaskConical },
      secondaryCta: { label: "A–Z Coffee Glossary", action: "glossary", icon: HelpCircle },
      tertiaryCta: { label: "Origin Profiles", view: "philippine", icon: MapPin },
      imgUrl: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&q=80&w=1600",
      accentTag: "Class 40 Trademark · 2026–2036 Protection"
    }
  ];

  // Auto-advance carousel every 7 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, HERO_SLIDES.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  const FEATURED_PROFILES = [
    {
      id: 'mt-apo',
      tabLabel: "Mount Apo (Arabica)",
      title: "Mount Apo Anaerobic Natural",
      lot: "BACOFA Lot · Single Origin Arabica",
      origin: "Bansalan, Davao del Sur · 1,500 MASL",
      community: "Bagobo-Tagabawa Coffee Farmers",
      notes: "Wild strawberry, red berries, lemongrass, cacao nibs",
      method: "Hario V60 · 1:16 Ratio @ 93°C Water",
      regionId: "mt-apo"
    },
    {
      id: 'sultan-kudarat',
      tabLabel: "Sultan Kudarat (Fine Robusta)",
      title: "Sultan Kudarat Slow-Dried Natural",
      lot: "KFAC Cooperative Lot · Fine Robusta",
      origin: "Kalamansig · 900 MASL",
      community: "Kalamansig Farmers Agricultural Cooperative",
      notes: "Dark chocolate, roasted hazelnut, panutsa, molasses",
      method: "French Press · 1:14 Ratio @ 91°C Water",
      regionId: "sultan-kudarat"
    },
    {
      id: 'bukidnon',
      tabLabel: "Bukidnon (Typica)",
      title: "Bukidnon Miarayon Fully Washed",
      lot: "MILALITTRA Lot · Highland Arabica",
      origin: "Kitanglad Mountain Range · 1,650 MASL",
      community: "Talaandig Indigenous Association",
      notes: "Jasmine floral, crisp green apple, raw cane sugar",
      method: "Chemex or V60 · 1:16.5 Ratio @ 92°C Water",
      regionId: "bukidnon"
    },
    {
      id: 'batangas-cavite',
      tabLabel: "Batangas (Barako)",
      title: "Heritage Kapeng Barako",
      lot: "Lowland Shade-Grown Liberica",
      origin: "Southern Luzon · 350 MASL",
      community: "Amadeo & Lipa Coffee Growers",
      notes: "Ripe jackfruit (langka), cedar wood, dark cacao",
      method: "Traditional Kape Kaldero · 1:12 Ratio @ 95°C Water",
      regionId: "batangas-cavite"
    }
  ];

  const currentProfile = FEATURED_PROFILES.find(p => p.id === selectedProfileId) || FEATURED_PROFILES[0];

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Interactive Hero Carousel: ADDC3LL & Mindanao Coffee Stories */}
      <section 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative bg-espresso text-cream rounded-3xl overflow-hidden shadow-2xl mt-4 border border-border/20 group select-none min-h-[560px] sm:min-h-[520px] flex flex-col justify-between"
      >
        {/* Background Images Cross-Fade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-35 scale-105' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img 
              src={slide.imgUrl} 
              alt={slide.headline} 
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>
        ))}

        {/* Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso/60 z-10" />

        {/* Main Content Area */}
        <div className="relative z-20 px-6 sm:px-12 pt-10 sm:pt-14 pb-4 max-w-3xl flex-1 flex flex-col justify-center">
          {/* Top Pill / Badge */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="inline-flex items-center gap-2 bg-roast/90 text-cream text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-cream/20 animate-in fade-in duration-300">
              <activeSlide.badgeIcon size={14} className="text-caramel" />
              <span>{activeSlide.badge}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-oat/60 tracking-wider">
              <span className="text-caramel font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight text-cream min-h-[70px] sm:min-h-[110px] animate-in fade-in slide-in-from-left-2 duration-300">
            {activeSlide.headline}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-oat/90 mb-7 leading-relaxed font-sans font-normal min-h-[70px] sm:min-h-[85px] animate-in fade-in slide-in-from-left-1 duration-300">
            {activeSlide.description}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {activeSlide.primaryCta && (
              <button 
                onClick={() => setCurrentView(activeSlide.primaryCta.view)}
                className="bg-cream hover:bg-oat text-espresso px-6 sm:px-7 py-3 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.primaryCta.icon size={16} className="text-roast" />
                <span>{activeSlide.primaryCta.label}</span>
              </button>
            )}

            {activeSlide.secondaryCta && (
              <button 
                onClick={() => {
                  if (activeSlide.secondaryCta.action === 'glossary') {
                    onOpenGlossary();
                  } else if (activeSlide.secondaryCta.view) {
                    setCurrentView(activeSlide.secondaryCta.view);
                  }
                }}
                className="bg-caramel hover:bg-amber-500 text-espresso px-5 sm:px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.secondaryCta.icon size={16} />
                <span>{activeSlide.secondaryCta.label}</span>
              </button>
            )}

            {activeSlide.tertiaryCta && (
              <button 
                onClick={() => setCurrentView(activeSlide.tertiaryCta.view)}
                className="bg-espresso/60 backdrop-blur-md border border-cream/30 text-cream hover:bg-espresso px-4 sm:px-5 py-3 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.tertiaryCta.icon size={16} className="text-caramel" />
                <span>{activeSlide.tertiaryCta.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="relative z-20 px-6 sm:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-oat/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <strong>Academic Prototype:</strong> {activeSlide.accentTag}
            </span>
          </div>

          {/* Dots Indicator & Navigation Chevrons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-7 bg-caramel' 
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous & Next Slide Arrow Buttons */}
            <div className="flex items-center gap-1 border-l border-white/15 pl-2.5">
              <button
                onClick={handlePrevSlide}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/20 border border-white/15 flex items-center justify-center text-cream transition-colors"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/20 border border-white/15 flex items-center justify-center text-cream transition-colors"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>
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

        {/* Institutional Partnership Strip */}
        <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
          <div>
            <span className="font-bold text-espresso text-[11px] uppercase tracking-wider block">
              Supported Under SPADe & MinPAD RISE
            </span>
            <p className="text-muted text-[11px] mt-0.5">
              MinDA · DILG · European Union · German Cooperation (BMZ) via GIZ · Mindanao Coffee Network
            </p>
          </div>
          <button
            onClick={() => setCurrentView('about')}
            className="text-roast hover:text-espresso font-semibold flex items-center gap-1 shrink-0 text-xs transition-colors"
          >
            <span>View All Objectives & Partners</span>
            <ArrowRight size={13} />
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

      {/* Featured Harvest Profiles: Rooted in Mindanao Cooperatives */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
              Mindanao Terroir & Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              Featured Regional Harvests
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Calibrated sensory attributes and extraction parameters for single-origin lots across Mindanao and partner farming cooperatives.
            </p>
          </div>

          {/* Minimalist Origin Selector Tabs (No Emojis) */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-oat rounded-xl border border-border">
            {FEATURED_PROFILES.map((profile) => {
              const isSelected = selectedProfileId === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'text-muted hover:text-espresso'
                  }`}
                >
                  {profile.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Lot Presentation (Clean Craft Coffee Label Style) */}
        <div className="bg-oat p-6 sm:p-8 rounded-2xl border border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-roast tracking-wide">
                {currentProfile.lot}
              </span>
              <span className="text-muted/60">•</span>
              <span className="text-muted font-medium">
                {currentProfile.origin}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
                {currentProfile.title}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                Grown by the {currentProfile.community}
              </p>
            </div>

            <div className="pt-1 space-y-1.5 text-xs sm:text-sm">
              <p className="text-muted">
                <span className="font-semibold text-espresso">Cupping Notes:</span> {currentProfile.notes}
              </p>
              <p className="text-muted">
                <span className="font-semibold text-espresso">ADDC3LL Calibration:</span> {currentProfile.method}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={() => {
                const reg = PHILIPPINE_REGIONS.find(r => r.id === currentProfile.regionId);
                if (reg) onSelectRegion(reg);
              }}
              className="bg-espresso hover:bg-roast text-cream px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Origin Overview</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setCurrentView('brewing')}
              className="bg-cream hover:bg-border/60 text-espresso px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-border"
            >
              <span>Brew Parameters</span>
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
