"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: () => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={cn("text-sm", !isYearly && "text-secondary")}>Monthly</span>
      <button
        onClick={onToggle}
        className="relative h-7 w-14 rounded-full bg-primary/10 dark:bg-primary/20 transition-colors"
      >
        <motion.div
          className="absolute left-1 top-1 h-5 w-5 rounded-full bg-secondary"
          animate={{ x: isYearly ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <div className="flex items-center gap-2">
        <span className={cn("text-sm", isYearly && "text-secondary")}>Yearly</span>
        <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs text-secondary">
          Save 21%
        </span>
      </div>
    </div>
  );
}