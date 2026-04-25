"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* ============================================================
   KartuKategori — Kartu pilihan kategori tunggal
   Props:
     - kategori   : { id, emoji, label, deskripsi, warnaAksen }
     - terpilih   : boolean — apakah kartu ini sedang dipilih
     - tanganiPilih : () => void — callback saat diklik
   ============================================================ */
export default function KartuKategori({ kategori, terpilih, tanganiPilih }) {
  const { emoji, label, deskripsi, warnaAksen } = kategori;

  return (
    <motion.button
      id={`kartu-kategori-${kategori.id}`}
      onClick={tanganiPilih}
      /* Animasi masuk dengan delay berdasarkan urutan */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      /* Efek hover & tap dari framer-motion */
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={terpilih}
      className={[
        /* Dasar kartu — glassmorphism */
        "relative w-full text-left rounded-2xl p-5 cursor-pointer",
        "bg-white/5 backdrop-blur-md border",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        /* State: terpilih vs tidak terpilih */
        terpilih
          ? "border-indigo-500/70 cahaya-neon-indigo"
          : "border-white/8 hover:border-white/20 hover:bg-white/8",
      ].join(" ")}
    >
      {/* --- Latar warna aksen saat terpilih --- */}
      {terpilih && (
        <motion.div
          layoutId="kilatAktif"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${warnaAksen}18 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* --- Ikon Ceklis saat terpilih --- */}
      <motion.div
        className="absolute top-3 right-3"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          terpilih
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <CheckCircle2 size={18} className="text-indigo-400" />
      </motion.div>

      {/* --- Emoji Kategori --- */}
      <span
        className={[
          "block text-3xl mb-3 transition-transform duration-300",
          terpilih ? "scale-110" : "grayscale-[30%]",
        ].join(" ")}
        aria-hidden="true"
      >
        {emoji}
      </span>

      {/* --- Label & Deskripsi --- */}
      <p
        className={[
          "font-bold text-sm mb-1 transition-colors duration-300",
          terpilih ? "text-white" : "text-zinc-300",
        ].join(" ")}
      >
        {label}
      </p>
      <p
        className={[
          "text-xs leading-relaxed transition-colors duration-300",
          terpilih ? "text-zinc-300" : "text-zinc-500",
        ].join(" ")}
      >
        {deskripsi}
      </p>
    </motion.button>
  );
}
