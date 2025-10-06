"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. If you downgrade, the changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all our plans. If you're not satisfied with our service, you can request a full refund within the first 30 days of your subscription.",
  },
  {
    question: "Do you offer team discounts?",
    answer:
      "Yes, we offer special discounts for teams of 5 or more members. Contact our sales team for custom pricing and team management features.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period.",
  },
  {
    question: "What happens after my subscription ends?",
    answer:
      "When your subscription ends, you'll lose access to premium features. Your progress and data will be saved for 90 days, giving you time to reactivate your subscription if desired.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-24 bg-[#343438] py-16">
      <div className="page-container">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-800 bg-[#232325]"
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-4"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-left text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-secondary" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-800 px-6 py-4">
                        <p className="text-gray-400">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}