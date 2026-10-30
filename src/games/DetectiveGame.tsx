import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  HelpCircle, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Screen } from '../types';
import { detectiveCases, DetectiveStoryCase } from '../data/detectiveData';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface DetectiveGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [solvedMistakes, setSolvedMistakes] = useState<{ [tokenId: number]: string }>({});
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCaseComplete, setIsCaseComplete] = useState<boolean>(false);

  const activeCase: DetectiveStoryCase = detectiveCases[selectedCaseIdx];

  const handleSelectWord = (token: DetectiveStoryCase['tokens'][0]) => {
    sound.playClick();
    setSelectedTokenId(token.id);
  };

  const handleFixMistake = (tokenId: number, chosenOption: string) => {
    const token = activeCase.tokens.find((t) => t.id === tokenId);
    if (!token || !token.isMistake) return;

    if (chosenOption.toLowerCase() === token.correctWord?.toLowerCase()) {
      sound.playCorrect();
      const updated = { ...solvedMistakes, [tokenId]: chosenOption };
      setSolvedMistakes(updated);
      setSelectedTokenId(null);
      const points = 25;
      setScore((s) => s + points);

      // Check if all mistakes in this case solved
      const totalMistakesCount = activeCase.tokens.filter((t) => t.isMistake).length;
      if (Object.keys(updated).length === totalMistakesCount) {
        setIsCaseComplete(true);
        sound.playFanfare();
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 }
        });
        updateGameScore('detective', score + points);
        onScoreUpdate();
      }
    } else {
      sound.playWrong();
    }
  };

  const handleSwitchCase = (idx: number) => {
    sound.playClick();
    setSelectedCaseIdx(idx);
    setSolvedMistakes({});
    setSelectedTokenId(null);
    setShowHint(false);
    setIsCaseComplete(false);
  };

  const handleResetCase = () => {
    sound.playClick();
    setSolvedMistakes({});
    setSelectedTokenId(null);
    setShowHint(false);
    setIsCaseComplete(false);
  };

  const currentInspectedToken = activeCase.tokens.find((t) => t.id === selectedTokenId);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-indigo-50 via-slate-50 to-amber-50/40">
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
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                Game 4: Find & Fix The Mistake
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                DETECTIVE CASE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Case Selector Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {detectiveCases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => handleSwitchCase(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseIdx === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Kasus #{idx + 1}
                </button>
              ))}
            </div>

            {/* Score */}
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>

            <button
              onClick={handleResetCase}
              title="Reset Kasus Ini"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case Info Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-3xl shrink-0">
              🕵️‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                  {activeCase.caseBadge}
                </span>
                <span className="text-xs text-slate-400">• Lokasi: {activeCase.location}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-heading mt-0.5">
                {activeCase.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/60 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>{showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk'}</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-slate-200">
              Pecahkan: {Object.keys(solvedMistakes).length} / {activeCase.totalMistakes}
            </div>
          </div>
        </div>

        {/* Hint drawer if active */}
        {showHint && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Petunjuk Detektif:</p>
              <p>{activeCase.clue}</p>
            </div>
          </div>
        )}

        {/* Story Detective Desk */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              Klik kata kerja yang mencurigakan (salah bentuk lampau) di bawah ini:
            </span>
          </div>

          {/* Interactive Tokens in Story */}
          <div className="text-base sm:text-xl md:text-2xl font-serif leading-loose flex flex-wrap gap-x-2 gap-y-2.5 items-baseline p-4 sm:p-6 bg-amber-50/30 rounded-2xl border border-amber-200/60">
            {activeCase.tokens.map((token) => {
              const isSolved = solvedMistakes[token.id];
              const isSelected = selectedTokenId === token.id;

              return (
                <span key={token.id} className="inline-flex items-center">
                  <button
                    onClick={() => handleSelectWord(token)}
                    className={`px-2 py-0.5 rounded-xl font-semibold transition-all relative ${
                      isSolved
                        ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400 font-extrabold shadow-xs'
                        : isSelected
                        ? 'bg-indigo-600 text-white font-bold scale-105 shadow-md'
                        : 'hover:bg-amber-200/70 hover:text-slate-900 text-slate-800'
                    }`}
                  >
                    {isSolved ? (
                      <span className="flex items-center gap-1">
                        <span>{isSolved}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    ) : (
                      token.word
                    )}
                  </button>
                  {token.punctuation && <span className="text-slate-800">{token.punctuation}</span>}
                </span>
              );
            })}
          </div>
        </div>

        {/* Word Inspector Modal / Panel */}
        {currentInspectedToken && (
          <div className="p-5 sm:p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-200 animate-in slide-in-from-bottom-2 duration-200 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase bg-indigo-200 text-indigo-900 px-2.5 py-1 rounded-lg">
                  Investigasi Kata: "{currentInspectedToken.word}"
                </span>
              </div>
              <button
                onClick={() => setSelectedTokenId(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Tutup
              </button>
            </div>

            {currentInspectedToken.isMistake ? (
              <div>
                <p className="text-xs sm:text-sm font-bold text-indigo-950 mb-2">
                  Kata ini adalah kesalahan Simple Past Tense! Pilih bentuk kata kerja yang benar untuk memperbaikinya:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {currentInspectedToken.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleFixMistake(currentInspectedToken.id, opt)}
                      className="p-3 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-400 border-2 border-slate-200 font-bold text-sm text-slate-800 transition-all active:scale-95 text-center shadow-xs"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kata <strong>"{currentInspectedToken.word}"</strong> sudah tepat dan bukan merupakan kesalahan. Cari kata kerja lainnya!</span>
              </div>
            )}
          </div>
        )}

        {/* Victory Case Modal */}
        {isCaseComplete && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-xs">
              🎖️
            </div>
            <h3 className="text-2xl font-black font-heading text-slate-800">
              Kasus Telah Dipecahkan!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Hebat! Kamu telah menemukan dan memperbaiki seluruh kata kerja lampau pada kasus ini dengan sempurna.
            </p>

            {/* Explanation review */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2">
              <span className="font-bold text-emerald-900 block">Koreksi & Penjelasan Kasus:</span>
              {activeCase.tokens.filter(t => t.isMistake).map((m) => (
                <div key={m.id} className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>{m.word} ➔ {m.correctWord}:</strong> {m.explanation}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              {selectedCaseIdx + 1 < detectiveCases.length ? (
                <button
                  onClick={() => handleSwitchCase(selectedCaseIdx + 1)}
                  className="btn-game-primary px-6 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Kasus #{selectedCaseIdx + 2}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSwitchCase(0)}
                  className="btn-game-primary px-6 py-3 text-sm"
                >
                  Main Ulang dari Kasus 1
                </button>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('dashboard');
                }}
                className="btn-game-blue px-6 py-3 text-sm"
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
