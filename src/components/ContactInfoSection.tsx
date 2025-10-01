"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6 text-secondary" />,
    title: "Email Us",
    description: "We'll respond quickly",
    value: "contact@xrt-tech.com",
    link: "mailto:contact@xrt-tech.com"
  },
  {
    icon: <Phone className="h-6 w-6 text-secondary" />,
    title: "Call Us",
    description: "Mon-Fri from 9am to 5pm",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: <MapPin className="h-6 w-6 text-secondary" />,
    title: "Visit Us",
    description: "Our office location",
    value: "123 Tech Street, Silicon Valley, CA 94025"
  },
  {
    icon: <Clock className="h-6 w-6 text-secondary" />,
    title: "Working Hours",
    description: "We're here for you",
    value: "Monday - Friday: 9:00 AM - 6:00 PM"
  }
];

export function ContactInfoSection() {
  return (
    <section className="bg-gray-50 dark:bg-[#1e1e20] py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Our <span className="text-secondary">Contact</span> Information
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="bg-white dark:bg-[#2a2a2d] rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-[#343438] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10 dark:shadow-gray-900/20"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      className="mt-2 text-secondary hover:text-secondary/80 transition-colors block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{item.value}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#232325] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Find Us on the <span className="text-secondary">Map</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Visit our office or get in touch with our team for any inquiries.
          </motion.p>
        </div>

        <motion.div 
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-w-16 aspect-h-9 w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101360.30408287247!2d-122.1207421!3d37.3871361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb07545f7e4b9%3A0x4a501367f3e1e71!2sSilicon%20Valley%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              title="XRT Tech Office Location"
            ></iframe>
          </div>
          
          <div className="bg-white dark:bg-[#2a2a2d] p-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">XRT Tech Headquarters</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">123 Tech Street, Silicon Valley, CA 94025</p>
              </div>
              <a 
                href="https://maps.google.com?q=123+Tech+Street,+Silicon+Valley,+CA+94025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/90 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
