"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

import { services } from "@/config/constants";
import Image from "next/image";

export function ServicesShowcase() {
  return (
    <section className="page-container relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')]" />
      </div>

      <div className="page-container relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Specialized
            </span>{" "}
            Services
          </motion.h2>
          <motion.p
            className="text-lg text-primary/50 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Empowering small businesses with digital solutions that make
            technology simple, effective, and built for growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-card rounded-2xl p-4 text-justify hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />
              <div className="relative z-10 flex-1 flex flex-col">
                <div
                  className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br text-white`}
                >
                  <Image
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  {service.title}
                </h3>
                <p className="dark:text-white/50 text-primary/50 mb-6 flex-1">
                  {service.description}
                </p>
                <div className="mt-auto pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent border-primary/20 hover:bg-primary/10 text-primary hover:text-primary transition-colors group"
                  >
                    <Link href="/services" className="flex items-center justify-center gap-1">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
