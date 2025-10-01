// src/components/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { NAV_LINKS } from "@/config/constants";
import { useState } from "react";

// types
import { MobileMenuProps } from "@/types";

// Variants
import { linkVariants } from "@/config/variants";

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isLogedin] = useState<boolean>(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-card p-6 shadow-2xl lg:hidden border-l border-gray-200 dark:border-border/20"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-border/50">
              <Link
                href="/"
                onClick={onClose}
                className="text-2xl font-bold tracking-wider"
              >
                XRT <span className="text-primary">Tech</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900 hover:scale-110 hover:rotate-90 transition-all duration-300"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex-1 mt-8">
              <ul className="flex flex-col space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: i * 0.05, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <Link
                      href={link.path}
                      className="flex items-center w-full px-4 py-3 text-lg font-medium text-gray-800 dark:text-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
                      onClick={onClose}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-border/50">
              <Button variant="outline" className="w-full text-lg py-6">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
