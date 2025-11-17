// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { NAV_LINKS } from "@/config/constants";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Button } from "./ui/button";
import { MobileMenu } from "./MobileMenu";
import { UserAvatarDropdown } from "./ui/UserAvatarDropdown";
import lightLogo from "../assets/images/logo-light.png";
import darkLogo from "../assets/images/logo-dark.png";
import { useThemeDetector } from "@/hooks/useThemeDetector";
import { useRouter } from "next/navigation";
import useAuth from "@/store/useAuthStore";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isDark, isMounted } = useThemeDetector();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isMounted) {
      setIsClient(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-slate-200/30 shadow-md"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center h-16">
            <div className="relative flex items-center">
              <Image
                src={isMounted ? (isDark ? darkLogo : lightLogo) : darkLogo}
                alt="XRT Tech Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {NAV_LINKS.map((link) => {
                return (
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
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {/* User Avatar Dropdown - Show when authenticated */}
              {isAuthenticated ? (
                <>
                  <Button
                    className="px-4 py-2 group rounded-lg bg-primary text-card cursor-pointer font-medium flex 
            items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    onClick={() => router.push("/#quote")}
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <UserAvatarDropdown />
                </>
              ) : (
                <>
                  <Button
                    className="px-4 py-2 group rounded-lg bg-primary text-card cursor-pointer font-medium flex 
            items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </>
              )}

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
