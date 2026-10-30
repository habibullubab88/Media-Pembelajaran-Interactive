export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
}

export const badgesList: BadgeInfo[] = [
  {
    id: 'welcome_cadet',
    name: 'Past Tense Cadet',
    description: 'Bergabung di Past Tense Playground untuk pertama kali.',
    icon: '🎖️',
    category: 'Start',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'first_game',
    name: 'First Victory',
    description: 'Menyelesaikan permainan edukasi pertama Anda.',
    icon: '🎯',
    category: 'Progress',
    color: 'from-sky-400 to-blue-600'
  },
  {
    id: 'explorer',
    name: 'Grammar Explorer',
    description: 'Mencoba minimal 3 mini-games yang berbeda.',
    icon: '🧭',
    category: 'Progress',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'all_rounder',
    name: 'All-Rounder Genius',
    description: 'Memainkan semua 6 mini-game di Playground.',
    icon: '🏆',
    category: 'Mastery',
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'memory_master',
    name: 'Memory Master',
    description: 'Meraih skor 100+ di permainan Verb Match.',
    icon: '🧠',
    category: 'Game 1',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'grammar_warrior',
    name: 'Grammar Warrior',
    description: 'Meraih skor 80+ di kuis Grammar Battle.',
    icon: '⚔️',
    category: 'Game 2',
    color: 'from-red-400 to-rose-600'
  },
  {
    id: 'lucky_star',
    name: 'Lucky Star',
    description: 'Memutar roda Lucky Wheel dan mengumpulkan 50+ poin.',
    icon: '🎡',
    category: 'Game 3',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'sherlock_holmes',
    name: 'Master Detective',
    description: 'Menemukan dan memperbaiki semua kesalahan di Detective Case.',
    icon: '🕵️‍♂️',
    category: 'Game 4',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'creative_author',
    name: 'Comic Storyteller',
    description: 'Menyusun komik liburan secara sempurna di Story Maker.',
    icon: '📖',
    category: 'Game 5',
    color: 'from-teal-400 to-emerald-600'
  },
  {
    id: 'past_tense_master',
    name: 'Past Tense Grandmaster',
    description: 'Mendapatkan skor 120+ pada Final Quiz 15 soal.',
    icon: '🎓',
    category: 'Game 6',
    color: 'from-violet-500 to-fuchsia-600'
  },
  {
    id: 'past_tense_legend',
    name: 'SMP IX Past Tense Legend',
    description: 'Mengumpulkan total skor akumulasi 500+ di seluruh games!',
    icon: '👑',
    category: 'Ultimate',
    color: 'from-yellow-300 via-amber-400 to-orange-500'
  }
];
