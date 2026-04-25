"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const PILIHAN_PREFERENSI = [
  { id: "Cepat balik modal", label: "Cepat balik modal (ROI cepat)" },
  { id: "Stabil", label: "Stabil & Jangka Panjang" },
  { id: "Tren / viral", label: "Ikut Tren / Viral" },
  { id: "Minim risiko", label: "Minim Risiko / Modal kecil" },
];

export default function StepPreferensi({ data, onUpdate }) {
  const isCustom = !PILIHAN_PREFERENSI.find((p) => p.id === data.preferensi) && data.preferensi !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <TrendingUp className="text-aksen-biru" /> Apa preferensi bisnismu?
        </h2>
        <p className="text-sm text-foreground/60">
          Setiap bisnis punya gaya. Apa yang paling penting bagi kamu saat ini?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILIHAN_PREFERENSI.map((item) => (
          <button
            key={item.id}
            onClick={() => onUpdate("preferensi", item.id)}
            className={[
              "p-4 rounded-2xl border text-left transition-all duration-200",
              data.preferensi === item.id && !isCustom
                ? "chip-aktif"
                : "bg-card border-border-theme hover:border-aksen-biru/50 text-foreground"
            ].join(" ")}
          >
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Apa harapan kamu dari bisnis ini? (opsional)</p>
        <input
          type="text"
          value={isCustom ? data.preferensi : ""}
          onChange={(e) => onUpdate("preferensi", e.target.value)}
          placeholder="Misal: Ingin buka cabang di seluruh kota..."
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-biru focus:ring-1 focus:ring-aksen-biru transition-all"
        />
      </div>
    </motion.div>
  );
}
