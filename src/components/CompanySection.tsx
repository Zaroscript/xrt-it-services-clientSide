"use client";

import { motion, type Easing } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";

// images
import {company_1, company_2, company_3, company_4, company_5} from "../config/constants";

export function CompanySection() {
  
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1] as Easing, 
    },
  };
  
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            {/* About Content */}
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-gray-500"
              >
                OUR COMPANY
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-primary dark:text-slate-200 sm:text-4xl"
              >
                We&apos;ve been triumphing all these{" "}
                <span className="text-secondary">38 years.</span>
                <br />
                Sacrifices are made up with success
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400"
              >
                mitech takes into consideration every little detail to make sure the
                system run smoothly and responsively. Mitech employs a new
                technique called Minified Technology for securing customers&apos;
                database & building up highly confidential firewalls.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button className="h-[55px] w-[180px] rounded-lg bg-gradient-to-r from-secondary to-secondary/80 font-medium text-[#232325] transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary/20">
                  Find Out More
                </button>
              </motion.div>
            </div>

            {/* Video and Images */}
            <div className="relative mt-16 lg:mt-0 max-sm:hidden">
              <div className="relative mx-auto w-[250px] sm:w-[500px] lg:w-[400px]">
                {/* Main Video Thumbnail */}
                <Link
                  href="https://youtu.be/9No-FiEInLA?si=2z829SYXtfU3uqiB"
                  target="_blank"
                  className="group relative block"
                >
                  <Image
                    src={company_1}
                    alt="Company Video"
                    width={500}
                    height={300}
                    className="relative z-10 rounded-lg"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div
                      className="rounded-full bg-secondary p-4 text-[#232325] shadow-lg transition-transform group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-8 w-8" />
                    </motion.div>
                  </div>
                </Link>

                {/* Floating Images */}
                <motion.div
                  animate={floatingAnimation}
                  className="absolute -left-10 -top-14 w-[183px]"
                >
                  <Image
                    src={company_2}
                    alt="Floating Image 1"
                    width={183}
                    height={183}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 0.5 },
                  }}
                  className="absolute -right-4 -top-16 w-[120px]"
                >
                  <Image
                    src={company_3}
                    alt="Floating Image 2"
                    width={120}
                    height={120}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1 },
                  }}
                  className="absolute -bottom-20 left-2 w-[120px]"
                >
                  <Image
                    src={company_4}
                    alt="Floating Image 3"
                    width={120}
                    height={120}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1.5 },
                  }}
                  className="absolute -bottom-20 -right-10 w-[130px]"
                >
                  <Image
                    src={company_5}
                    alt="Floating Image 4"
                    width={130}
                    height={130}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}