"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PILIHAN_MINAT = [
  { id: "Kuliner", label: "Kuliner" },
  { id: "Digital", label: "Digital / IT" },
  { id: "Jasa", label: "Jasa" },
  { id: "Fashion", label: "Fashion" },
  { id: "Agribisnis", label: "Agribisnis" },
  { id: "Kreatif", label: "Industri Kreatif" },
];

export default function StepMinat({ data, onToggleMinat, onUpdateTambahanMinat }) {
  // data.minat is an array of string
  const selectedMinat = data.minat || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Sparkles className="text-aksen-ungu" /> Apa minat atau industrimu?
        </h2>
        <p className="text-sm text-foreground/60">
          Pilih maksimal 3 minat yang paling sesuai dengan passion-mu.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {PILIHAN_MINAT.map((item) => {
          const isSelected = selectedMinat.includes(item.id);
          const isDisabled = !isSelected && selectedMinat.length >= 3;

          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && onToggleMinat(item.id)}
              disabled={isDisabled}
              className={[
                "px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200",
                isSelected
                  ? "chip-aktif"
                  : isDisabled
                  ? "bg-card/50 border-border-theme text-foreground/30 cursor-not-allowed"
                  : "bg-card border-border-theme hover:border-aksen-ungu/50 text-foreground"
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold text-aksen-ungu mb-2 uppercase tracking-wider">Apa minat atau skill spesifik kamu? (Wajib diisi)</p>
        <textarea
          rows={3}
          value={data.skillSpesifik || ""}
          onChange={(e) => onUpdateTambahanMinat(e.target.value)}
          placeholder="Misal: Saya jago masak makanan pedas, atau saya bisa desain grafis dasar..."
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-ungu focus:ring-1 focus:ring-aksen-ungu transition-all resize-none"
        />
      </div>
    </motion.div>
  );
}
