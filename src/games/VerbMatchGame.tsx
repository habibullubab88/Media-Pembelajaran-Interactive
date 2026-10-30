import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Star, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  Flame
} from 'lucide-react';
import { Screen } from '../types';
import { allVerbPairs } from '../data/verbPairs';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface CardItem {
  cardId: string;
  pairId: string;
  text: string;
  verbForm: 'V1' | 'V2';
  meaning: string;
  example: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface VerbMatchGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const VerbMatchGame: React.FC<VerbMatchGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [selectedPairCount, setSelectedPairCount] = useState<number>(10); // 10 pairs = 20 cards!
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(null);

  // Initialize game deck
  const initGame = (pairCount = selectedPairCount) => {
    sound.playClick();
    const shuffledPairs = [...allVerbPairs].sort(() => Math.random() - 0.5).slice(0, pairCount);
    
    const deck: CardItem[] = [];
    shuffledPairs.forEach((pair, idx) => {
      // V1 Card
      deck.push({
        cardId: `${pair.id}_v1`,
        pairId: pair.id,
        text: pair.v1,
        verbForm: 'V1',
        meaning: pair.meaning,
        example: pair.example,
        isFlipped: false,
        isMatched: false,
      });
      // V2 Card
      deck.push({
        cardId: `${pair.id}_v2`,
        pairId: pair.id,
        text: pair.v2,
        verbForm: 'V2',
        meaning: pair.meaning,
        example: pair.example,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    setCards(shuffledDeck);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedCount(0);
    setScore(0);
    setIsGameOver(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initGame(10);
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking) return;
    const card = cards[index];
    if (card.isMatched || card.isFlipped) return;
    if (flippedIndices.length >= 2) return;

    sound.playFlip();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Speak the word
    sound.speak(card.text);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      // Check if same pair and different forms
      if (firstCard.pairId === secondCard.pairId && firstCard.verbForm !== secondCard.verbForm) {
        // MATCH!
        setTimeout(() => {
          sound.playCorrect();
          const matchedDeck = [...cards];
          matchedDeck[firstIdx].isMatched = true;
          matchedDeck[secondIdx].isMatched = true;
          setCards(matchedDeck);
          setFlippedIndices([]);
          setIsChecking(false);
          const newMatched = matchedCount + 1;
          setMatchedCount(newMatched);
          const pointsEarned = 15;
          setScore((s) => s + pointsEarned);

          // Check if all matched
          if (newMatched === selectedPairCount) {
            handleVictory(score + pointsEarned);
          }
        }, 500);
      } else {
        // NO MATCH!
        setTimeout(() => {
          sound.playWrong();
          const resetDeck = [...cards];
          resetDeck[firstIdx].isFlipped = false;
          resetDeck[secondIdx].isFlipped = false;
          setCards(resetDeck);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1100);
      }
    }
  };

  const handleVictory = (finalScore: number) => {
    setIsGameOver(true);
    sound.playFanfare();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Save score
    updateGameScore('verbMatch', finalScore);
    onScoreUpdate();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-sky-50 to-indigo-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        
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
              <span className="text-[10px] font-black uppercase text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
                Game 1: Memory Matching
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                VERB MATCH
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Moves & Pairs Left */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Cocok / Target</span>
              <span className="text-xs sm:text-sm font-black text-indigo-700">
                {matchedCount} / {selectedPairCount} Pasang
              </span>
            </div>

            {/* Score */}
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>

            {/* Restart */}
            <button
              onClick={() => initGame(selectedPairCount)}
              title="Acak & Main Ulang"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Instructions banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-sky-100/70 border border-sky-300 flex items-center justify-between text-xs sm:text-sm text-sky-950">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span>
              Buka 2 kartu untuk menemukan pasangan <strong>Verb 1</strong> (Present) dan <strong>Verb 2</strong> (Past)!
              Contoh: <span className="underline font-bold">Go</span> ➔ <span className="underline font-bold">Went</span>.
            </span>
          </div>
          <span className="font-bold text-sky-800 hidden md:inline">Langkah: {moves}</span>
        </div>

        {/* Card Grid (10 pairs = 20 cards: 4 cols on mobile, 5 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {cards.map((card, idx) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.cardId}
                onClick={() => handleCardClick(idx)}
                className={`relative h-28 sm:h-32 rounded-2xl cursor-pointer perspective-1000 select-none transition-all duration-300 ${
                  card.isMatched ? 'opacity-90 pointer-events-none' : 'hover:scale-102 active:scale-95'
                }`}
              >
                <div
                  className={`w-full h-full rounded-2xl border-3 transition-all duration-300 transform-style-3d ${
                    isRevealed
                      ? card.isMatched
                        ? 'bg-emerald-50 border-emerald-400 rotate-y-180 shadow-xs'
                        : 'bg-white border-sky-400 rotate-y-180 shadow-md'
                      : 'bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 border-indigo-400 shadow-md hover:border-sky-300'
                  }`}
                >
                  {/* Front of card (Revealed Word) */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-2 backface-hidden rotate-y-180 rounded-2xl ${
                      card.isMatched ? 'bg-emerald-50 text-emerald-950' : 'bg-white text-slate-900'
                    }`}
                  >
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase mb-1 ${
                      card.verbForm === 'V1' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}>
                      {card.verbForm === 'V1' ? 'Verb 1 (Present)' : 'Verb 2 (Past)'}
                    </span>

                    <h4 className="text-lg sm:text-xl font-black font-heading tracking-tight">
                      {card.text}
                    </h4>

                    <span className="text-[11px] text-slate-500 font-semibold truncate max-w-full">
                      ({card.meaning})
                    </span>

                    {card.isMatched && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute top-2 right-2" />
                    )}
                  </div>

                  {/* Back of card (Hidden Deck Back) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden rounded-2xl text-white">
                    <span className="text-3xl filter drop-shadow">🃏</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-200 mt-1">
                      TAP CARD
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* VICTORY MODAL */}
        {isGameOver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center border-4 border-amber-300 shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-md mb-4 animate-bounce">
                🏆
              </div>
              <h3 className="text-2xl font-black font-heading text-slate-800">
                Luar Biasa, Berhasil! 🎉
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Kamu telah mencocokkan seluruh {selectedPairCount} pasangan kata kerja Simple Past Tense!
              </p>

              <div className="my-5 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-around">
                <div>
                  <span className="text-xs text-amber-700 font-bold block uppercase">Total Skor</span>
                  <span className="text-2xl font-black text-amber-950 font-heading">{score} Poin</span>
                </div>
                <div className="h-8 w-px bg-amber-200" />
                <div>
                  <span className="text-xs text-amber-700 font-bold block uppercase">Langkah</span>
                  <span className="text-2xl font-black text-slate-800 font-heading">{moves} Kali</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => initGame(selectedPairCount)}
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
          </div>
        )}

      </main>

      <Footer isGameView={true} />
    </div>
  );
};
