"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

export function PricingHero() {
  return (
    <div className="relative overflow-hidden py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 dark:bg-[#232325]/50"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent"
      />
      <div className="page-container relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold dark:text-white sm:text-5xl lg:text-6xl">
                Simple,{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent"
                >
                  Transparent
                </motion.span>{" "}
                Pricing 0
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                Choose the perfect plan for your needs. All plans include core
                features and 30-day money-back guarantee.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
