"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { services, howItWorks, faqs } from "@/config/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ServicesPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10"
          style={{ opacity, scale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background"></div>
        </motion.div>

        <div className="page-container px-4 text-center relative z-10">
          <FadeIn className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Our Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6"
            >
              Transforming Ideas Into
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digital Reality
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Comprehensive IT solutions tailored to your business needs.
              Explore our range of services to find the perfect fit for your
              organization.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                onClick={() => router.push("/#quote")}
                size="lg"
                className="group px-8 h-12"
              >
                Get A Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section
        ref={targetRef}
        className="relative py-24 overflow-hidden bg-background"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>

        <div className="page-container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <div className="inline-block px-6 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                What We Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Comprehensive Services
              </h2>
              <p className="text-xl text-muted-foreground">
                We offer a wide range of IT services to help your business
                thrive in the digital age.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link
                    href={service.id === 'online-ordering-systems' ? '/pricing' : `/services/${service.id}`}
                    key={service.id}
                    className="h-full"
                  >
                    <div className="group h-full flex flex-col bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2">
                      <div
                        className={`h-1.5 w-full bg-gradient-to-r ${service.color}`}
                      ></div>
                      <div className="p-8 flex-1 flex flex-col">
                        <div
                          className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br text-white shadow-lg`}
                        >
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={64}
                            height={64}
                            className="object-contain w-14 h-14"
                            priority
                          />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-justify mb-6 flex-1">
                          {service.description}
                        </p>
                        <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                          <span className="relative">
                            Learn more
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-muted/5">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.03] [background:radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary to-transparent"></div>
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_100%)]"></div>
        </div>

        <div className="page-container px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium bg-primary/10 text-primary/90 border border-primary/20 backdrop-blur-sm mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Workflow
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined process that ensures your project's success from
                start to finish.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map((step, index) => {
                  const variant = {
                    bg: 'from-primary/5 to-primary/10',
                    border: 'border-primary/20',
                    text: 'text-primary'
                  };

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 30, rotateX: 5 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: [0.16, 1, 0.3, 1]
                        }
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { 
                          type: 'spring',
                          stiffness: 300,
                          damping: 15
                        } 
                      }}
                      viewport={{ once: true, margin: "-30px 0px -50px 0px" }}
                      className="group relative h-full"
                    >
                      <motion.div 
                        className={`absolute inset-0.5 bg-gradient-to-br ${variant.bg} rounded-2xl opacity-0 group-hover:opacity-100`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileHover={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { duration: 0.3 }
                        }}
                      />
                      <motion.div 
                        className={`relative h-full bg-card/90 backdrop-blur-sm rounded-2xl p-6 border ${variant.border} overflow-hidden`}
                        whileHover={{ 
                          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="relative z-10 flex flex-col h-full">
                          <motion.div 
                            className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-background ${variant.border} border flex items-center justify-center text-3xl ${variant.text}`}
                            whileHover={{ 
                              scale: 1.1,
                              rotate: 5,
                              backgroundColor: 'rgba(var(--primary)/0.05)'
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                              <step.icon className="w-6 h-6" />
                            </motion.div>
                          </motion.div>
                          <motion.h3 
                            className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary"
                            whileHover={{ 
                              x: 2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {step.title}
                          </motion.h3>
                          <motion.p 
                            className="text-muted-foreground text-justify text-sm leading-relaxed"
                            initial={{ opacity: 0.9 }}
                            whileHover={{ 
                              opacity: 1,
                              x: 1,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {step.description}
                          </motion.p>
                          <motion.div 
                            className="mt-auto pt-4"
                            whileHover={{ 
                              x: 2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <span className="inline-flex items-center text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                              Learn more
                              <motion.span
                                animate={{
                                  x: [0, 4, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: 'loop',
                                }}
                                className="inline-block ml-1"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.span>
                            </span>
                          </motion.div>
                        </div>
                        <motion.div 
                          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-primary/5"
                          whileHover={{ 
                            scale: 1.2,
                            backgroundColor: 'rgba(var(--primary)/0.1)'
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-16 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="text-muted-foreground mb-6">
                    Ready to start your project?
                  </p>
                  <Button
                    onClick={() => router.push("/contact")}
                    size="lg"
                    className="group px-8 h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"></div>
        </div>

        <div className="page-container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <div className="inline-block px-6 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about our services and
                processes.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:border-primary/30 transition-colors overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                      <span className="text-lg font-semibold text-left">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-background/80 to-background"></div>
        </div>

        <div className="page-container px-4">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-6 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Ready to Start?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Transform Your Business
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your
                business goals and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="group px-8 h-14 border-2 hover:bg-foreground/5"
                  >
                    <span className="group-hover:text-secondary">
                      Contact Us
                    </span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:text-secondary transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-10"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl -z-10"></div>
        </div>
      </section>
    </div>
  );
}
