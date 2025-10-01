
'use client';

import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  illustration?: React.ReactNode;
}

export function AuthLayout({
  children,
  title = '',
  description = '',
  illustration = null,
}: AuthLayoutProps) {
  return (
    <div className="py-18 w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-30" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="w-full max-w-md relative z-10"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
          {children || <div className="text-destructive">No content to display</div>}
        </div>
      </motion.div>
    </div>
  );
}
