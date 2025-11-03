"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Code2,
  CloudCog,
  Cpu,
  HardDrive,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { services, howItWorks, faqs } from "@/config/constants";
import { useRouter } from "next/navigation";


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
                  <Link href={`/services/${service.id}`}>
                    <div className="group h-full flex flex-col bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2">
                      <div
                        className={`h-1.5 w-full bg-gradient-to-r ${service.color}`}
                      ></div>
                      <div className="p-8 flex-1 flex flex-col">
                        <div
                          className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-lg`}
                        >
                          {service.icon && <service.icon className="w-7 h-7" />}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 flex-1">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                {howItWorks.map((step, index) => {
                  const colors = [
                    "from-blue-500/10 to-blue-600/10",
                    "from-purple-500/10 to-purple-600/10",
                    "from-pink-500/10 to-pink-600/10",
                    "from-cyan-500/10 to-cyan-600/10",
                  ];

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                      }}
                      className="relative"
                    >
                      <div className="relative h-full bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/20 transition-all duration-300">
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/20 flex items-center justify-center text-3xl text-primary">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
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

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/20 hover:border-primary/30 transition-colors group-hover:shadow-lg">
                  <h3 className="text-lg font-semibold mb-2 text-left">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-left">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
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
                    <span className="group-hover:text-secondary">Contact Us</span>
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
