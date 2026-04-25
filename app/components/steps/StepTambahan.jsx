"use client";

import { motion } from "framer-motion";
import { MessageSquarePlus } from "lucide-react";

const CHIPS_CEPAT = [
  "Ingin bisnis online",
  "Tidak punya banyak waktu",
  "Tanpa karyawan",
  "Target anak muda",
];

export default function StepTambahan({ data, onUpdate }) {
  const handleChipClick = (chip) => {
    const currentText = data.tambahan || "";
    if (currentText.includes(chip)) return;
    const newText = currentText ? `${currentText}, ${chip}` : chip;
    onUpdate("tambahan", newText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <MessageSquarePlus className="text-aksen-sian" /> Detail Tambahan (Opsional)
        </h2>
        <p className="text-sm text-foreground/60">
          Beritahu AI kondisi spesifikmu agar hasilnya lebih akurat dan personal.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          rows={4}
          value={data.tambahan}
          onChange={(e) => onUpdate("tambahan", e.target.value)}
          placeholder="Contoh: saya punya motor, suka masak, dekat sekolah, ingin tanpa karyawan..."
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-sian focus:ring-1 focus:ring-aksen-sian transition-all resize-none"
        />

        <div>
          <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Chips Cepat</p>
          <div className="flex flex-wrap gap-2">
            {CHIPS_CEPAT.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1.5 rounded-full bg-card border border-border-theme text-xs text-foreground/80 hover:text-foreground hover:border-aksen-sian/50 transition-colors"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
