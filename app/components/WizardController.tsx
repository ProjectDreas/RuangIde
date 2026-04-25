"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useWizardStore } from "../../store/useWizardStore";
import WizardContainer from "./steps/WizardContainer";
import TampilanHasil from "./TampilanHasil";

export default function WizardController() {
  const currentStep = useWizardStore((state) => state.currentStep);
  const setStep = useWizardStore((state) => state.setStep);
  const isGenerating = useWizardStore((state) => state.isGenerating);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {/* STEP 0: HERO (HALAMAN AWAL) */}
        {currentStep === 0 && !isGenerating && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="max-w-4xl text-center flex flex-col items-center z-10"
          >
            <div className="mb-10 w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-aksen-biru/20 to-aksen-ungu/20 rounded-[2rem] rotate-6"></div>
              <div className="absolute inset-0 bg-card border-2 border-border-theme rounded-[2rem] -rotate-3 flex items-center justify-center shadow-lg">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-aksen-biru" strokeWidth={1.5} />
              </div>
            </div>
            
            <h1 className="font-jakarta text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
              Temukan Ide Bisnis<br />
              Sesuai Kondisimu
            </h1>
            
            <p className="text-lg sm:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Dibantu AI. Cepat, personal, dan realistis. Tidak perlu pusing mencari peluang, biarkan AI kami yang menganalisis!
            </p>

            <button
              onClick={() => setStep(1)}
              className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-white tombol-gradasi-aktif overflow-hidden shadow-2xl shadow-aksen-biru/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}

        {/* STEP 1-7: FORM WIZARD */}
        {currentStep >= 1 && currentStep <= 7 && !isGenerating && (
          <WizardContainer key="wizard" />
        )}

        {/* STEP 8: HASIL & LOADING */}
        {(isGenerating || currentStep === 8) && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl py-24"
          >
            <TampilanHasil />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
