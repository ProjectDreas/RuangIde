"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const PILIHAN_LOKASI = [
  { id: "Perumahan", label: "Perumahan" },
  { id: "Kampus", label: "Area Kampus / Sekolah" },
  { id: "Kota ramai", label: "Pusat Kota Ramai" },
  { id: "Desa", label: "Desa / Pinggiran" },
];

export default function StepLokasi({ data, onUpdate }) {
  const isCustom = !PILIHAN_LOKASI.find((p) => p.id === data.lokasi) && data.lokasi !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <MapPin className="text-aksen-sian" /> Dimana lokasimu saat ini?
        </h2>
        <p className="text-sm text-foreground/60">
          Lokasi akan sangat mempengaruhi ide bisnis offline, atau potensi logistik bisnis online.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILIHAN_LOKASI.map((item) => (
          <button
            key={item.id}
            onClick={() => onUpdate("lokasi", item.id)}
            className={[
              "p-4 rounded-2xl border text-left transition-all duration-200",
              data.lokasi === item.id && !isCustom
                ? "chip-aktif"
                : "bg-card border-border-theme hover:border-aksen-sian/50 text-foreground"
            ].join(" ")}
          >
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">Jelaskan kondisi lingkunganmu (opsional)</p>
        <input
          type="text"
          value={isCustom ? data.lokasi : ""}
          onChange={(e) => onUpdate("lokasi", e.target.value)}
          placeholder="Misal: Saya tinggal di gang sempit tapi dekat jalan raya..."
          className="w-full bg-card border border-border-theme rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-aksen-sian focus:ring-1 focus:ring-aksen-sian transition-all"
        />
      </div>
    </motion.div>
  );
}
