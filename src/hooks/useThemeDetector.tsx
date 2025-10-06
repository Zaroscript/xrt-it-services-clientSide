import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeDetectorResult {
  /** Current theme ('light', 'dark', or 'system') */
  theme: string | undefined;
  /** Resolved theme (either 'light' or 'dark' based on system preference if theme is 'system') */
  resolvedTheme: string | undefined;
  /** Whether the theme has been resolved (component has mounted) */
  isMounted: boolean;
  /** Whether the current theme is dark mode */
  isDark: boolean;
  /** Whether the current theme is light mode */
  isLight: boolean;
  /** Whether the theme is set to system preference */
  isSystem: boolean;
  /** Get CSS class names based on current theme */
  getThemeClasses: (lightClasses: string, darkClasses: string) => string;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

/**
 * Custom hook for detecting and working with the current theme
 * Built on top of next-themes for consistent theme management
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDark, toggleTheme, getThemeClasses } = useThemeDetector();
 *
 *   return (
 *     <div className={getThemeClasses('bg-white text-black', 'bg-gray-900 text-white')}>
 *       <p>Current theme is {isDark ? 'dark' : 'light'}</p>
 *       <button onClick={toggleTheme}>Toggle Theme</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns {ThemeDetectorResult} Object containing theme information and utilities
 */
export function useThemeDetector(): ThemeDetectorResult {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, resolvedTheme, setTheme: setNextTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getThemeClasses = (lightClasses: string, darkClasses: string): string => {
    if (!isMounted || !resolvedTheme) return lightClasses;
    return resolvedTheme === 'dark' ? darkClasses : lightClasses;
  };

  const toggleTheme = () => {
    if (!isMounted || !resolvedTheme) return;
    setNextTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    if (!isMounted) return;
    setNextTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    isMounted,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
    getThemeClasses,
    toggleTheme,
    setTheme,
  };
}