"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const PILIHAN_MODAL = [
  { id: "< 1 juta", label: "Kurang dari 1 Juta" },
  { id: "1-3 juta", label: "1 - 3 Juta" },
  { id: "3-10 juta", label: "3 - 10 Juta" },
  { id: "> 10 juta", label: "Lebih dari 10 Juta" },
];

export default function StepModal({ data, onUpdate }) {
  const isCustom = !PILIHAN_MODAL.find((p) => p.id === data.modal) && data.modal !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Wallet className="text-aksen-biru" /> Berapa modal yang kamu siapkan?
        </h2>
        <p className="text-sm text-foreground/60">
          Pilih rentang modal yang paling sesuai dengan kondisimu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILIHAN_MODAL.map((item) => (
          <button
            key={item.id}
            onClick={() => onUpdate("modal", item.id)}
            className={[
              "p-4 rounded-2xl border text-left transition-all duration-200",
              data.modal === item.id && !isCustom
                ? "chip-aktif"
                : "bg-card border-border-theme hover:border-aksen-biru/50 text-foreground"
            ].join(" ")}
          >
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Tulis nominal spesifik (opsional)</p>
        <input
          type="text"
          value={isCustom ? data.modal : ""}
          onChange={(e) => onUpdate("modal", e.target.value)}
          placeholder="Misal: Rp 500.000 atau Rp 2.500.000"
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-biru focus:ring-1 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
