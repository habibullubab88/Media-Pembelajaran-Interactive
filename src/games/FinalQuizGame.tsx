import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';
import { Screen } from '../types';
import { finalQuizQuestions } from '../data/finalQuizData';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface FinalQuizGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const FinalQuizGame: React.FC<FinalQuizGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = finalQuizQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      sound.playCorrect();
      setCorrectCount((c) => c + 1);
      const points = 10;
      setScore((s) => s + points);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < finalQuizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed all 15 questions
      setIsFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 }
      });
      updateGameScore('finalQuiz', score);
      onScoreUpdate();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setScore(0);
    setIsFinished(false);
  };

  const scorePercentage = Math.round((correctCount / finalQuizQuestions.length) * 100);

  const getMotivation = () => {
    if (scorePercentage >= 90) {
      return {
        badge: '🏆 Past Tense Grandmaster!',
        text: 'Luar biasa sempurna! Kamu telah menguasai seluruh aspek Simple Past Tense kelas IX SMP dengan sangat gemilang!',
        color: 'text-amber-600 bg-amber-50 border-amber-300'
      };
    } else if (scorePercentage >= 75) {
      return {
        badge: '⭐ Grammar Champion!',
        text: 'Hebat sekali! Pemahaman tata bahasa lampau kamu sudah sangat mantap dan memuaskan.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300'
      };
    } else if (scorePercentage >= 60) {
      return {
        badge: '🎖️ Good Job Explorer!',
        text: 'Bagus! Kamu sudah memahami konsep dasar dengan baik. Tingkatkan lagi dengan mengulang materi ya!',
        color: 'text-sky-700 bg-sky-50 border-sky-300'
      };
    } else {
      return {
        badge: '💪 Semangat Terus Belajar!',
        text: 'Jangan berkecil hati! Buka menu Materi (Learn the Past Tense), baca tips cepatnya, dan coba tantangan ini lagi!',
        color: 'text-purple-700 bg-purple-50 border-purple-300'
      };
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-purple-50 via-indigo-50/30 to-sky-50">
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
              <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                Game 6: Multiple Choice Quiz
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                FINAL QUIZ (15 SOAL)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>

            <button
              onClick={handleRestart}
              title="Mulai Ulang Kuis"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            
            {/* Question Counter & Category Badge */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Soal {currentIndex + 1} dari {finalQuizQuestions.length}</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                Materi: {currentQ.category}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / finalQuizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-slate-200 shadow-md space-y-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200/80">
                <h3 className="text-lg sm:text-2xl font-black font-heading text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQ.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (isAnswered) {
                    if (idx === currentQ.correctAnswer) {
                      optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (idx === selectedOption) {
                      optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 shadow-xs ${optionStyle} ${
                        !isAnswered ? 'hover:scale-101 active:scale-98' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white border border-current/30 flex items-center justify-center font-black text-xs shrink-0">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && idx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div className={`p-5 rounded-2xl border-2 animate-in zoom-in-95 duration-200 ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    {selectedOption === currentQ.correctAnswer ? (
                      <span className="text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Jawabanmu Benar! (+10 Poin)
                      </span>
                    ) : (
                      <span className="text-rose-800 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Jawaban Kurang Tepat!
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-white/70 p-3 rounded-xl border border-current/20 mt-2">
                    <strong>Penjelasan:</strong> {currentQ.explanation}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="btn-game-primary px-6 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{currentIndex + 1 === finalQuizQuestions.length ? 'Lihat Hasil Akhir! 📊' : 'Soal Berikutnya'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* Final Results Screen with Motivational Feedback */
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg mx-auto text-center border-4 border-purple-400 shadow-2xl space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-purple-500 flex items-center justify-center text-5xl shadow-md animate-bounce">
              🎓
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-800">
                Hasil Akhir Final Quiz
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Ujian Kompetensi Simple Past Tense Kelas IX SMP
              </p>
            </div>

            {/* Scorecard */}
            <div className="p-5 rounded-2xl bg-purple-50 border-2 border-purple-200 grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Skor Akhir</span>
                <span className="text-2xl font-black text-purple-900 font-heading">{score}</span>
              </div>
              <div className="border-x border-purple-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Jawaban Benar</span>
                <span className="text-2xl font-black text-emerald-600 font-heading">
                  {correctCount}/{finalQuizQuestions.length}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Akurasi Nilai</span>
                <span className="text-2xl font-black text-amber-600 font-heading">{scorePercentage}%</span>
              </div>
            </div>

            {/* Motivational message */}
            {(() => {
              const motiv = getMotivation();
              return (
                <div className={`p-4 rounded-2xl border-2 text-left ${motiv.color}`}>
                  <span className="font-extrabold text-sm block mb-1">{motiv.badge}</span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{motiv.text}</p>
                </div>
              );
            })()}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
