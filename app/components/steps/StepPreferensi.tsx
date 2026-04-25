"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Rabbit, ShieldCheck, Flame, HeartHandshake } from "lucide-react";
import { useState } from "react";

const PILIHAN_PREFERENSI = [
  { id: "Cepat balik modal", label: "Cepat Balik Modal", description: "ROI cepat diutamakan", icon: <Rabbit className="w-6 h-6" />, accent: "blue" as const },
  { id: "Stabil", label: "Stabil & Aman", description: "Lebih baik pelan tapi pasti", icon: <ShieldCheck className="w-6 h-6" />, accent: "cyan" as const },
  { id: "Tren / viral", label: "Ikut Tren Viral", description: "High risk, high return", icon: <Flame className="w-6 h-6" />, accent: "purple" as const },
  { id: "Minim risiko", label: "Minim Risiko", description: "Modal kecil & main aman", icon: <HeartHandshake className="w-6 h-6" />, accent: "pink" as const },
];

export default function StepPreferensi() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const [customInput, setCustomInput] = useState("");
  const isCustom = !PILIHAN_PREFERENSI.find(p => p.id === dataUser.preferensi) && dataUser.preferensi !== "";

  const handleSelect = (id: string) => {
    updateData("preferensi", id);
    setTimeout(() => nextStep(), 300);
  };

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== "") {
      updateData("preferensi", customInput);
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
        Apa harapan utama<br />dari bisnis ini?
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
        {PILIHAN_PREFERENSI.map((item) => (
          <CardOption
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            icon={item.icon}
            accent={item.accent}
            isSelected={dataUser.preferensi === item.id && !isCustom}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mt-4">
        <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Tulis spesifik (Opsional)</p>
        <input
          type="text"
          value={isCustom ? dataUser.preferensi : customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            updateData("preferensi", e.target.value);
          }}
          onKeyDown={handleCustomSubmit}
          className="w-full text-center editorial-card rounded-2xl px-6 py-4 text-lg font-medium text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
