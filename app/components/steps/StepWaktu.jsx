"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const PILIHAN_WAKTU = [
  { id: "Full-time", label: "Full-time (Sepenuh waktu)" },
  { id: "Part-time", label: "Part-time (Paruh waktu)" },
  { id: "Fleksibel", label: "Fleksibel (Sesuai mood/waktu luang)" },
];

export default function StepWaktu({ data, onUpdate }) {
  const isCustom = !PILIHAN_WAKTU.find((p) => p.id === data.waktu) && data.waktu !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Clock className="text-aksen-indigo" /> Berapa banyak waktu yang tersedia?
        </h2>
        <p className="text-sm text-foreground/60">
          Bisnis butuh komitmen. Seberapa banyak waktu yang bisa kamu alokasikan?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILIHAN_WAKTU.map((item) => (
          <button
            key={item.id}
            onClick={() => onUpdate("waktu", item.id)}
            className={[
              "p-4 rounded-2xl border text-left transition-all duration-200",
              data.waktu === item.id && !isCustom
                ? "chip-aktif"
                : "bg-card border-border-theme hover:border-aksen-indigo/50 text-foreground"
            ].join(" ")}
          >
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Jelaskan waktu yang tersedia (opsional)</p>
        <input
          type="text"
          value={isCustom ? data.waktu : ""}
          onChange={(e) => onUpdate("waktu", e.target.value)}
          placeholder="Misal: Hanya sabtu minggu, atau 2 jam setiap malam..."
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-indigo focus:ring-1 focus:ring-aksen-indigo transition-all"
        />
      </div>
    </motion.div>
  );
}
