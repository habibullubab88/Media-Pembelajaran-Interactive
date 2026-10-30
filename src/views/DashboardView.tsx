import React from 'react';
import { 
  Play, 
  Trophy, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Screen, UserProgress } from '../types';
import { sound } from '../utils/audio';
import { Footer } from '../components/Footer';

interface DashboardViewProps {
  onNavigate: (screen: Screen) => void;
  progress: UserProgress;
  onOpenHowToPlay: () => void;
}

interface GameCardMeta {
  key: keyof UserProgress['scores'];
  screen: Screen;
  gameNumber: number;
  title: string;
  badge: string;
  genre: string;
  description: string;
  emoji: string;
  gradient: string;
  borderColor: string;
  tagColor: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  progress,
  onOpenHowToPlay,
}) => {
  const games: GameCardMeta[] = [
    {
      key: 'verbMatch',
      screen: 'game_verb_match',
      gameNumber: 1,
      title: 'VERB MATCH',
      badge: 'Game 1',
      genre: 'Memory Matching Game',
      description: 'Buka kartu dan cocokkan pasangan Verb 1 dan Verb 2 seperti Go-Went, Eat-Ate, Play-Played!',
      emoji: '🃏',
      gradient: 'from-sky-400 via-blue-500 to-indigo-600',
      borderColor: 'border-sky-300',
      tagColor: 'bg-sky-100 text-sky-800'
    },
    {
      key: 'grammarBattle',
      screen: 'game_grammar_battle',
      gameNumber: 2,
      title: 'GRAMMAR BATTLE',
      badge: 'Game 2',
      genre: 'True or False Quiz',
      description: 'Pertarungan cepat logika grammar! Tentukan apakah kalimat past tense BENAR atau SALAH dan dapatkan koreksinya.',
      emoji: '⚔️',
      gradient: 'from-rose-400 via-red-500 to-orange-500',
      borderColor: 'border-rose-300',
      tagColor: 'bg-rose-100 text-rose-800'
    },
    {
      key: 'luckyWheel',
      screen: 'game_lucky_wheel',
      gameNumber: 3,
      title: 'LUCKY WHEEL',
      badge: 'Game 3',
      genre: 'Spinning Wheel Challenge',
      description: 'Putar roda keberuntungan dan selesaikan tantangan dari 6 kategori seru Simple Past Tense!',
      emoji: '🎡',
      gradient: 'from-amber-400 via-orange-500 to-yellow-500',
      borderColor: 'border-amber-300',
      tagColor: 'bg-amber-100 text-amber-800'
    },
    {
      key: 'detective',
      screen: 'game_detective',
      gameNumber: 4,
      title: 'DETECTIVE CASE',
      badge: 'Game 4',
      genre: 'Find & Fix The Mistake',
      description: 'Jadilah detektif grammar! Selidiki cerita misterius dan perbaiki kata kerja lampau yang salah tulis.',
      emoji: '🕵️‍♂️',
      gradient: 'from-indigo-500 via-purple-600 to-pink-600',
      borderColor: 'border-indigo-300',
      tagColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      key: 'storyMaker',
      screen: 'game_story_maker',
      gameNumber: 5,
      title: 'STORY MAKER',
      badge: 'Game 5',
      genre: 'Complete The Comic Story',
      description: 'Lengkapi cerita komik liburan seru 4–5 panel dengan memilih kata kerja past tense yang tepat!',
      emoji: '🎨',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      borderColor: 'border-emerald-300',
      tagColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      key: 'finalQuiz',
      screen: 'game_final_quiz',
      gameNumber: 6,
      title: 'FINAL QUIZ',
      badge: 'Game 6',
      genre: 'Multiple Choice Quiz',
      description: 'Ujian komprehensif 15 soal pilihan ganda meliputi Verb 2, time signal, positive, negative, interrogative, was & were!',
      emoji: '🎓',
      gradient: 'from-purple-500 via-indigo-600 to-blue-600',
      borderColor: 'border-purple-300',
      tagColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);

  const handlePlay = (screen: Screen) => {
    sound.playClick();
    onNavigate(screen);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 w-full">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pusat Arena Permainan Kelas IX
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">
              DASHBOARD MINI-GAMES
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Pilih arena permainan di bawah ini, kumpulkan skor setinggi-tingginya, dan raih seluruh Badges!
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('material');
              }}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-400 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>Baca Materi</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenHowToPlay();
              }}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Panduan</span>
            </button>
          </div>
        </div>

        {/* 6 Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const score = progress.scores[game.key];
            const isPlayed = progress.playedGames.includes(game.key);

            return (
              <div
                key={game.key}
                className={`card-game flex flex-col justify-between overflow-hidden border-3 ${game.borderColor} group`}
              >
                {/* Visual Header / Cover */}
                <div className={`p-6 bg-gradient-to-r ${game.gradient} text-white relative flex items-center justify-between`}>
                  <div className="relative z-10">
                    <span className="text-[11px] font-black tracking-wider uppercase bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {game.badge} • {game.genre}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-heading mt-2 tracking-tight">
                      {game.title}
                    </h3>
                  </div>
                  <div className="text-5xl sm:text-6xl filter drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {game.emoji}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {game.description}
                    </p>
                  </div>

                  {/* Status & Play Button Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Skor Tertinggi</span>
                      <div className="flex items-center gap-1.5 font-extrabold text-base sm:text-lg text-slate-800">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>{score} Poin</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlay(game.screen)}
                      className="btn-game-primary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2 group-hover:scale-105"
                    >
                      <Play className="w-4 h-4 fill-amber-950" />
                      <span>{isPlayed ? 'PLAY AGAIN' : 'PLAY NOW'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
};
