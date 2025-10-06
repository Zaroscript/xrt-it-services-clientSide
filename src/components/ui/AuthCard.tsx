'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AuthCardProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  footerText?: React.ReactNode;
  footerLink?: string;
  footerLinkText?: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  submitText: React.ReactNode;
  loadingText?: string;
}

export function AuthCard({
  children,
  title,
  description,
  footerText,
  footerLink,
  footerLinkText,
  onSubmit,
  isLoading = false,
  submitText,
  loadingText = 'Loading...',
}: AuthCardProps) {
  return (
<div className="w-full space-y-6 bg-card/95 dark:bg-card/95 backdrop-blur-sm p-8 rounded-xl border border-border/10 dark:border-border/20 shadow-xl">
      {/* Header */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-center">
          <motion.div 
            className="w-24 h-24 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.2
            }}
          >
            <div className="absolute inset-0 rounded-full bg-background/90 dark:bg-foreground/5 -z-10 transition-all duration-300 group-hover:opacity-90
              shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1),0_10px_30px_-5px_rgba(0,0,0,0.1)]
              dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.25),0_10px_30px_-5px_rgba(0,0,0,0.2)]"
            />
            <div className="absolute inset-0 rounded-full -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
            />
            <div className="relative w-full h-full p-2">
              <Image 
                src="/logo.png" 
                alt="Company Logo" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition-all duration-300 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))',
                }}
                priority
              />
            </div>
          </motion.div>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-muted-foreground text-sm"
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-4">
            {children}
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              submitText
            )}
          </Button>
        </form>
      </motion.div>

      {/* Footer */}
      {footerText && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-center text-sm text-foreground dark:text-white pt-2"
        >
          <span className="opacity-80">{footerText}</span>
          {footerLink && footerLinkText && (
            <Link
              href={footerLink}
              className="ml-1.5 font-medium text-primary hover:text-primary/90 transition-colors hover:underline underline-offset-4"
            >
              {footerLinkText}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
