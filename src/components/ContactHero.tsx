"use client";

import { motion } from "framer-motion";
import {
  MailIcon,
  PhoneCall,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export function ContactHero() {
  return (
    <div className="relative  overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#232325]">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                Get in{" "}
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">We&apos;d love to hear from you! Reach out to us using the contact form below or through our direct contact information.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
