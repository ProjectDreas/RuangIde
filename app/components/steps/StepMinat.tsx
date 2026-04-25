"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Utensils, Laptop, Scissors, ShoppingBag, Leaf, Paintbrush, ArrowRight } from "lucide-react";

const PILIHAN_MINAT = [
  { id: "Kuliner", label: "Kuliner & F&B", icon: <Utensils className="w-6 h-6" />, accent: "orange" as const },
  { id: "Digital", label: "Digital & IT", icon: <Laptop className="w-6 h-6" />, accent: "blue" as const },
  { id: "Jasa", label: "Jasa & Layanan", icon: <Scissors className="w-6 h-6" />, accent: "pink" as const },
  { id: "Fashion", label: "Fashion & Pakaian", icon: <ShoppingBag className="w-6 h-6" />, accent: "purple" as const },
  { id: "Agribisnis", label: "Agribisnis & Alam", icon: <Leaf className="w-6 h-6" />, accent: "yellow" as const },
  { id: "Kreatif", label: "Industri Kreatif", icon: <Paintbrush className="w-6 h-6" />, accent: "cyan" as const },
];

export default function StepMinat() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const toggleMinat = useWizardStore((state) => state.toggleMinat);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const selectedCount = dataUser.minat.length;
  const isNextDisabled = selectedCount === 0 && dataUser.tambahan.trim() === "";

  const handleToggle = (id: string) => {
    toggleMinat(id);
    const isCurrentlySelected = dataUser.minat.includes(id);
    // Jika menambah pilihan baru dan totalnya akan menjadi 3
    if (!isCurrentlySelected && selectedCount === 2) {
      setTimeout(() => nextStep(), 350);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center w-full"
    >
      <h2 className="font-jakarta text-4xl md:text-5xl font-bold tracking-tight text-center mb-4 max-w-2xl text-foreground">
        Apa industri & minat<br />utama kamu?
      </h2>
      <p className="text-center font-medium text-foreground/70 mb-10">
        Pilih maksimal 3 kategori ({selectedCount}/3 terpilih)
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl mb-10">
        {PILIHAN_MINAT.map((item) => {
          const isSelected = dataUser.minat.includes(item.id);
          const isDisabled = !isSelected && selectedCount >= 3;

          return (
            <CardOption
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              accent={item.accent}
              isSelected={isSelected}
              onClick={handleToggle}
              disabled={isDisabled}
            />
          );
        })}
      </div>

      <div className="w-full max-w-2xl mb-10">
        <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Apa skill atau minat spesifik kamu?</p>
        <textarea
          rows={2}
          value={dataUser.tambahan} // Menggunakan dataUser.tambahan untuk input ini
          onChange={(e) => updateData("tambahan", e.target.value)}
          placeholder="Misal: Saya jago masak makanan pedas, bisa desain Canva, dll..."
          className="input-custom w-full rounded-2xl px-6 py-4 text-base font-medium placeholder-foreground/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all resize-none"
        />
      </div>

      <button
        onClick={nextStep}
        disabled={isNextDisabled}
        className="group relative px-10 py-4 rounded-full font-bold text-lg text-white tombol-gradasi-aktif overflow-hidden shadow-2xl shadow-aksen-biru/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:transform-none disabled:hover:shadow-none"
      >
        <span className="relative z-10 flex items-center gap-2">
          Lanjut
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </motion.div>
  );
}
