"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import { Wand2 } from "lucide-react"; // Note: Sparkles might be better but let's use what we have

const CHIPS_CEPAT = [
  "Harus full online",
  "Nggak mau urus karyawan",
  "Target anak sekolahan",
  "Produk harus tahan lama",
  "Pemasaran via TikTok"
];

export default function StepTambahan() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  const setIsGenerating = useWizardStore((state) => state.setIsGenerating);

  // Here additional text is basically appended to whatever might have been written, but wait, StepMinat already uses 'tambahan' for 'skill spesifik'.
  // Actually, since they share 'tambahan', we'll just let them add more to it.
  
  const handleChipClick = (chip: string) => {
    const currentText = dataUser.tambahan || "";
    if (currentText.includes(chip)) return;
    const newText = currentText ? `${currentText}, ${chip}` : chip;
    updateData("tambahan", newText);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // API Call is orchestrated in the parent, or we can just navigate to step 8 (Result) where the API call happens.
    nextStep(); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center w-full"
    >
      <h2 className="font-jakarta text-4xl md:text-5xl font-bold tracking-tight text-center mb-6 max-w-2xl text-foreground">
        Satu langkah lagi!
      </h2>
      <p className="text-center font-medium text-foreground/70 mb-12 max-w-xl">
        Ada detail tambahan yang ingin kamu sampaikan ke AI? Semakin detail, semakin akurat!
      </p>

      <div className="w-full max-w-2xl mb-12">
        <textarea
          rows={5}
          value={dataUser.tambahan}
          onChange={(e) => updateData("tambahan", e.target.value)}
          placeholder="Contoh: Saya punya motor nganggur, suka jalan-jalan, dan nggak suka jualan langsung face-to-face..."
          className="w-full editorial-card rounded-3xl px-6 py-5 text-lg font-medium text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all resize-none shadow-xl"
        />

        <div className="mt-6">
          <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">Klik untuk tambah cepat</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {CHIPS_CEPAT.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="px-4 py-2 rounded-full editorial-card text-sm font-medium text-foreground/80 hover:text-aksen-biru transition-colors"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="group relative px-12 py-5 rounded-full font-black text-xl text-white tombol-gradasi-aktif overflow-hidden shadow-2xl shadow-aksen-biru/30"
      >
        <span className="relative z-10 flex items-center gap-2">
          Hasilkan Ide Bisnis
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
      </button>
    </motion.div>
  );
}
