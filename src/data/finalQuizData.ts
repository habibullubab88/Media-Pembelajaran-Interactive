import { FinalQuizQuestion } from '../types';

export const finalQuizQuestions: FinalQuizQuestion[] = [
  {
    id: 1,
    question: "What is the past form (Verb 2) of 'GO'?",
    options: ['Goes', 'Went', 'Gone', 'Going'],
    correctAnswer: 1,
    category: 'Verb 2',
    explanation: "'Go' adalah irregular verb. Bentuk lampaunya (Verb 2) adalah 'went'."
  },
  {
    id: 2,
    question: "Yesterday, my sister _______ delicious cookies for our family.",
    options: ['bake', 'bakes', 'baked', 'baking'],
    correctAnswer: 2,
    category: 'Positive',
    explanation: "Karena ada keterangan waktu 'yesterday', gunakan Verb 2 reguler (+d): 'baked'."
  },
  {
    id: 3,
    question: "Which time expression indicates Simple Past Tense?",
    options: ['Tomorrow morning', 'Last Sunday', 'Right now', 'Every Sunday'],
    correctAnswer: 1,
    category: 'Time Expression',
    explanation: "'Last Sunday' menyatakan waktu di masa lampau yang sudah selesai."
  },
  {
    id: 4,
    question: "Budi: 'What did you do two days ago?' - Siti: 'I _______ my grandmother.'",
    options: ['visit', 'visited', 'visiting', 'visits'],
    correctAnswer: 1,
    category: 'Verb 2',
    explanation: "Jawaban kalimat positif lampau menggunakan Verb 2 yaitu 'visited'."
  },
  {
    id: 5,
    question: "The negative form of 'She bought a novel last night' is...",
    options: [
      'She did not bought a novel last night.',
      'She did not buy a novel last night.',
      'She was not bought a novel last night.',
      'She does not buy a novel last night.'
    ],
    correctAnswer: 1,
    category: 'Negative',
    explanation: "Rumus kalimat negatif: Subject + did not + Verb 1 (buy). Kata 'bought' kembali ke 'buy'."
  },
  {
    id: 6,
    question: "The students _______ very noisy before the teacher came yesterday.",
    options: ['was', 'were', 'is', 'are'],
    correctAnswer: 1,
    category: 'Was/Were',
    explanation: "Subjek 'The students' berbentuk jamak (plural/they), sehingga menggunakan 'were'."
  },
  {
    id: 7,
    question: "_______ you watch the world cup match on TV last night?",
    options: ['Do', 'Did', 'Were', 'Are'],
    correctAnswer: 1,
    category: 'Interrogative',
    explanation: "Kalimat tanya verbal lampau diawali dengan auxiliary verb 'Did'."
  },
  {
    id: 8,
    question: "What is the past form (Verb 2) of 'SWIM'?",
    options: ['Swims', 'Swam', 'Swum', 'Swimmed'],
    correctAnswer: 1,
    category: 'Verb 2',
    explanation: "'Swim' adalah irregular verb. Bentuk Verb 2 adalah 'swam' (huruf i menjadi a)."
  },
  {
    id: 9,
    question: "I _______ very happy when I got the first rank last semester.",
    options: ['was', 'were', 'am', 'did'],
    correctAnswer: 0,
    category: 'Was/Were',
    explanation: "Subjek 'I' menggunakan to be lampau 'was' untuk kalimat nominal."
  },
  {
    id: 10,
    question: "Kalimat negatif yang BENAR di bawah ini adalah...",
    options: [
      'They did not came to my house.',
      'They did not come to my house.',
      'They not came to my house.',
      'They were not came to my house.'
    ],
    correctAnswer: 1,
    category: 'Negative',
    explanation: "Setelah kata bantu 'did not', kata kerja harus berupa Verb 1 'come', bukan 'came'."
  },
  {
    id: 11,
    question: "Did Rian _______ the English speech competition two weeks ago?",
    options: ['won', 'win', 'winning', 'wins'],
    correctAnswer: 1,
    category: 'Interrogative',
    explanation: "Pada kalimat tanya yang memakai 'Did', kata kerja kembali ke Verb 1 'win'."
  },
  {
    id: 12,
    question: "What is the past form (Verb 2) of 'WRITE'?",
    options: ['Wrote', 'Written', 'Writed', 'Writing'],
    correctAnswer: 0,
    category: 'Verb 2',
    explanation: "'Write' berubah menjadi 'wrote' pada Simple Past Tense."
  },
  {
    id: 13,
    question: "My father and mother _______ in Surabaya last month.",
    options: ['was', 'were', 'are', 'is'],
    correctAnswer: 1,
    category: 'Was/Were',
    explanation: "'My father and mother' adalah 2 orang (They/jamak), sehingga memakai to be 'were'."
  },
  {
    id: 14,
    question: "He _______ his bicycle in the park yesterday afternoon.",
    options: ['rode', 'ride', 'ridden', 'riding'],
    correctAnswer: 0,
    category: 'Positive',
    explanation: "Bentuk Verb 2 dari 'ride' adalah 'rode'."
  },
  {
    id: 15,
    question: "Which sentence is grammatically correct in Simple Past Tense?",
    options: [
      'She saw a beautiful bird in the tree this morning.',
      'She seed a beautiful bird in the tree this morning.',
      'She see a beautiful bird in the tree this morning.',
      'She was see a beautiful bird in the tree this morning.'
    ],
    correctAnswer: 0,
    category: 'Positive',
    explanation: "'Saw' adalah Verb 2 dari 'see'. Kalimat ini mengikuti pola Subject + Verb 2 + Object."
  }
];
