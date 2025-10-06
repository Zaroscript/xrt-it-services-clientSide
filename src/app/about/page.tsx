"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Code, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeUp, StaggerChildren } from "@/components/ui/animations";
import { cn } from "@/lib/utils";


import {values} from "@/config/constants";



const AnimatedGradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        </div>
        
        <motion.div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 70%)',
            filter: 'blur(100px)',
            transform: 'translate3d(0,0,0)'
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        
        <div className=" px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* <FadeUp delay={0.2} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Innovating Since 2025</span>
              </div>
            </FadeUp> */}
            
            <FadeUp delay={0.3}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                <span className="block text-primary dark:text-white">Crafting Digital</span>
                <AnimatedGradientText className="relative">
                  <span className="relative text-secondary">
                    Experiences
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary/50 to-secondary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </AnimatedGradientText>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                We're a passionate team of innovators, developers, and problem-solvers dedicated to creating exceptional digital experiences that make a difference.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group px-8 h-12 rounded-full bg-primary hover:bg-primary/90 text-card transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                  <Link href="/auth/login" className="text-card">Get a quote</Link>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 h-12 rounded-full border-2 border-border/50 hover:border-primary/50 bg-background/80 dark:bg-background/90 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5">
                  <Link href="/services">Learn More</Link>
                </Button>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.6} className="mt-16">
              <div className="relative w-full max-w-4xl h-[400px] mx-auto rounded-2xl overflow-hidden border border-border/20 dark:border-border/30 bg-gradient-to-br from-background to-muted/20 dark:from-muted/10 dark:to-background/50">
                <div className="absolute inset-0 dark:bg-[url('/grid-pattern-dark.svg')] bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 bg-gradient-to-br from-primary/10 to-cyan-500/10 dark:from-primary/20 dark:to-cyan-500/20 rounded-xl backdrop-blur-sm border border-border/20 dark:border-border/30 flex items-center justify-center">
                    <Code className="w-16 h-16 text-primary/50" />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
          style={{ y }}
        />
      </section>

      {/* Our Story */}
      <section className="relative py-24 md:py-32 bg-background page-container">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
          <div className="absolute inset-0 dark:bg-[url('/grid-pattern-dark.svg')] bg-[url('/grid-pattern.svg')] bg-center opacity-5" />
        </div>
        
        <div className="page-container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Our Journey So Far
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-secondary/80 to-background/80 rounded-full" />
                </div>
                
                <div className="space-y-6 text-gray-400 dark:text-muted-foreground/90">
                  <p className="text-lg leading-relaxed">
                    Founded in 2025, XRT-Tech started as a small team of passionate technologists with a vision to transform businesses through innovative digital solutions. What began as a modest startup has grown into a leading technology partner for companies worldwide.
                  </p>
                  <p className="leading-relaxed">
                    Our journey has been marked by continuous learning, adaptation, and a relentless pursuit of excellence. We've had the privilege of working with startups, enterprises, and everything in between, helping them navigate the digital landscape and achieve their business goals.
                  </p>
                </div>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <Button size="lg" className="group px-8 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                    <span>Our Work</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 h-12 rounded-full border-2 border-border/50 hover:border-primary/50 hover:text-secondary bg-background/80 dark:bg-background/90 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5">
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border/20 dark:border-border/30 bg-gradient-to-br from-muted/20 to-background dark:from-muted/10 dark:to-background/50">
                <div className="absolute inset-0 dark:bg-[url('/grid-pattern-dark.svg')] bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-5" />
                <div className="relative h-full w-full flex items-center justify-center p-8">
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-cyan-500/10 dark:from-primary/10 dark:to-cyan-500/20 rounded-2xl border border-border/20 dark:border-border/30 backdrop-blur-sm flex items-center justify-center">
                    <Layout className="w-24 h-24 text-primary/30" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/20 dark:to-primary/40 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/30 rounded-2xl -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-background">
        <div className="page-container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <FadeIn className="p-8 bg-card rounded-2xl shadow-sm border border-border/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl  font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation. We are committed to delivering exceptional value to our clients by understanding their unique challenges and crafting tailored solutions that exceed their expectations.
              </p>
            </FadeIn>

            {/* Vision */}
            <FadeIn delay={0.2} className="p-8 bg-card rounded-2xl shadow-sm border border-border/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and innovative technology partner for businesses worldwide, recognized for our commitment to excellence, integrity, and transformative digital solutions. We envision a future where technology breaks barriers and creates opportunities for businesses of all sizes to thrive in an increasingly digital world.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-muted/30 page-container">
        <div className="container px-4 mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={0.1 * index} className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-card/40 via-card/40 to-primary/20 text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Ready to start your project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/40 leading-relaxed ">
              Let's work together to bring your ideas to life with our expert team and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-card" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="hover:opacity-60 hover:text-primary" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
