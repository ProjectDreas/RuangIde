"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Coins, Rocket, Target, Zap } from "lucide-react";
import { useState } from "react";

const PILIHAN_TUJUAN = [
  { id: "Penghasilan tambahan", label: "Penghasilan Tambahan", icon: <Coins className="w-6 h-6" />, accent: "blue" as const },
  { id: "Penghasilan utama", label: "Penghasilan Utama", icon: <Target className="w-6 h-6" />, accent: "purple" as const },
  { id: "Coba dulu", label: "Coba-coba Dulu", icon: <Zap className="w-6 h-6" />, accent: "orange" as const },
  { id: "Jangka panjang", label: "Bisnis Jangka Panjang", icon: <Rocket className="w-6 h-6" />, accent: "cyan" as const },
];

export default function StepTujuan() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const [customInput, setCustomInput] = useState("");
  const isCustom = !PILIHAN_TUJUAN.find(p => p.id === dataUser.tujuan) && dataUser.tujuan !== "";

  const handleSelect = (id: string) => {
    updateData("tujuan", id);
    setTimeout(() => nextStep(), 300); // Auto next with slight delay for the animation
  };

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== "") {
      updateData("tujuan", customInput);
      setTimeout(() => nextStep(), 200);
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
      <h2 className="font-jakarta text-4xl md:text-5xl font-bold tracking-tight text-center mb-12 max-w-2xl text-foreground">
        Apa tujuan kamu<br />memulai bisnis?
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
        {PILIHAN_TUJUAN.map((item) => (
          <CardOption
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            accent={item.accent}
            isSelected={dataUser.tujuan === item.id && !isCustom}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mt-4">
        <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Atau ketik sendiri</p>
        <input
          type="text"
          value={isCustom ? dataUser.tujuan : customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            updateData("tujuan", e.target.value);
          }}
          onKeyDown={handleCustomSubmit}
          placeholder="Misal: Buat modal nikah tahun depan..."
          className="w-full text-center editorial-card rounded-2xl px-6 py-4 text-lg font-medium text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
