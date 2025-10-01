// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/config/constants";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Button } from "./ui/button";
import { MobileMenu } from "./MobileMenu";
import { DropdownMenu } from "./ui/DropdownMenu";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return null; // or a loading state that matches your design
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-slate-200/30 shadow-md"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center h-16">
            <div className="relative h-16 w-48 flex items-center">
              <Image
                src="/logo.png"
                alt="XRT Tech Logo"
                fill
                sizes="(max-width: 768px) 140px, 192px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${
                    pathname === link.path
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="hidden md:inline-flex hover:bg-primary/5 text-foreground/80"
              asChild
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
