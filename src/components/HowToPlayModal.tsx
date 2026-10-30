import React from 'react';
import { X, Sparkles, BookOpen, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  const games = [
    {
      num: '1',
      title: 'Verb Match (Memory Card)',
      icon: '🃏',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      desc: 'Buka 2 kartu untuk mencocokkan pasangan Verb 1 (Present) dan Verb 2 (Past). Contoh: Go berpasangan dengan Went, Buy dengan Bought. Hafalkan posisi kartu!',
      tip: 'Makin sedikit langkah, makin tinggi poin yang kamu dapatkan.'
    },
    {
      num: '2',
      title: 'Grammar Battle (True / False)',
      icon: '⚔️',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      desc: 'Analisis kalimat lampau yang ditampilkan! Tentukan apakah struktur grammar-nya TRUE (Benar) atau FALSE (Salah). Jika salah, kamu akan melihat kalimat koreksi yang benar.',
      tip: 'Waspada dengan did not + Verb 1 dan Was/Were!'
    },
    {
      num: '3',
      title: 'Lucky Wheel (Roda Keberuntungan)',
      icon: '🎡',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      desc: 'Tekan tombol SPIN untuk memutar roda tantangan. Jawab pertanyaan sesuai kategori tempat roda berhenti (Ubah V1 ke V2, Lengkapi Kalimat, Kalimat Negatif, Tanya, Was/Were, atau Terjemahan).',
      tip: 'Putar roda sebanyak-banyaknya untuk menumpuk skor tertinggi!'
    },
    {
      num: '4',
      title: 'Detective Case (Detektif Grammar)',
      icon: '🕵️‍♂️',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      desc: 'Jadilah detektif bahasa! Baca cerita pendek dan temukan kata kerja lampau yang salah tulis. Klik kata yang mencurigakan dan pilih perbaikan yang tepat.',
      tip: 'Gunakan tombol "Petunjuk / Hint" jika kamu butuh bantuan penyelidikan.'
    },
    {
      num: '5',
      title: 'Story Maker (Komik Petualangan)',
      icon: '🎨',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Lengkapi komik liburan 4–5 panel! Setiap panel memiliki bagian narasi rumpang. Pilih kata kerja bentuk lampau (Verb 2) yang sesuai agar cerita komik selesai sempurna.',
      tip: 'Setelah semua panel terisi, kamu bisa membaca komik utuh!'
    },
    {
      num: '6',
      title: 'Final Quiz (Ujian Akhir 15 Soal)',
      icon: '🎓',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'Uji penguasaan Simple Past Tense secara menyeluruh dalam 15 soal pilihan ganda. Dapatkan umpan balik langsung dan sertifikat nilai akhir!',
      tip: 'Dapatkan skor di atas 120 poin untuk membuka gelar Past Tense Grandmaster.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                Panduan Bermain (How to Play)
              </h3>
              <p className="text-xs sm:text-sm text-amber-50 font-medium">
                Petunjuk cara seru belajar Simple Past Tense di setiap mini-game!
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-indigo-950 space-y-1">
              <p className="font-bold">Tips Sukses Belajar:</p>
              <p>
                Sebelum bermain, sangat disarankan membaca menu <strong>Materi (Learn the Past Tense)</strong> terlebih dahulu agar memahami perbedaan Regular dan Irregular Verbs, kata bantu <em>Did</em>, serta penggunaan <em>Was</em> & <em>Were</em>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {games.map((g) => (
              <div key={g.num} className={`p-4 rounded-2xl border-2 ${g.color} flex flex-col justify-between transition-all hover:shadow-xs`}>
                <div>
                  <div className="flex items-center gap-2 mb-2 font-bold font-heading text-sm sm:text-base">
                    <span className="text-xl">{g.icon}</span>
                    <span>Game {g.num}: {g.title}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {g.desc}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 bg-white/80 p-2 rounded-xl border border-current/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{g.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleClose}
            className="btn-game-primary px-6 py-2.5 text-sm"
          >
            Saya Siap Bermain! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
