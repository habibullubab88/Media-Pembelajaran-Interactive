import { WheelCategory, WheelQuestion } from '../types';

export const wheelCategories: WheelCategory[] = [
  { id: 1, name: 'Change V1 into V2', color: '#38bdf8', description: 'Ubah bentuk kata kerja ke Verb 2!' },
  { id: 2, name: 'Complete Sentence', color: '#f59e0b', description: 'Lengkapi bagian kalimat yang kosong!' },
  { id: 3, name: 'Negative Sentence', color: '#ec4899', description: 'Ubah ke kalimat negatif lampau!' },
  { id: 4, name: 'Make Questions', color: '#8b5cf6', description: 'Susun kalimat tanya (Did...?)!' },
  { id: 5, name: 'Choose Was / Were', color: '#10b981', description: 'Pilih was atau were yang tepat!' },
  { id: 6, name: 'Translate English', color: '#f97316', description: 'Terjemahkan ke Bahasa Inggris lampau!' }
];

export const wheelQuestions: WheelQuestion[] = [
  // Cat 1: Change V1 into V2
  {
    id: 'w1_1',
    categoryId: 1,
    prompt: "Apa bentuk Verb 2 dari kata kerja 'EAT'?",
    options: ['Eated', 'Ate', 'Eating', 'Eaten'],
    correctIndex: 1,
    explanation: "'Eat' adalah irregular verb. Bentuk lampaunya (V2) adalah 'Ate'.",
    hint: "Huruf awalnya A..."
  },
  {
    id: 'w1_2',
    categoryId: 1,
    prompt: "Apa bentuk Verb 2 dari kata kerja 'BUY'?",
    options: ['Buyed', 'Bought', 'Brought', 'Buying'],
    correctIndex: 1,
    explanation: "'Buy' berubah menjadi 'Bought' pada Simple Past Tense.",
    hint: "Diakhiri dengan -ought"
  },
  {
    id: 'w1_3',
    categoryId: 1,
    prompt: "Bentuk Verb 2 dari kata kerja 'WRITE' adalah...",
    options: ['Writed', 'Written', 'Wrote', 'Writes'],
    correctIndex: 2,
    explanation: "'Write' adalah irregular verb, bentuk Verb 2-nya adalah 'Wrote'.",
    hint: "Huruf 'i' berubah menjadi 'o'."
  },

  // Cat 2: Complete the Sentence
  {
    id: 'w2_1',
    categoryId: 2,
    prompt: "My sister _______ a beautiful dress for the party two days ago.",
    options: ['wears', 'wore', 'wearing', 'weared'],
    correctIndex: 1,
    explanation: "Karena penanda waktu 'two days ago', gunakan Verb 2 dari 'wear' yaitu 'wore'.",
    hint: "Verb 2 dari 'wear'"
  },
  {
    id: 'w2_2',
    categoryId: 2,
    prompt: "We _______ delicious grilled fish on Jimbaran beach last night.",
    options: ['eat', 'ate', 'eating', 'eats'],
    correctIndex: 1,
    explanation: "Penanda waktu 'last night' menandakan kejadian lampau, gunakan 'ate'.",
    hint: "Bentuk lampau dari makan"
  },
  {
    id: 'w2_3',
    categoryId: 2,
    prompt: "Rian _______ his homework before going to bed yesterday.",
    options: ['finished', 'finish', 'finishing', 'finishes'],
    correctIndex: 0,
    explanation: "'Finished' adalah bentuk Verb 2 reguler (+ed) dari kata kerja 'finish'.",
    hint: "Regular verb berakhiran -ed"
  },

  // Cat 3: Make Negative Sentences
  {
    id: 'w3_1',
    categoryId: 3,
    prompt: "Bentuk negatif dari 'I saw a cinema movie yesterday' adalah...",
    options: [
      'I did not saw a cinema movie yesterday.',
      'I did not see a cinema movie yesterday.',
      'I do not see a cinema movie yesterday.',
      'I was not saw a cinema movie yesterday.'
    ],
    correctIndex: 1,
    explanation: "Rumus negatif verbal: Subject + did not + Verb 1 (see). Kata kerja kembali ke bentuk asal (see), bukan saw.",
    hint: "did not + Verb 1"
  },
  {
    id: 'w3_2',
    categoryId: 3,
    prompt: "Bentuk negatif dari 'They visited Borobudur Temple last month' adalah...",
    options: [
      'They did not visit Borobudur Temple last month.',
      'They did not visited Borobudur Temple last month.',
      'They were not visit Borobudur Temple last month.',
      'They do not visited Borobudur Temple last month.'
    ],
    correctIndex: 0,
    explanation: "Setelah 'did not', akhiran -ed pada 'visited' dihilangkan menjadi 'visit'.",
    hint: "Gunakan did not + Verb 1"
  },

  // Cat 4: Make Questions
  {
    id: 'w4_1',
    categoryId: 4,
    prompt: "Ubah ke kalimat tanya: 'You drank orange juice this morning.'",
    options: [
      'Did you drank orange juice this morning?',
      'Did you drink orange juice this morning?',
      'Do you drink orange juice this morning?',
      'Were you drink orange juice this morning?'
    ],
    correctIndex: 1,
    explanation: "Rumus tanya: Did + Subject + Verb 1 + ...? Kata 'drank' kembali menjadi 'drink'.",
    hint: "Did + Subject + Verb 1"
  },
  {
    id: 'w4_2',
    categoryId: 4,
    prompt: "Manakah kalimat tanya Simple Past Tense yang BENAR?",
    options: [
      'Did he went to school yesterday?',
      'Did he goes to school yesterday?',
      'Did he go to school yesterday?',
      'Was he go to school yesterday?'
    ],
    correctIndex: 2,
    explanation: "Setelah kata tanya bantu 'Did', kata kerja 'went' wajib kembali ke 'go' (Verb 1).",
    hint: "Cari yang memakai Verb 1 setelah Did"
  },

  // Cat 5: Choose Was or Were
  {
    id: 'w5_1',
    categoryId: 5,
    prompt: "The students _______ very enthusiastic during the study tour last week.",
    options: ['was', 'were', 'are', 'is'],
    correctIndex: 1,
    explanation: "Subjek 'The students' adalah jamak (plural/they), sehingga to be lampau yang digunakan adalah 'were'.",
    hint: "Subjek lebih dari satu orang"
  },
  {
    id: 'w5_2',
    categoryId: 5,
    prompt: "My grandfather _______ a brave soldier in 1975.",
    options: ['was', 'were', 'is', 'are'],
    correctIndex: 0,
    explanation: "Subjek 'My grandfather' adalah tunggal (he), sehingga to be lampau adalah 'was'.",
    hint: "Subjek tunggal (He)"
  },
  {
    id: 'w5_3',
    categoryId: 5,
    prompt: "We _______ not at home when the rain started yesterday.",
    options: ['was', 'were', 'did', 'are'],
    correctIndex: 1,
    explanation: "Subjek 'We' selalu berpasangan dengan 'were'.",
    hint: "We + were"
  },

  // Cat 6: Translate into English
  {
    id: 'w6_1',
    categoryId: 6,
    prompt: "Terjemahkan: 'Saya bermain sepak bola kemarin sore.'",
    options: [
      'I played football yesterday afternoon.',
      'I play football yesterday afternoon.',
      'I was played football yesterday afternoon.',
      'I am playing football yesterday afternoon.'
    ],
    correctIndex: 0,
    explanation: "Kalimat lampau verbal menggunakan Verb 2 'played' dan keterangan waktu 'yesterday afternoon'.",
    hint: "Gunakan Verb 2 dari play"
  },
  {
    id: 'w6_2',
    categoryId: 6,
    prompt: "Terjemahkan: 'Apakah kamu membeli buku baru kemarin?'",
    options: [
      'Did you bought a new book yesterday?',
      'Did you buy a new book yesterday?',
      'Are you buying a new book yesterday?',
      'Were you buy a new book yesterday?'
    ],
    correctIndex: 1,
    explanation: "Kalimat tanya lampau: 'Did you buy a new book yesterday?'. Kata 'buy' dalam bentuk V1.",
    hint: "Did you buy...?"
  }
];
