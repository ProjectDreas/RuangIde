"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * BagianHero - Komponen Header utama RuangIde
 * Menampilkan judul estetik dengan gradasi neon dan badge AI.
 */
const BagianHero = () => {
  return (
    <header className="pt-16 pb-12 flex flex-col items-center text-center">
      {/* Badge Atas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase"
      >
        <Sparkles size={14} />
        <span>AI-Powered Business Generator</span>
      </motion.div>

      {/* Judul Utama dengan Gradasi */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]"
      >
        Wujudkan Ide Bisnis <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
          Masa Depanmu.
        </span>
      </motion.h1>

      {/* Deskripsi */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed px-4"
      >
        RuangIde membantu kamu menemukan peluang bisnis yang relevan, 
        terstruktur, dan actionable hanya dalam hitungan detik menggunakan 
        kekuatan AI Consultant terbaik.
      </motion.p>
    </header>
  );
};

export default BagianHero;
