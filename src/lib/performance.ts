// Performance optimization utilities

/**
 * Preload a component module for faster rendering
 * Use this before the user is likely to navigate to a route
 */
export function preloadComponent(importFn: () => Promise<any>) {
  importFn();
}

/**
 * Intersection Observer hook for lazy loading
 * Useful for triggering expensive operations when element is visible
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Debounce hook for performance-critical operations
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

import React from "react";
