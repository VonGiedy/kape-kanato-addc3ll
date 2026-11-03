// app/components/interactive/CoffeeBean3DViewer.jsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, Rotate3d, Sparkles, ZoomIn, 
  Info, Eye, EyeOff, Play, Pause, Compass
} from 'lucide-react';

export default function CoffeeBean3DViewer({ onOpenArticle }) {
  const [rotation, setRotation] = useState({ x: -15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [exploded, setExploded] = useState(false);
  const [explosionProgress, setExplosionProgress] = useState(0); // 0 to 100
  const [selectedLayerKey, setSelectedLayerKey] = useState('seed');
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState('cherry'); // 'cherry' | 'bean'
  const containerRef = useRef(null);

  const LAYERS = [
    {
      id: "skin",
      name: "Exocarp (Skin)",
      fullName: "Exocarp (Outer Protective Skin)",
      color: "from-red-600 via-rose-700 to-red-950",
      solidColor: "#DC2626",
      zOffset: 160,
      thickness: "0.2 – 0.5 mm",
      sugarContent: "Low (Pigments & Waxes)",
      function: "Protective exterior barrier rich in anthocyanins and waxy cuticle that prevents premature water loss and insect infiltration.",
      roleInCup: "Color transformation from green to dark crimson signals optimal harvest timing (18°–24° Brix)."
    },
    {
      id: "pulp",
      name: "Mesocarp (Pulp)",
      fullName: "Mesocarp (Fleshy Fruit Pulp)",
      color: "from-amber-500 via-amber-600 to-amber-800",
      solidColor: "#F59E0B",
      zOffset: 110,
      thickness: "1.0 – 2.0 mm",
      sugarContent: "High (Fructose & Glucose)",
      function: "Nutrient-rich fruit flesh containing organic acids, simple sugars, and water that nourishes the embryonic seeds.",
      roleInCup: "In natural processing, this pulp slowly desiccates on sun beds, infusing the bean with intense berry and winey esters."
    },
    {
      id: "mucilage",
      name: "Pectin (Mucilage)",
      fullName: "Pectin / Mucilage Layer",
      color: "from-amber-200/90 via-amber-400 to-amber-600",
      solidColor: "#FDE68A",
      zOffset: 65,
      thickness: "0.5 – 1.0 mm",
      sugarContent: "Very High (Polysaccharides)",
      function: "A dense, viscous gelatinous layer that bonds tightly to the parchment. It is the primary biological substrate for fermentation.",
      roleInCup: "Yeasts and lactic acid bacteria digest these sugars, synthesizing volatile esters, malic acidity, and honey-like sweetness."
    },
    {
      id: "parchment",
      name: "Endocarp (Parchment)",
      fullName: "Endocarp (Cellulose Parchment Hull)",
      color: "from-stone-200 via-amber-100 to-stone-400",
      solidColor: "#D6D3D1",
      zOffset: 20,
      thickness: "0.1 – 0.2 mm",
      sugarContent: "Zero (Fiber & Cellulose)",
      function: "A rigid, protective cellulose hull that protects the bean throughout the critical 30 to 60-day resting period ('reposo').",
      roleInCup: "Shields internal green bean cellular structure from ambient moisture and oxidation until dry milling."
    },
    {
      id: "silverskin",
      name: "Spermoderm (Silverskin)",
      fullName: "Spermoderm (Silverskin Membrane)",
      color: "from-stone-100 via-stone-200 to-stone-300",
      solidColor: "#E7E5E4",
      zOffset: -25,
      thickness: "< 0.05 mm",
      sugarContent: "Trace (Antioxidants)",
      function: "An iridescent, ultra-thin cellular membrane hugging the endosperm seed.",
      roleInCup: "Desiccates and separates during roasting as 'chaff'. Must be removed by roaster air flow to prevent bitter smoky off-notes."
    },
    {
      id: "seed",
      name: "Endosperm (Green Bean)",
      fullName: "Endosperm (Specialty Green Coffee Bean)",
      color: "from-emerald-700 via-green-800 to-amber-950",
      solidColor: "#2F5233",
      zOffset: -70,
      thickness: "8.0 – 12.0 mm (Screen 15–18)",
      sugarContent: "6% – 9% Sucrose + 1.2% Caffeine",
      function: "The true botanical seed containing the embryo, proteins, chlorogenic acids, lipids, and sucrose that roast into coffee.",
      roleInCup: "The foundational core that determines aroma, origin terroir, body, and acidity."
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: (prev.y + 0.6) % 360
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Smooth explosion transition
  useEffect(() => {
    let animFrame;
    const target = exploded ? 100 : 0;
    const step = () => {
      setExplosionProgress(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.5) return target;
        return prev + diff * 0.15;
      });
      if (Math.abs(target - explosionProgress) > 0.5) {
        animFrame = requestAnimationFrame(step);
      }
    };
    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [exploded]);

  // Mouse / Touch Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.4)),
      y: (prev.y + dx * 0.4) % 360
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.4)),
      y: (prev.y + dx * 0.4) % 360
    }));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const activeLayer = LAYERS.find(l => l.id === selectedLayerKey) || LAYERS[5];

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-8 overflow-hidden select-none">
      
      {/* Top Header & Interactive Mode Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Layers size={14} className="text-caramel" />
            <span>Interactive 3D Botanical Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            3D Exploded Anatomy: Coffee Cherry & Bean
          </h2>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Drag to rotate in 3D space. Click <strong>Explode 3D Layers</strong> to separate the fruit shell, pulp, and mucilage from the inner coffee bean.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setExploded(!exploded)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
              exploded 
                ? 'bg-roast text-cream ring-2 ring-caramel' 
                : 'bg-espresso text-cream hover:bg-roast'
            }`}
          >
            <Layers size={14} className="text-caramel" />
            <span>{exploded ? "Assemble Cherry" : "Explode 3D Layers"}</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-oat text-espresso border-roast/40' 
                : 'bg-cream text-muted border-border hover:text-espresso'
            }`}
            title={autoRotate ? "Pause Orbit" : "Auto-Orbit"}
          >
            {autoRotate ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden sm:inline">{autoRotate ? "Orbiting" : "Orbit"}</span>
          </button>

          <button
            onClick={() => setRotation({ x: -15, y: 35 })}
            className="p-2.5 rounded-xl bg-oat hover:bg-border/60 text-muted hover:text-espresso border border-border text-xs font-bold transition-colors"
            title="Reset Angle"
          >
            <Rotate3d size={14} />
          </button>
        </div>
      </div>

      {/* 3D Stage & Telemetry Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left (7 Cols): Interactive 3D Viewport */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="lg:col-span-7 h-[420px] sm:h-[480px] bg-gradient-to-b from-espresso via-[#38261C] to-espresso rounded-3xl p-6 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border border-border/20 shadow-xl"
          style={{ perspective: "1200px" }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(185,133,86,0.18)_0%,_transparent_70%)] pointer-events-none" />

          {/* Interactive Floating Micro-particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-caramel/60 animate-pulse"
                style={{
                  top: `${(i * 19 + 7) % 90}%`,
                  left: `${(i * 23 + 13) % 90}%`,
                  animationDuration: `${3 + (i % 4)}s`
                }}
              />
            ))}
          </div>

          {/* 3D World Container */}
          <div
            className="relative transition-transform duration-75"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              width: "280px",
              height: "280px"
            }}
          >
            {/* RENDER ALL BOTANICAL LAYERS IN 3D SPACE */}
            {LAYERS.map((layer) => {
              const isSelected = selectedLayerKey === layer.id;
              // Compute dynamic Z separation based on explosion slider
              const factor = explosionProgress / 100;
              const dynamicZ = layer.zOffset * factor;
              const scale = 1 - Math.abs(layer.zOffset) * 0.0012 * (1 - factor);

              return (
                <div
                  key={layer.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLayerKey(layer.id);
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${dynamicZ}px) scale(${scale})`,
                    boxShadow: isSelected 
                      ? '0 0 35px rgba(220, 38, 38, 0.45), inset 0 0 25px rgba(255, 255, 255, 0.2)' 
                      : '0 20px 40px rgba(0,0,0,0.4)',
                    filter: isSelected ? 'brightness(1.15)' : 'none'
                  }}
                >
                  {/* Layer Outer Ring with Specular Sheen */}
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${layer.color} border-2 transition-all p-3 flex flex-col items-center justify-center relative ${
                      isSelected 
                        ? 'border-caramel ring-4 ring-caramel/30 scale-105' 
                        : 'border-white/20 hover:border-caramel/60'
                    }`}
                    style={{
                      opacity: exploded && !isSelected ? 0.75 : 0.95
                    }}
                  >
                    {/* Elliptical Coffee Bean Core (rendered on the innermost layer) */}
                    {layer.id === 'seed' && (
                      <div className="w-32 h-44 rounded-full bg-gradient-to-b from-[#2E5A36] via-[#1F3D24] to-[#122616] border-2 border-[#528F5D] flex items-center justify-center relative shadow-inner">
                        {/* Characteristic S-Curve Center Fissure */}
                        <div className="w-1.5 h-36 bg-[#0E1A10] rounded-full shadow-lg transform -rotate-3 relative">
                          <span className="absolute top-1/2 -left-1 w-3.5 h-6 rounded-full bg-[#182F1C]/80 -translate-y-1/2" />
                        </div>
                        <span className="absolute bottom-4 text-[9px] font-mono uppercase tracking-widest text-emerald-300/80 font-bold">
                          Twin Endosperm
                        </span>
                      </div>
                    )}

                    {/* Silverskin Chaff Membrane */}
                    {layer.id === 'silverskin' && (
                      <div className="w-36 h-48 rounded-full border border-dashed border-stone-300/60 bg-stone-100/10 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[9px] font-mono uppercase text-stone-200 tracking-wider font-semibold">
                          Spermoderm
                        </span>
                      </div>
                    )}

                    {/* Parchment Hull Texture */}
                    {layer.id === 'parchment' && (
                      <div className="w-44 h-56 rounded-full border-2 border-stone-300/70 bg-stone-300/20 backdrop-blur-xs flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-mono uppercase font-bold text-stone-200 tracking-wider">
                          Cellulose Pergamino
                        </span>
                      </div>
                    )}

                    {/* Mucilage Gelatinous Glisten */}
                    {layer.id === 'mucilage' && (
                      <div className="w-52 h-64 rounded-full border border-amber-300/50 bg-amber-400/20 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-200 tracking-wider">
                          Sugar Mucilage
                        </span>
                      </div>
                    )}

                    {/* Pulp Texture */}
                    {layer.id === 'pulp' && (
                      <div className="w-60 h-72 rounded-full border-2 border-amber-500/40 bg-amber-600/30 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-100 tracking-wider">
                          Fleshy Mesocarp
                        </span>
                      </div>
                    )}

                    {/* Skin Badge */}
                    {layer.id === 'skin' && (
                      <div className="absolute top-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold text-cream tracking-wider uppercase">
                        Exocarp Shell
                      </div>
                    )}

                    {/* Floating 3D Depth Tag when exploded */}
                    {exploded && (
                      <div 
                        className="absolute -right-24 bg-espresso/90 text-cream px-2.5 py-1 rounded-lg border border-caramel/50 text-[10px] font-mono font-bold shadow-xl pointer-events-none whitespace-nowrap"
                        style={{
                          transform: `translateZ(20px)`
                        }}
                      >
                        {layer.name}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Viewport Telemetry Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-oat/70 pointer-events-none">
            <div className="flex items-center gap-2 bg-espresso/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <Compass size={13} className="text-caramel" />
              <span>Rotation: X:{Math.round(rotation.x)}° Y:{Math.round(rotation.y)}°</span>
            </div>
            <div className="bg-espresso/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono text-[10px] text-caramel">
              Drag to Inspect 360°
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Layer Deep-Dive Telemetry Card */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Layer Selector Chips */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
              Select Anatomical Layer:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LAYERS.map((layer) => {
                const isSelected = selectedLayerKey === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerKey(layer.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-espresso text-cream border-espresso shadow-md ring-2 ring-caramel'
                        : 'bg-oat text-espresso border-border hover:bg-border/60'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs" 
                      style={{ backgroundColor: layer.solidColor }} 
                    />
                    <span className="truncate">{layer.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Scientific Card */}
          <div className="bg-oat p-6 rounded-3xl border border-border space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-roast block mb-1">
                Botanical Cross-Section Analysis
              </span>
              <h3 className="font-serif font-bold text-2xl text-espresso">
                {activeLayer.fullName}
              </h3>
            </div>

            {/* Micro Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-cream p-3 rounded-xl border border-border">
                <span className="text-[10px] uppercase font-bold text-muted block">Physical Thickness</span>
                <span className="font-bold text-espresso font-mono mt-0.5 block">{activeLayer.thickness}</span>
              </div>
              <div className="bg-cream p-3 rounded-xl border border-border">
                <span className="text-[10px] uppercase font-bold text-muted block">Sugar Composition</span>
                <span className="font-bold text-roast font-mono mt-0.5 block">{activeLayer.sugarContent}</span>
              </div>
            </div>

            {/* Biological Function */}
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-espresso font-bold block">Biological Function:</strong>
              <p className="text-muted leading-relaxed">{activeLayer.function}</p>
            </div>

            {/* Post-Harvest Significance */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
              <strong className="font-bold block text-amber-900">Significance in Specialty Processing:</strong>
              <p className="leading-relaxed text-espresso/90">{activeLayer.roleInCup}</p>
            </div>

            {/* Article Link */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted">Botanical Genus: <strong>Coffea</strong></span>
              {onOpenArticle && (
                <button
                  onClick={() => onOpenArticle('what-is-coffee')}
                  className="font-bold text-roast hover:underline flex items-center gap-1"
                >
                  Read Full Anatomy Article
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
