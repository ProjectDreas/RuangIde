"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Clock, CalendarDays, Zap } from "lucide-react";
import { useState } from "react";

const PILIHAN_WAKTU = [
  { id: "Full-time", label: "Full-time", description: "Bisa fokus 100% setiap hari", icon: <CalendarDays className="w-6 h-6" />, accent: "blue" as const },
  { id: "Part-time", label: "Part-time", description: "Hanya beberapa jam sehari", icon: <Clock className="w-6 h-6" />, accent: "orange" as const },
  { id: "Fleksibel", label: "Fleksibel", description: "Sesuai waktu luang aja", icon: <Zap className="w-6 h-6" />, accent: "cyan" as const },
];

export default function StepWaktu() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const [customInput, setCustomInput] = useState("");
  const isCustom = !PILIHAN_WAKTU.find(p => p.id === dataUser.waktu) && dataUser.waktu !== "";

  const handleSelect = (id: string) => {
    updateData("waktu", id);
    setTimeout(() => nextStep(), 300);
  };

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== "") {
      updateData("waktu", customInput);
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
        Berapa banyak waktu<br />yang bisa kamu luangkan?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
        {PILIHAN_WAKTU.map((item) => (
          <CardOption
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            icon={item.icon}
            accent={item.accent}
            isSelected={dataUser.waktu === item.id && !isCustom}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mt-4">
        <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Tulis spesifik (Opsional)</p>
        <input
          type="text"
          value={isCustom ? dataUser.waktu : customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            updateData("waktu", e.target.value);
          }}
          onKeyDown={handleCustomSubmit}
          className="w-full text-center editorial-card rounded-2xl px-6 py-4 text-lg font-medium text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
