"use client";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "01. Discussion",
    text: "We meet customers in set place to discuss the details about needs and demands before proposing a plan.",
  },
  {
    id: 2,
    title: "02. Concepts & Initiatives",
    text: "Our experts come up with all kinds of ideas and initiatives for delivering the best solutions for IT services chosen.",
  },
  {
    id: 3,
    title: "03. Testing & Trying",
    text: "After agreeing on the ideas and plans, we will conduct as scheduled and give comments on the results & adaptations.",
  },
  {
    id: 4,
    title: "04. Execute & Install",
    text: "Once the final plan is approved, everything will be conducted according to the agreed contract.",
  },
];

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
            How it helps <span className="text-[#d3b073]">your business succeed</span>
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
              className="relative bg-white dark:bg-[#232325] p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-none"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#d3b073] text-[#d3b073] mb-4">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{step.text}</p>
              <a
                href="#"
                className="inline-flex items-center mt-4 text-[#d3b073] font-semibold hover:text-white transition"
              >
                Look more <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
