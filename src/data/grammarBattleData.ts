import { GrammarBattleItem } from '../types';

export const grammarBattleQuestions: GrammarBattleItem[] = [
  {
    id: 1,
    sentence: "I went to school yesterday.",
    isCorrect: true,
    explanation: "BENAR! Kalimat positif lampau menggunakan Verb 2 dari 'go' yaitu 'went' dan keterangan waktu 'yesterday'.",
    topic: "Positive Sentences (Irregular Verb)"
  },
  {
    id: 2,
    sentence: "She go to the market last Sunday.",
    isCorrect: false,
    correction: "She went to the market last Sunday.",
    explanation: "SALAH! Karena ada keterangan waktu 'last Sunday', kata kerja 'go' (V1) harus diubah menjadi 'went' (V2).",
    topic: "Positive Sentences (Verb 2)"
  },
  {
    id: 3,
    sentence: "They did not played basketball last weekend.",
    isCorrect: false,
    correction: "They did not play basketball last weekend.",
    explanation: "SALAH! Pada kalimat negatif lampau yang sudah ada kata bantu 'did not', kata kerjanya HARUS kembali ke Verb 1 (play), bukan Verb 2 (played).",
    topic: "Negative Sentences (did not + V1)"
  },
  {
    id: 4,
    sentence: "We visited our grandparents two days ago.",
    isCorrect: true,
    explanation: "BENAR! 'Visited' adalah Verb 2 dari 'visit' (regular verb dengan akhiran -ed) dengan penanda waktu 'two days ago'.",
    topic: "Positive Sentences (Regular Verb)"
  },
  {
    id: 5,
    sentence: "Did you bought that storybook yesterday?",
    isCorrect: false,
    correction: "Did you buy that storybook yesterday?",
    explanation: "SALAH! Pada kalimat tanya yang diawali 'Did', kata kerja utama HARUS kembali ke bentuk Verb 1 yaitu 'buy', bukan 'bought'.",
    topic: "Interrogative Sentences (Did + V1?)"
  },
  {
    id: 6,
    sentence: "Budi and Ani were happy at the birthday party last night.",
    isCorrect: true,
    explanation: "BENAR! Subjek 'Budi and Ani' adalah jamak (They), sehingga to be lampau yang tepat adalah 'were'.",
    topic: "Nominal Sentences (Were)"
  },
  {
    id: 7,
    sentence: "My brother was sick two days ago.",
    isCorrect: true,
    explanation: "BENAR! Subjek tunggal 'My brother' (He) berpasangan dengan 'was'.",
    topic: "Nominal Sentences (Was)"
  },
  {
    id: 8,
    sentence: "I were very tired after the trip yesterday.",
    isCorrect: false,
    correction: "I was very tired after the trip yesterday.",
    explanation: "SALAH! Untuk subjek 'I', to be lampau yang benar adalah 'was', bukan 'were'. (I, He, She, It menggunakan was).",
    topic: "Nominal Sentences (Was vs Were)"
  },
  {
    id: 9,
    sentence: "She did not drink milk this morning.",
    isCorrect: true,
    explanation: "BENAR! Pola negatif: Subject + did not + Verb 1 (drink). 'Drink' sudah tepat dalam bentuk Verb 1.",
    topic: "Negative Sentences"
  },
  {
    id: 10,
    sentence: "My teacher wrote a new announcement yesterday.",
    isCorrect: true,
    explanation: "BENAR! 'Wrote' adalah Verb 2 dari 'write' (irregular verb) untuk kejadian lampau.",
    topic: "Positive Sentences (Irregular Verb)"
  },
  {
    id: 11,
    sentence: "Did they swam in the river last holiday?",
    isCorrect: false,
    correction: "Did they swim in the river last holiday?",
    explanation: "SALAH! Karena ada auxiliary verb 'Did', maka kata kerja wajib Verb 1 'swim', bukan 'swam'.",
    topic: "Interrogative Sentences"
  },
  {
    id: 12,
    sentence: "We watched a great football match last night.",
    isCorrect: true,
    explanation: "BENAR! 'Watched' merupakan bentuk Verb 2 reguler (+ed) dari 'watch'.",
    topic: "Regular Verbs"
  }
];
