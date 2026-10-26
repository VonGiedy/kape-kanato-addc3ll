"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Volume2, VolumeX, CheckCircle2, Coffee, Sparkles 
} from 'lucide-react';

export default function BrewTimerModal({ 
  method, 
  dose, 
  ratio, 
  water, 
  onClose 
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTotalSec, setElapsedTotalSec] = useState(0);
  const [stepSecondsLeft, setStepSecondsLeft] = useState(method.steps[0]?.durationSec || 45);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const steps = method.steps || [];
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalDuration = steps.reduce((sum, s) => sum + s.durationSec, 0);

  // Web Audio Chime generator
  const playChime = (type = 'step') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'finish') {
        // Happy major chord arpeggio
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45); // C6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } else {
        // Pleasant bell ding
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // AudioContext may be blocked or unavailable, ignore safely
    }
  };

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isRunning && !isFinished) {
      interval = setInterval(() => {
        setElapsedTotalSec((prev) => prev + 1);

        setStepSecondsLeft((prev) => {
          if (prev <= 1) {
            // Move to next step or finish
            if (currentStepIndex < steps.length - 1) {
              const nextIndex = currentStepIndex + 1;
              setCurrentStepIndex(nextIndex);
              playChime('step');
              return steps[nextIndex].durationSec;
            } else {
              setIsRunning(false);
              setIsFinished(true);
              playChime('finish');
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isFinished, currentStepIndex, steps, soundEnabled]);

  const toggleRun = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setCurrentStepIndex(0);
    setElapsedTotalSec(0);
    setStepSecondsLeft(steps[0]?.durationSec || 45);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setStepSecondsLeft(steps[nextIdx].durationSec);
      playChime('step');
    } else {
      setIsRunning(false);
      setIsFinished(true);
      playChime('finish');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      setStepSecondsLeft(steps[prevIdx].durationSec);
    }
  };

  const formatMinSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Proportional target water for current step
  const stepTargetWater = Math.round((currentStep.targetWater / method.defaultWater) * water);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-cream w-full max-w-xl rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-oat/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-espresso text-cream flex items-center justify-center">
              <Coffee size={20} className="text-caramel" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-espresso text-base sm:text-lg">
                {method.name} Live Timer
              </h4>
              <p className="text-xs text-muted">
                {dose}g Coffee · {water}ml Water · 1:{ratio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso transition-colors"
              title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {!isFinished ? (
            <>
              {/* Step indicator badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-roast text-cream px-3 py-1 rounded-full">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
                <span className="text-xs font-semibold text-muted">
                  Total {formatMinSec(elapsedTotalSec)} / {formatMinSec(totalDuration)}
                </span>
              </div>

              {/* Huge Countdown Display */}
              <div className="my-2">
                <div className="text-6xl sm:text-7xl font-mono font-black text-espresso tracking-tight">
                  {formatMinSec(stepSecondsLeft)}
                </div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                  Seconds left in this phase
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-border h-2.5 rounded-full overflow-hidden my-6">
                <div 
                  className="bg-roast h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (elapsedTotalSec / totalDuration) * 100)}%` }}
                />
              </div>

              {/* Step Title & Target Weight */}
              <div className="bg-oat p-5 rounded-2xl border border-border w-full mb-6 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-serif font-bold text-xl text-espresso">
                    {currentStep.title}
                  </h5>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-muted block">Target Scale Weight</span>
                    <span className="font-mono font-bold text-roast text-base">{stepTargetWater}g</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mt-2">
                  {currentStep.instruction}
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="p-3 rounded-2xl border border-border bg-oat hover:bg-border/60 disabled:opacity-30 disabled:cursor-not-allowed text-espresso transition-colors"
                  title="Previous Step"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={toggleRun}
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg shadow-lg transition-transform hover:scale-105 ${
                    isRunning 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-espresso hover:bg-roast text-cream'
                  }`}
                >
                  {isRunning ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current" />}
                  <span>{isRunning ? 'Pause' : elapsedTotalSec > 0 ? 'Resume' : 'Start Pour'}</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="p-3 rounded-2xl border border-border bg-oat hover:bg-border/60 text-espresso transition-colors"
                  title="Skip to Next Step"
                >
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 rounded-2xl border border-border bg-oat hover:bg-border/60 text-muted hover:text-espresso transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </>
          ) : (
            /* Finished Celebration View */
            <div className="py-4 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-espresso">
                  Brew Complete!
                </h4>
                <p className="text-sm text-muted max-w-sm mx-auto mt-2">
                  Enjoy your fresh cup of coffee! Let it cool for 1-2 minutes to unlock peak sweetness and fruit acidity.
                </p>
              </div>

              <div className="bg-oat p-4 rounded-2xl border border-border max-w-xs mx-auto text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Total Time:</span>
                  <span className="font-bold text-espresso">{formatMinSec(elapsedTotalSec)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Method:</span>
                  <span className="font-bold text-espresso">{method.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Parameters:</span>
                  <span className="font-bold text-espresso">{dose}g / {water}ml (1:{ratio})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="bg-espresso hover:bg-roast text-cream px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Coffee size={18} className="text-caramel" />
                  <span>Done & Enjoy Cup</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-oat hover:bg-border/60 text-espresso px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  Brew Another Cup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Step Thumbnails */}
        <div className="bg-oat/50 p-3 border-t border-border flex items-center justify-between text-xs text-muted overflow-x-auto gap-2">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setCurrentStepIndex(idx);
                setStepSecondsLeft(s.durationSec);
              }}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                idx === currentStepIndex 
                  ? 'bg-espresso text-cream font-bold' 
                  : idx < currentStepIndex 
                    ? 'text-roast line-through opacity-70' 
                    : 'hover:bg-border/60'
              }`}
            >
              <span>{idx + 1}. {s.title}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

