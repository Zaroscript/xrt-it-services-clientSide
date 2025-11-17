"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown, Package, FileText } from "lucide-react";
import { Button } from "./button";
import useAuth from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UserAvatarDropdownProps {
  className?: string;
}

export const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully', {
        position: 'top-center',
        duration: 2000,
      });
      router.push('/');
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

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      onClick: () => {
        router.push('/dashboard');
        setIsOpen(false);
      },
    },
    {
      icon: Package,
      label: 'My Plans',
      onClick: () => {
        router.push('/dashboard/plans');
        setIsOpen(false);
      },
    },
    {
      icon: FileText,
      label: 'Services',
      onClick: () => {
        router.push('/dashboard/services');
        setIsOpen(false);
      },
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {
        router.push('/dashboard/settings');
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 h-10 px-3 rounded-full hover:bg-primary/5 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium text-sm">
          {getInitials(user?.fName, user?.lName)}
        </div>
        
        {/* Chevron */}
        <ChevronDown 
          className={`w-4 h-4 text-foreground/60 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#343438] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.fName} {user?.lName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <item.icon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
