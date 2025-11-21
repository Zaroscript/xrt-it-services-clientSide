"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import heroImage from "../../public/tech-bg.png";
import { heroContent, heroSection } from "../config/constants";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(heroImage);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const backgroundInterval = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Handle background image change
  useEffect(() => {
    const backgrounds = [heroImage, heroSection];
    let currentIndex = 0;
    
    const changeBackground = () => {
      if (isPaused) return;
      currentIndex = (currentIndex + 1) % backgrounds.length;
      setCurrentBackground(backgrounds[currentIndex]);
    };

    // Start with a delay for the first transition
    const initialTimer = setTimeout(() => {
      if (!isPaused) {
        changeBackground();
      }
      // Then set up the regular interval
      backgroundInterval.current = setInterval(changeBackground, 10000);
    }, 5000);
    
    return () => {
      clearTimeout(initialTimer);
      if (backgroundInterval.current) {
        clearInterval(backgroundInterval.current);
      }
    };
  }, [isPaused]);

  // Handle content slide change
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroContent.length);
      }, 5000);
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused]);

  const handleIndicatorClick = (index: number) => {
    // Pause auto-slide when manually changing slides
    setIsPaused(true);
    setCurrentSlide(index);
    
    // Resume auto-slide after a delay
    setTimeout(() => {
      setIsPaused(false);
    }, 10000); // Resume after 10 seconds
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // Only resume if not already paused by indicator click
    if (!isPaused) return;
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, 2000); // Short delay before resuming
    return () => clearTimeout(timer);
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary/90 dark:bg-background/90" />
      <div className="absolute inset-0 opacity-30" />

      {/* Animated Background Images with Blur */}
      <div className="absolute inset-0 h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 0.7,
              scale: 1,
              transition: {
                duration: 1.5,
                ease: [0.2, 0.8, 0.2, 1],
                opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.8 }
              }
            }}
            className="absolute inset-0 h-full overflow-hidden"
          >
            <Image
              src={currentBackground}
              alt="Technology Background"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover opacity-80 blur-xs"
              priority
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative page-container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20">
          {/* Content Section */}
          <div className="space-y-6">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                <span className="bg-linear-gradient-to-r from-primary to-primary/80 bg-clip-text text-gold">
                  {heroContent[currentSlide].title}
                </span>
              </h1>
              <p className="text-md text-justify text-background dark:text-slate-300 max-w-xl">
                {heroContent[currentSlide].description}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(heroContent[currentSlide].primBtn.path)}
                className="px-8 py-3 rounded-lg bg-primary text-card cursor-pointer font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {heroContent[currentSlide].primBtn.text}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(heroContent[currentSlide].secBtn.path)}
                className="px-8 py-3 rounded-lg border border-gold text-secondary dark:text-primary cursor-pointer 
                font-medium hover:text-primary hover:bg-gold/80 transition-colors"
              >
                {heroContent[currentSlide].secBtn.text}
              </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {heroContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleIndicatorClick(index)}
                  className={`w-12 h-2 rounded-full transition-all cursor-pointer duration-300 ${
                    currentSlide === index 
                      ? "bg-gold scale-110" 
                      : "bg-background/50 dark:bg-white/50 hover:bg-background/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Tech Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center justify-center relative w-full h-full min-h-[400px]"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 50,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute inset-0 opacity-30 flex items-center justify-center"
            >
              <Image
                src="/tech-illustration.svg"
                alt="Technology Illustration"
                width={800}
                height={800}
                className="object-contain max-w-full max-h-full"
                priority
                fetchPriority="high"
              />
            </motion.div>
            <div className="relative z-10 flex items-center justify-center">
              <Image
                src="/tech-illustration.svg"
                alt="Technology Illustration"
                width={600}
                height={600}
                className="object-contain max-w-full max-h-full"
                priority
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
