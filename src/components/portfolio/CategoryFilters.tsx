"use client";

import { CategoryFilter, PortfolioCategory } from "@/types/portfolio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  categories: CategoryFilter[];
  activeCategory: PortfolioCategory | "all";
  onCategoryChange: (category: PortfolioCategory | "all") => void;
}

export function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange("all")}
          className={cn(
            "relative rounded-full px-6 py-2 text-sm transition-colors",
            activeCategory === "all"
              ? "bg-secondary text-white dark:text-[#232325]"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          )}
        >
          All Work
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative rounded-full px-6 py-2 text-sm transition-colors",
              activeCategory === category.id
                ? "bg-secondary text-[#232325]"
                : "text-gray-400 hover:text-white"
            )}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeCategory}
        className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
      >
        {activeCategory === "all"
          ? "Showcasing our complete portfolio of digital solutions"
          : categories.find((c) => c.id === activeCategory)?.description}
      </motion.p>
    </div>
  );
}