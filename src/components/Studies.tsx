"use client";
import { motion } from "framer-motion";

import { case_study } from "../config/constants";
import Image from "next/image";

export default function Studies() {
  return (
    <section className="py-16 dark:bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm tracking-widest text-gray-400">CASE STUDIES</p>
          <h4 className="text-2xl md:text-4xl font-semibold text-primary dark:text-white/50">
            Proud projects that <span className="text-[#d3b073]">make us stand out</span>
          </h4>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center page-container">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-light mb-3 text-primary dark:text-white/50">Aqua Technology Case Studies</h3>
            <h5 className="text-[#d3b073] font-semiboldmb-3">Cyber Security</h5>
            <p className="text-gray-400 leading-relaxed">
              ARM Holdings is the world&apos;s leading semiconductor Intellectual Property (IP)
              supplier. A semiconductor is the electronic controller at the heart of many devices that we use every day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src={case_study}
              alt="Case Study"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
