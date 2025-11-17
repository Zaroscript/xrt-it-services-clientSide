"use client";

import { portfolioFilters, portfolioItems } from "@/config/portfolio";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryFilters } from "@/components/portfolio/CategoryFilters";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import type { PortfolioCategory } from "@/types/portfolio";

// Import the type declarations
import "@/types/framer-motion";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "all">(
    "all"
  );

  const filteredItems = portfolioItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="page-container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Discover our collection of innovative recipe sharing platforms and
              culinary digital solutions. Each project is crafted with attention to
              detail and user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="page-container mx-auto px-4">
          {/* Category Filters */}
          <CategoryFilters
            categories={portfolioFilters}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Portfolio Grid */}
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section className="relative border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1c1c1f] py-24 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5 dark:from-secondary/10 dark:via-transparent dark:to-secondary/10 opacity-20" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="page-container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                Ready to Create Your{" "}
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  Recipe Platform
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-400">
                Book a personalized demo to see how we can transform your culinary ideas into 
                an engaging digital experience. Our team will walk you through our development 
                process and showcase features that match your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-[#232325] transition-shadow hover:shadow-xl hover:shadow-secondary/20"
                >
                  Schedule Demo
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
                >
                  View Documentation
                </motion.button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  title: "Custom Design",
                  description: "Tailored to your brand",
                  gradient: "from-pink-500/20 to-purple-500/20"
                },
                {
                  title: "Fast Development",
                  description: "4-6 weeks timeline",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  title: "Full Support",
                  description: "24/7 tech assistance",
                  gradient: "from-green-500/20 to-emerald-500/20"
                },
                {
                  title: "Easy Updates",
                  description: "Simple content management",
                  gradient: "from-orange-500/20 to-yellow-500/20"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${feature.gradient} p-6 transition-transform hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-[#1c1c1f] opacity-90 transition-opacity group-hover:opacity-80" />
                  <div className="relative">
                    <h3 className="mb-1 font-bold text-secondary ">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}