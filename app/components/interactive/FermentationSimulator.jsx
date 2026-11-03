// app/components/interactive/FermentationSimulator.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Droplets, Play, Pause, RotateCcw, Sparkles, 
  FlaskConical, ArrowRight, Gauge, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';

const METHODS = [
  {
    id: "anaerobic",
    name: "Anaerobic Maceration (ADDC3LL Tank)",
    badge: "Cutting-Edge Innovation",
    tankType: "Stainless Steel Sealed Bioreactor",
    desc: "Cherries sealed in oxygen-free tanks with a one-way airlock valve. Indigenous yeasts synthesize exotic tropical esters and bright malic acidity.",
    targetHours: 48,
    optimalPh: "3.85 – 4.10",
    flavorEsters: ["Ethyl Hexanoate (Pineapple)", "Isoamyl Acetate (Banana)", "Malic Acid (Green Apple)"],
    colorBg: "bg-indigo-900/10 border-indigo-300"
  },
  {
    id: "washed",
    name: "Washed / Wet Fermentation",
    badge: "Classic Cleanliness",
    tankType: "Open Concrete / Tile Fermentation Tank",
    desc: "Depulped parchment soaked in cool mountain spring water. Pectinase enzymes digest mucilage cleanly over 18 to 24 hours.",
    targetHours: 24,
    optimalPh: "4.20 – 4.50",
    flavorEsters: ["Citric Acid (Lemon)", "Lactic Acid (Silky Body)", "Floral Terpenes (Jasmine)"],
    colorBg: "bg-emerald-900/10 border-emerald-300"
  },
  {
    id: "honey",
    name: "Controlled Honey Processing",
    badge: "Balanced Sweetness",
    tankType: "Demucilaged Raised Bed Aerobic",
    desc: "Pulp removed while sticky mucilage remains on the parchment during controlled shaded dehydration.",
    targetHours: 36,
    optimalPh: "4.30 – 4.60",
    flavorEsters: ["Sucrose Caramels (Honey)", "Fructose (Brown Sugar)", "Stone Fruit (Peach)"],
    colorBg: "bg-amber-900/10 border-amber-300"
  },
  {
    id: "natural",
    name: "Whole Cherry Extended Natural",
    badge: "High Fruit Complexity",
    tankType: "Sealed Cherry Chamber / African Beds",
    desc: "Intact ripe cherries ferment slowly within their own skins before bed desiccation, maximizing jammy body.",
    targetHours: 72,
    optimalPh: "3.90 – 4.20",
    flavorEsters: ["Winey Esters (Strawberry)", "Blueberry Ketones", "Dark Chocolate Cacao"],
    colorBg: "bg-rose-900/10 border-rose-300"
  }
];

export default function FermentationSimulator({ onOpenArticle }) {
  const [selectedMethodId, setSelectedMethodId] = useState("anaerobic");
  const [hours, setHours] = useState(0); // 0 to 72 hours
  const [isRunning, setIsRunning] = useState(false);
  const [tankTemp, setTankTemp] = useState(19); // 14°C to 28°C
  const [bubbles, setBubbles] = useState([]);

  const activeMethod = METHODS.find(m => m.id === selectedMethodId) || METHODS[0];

  // Dynamic bubble particles for fermentation tank
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setBubbles(prev => [
        ...prev.slice(-15),
        {
          id: Math.random(),
          left: Math.random() * 80 + 10,
          size: Math.random() * 6 + 4,
          speed: Math.random() * 1.5 + 1.2
        }
      ]);
    }, 350);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Hourly progression simulation
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setHours(prev => {
        if (prev >= 72) {
          setIsRunning(false);
          return 72;
        }
        return prev + 1;
      });
    }, 400); // 1 hour every 400ms
    return () => clearInterval(interval);
  }, [isRunning]);

  // Biochemical Kinetics Calculations
  // pH starts around 5.8 and drops as lactic and acetic acids are produced
  const calculatePh = (hr) => {
    const rate = (tankTemp / 20) * 0.032;
    const ph = 5.80 - (hr * rate);
    return Math.max(3.50, ph).toFixed(2);
  };

  // Brix starts at 22.0° and drops as microbes consume sugars
  const calculateBrix = (hr) => {
    const consumptionRate = (tankTemp / 20) * 0.16;
    const brix = 22.0 - (hr * consumptionRate);
    return Math.max(8.5, brix).toFixed(1);
  };

  // Yeast and Bacteria populations (log CFU/g)
  const calculateMicrobes = (hr) => {
    const yeast = Math.min(8.6, 4.2 + Math.log10(hr + 1) * 2.3).toFixed(1);
    const lab = Math.min(9.1, 3.8 + Math.log10(hr + 1) * 2.8).toFixed(1);
    return { yeast, lab };
  };

  const currentPh = calculatePh(hours);
  const currentBrix = calculateBrix(hours);
  const microbes = calculateMicrobes(hours);

  // Quality Status based on target hours and pH
  const getFermentationStatus = () => {
    if (hours === 0) return { label: "Inoculation / Batch Loaded", color: "text-muted", isSafe: true };
    if (hours < activeMethod.targetHours * 0.5) return { label: "Active Lag Phase", color: "text-blue-600", isSafe: true };
    if (hours <= activeMethod.targetHours * 1.1) return { label: "Optimal Fermentation Window", color: "text-emerald-600", isSafe: true };
    if (Number(currentPh) < 3.70) return { label: "Risk: Over-fermentation (Acetic Vinegar)", color: "text-red-600", isSafe: false };
    return { label: "Extended Ferment (Winey / Heavy)", color: "text-amber-600", isSafe: true };
  };

  const status = getFermentationStatus();

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-8 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FlaskConical size={14} className="text-caramel" />
            <span>ADDC3LL Fermentation Science</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Post-Harvest Fermentation Kinetics
          </h2>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Explore how microbiological activity in sealed tanks or washed channels metabolizes coffee mucilage sugars, lowers pH, and produces specialty aroma precursors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
              isRunning 
                ? 'bg-amber-600 text-cream hover:bg-amber-700' 
                : 'bg-espresso text-cream hover:bg-roast'
            }`}
          >
            {isRunning ? <Pause size={15} /> : <Play size={15} />}
            <span>{isRunning ? "Pause Tank" : hours === 0 ? "Start Fermentation" : "Resume"}</span>
          </button>

          <button
            onClick={() => { setIsRunning(false); setHours(0); }}
            className="p-2.5 rounded-xl bg-oat hover:bg-border/60 text-muted hover:text-espresso border border-border text-xs font-bold transition-colors"
            title="Reset Tank"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Method Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {METHODS.map((method) => {
          const isSelected = selectedMethodId === method.id;
          return (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethodId(method.id);
                setHours(0);
                setIsRunning(false);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-espresso text-cream border-espresso shadow-md ring-2 ring-caramel'
                  : 'bg-oat text-espresso border-border hover:bg-border/60'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isSelected ? 'text-caramel' : 'text-roast'}`}>
                {method.badge}
              </span>
              <span className="font-bold text-xs sm:text-sm line-clamp-1">
                {method.name.split(' ')[0]} {method.name.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Tank Simulator & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (7 cols): Animated Bioreactor Tank */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#1E262C] via-[#141B20] to-[#0D1216] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          {/* Top Tank Valve and Airlock */}
          <div className="flex items-center justify-between text-xs z-10">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Droplets size={14} className="text-blue-400" />
              <span className="font-mono text-cream font-bold">{hours}h Elapsed</span>
              <span className="text-stone-500">/</span>
              <span className="text-caramel font-semibold">{activeMethod.targetHours}h Target</span>
            </div>

            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-[11px] text-stone-300">
              CO₂ Airlock: <span className="text-emerald-400 font-bold">{isRunning ? "Bubbling Active" : "Static"}</span>
            </div>
          </div>

          {/* Central Tank Cutaway with Liquid & Micro-bubbles */}
          <div className="relative py-6 flex items-center justify-center">
            
            {/* Stainless Steel Tank Body */}
            <div className="w-64 sm:w-80 h-64 sm:h-72 rounded-3xl border-4 border-stone-600 bg-gradient-to-b from-stone-800/80 via-stone-900 to-black relative overflow-hidden shadow-2xl flex flex-col justify-end p-4">
              
              {/* Top Liquid Level Line */}
              <div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-amber-950/90 via-amber-800/60 to-amber-700/40 border-t-2 border-amber-400/60 transition-all duration-700 flex flex-col justify-end overflow-hidden"
                style={{
                  height: "78%"
                }}
              >
                {/* Microscopic Yeast & Bacteria Spec Dots */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-amber-200 animate-pulse"
                      style={{
                        top: `${(i * 17 + 10) % 90}%`,
                        left: `${(i * 23 + 5) % 90}%`,
                        animationDuration: `${1.5 + (i % 3)}s`
                      }}
                    />
                  ))}
                </div>

                {/* Animated Rising CO2 Gas Bubbles */}
                {bubbles.map((b) => (
                  <span
                    key={b.id}
                    className="absolute rounded-full bg-white/40 border border-white/60 animate-bounce pointer-events-none"
                    style={{
                      left: `${b.left}%`,
                      bottom: "10%",
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      animationDuration: `${b.speed}s`
                    }}
                  />
                ))}

                {/* Submerged Coffee Cherries / Parchment Seeds */}
                <div className="grid grid-cols-4 gap-3 p-3 opacity-90">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-6 rounded-full bg-gradient-to-br from-amber-700 to-rose-950 border border-amber-300/40 shadow-md transform rotate-12 flex items-center justify-center"
                    >
                      <div className="w-0.5 h-3.5 bg-black/30 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tank Sight Glass Measurement Marks */}
              <div className="absolute left-2 inset-y-6 w-3 border-r border-white/20 flex flex-col justify-between text-[8px] font-mono text-stone-400 pointer-events-none">
                <span>100L</span>
                <span>75L</span>
                <span>50L</span>
                <span>25L</span>
              </div>

              {/* ADDC3LL Bioreactor Stencil Badge */}
              <div className="absolute top-4 right-4 bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-caramel uppercase">
                AdDC3LL · Tank 01
              </div>

            </div>

          </div>

          {/* Bottom Live Kinetics Sensor Panel */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-cream z-10">
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">pH Level</span>
              <span className={`font-mono text-xl font-bold ${Number(currentPh) < 3.7 ? 'text-red-400' : 'text-emerald-400'}`}>
                {currentPh} pH
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Sugar Density</span>
              <span className="font-mono text-xl font-bold text-amber-300">
                {currentBrix}° Brix
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Microbe Load</span>
              <span className="font-mono text-xs font-bold text-caramel mt-1 block">
                Y:{microbes.yeast} | LAB:{microbes.lab}
              </span>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Temperature Slider, Chemical Output & Notes */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Alert Banner */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs ${
            status.isSafe ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            {status.isSafe ? <ShieldCheck size={18} className="text-emerald-600 shrink-0" /> : <AlertTriangle size={18} className="text-red-600 shrink-0" />}
            <div>
              <strong className="block font-bold">{status.label}</strong>
              <span className="text-[11px] opacity-80">
                {status.isSafe 
                  ? `Active metabolic phase at ${tankTemp}°C controlled temperature.` 
                  : `Acidity too severe! Discharge batch immediately to prevent vinegar defect.`}
              </span>
            </div>
          </div>

          {/* Temperature Regulation Slider */}
          <div className="bg-oat p-5 rounded-3xl border border-border space-y-3">
            <div className="flex justify-between text-xs font-bold text-espresso">
              <span>Chamber Temperature Control</span>
              <span className="font-mono text-roast">{tankTemp}°C (Optimal: 18°–21°C)</span>
            </div>
            <input
              type="range"
              min="14"
              max="28"
              value={tankTemp}
              onChange={(e) => setTankTemp(Number(e.target.value))}
              className="w-full accent-roast bg-border h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-muted">
              Higher temperatures accelerate fermentation kinetics but increase the risk of uncontrolled bacterial spikes.
            </p>
          </div>

          {/* Volatile Esters & Aromatic Compounds Produced */}
          <div className="bg-cream p-5 rounded-3xl border border-border space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-roast flex items-center gap-1.5">
              <Sparkles size={14} className="text-caramel" /> Synthesized Aromatic Esters
            </span>
            <div className="space-y-2">
              {activeMethod.flavorEsters.map((ester, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-oat border border-border text-xs">
                  <span className="font-medium text-espresso">{ester.split(' (')[0]}</span>
                  <span className="font-bold text-roast font-mono text-[11px]">({ester.split(' (')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Method Context & Article Link */}
          <div className="p-4 bg-oat rounded-2xl border border-border text-xs space-y-2">
            <strong className="text-espresso font-bold block">{activeMethod.name}</strong>
            <p className="text-muted leading-relaxed">{activeMethod.desc}</p>
            {onOpenArticle && (
              <button
                onClick={() => onOpenArticle('harvesting-processing')}
                className="font-bold text-roast hover:underline flex items-center gap-1 pt-1"
              >
                Read Full Processing Study <ArrowRight size={13} />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
