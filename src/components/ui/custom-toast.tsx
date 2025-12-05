"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Premium toast styles with glassmorphism and theme matching
const getToastStyles = (type: ToastType) => {
  const baseStyles = {
    borderRadius: "12px",
    padding: "16px 20px",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    fontWeight: "500",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
  };

  // Light theme styles
  const lightStyles = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#0f172a",
  };

  // Dark theme styles
  const darkStyles = {
    background: "rgba(30, 30, 32, 0.95)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
  };

  const borderColors = {
    success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  };

  return {
    ...baseStyles,
    ...lightStyles,
    borderLeft: "4px solid transparent",
    borderImage: borderColors[type],
    borderImageSlice: 1,
  };
};

// Create the base toast function
const createToast = (message: string, options: ToastOptions = {}) => {
  const {
    type = "info",
    duration = 5000,
    position = "top-center",
    action,
  } = options;

  const toastOptions = {
    duration,
    position,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    style: getToastStyles(type),
  };

  switch (type) {
    case "success":
      return sonnerToast.success(message, {
        ...toastOptions,
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
    case "error":
      return sonnerToast.error(message, {
        ...toastOptions,
        icon: <XCircle className="h-5 w-5 text-red-600" />,
      });
    case "warning":
      return sonnerToast.warning(message, {
        ...toastOptions,
        icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      });
    default:
      return sonnerToast(message, {
        ...toastOptions,
        icon: <Info className="h-5 w-5 text-blue-600" />,
      });
  }
};

// Create the toast object with all the sonner methods
export const toast = Object.assign(createToast, {
  success: (message: string, options?: any) =>
    sonnerToast.success(message, {
      ...options,
      icon: options?.icon || (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      ),
      style: {
        ...getToastStyles("success"),
        ...options?.style,
      },
    }),
  error: (message: string, options?: any) =>
    sonnerToast.error(message, {
      ...options,
      icon: options?.icon || <XCircle className="h-5 w-5 text-red-600" />,
      style: {
        ...getToastStyles("error"),
        ...options?.style,
      },
    }),
  warning: (message: string, options?: any) =>
    sonnerToast.warning(message, {
      ...options,
      icon: options?.icon || (
        <AlertTriangle className="h-5 w-5 text-amber-600" />
      ),
      style: {
        ...getToastStyles("warning"),
        ...options?.style,
      },
    }),
  info: (message: string, options?: any) =>
    sonnerToast.info(message, {
      ...options,
      icon: options?.icon || <Info className="h-5 w-5 text-blue-600" />,
      style: {
        ...getToastStyles("info"),
        ...options?.style,
      },
    }),
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  loading: (message: string, options?: any) =>
    sonnerToast.loading(message, {
      ...options,
      style: {
        ...getToastStyles("info"),
        ...options?.style,
      },
    }),
});

export const Toaster = () => (
  <SonnerToaster
    position="top-right"
    expand={true}
    richColors={false}
    closeButton={true}
    toastOptions={{
      style: {
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        fontWeight: "500",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        // Light theme
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "#0f172a",
      },
      className: "toast-premium dark:toast-dark",
    }}
  />
);
