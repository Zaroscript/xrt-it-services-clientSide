"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (!isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
      // Show banner after a delay for better UX
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!localStorage.getItem('pwa-install-dismissed')) {
        setShowInstallBanner(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      toast.success('App installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          toast.success('Installing app...');
        }
        
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      } catch (error) {
        console.error('Error during install prompt:', error);
        toast.error('Failed to install app');
      }
    } else if (isIOS) {
      // Show instructions for iOS
      toast.info('To install: Tap Share button → Add to Home Screen');
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showInstallBanner || !deferredPrompt && !isIOS) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Install XRT Services App
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {isIOS 
              ? "Install our app for quick access and offline features"
              : "Get our app on your device for a better experience"
            }
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Install
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDismiss}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Later
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
