import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Star, 
  ArrowRight,
  Flame,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';
import { Screen, WheelCategory, WheelQuestion } from '../types';
import { wheelCategories, wheelQuestions } from '../data/luckyWheelData';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface LuckyWheelGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const LuckyWheelGame: React.FC<LuckyWheelGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<WheelCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<WheelQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [spinCount, setSpinCount] = useState<number>(0);

  // Wheel slice angles: 6 categories, 60 degrees each
  // Slice 0: [0, 60), Slice 1: [60, 120), etc.
  const numSlices = wheelCategories.length;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (isSpinning) return;
    sound.playClick();
    setIsSpinning(true);
    setSelectedCategory(null);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);

    // Random extra rotations (e.g. 5 to 8 full spins + random degree)
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const randomOffset = Math.floor(Math.random() * 360);
    const newTargetRotation = rotation + extraSpins * 360 + randomOffset;
    setRotation(newTargetRotation);

    // Tick sound interval
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount > 25) clearInterval(tickInterval);
    }, 110);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);

      // Determine winning slice based on pointer at top (270 degrees or normalized)
      // Pointer is at the top (90 deg in standard math or 270 deg)
      // Let's normalize rotation mod 360
      const normalizedDeg = (360 - (newTargetRotation % 360)) % 360;
      const sliceIndex = Math.floor(normalizedDeg / sliceAngle) % numSlices;
      const chosenCat = wheelCategories[sliceIndex];

      setSelectedCategory(chosenCat);
      sound.playCorrect();

      // Pick question from that category
      const availableQs = wheelQuestions.filter((q) => q.categoryId === chosenCat.id);
      const randomQ = availableQs[Math.floor(Math.random() * availableQs.length)];
      setCurrentQuestion(randomQ);
      setSpinCount((s) => s + 1);
    }, 3500);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuestion) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctIndex) {
      sound.playCorrect();
      const points = 15;
      setScore((s) => s + points);
      updateGameScore('luckyWheel', score + points);
      onScoreUpdate();
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 }
      });
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-amber-50 via-orange-50/30 to-sky-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('dashboard');
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">BACK TO MENU</span>
            </button>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Game 3: Spinning Wheel Challenge
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                LUCKY WHEEL
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Jumlah Putaran</span>
              <span className="text-sm font-black text-slate-700">{spinCount}x Putar</span>
            </div>

            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>
          </div>
        </div>

        {/* Game Layout: Wheel on left/top, Question on right/bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Wheel Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
              
              {/* Pointer Marker at the top */}
              <div className="absolute -top-3 z-30 flex flex-col items-center filter drop-shadow-md">
                <div className="w-7 h-9 bg-rose-600 rounded-b-full border-2 border-white flex items-center justify-center text-white text-xs font-black">
                  ▼
                </div>
              </div>

              {/* Outer ring */}
              <div className="w-full h-full rounded-full border-8 border-amber-400 bg-amber-200 shadow-2xl p-2 relative flex items-center justify-center">
                
                {/* Spinning Wheel Body */}
                <div
                  className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[3500ms] ease-out shadow-inner"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Slices rendered using SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {wheelCategories.map((cat, idx) => {
                      const angle = 360 / numSlices;
                      const startAngle = idx * angle;
                      const endAngle = (idx + 1) * angle;

                      // Convert polar to cartesian
                      const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      return (
                        <path
                          key={cat.id}
                          d={pathData}
                          fill={cat.color}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                        />
                      );
                    })}
                  </svg>

                  {/* Category Labels overlay */}
                  {wheelCategories.map((cat, idx) => {
                    const midAngle = idx * (360 / numSlices) + (360 / numSlices) / 2;
                    return (
                      <div
                        key={cat.id}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                          transform: `rotate(${midAngle}deg)`,
                        }}
                      >
                        <span 
                          className="text-[9px] sm:text-[10px] font-black text-white text-center drop-shadow-sm uppercase max-w-[65px] leading-tight"
                          style={{
                            transform: 'translateY(-62px) rotate(90deg)',
                          }}
                        >
                          {cat.name.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Center Hub / Spin Button inside wheel */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex flex-col items-center justify-center text-amber-950 font-black text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-80"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSpinning ? '...' : 'SPIN!'}</span>
                </button>

              </div>
            </div>

            {/* Spin CTA Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="mt-6 w-full max-w-xs btn-game-primary py-3.5 text-base flex items-center justify-center gap-2"
            >
              <RotateCcw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Sedang Memutar...' : 'PUTAR RODA (SPIN)'}</span>
            </button>

            {/* Category Guide */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 w-full max-w-xs">
              {wheelCategories.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white border border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="truncate">{c.name}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Question / Challenge Column */}
          <div className="lg:col-span-6">
            {selectedCategory && currentQuestion ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-md space-y-5 animate-in slide-in-from-right-4 duration-300">
                
                {/* Category Banner */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <span 
                    className="px-3 py-1 rounded-full text-white font-black text-xs uppercase"
                    style={{ backgroundColor: selectedCategory.color }}
                  >
                    Kategori #{selectedCategory.id}: {selectedCategory.name}
                  </span>
                  
                  {currentQuestion.hint && !showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Petunjuk</span>
                    </button>
                  )}
                </div>

                {showHint && currentQuestion.hint && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>Petunjuk:</strong> {currentQuestion.hint}</span>
                  </div>
                )}

                {/* Prompt */}
                <div>
                  <h3 className="text-base sm:text-lg font-black font-heading text-slate-800 leading-snug">
                    {currentQuestion.prompt}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                    if (isAnswered) {
                      if (idx === currentQuestion.correctIndex) {
                        btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && idx === currentQuestion.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <p className="font-bold text-slate-800">Penjelasan:</p>
                    <p className="text-slate-600 leading-relaxed">{currentQuestion.explanation}</p>
                    
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleSpin}
                        className="btn-game-primary px-5 py-2.5 text-xs flex items-center gap-2"
                      >
                        <span>Putar Roda Lagi! 🎡</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border-3 border-dashed border-slate-300 text-center flex flex-col items-center justify-center min-h-[360px] text-slate-500">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-3">
                  🎡
                </div>
                <h3 className="font-black font-heading text-lg text-slate-700">
                  Roda Belum Diputar
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Tekan tombol <strong>SPIN!</strong> di tengah roda untuk memilih kategori tantangan secara acak.
                </p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isGameView={true} />
    </div>
  );
};
