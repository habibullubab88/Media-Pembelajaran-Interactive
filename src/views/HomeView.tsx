import React from 'react';
import { 
  Play, 
  BookOpen, 
  HelpCircle, 
  Trophy, 
  Star, 
  Sparkles, 
  CheckCircle, 
  Gamepad2, 
  Flame,
  Volume2
} from 'lucide-react';
import { Screen, UserProgress } from '../types';
import { sound } from '../utils/audio';
import { Footer } from '../components/Footer';

interface HomeViewProps {
  onNavigate: (screen: Screen) => void;
  progress: UserProgress;
  onOpenHowToPlay: () => void;
  onOpenBadges: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  progress,
  onOpenHowToPlay,
  onOpenBadges,
}) => {
  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);
  const gamesPlayedCount = progress.playedGames.length;
  const progressPercent = Math.round((gamesPlayedCount / 6) * 100);

  const handleStart = () => {
    sound.playClick();
    onNavigate('dashboard');
  };

  const handleOpenMaterial = () => {
    sound.playClick();
    onNavigate('material');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-sky-100 via-indigo-50/40 to-amber-50/60 overflow-hidden relative">
      {/* Playful Floating Shapes / Background Ornaments */}
      <div className="absolute top-12 left-8 w-24 h-24 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute top-40 right-12 w-36 h-36 bg-sky-300/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main Hero Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex-1 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Top Badge for Class IX */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-indigo-200 text-indigo-700 text-xs sm:text-sm font-extrabold shadow-sm mb-4 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Interactive English Learning Media • SMP Kelas IX</span>
        </div>

        {/* Big Catchy Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-slate-900 leading-none drop-shadow-xs">
          PAST TENSE{' '}
          <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            PLAYGROUND
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl font-bold text-slate-700 max-w-2xl font-heading">
          Let's Learn Simple Past Tense Through Fun Games!
        </p>

        <p className="mt-2 text-xs sm:text-base text-slate-600 max-w-xl font-medium">
          Kuasai kata kerja lampau (Verb 2), kalimat positif, negatif, tanya, serta penggunaan 
          <span className="font-bold text-indigo-600"> was </span> & <span className="font-bold text-indigo-600">were </span> 
          lewat 6 mini-games interaktif yang mengasyikkan!
        </p>

        {/* Cartoon Educational Illustration: SMP Students Studying & Playing */}
        <div className="my-6 sm:my-8 relative w-full max-w-xl">
          <div className="relative mx-auto bg-gradient-to-br from-white to-sky-50 p-6 sm:p-8 rounded-3xl border-4 border-sky-300 shadow-xl overflow-hidden">
            
            {/* Playful classroom background graphic */}
            <div className="flex items-center justify-around gap-4 sm:gap-6">
              
              {/* Student 1 (Boy with book & pencil) */}
              <div className="flex flex-col items-center group">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-amber-100 border-3 border-amber-400 flex items-center justify-center text-5xl shadow-md transform hover:-translate-y-1 transition-transform">
                  👨‍🎓
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    V1 ➔ V2
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                  "I studied!" 📚
                </span>
              </div>

              {/* Center Game Mascot / Playground Banner */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-purple-500 p-1 flex items-center justify-center shadow-lg animate-pulse">
                  <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-amber-500">
                    <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                  </div>
                </div>
                <span className="mt-2 text-[11px] font-extrabold text-indigo-900 bg-indigo-100 px-3 py-0.5 rounded-full">
                  6 SERU GAMES
                </span>
              </div>

              {/* Student 2 (Girl with graduation cap / notes) */}
              <div className="flex flex-col items-center group">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-purple-100 border-3 border-purple-400 flex items-center justify-center text-5xl shadow-md transform hover:-translate-y-1 transition-transform">
                  👩‍🎓
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    Did + V1
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                  "We played!" ⚽
                </span>
              </div>

            </div>

            {/* Past Tense Quick Banner */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="bg-sky-100 text-sky-800 px-2.5 py-1 rounded-lg">Go ➔ Went</span>
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">Eat ➔ Ate</span>
              <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg">Play ➔ Played</span>
              <span className="bg-rose-100 text-rose-800 px-2.5 py-1 rounded-lg">Was / Were</span>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
          {/* START LEARNING button (Prominent) */}
          <button
            onClick={handleStart}
            className="w-full sm:w-auto flex-1 btn-game-primary py-4 px-8 text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg group"
          >
            <Play className="w-6 h-6 fill-amber-950 group-hover:scale-110 transition-transform" />
            <span>START LEARNING</span>
          </button>

          {/* MATERI LESSON button */}
          <button
            onClick={handleOpenMaterial}
            className="w-full sm:w-auto btn-game-blue py-4 px-6 text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>MATERI BELAJAR</span>
          </button>
        </div>

        {/* HOW TO PLAY & BADGES Secondary Buttons */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs flex items-center gap-2 transition-all hover:border-slate-400 active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>HOW TO PLAY (Panduan)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenBadges();
            }}
            className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-purple-700 font-bold text-xs sm:text-sm border border-purple-300 shadow-xs flex items-center gap-2 transition-all hover:border-purple-400 active:scale-95"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            <span>PRESTASI & BADGES ({progress.badges.length})</span>
          </button>
        </div>

        {/* Progress & Total Score Card */}
        <div className="mt-8 w-full max-w-xl bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Total score */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 font-black shadow-xs">
                <Star className="w-7 h-7 fill-amber-300 text-amber-950" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Skor Kamu</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                  {totalScore} <span className="text-sm font-semibold text-amber-600">Poin</span>
                </p>
              </div>
            </div>

            {/* Games Progress */}
            <div className="w-full sm:w-56 text-left">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                <span>Progres Permainan:</span>
                <span className="text-indigo-600">{gamesPlayedCount}/6 Game</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 text-right">
                {progressPercent}% Terselesaikan
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* Footer with credit */}
      <Footer />
    </div>
  );
};
