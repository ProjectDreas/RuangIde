"use client";

import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";

/* ============================================================
   TombolGenerate — Tombol utama "Generate Ide Sekarang"
   Props:
     - tanganiKlik    : () => void — callback saat diklik
     - sedangMemuat   : boolean — apakah sedang loading
     - dinonaktifkan  : boolean — apakah tombol harus disabled
   ============================================================ */
export default function TombolGenerate({
  tanganiKlik,
  sedangMemuat,
  dinonaktifkan,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full"
    >
      <button
        id="tombol-generate-ide"
        onClick={tanganiKlik}
        disabled={dinonaktifkan || sedangMemuat}
        aria-busy={sedangMemuat}
        className={[
          /* Ukuran & bentuk */
          "w-full py-4 px-8 rounded-2xl",
          "flex items-center justify-center gap-3",
          /* Tipografi */
          "font-bold text-base text-white tracking-wide",
          /* Transisi */
          "transition-all duration-300 ease-out",
          /* State normal — gradasi neon */
          !dinonaktifkan && !sedangMemuat
            ? "latar-gradasi-tombol cursor-pointer active:scale-[0.98]"
            : "",
          /* State disabled / loading */
          dinonaktifkan && !sedangMemuat
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            : "",
          /* State loading */
          sedangMemuat
            ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/70 cursor-wait"
            : "",
        ].join(" ")}
      >
        {sedangMemuat ? (
          /* --- Ikon loading berputar + teks status --- */
          <>
            <Loader2
              size={20}
              className="animasi-putar text-white/80"
              aria-hidden="true"
            />
            <span>Meracik ide...</span>
          </>
        ) : (
          /* --- Tampilan normal --- */
          <>
            <Wand2 size={20} aria-hidden="true" />
            <span>Generate Ide Sekarang</span>
          </>
        )}
      </button>

      {/* Petunjuk jika belum memilih kategori */}
      {dinonaktifkan && !sedangMemuat && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center text-xs text-zinc-500"
        >
          Pilih kategori terlebih dahulu untuk mulai generate
        </motion.p>
      )}
    </motion.div>
  );
}
