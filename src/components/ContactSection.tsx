"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useContactForm } from '@/hooks/useContactForm';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast, Toaster } from '@/components/ui/custom-toast';

const ContactSection = () => {
  const [businessType, setBusinessType] = useState<"personal" | "business">("personal");
  const { form, onSubmit, isSubmitting, success, error } = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = form;

  // Show success toast when form is submitted successfully
  useEffect(() => {
    if (success) {
      toast.success('Message sent successfully! We will get back to you soon.');
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleFormSubmit = async (data: any) => {
    try {
      data.type = businessType;
      await onSubmit(data);
    } catch (error) {
      // Error is handled by useEffect
    }
  };

  return (
    <>
      <Toaster />
      <section id="quote" className="py-20 px-4 sm:px-6 bg-background">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow-lg w-full"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">Get a Free Quote</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form and we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name Field */}
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
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.name ? 'border-destructive' : 'border-input'
                    }`}
                    disabled={isSubmitting}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.email ? 'border-destructive' : 'border-input'
                    }`}
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Business Type Toggle */}
              <div className="flex space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => setBusinessType("personal")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    businessType === "personal"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType("business")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    businessType === "business"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Business
                </button>
              </div>

              {businessType === "business" && (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Business Name */}
                    <div>
                      <label 
                        htmlFor="businessName" 
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        {...register('businessName')}
                        className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        disabled={isSubmitting}
                        placeholder="Your Business Name"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label 
                        htmlFor="website" 
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        {...register('website')}
                        placeholder="https://"
                        className={`w-full px-4 py-3 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          errors.website ? 'border-destructive' : 'border-input'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.website && (
                        <p className="mt-1 text-sm text-destructive">{errors.website.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label 
                      htmlFor="service" 
                      className="block text-sm font-medium text-foreground mb-1"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      {...register('service')}
                      className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="design">UI/UX Design</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="consulting">IT Consulting</option>
                    </select>
                  </div>
                </>
              )}

              {/* Phone Number */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Phone Number <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.phone ? 'border-destructive' : 'border-input'
                  }`}
                  disabled={isSubmitting}
                  placeholder="+1 (234) 567-8900"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className={`w-full px-4 py-3 rounded-lg bg-background text-foreground border ${
                    errors.message ? 'border-destructive' : 'border-input'
                  } focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  disabled={isSubmitting}
                  placeholder="Tell us about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
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
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Contact Information</h2>
              <p className="text-muted-foreground">
                Have questions or want to discuss your project? Reach out to us!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Address</h3>
                  <p className="text-muted-foreground">Franklin, MA 02038</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Email Us</h3>
                  <a
                    href="mailto:support@xrttech.com"
                    className="text-primary hover:underline"
                  >
                    support@xrttech.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Call Us</h3>
                  <a href="tel:+15085070922" className="text-primary hover:underline">
                    +1 (508) 507-0922
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;