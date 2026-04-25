"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="text-sm font-bold text-aksen-biru/80 uppercase tracking-widest bg-aksen-biru/10 px-4 py-1.5 rounded-full">
        Step {currentStep} dari {totalSteps}
      </div>
      <div className="w-full max-w-md h-2 bg-foreground/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-aksen-biru to-aksen-ungu rounded-full"
        />
      </div>
    </div>
  );
}
