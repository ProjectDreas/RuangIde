"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

const PILIHAN_TUJUAN = [
  { id: "Penghasilan tambahan", label: "Penghasilan tambahan" },
  { id: "Penghasilan utama", label: "Penghasilan utama" },
  { id: "Coba dulu", label: "Coba dulu" },
  { id: "Jangka panjang", label: "Jangka panjang" },
];

export default function StepTujuan({ data, onUpdate }) {
  const isCustom = !PILIHAN_TUJUAN.find((p) => p.id === data.tujuan) && data.tujuan !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Target className="text-aksen-sian" /> Apa tujuan utamamu berbisnis?
        </h2>
        <p className="text-sm text-foreground/60">
          Pilih salah satu yang paling menggambarkan motivasimu saat ini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILIHAN_TUJUAN.map((item) => (
          <button
            key={item.id}
            onClick={() => onUpdate("tujuan", item.id)}
            className={[
              "p-4 rounded-2xl border text-left transition-all duration-200",
              data.tujuan === item.id && !isCustom
                ? "chip-aktif"
                : "bg-card border-border-theme hover:border-aksen-sian/50 text-foreground"
            ].join(" ")}
          >
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Atau tulis tujuanmu sendiri</p>
        <input
          type="text"
          value={isCustom ? data.tujuan : ""}
          onChange={(e) => onUpdate("tujuan", e.target.value)}
          placeholder="Misal: Untuk biaya nikah tahun depan"
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-sian focus:ring-1 focus:ring-aksen-sian transition-all"
        />
      </div>
    </motion.div>
  );
}
