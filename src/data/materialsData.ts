export interface LessonSection {
  id: string;
  title: string;
  icon: string;
  badge: string;
  color: string;
}

export const lessonSections: LessonSection[] = [
  { id: 'definition', title: '1. Pengertian & Fungsi', icon: 'BookOpen', badge: 'Dasar', color: 'bg-sky-500' },
  { id: 'time', title: '2. Time Expressions', icon: 'Clock', badge: 'Keterangan Waktu', color: 'bg-amber-500' },
  { id: 'verbs', title: '3. Regular & Irregular Verbs', icon: 'Repeat', badge: 'Kata Kerja', color: 'bg-emerald-500' },
  { id: 'patterns', title: '4. Pola Kalimat Verbal', icon: 'FileText', badge: 'Rumus Verbal', color: 'bg-indigo-500' },
  { id: 'waswere', title: '5. Penggunaan Was & Were', icon: 'Sparkles', badge: 'Nominal Sentences', color: 'bg-rose-500' },
  { id: 'summary', title: '6. Rangkuman & Tips Cepat', icon: 'Award', badge: 'Cheatsheet', color: 'bg-purple-500' },
];

export const materialVerbList = [
  { v1: 'Play', v2: 'Played', meaning: 'Bermain', type: 'Regular (+ed)', icon: '⚽' },
  { v1: 'Visit', v2: 'Visited', meaning: 'Mengunjungi', type: 'Regular (+ed)', icon: '🏡' },
  { v1: 'Walk', v2: 'Walked', meaning: 'Berjalan', type: 'Regular (+ed)', icon: '🚶' },
  { v1: 'Study', v2: 'Studied', meaning: 'Belajar', type: 'Regular (y -> ied)', icon: '📚' },
  { v1: 'Watch', v2: 'Watched', meaning: 'Menonton', type: 'Regular (+ed)', icon: '📺' },
  { v1: 'Go', v2: 'Went', meaning: 'Pergi', type: 'Irregular (Berubah)', icon: '🚀' },
  { v1: 'Eat', v2: 'Ate', meaning: 'Makan', type: 'Irregular (Berubah)', icon: '🍕' },
  { v1: 'See', v2: 'Saw', meaning: 'Melihat', type: 'Irregular (Berubah)', icon: '👀' },
  { v1: 'Buy', v2: 'Bought', meaning: 'Membeli', type: 'Irregular (Berubah)', icon: '🛍️' },
  { v1: 'Take', v2: 'Took', meaning: 'Mengambil/Membawa', type: 'Irregular (Berubah)', icon: '📸' },
  { v1: 'Write', v2: 'Wrote', meaning: 'Menulis', type: 'Irregular (Berubah)', icon: '✍️' },
  { v1: 'Swim', v2: 'Swam', meaning: 'Berenang', type: 'Irregular (Berubah)', icon: '🏊' },
  { v1: 'Drink', v2: 'Drank', meaning: 'Minum', type: 'Irregular (Berubah)', icon: '🥤' },
  { v1: 'Make', v2: 'Made', meaning: 'Membuat', type: 'Irregular (Berubah)', icon: '🛠️' },
  { v1: 'Read', v2: 'Read (red)', meaning: 'Membaca', type: 'Irregular (Sama ejaan)', icon: '📖' },
];

export const timeSignals = [
  { en: 'Yesterday', id: 'Kemarin', example: 'I played football yesterday.' },
  { en: 'Last night', id: 'Tadi malam', example: 'She called me last night.' },
  { en: 'Last week', id: 'Minggu lalu', example: 'We visited museum last week.' },
  { en: 'Last Sunday', id: 'Hari Minggu lalu', example: 'They went to the beach last Sunday.' },
  { en: 'Two days ago', id: 'Dua hari yang lalu', example: 'He bought a new bicycle two days ago.' },
  { en: 'A year ago', id: 'Setahun yang lalu', example: 'We moved to this town a year ago.' },
  { en: 'This morning', id: 'Tadi pagi', example: 'I ate fried rice this morning.' },
  { en: 'In 2022', id: 'Pada tahun 2022', example: 'My brother graduated in 2022.' },
];
