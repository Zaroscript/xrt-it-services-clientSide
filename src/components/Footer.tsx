"use client";

import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useThemeDetector } from "@/hooks/useThemeDetector";
import lightLogo from "../assets/images/logo-light.png";
import darkLogo from "../assets/images/logo-dark.png";
import { services } from "@/config/constants";

const Footer = () => {
  const { isDark, isMounted } = useThemeDetector();
  return (
    <footer className="bg-card border-t border-slate-100/10 shadow-lg shadow-slate-200/10">
      <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <Image
              src={isMounted ? (isDark ? darkLogo : lightLogo) : darkLogo}
              alt="XRT Tech Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <p className="mt-2 text-[#64748b] dark:text-slate-300 text-sm leading-relaxed max-w-sm">
              Smart IT and web solutions made simple for every business.
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 group rounded-full bg-gold dark:bg-slate-800/50 hover:bg-primary/10 transition-colors"
                  aria-label={`Visit our ${
                    index === 0
                      ? "Facebook"
                      : index === 1
                      ? "Instagram"
                      : "LinkedIn"
                  } page`}
                >
                  <Icon className="w-4 h-4 text-card dark:text-slate-400 group-hover:text-gold" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#d3b073]">Solutions</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                  >
                    {service.title.split("&")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#d3b073]">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#1a1a1a] dark:text-white hover:opacity-75 transition-opacity"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#64748b] dark:text-slate-200">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@xrttech.com">support@xrttech.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#64748b] dark:text-slate-200">
                <Phone className="w-4 h-4" />
                <a href="tel:+15085070922">+1 508-507-0922</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#64748b] dark:text-slate-400">
              © {new Date().getFullYear()}{" "}
              <span className="text-gold underline underline-offset-2 hover:opacity-75 transition-opacity cursor-pointer">
                XRT Tech
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs text-[#1a1a1a] dark:text-[#d3b073] hover:text-[#d3b073] dark:hover:opacity-75 hover:underline hover:underline-offset-2 transition-colors"
              >
                Privacy & Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-xs text-[#1a1a1a] dark:text-[#d3b073] hover:text-[#d3b073] dark:hover:opacity-75 hover:underline hover:underline-offset-2 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
