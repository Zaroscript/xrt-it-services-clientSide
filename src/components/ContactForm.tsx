"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [businessType, setBusinessType] = useState("personal");

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <h2 className="relative border-l-4 border-secondary pl-6 text-3xl font-bold text-primary dark:text-white sm:text-4xl lg:text-[45px]">
                To make requests for further information,{" "}
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  contact us
                </span>{" "}
                via our social channels.
              </h2>
              <p className="mt-6 pl-6 text-lg text-gray-400">
                We just need a couple of hours! <br />
                No more than 2 working days since receiving your issue ticket.
              </p>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </motion.div>
                </div>

                {/* Phone Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="tel"
                    placeholder="Phone number *"
                    required
                    className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </motion.div>

                {/* Business Type Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid gap-6 sm:grid-cols-12"
                >
                  <div className={businessType === "business" ? "sm:col-span-4" : "sm:col-span-12"}>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option value="personal" className="hover:bg-secondary/80">Personal</option>
                      <option value="business" className="hover:bg-secondary/80">Business</option>
                    </select>
                  </div>
                  {businessType === "business" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="sm:col-span-8"
                    >
                      <input
                        type="text"
                        placeholder="Business Name *"
                        required={businessType === "business"}
                        className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Message Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <textarea
                    placeholder="Describe what you need"
                    required
                    rows={4}
                    className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  ></textarea>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    type="submit"
                    className="group flex h-[55px] w-[180px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 font-medium text-[#232325] transition-all hover:gap-4 hover:shadow-lg hover:shadow-secondary/20"
                  >
                    Send Message
                    <Send className="h-4 w-4 transition-all group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}