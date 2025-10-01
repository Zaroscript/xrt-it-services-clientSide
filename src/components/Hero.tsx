"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import heroImage from "../../public/tech-bg.png";

const heroContent = [
  {
    title: "Transform Your Business with Modern Tech Solutions",
    description:
      "Empower your business with cutting-edge technology and innovative solutions that drive growth and success.",
  },
  {
    title: "Enterprise-Grade Solutions for Every Business",
    description:
      "Custom software development and IT solutions tailored to meet your unique business needs.",
  },
  {
    title: "Stay Ahead with Future-Ready Technology",
    description:
      "Leverage the latest technologies and best practices to keep your business competitive in the digital age.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary/90 dark:bg-background/90" />
      <div className="absolute inset-0 opacity-30" />

      {/* Tech Background Image */}
      <Image
        src={heroImage}
        alt="Technology Background"
        fill
        className="object-cover opacity-30 blur-sm"
        priority
      />

      <div className="relative page-container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20">
          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-gold">
                  {heroContent[currentSlide].title}
                </span>
              </h1>
              <p className="text-lg text-background dark:text-slate-300 max-w-xl">
                {heroContent[currentSlide].description}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg bg-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg border border-gold  text-slate-300 font-medium hover:bg-gold/80 transition-colors"
              >
                Learn More
              </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {heroContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1 rounded-full transition-colors ${
                    currentSlide === index ? "bg-gold" : "bg-background"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tech Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center justify-center relative"
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
              className="absolute inset-0 opacity-30"
            >
              <Image
                src="/tech-illustration.svg"
                alt="Technology Illustration"
                width={800}
                height={800}
                className="object-contain"
                priority
              />
            </motion.div>
            <Image
              src="/tech-illustration.svg"
              alt="Technology Illustration"
              width={600}
              height={600}
              className="object-contain relative z-10"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
