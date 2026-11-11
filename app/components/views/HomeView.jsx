// app/components/views/HomeView.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sprout, Droplets, MapPin, Award, 
  ArrowRight, Sliders, Coffee, GraduationCap, 
  FlaskConical, Users, HelpCircle, ChevronLeft, ChevronRight,
  Layers, Pause, Play
} from 'lucide-react';
import { PHILIPPINE_REGIONS } from '../../data/regions';
import { COMMUNITY_POSTS } from '../../data/communityPosts';
import StudioBeans from '../StudioBeans';

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
      shortTab: "01 · Research Hub",
      badge: "Ateneo de Davao University · ADDC3LL",
      badgeIcon: GraduationCap,
      displayWordmark: "BREW & RESEARCH",
      flankLeft: "Coffee",
      flankRight: "Lab",
      headline: "Connecting Research, Innovation & Agricultural Enterprise",
      description: "Based in Marilog, Davao City, ADDC3LL bridges university engineering and collaborative post-harvest science directly with Mindanao's coffee and cacao communities.",
      primaryCta: { label: "Explore ADDC3LL Lab", view: "about", icon: FlaskConical },
      secondaryCta: { label: "Interactive Brewing Lab", view: "brewing", icon: Sliders },
      tertiaryCta: { label: "Mindanao Terroir", view: "philippine", icon: MapPin },
    },
    {
      id: "slide-2",
      shortTab: "02 · Mindanao Terroir",
      badge: "Mindanao Terroir · 70–80% National Output",
      badgeIcon: MapPin,
      displayWordmark: "MINDANAO TERROIR",
      flankLeft: "Origin",
      flankRight: "Craft",
      headline: "From Mount Apo to Bukidnon: Indigenous Highland Heritage",
      description: "Championing volcanic agroforestry, controlled fermentation studies, and direct cooperative partnerships with Bagobo-Tagabawa and Talaandig growers.",
      primaryCta: { label: "Explore Mindanao Origins", view: "philippine", icon: MapPin },
      secondaryCta: { label: "Farm to Cup Process", view: "farm", icon: Sprout },
      tertiaryCta: { label: "Coffee Cherry Anatomy", view: "fundamentals", icon: Layers },
    },
    {
      id: "slide-3",
      shortTab: "03 · Brewing Studio",
      badge: "Specialty Education & Brewing",
      badgeIcon: Coffee,
      displayWordmark: "PRECISION BREWING",
      flankLeft: "Craft",
      flankRight: "Brew",
      headline: "Extraction Guides, Brew Ratios & Origin Profiles",
      description: "Calculate exact coffee-to-water ratios, follow timed pour-over steps with audio chimes, and inspect every botanical layer of a coffee cherry.",
      primaryCta: { label: "Brew Calculator", view: "brewing", icon: Sliders },
      secondaryCta: { label: "Cherry Anatomy", view: "fundamentals", icon: BookOpen },
      tertiaryCta: { label: "Coffee IQ Quiz", view: "quiz", icon: Award },
    },
    {
      id: "slide-4",
      shortTab: "04 · IPOPHL Class 40",
      badge: "Intellectual Property Milestone · IPOPHL",
      badgeIcon: Award,
      displayWordmark: "CLASS 40 CERTIFIED",
      flankLeft: "Roast",
      flankRight: "Quality",
      headline: "Official 10-Year Trademark: Roasting & Post-Harvest Processing",
      description: "Registered February 27, 2026 under IPOPHL Class 40 for specialty roasting and processing innovation through 2036, recognized by Ateneo de Davao University.",
      primaryCta: { label: "Institutional Brief", view: "about", icon: FlaskConical },
      secondaryCta: { label: "ADDC3LL Achievements", view: "community", icon: Award },
      tertiaryCta: { label: "A–Z Glossary", action: "glossary", icon: HelpCircle },
    }
  ];

  // Auto-advance carousel every 7.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
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
    <div className="w-full animate-fade-up">
      
      {/* ===================================================================== */}
      {/* FULL-BLEED STUDIO HERO STAGE (Direct on infinite umber canvas)       */}
      {/* ===================================================================== */}
      <section 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8 overflow-hidden select-none"
      >
        {/* Flat-Lay Studio Roasted Beans around edges */}
        <StudioBeans />

        {/* Subtle Secondary Editorial Gutter Anchors right beneath floating pill nav */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-wider text-white/60 px-2">
          <span>Marilog · Davao City</span>
          <span className="hidden sm:inline">addc3ll.addu.edu.ph</span>
        </div>

        {/* Center Overhead Ceramic Espresso Cup + Flanked Editorial Narrative */}
        <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-center my-auto py-4 text-center">
          
          {/* Flat-Lay Overhead Porcelain Crema Cup */}
          <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-[0_26px_65px_rgba(12,5,2,0.82)] ring-[6px] sm:ring-[8px] ring-[#F8F5F0] mb-8">
            <img
              src="/hero-cup-topdown.jpg"
              alt="Overhead specialty espresso cup with bubbling golden crema"
              className="w-full h-full object-cover scale-[1.82]"
            />
          </div>

          {/* Slide Identity Badge & Counter */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-caramel text-[10px] sm:text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-[0.14em] border border-white/15">
              <activeSlide.badgeIcon size={13} />
              <span>{activeSlide.badge}</span>
            </span>
            <span className="text-[11px] font-mono text-white/65">
              {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Flanking Editorial Bar: Left Word — Center Intro — Right Word */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-4 mb-4 w-full">
            <div className="hidden md:block md:col-span-3 text-right pr-3">
              <span className="font-display font-extrabold text-xl lg:text-2xl tracking-tight text-white">
                {activeSlide.flankLeft}
              </span>
            </div>

            <div className="md:col-span-6">
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-lg mx-auto animate-in fade-in duration-300" key={`${activeSlide.id}-desc`}>
                {activeSlide.description}
              </p>
            </div>

            <div className="hidden md:block md:col-span-3 text-left pl-3">
              <span className="font-display font-extrabold text-xl lg:text-2xl tracking-tight text-white">
                {activeSlide.flankRight}
              </span>
            </div>
          </div>

          {/* Monumental Pure White Display Wordmark */}
          <div key={activeSlide.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-2 w-full">
            <h1 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-[4.75rem] tracking-[-0.035em] leading-[0.92] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {activeSlide.displayWordmark}
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl font-semibold text-caramel tracking-tight max-w-2xl mx-auto pt-1">
              {activeSlide.headline}
            </p>
          </div>

          {/* Pill CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-7">
            {activeSlide.primaryCta && (
              <button 
                onClick={() => setCurrentView(activeSlide.primaryCta.view)}
                className="bg-white hover:bg-oat text-espresso px-6 py-3 rounded-full font-bold transition-all shadow-xl hover:scale-[1.03] flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.primaryCta.icon size={15} className="text-umber" />
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
                className="bg-caramel hover:bg-[#D8A167] text-espresso px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:scale-[1.03] flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.secondaryCta.icon size={15} />
                <span>{activeSlide.secondaryCta.label}</span>
              </button>
            )}

            {activeSlide.tertiaryCta && (
              <button 
                onClick={() => {
                  if (activeSlide.tertiaryCta.action === 'glossary') {
                    onOpenGlossary();
                  } else if (activeSlide.tertiaryCta.view) {
                    setCurrentView(activeSlide.tertiaryCta.view);
                  }
                }}
                className="bg-black/25 backdrop-blur-md border border-white/25 text-white hover:bg-white/15 px-5 py-3 rounded-full font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm"
              >
                <activeSlide.tertiaryCta.icon size={14} className="text-caramel" />
                <span>{activeSlide.tertiaryCta.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Floating Slide Dock inside Full-Bleed Hero */}
        <div className="relative z-20 max-w-5xl mx-auto w-full pt-4">
          <div className="studio-glass-card rounded-full px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xl">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                    idx === currentSlide
                      ? 'bg-white text-espresso shadow-sm font-bold'
                      : 'text-white/65 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.shortTab}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
                title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
              >
                {isPaused ? <Play size={13} /> : <Pause size={13} />}
              </button>
              <button
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-colors"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-colors"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCROLLING CONTINUOUS STUDIO SECTIONS ON SAME MATTE UMBER CANVAS        */}
      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-10">

        {/* Lab Metrics Bento Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Facility Hub", value: "MARILOG", sub: "Davao City, Philippines" },
            { label: "Partner Network", value: "MCN", sub: "Mindanao Coffee Network" },
            { label: "IPOPHL Class 40", value: "2026–36", sub: "Roasting & Processing IP" },
            { label: "Research Scope", value: "2 CROPS", sub: "Coffee & Cacao Innovation" }
          ].map((stat, i) => (
            <div key={i} className="studio-glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-caramel/45 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">{stat.label}</span>
              <div className="my-2.5">
                <span className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">{stat.value}</span>
              </div>
              <span className="text-xs text-caramel font-semibold">{stat.sub}</span>
            </div>
          ))}
        </section>

        {/* ADDC3LL Core Focus Pillars */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel block mb-2">
                Institutional Mandate
              </span>
              <h2 className="font-display font-black uppercase text-3xl sm:text-5xl text-white tracking-tight leading-none">
                Research, Training & Agro-Enterprise
              </h2>
              <p className="text-white/75 text-sm sm:text-base mt-3 leading-relaxed">
                Through training, technology transfer, and enterprise incubation, ADDC3LL links university science directly to the practical needs of Mindanao coffee and cacao farmers.
              </p>
            </div>

            <div className="hidden sm:flex shrink-0 p-2 bg-white rounded-2xl w-20 h-20 items-center justify-center shadow-xl">
              <img 
                src="/addc3ll-logo.jpg" 
                alt="ADDC3LL Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: BookOpen,
                title: "Research & Innovation",
                desc: "Connecting academic engineering and post-harvest fermentation research with real field challenges across Mindanao."
              },
              {
                num: "02",
                icon: Users,
                title: "Technology Transfer",
                desc: "Empowering cooperatives with accessible drying technology, cupping calibration, and quality control systems."
              },
              {
                num: "03",
                icon: Coffee,
                title: "Agro-Enterprise",
                desc: "Elevating specialty marketability and sustainable export value chains for Davao and Mindanao coffee growers."
              }
            ].map((pillar) => (
              <div key={pillar.num} className="studio-glass-card p-7 rounded-3xl space-y-4 hover:border-caramel/45 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-full bg-white/10 text-caramel flex items-center justify-center border border-white/15">
                    <pillar.icon size={19} />
                  </div>
                  <span className="font-display font-black text-3xl text-white/15">{pillar.num}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* IPOPHL Class 40 Callout */}
          <div className="p-6 rounded-3xl bg-black/35 border border-caramel/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-caramel">
                Intellectual Property Milestone · IPOPHL
              </span>
              <p className="text-xs sm:text-sm text-white/85 leading-snug">
                Registered under <strong>IPOPHL Class 40</strong> for coffee roasting and processing innovations (valid 2026–2036). Supported under SPADe & MinPAD RISE (MinDA, DILG, EU, German Cooperation via GIZ).
              </p>
            </div>
            <button
              onClick={() => setCurrentView('about')}
              className="px-5 py-2.5 bg-caramel hover:bg-[#D8A167] text-espresso rounded-full text-xs font-bold transition-colors shrink-0"
            >
              Institutional Brief
            </button>
          </div>
        </section>

        {/* Featured Regional Harvests */}
        <section className="studio-glass-card rounded-[2.25rem] p-7 sm:p-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-white/15">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel block mb-1.5">
                Single-Origin Calibration
              </span>
              <h2 className="font-display font-black uppercase text-2xl sm:text-4xl text-white tracking-tight">
                Featured Regional Harvests
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 bg-black/35 rounded-full border border-white/10">
              {FEATURED_PROFILES.map((profile) => {
                const isSelected = selectedProfileId === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-espresso shadow-sm font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {profile.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-black/30 p-6 sm:p-10 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-caramel bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
                <span>{currentProfile.lot}</span>
                <span>•</span>
                <span>{currentProfile.origin}</span>
              </div>

              <div>
                <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                  {currentProfile.title}
                </h3>
                <p className="text-xs font-medium text-white/65 mt-1">
                  Cultivated by the {currentProfile.community}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-caramel block mb-0.5">Cupping Notes</span>
                  <span className="font-medium text-white/90">{currentProfile.notes}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-caramel block mb-0.5">ADDC3LL Brew Spec</span>
                  <span className="font-medium text-white/90">{currentProfile.method}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                onClick={() => {
                  const reg = PHILIPPINE_REGIONS.find(r => r.id === currentProfile.regionId);
                  if (reg) onSelectRegion(reg);
                }}
                className="bg-white hover:bg-oat text-espresso px-6 py-3 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Origin Profile</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setCurrentView('brewing')}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <span>Brew Calculator</span>
                <Sliders size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Curriculum Bento Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel block mb-1.5">
                Open-Access Curriculum
              </span>
              <h2 className="font-display font-black uppercase text-2xl sm:text-4xl text-white tracking-tight">
                Educational Modules & Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/75 max-w-md">
              Interactive learning tracks built for agricultural students, roasters, baristas, and researchers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                view: 'fundamentals',
                icon: BookOpen,
                badge: "Botany",
                title: "Coffee Fundamentals",
                desc: "Interactive coffee cherry anatomy diagram, four commercial Philippine species comparison, and coffee heritage history.",
                cta: "Explore Fundamentals"
              },
              {
                view: 'farm',
                icon: Sprout,
                badge: "Post-Harvest",
                title: "Farm to Cup Process",
                desc: "Follow the six stages from highland growing and washed or natural processing through roast curve levels and cupping.",
                cta: "Explore Process"
              },
              {
                view: 'brewing',
                icon: Droplets,
                badge: "Brew Ratios",
                title: "Brewing Lab & Ratios",
                desc: "Calibrated coffee-to-water calculator, step-by-step pour assistant with chimes, and layered espresso drink visualizer.",
                cta: "Open Brewing Lab"
              },
              {
                view: 'philippine',
                icon: MapPin,
                badge: "Regional Map",
                title: "Philippine Origins",
                desc: "Explore Mount Apo, Bukidnon, Sultan Kudarat, Sulu Archipelago, and Batangas Barako grower cooperatives.",
                cta: "Explore Origins"
              },
              {
                view: 'about',
                iconImg: "/addc3ll-logo.jpg",
                badge: "Davao Facility",
                title: "ADDC3LL Facilities & Lab",
                desc: "Discover the Ateneo de Davao collaborative cupping laboratory, sample roasting setups, and partnership extension programs.",
                cta: "About the Laboratory"
              },
              {
                view: 'quiz',
                icon: Award,
                badge: "10 Questions",
                title: "Coffee IQ Challenge",
                desc: "Evaluate your mastery of coffee cherry botany, thermodynamic roast curves, extraction mechanics, and Mindanao terroir.",
                cta: "Take the Quiz"
              }
            ].map((card) => (
              <div 
                key={card.view}
                onClick={() => setCurrentView(card.view)}
                className="group studio-glass-card rounded-3xl p-7 hover:border-caramel/60 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {card.iconImg ? (
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                        <img src={card.iconImg} alt={card.title} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-white/10 text-caramel rounded-2xl flex items-center justify-center border border-white/15 group-hover:scale-105 transition-transform">
                        <card.icon size={22} />
                      </div>
                    )}
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-black/40 text-caramel px-3 py-1 rounded-full border border-white/15">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2.5 group-hover:text-caramel transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-caramel group-hover:text-white">
                  <span>{card.cta}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADDC3LL Achievements Showcase (Zero Social Reactions) */}
        <section className="studio-glass-card rounded-[2.25rem] p-7 sm:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel block mb-1.5">
                Official Laboratory Archive
              </span>
              <h2 className="font-display font-black uppercase text-2xl sm:text-4xl text-white tracking-tight">
                ADDC3LL Achievements & Milestones
              </h2>
            </div>

            <button
              onClick={() => setCurrentView('community')}
              className="bg-white hover:bg-oat text-espresso text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span>View Full Archive</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_POSTS.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => setCurrentView('community')}
                className="group bg-black/30 rounded-3xl overflow-hidden border border-white/12 hover:border-caramel/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {post.images && post.images.length > 0 && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.images[0].url}
                        alt={post.images[0].caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/15">
                        {post.awardBadge || post.category}
                      </div>
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-caramel">
                      <MapPin size={12} />
                      <span className="truncate">{post.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white line-clamp-2 group-hover:text-caramel transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/75 leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 flex items-center justify-between text-xs font-bold text-caramel border-t border-white/10 mt-2">
                  <span className="text-[11px] font-mono font-normal text-white/60">{post.date}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Record <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
