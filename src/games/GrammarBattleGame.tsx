import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  X, 
  HelpCircle, 
  Volume2, 
  Star, 
  Flame, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Screen } from '../types';
import { grammarBattleQuestions } from '../data/grammarBattleData';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface GrammarBattleGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const GrammarBattleGame: React.FC<GrammarBattleGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answeredState, setAnsweredState] = useState<{
    userChoice: boolean;
    isCorrect: boolean;
  } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = grammarBattleQuestions[currentIndex];

  const handleAnswer = (choice: boolean) => {
    if (answeredState) return;

    const isAnswerCorrect = choice === currentQ.isCorrect;
    setAnsweredState({
      userChoice: choice,
      isCorrect: isAnswerCorrect,
    });

    if (isAnswerCorrect) {
      sound.playCorrect();
      const points = 10 + streak * 2;
      setScore((s) => s + points);
      setCorrectCount((c) => c + 1);
      setStreak((st) => st + 1);
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < grammarBattleQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setAnsweredState(null);
    } else {
      setIsFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 }
      });
      updateGameScore('grammarBattle', score);
      onScoreUpdate();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setAnsweredState(null);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-rose-50 via-red-50/30 to-amber-50/50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        
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
              <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                Game 2: True or False Quiz
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                GRAMMAR BATTLE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Streak */}
            {streak > 1 && (
              <div className="hidden sm:flex items-center gap-1 bg-orange-100 text-orange-800 border border-orange-300 px-2.5 py-1 rounded-xl text-xs font-black animate-pulse">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-600" />
                <span>Combo x{streak}!</span>
              </div>
            )}

            {/* Score */}
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>

            <button
              onClick={handleRestart}
              title="Mulai Ulang Soal"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            
            {/* Progress Bar & Question Counter */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Soal {currentIndex + 1} dari {grammarBattleQuestions.length}</span>
              <span className="text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                Topik: {currentQ.topic}
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / grammarBattleQuestions.length) * 100}%` }}
              />
            </div>

            {/* Sentence Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-slate-200 shadow-md text-center space-y-6 relative overflow-hidden">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                Apakah struktur kalimat lampau ini Benar atau Salah?
              </span>

              {/* Big Sentence display */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-rose-50/30 border-2 border-slate-200/90 relative group">
                <p className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-relaxed font-heading">
                  "{currentQ.sentence}"
                </p>

                <button
                  onClick={() => sound.speak(currentQ.sentence)}
                  title="Dengarkan pengucapan kalimat"
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Dengarkan Pelafalan</span>
                </button>
              </div>

              {/* Action Buttons: TRUE & FALSE */}
              {!answeredState ? (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="btn-game-green py-5 text-lg sm:text-xl flex flex-col items-center justify-center gap-1 shadow-lg"
                  >
                    <Check className="w-8 h-8 stroke-[3]" />
                    <span>TRUE (Benar)</span>
                  </button>

                  <button
                    onClick={() => handleAnswer(false)}
                    className="bg-rose-500 hover:bg-rose-400 text-white font-bold border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 transition-all rounded-2xl shadow-lg py-5 text-lg sm:text-xl flex flex-col items-center justify-center gap-1"
                  >
                    <X className="w-8 h-8 stroke-[3]" />
                    <span>FALSE (Salah)</span>
                  </button>
                </div>
              ) : (
                /* Feedback and Explanation */
                <div className={`p-6 rounded-2xl border-2 text-left animate-in zoom-in-95 duration-200 ${
                  answeredState.isCorrect 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2 font-black text-lg sm:text-xl font-heading mb-2">
                    {answeredState.isCorrect ? (
                      <>
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
                          ✓
                        </div>
                        <span className="text-emerald-800">Jawabanmu Tepat Sekali! 🎉</span>
                      </>
                    ) : (
                      <>
                        <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm">
                          ✕
                        </div>
                        <span className="text-rose-800">Kurang Tepat, Perhatikan ya! 💡</span>
                      </>
                    )}
                  </div>

                  {/* Correction if false */}
                  {!currentQ.isCorrect && currentQ.correction && (
                    <div className="my-3 p-3 bg-white rounded-xl border border-rose-200 text-xs sm:text-sm">
                      <span className="font-bold text-rose-700 block mb-0.5">Koreksi Kalimat yang Benar:</span>
                      <p className="font-extrabold text-slate-800 italic">
                        "{currentQ.correction}"
                      </p>
                    </div>
                  )}

                  {/* Detailed Explanation */}
                  <div className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-white/70 p-3 rounded-xl border border-current/20">
                    <span className="font-bold text-slate-800 block mb-1">Penjelasan Singkat:</span>
                    {currentQ.explanation}
                  </div>

                  {/* Next Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="btn-game-primary px-6 py-3 text-sm flex items-center gap-2"
                    >
                      <span>Lanjut Soal Berikutnya</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto text-center border-4 border-amber-300 shadow-xl space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-md">
              ⚔️
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-800">
              Battle Selesai!
            </h3>
            <p className="text-sm text-slate-600">
              Kamu telah menjawab seluruh {grammarBattleQuestions.length} pertanyaan tantangan Grammar Battle!
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-amber-700 font-bold block uppercase">Skor Diperoleh</span>
                <span className="text-2xl font-black text-amber-950 font-heading">{score} Poin</span>
              </div>
              <div>
                <span className="text-xs text-amber-700 font-bold block uppercase">Jawaban Benar</span>
                <span className="text-2xl font-black text-emerald-600 font-heading">
                  {correctCount} / {grammarBattleQuestions.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 btn-game-primary py-3 text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('dashboard');
                }}
                className="flex-1 btn-game-blue py-3 text-sm"
              >
                BACK TO MENU
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer isGameView={true} />
    </div>
  );
};
