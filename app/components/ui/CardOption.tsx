"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardOptionProps {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  disabled?: boolean;
  accent?: 'blue' | 'purple' | 'cyan' | 'orange' | 'pink' | 'yellow';
}

export default function CardOption({
  id,
  label,
  icon,
  description,
  isSelected,
  onClick,
  disabled = false,
  accent = 'blue'
}: CardOptionProps) {
  
  const getIconColor = () => {
    switch(accent) {
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'cyan': return 'text-cyan-600 dark:text-cyan-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      case 'pink': return 'text-pink-600 dark:text-pink-400';
      case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-indigo-600 dark:text-[#818CF8]';
    }
  };

  const getCardBg = () => {
    switch(accent) {
      case 'blue': return 'card-bg-blue';
      case 'purple': return 'card-bg-purple';
      case 'cyan': return 'card-bg-cyan';
      case 'orange': return 'card-bg-orange';
      case 'pink': return 'card-bg-pink';
      case 'yellow': return 'card-bg-yellow';
      default: return 'card-bg-default';
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={() => !disabled && onClick(id)}
      disabled={disabled}
      className={cn(
        "relative w-full p-5 sm:p-6 rounded-3xl text-center flex flex-col items-center justify-center gap-4 min-h-[10rem] group overflow-hidden transition-all duration-200 ease-in-out cursor-pointer shadow-sm hover:shadow-md border border-solid",
        isSelected 
          ? "!bg-indigo-50 border-[2px] !border-indigo-500 shadow-[0_0_0_2px_rgba(99,102,241,0.25)] dark:!bg-[#1E244A] dark:!border-[#6366F1]" 
          : cn(getCardBg(), "hover:brightness-95 dark:hover:brightness-110"),
        disabled && !isSelected && "opacity-50 cursor-not-allowed hover:shadow-sm hover:brightness-100"
      )}
    >
      {/* Icon Container */}
      <div className={cn(
        "w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shrink-0 shadow-sm border border-slate-200/50 dark:border-white/10 transition-transform duration-300 group-hover:scale-110",
        isSelected ? getIconColor() : "text-slate-400 dark:text-slate-400"
      )}>
        {icon}
      </div>
      
      {/* Text Content Area */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        {/* Label */}
        <h3 className={cn(
          "font-jakarta text-lg sm:text-xl font-bold leading-tight transition-colors",
          isSelected ? "text-indigo-600 dark:text-white" : "text-foreground group-hover:text-indigo-500 dark:group-hover:text-[#6366F1]"
        )}>
          {label}
        </h3>
        
        {/* Description */}
        {description && (
          <p className={cn(
            "text-xs sm:text-sm font-medium",
            isSelected ? "text-indigo-500/80 dark:text-indigo-200" : "text-foreground/60 dark:text-slate-400"
          )}>
            {description}
          </p>
        )}
      </div>
    </motion.button>
  );
}
