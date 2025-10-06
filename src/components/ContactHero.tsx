"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export function ContactHero() {
  const contactItems = [
    {
      icon: <Mail className="h-8 w-8 text-secondary" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      value: "contact@xrt-tech.com",
      href: "mailto:contact@xrt-tech.com",
    },
    {
      icon: <Phone className="h-8 w-8 text-secondary" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-8 w-8 text-secondary" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Tech Street, Silicon Valley",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-card  ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-1/2 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="page-container relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="inline-block text-sm font-semibold tracking-wide text-secondary uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Contact Us
            </motion.span>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary dark:text-white sm:text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Let's Build Something
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70">
                {" "}
                Amazing Together
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Have a project in mind or want to learn more about our services?
              Our team is here to help you turn your ideas into reality.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
