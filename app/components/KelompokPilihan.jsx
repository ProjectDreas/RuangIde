"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * KelompokPilihan - Komponen reusable untuk memilih opsi (chip/pill)
 * Digunakan di setiap langkah formulir RuangIde.
 */
const KelompokPilihan = ({ 
  nomorLangkah, 
  judul, 
  daftarOpsi, 
  pilihanAktif, 
  tanganiPilih 
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Header Langkah */}
      <div className="flex items-center gap-3">
        <span
          className={[
            "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition-all duration-300",
            pilihanAktif 
              ? "bg-cyan-500 text-zinc-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
              : "bg-white/10 text-zinc-500"
          ].join(" ")}
          aria-hidden="true"
        >
          {pilihanAktif ? <Check size={14} strokeWidth={3} /> : nomorLangkah}
        </span>
        <p className="text-sm sm:text-base font-semibold text-zinc-200 tracking-tight">
          {judul}
        </p>
      </div>

      {/* Grid Opsi */}
      <div className="flex flex-wrap gap-3">
        {daftarOpsi.map((opsi, indeks) => {
          const aktif = pilihanAktif === opsi.id;
          
          return (
            <motion.button
              key={opsi.id}
              onClick={() => tanganiPilih(opsi.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: indeks * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={[
                "group relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border transition-all duration-300",
                aktif
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                  : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-zinc-200"
              ].join(" ")}
            >
              <span className="text-lg" role="img" aria-label={opsi.label}>
                {opsi.emoji}
              </span>
              <span className="text-sm font-medium tracking-wide">
                {opsi.label}
              </span>

              {/* Indicator Dot jika aktif */}
              {aktif && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] border-2 border-zinc-900"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default KelompokPilihan;
