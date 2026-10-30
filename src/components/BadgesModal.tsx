import React from 'react';
import { X, Award, CheckCircle2, Lock, Star } from 'lucide-react';
import { badgesList } from '../data/badgesData';
import { UserProgress } from '../types';
import { sound } from '../utils/audio';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, progress }) => {
  if (!isOpen) return null;

  const earnedSet = new Set(progress.badges);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-purple-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                Piala & Prestasi (Badges)
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 font-medium">
                Terkumpul {progress.badges.length} dari {badgesList.length} lencana penghargaan
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-amber-900">Total Bintang: {progress.totalStars} ⭐</p>
                <p className="text-[11px] text-amber-700">Dapatkan 1 bintang setiap 50 poin yang kamu kumpulkan!</p>
              </div>
            </div>
            <div className="text-xs font-black text-amber-950 bg-amber-200/80 px-3 py-1.5 rounded-xl">
              Level: {progress.totalStars >= 10 ? 'Master' : progress.totalStars >= 5 ? 'Senior' : 'Cadet'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {badgesList.map((badge) => {
              const isEarned = earnedSet.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    isEarned
                      ? 'bg-slate-50 border-purple-300 shadow-xs'
                      : 'bg-slate-100/60 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs ${
                    isEarned
                      ? `bg-gradient-to-tr ${badge.color} text-white`
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isEarned ? badge.icon : <Lock className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                        {badge.name}
                      </h4>
                      {isEarned && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <span className="inline-block text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">
                      {badge.category}
                    </span>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleClose}
            className="btn-game-purple px-6 py-2.5 text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
