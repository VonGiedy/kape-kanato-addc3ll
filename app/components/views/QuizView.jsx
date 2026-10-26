"use client";
import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, RotateCcw, 
  ArrowRight, Sparkles, HelpCircle, Share2, Check 
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quiz';

export default function QuizView({ onExploreOrigins, onExploreFundamentals }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const getRank = (finalScore) => {
    const percentage = (finalScore / totalQuestions) * 100;
    if (percentage >= 90) return { title: "Master Cupper & Mindanao Coffee Champion", badge: "🏆 Certified Q-Enthusiast", desc: "Extraordinary! You possess deep botanical, regional, and extraction knowledge." };
    if (percentage >= 70) return { title: "Specialty Barista Practitioner", badge: "☕ Skilled Brewer", desc: "Great job! You have a solid grasp of Philippine coffee regions and brew mechanics." };
    if (percentage >= 50) return { title: "Curious Coffee Explorer", badge: "🌱 Enthusiast", desc: "Good effort! You know the essentials and are ready to explore processing and extraction deeper." };
    return { title: "Coffee Apprentice", badge: "📖 Novice Learner", desc: "A great start to your coffee journey! Check out our Fundamentals and Farm to Cup guides to level up." };
  };

  const rank = getRank(score);

  const handleCopyBadge = () => {
    const text = `I just scored ${score}/${totalQuestions} on the Kape Kanato Philippine Coffee IQ Quiz! Rank: ${rank.title} (Ateneo de Davao ADDC3LL).`;
    try {
      navigator.clipboard.writeText(text);
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-espresso text-cream py-12 px-6 sm:px-10 rounded-3xl shadow-lg border border-border/20 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-roast text-caramel text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Interactive Knowledge Check
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
            Philippine Coffee IQ Quiz
          </h1>
          <p className="text-sm sm:text-base text-oat/90 leading-relaxed">
            Test your knowledge of coffee cherry biology, post-harvest processing, roasting science, and Mindanao's heritage origins.
          </p>
        </div>
      </div>

      {!isFinished ? (
        /* Active Quiz Question Card */
        <div className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-wider">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className="text-roast">Current Score: {score}</span>
            </div>
            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div
                className="bg-roast h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctAnswer;
              
              let buttonStyle = "bg-oat hover:bg-border/60 text-espresso border-border";
              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold";
                } else if (isSelected) {
                  buttonStyle = "bg-rose-100 text-rose-950 border-rose-300 line-through";
                } else {
                  buttonStyle = "bg-oat text-muted opacity-50 border-border";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-cream text-espresso flex items-center justify-center font-bold text-xs shadow-sm border border-border shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{option}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 size={20} className="text-emerald-700 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle size={20} className="text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner when answered */}
          {isAnswered && (
            <div className="bg-oat p-5 rounded-2xl border border-border space-y-1 animate-in fade-in duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-roast block">
                {selectedAnswer === currentQ.correctAnswer ? '✨ Correct!' : '💡 Explanation:'}
              </span>
              <p className="text-sm text-muted leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="bg-espresso hover:bg-roast text-cream px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Score & Certificate Badge Screen */
        <div className="bg-cream rounded-3xl border border-border p-8 sm:p-12 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-amber-100 text-roast rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Award size={44} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-roast">
              Quiz Completed!
            </span>
            <h2 className="text-4xl font-serif font-bold text-espresso">
              {score} / {totalQuestions}
            </h2>
            <p className="text-sm font-semibold text-muted">
              You scored {Math.round((score / totalQuestions) * 100)}%
            </p>
          </div>

          {/* Certificate Badge Card */}
          <div className="bg-espresso text-cream p-6 sm:p-8 rounded-3xl max-w-lg mx-auto shadow-xl border border-border/20 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase text-caramel tracking-wider">
                Kape Kanato Certification
              </span>
              <span className="text-xs text-oat/70 font-mono">ADDC3LL Lab</span>
            </div>

            <div>
              <span className="text-xs text-oat/80 block mb-1">Honorable Distinction:</span>
              <h3 className="text-2xl font-serif font-bold text-cream">
                {rank.title}
              </h3>
              <p className="text-xs text-oat/80 mt-2 leading-relaxed">
                {rank.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-oat/60">
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span className="text-caramel font-semibold">{rank.badge}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="bg-oat hover:bg-border/60 text-espresso px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors border border-border text-sm"
            >
              <RotateCcw size={16} />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={handleCopyBadge}
              className="bg-roast hover:bg-espresso text-cream px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all text-sm shadow-md"
            >
              {copiedBadge ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copiedBadge ? 'Score Copied!' : 'Share Score'}</span>
            </button>

            <button
              onClick={onExploreOrigins}
              className="bg-espresso hover:bg-roast text-cream px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all text-sm shadow-md"
            >
              <span>Explore Philippine Origins</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

