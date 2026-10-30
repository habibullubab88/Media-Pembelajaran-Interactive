export type Screen = 
  | 'home' 
  | 'material' 
  | 'dashboard' 
  | 'game_verb_match' 
  | 'game_grammar_battle' 
  | 'game_lucky_wheel' 
  | 'game_detective' 
  | 'game_story_maker' 
  | 'game_final_quiz';

export interface GameScore {
  verbMatch: number;
  grammarBattle: number;
  luckyWheel: number;
  detective: number;
  storyMaker: number;
  finalQuiz: number;
}

export interface UserProgress {
  scores: GameScore;
  playedGames: string[];
  badges: string[];
  totalStars: number;
}

export interface VerbPair {
  id: string;
  v1: string;
  v2: string;
  meaning: string;
  type: 'regular' | 'irregular';
  example: string;
}

export interface GrammarBattleItem {
  id: number;
  sentence: string;
  isCorrect: boolean;
  correction?: string;
  explanation: string;
  topic: string;
}

export interface WheelCategory {
  id: number;
  name: string;
  color: string;
  description: string;
}

export interface WheelQuestion {
  id: string;
  categoryId: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface DetectiveMistake {
  wordIndex: number;
  wrongWord: string;
  correctWord: string;
  explanation: string;
}

export interface DetectiveCase {
  id: string;
  title: string;
  synopsis: string;
  location: string;
  clue: string;
  paragraphs: {
    words: { id: number; text: string; isWrong: boolean; correctText?: string; explanation?: string }[];
  }[];
}

export interface ComicPanel {
  id: number;
  imageIcon: string;
  narrationBefore: string;
  blankPrompt: string;
  narrationAfter: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  panelBgColor: string;
}

export interface ComicStory {
  id: string;
  title: string;
  theme: string;
  panels: ComicPanel[];
}

export interface FinalQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Verb 2' | 'Time Expression' | 'Positive' | 'Negative' | 'Interrogative' | 'Was/Were';
}
