import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  className?: string;
  isGameView?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ className = '', isGameView = false }) => {
  return (
    <footer className={`w-full py-4 px-4 sm:px-8 border-t border-slate-200/80 bg-white/90 backdrop-blur-md transition-all ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* User requirement: "Berikan tulisan “Compossed by: HABIBUL LUBAB, S.Pd.” pada bagian pojok kiri bawah setiap halaman game" */}
        <div className="flex items-center gap-2 font-bold text-slate-800 bg-amber-50 border border-amber-300/80 px-3 py-1.5 rounded-xl shadow-xs">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-amber-900 tracking-wide">
            Compossed by: <span className="text-indigo-900 font-extrabold uppercase">HABIBUL LUBAB, S.Pd.</span>
          </span>
        </div>

        {/* Center / right note */}
        <div className="flex items-center gap-4 text-slate-500 font-medium text-center">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-sky-500" />
            Media Pembelajaran Bahasa Inggris Kelas IX SMP
          </span>
          <span className="hidden md:inline text-slate-300">•</span>
          <span className="hidden md:flex items-center gap-1 text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Simple Past Tense
          </span>
        </div>
      </div>
    </footer>
  );
};
