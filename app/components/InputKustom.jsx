"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PenLine } from "lucide-react";

/* ============================================================
   InputKustom — Area teks yang muncul saat kategori "Lainnya" dipilih
   Props:
     - nilaiInput  : string — nilai state dari induk
     - tanganiUbah : (e) => void — handler onChange
     - tampil      : boolean — apakah textarea harus muncul
   ============================================================ */
export default function InputKustom({ nilaiInput, tanganiUbah, tampil }) {
  return (
    <AnimatePresence>
      {tampil && (
        <motion.div
          key="wadah-input-kustom"
          /* Animasi masuk: meluncur dari atas, opacity muncul */
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          {/* --- Wadah input dengan efek glassmorphism --- */}
          <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-1 transition-all duration-300 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            {/* Label kecil di pojok kiri atas */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <PenLine size={13} className="text-indigo-400" />
              <span className="text-xs font-medium text-indigo-400 tracking-wide">
                Ceritakan idemu
              </span>
            </div>

            {/* Textarea utama */}
            <textarea
              id="input-kustom-textarea"
              value={nilaiInput}
              onChange={tanganiUbah}
              rows={4}
              placeholder="Ketik spesifik ide, modal, atau keahlian kamu di sini..."
              className={[
                "w-full bg-transparent resize-none px-4 pb-4 pt-2",
                "text-sm text-zinc-200 placeholder:text-zinc-600",
                "focus:outline-none",
                "leading-relaxed",
              ].join(" ")}
            />
          </div>

          {/* Petunjuk karakter */}
          <p className="mt-2 text-right text-xs text-zinc-600">
            {nilaiInput.length} karakter
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
