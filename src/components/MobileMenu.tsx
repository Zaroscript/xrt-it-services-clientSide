// src/components/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, LogOut, Settings, Package, FileText, LayoutDashboard, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { NAV_LINKS } from "@/config/constants";
import useAuthStore from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

// types
import { MobileMenuProps } from "@/types";

// Variants
import { linkVariants } from "@/config/variants";

export function MobileMenu({ isOpen, onClose, dashboardTabHandler }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully', {
        position: 'top-center',
        duration: 2000,
      });
      router.push('/');
      onClose();
    } catch (error) {
      toast.error('Failed to logout', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  // Dashboard tab items
  const dashboardTabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'services', icon: Package, label: 'Services' },
    { id: 'plan', icon: CreditCard, label: 'Plan' },
    { id: 'invoices', icon: FileText, label: 'Invoices' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Regular user menu items (when not on dashboard)
  const userMenuItems = [
    { icon: User, label: 'Dashboard', href: '/dashboard' },
    { icon: Package, label: 'My Plans', href: '/dashboard?tab=plan' },
    { icon: FileText, label: 'Services', href: '/dashboard?tab=services' },
    { icon: Settings, label: 'Settings', href: '/dashboard?tab=settings' },
  ];

  const handleDashboardTabClick = (tabId: string) => {
    if (dashboardTabHandler?.onTabChange) {
      dashboardTabHandler.onTabChange(tabId);
      onClose();
    } else {
      // Fallback: navigate to dashboard with tab param
      router.push(`/dashboard?tab=${tabId}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-card p-6 shadow-2xl lg:hidden border-l border-gray-200 dark:border-border/20"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-border/50">
              <Link
                href="/"
                onClick={onClose}
                className="text-2xl font-bold tracking-wider"
              >
                XRT <span className="text-primary">Tech</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900 hover:scale-110 hover:rotate-90 transition-all duration-300"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex-1 mt-8">
              <ul className="flex flex-col space-y-2">
                {NAV_LINKS.map((link, i) => {
                  return (
                    <motion.li
                      key={link.name}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ delay: i * 0.05, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <Link
                        href={link.path}
                        className="flex items-center w-full px-4 py-3 text-lg font-medium text-gray-800 dark:text-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
                        onClick={onClose}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Get a Quote button - shown for all users */}
            <div className="border-t border-gray-200 dark:border-border/50 pt-6 mt-6">
              <Button
                className="w-full px-4 py-2 group rounded-lg bg-primary text-card cursor-pointer font-medium flex 
            items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                onClick={() => {
                  router.push('/#quote');
                  onClose();
                }}
              >
                Get a Quote
              </Button>
            </div>

            {/* User section for authenticated users */}
            {isAuthenticated && (
              <div className="border-t border-gray-200 dark:border-border/50 pt-6 mt-6">
                {/* User info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium">
                    {getInitials(user?.fName, user?.lName)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.fName} {user?.lName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Dashboard tabs (when on dashboard page) */}
                {isDashboard && dashboardTabHandler ? (
                  <div className="space-y-1 mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
                      Dashboard
                    </p>
                    {dashboardTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = dashboardTabHandler.activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDashboardTabClick(tab.id);
                          }}
                          className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-muted'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* User menu items (when not on dashboard) */
                  <div className="space-y-1 mb-4">
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-muted rounded-lg transition-colors"
                        onClick={onClose}
                      >
                        <item.icon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}

            {/* Auth buttons for non-authenticated users */}
            {!isAuthenticated && (
              <div className="border-t border-gray-200 dark:border-border/50 pt-6 mt-6">
                <Button
                  className="w-full px-4 py-2 group rounded-lg bg-primary text-card cursor-pointer font-medium flex 
            items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    router.push('/auth/login');
                    onClose();
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
