import React, { useState, useEffect } from 'react';
import { Screen, UserProgress } from './types';
import { loadProgress, resetAllProgress } from './utils/storage';
import { Navbar } from './components/Navbar';
import { HowToPlayModal } from './components/HowToPlayModal';
import { BadgesModal } from './components/BadgesModal';
import { HomeView } from './views/HomeView';
import { MaterialView } from './views/MaterialView';
import { DashboardView } from './views/DashboardView';
import { VerbMatchGame } from './games/VerbMatchGame';
import { GrammarBattleGame } from './games/GrammarBattleGame';
import { LuckyWheelGame } from './games/LuckyWheelGame';
import { DetectiveGame } from './games/DetectiveGame';
import { StoryMakerGame } from './games/StoryMakerGame';
import { FinalQuizGame } from './games/FinalQuizGame';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  // Reload progress when games update scores
  const handleScoreUpdate = () => {
    setProgress(loadProgress());
  };

  const handleResetProgress = () => {
    const fresh = resetAllProgress();
    setProgress(fresh);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current screen component
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeView
            onNavigate={handleNavigate}
            progress={progress}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        );
      case 'material':
        return <MaterialView onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={handleNavigate}
            progress={progress}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
          />
        );
      case 'game_verb_match':
        return (
          <VerbMatchGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      case 'game_grammar_battle':
        return (
          <GrammarBattleGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      case 'game_lucky_wheel':
        return (
          <LuckyWheelGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      case 'game_detective':
        return (
          <DetectiveGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      case 'game_story_maker':
        return (
          <StoryMakerGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      case 'game_final_quiz':
        return (
          <FinalQuizGame
            onNavigate={handleNavigate}
            onScoreUpdate={handleScoreUpdate}
          />
        );
      default:
        return (
          <HomeView
            onNavigate={handleNavigate}
            progress={progress}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        progress={progress}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Screen Body */}
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      {/* Badges Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        progress={progress}
      />
    </div>
  );
}
