// app/components/interactive/Roaster3DSimulator.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Play, Pause, RotateCcw, Volume2, VolumeX, 
  Wind, Thermometer, Sparkles, Award, ArrowRight, Gauge, CheckCircle2
} from 'lucide-react';

export default function Roaster3DSimulator({ onOpenArticle }) {
  const [isRunning, setIsRunning] = useState(false);
  const [simSpeed, setSimSpeed] = useState(2); // 1x, 2x, 5x
  const [seconds, setSeconds] = useState(0); // Roasting elapsed seconds (0 to 720 = 12 mins)
  const [gasPower, setGasPower] = useState(75); // 0 - 100%
  const [airflow, setAirflow] = useState(50); // 0 - 100%
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [coolingTimer, setCoolingTimer] = useState(0);

  // Audio Context ref
  const audioCtxRef = useRef(null);
  const lastCrackTimeRef = useRef(0);

  // Initialize Web Audio context for First Crack pops
  const playCrackSound = (type = 'first') => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp popping snap sound
      const freq = type === 'first' ? 400 + Math.random() * 300 : 800 + Math.random() * 400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(type === 'first' ? 600 : 1200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio playback error", e);
    }
  };

  // Thermodynamic Calculation based on time & burner power
  // Models standard S-curve roast: Charge (200°C) -> Turning point (~92°C at 1:15) -> Rise
  const calculateTemperature = (sec) => {
    if (sec <= 0) return 200; // Charge temp
    if (sec < 75) {
      // Turning point dip down to ~92°C
      const progress = sec / 75;
      return Math.round(200 - (108 * Math.sin((progress * Math.PI) / 2)));
    }
    // Climbing curve from 92°C upward influenced by gasPower
    const climbTime = sec - 75;
    const baseSlope = (gasPower / 75) * 0.23;
    const temp = 92 + Math.pow(climbTime, 0.88) * (baseSlope * 1.85);
    return Math.min(245, Math.round(temp));
  };

  const currentTemp = calculateTemperature(seconds);

  // Rate of Rise (RoR in °C/min)
  const calculateRoR = (sec) => {
    if (sec < 75) return "-18.5";
    const tNow = calculateTemperature(sec);
    const tPrev = calculateTemperature(Math.max(0, sec - 15));
    const ror = ((tNow - tPrev) / 15) * 60;
    return Math.max(0, ror).toFixed(1);
  };

  const ror = calculateRoR(seconds);

  // Phase Determination
  const getPhase = (temp, sec) => {
    if (sec === 0) return { name: "Pre-Heat & Charge", color: "text-amber-500", desc: "Green coffee dropped into pre-heated drum." };
    if (sec < 75) return { name: "Turning Point (Dip)", color: "text-blue-500", desc: "Cold beans absorb ambient drum heat (endothermic)." };
    if (temp < 155) return { name: "Drying Phase", color: "text-amber-600", desc: "Moisture evaporates from ~11% down to 5%. Fresh grass aroma." };
    if (temp < 196) return { name: "Maillard & Yellowing", color: "text-amber-700", desc: "Amino acids and sugars recombine. Bread and toasty notes." };
    if (temp <= 205) return { name: "First Crack (Exothermic)", color: "text-red-500", desc: "Water vapor pressure bursts cell walls with popping sound!" };
    if (temp < 224) return { name: "Development (DTR)", color: "text-caramel", desc: "Sugar caramelization & balance between acidity and sweetness." };
    return { name: "Second Crack (Pyrolysis)", color: "text-stone-800", desc: "Oils migrate to surface. Smoky, dark cacao, roasty bitter." };
  };

  const phase = getPhase(currentTemp, seconds);

  // Bean Color Interpolation
  const getBeanVisual = (temp) => {
    if (temp < 110) return { color: "#6A7B5E", name: "Pale Jade Green", status: "Raw Green" };
    if (temp < 145) return { color: "#A8A36E", name: "Yellowish Green", status: "Drying" };
    if (temp < 170) return { color: "#CBB17A", name: "Cinnamon / Yellow", status: "Maillard" };
    if (temp < 196) return { color: "#A37446", name: "Light Tan Brown", status: "Pre-Crack" };
    if (temp < 205) return { color: "#7B4D2C", name: "City Light Brown", status: "First Crack" };
    if (temp < 216) return { color: "#54331C", name: "Medium Chestnut", status: "Full City" };
    if (temp < 228) return { color: "#361D0F", name: "Deep Dark Brown", status: "Vienna / French" };
    return { color: "#1C0F08", name: "Espresso Black", status: "Italian / Carbon" };
  };

  const beanVisual = getBeanVisual(currentTemp);

  // Timer Tick
  useEffect(() => {
    if (!isRunning || dropped) return;
    const interval = setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        // Trigger First Crack sound effects randomly between 196°C and 205°C
        const temp = calculateTemperature(next);
        if (temp >= 196 && temp <= 206) {
          if (Date.now() - lastCrackTimeRef.current > 400 && Math.random() < 0.45) {
            playCrackSound('first');
            lastCrackTimeRef.current = Date.now();
          }
        } else if (temp >= 225 && Math.random() < 0.3) {
          playCrackSound('second');
          lastCrackTimeRef.current = Date.now();
        }
        if (next >= 720) {
          setIsRunning(false);
          return 720;
        }
        return next;
      });
    }, 1000 / simSpeed);

    return () => clearInterval(interval);
  }, [isRunning, simSpeed, dropped, gasPower]);

  // Cooling timer after drop
  useEffect(() => {
    if (!dropped) return;
    const coolInt = setInterval(() => {
      setCoolingTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(coolInt);
  }, [dropped]);

  // Reset function
  const handleReset = () => {
    setIsRunning(false);
    setDropped(false);
    setSeconds(0);
    setCoolingTimer(0);
  };

  // Drop roast (discharge beans)
  const handleDrop = () => {
    setIsRunning(false);
    setDropped(true);
  };

  // Format MM:SS
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate Agtron & Cup Evaluation upon Drop
  const getCuppingProfile = (finalTemp, finalSeconds) => {
    const dtr = finalSeconds > 450 ? Math.round(((finalSeconds - 450) / finalSeconds) * 100) : 0;
    if (finalTemp < 196) {
      return {
        level: "Underdeveloped / Baked",
        agtron: "Agtron 95+",
        dtr: `${dtr}%`,
        flavor: "Grassy, peanut, severe sourness, astringent lingering finish.",
        bestFor: "Defect batch. Inadequate development time.",
        badgeColor: "bg-amber-800/80"
      };
    }
    if (finalTemp <= 204) {
      return {
        level: "Light Roast (Nordic / City Roast)",
        agtron: "Agtron 75 – 85",
        dtr: `${dtr}%`,
        flavor: "Vibrant citric acidity (mandarin orange, bergamot), floral jasmine, delicate honey sweetness.",
        bestFor: "Specialty high-altitude Arabica (Mt. Apo, Atok Benguet) for V60 pour-over.",
        badgeColor: "bg-amber-600"
      };
    }
    if (finalTemp <= 216) {
      return {
        level: "Medium Roast (City+ / Full City)",
        agtron: "Agtron 55 – 65",
        dtr: `${dtr}%`,
        flavor: "Ripe red berries, milk chocolate, toffee caramel, balanced malic acidity, silky mouthfeel.",
        bestFor: "Versatile all-around profile. Excellent for flat whites, Aeropress, and batch brew.",
        badgeColor: "bg-roast"
      };
    }
    if (finalTemp <= 226) {
      return {
        level: "Medium-Dark Roast (Full City+)",
        agtron: "Agtron 40 – 50",
        dtr: `${dtr}%`,
        flavor: "Bittersweet dark cacao, roasted almond, molasses, low acidity, heavy dense crema.",
        bestFor: "Traditional espresso blends, cold brew concentrate, moka pot.",
        badgeColor: "bg-espresso"
      };
    }
    return {
      level: "Dark / Italian Roast (Vienna)",
      agtron: "Agtron 25 – 35",
      dtr: `${dtr}%`,
      flavor: "Smoky wood, pipe tobacco, dark bakers chocolate, syrupy oily body, roast bitterness.",
      bestFor: "Traditional Kapeng Barako (Liberica) with brown sugar, iced Vietnamese-style coffee.",
      badgeColor: "bg-black"
    };
  };

  const cuppingResult = getCuppingProfile(currentTemp, seconds);

  return (
    <div className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-oat text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Flame size={14} className="text-caramel" />
            <span>Interactive Roaster Thermodynamics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            3D Drum Roaster & Kinetic Profile Simulator
          </h2>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Simulate the thermodynamic transformation of green coffee into specialty roast profiles. Hear First Crack popping, monitor the Rate of Rise (RoR), and drop your batch at the target flavor profile.
          </p>
        </div>

        {/* Master Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {!dropped ? (
            <>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                  isRunning 
                    ? 'bg-amber-600 text-cream hover:bg-amber-700' 
                    : 'bg-espresso text-cream hover:bg-roast'
                }`}
              >
                {isRunning ? <Pause size={15} /> : <Play size={15} />}
                <span>{isRunning ? "Pause Roast" : seconds === 0 ? "Charge & Start" : "Resume"}</span>
              </button>

              <button
                onClick={handleDrop}
                disabled={seconds < 90}
                className="px-4 py-2.5 rounded-xl bg-roast text-caramel hover:bg-espresso border border-caramel/40 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
              >
                <Flame size={14} />
                <span>Drop Batch</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-espresso text-cream hover:bg-roast text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <RotateCcw size={15} />
              <span>Roast Another Batch</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1 ${
              audioEnabled 
                ? 'bg-oat text-roast border-roast/40' 
                : 'bg-cream text-muted border-border hover:text-espresso'
            }`}
            title={audioEnabled ? "First Crack Audio On" : "Audio Muted"}
          >
            {audioEnabled ? <Volume2 size={15} className="text-caramel" /> : <VolumeX size={15} />}
            <span className="hidden sm:inline">{audioEnabled ? "SFX On" : "Muted"}</span>
          </button>

          {/* Speed Multiplier */}
          <div className="bg-oat p-1 rounded-xl border border-border flex items-center text-xs font-bold">
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSimSpeed(speed)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  simSpeed === speed 
                    ? 'bg-espresso text-cream shadow-xs' 
                    : 'text-muted hover:text-espresso'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport (3D Drum & Telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (7 cols): 3D Drum Chamber & Dynamic Particles */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#1C130E] via-[#2A1D16] to-[#120B07] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          {/* Ambient Heat Radiance Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 70%, rgba(245, 158, 11, ${gasPower * 0.0035}) 0%, rgba(220, 38, 38, ${currentTemp > 195 ? 0.25 : 0.05}) 60%, transparent 80%)`
            }}
          />

          {/* Top Drum Status Bar */}
          <div className="flex items-center justify-between text-xs z-10">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <span className="font-mono text-cream font-bold">{formatTime(seconds)}</span>
              <span className="text-stone-400">|</span>
              <span className="text-caramel font-semibold">{phase.name}</span>
            </div>

            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-[11px] text-stone-300">
              Drum RPM: <span className="text-cream font-bold">55 RPM</span>
            </div>
          </div>

          {/* Central 3D Rotating Roaster Drum */}
          <div className="relative py-8 flex items-center justify-center" style={{ perspective: "1000px" }}>
            
            {/* Drum Exterior Shell with 3D Depth */}
            <div 
              className={`w-64 sm:w-80 h-44 sm:h-52 rounded-3xl relative border-4 border-[#45362E] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center transition-all ${
                isRunning ? 'ring-2 ring-amber-500/30' : ''
              }`}
              style={{
                background: "linear-gradient(180deg, #3D2B22 0%, #1F1510 50%, #3D2B22 100%)",
                transformStyle: "preserve-3d",
                transform: "rotateX(8deg)"
              }}
            >
              {/* Drum Slotted Perforations Texture moving horizontally */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-around"
                style={{
                  background: "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.8) 18px, rgba(0,0,0,0.8) 22px)"
                }}
              />

              {/* Viewport Glass Inspection Window (Tryer Port) */}
              <div className="w-48 sm:w-60 h-28 sm:h-32 rounded-2xl bg-black/50 border-2 border-stone-600/60 backdrop-blur-xs relative overflow-hidden flex items-center justify-center shadow-inner">
                
                {/* Agitator Drum Vanes (Visual Tumbler) */}
                <div 
                  className={`absolute inset-0 flex items-center justify-around opacity-30 ${isRunning ? 'animate-pulse' : ''}`}
                  style={{
                    animationDuration: `${3 / simSpeed}s`
                  }}
                >
                  <div className="w-1 h-full bg-stone-400/50 transform rotate-12" />
                  <div className="w-1 h-full bg-stone-400/50 transform -rotate-12" />
                </div>

                {/* Tumbling 3D Coffee Beans inside the Drum */}
                <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-1.5 p-3">
                  {[...Array(20)].map((_, i) => {
                    const rotAngle = (i * 37 + (isRunning ? seconds * 15 : 0)) % 360;
                    const bounce = isRunning ? Math.sin((seconds * 4 + i) * 0.8) * 6 : 0;
                    return (
                      <div
                        key={i}
                        className="w-4 h-6 rounded-full relative transition-colors duration-500 shadow-md shrink-0 flex items-center justify-center"
                        style={{
                          backgroundColor: beanVisual.color,
                          transform: `rotate(${rotAngle}deg) translateY(${bounce}px) scale(${currentTemp > 196 ? 1.25 : 1})`,
                          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.7)"
                        }}
                      >
                        {/* Characteristic S-fissure line on bean */}
                        <div className="w-0.5 h-4 bg-black/40 rounded-full transform -rotate-6" />
                      </div>
                    );
                  })}
                </div>

                {/* First Crack Sparks & Burst Particles */}
                {currentTemp >= 196 && currentTemp <= 206 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping"
                        style={{
                          top: `${20 + (i * 13) % 60}%`,
                          left: `${15 + (i * 21) % 70}%`,
                          animationDuration: '0.4s'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Roaster Smoke Layer */}
                {currentTemp > 160 && (
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-400/10 via-stone-300/20 to-transparent transition-opacity duration-1000"
                    style={{
                      opacity: Math.min(0.65, (currentTemp - 160) / 70)
                    }}
                  />
                )}

              </div>

              {/* Front Bearing Hub */}
              <div className="absolute -left-3 w-6 h-20 bg-stone-700 rounded-r-lg border border-stone-500 shadow-md" />
              <div className="absolute -right-3 w-6 h-20 bg-stone-700 rounded-l-lg border border-stone-500 shadow-md" />
            </div>

          </div>

          {/* Burner Flame Underneath */}
          <div className="flex flex-col items-center justify-center z-10 pt-2">
            <div className="flex items-center gap-1.5 h-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 rounded-full transition-all duration-300 ${
                    isRunning 
                      ? 'bg-gradient-to-t from-amber-500 via-orange-400 to-blue-400 animate-pulse' 
                      : 'bg-stone-700 h-2'
                  }`}
                  style={{
                    height: isRunning ? `${Math.max(8, (gasPower / 100) * 22 + (Math.sin(i) * 3))}px` : '4px',
                    animationDuration: `${0.2 + (i % 3) * 0.1}s`
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mt-1">
              Atmospheric Gas Burner · {gasPower}% Output
            </span>
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-cream z-10">
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Bean Temp (BT)</span>
              <span className="font-mono text-xl font-bold text-caramel">{currentTemp}°C</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Rate of Rise (RoR)</span>
              <span className="font-mono text-xl font-bold text-emerald-400">+{ror}°/m</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Bean Color</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: beanVisual.color }} />
                <span className="font-bold text-xs truncate">{beanVisual.status}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Live Thermal Graph, Burner Controls & Cupping Result */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic SVG Roast Curve Graph */}
          <div className="bg-oat p-5 rounded-3xl border border-border space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-espresso flex items-center gap-1.5">
                <Gauge size={14} className="text-roast" /> Live S-Curve Profile
              </span>
              <span className="font-mono text-muted text-[11px]">0 – 12 Mins</span>
            </div>

            {/* SVG Plot */}
            <div className="h-32 w-full bg-cream rounded-2xl p-2 border border-border relative overflow-hidden flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Horizontal reference lines for 150°C and First Crack 196°C */}
                <line x1="0" y1="50" x2="300" y2="50" stroke="#E5D9CC" strokeDasharray="3,3" strokeWidth="1" />
                <line x1="0" y1="20" x2="300" y2="20" stroke="#F87171" strokeDasharray="3,3" strokeWidth="1" />
                <text x="5" y="18" fill="#DC2626" fontSize="7" fontWeight="bold">First Crack (~196°C)</text>
                <text x="5" y="48" fill="#B98556" fontSize="7">Yellowing (150°C)</text>

                {/* Projected Ideal Roast Curve */}
                <path
                  d="M 0,20 Q 30,85 70,75 T 160,45 T 220,20 T 300,5"
                  fill="none"
                  stroke="#E5D9CC"
                  strokeWidth="2"
                />

                {/* Active Temperature Line drawn up to current time */}
                {seconds > 0 && (
                  <path
                    d={`M 0,20 Q ${Math.min(30, (seconds / 720) * 300)},85 ${Math.min(70, (seconds / 720) * 300)},${100 - (currentTemp / 245) * 100} L ${(seconds / 720) * 300},${100 - (currentTemp / 245) * 100}`}
                    fill="none"
                    stroke="#5A3825"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Current Probe Marker */}
                {seconds > 0 && (
                  <circle
                    cx={(seconds / 720) * 300}
                    cy={100 - (currentTemp / 245) * 100}
                    r="4.5"
                    fill="#DC2626"
                    stroke="#FFF"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>Charge: <strong>200°C</strong></span>
              <span>First Crack: <strong className="text-red-700">196°C</strong></span>
              <span>Max: <strong>245°C</strong></span>
            </div>
          </div>

          {/* Interactive Gas & Airflow Sliders */}
          <div className="bg-oat p-5 rounded-3xl border border-border space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-roast block">
              Operator Console:
            </span>

            {/* Burner Gas Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-espresso mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-amber-600" /> Gas Burner Power
                </span>
                <span className="font-mono text-roast">{gasPower}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={gasPower}
                onChange={(e) => setGasPower(Number(e.target.value))}
                className="w-full accent-roast bg-border h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Airflow Damper Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-espresso mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Wind size={14} className="text-blue-600" /> Airflow Damper (Chaff Exhaust)
                </span>
                <span className="font-mono text-roast">{airflow}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={airflow}
                onChange={(e) => setAirflow(Number(e.target.value))}
                className="w-full accent-roast bg-border h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Final Cupping Evaluation Card (Shows upon Drop) */}
          {dropped ? (
            <div className="bg-espresso text-cream p-6 rounded-3xl border border-caramel/40 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-caramel uppercase tracking-wider">
                  <Award size={15} /> Roast Batch Result
                </span>
                <span className="text-[10px] font-mono bg-roast px-2 py-0.5 rounded-full text-oat">
                  Cooling Active ({coolingTimer}s)
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-cream">
                {cuppingResult.level}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">Agtron Score</span>
                  <span className="font-mono font-bold text-caramel">{cuppingResult.agtron}</span>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">Development Ratio</span>
                  <span className="font-mono font-bold text-emerald-400">{cuppingResult.dtr}</span>
                </div>
              </div>

              <div className="text-xs text-oat/90 space-y-1">
                <strong className="text-caramel block">Cup Profile:</strong>
                <p className="leading-relaxed">{cuppingResult.flavor}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-stone-300">Target: <strong>{cuppingResult.bestFor.split('.')[0]}</strong></span>
                {onOpenArticle && (
                  <button
                    onClick={() => onOpenArticle('roasting-science')}
                    className="font-bold text-caramel hover:underline flex items-center gap-1"
                  >
                    Read Chemistry <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-cream rounded-2xl border border-border text-xs text-muted flex items-center justify-between">
              <span>Ready to drop? Click <strong>Drop Batch</strong> at your desired roast temperature.</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
