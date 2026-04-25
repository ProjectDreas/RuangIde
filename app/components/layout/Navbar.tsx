"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import DarkModeToggle from "../DarkModeToggle";
import { useWizardStore } from "../../../store/useWizardStore";

export default function Navbar() {
  const resetWizard = useWizardStore((state) => state.resetWizard);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex items-center justify-between glass-navbar pointer-events-auto"
    >
      {/* Kiri: Logo */}
      <button 
        onClick={resetWizard}
        className="flex items-center gap-3 group"
      >
        <div className="flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <Sparkles className="text-aksen-biru w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <span className="font-jakarta font-black text-2xl tracking-tight text-foreground group-hover:text-aksen-biru transition-all duration-300">
          RuangIde
        </span>
      </button>

      {/* Kanan: Dark Mode Toggle */}
      <div className="hover:scale-110 transition-transform duration-300">
        <DarkModeToggle />
      </div>
    </motion.nav>
  );
}
