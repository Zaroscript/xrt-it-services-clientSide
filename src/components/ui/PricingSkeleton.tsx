import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PricingSkeleton = () => {
  const SkeletonCard = ({ isPopular = false, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="h-full"
    >
      <div className={cn(
        "relative flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-300",
        isPopular 
          ? "dark:bg-gradient-to-b dark:from-[#343438] dark:to-[#1a1a1a] bg-white/90 shadow-lg shadow-secondary/10 dark:shadow-secondary/20 ring-1 ring-gray-200 dark:ring-secondary/20 ring-offset-1 ring-offset-white/50 dark:ring-offset-[#1a1a1a]"
          : "bg-white/80 dark:bg-[#343438] shadow-md hover:shadow-lg transition-shadow",
        "px-6 py-8"
      )}>
        {isPopular && (
          <div className="absolute right-0 top-4 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-l-md">
            Popular
          </div>
        )}
        
        {/* Title */}
        <div className="h-7 bg-muted/80 rounded-lg w-3/4 mb-3 animate-pulse"></div>
        
        {/* Description */}
        <div className="h-4 bg-muted/40 rounded w-5/6 mb-6 animate-pulse"></div>
        
        {/* Price */}
        <div className="flex items-end gap-3 mb-6">
          <div className="h-10 bg-muted/80 rounded-lg w-1/3 animate-pulse"></div>
          {isPopular && (
            <div className="h-5 bg-muted/40 rounded w-1/4 mb-1 animate-pulse"></div>
          )}
        </div>
        
        {/* Features */}
        <div className="space-y-4 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-muted/60 animate-pulse flex-shrink-0"></div>
              <div className="h-4 bg-muted/40 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Button */}
        <div className="mt-auto">
          <div className="h-12 bg-muted/80 rounded-lg w-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 bg-background"
    >
      <div className="page-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            className="h-5 w-48 mx-auto bg-muted rounded-full mb-6 animate-pulse"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="h-10 bg-muted rounded-lg w-3/4 mx-auto mb-6 animate-pulse"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
          <motion.div 
            className="h-4 bg-muted/50 rounded-lg w-2/3 mx-auto animate-pulse"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </div>
        
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="h-12 w-32 bg-muted rounded-full animate-pulse"></div>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SkeletonCard delay={0.1} />
          <SkeletonCard isPopular={true} delay={0.2} />
          <SkeletonCard delay={0.3} />
        </motion.div>
      </div>
    </motion.section>
  );
};
