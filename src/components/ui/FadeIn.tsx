"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  whileHover?: any; // Allow whileHover prop for hover animations
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
  direction,
  ...rest
}: FadeInProps) {
  const initial = {
    opacity: 0,
    ...(direction && directionVariants[direction]),
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
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest as any}
    >
      {children}
    </motion.div>
  );
}