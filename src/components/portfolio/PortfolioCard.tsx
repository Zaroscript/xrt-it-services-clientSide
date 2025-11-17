"use client";

import { PortfolioItem } from "@/types/portfolio";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Calendar, ExternalLink, Tag, Users } from "lucide-react";
import Image from "next/image";

interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      onMouseMove={onMouseMove}
      className="group relative h-full overflow-hidden rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Light Mode Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(211, 176, 115, 0.1),
              transparent 70%
            )
          ` as unknown as string,
        }}
      />

      {/* Dark Mode Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hidden dark:block group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--secondary-rgb), 0.1),
              transparent 70%
            )
          ` as unknown as string,
        }}
      />

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={600}
          height={338}
          unoptimized={item.imageUrl.startsWith('https://placehold.co')}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6 relative z-10">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary dark:text-secondary-foreground">
            {item.category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
            {item.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {item.description}
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          {item.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {feature}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <motion.span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/5 px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 transition-colors hover:bg-secondary/10 hover:text-secondary dark:hover:bg-secondary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tag className="h-3 w-3" />
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
          <div className="flex items-center gap-4">
            {item.clientName && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Users className="h-3.5 w-3.5" />
                {item.clientName}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              {item.completionDate}
            </div>
          </div>

          {/* Demo Link */}
          {item.demoUrl && (
            <motion.span
              className="group/link flex items-center gap-1 text-xs font-medium text-secondary hover:text-secondary/80 transition-colors cursor-pointer"
              whileHover={{ x: 3 }}
              onClick={() => window.open(item.demoUrl, '_blank', 'noopener,noreferrer')}
            >
              View Demo
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}