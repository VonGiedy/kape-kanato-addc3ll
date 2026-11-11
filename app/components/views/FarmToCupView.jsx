"use client";
import React, { useState } from 'react';
import { 
  Sprout, Flame, Droplets, CheckCircle2, 
  ArrowRight, Sparkles, Sliders, ChevronRight, BookOpen 
} from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import RoastProfileGuide from '../interactive/RoastProfileGuide';
import PostHarvestProcessGuide from '../interactive/PostHarvestProcessGuide';
import StudioBanner from '../StudioBanner';

const FARM_STEPS = [
  {
    step: 1,
    id: "cultivation",
    title: "1. High-Altitude Cultivation",
    subtitle: "Soil, Shade & Agroforestry",
    summary: "Coffee plants thrive in rich volcanic soils beneath shade trees (like Falcata, Banana, and Alnus) in Mindanao's mountain slopes between 800 and 1,800 MASL.",
    keyMetrics: [
      { label: "Optimal Temp", value: "18°C – 22°C" },
      { label: "Maturation Time", value: "8 – 9 Months" },
      { label: "Canopy", value: "Shade-Grown Agroforestry" }
    ],
    details: "In areas like Mount Apo and the Kitanglad range, agroforestry practices protect biodiversity and shield coffee trees from severe heat. Slower maturation at high altitudes allows dense sugar synthesis in the coffee cherry."
  },
  {
    step: 2,
    id: "harvesting",
    title: "2. Selective Hand Harvesting",
    subtitle: "Picking Only Ripe Cherries",
    summary: "Unlike commercial strip-picking, specialty coffee requires selective hand-picking only when cherries turn deep crimson red or purple.",
    keyMetrics: [
      { label: "Target Brix Sugar", value: "18° – 24° Brix" },
      { label: "Pick Interval", value: "Every 10 – 14 Days" },
      { label: "Defect Elimination", value: "Floating sorting" }
    ],
    details: "Farmers float freshly picked cherries in clean spring water. Dense, sugar-rich cherries sink to the bottom, while under-ripe or insect-damaged 'floaters' rise and are skimmed off."
  },
  {
    step: 3,
    id: "processing",
    title: "3. Post-Harvest Processing",
    subtitle: "Washed, Natural, Honey & Anaerobic",
    summary: "The critical juncture that determines 40% of the cup's final flavor profile. Seeds are separated from fruit flesh and dried to 10-12% moisture.",
    keyMetrics: [
      { label: "Target Moisture", value: "10% – 12%" },
      { label: "Drying Period", value: "12 – 30 Days" },
      { label: "Drying Surface", value: "Raised African Beds" }
    ],
    details: "Processing options include Washed (clean, crisp acidity), Natural (jammy fruit and winey body), Honey (balanced sweetness), and cutting-edge Anaerobic Fermentation inside sealed tanks."
  },
  {
    step: 4,
    id: "milling",
    title: "4. Dry Milling & Sorting",
    subtitle: "Hulling, Density & Optical Grading",
    summary: "Resting the dried parchment coffee ('reposo') for 30 to 60 days stabilizes moisture before hulling the protective cellulose husk.",
    keyMetrics: [
      { label: "Resting (Reposo)", value: "30 – 60 Days" },
      { label: "Screen Sizes", value: "Screen 14 to 18" },
      { label: "Defects Allowed", value: "Zero Category 1" }
    ],
    details: "Mechanical hullers remove parchment. Green beans are then sorted by size, passed through gravity density tables, and hand-sorted to eliminate insect damage, black beans, and foreign matter."
  },
  {
    step: 5,
    id: "roasting",
    title: "5. Thermodynamic Roasting",
    subtitle: "Maillard Chemistry & First Crack",
    summary: "Applying heat to rigid green seeds triggers non-enzymatic browning, transforming chlorogenic acids and sugars into over 800 aromatic compounds.",
    keyMetrics: [
      { label: "Charge Temp", value: "180°C – 200°C" },
      { label: "First Crack", value: "~196°C – 205°C" },
      { label: "Development Ratio", value: "12% – 18% DTR" }
    ],
    details: "Roasters craft time-temperature profiles to match bean density. Light roasts preserve terroir fruit acidity; medium roasts balance sweetness and body; dark roasts emphasize roast oils and smoky cacao."
  },
  {
    step: 6,
    id: "cupping",
    title: "6. Q-Grading & Cupping",
    subtitle: "SCA Sensory Scoring Protocol",
    summary: "Certified Q-Graders evaluate roasted samples on an objective 100-point scale assessing Fragrance, Flavor, Acidity, Body, Balance, and Cleanliness.",
    keyMetrics: [
      { label: "Specialty Cutoff", value: "80.0+ Points" },
      { label: "Water Temp", value: "93°C at Pour" },
      { label: "Steep Time", value: "4 Minutes to Break" }
    ],
    details: "At the ADDC3LL laboratory, cupping tables host farmer cooperatives, roasters, and students to grade lots, identify processing defects, and certify specialty lots for domestic and international markets."
  }
];

export default function FarmToCupView({ onOpenArticle }) {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = FARM_STEPS[activeStep];

  return (
    <div className="space-y-16 animate-fade-up max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Studio Editorial Header */}
      <StudioBanner
        topLeft="Module 02 · Processing & Roasting"
        topRight="ADDC3LL · Davao City"
        flankLeft="Harvest"
        flankRight="Roasting"
        title="FARM TO CUP"
        description="Follow the complete journey from highland agroforestry and selective cherry harvest through post-harvest processing, roast development, and cupping."
      />

      {/* Interactive Step-by-Step Stepper */}
      <section className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10">
        <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-oat text-umber px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] mb-2 border border-border">
              <Sprout size={13} className="text-caramel" /> Interactive 6-Stage Journey
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
              Six Stages of Production
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-full bg-oat hover:bg-border/60 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-espresso transition-colors border border-border"
            >
              Previous Stage
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(FARM_STEPS.length - 1, prev + 1))}
              disabled={activeStep === FARM_STEPS.length - 1}
              className="px-5 py-2 rounded-full bg-umber hover:bg-espresso disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white transition-colors"
            >
              Next Stage
            </button>
          </div>
        </div>

        {/* Horizontal Stepper Progress Indicator */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {FARM_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-espresso text-cream border-espresso shadow-md'
                    : 'bg-oat/70 hover:bg-oat text-espresso border-border'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isActive ? 'text-caramel' : 'text-roast'}`}>
                  Stage {step.step}
                </span>
                <span className="font-bold text-xs sm:text-sm line-clamp-1">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Step Details */}
        <div className="mt-8 bg-oat p-6 sm:p-10 rounded-3xl border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-roast">
                Stage {currentStep.step} of 6
              </span>
              <h3 className="text-3xl font-serif font-bold text-espresso">
                {currentStep.title}
              </h3>
              <p className="text-lg text-espresso/90 font-medium">
                {currentStep.summary}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {currentStep.details}
              </p>
            </div>

            {/* Key Metrics Card */}
            <div className="lg:col-span-5 bg-cream p-6 rounded-2xl border border-border space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                Key Production Benchmarks:
              </h4>
              <div className="space-y-3">
                {currentStep.keyMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-oat/70 border border-border text-xs sm:text-sm">
                    <span className="text-muted font-medium">{metric.label}</span>
                    <span className="font-bold text-espresso">{metric.value}</span>
                  </div>
                ))}
              </div>

              {currentStep.id === 'processing' && (
                <button
                  onClick={() => onOpenArticle('harvesting-processing')}
                  className="w-full mt-4 bg-espresso hover:bg-roast text-cream font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen size={14} className="text-caramel" />
                  <span>Read Deep Dive on Processing</span>
                </button>
              )}

              {currentStep.id === 'roasting' && (
                <button
                  onClick={() => onOpenArticle('roasting-science')}
                  className="w-full mt-4 bg-espresso hover:bg-roast text-cream font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen size={14} className="text-caramel" />
                  <span>Read Roasting Chemistry Article</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Post-Harvest Processing Comparison */}
      <section>
        <PostHarvestProcessGuide onOpenArticle={onOpenArticle} />
      </section>

      {/* Interactive Roast Stages & Flavor Curve */}
      <section>
        <RoastProfileGuide onOpenArticle={onOpenArticle} />
      </section>

      {/* Featured Articles for Farm to Cup */}
      <section className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => onOpenArticle('harvesting-processing')}
          className="group bg-cream text-espresso p-6 rounded-3xl border border-border cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-roast">Article</span>
            <h4 className="text-xl font-serif font-bold text-espresso mt-1 mb-2 group-hover:text-roast transition-colors">
              Post-Harvest Processing: Washed, Natural & Anaerobic
            </h4>
            <p className="text-sm text-muted line-clamp-3">
              Learn how enzymes, ambient yeast, and water treatment shape coffee sugars, creating sparkling clean acidity or wine-like strawberry notes.
            </p>
          </div>
          <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
            <span>Read full guide</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <div
          onClick={() => onOpenArticle('roasting-science')}
          className="group bg-cream text-espresso p-6 rounded-3xl border border-border cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-roast">Article</span>
            <h4 className="text-xl font-serif font-bold text-espresso mt-1 mb-2 group-hover:text-roast transition-colors">
              The Science of Coffee Roasting
            </h4>
            <p className="text-sm text-muted line-clamp-3">
              Explore the drying phase, non-enzymatic Maillard browning, exothermic First Crack, and development time ratio (DTR).
            </p>
          </div>
          <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-xs font-bold text-roast group-hover:text-espresso">
            <span>Read full guide</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </section>

    </div>
  );
}

