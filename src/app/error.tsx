'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-8 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            404
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Recipe Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oops! The recipe you're looking for doesn't exist or may have been moved.
            Don't worry, our chefs are always cooking up new and delicious recipes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={() => reset()}
              className="px-6 py-6 text-base font-medium bg-primary hover:bg-primary/90 transition-colors"
            >
              Try Again
            </Button>
            
            <Button asChild variant="outline" className="px-6 py-6 text-base font-medium">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Need help?{' '}
              <Link 
                href="/contact" 
                className="text-primary hover:underline underline-offset-4"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-border/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-foreground mb-4">
            Popular Recipe Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Desserts', 'Main Course', 'Appetizers', 'Vegan', 'Quick Meals', 'Healthy'].map((category) => (
              <Link 
                key={category}
                href={`/recipes?category=${category.toLowerCase()}`}
                className="px-4 py-2 text-sm rounded-full border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
