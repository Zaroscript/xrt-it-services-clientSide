"use client";
import { motion } from "framer-motion";

import { steps } from "@/config/constants";

export default function Succeed() {
  return (
    <section className="py-16 bg-[#fff9f0] dark:bg-[#1a1a1a] text-foreground dark:text-white">
      <div className="page-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h4 className="uppercase text-sm tracking-widest opacity-60">How we work</h4>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Turning Your Vision into {" "}
            <span className="text-[#d3b073]">Digital Success</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className=" flex flex-col justify-between bg-white dark:bg-[#232325] p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-none"
            >
              <div className="w-12 h-12 flex items-center  justify-center rounded-full border border-[#d3b073] text-[#d3b073] mb-4">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-justify text-gray-600 dark:text-gray-400 text-sm">{step.text}</p>  
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
