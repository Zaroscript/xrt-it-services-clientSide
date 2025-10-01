"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const directionVariants = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction
}: FadeInProps) {
  const initial = {
    opacity: 0,
    ...(direction && directionVariants[direction])
  };

  return (
    <motion.div
      initial={initial}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.73, 0.99],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}