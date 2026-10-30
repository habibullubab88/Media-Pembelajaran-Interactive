export interface DetectiveStoryCase {
  id: string;
  title: string;
  caseBadge: string;
  location: string;
  clue: string;
  totalMistakes: number;
  originalText: string;
  tokens: {
    id: number;
    word: string;
    punctuation?: string;
    isMistake: boolean;
    correctWord?: string;
    explanation?: string;
    options?: string[]; // Multiple choice options to fix
  }[];
}

export const detectiveCases: DetectiveStoryCase[] = [
  {
    id: 'case_beach',
    title: 'The Beach Holiday Incident',
    caseBadge: 'Kasus #01 - Pantai Kuta',
    location: 'Pantai & Tepi Laut',
    clue: 'Perhatikan 3 kata kerja yang belum diubah ke Verb 2!',
    totalMistakes: 3,
    originalText: 'Yesterday, I go to the beach. I see many people. We play volleyball.',
    tokens: [
      { id: 1, word: 'Yesterday', punctuation: ',', isMistake: false },
      { id: 2, word: 'I', isMistake: false },
      {
        id: 3,
        word: 'go',
        isMistake: true,
        correctWord: 'went',
        explanation: "'go' (V1) harus diubah menjadi 'went' (V2) karena terjadi 'yesterday'.",
        options: ['went', 'gone', 'goed', 'going']
      },
      { id: 4, word: 'to', isMistake: false },
      { id: 5, word: 'the', isMistake: false },
      { id: 6, word: 'beach', punctuation: '.', isMistake: false },
      { id: 7, word: 'I', isMistake: false },
      {
        id: 8,
        word: 'see',
        isMistake: true,
        correctWord: 'saw',
        explanation: "'see' adalah irregular verb, bentuk lampaunya adalah 'saw'.",
        options: ['saw', 'seed', 'seen', 'seeing']
      },
      { id: 9, word: 'many', isMistake: false },
      { id: 10, word: 'people', punctuation: '.', isMistake: false },
      { id: 11, word: 'We', isMistake: false },
      {
        id: 12,
        word: 'play',
        isMistake: true,
        correctWord: 'played',
        explanation: "'play' adalah regular verb, bentuk lampaunya ditambahkan -ed menjadi 'played'.",
        options: ['played', 'playes', 'playing', 'player']
      },
      { id: 13, word: 'volleyball', punctuation: '.', isMistake: false }
    ]
  },
  {
    id: 'case_camping',
    title: 'The Midnight Camp Mystery',
    caseBadge: 'Kasus #02 - Perkemahan Bromo',
    location: 'Hutan Pinus',
    clue: 'Temukan 3 kata kerja & to be yang salah pada cerita perkemahan!',
    totalMistakes: 3,
    originalText: 'Last Saturday, my scout team arrive at the camp. We build a tent. The night were very cold.',
    tokens: [
      { id: 101, word: 'Last', isMistake: false },
      { id: 102, word: 'Saturday', punctuation: ',', isMistake: false },
      { id: 103, word: 'my', isMistake: false },
      { id: 104, word: 'scout', isMistake: false },
      { id: 105, word: 'team', isMistake: false },
      {
        id: 106,
        word: 'arrive',
        isMistake: true,
        correctWord: 'arrived',
        explanation: "Karena terjadi 'Last Saturday', kata kerja 'arrive' harus menjadi 'arrived'.",
        options: ['arrived', 'arriving', 'arrives', 'arriven']
      },
      { id: 107, word: 'at', isMistake: false },
      { id: 108, word: 'the', isMistake: false },
      { id: 109, word: 'camp', punctuation: '.', isMistake: false },
      { id: 110, word: 'We', isMistake: false },
      {
        id: 111,
        word: 'build',
        isMistake: true,
        correctWord: 'built',
        explanation: "Bentuk Verb 2 dari 'build' adalah 'built' (dengan huruf t di akhir).",
        options: ['built', 'builded', 'building', 'builds']
      },
      { id: 112, word: 'a', isMistake: false },
      { id: 113, word: 'tent', punctuation: '.', isMistake: false },
      { id: 114, word: 'The', isMistake: false },
      { id: 115, word: 'night', isMistake: false },
      {
        id: 116,
        word: 'were',
        isMistake: true,
        correctWord: 'was',
        explanation: "Subjek 'The night' adalah tunggal (It), sehingga to be yang benar adalah 'was', bukan 'were'.",
        options: ['was', 'is', 'are', 'been']
      },
      { id: 117, word: 'very', isMistake: false },
      { id: 118, word: 'cold', punctuation: '.', isMistake: false }
    ]
  },
  {
    id: 'case_cooking',
    title: 'The Kitchen Chaos Riddle',
    caseBadge: 'Kasus #03 - Dapur Ibu',
    location: 'Rumah & Dapur',
    clue: 'Temukan kesalahan kata kerja dalam kalimat negatif dan positif lampau!',
    totalMistakes: 3,
    originalText: 'Yesterday morning, Mother buy fresh vegetables. She did not cooked soup. She make delicious fried noodles.',
    tokens: [
      { id: 201, word: 'Yesterday', isMistake: false },
      { id: 202, word: 'morning', punctuation: ',', isMistake: false },
      { id: 203, word: 'Mother', isMistake: false },
      {
        id: 204,
        word: 'buy',
        isMistake: true,
        correctWord: 'bought',
        explanation: "Bentuk Verb 2 dari 'buy' adalah 'bought'.",
        options: ['bought', 'buyed', 'buying', 'buys']
      },
      { id: 205, word: 'fresh', isMistake: false },
      { id: 206, word: 'vegetables', punctuation: '.', isMistake: false },
      { id: 207, word: 'She', isMistake: false },
      { id: 208, word: 'did', isMistake: false },
      { id: 209, word: 'not', isMistake: false },
      {
        id: 210,
        word: 'cooked',
        isMistake: true,
        correctWord: 'cook',
        explanation: "Setelah 'did not', kata kerja harus kembali ke Verb 1 (cook), bukan Verb 2 (cooked).",
        options: ['cook', 'cooking', 'cooks', 'cooked']
      },
      { id: 211, word: 'soup', punctuation: '.', isMistake: false },
      { id: 212, word: 'She', isMistake: false },
      {
        id: 213,
        word: 'make',
        isMistake: true,
        correctWord: 'made',
        explanation: "Verb 2 dari 'make' adalah 'made'.",
        options: ['made', 'maked', 'making', 'makes']
      },
      { id: 214, word: 'delicious', isMistake: false },
      { id: 215, word: 'fried', isMistake: false },
      { id: 216, word: 'noodles', punctuation: '.', isMistake: false }
    ]
  }
];
