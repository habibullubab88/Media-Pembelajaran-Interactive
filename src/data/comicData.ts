import { ComicStory } from '../types';

export const comicStories: ComicStory[] = [
  {
    id: 'story_yogyakarta',
    title: 'My Unforgettable Trip to Yogyakarta',
    theme: 'Liburan Sekolah ke Candi Prambanan',
    panels: [
      {
        id: 1,
        imageIcon: '🚂',
        narrationBefore: 'Last month, my family and I',
        blankPrompt: '_______',
        narrationAfter: 'to Yogyakarta by train early in the morning.',
        options: ['went', 'go', 'gone', 'going'],
        correctIndex: 0,
        explanation: "'Went' adalah bentuk lampau (V2) dari 'go'.",
        panelBgColor: 'bg-amber-100 border-amber-300'
      },
      {
        id: 2,
        imageIcon: '🏛️',
        narrationBefore: 'At noon, we',
        blankPrompt: '_______',
        narrationAfter: 'the magnificent Prambanan Temple with great awe.',
        options: ['visit', 'visited', 'visiting', 'visits'],
        correctIndex: 1,
        explanation: "'Visited' adalah regular verb lampau (V2) dari 'visit'.",
        panelBgColor: 'bg-sky-100 border-sky-300'
      },
      {
        id: 3,
        imageIcon: '📸',
        narrationBefore: 'My brother and I',
        blankPrompt: '_______',
        narrationAfter: 'lots of artistic photos in front of the stone shrines.',
        options: ['took', 'take', 'taken', 'taking'],
        correctIndex: 0,
        explanation: "'Took' adalah irregular verb (V2) dari 'take'.",
        panelBgColor: 'bg-emerald-100 border-emerald-300'
      },
      {
        id: 4,
        imageIcon: '🍲',
        narrationBefore: 'In the evening, father',
        blankPrompt: '_______',
        narrationAfter: 'sweet traditional Gudeg for our dinner near Malioboro.',
        options: ['buy', 'buying', 'bought', 'buyed'],
        correctIndex: 2,
        explanation: "'Bought' adalah bentuk Verb 2 dari 'buy'.",
        panelBgColor: 'bg-purple-100 border-purple-300'
      },
      {
        id: 5,
        imageIcon: '🌟',
        narrationBefore: 'We',
        blankPrompt: '_______',
        narrationAfter: 'extremely happy and fell asleep soundly in our hotel.',
        options: ['were', 'was', 'are', 'is'],
        correctIndex: 0,
        explanation: "Subjek 'We' membutuhkan to be lampau 'were'.",
        panelBgColor: 'bg-rose-100 border-rose-300'
      }
    ]
  },
  {
    id: 'story_camping',
    title: 'Adventures at Green Valley Camp',
    theme: 'Kegiatan Pramuka & Berkemah',
    panels: [
      {
        id: 1,
        imageIcon: '🏕️',
        narrationBefore: 'Two weeks ago, our scout troop',
        blankPrompt: '_______',
        narrationAfter: 'a cozy tent near the riverbank.',
        options: ['build', 'built', 'building', 'builded'],
        correctIndex: 1,
        explanation: "'Built' adalah bentuk Verb 2 dari 'build'.",
        panelBgColor: 'bg-teal-100 border-teal-300'
      },
      {
        id: 2,
        imageIcon: '🔥',
        narrationBefore: 'When night fell, we',
        blankPrompt: '_______',
        narrationAfter: 'a bright campfire and gathered together.',
        options: ['made', 'make', 'making', 'maked'],
        correctIndex: 0,
        explanation: "'Made' adalah bentuk Verb 2 dari 'make'.",
        panelBgColor: 'bg-orange-100 border-orange-300'
      },
      {
        id: 3,
        imageIcon: '🎵',
        narrationBefore: 'Everyone cheerfully',
        blankPrompt: '_______',
        narrationAfter: 'scout songs accompanied by an acoustic guitar.',
        options: ['sing', 'sang', 'sung', 'singed'],
        correctIndex: 1,
        explanation: "'Sang' adalah bentuk Verb 2 dari 'sing'.",
        panelBgColor: 'bg-indigo-100 border-indigo-300'
      },
      {
        id: 4,
        imageIcon: '💤',
        narrationBefore: 'Finally, all students',
        blankPrompt: '_______',
        narrationAfter: 'soundly under the starlit sky.',
        options: ['slept', 'sleep', 'sleeping', 'sleeped'],
        correctIndex: 0,
        explanation: "'Slept' adalah bentuk Verb 2 dari 'sleep'.",
        panelBgColor: 'bg-blue-100 border-blue-300'
      }
    ]
  }
];
