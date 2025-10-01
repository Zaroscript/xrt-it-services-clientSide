"use client";

import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";

const includedItems = [
  {
    title: "Restaurant Website",
    description: "A restaurant website perfectly optimized to grow your traffic and sales.",
  },
  {
    title: "Online Ordering",
    description: "An online ordering system that's as good as the biggest restaurant brands.",
  },
  {
    title: "Mobile App",
    description: "Your very own mobile app, branded for your restaurant, that your regulars will love.",
  },
  {
    title: "Loyalty and Rewards",
    description: "A rewards program that gets more repeat orders, just like the national chains.",
  },
  {
    title: "Automated Marketing",
    description: "Automated email and text marketing campaigns that drive sales on their own.",
  },
  {
    title: "Month-to-Month Contract",
    description: "No lock-in. No long-term contracts. No cancellation fees. Cancel anytime.",
  },
  {
    title: "24/7 Support",
    description: "You’re 24/7, so we are too. Our customer support is consistently rated 5 stars.",
  },
];

const Included = () => {
  return (
    <section className="bg-neutral-900 text-gray-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <div className="mb-12">
          <p className="uppercase tracking-wide text-gray-400 text-lg">
            What’s included
          </p>
        </div>

        {/* List of items */}
        <div className="space-y-10">
          {includedItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 pb-6"
            >
              {/* Title with icon */}
              <h5 className="flex items-center gap-2 text-lg font-semibold text-white mb-3 md:mb-0">
                <CheckSquare className="text-blue-500 w-5 h-5" />
                {item.title}
              </h5>

              {/* Description */}
              <p className="text-sm text-gray-400 max-w-xl md:text-right">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Included;
