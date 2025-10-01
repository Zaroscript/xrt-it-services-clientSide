"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "IT Consulting",
  "Other",
];

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission (e.g., send email, API call, etc.)
    console.log(data);
    // Reset form after submission
    reset();
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow-lg"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Need a Hand?
              </h2>
              <p className="text-muted-foreground">
                We're here to help! Fill out the form and our team will get back to
                you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  How can we help you? <span className="text-destructive">*</span>
                </label>
                <select
                  id="service"
                  {...register("service", { required: "Please select a service" })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent transition-all appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Your Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="Tell us more about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Have questions or want to discuss your project? We'd love to hear
                from you. Reach out to us using the contact information below or
                fill out the form.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full text-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Email Us
                  </h4>
                  <a
                    href="mailto:contact@xrt-tech.com"
                    className="text-foreground hover:text-gold transition-colors"
                  >
                    contact@xrt-tech.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full text-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Call Us
                  </h4>
                  <a
                    href="tel:+1234567890"
                    className="text-foreground hover:text-gold transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full text-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Visit Us
                  </h4>
                  <p className="text-foreground">
                    123 Tech Street, Silicon Valley
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
