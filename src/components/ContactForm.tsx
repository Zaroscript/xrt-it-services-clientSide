"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

const services = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Mobile App Development" },
  { id: 3, name: "Cloud Services" },
  { id: 4, name: "DevOps & Infrastructure" },
  { id: 5, name: "AI & Machine Learning" },
  { id: 6, name: "Cybersecurity" },
  { id: 7, name: "IT Consulting" },
  { id: 8, name: "Other" },
];

export function ContactForm() {
  const [businessType, setBusinessType] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    service: "",
    message: "",
  });

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (businessType === "business") {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (formData.website && !/^https?:\/\//.test(formData.website)) {
        newErrors.website = "Please include http:// or https://";
      }
      if (!formData.service) newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Handle form submission here
      console.log("Form submitted:", { ...formData, type: businessType });
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          website: "",
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
          service: "",
          message: "",
        });
        setBusinessType("personal");
        setIsSubmitting(false);
        // Show success message
        alert("Thank you for your message! We will get back to you soon.");
      }, 1000);
    }
  };

  return (
    <section className="py-32">
      <div className="page-container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <p className="relative border-l-4 text-2xl border-secondary pl-6  font-bold text-primary dark:text-white  ">
                Have a question or need more information? information,{" "}
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  Fill out the form or reach out to us via our social channels.
                </span>{" "}
                We're here to help you with anything you need. To make requests
                for further
              </p>
              <div className="mt-6 pl-6 space-y-4">
                <div className="text-gray-400">
                  <p className="font-medium text-white">Working Hours:</p>
                  <p>Monday to Friday: 10 AM to 10 PM</p>
                  <p>Saturday: 8 AM to 8 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number *"
                      className={`w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-transparent focus:ring-secondary"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Business Type Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className={`w-full rounded-lg bg-[#343438] px-4 py-3 text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary appearance-none`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.25em 1.25em",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="personal">Personal</option>
                    <option value="business">Business</option>
                  </select>
                </motion.div>

                {/* Business Information - Conditionally Shown */}
                <AnimatePresence>
                  {businessType === "business" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Business Name */}
                      <div className="relative">
                        <label
                          htmlFor="businessName"
                          className="mb-1 block text-sm font-medium text-gray-300"
                        >
                          Business Name *
                        </label>
                        <input
                          id="businessName"
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                          required
                        />
                      </div>

                      {/* Website URL */}
                      <div className="relative">
                        <label
                          htmlFor="website"
                          className="mb-1 block text-sm font-medium text-gray-300"
                        >
                          Website (Optional)
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Globe className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="website"
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourbusiness.com"
                            className="w-full rounded-lg bg-[#343438] pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                          />
                        </div>
                      </div>

                      {/* Company Address - US Only */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-300">
                          Company Address (US Only) *
                        </h4>

                        {/* Street Address */}
                        <div className="relative">
                          <input
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            placeholder="Street address"
                            className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {/* City */}
                          <div className="relative">
                            <input
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="City"
                              className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                              required
                            />
                          </div>

                          {/* State */}
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MapPin className="h-5 w-5 text-gray-500" />
                            </div>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full appearance-none rounded-lg bg-[#343438] pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-1 focus:border-secondary focus:ring-secondary"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.75rem center",
                                backgroundSize: "1.25em 1.25em",
                                paddingRight: "2.5rem",
                              }}
                              required
                            >
                              <option value="" disabled>
                                Select State
                              </option>
                              {usStates.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Zip Code */}
                        <div className="relative">
                          <input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="ZIP Code"
                            className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                            pattern="\d{5}(-\d{4})?"
                            title="Enter a valid US ZIP code (e.g., 12345 or 12345-6789)"
                            required
                          />
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="relative">
                        <label
                          htmlFor="service"
                          className="mb-1 block text-sm font-medium text-gray-300"
                        >
                          Service of Interest *
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                          </div>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg bg-[#343438] pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-1 focus:border-secondary focus:ring-secondary"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.75rem center",
                              backgroundSize: "1.25em 1.25em",
                              paddingRight: "2.5rem",
                            }}
                            required
                          >
                            <option value="" disabled>
                              Select a service
                            </option>
                            <optgroup label="Development">
                              {services
                                .filter((s) => [1, 2].includes(s.id))
                                .map((service) => (
                                  <option key={service.id} value={service.name}>
                                    {service.name}
                                  </option>
                                ))}
                            </optgroup>
                            <optgroup label="Infrastructure">
                              {services
                                .filter((s) => [3, 4, 5, 6].includes(s.id))
                                .map((service) => (
                                  <option key={service.id} value={service.name}>
                                    {service.name}
                                  </option>
                                ))}
                            </optgroup>
                            <optgroup label="Other">
                              {services
                                .filter((s) => [7, 8].includes(s.id))
                                .map((service) => (
                                  <option key={service.id} value={service.name}>
                                    {service.name}
                                  </option>
                                ))}
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={4}
                      className="w-full rounded-lg bg-[#343438] px-4 py-3 text-white placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    ></textarea>
                    <div className="mt-1 text-xs text-gray-500">
                      {formData.message.length}/1000 characters
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex h-[55px] w-[180px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 font-medium text-[#232325] transition-all ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:gap-4 hover:shadow-lg hover:shadow-secondary/20"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#232325]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-all group-hover:translate-x-1" />
                      </>
                    )}
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
