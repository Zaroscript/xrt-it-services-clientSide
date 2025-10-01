"use client";
import { motion } from "framer-motion";

export default function Service() {
  return (
    <section
      className="py-16 bg-size-[45%] bg-no-repeat bg-right text-white global-bg bg-secondary/10"
      
    >
      <div className="page-container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        <motion.h3
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-center lg:text-left text-primary dark:text-white/50"
        >
          We run all kinds of IT services that vow your{" "}
          <span className="text-[#d3b073]">success</span>
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          <button className="bg-[#d3b073] text-black px-6 py-3 rounded-md font-medium hover:bg-transparent hover:border hover:border-[#d3b073] hover:text-[#d3b073] transition ">
            <i className="far fa-comment-alt"></i> Let&apos;s Talk
          </button>
          <button className="border border-[#d3b073] text-[#d3b073] px-6 py-3 rounded-md font-medium hover:bg-[#d3b073] hover:text-black transition ">
            <i className="fas fa-info-circle"></i> Get Info
          </button>
        </motion.div>
      </div>
    </section>
  );
}
