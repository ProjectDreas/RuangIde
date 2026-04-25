"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWizardStore } from "../../../store/useWizardStore";
import ProgressBar from "../ui/ProgressBar";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

import StepTujuan from "./StepTujuan";
import StepModal from "./StepModal";
import StepMinat from "./StepMinat";
import StepLokasi from "./StepLokasi";
import StepWaktu from "./StepWaktu";
import StepPreferensi from "./StepPreferensi";
import StepTambahan from "./StepTambahan";

const TOTAL_STEPS = 7;

export default function WizardContainer() {
  const currentStep = useWizardStore((state) => state.currentStep);
  const prevStep = useWizardStore((state) => state.prevStep);
  const dataUser = useWizardStore((state) => state.dataUser);
  const setIsGenerating = useWizardStore((state) => state.setIsGenerating);

  // Validasi Step Saat Ini
  const isValid = () => {
    if (currentStep === 3) return dataUser.minat.length > 0 && dataUser.tambahan !== ""; // Wait, minat spesifik masuk tambahan aja biar gampang
    return true; // Auto valid untuk form yang lain karena pakai auto-next, tapi bisa disesuaikan
  };

  const tanganiKirim = async () => {
    setIsGenerating(true);
    // Logika pengiriman akan di-handle di page.tsx atau komponen Hasil nantinya
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepTujuan key="step-1" />;
      case 2: return <StepModal key="step-2" />;
      case 3: return <StepMinat key="step-3" />;
      case 4: return <StepLokasi key="step-4" />;
      case 5: return <StepWaktu key="step-5" />;
      case 6: return <StepPreferensi key="step-6" />;
      case 7: return <StepTambahan key="step-7" />;
      default: return null;
    }
  };

  return (
    <motion.div
      key="wizard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="w-full max-w-4xl min-h-[70vh] flex flex-col pt-24 pb-12"
    >
      {/* Header Wizard */}
      <div className="w-full mb-12 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="p-3 rounded-full editorial-card hover:bg-foreground/5 text-foreground transition-colors flex items-center justify-center group shadow-md"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="flex-1 px-8">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
        
        {/* Placeholder agar tengah tetap simetris */}
        <div className="w-12 h-12" />
      </div>

      {/* Konten Wizard */}
      <div className="flex-1 flex flex-col justify-center w-full relative">
        <AnimatePresence mode="wait" custom={currentStep}>
          {renderStep()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
