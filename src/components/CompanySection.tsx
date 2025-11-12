"use client";

import { motion, type Easing } from "framer-motion";
import Image from "next/image";

// images
import {
  company_1,
  company_2,
  company_3,
  company_4,
  company_5,
} from "../config/constants";
import { useRouter } from "next/navigation";

export function CompanySection() {
  const router = useRouter();
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
                From Small Ideas to Big Impact
                <br />
                <span className="text-secondary">
                  {" "}
                  We Build Technology That Works for You
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400"
              >
                We started XRT Tech with one mission: to make modern technology
                accessible to every business. Whether it's a custom website, an
                app, or IT support, we're here to simplify digital
                transformation and make success easy to reach.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => router.push("/about")}
                  className="h-[55px] w-[180px] cursor-pointer rounded-lg bg-gradient-to-r from-secondary to-secondary/80 font-medium text-[#232325] transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
                >
                  Find Out More
                </button>
              </motion.div>
            </div>

            {/* Video and Images */}
            <div className="relative mt-16 lg:mt-0 max-sm:hidden">
              <div className="relative mx-auto w-[250px] sm:w-[500px] rounded-sm lg:w-[400px]">
                {/* Main Video Thumbnail */}

                <div className="relative z-10 rounded-sm shadow-2xl">
                  <Image
                    src={company_1}
                    alt="Company middle image"
                    width={700}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating Images */}
                <motion.div
                  animate={floatingAnimation}
                  className="absolute -left-10 -top-14 w-[120px] h-[120px] rounded-sm overflow-hidden shadow-lg"
                >
                  <Image
                    src={company_2}
                    alt="Floating Image 1"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 0.5 },
                  }}
                  className="absolute -right-4 -top-16 w-[120px] h-[120px] rounded-sm overflow-hidden shadow-lg"
                >
                  <Image
                    src={company_3}
                    alt="Floating Image 2"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1 },
                  }}
                  className="absolute -bottom-20 left-2 w-[120px] h-[120px] rounded-sm overflow-hidden shadow-lg"
                >
                  <Image
                    src={company_4}
                    alt="Floating Image 3"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1.5 },
                  }}
                  className="absolute -bottom-20 -right-10 w-[120px] h-[120px] rounded-sm overflow-hidden shadow-lg"
                >
                  <Image
                    src={company_5}
                    alt="Floating Image 4"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
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
