"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Banknote, PiggyBank, Wallet, Landmark } from "lucide-react";
import { useState } from "react";

const PILIHAN_MODAL = [
  { id: "< 1 juta", label: "< Rp 1 Juta", description: "Modal sangat minim", icon: <PiggyBank className="w-6 h-6" />, accent: "blue" as const },
  { id: "1-3 juta", label: "Rp 1 - 3 Juta", description: "Cukup untuk stok awal", icon: <Wallet className="w-6 h-6" />, accent: "cyan" as const },
  { id: "3-10 juta", label: "Rp 3 - 10 Juta", description: "Bisa buat branding & iklan", icon: <Banknote className="w-6 h-6" />, accent: "purple" as const },
  { id: "> 10 juta", label: "> Rp 10 Juta", description: "Siap gaspol skala besar", icon: <Landmark className="w-6 h-6" />, accent: "pink" as const },
];

export default function StepModal() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const [customInput, setCustomInput] = useState("");
  const isCustom = !PILIHAN_MODAL.find(p => p.id === dataUser.modal) && dataUser.modal !== "";

  const handleSelect = (id: string) => {
    updateData("modal", id);
    setTimeout(() => nextStep(), 300);
  };

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== "") {
      updateData("modal", customInput);
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
        Berapa budget modal<br />yang kamu siapkan?
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
        {PILIHAN_MODAL.map((item) => (
          <CardOption
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            icon={item.icon}
            accent={item.accent}
            isSelected={dataUser.modal === item.id && !isCustom}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mt-4">
        <label className="block text-center text-sm font-bold text-foreground/60 mb-1">
          Nominal spesifik (opsional)
        </label>
        <p className="text-center text-xs text-foreground/40 mb-4">
          Isi jika kamu punya angka pasti
        </p>
        <input
          type="text"
          placeholder="Contoh: Rp 2.500.000"
          value={isCustom ? dataUser.modal : customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            updateData("modal", e.target.value);
          }}
          onKeyDown={handleCustomSubmit}
          className="input-custom w-full text-center rounded-2xl px-6 py-4 text-lg font-medium"
        />
      </div>
    </motion.div>
  );
}
