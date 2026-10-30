import { UserProgress, GameScore } from '../types';

const STORAGE_KEY = 'past_tense_playground_progress_v1';

const defaultScores: GameScore = {
  verbMatch: 0,
  grammarBattle: 0,
  luckyWheel: 0,
  detective: 0,
  storyMaker: 0,
  finalQuiz: 0,
};

const defaultProgress: UserProgress = {
  scores: defaultScores,
  playedGames: [],
  badges: ['welcome_cadet'],
  totalStars: 0,
};

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      scores: { ...defaultScores, ...parsed.scores },
      playedGames: parsed.playedGames || [],
      badges: parsed.badges || ['welcome_cadet'],
      totalStars: parsed.totalStars || 0,
    };
  } catch {
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

export const updateGameScore = (gameKey: keyof GameScore, score: number): { progress: UserProgress; newBadges: string[] } => {
  const current = loadProgress();
  const currentBest = current.scores[gameKey] || 0;
  
  // Keep the high score
  const updatedScores = {
    ...current.scores,
    [gameKey]: Math.max(currentBest, score),
  };

  const playedSet = new Set(current.playedGames);
  playedSet.add(gameKey);

  // Check badges to unlock
  const earnedBadges = new Set(current.badges);
  const newBadges: string[] = [];

  const checkBadge = (id: string) => {
    if (!earnedBadges.has(id)) {
      earnedBadges.add(id);
      newBadges.push(id);
    }
  };

  if (playedSet.size >= 1) checkBadge('first_game');
  if (playedSet.size >= 3) checkBadge('explorer');
  if (playedSet.size === 6) checkBadge('all_rounder');

  if (gameKey === 'verbMatch' && score >= 100) checkBadge('memory_master');
  if (gameKey === 'grammarBattle' && score >= 80) checkBadge('grammar_warrior');
  if (gameKey === 'luckyWheel' && score >= 50) checkBadge('lucky_star');
  if (gameKey === 'detective' && score >= 80) checkBadge('sherlock_holmes');
  if (gameKey === 'storyMaker' && score >= 80) checkBadge('creative_author');
  if (gameKey === 'finalQuiz' && score >= 120) checkBadge('past_tense_master');

  const totalScore = Object.values(updatedScores).reduce((a, b) => a + b, 0);
  if (totalScore >= 300) checkBadge('super_scholar');
  if (totalScore >= 500) checkBadge('past_tense_legend');

  const updatedProgress: UserProgress = {
    scores: updatedScores,
    playedGames: Array.from(playedSet),
    badges: Array.from(earnedBadges),
    totalStars: Math.floor(totalScore / 50),
  };

  saveProgress(updatedProgress);
  return { progress: updatedProgress, newBadges };
};

export const resetAllProgress = (): UserProgress => {
  saveProgress(defaultProgress);
  return defaultProgress;
};
