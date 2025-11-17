"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {marketing, screens} from "@/config/constants";

const Included = () => {
  const router = useRouter();
  return (
    <section className="page-container relative overflow-hidden bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Why Choose XRT Tech?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your business with our comprehensive digital solutions designed to
            boost your online presence and streamline operations.
          </p>
        </motion.div>

        {/* Marketing Offers */}
        <div className="space-y-14">
          {marketing.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                delay: index * 0.15,
              }}
              viewport={{ amount: 0.3 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center md:items-stretch gap-6 md:gap-10`}
            >
              <div className="w-full md:w-1/2 h-44 md:h-56 rounded-2xl overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-10" />
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={` ${offer.image == screens ? "bg-top" : "bg-center"} object-cover`}
                  priority={index < 2}
                />
              </div>

              <div className="w-full md:w-1/2">
                <div className="bg-background/95 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {offer.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
                    {offer.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of satisfied customers and take advantage of our
            exclusive online offers today. Subscribe to any plan and get started
            in minutes!
          </p>
          <button
            className="bg-gradient-to-r from-main to-secondary hover:opacity-90 text-card-foreground dark:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-main/30"
            onClick={() => router.push("/contact/#contactForm")}
          >
            Are you ready
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Included;
