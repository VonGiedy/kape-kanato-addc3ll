// app/components/interactive/CoffeeCherryAnatomy.jsx
"use client";
import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const LAYERS = [
  {
    id: "skin",
    shortName: "Exocarp",
    name: "Exocarp (Outer Skin)",
    ringColor: "#9E2A2B",
    fillColor: "#B23A3B",
    thickness: "0.2 – 0.5 mm",
    composition: "Anthocyanins & natural waxes",
    description:
      "The protective outer fruit skin. As a coffee cherry matures over 8–9 months, chlorophyll breaks down and anthocyanin pigments shift the skin from green to deep crimson red or yellow.",
    cupImpact:
      "Harvesting only deep red, ripe cherries ensures full sugar development and prevents grassy or astringent cup defects."
  },
  {
    id: "pulp",
    shortName: "Mesocarp",
    name: "Mesocarp (Fruit Pulp)",
    ringColor: "#D97724",
    fillColor: "#E59846",
    thickness: "1.0 – 2.0 mm",
    composition: "Water, fructose, glucose & organic acids",
    description:
      "The sweet, fleshy cherry fruit beneath the skin. In washed coffees this pulp is mechanically removed within hours of harvest; in natural coffees it dries intact around the seed.",
    cupImpact:
      "Leaving the pulp intact during slow bed drying adds jammy berry sweetness, fuller body, and ripe fruit aromatics."
  },
  {
    id: "mucilage",
    shortName: "Mucilage",
    name: "Pectin Layer (Mucilage)",
    ringColor: "#E9C46A",
    fillColor: "#F3D992",
    thickness: "0.5 – 1.0 mm",
    composition: "Pectin & natural sugars (high Brix)",
    description:
      "A dense, sticky gelatinous coating clinging tightly to the parchment shell. During fermentation, yeasts and lactic acid bacteria break down these sugars before washing.",
    cupImpact:
      "Controls clean acidity vs. honey sweetness; retaining thin mucilage yields Honey Process characteristics."
  },
  {
    id: "parchment",
    shortName: "Parchment",
    name: "Endocarp (Parchment Hull)",
    ringColor: "#C8B89A",
    fillColor: "#E4D8C1",
    thickness: "0.1 – 0.2 mm",
    composition: "Dry cellulose fiber",
    description:
      "A crisp, paper-like protective husk dried down to 10–12% moisture and left around the seed during storage ('reposo') for 30–60 days before milling.",
    cupImpact:
      "Protects the green bean from humidity fluctuations, mold, and staleness prior to hulling and roasting."
  },
  {
    id: "silverskin",
    shortName: "Silverskin",
    name: "Spermoderm (Silverskin)",
    ringColor: "#D5CEC3",
    fillColor: "#F2EDE4",
    thickness: "< 0.05 mm",
    composition: "Fine cellular membrane & fiber",
    description:
      "An ultra-thin papery membrane pressed closely against the green seed. During roasting, moisture escapes and flakes the silverskin off as aromatic 'chaff'.",
    cupImpact:
      "Roasters remove separated chaff cleanly with drum airflow to keep the finished cup sweet and free of ashiness."
  },
  {
    id: "seed",
    shortName: "Endosperm",
    name: "Endosperm (Coffee Bean)",
    ringColor: "#466346",
    fillColor: "#638462",
    thickness: "8.0 – 12.0 mm",
    composition: "Sucrose (6–9%), lipids, chlorogenic acids & caffeine",
    description:
      "Typically occurring as twin flat-sided seeds pressed together inside the cherry (or a single oval 'Peaberry' ~5% of the time), this dense seed is what we roast and brew.",
    cupImpact:
      "Holds all aromatic precursors that caramelize and brown during roasting into your cup's flavor and aroma."
  }
];

export default function CoffeeCherryAnatomy({ onOpenArticle }) {
  const [selectedId, setSelectedId] = useState("seed");
  const activeLayer = LAYERS.find((l) => l.id === selectedId) || LAYERS[5];

  return (
    <div className="bg-cream text-espresso rounded-[2rem] border border-border p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-umber block mb-1.5">
            Botanical Diagram
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-espresso tracking-tight">
            Anatomy of a Coffee Cherry
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
            Click any layer in the cross-section below to inspect how each part of the coffee fruit contributes to processing and final cup quality.
          </p>
        </div>

        {onOpenArticle && (
          <button
            onClick={() => onOpenArticle("what-is-coffee")}
            className="inline-flex items-center gap-2 text-xs font-bold text-espresso bg-oat hover:bg-border/50 px-4 py-2.5 rounded-full border border-border transition-colors shrink-0 self-start md:self-auto"
          >
            <BookOpen size={14} className="text-umber" />
            <span>Read Botanical Guide</span>
          </button>
        )}
      </div>

      {/* Main Content Grid: Clean 2D Cross-Section + Layer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left (6 cols): Simple Clean SVG Cross-Section */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-oat/70 rounded-3xl p-6 sm:p-8 border border-border">
          <svg
            viewBox="0 0 360 360"
            className="w-full max-w-[320px] h-auto select-none"
            role="img"
            aria-label="Cross section diagram of a ripe coffee cherry"
          >
            {/* Outer Skin (Exocarp) */}
            <circle
              cx="180"
              cy="180"
              r="156"
              fill={LAYERS[0].fillColor}
              stroke={selectedId === "skin" ? "#1E140E" : LAYERS[0].ringColor}
              strokeWidth={selectedId === "skin" ? "5" : "2"}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedId("skin")}
            />

            {/* Mesocarp Pulp */}
            <circle
              cx="180"
              cy="180"
              r="138"
              fill={LAYERS[1].fillColor}
              stroke={selectedId === "pulp" ? "#1E140E" : LAYERS[1].ringColor}
              strokeWidth={selectedId === "pulp" ? "5" : "2"}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedId("pulp")}
            />

            {/* Pectin Mucilage */}
            <circle
              cx="180"
              cy="180"
              r="112"
              fill={LAYERS[2].fillColor}
              stroke={selectedId === "mucilage" ? "#1E140E" : LAYERS[2].ringColor}
              strokeWidth={selectedId === "mucilage" ? "5" : "2"}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedId("mucilage")}
            />

            {/* Endocarp Parchment */}
            <ellipse
              cx="180"
              cy="180"
              rx="88"
              ry="94"
              fill={LAYERS[3].fillColor}
              stroke={selectedId === "parchment" ? "#1E140E" : LAYERS[3].ringColor}
              strokeWidth={selectedId === "parchment" ? "5" : "2"}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedId("parchment")}
            />

            {/* Spermoderm Silverskin */}
            <ellipse
              cx="180"
              cy="180"
              rx="74"
              ry="80"
              fill={LAYERS[4].fillColor}
              stroke={selectedId === "silverskin" ? "#1E140E" : LAYERS[4].ringColor}
              strokeWidth={selectedId === "silverskin" ? "5" : "2"}
              strokeDasharray="4 3"
              className="cursor-pointer transition-all"
              onClick={() => setSelectedId("silverskin")}
            />

            {/* Twin Green Endosperm Seeds (Left & Right halves) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedId("seed")}
            >
              {/* Left Seed Half */}
              <path
                d="M 174 114 C 138 114, 120 144, 120 180 C 120 216, 138 246, 174 246 Z"
                fill={LAYERS[5].fillColor}
                stroke={selectedId === "seed" ? "#1E140E" : LAYERS[5].ringColor}
                strokeWidth={selectedId === "seed" ? "4" : "2"}
              />
              {/* Right Seed Half */}
              <path
                d="M 186 114 C 222 114, 240 144, 240 180 C 240 216, 222 246, 186 246 Z"
                fill={LAYERS[5].fillColor}
                stroke={selectedId === "seed" ? "#1E140E" : LAYERS[5].ringColor}
                strokeWidth={selectedId === "seed" ? "4" : "2"}
              />
              {/* Subtle center crease detail on seeds */}
              <path
                d="M 152 145 Q 160 180 152 215"
                fill="none"
                stroke="#324B32"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 208 145 Q 200 180 208 215"
                fill="none"
                stroke="#324B32"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Clean Label Callout inside top edge */}
            <text
              x="180"
              y="344"
              textAnchor="middle"
              fill="#6B5A4D"
              fontSize="11"
              fontWeight="600"
            >
              Tap any ring to inspect layer
            </text>
          </svg>
        </div>

        {/* Right (6 cols): Layer Selector Pills & Clear Information */}
        <div className="lg:col-span-6 space-y-5">
          {/* Layer Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LAYERS.map((layer, index) => {
              const isSelected = layer.id === selectedId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedId(layer.id)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-espresso text-cream border-espresso font-bold shadow-sm"
                      : "bg-oat text-espresso border-border hover:bg-border/50 font-semibold"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-black/15"
                    style={{ backgroundColor: layer.fillColor }}
                  />
                  <span className="truncate">
                    {index + 1}. {layer.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Details Card */}
          <div className="bg-oat p-6 sm:p-7 rounded-3xl border border-border space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-umber font-bold block mb-1">
                Layer Details
              </span>
              <h3 className="font-serif font-bold text-2xl text-espresso">
                {activeLayer.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-cream p-3 rounded-xl border border-border">
                <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">
                  Typical Thickness
                </span>
                <span className="font-mono font-bold text-espresso">
                  {activeLayer.thickness}
                </span>
              </div>
              <div className="bg-cream p-3 rounded-xl border border-border">
                <span className="text-[10px] uppercase font-bold text-muted block mb-0.5">
                  Primary Composition
                </span>
                <span className="font-semibold text-umber">
                  {activeLayer.composition}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-espresso/90 leading-relaxed">
              {activeLayer.description}
            </p>

            <div className="p-4 bg-cream rounded-2xl border border-border text-xs space-y-1">
              <span className="font-bold text-umber uppercase tracking-wider text-[10px] block">
                Role in Your Cup
              </span>
              <p className="text-muted leading-relaxed">{activeLayer.cupImpact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

