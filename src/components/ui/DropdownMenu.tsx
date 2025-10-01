// src/components/ui/DropdownMenu.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  title: string;
  items: Array<{ name: string; path: string }>;
}

export function DropdownMenu({ title, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
      >
        {title}
        <motion.span
         initial={{ opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity:1 }}
          transition={{ duration: 0.4 }}
          exit={{ rotate: 0, opacity: 0, transition: { duration: 0.4 } }}

        >
          <ChevronDown color="#d3b073" strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-lg"
          >
            <div className="p-1">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}