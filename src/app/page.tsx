z"use client";

// import "./globals.css";
import React from "react";
import { motion } from "framer-motion";

import Hero from "@/components/Hero";
// import { Services } from "@/components/Services";
import { CompanySection } from "@/components/CompanySection";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import Success from "@/components/Success";
// import { OurProjects } from "@/components/OurProjects";
// import Service from "@/components/Service";
import Studies from "@/components/Studies";

import { useState } from "react";
import Priceing from "@/components/Priceing";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Services /> */}
      <CompanySection />
      <ServicesShowcase />
      <Success />
      {/* <Service /> */}
      <Studies />

      {/* Pricing Section */}
      
      <Priceing />

      <Testimonials />
      <Partners />
      <ContactSection />
    </>
  );
}
