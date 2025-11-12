'use client';

import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Create the base toast function
const createToast = (message: string, options: ToastOptions = {}) => {
  const { type = 'info', duration = 5000, position = 'top-center', action } = options;
  
  const toastOptions = {
    duration,
    position,
    action: action ? {
      label: action.label,
      onClick: action.onClick
    } : undefined,
    style: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: 'var(--radius)',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  };

  switch (type) {
    case 'success':
      return sonnerToast.success(message, {
        ...toastOptions,
        icon: '✅',
      });
    case 'error':
      return sonnerToast.error(message, {
        ...toastOptions,
        icon: '❌',
      });
    case 'warning':
      return sonnerToast.warning(message, {
        ...toastOptions,
        icon: '⚠️',
      });
    default:
      return sonnerToast(message, {
        ...toastOptions,
        icon: 'ℹ️',
      });
  }
};

// Create the toast object with all the sonner methods
export const toast = Object.assign(createToast, {
  success: sonnerToast.success,
  error: sonnerToast.error,
  warning: sonnerToast.warning,
  info: sonnerToast.info,
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  loading: sonnerToast.loading
});

export const Toaster = () => (
  <SonnerToaster
    position="top-center"
    toastOptions={{
      style: {
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    }}
  />
);
