import React, { useState } from 'react';
import { 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Award, 
  Star, 
  Home, 
  BookOpen, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Screen, UserProgress } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  progress: UserProgress;
  onOpenHowToPlay: () => void;
  onOpenBadges: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  progress,
  onOpenHowToPlay,
  onOpenBadges,
  onResetProgress,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleNav = (screen: Screen) => {
    sound.playClick();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-md transform group-hover:scale-105 group-hover:rotate-3 transition-transform">
            <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-800 font-heading">
                PAST TENSE <span className="text-sky-500">PLAYGROUND</span>
              </h1>
              <span className="hidden md:inline-flex text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                SMP Kelas IX
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:block">
              Let's Learn Simple Past Tense Through Fun Games!
            </p>
          </div>
        </div>

        {/* Action Controls & Stats */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Total Score Counter */}
          <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 text-amber-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xs">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-spin-slow" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
              <span className="text-[10px] sm:text-xs text-amber-700 font-semibold uppercase">Skor:</span>
              <span className="text-sm sm:text-base font-extrabold text-amber-900">{totalScore}</span>
            </div>
          </div>

          {/* Quick Screen Nav Buttons */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => handleNav('material')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                currentScreen === 'material' 
                  ? 'bg-sky-500 text-white shadow-sm' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Materi
            </button>

            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                currentScreen === 'dashboard' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Daftar Games
            </button>
          </div>

          {/* Badges Modal Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBadges();
            }}
            title="Lihat Prestasi & Badges"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Badges ({progress.badges.length})</span>
          </button>

          {/* How to Play Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            title="Cara Bermain & Panduan"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Panduan</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              isMuted 
                ? 'bg-slate-100 text-slate-400 border-slate-200' 
                : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Back to Home / Reset */}
          {currentScreen !== 'home' && (
            <button
              onClick={() => handleNav('home')}
              title="Kembali ke Beranda"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          {/* Reset progress button */}
          <div className="relative">
            <button
              onClick={() => setShowResetConfirm(!showResetConfirm)}
              title="Reset Skor & Progres"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {showResetConfirm && (
              <div className="absolute right-0 mt-2 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 text-left">
                <p className="text-xs font-bold text-slate-800">Ulangi Semua Skor?</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Seluruh skor permainan dan badges akan di-reset dari awal.
                </p>
                <div className="flex items-center justify-end gap-2 mt-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      onResetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="px-2.5 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg"
                  >
                    Ya, Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
