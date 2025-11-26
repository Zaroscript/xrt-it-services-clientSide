"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Paintbrush,
  Rocket,
  Settings,
  TestTube2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeUp } from "@/components/ui/animations";
import AnimatedGradientText from "@/components/ui/AnimatedGradientText";
import {
  values,
  missionIcon,
  vission,
  whoWeAre,
  aboutImg,
} from "@/config/constants";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const router = useRouter();

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
            background:
              "radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: "translate3d(0,0,0)",
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
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
                <span className="block text-primary dark:text-white">
                  Crafting Digital
                </span>
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

              <p className="text-lg text-justify md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We turn business goals into simple, scalable technology
                delivering powerful websites, seamless online systems, and
                reliable IT support that help you grow smarter and faster.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/#quote")}
                  size="lg"
                  className="group px-8  rounded-md bg-primary hover:bg-primary/90 text-card transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Get a quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  onClick={() => router.push("/contact")}
                  size="lg"
                  variant="outline"
                  className="px-8 py-5 rounded-md border-border/50 hover:border-primary/50 bg-background/80 dark:bg-background/90 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Free Consultation
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.6} className="mt-16">
              <div className="relative w-full max-w-4xl h-[400px] mx-auto rounded-2xl overflow-hidden border border-border/20 dark:border-border/30 bg-gradient-to-br from-background to-muted/20 dark:from-muted/10 dark:to-background/50">
                <Image
                  src={aboutImg}
                  alt="About us image"
                  width={700}
                  height={400}
                  className="w-full h-full object-cover"
                />
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
                    Who we are?
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-secondary/80 to-background/80 rounded-full" />
                </div>

                <div className="space-y-6 text-justify text-gray-400 dark:text-muted-foreground/90">
                  <p className="text-lg text-primary dark:text-white leading-relaxed">
                    XRT Tech was founded with a single belief great technology
                    shouldn’t be complicated or overpriced.
                  </p>
                  <p className="leading-relaxed">
                    We build digital solutions that combine enterprise-level
                    quality with small-business flexibility, helping our clients
                    grow, adapt, and thrive in a connected world. Everything we
                    create is guided by three pillars: value, performance, and
                    transparency.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Button
                    onClick={() => router.push("/services")}
                    size="lg"
                    className="group px-8 h-12  bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span>Our Work</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    onClick={() => router.push("/about")}
                    size="lg"
                    variant="outline"
                    className="px-8 h-12  border-2 border-border/50 hover:border-primary/50 hover:text-secondary bg-background/80 dark:bg-background/90 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              <div className="relative aspect-auto rounded-3xl overflow-hidden shadow-2xl border border-border/20 dark:border-border/30 bg-gradient-to-br from-muted/20 to-background dark:from-muted/10 dark:to-background/50">
                <Image
                  src={whoWeAre}
                  alt="Who we are"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
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
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={missionIcon}
                    alt="Mission icon"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-2xl  font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To create high-quality, results-driven technology that delivers
                real business value without unnecessary cost or complexity.
              </p>
            </FadeIn>

            {/* Vision */}
            <FadeIn
              delay={0.2}
              className="p-8 bg-card rounded-2xl shadow-sm border border-border/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={vission}
                    alt="Vision icon"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To redefine affordable innovation by setting a new standard for
                reliable, high-performance digital solutions.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        </div>

        <div className="page-container px-4 mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
              <span>Our Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Guiding Principles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The foundation of our company culture and the driving force behind
              every decision we make.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              // Define icons for each value
              const icons = [
                <Rocket className="w-6 h-6 text-primary" />,
                <TestTube2 className="w-6 h-6 text-primary" />,
                <Settings className="w-6 h-6 text-primary" />,
                <Paintbrush className="w-6 h-6 text-primary" />,
              ];

              return (
                <FadeIn
                  key={value.title}
                  delay={0.1 * index}
                  className="h-full"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-full bg-card/50 backdrop-blur-sm border border-border/20 dark:border-border/30 rounded-2xl p-6 group hover:bg-card hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                    {/* Decorative element */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />

                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      {icons[index % icons.length]}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-justify leading-relaxed">
                      {value.description}
                    </p>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 transition-all duration-300 group-hover:w-full" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-card/40 via-card/40 to-primary/20 text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Ready to start your project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/40 leading-relaxed ">
              Let's work together to bring your ideas to life with our expert
              team and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-card"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:opacity-60 hover:text-primary"
                asChild
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
