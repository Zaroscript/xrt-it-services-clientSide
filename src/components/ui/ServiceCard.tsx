"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group min-h-[225px] relative overflow-hidden rounded-2xl bg-primary/10 shadow-primary p-6"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
          <Icon className="h-6 w-6 text-secondary" />
        </div>
        
        <h3 className="text-lg font-semibold text-white group-hover:text-primary">
          {title}
        </h3>
        
        <p className="text-sm leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}