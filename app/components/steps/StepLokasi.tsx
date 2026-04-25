"use client";

import { motion } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import CardOption from "../ui/CardOption";
import { Home, School, Building2, Trees } from "lucide-react";
import { useState } from "react";

const PILIHAN_LOKASI = [
  { id: "Perumahan", label: "Perumahan Padat", description: "Potensi tetangga sebagai pasar awal", icon: <Home className="w-6 h-6" />, accent: "blue" as const },
  { id: "Kampus", label: "Area Sekolah/Kampus", description: "Banyak pelajar & mahasiswa", icon: <School className="w-6 h-6" />, accent: "cyan" as const },
  { id: "Kota ramai", label: "Pusat Kota / Jalan Raya", description: "Traffic orang lalu lalang tinggi", icon: <Building2 className="w-6 h-6" />, accent: "purple" as const },
  { id: "Desa", label: "Desa / Pinggiran", description: "Suasana tenang, kompetisi minim", icon: <Trees className="w-6 h-6" />, accent: "pink" as const },
];

export default function StepLokasi() {
  const dataUser = useWizardStore((state) => state.dataUser);
  const updateData = useWizardStore((state) => state.updateData);
  const nextStep = useWizardStore((state) => state.nextStep);
  
  const [customInput, setCustomInput] = useState("");
  const isCustom = !PILIHAN_LOKASI.find(p => p.id === dataUser.lokasi) && dataUser.lokasi !== "";

  const handleSelect = (id: string) => {
    updateData("lokasi", id);
    setTimeout(() => nextStep(), 300);
  };

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== "") {
      updateData("lokasi", customInput);
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
        Dimana lokasi<br />bisnis ini berjalan?
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
        {PILIHAN_LOKASI.map((item) => (
          <CardOption
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            icon={item.icon}
            accent={item.accent}
            isSelected={dataUser.lokasi === item.id && !isCustom}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mt-4">
        <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Kota spesifik (Opsional)</p>
        <input
          type="text"
          value={isCustom ? dataUser.lokasi : customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            updateData("lokasi", e.target.value);
          }}
          onKeyDown={handleCustomSubmit}
          placeholder="Misal: Dekat pabrik garmen besar..."
          className="w-full text-center editorial-card rounded-2xl px-6 py-4 text-lg font-medium text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
