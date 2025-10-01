"use client";

import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-slate-100/10">
      <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-3 lg:col-span-1"
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-gold">
              XRT Tech
            </h3>
            <p className="mt-4 text-[#64748b] dark:text-slate-300 text-sm leading-relaxed max-w-sm">
              Empowering businesses through innovative technology solutions that drive growth and success.
            </p>
            <div className="flex gap-4 mt-6">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 group rounded-full bg-gold dark:bg-slate-800/50 hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-card dark:text-slate-400 group-hover:text-gold" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-[#d3b073]">Solutions</h4>
            <ul className="space-y-3">
              {["Web Development", "Mobile Apps", "Cloud Services", "IT Consulting"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-[#d3b073] dark:text-white">Company</h4>
            <ul className="space-y-3">
              {["About", "services", "plans", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#64748b] dark:text-slate-200">
                <Mail className="w-4 h-4" />
                hello@xrttech.com
              </li>
              <li className="flex items-center gap-2 text-sm text-[#64748b] dark:text-slate-200">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#64748b] dark:text-slate-400">
              © {new Date().getFullYear()} <span className="text-gold underline underline-offset-2 hover:opacity-75 transition-opacity cursor-pointer">XRT Tech</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-[#1a1a1a] dark:text-[#d3b073] hover:text-[#d3b073] dark:hover:opacity-75 hover:underline hover:underline-offset-2transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
