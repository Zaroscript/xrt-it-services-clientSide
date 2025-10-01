"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  CloudCog,
  Smartphone,
  Database,
  Shield,
  Fingerprint,
  Globe,
  Cpu,
  Bot,
  BarChart3,
} from "lucide-react";
import { ServiceCard } from "./ui/ServiceCard";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your unique business requirements and drive growth.",
  },
  {
    icon: CloudCog,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and services to optimize your business operations and reduce costs.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Expert database design, optimization, and maintenance for efficient data handling.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets and maintain data integrity.",
  },
  {
    icon: Fingerprint,
    title: "Identity & Access Management",
    description: "Secure authentication and authorization systems for enhanced protection.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
  },
  {
    icon: Cpu,
    title: "IoT Solutions",
    description: "Connected device solutions that bridge the physical and digital worlds.",
  },
  {
    icon: Bot,
    title: "AI & Machine Learning",
    description: "Intelligent systems that automate processes and provide valuable insights.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Advanced analytics solutions to help you make data-driven decisions.",
  },
];

export function Services() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Double the services array for smooth infinite loop
  const extendedServices = [...services, ...services];

  return (
    <section className="relative overflow-hidden py-20 ">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-transparent" />
      
      {/* Section header */}
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-primary dark:text-slate-200 sm:text-4xl"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-400"
          >
            Comprehensive tech solutions to power your digital transformation
          </motion.p>
        </div>

        {/* Services carousel */}
        <div 
          className="mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: isHovered ? ["0%", "-50%"] : ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: isHovered ? 30 : 20,
                ease: "linear",
              },
            }}
          >
            {extendedServices.map((service, index) => (
              <div
                key={index}
                className="w-[300px] flex-shrink-0"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}