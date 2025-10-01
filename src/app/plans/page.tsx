"use client";

import { motion } from "framer-motion";
import { IncludedFeatures } from "@/components/ui/IncludedFeatures";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { FAQ } from "@/components/ui/FAQ";
import { FadeIn } from "@/components/ui/FadeIn";
import Priceing from "@/components/Priceing";

export default function Plans() {

  return (
    <div>
      {/* Hero Section */}
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
        <div className="container relative">
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
                  Pricing
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                  Choose the perfect plan for your needs. All plans include core features
                  and 30-day money-back guarantee.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <Priceing />

      {/* Included Features Section */}
      <FadeIn>
        <IncludedFeatures />
      </FadeIn>

      {/* Comparison Table */}
      <FadeIn>
        <ComparisonTable />
      </FadeIn>

      {/* FAQ Section */}
      <FadeIn>
        <FAQ />
      </FadeIn>

      {/* CTA Section */}
      <div className="container py-24">
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
                    Join thousands of learners who have already taken their careers to
                    the next level.
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
    </div>
  );
}