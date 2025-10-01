"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className = "" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Rotating outer hexagon */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
              stroke="url(#hexagon-gradient)"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="hexagon-gradient"
                x1="10"
                y1="5"
                x2="90"
                y2="95"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Pulsing inner circle with tech pattern */}
        <motion.div
          className="absolute inset-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: -180,
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit pattern */}
            <path
              d="M50 20L80 50L50 80L20 50L50 20Z"
              stroke="url(#circuit-gradient)"
              strokeWidth="1.5"
              fill="rgba(26, 26, 26, 0.1)"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              stroke="url(#circuit-gradient)"
              strokeWidth="1.5"
              fill="none"
            />
            <defs>
              <linearGradient
                id="circuit-gradient"
                x1="20"
                y1="20"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] shadow-[0_0_8px_#1a1a1a]" />
        </motion.div>
      </div>
    </div>
  );
}