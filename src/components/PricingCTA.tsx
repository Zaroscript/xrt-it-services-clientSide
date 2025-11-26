"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

export function PricingCTA() {
  return (
    <div className="w-full py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-[#343438] px-6 py-16 sm:p-16"
          >
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn direction="up">
                <h2 className="text-3xl font-bold text-white">
                  Ready to Start Your Journey?
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="mt-4 text-lg text-gray-400">
                  Join thousands of learners who have already taken their
                  careers to the next level.
                </p>
              </FadeIn>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <FadeIn delay={0.4}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-lg bg-secondary px-8 py-3 font-medium text-[#232325] transition-colors hover:bg-secondary/90 sm:w-auto"
                  >
                    Get Started
                  </motion.button>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-lg border border-secondary px-8 py-3 font-medium text-secondary transition-colors hover:bg-secondary/10 sm:w-auto"
                  >
                    Contact Sales
                  </motion.button>
                </FadeIn>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </div>
  );
}
