import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Repeat, 
  FileText, 
  Sparkles, 
  Award, 
  Volume2, 
  Gamepad2, 
  ArrowRight, 
  Check, 
  Info,
  HelpCircle
} from 'lucide-react';
import { Screen } from '../types';
import { lessonSections, materialVerbList, timeSignals } from '../data/materialsData';
import { sound } from '../utils/audio';
import { Footer } from '../components/Footer';

interface MaterialViewProps {
  onNavigate: (screen: Screen) => void;
}

export const MaterialView: React.FC<MaterialViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('definition');

  const handlePronounce = (text: string) => {
    sound.speak(text);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 w-full">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Materi Bahasa Inggris Kelas IX SMP
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
                LEARN THE PAST TENSE
              </h1>
              <p className="text-sm sm:text-base text-sky-100 font-medium mt-1">
                Pahami konsep, pola kalimat, dan perubahan kata kerja masa lampau sebelum mulai bermain!
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('dashboard');
              }}
              className="btn-game-primary px-6 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 self-start md:self-auto shrink-0"
            >
              <Gamepad2 className="w-5 h-5 text-amber-950" />
              <span>Mulai Mini-Games</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {lessonSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(sec.id);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
                activeTab === sec.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
          
          {/* TAB 1: DEFINITION & FUNCTIONS */}
          {activeTab === 'definition' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Definition */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold uppercase mb-2">
                  A. Definition
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Pengertian Simple Past Tense
                </h2>
                <div className="mt-3 p-5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-sky-950">
                    <strong>Simple Past Tense</strong> adalah bentuk kalimat dalam bahasa Inggris yang digunakan untuk menyatakan 
                    kegiatan atau kejadian yang <strong>terjadi dan sudah selesai di masa lampau</strong>.
                  </p>
                </div>
              </div>

              {/* Functions */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase mb-2">
                  B. Functions
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-800 mb-3">
                  Fungsi Utama Simple Past Tense
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg mb-3">
                      1
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Kegiatan Selesai</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Menyatakan kegiatan yang telah selesai dilakukan di masa lalu dan tidak berhubungan lagi dengan masa sekarang.
                    </p>
                    <div className="mt-3 text-[11px] font-semibold bg-white p-2 rounded-lg border border-amber-200 text-amber-900">
                      Contoh: <em>I finished my homework last night.</em>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-200">
                    <div className="w-10 h-10 rounded-xl bg-purple-400 text-white flex items-center justify-center font-bold text-lg mb-3">
                      2
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Pengalaman Masa Lampau</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Menceritakan pengalaman pribadi atau kisah yang dialami di masa lalu (seperti saat liburan).
                    </p>
                    <div className="mt-3 text-[11px] font-semibold bg-white p-2 rounded-lg border border-purple-200 text-purple-900">
                      Contoh: <em>We went to Bali last holiday.</em>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400 text-white flex items-center justify-center font-bold text-lg mb-3">
                      3
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Waktu Tertentu yang Jelas</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Menjelaskan peristiwa yang terjadi pada titik waktu spesifik di masa lalu (disertai keterangan waktu).
                    </p>
                    <div className="mt-3 text-[11px] font-semibold bg-white p-2 rounded-lg border border-emerald-200 text-emerald-900">
                      Contoh: <em>The bell rang at 7 o'clock yesterday.</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIME EXPRESSIONS */}
          {activeTab === 'time' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase mb-2">
                  C. Time Expressions
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Keterangan Waktu Lampau (Time Signals)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Keterangan waktu adalah penanda kunci Simple Past Tense. Begitu melihat kata-kata ini, gunakan kata kerja bentuk kedua (Verb 2)!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {timeSignals.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-amber-400 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm sm:text-base text-amber-700">{item.en}</span>
                      <button
                        onClick={() => handlePronounce(item.en)}
                        title="Dengarkan pengucapan"
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-2">Artinya: {item.id}</p>
                    <div className="text-[11px] bg-white p-2 rounded-xl border border-slate-200 text-slate-700 italic">
                      "{item.example}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REGULAR & IRREGULAR VERBS */}
          {activeTab === 'verbs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase mb-2">
                  D. Regular and Irregular Verbs
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Perbedaan Regular Verb & Irregular Verb
                </h2>
              </div>

              {/* Comparison box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
                  <h3 className="font-extrabold text-emerald-900 text-base mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    1. Regular Verbs (Kata Kerja Beraturan)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Hanya perlu menambahkan akhiran <strong>-ed</strong> atau <strong>-d</strong> pada kata kerja bentuk pertama (Verb 1).
                  </p>
                  <div className="mt-3 text-xs bg-white p-3 rounded-xl border border-emerald-200 font-semibold text-emerald-800">
                    Contoh: Play ➔ <strong>Played</strong>, Visit ➔ <strong>Visited</strong>, Walk ➔ <strong>Walked</strong>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300">
                  <h3 className="font-extrabold text-rose-900 text-base mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-600" />
                    2. Irregular Verbs (Kata Kerja Tak Beraturan)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Bentuk kata kerjanya <strong>berubah secara khusus</strong> (atau bahkan sama), tidak berakhiran -ed. Harus dihafalkan!
                  </p>
                  <div className="mt-3 text-xs bg-white p-3 rounded-xl border border-rose-200 font-semibold text-rose-800">
                    Contoh: Go ➔ <strong>Went</strong>, Eat ➔ <strong>Ate</strong>, See ➔ <strong>Saw</strong>, Buy ➔ <strong>Bought</strong>
                  </div>
                </div>
              </div>

              {/* Table of Verbs with Audio */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">
                  Tabel 10+ Kata Kerja Populer Kelas IX (Klik ikon speaker 🔊 untuk dengar pelafalan):
                </h4>
                <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="py-3 px-4">Verb 1 (Present)</th>
                        <th className="py-3 px-4">Verb 2 (Past)</th>
                        <th className="py-3 px-4">Arti (Bahasa Indonesia)</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4 text-center">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {materialVerbList.map((v, i) => (
                        <tr key={i} className="hover:bg-sky-50/50 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-slate-700">
                            <span className="mr-2">{v.icon}</span>{v.v1}
                          </td>
                          <td className="py-2.5 px-4 font-bold text-indigo-700 bg-indigo-50/40">
                            {v.v2}
                          </td>
                          <td className="py-2.5 px-4 text-slate-600 font-medium">
                            {v.meaning}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              v.type.includes('Regular') 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {v.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => handlePronounce(`${v.v1}, ${v.v2}`)}
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-sky-200 text-sky-700 transition-colors"
                              title="Dengarkan pelafalan V1 & V2"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SENTENCE PATTERNS (POSITIVE, NEGATIVE, INTERROGATIVE) */}
          {activeTab === 'patterns' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase mb-2">
                  E. Sentence Patterns
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Pola Kalimat Verbal (Positive, Negative, Interrogative)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Kuasai ketiga rumus dasar berikut agar tidak terjebak dalam mini-game!
                </p>
              </div>

              {/* 3 Formula Cards */}
              <div className="space-y-4">
                
                {/* Positive */}
                <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs">
                      1. Positive Sentence (+)
                    </span>
                    <span className="text-xs font-bold text-emerald-800">Menggunakan Verb 2</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-emerald-200 font-mono text-sm sm:text-base font-extrabold text-emerald-950 mb-3">
                    Subject + Verb 2 + Object / Complement
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 bg-white/70 p-3 rounded-xl border border-emerald-200">
                    <p className="font-bold text-slate-800">Contoh Kalimat:</p>
                    <p className="mt-1 text-slate-700">
                      • <em>I <strong>visited</strong> my grandmother yesterday.</em> (Saya mengunjungi nenek kemarin.)
                    </p>
                    <p className="mt-1 text-slate-700">
                      • <em>They <strong>went</strong> to the library last Sunday.</em> (Mereka pergi ke perpustakaan Minggu lalu.)
                    </p>
                  </div>
                </div>

                {/* Negative */}
                <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-300 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                      2. Negative Sentence (-)
                    </span>
                    <span className="text-xs font-bold text-rose-800">PENTING: Kata kerja kembali ke Verb 1!</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-rose-200 font-mono text-sm sm:text-base font-extrabold text-rose-950 mb-3">
                    Subject + did not (didn't) + Verb 1 + Object / Complement
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-200">
                    <p className="font-bold text-slate-800">Contoh Kalimat:</p>
                    <p className="mt-1 text-slate-700">
                      • <em>I <strong>did not visit</strong> my grandmother yesterday.</em> (Bukan <em>did not visited</em> ❌)
                    </p>
                    <p className="mt-1 text-slate-700">
                      • <em>They <strong>did not go</strong> to the library last Sunday.</em> (Bukan <em>did not went</em> ❌)
                    </p>
                  </div>
                </div>

                {/* Interrogative */}
                <div className="p-5 rounded-3xl bg-sky-50 border-2 border-sky-300 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-xl bg-sky-600 text-white font-black text-xs">
                      3. Interrogative Sentence (?)
                    </span>
                    <span className="text-xs font-bold text-sky-800">Diawali 'Did' + Verb 1</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-sky-200 font-mono text-sm sm:text-base font-extrabold text-sky-950 mb-3">
                    Did + Subject + Verb 1 + Object / Complement?
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 bg-white/70 p-3 rounded-xl border border-sky-200">
                    <p className="font-bold text-slate-800">Contoh Kalimat:</p>
                    <p className="mt-1 text-slate-700">
                      • <em><strong>Did</strong> you <strong>visit</strong> your grandmother yesterday?</em>
                    </p>
                    <p className="mt-1 text-slate-700">
                      • <em><strong>Did</strong> they <strong>buy</strong> new shoes two days ago?</em>
                    </p>
                    <p className="mt-1 text-xs text-sky-800 font-semibold">
                      Jawaban singkat: <em>Yes, I did.</em> / <em>No, I didn't.</em>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: WAS & WERE */}
          {activeTab === 'waswere' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold uppercase mb-2">
                  Nominal Sentences
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Penggunaan "Was" dan "Were" (To Be Lampau)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Digunakan ketika kalimat <strong>tidak memiliki kata kerja aksi</strong>, melainkan diikuti oleh kata sifat (adjective), kata benda (noun), atau keterangan tempat (adverb).
                </p>
              </div>

              {/* Subject Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* WAS Card */}
                <div className="p-5 rounded-3xl bg-amber-50 border-3 border-amber-300 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-amber-900 font-heading">WAS</span>
                    <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2.5 py-1 rounded-xl">
                      Subjek Tunggal (Singular)
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-amber-200 font-bold text-base text-slate-800 mb-3">
                    I, He, She, It, Nama Tunggal (Budi)
                  </div>
                  <div className="text-xs space-y-2 text-slate-700 bg-white/70 p-3 rounded-xl border border-amber-200">
                    <p>• <em>I <strong>was</strong> happy yesterday.</em> (Saya bahagia kemarin.)</p>
                    <p>• <em>She <strong>was</strong> sick two days ago.</em> (Dia sakit dua hari yang lalu.)</p>
                    <p>• <em>He <strong>was not</strong> at school yesterday.</em> (Dia tidak ada di sekolah kemarin.)</p>
                  </div>
                </div>

                {/* WERE Card */}
                <div className="p-5 rounded-3xl bg-indigo-50 border-3 border-indigo-300 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-indigo-900 font-heading">WERE</span>
                    <span className="text-xs font-bold bg-indigo-200 text-indigo-900 px-2.5 py-1 rounded-xl">
                      Subjek Jamak & You (Plural)
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-indigo-200 font-bold text-base text-slate-800 mb-3">
                    You, We, They, Subjek Jamak (Students)
                  </div>
                  <div className="text-xs space-y-2 text-slate-700 bg-white/70 p-3 rounded-xl border border-indigo-200">
                    <p>• <em>You <strong>were</strong> very kind to me.</em> (Kamu sangat baik padaku.)</p>
                    <p>• <em>We <strong>were</strong> in the library last night.</em> (Kami di perpustakaan tadi malam.)</p>
                    <p>• <em>They <strong>were</strong> enthusiastic during the match.</em> (Mereka sangat antusias.)</p>
                  </div>
                </div>

              </div>

              {/* Formula Nominal */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs sm:text-sm text-slate-800">
                <p className="font-extrabold text-slate-900 mb-1">Rumus Kalimat Nominal Lampau:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    (+) S + was/were + Complement
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    (-) S + was/were not + Complement
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    (?) Was/Were + S + Complement?
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SUMMARY & CHEATSHEET */}
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold uppercase mb-2">
                  Tips Cepat Juara
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-800">
                  Rangkuman Emas Simple Past Tense
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300">
                  <h4 className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-1.5">
                    💡 Kunci Verbal (+)
                  </h4>
                  <p className="text-xs text-slate-700">
                    Gunakan <strong>Verb 2</strong> hanya pada kalimat <strong>POSITIF</strong> verbal.
                    Contoh: <em>I <strong>went</strong> to school yesterday.</em>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300">
                  <h4 className="font-bold text-rose-900 text-sm mb-1 flex items-center gap-1.5">
                    💡 Kunci Negatif & Tanya (-) (?)
                  </h4>
                  <p className="text-xs text-slate-700">
                    Karena sudah ada <strong>DID</strong> / <strong>DID NOT</strong>, kata kerjanya wajib kembali ke <strong>VERB 1</strong>!
                    Contoh: <em>Did you <strong>go</strong>?</em> / <em>I did not <strong>go</strong>.</em>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300">
                  <h4 className="font-bold text-sky-900 text-sm mb-1 flex items-center gap-1.5">
                    💡 Kunci Was vs Were
                  </h4>
                  <p className="text-xs text-slate-700">
                    <strong>Was</strong> untuk: I, He, She, It (tunggal).<br />
                    <strong>Were</strong> untuk: You, We, They (jamak).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
                  <h4 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-1.5">
                    💡 Kunci Time Signals
                  </h4>
                  <p className="text-xs text-slate-700">
                    Kata: <em>yesterday, last..., ...ago, this morning</em> adalah alarm bahwa kalimat tersebut merupakan Past Tense!
                  </p>
                </div>
              </div>

              {/* Ready to Play CTA */}
              <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <h3 className="text-lg sm:text-xl font-black font-heading">
                    Sudah Siap Menguji Kemampuanmu?
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-amber-900">
                    Buktikan penguasaanmu di 6 mini-game seru di dashboard!
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('dashboard');
                  }}
                  className="btn-game-purple px-6 py-3 text-sm flex items-center gap-2 whitespace-nowrap"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Masuk ke Dashboard Games
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
};
