import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  HelpCircle, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  ArrowRight,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { Screen, ComicStory } from '../types';
import { comicStories } from '../data/comicData';
import { sound } from '../utils/audio';
import { updateGameScore } from '../utils/storage';
import { Footer } from '../components/Footer';

interface StoryMakerGameProps {
  onNavigate: (screen: Screen) => void;
  onScoreUpdate: () => void;
}

export const StoryMakerGame: React.FC<StoryMakerGameProps> = ({ onNavigate, onScoreUpdate }) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [currentPanelIdx, setCurrentPanelIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [panelId: number]: { choice: string; isCorrect: boolean } }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const activeStory: ComicStory = comicStories[activeStoryIdx];
  const currentPanel = activeStory.panels[currentPanelIdx];
  const currentAnswer = userAnswers[currentPanel.id];

  const handleSelectOption = (optIdx: number) => {
    if (currentAnswer) return;

    const isCorrect = optIdx === currentPanel.correctIndex;
    const choiceText = currentPanel.options[optIdx];

    const updatedAnswers = {
      ...userAnswers,
      [currentPanel.id]: { choice: choiceText, isCorrect }
    };
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      sound.playCorrect();
      const points = 20;
      setScore((s) => s + points);
    } else {
      sound.playWrong();
    }
  };

  const handleNextPanel = () => {
    sound.playClick();
    if (currentPanelIdx + 1 < activeStory.panels.length) {
      setCurrentPanelIdx((p) => p + 1);
    } else {
      // Completed story
      setIsFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 }
      });
      updateGameScore('storyMaker', score);
      onScoreUpdate();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentPanelIdx(0);
    setUserAnswers({});
    setIsFinished(false);
    setScore(0);
  };

  const handleSwitchStory = (idx: number) => {
    sound.playClick();
    setActiveStoryIdx(idx);
    setCurrentPanelIdx(0);
    setUserAnswers({});
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-teal-50 via-emerald-50/30 to-sky-50">
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
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                Game 5: Complete The Comic Story
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                STORY MAKER
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Story Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {comicStories.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => handleSwitchStory(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeStoryIdx === idx
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Komik #{idx + 1}
                </button>
              ))}
            </div>

            {/* Score */}
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>{score} Poin</span>
            </div>

            <button
              onClick={handleRestart}
              title="Reset Komik Ini"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comic Story Header */}
        <div className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wide">
              Tema: {activeStory.theme}
            </span>
            <h3 className="text-lg sm:text-xl font-black font-heading text-slate-800">
              {activeStory.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Panel {currentPanelIdx + 1} dari {activeStory.panels.length}</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${((currentPanelIdx + 1) / activeStory.panels.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {!isFinished ? (
          /* Active Comic Panel Card */
          <div className="space-y-6">
            
            {/* Visual Panel */}
            <div className={`p-6 sm:p-8 rounded-3xl border-4 ${currentPanel.panelBgColor} shadow-md transition-all flex flex-col md:flex-row items-center gap-6`}>
              
              {/* Comic Illustration Box */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white border-3 border-current/20 shadow-inner flex flex-col items-center justify-center text-6xl sm:text-7xl shrink-0 relative overflow-hidden group">
                <span className="transform group-hover:scale-110 transition-transform">
                  {currentPanel.imageIcon}
                </span>
                <span className="absolute bottom-2 text-[10px] font-extrabold uppercase bg-slate-900 text-white px-2 py-0.5 rounded-full">
                  Panel #{currentPanel.id}
                </span>
              </div>

              {/* Speech bubble / Narrative Text Box */}
              <div className="flex-1 w-full bg-white p-5 sm:p-6 rounded-2xl border-2 border-current/20 shadow-xs text-left relative">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Lengkapi Kalimat Lampau (Verb 2):
                </div>

                <p className="text-lg sm:text-xl font-heading text-slate-800 leading-relaxed">
                  "{currentPanel.narrationBefore}{' '}
                  <span className={`inline-block px-3 py-0.5 rounded-xl font-black border-2 transition-all ${
                    currentAnswer
                      ? currentAnswer.isCorrect
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                        : 'bg-rose-100 text-rose-900 border-rose-400'
                      : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  }`}>
                    {currentAnswer ? currentAnswer.choice : '_______'}
                  </span>{' '}
                  {currentPanel.narrationAfter}"
                </p>

                {/* Pronounce whole sentence */}
                <button
                  onClick={() => {
                    const filled = currentAnswer ? currentAnswer.choice : currentPanel.options[currentPanel.correctIndex];
                    sound.speak(`${currentPanel.narrationBefore} ${filled} ${currentPanel.narrationAfter}`);
                  }}
                  className="mt-3 text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Pelafalan</span>
                </button>
              </div>

            </div>

            {/* Multiple Choice Options for Blank */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Pilih kata kerja lampau yang paling tepat:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentPanel.options.map((opt, idx) => {
                  let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (currentAnswer) {
                    if (idx === currentPanel.correctIndex) {
                      style = 'bg-emerald-500 text-white border-emerald-600 font-extrabold';
                    } else if (opt === currentAnswer.choice && !currentAnswer.isCorrect) {
                      style = 'bg-rose-500 text-white border-rose-600 font-extrabold';
                    } else {
                      style = 'bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={!!currentAnswer}
                      className={`p-4 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all active:scale-95 shadow-xs ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next Button */}
              {currentAnswer && (
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="text-xs sm:text-sm">
                    {currentAnswer.isCorrect ? (
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Tepat sekali! {currentPanel.explanation}
                      </span>
                    ) : (
                      <span className="font-bold text-rose-700">
                        Belum tepat. Jawaban yang benar adalah <strong>{currentPanel.options[currentPanel.correctIndex]}</strong>. {currentPanel.explanation}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNextPanel}
                    className="btn-game-primary px-6 py-2.5 text-xs sm:text-sm flex items-center gap-2 self-end sm:self-auto shrink-0"
                  >
                    <span>{currentPanelIdx + 1 === activeStory.panels.length ? 'Lihat Cerita Lengkap! 📖' : 'Panel Berikutnya'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Finished Story - Read Full Comic View! */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-teal-400 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-3xl">🎉</span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-800">
                Komik Berhasil Diselesaikan!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Berikut adalah rangkuman cerita lengkap liburan dalam Simple Past Tense:
              </p>
            </div>

            {/* Full Comic strip showcase */}
            <div className="space-y-3.5">
              {activeStory.panels.map((p) => {
                const ans = userAnswers[p.id];
                const verbWord = p.options[p.correctIndex];

                return (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0">
                      {p.imageIcon}
                    </span>
                    <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {p.narrationBefore}{' '}
                      <strong className="text-teal-700 bg-teal-100 px-2 py-0.5 rounded-lg font-black">
                        {verbWord}
                      </strong>{' '}
                      {p.narrationAfter}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-700 font-bold block uppercase">Skor Story Maker:</span>
                <span className="text-2xl font-black text-amber-950 font-heading">{score} Poin</span>
              </div>
              <button
                onClick={() => {
                  const fullText = activeStory.panels
                    .map((p) => `${p.narrationBefore} ${p.options[p.correctIndex]} ${p.narrationAfter}`)
                    .join(' ');
                  sound.speak(fullText);
                }}
                className="btn-game-purple px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bacakan Seluruh Cerita</span>
              </button>
            </div>

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
