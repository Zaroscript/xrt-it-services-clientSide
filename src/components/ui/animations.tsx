"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps extends Omit<MotionProps, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...motionProps
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.73, 0.99],
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...motionProps
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.73, 0.99],
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
