'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { Loader } from '../ui/Loader';
import { getToken, clearAuthData } from '@/lib/auth';

// List of public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/services',
  '/portfolio',
  '/terms-and-conditions',
  '/privacy-policy',
  '/coming-soon'
];

// List of protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/billing',
  '/account'
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchAllUserData, setTokens, setError } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Initial auth check - only runs once on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        
        if (!token) {
          // No token, mark as not authenticated
          setTokens(null);
          setIsCheckingAuth(false);
          return;
        }

        // We have a token, try to fetch user data
        try {
          await fetchAllUserData();
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If fetching user data fails, clear the token
          clearAuthData();
          setTokens(null);
          setError('Session expired. Please log in again.');
        }
      } catch (error: any) {
        console.error('Error checking auth status:', error);
        setTokens(null);
        setError('Session expired. Please log in again.');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
    // Remove isAuthenticated from dependencies to prevent loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Handle redirects based on auth state
  useEffect(() => {
    if (isCheckingAuth || isLoading) return;

    const isPublicRoute = publicRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    const isProtectedRoute = protectedRoutes.some(route =>
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Redirect to login if accessing protected route while not authenticated
    if (isProtectedRoute && !isAuthenticated) {
      const callbackUrl = pathname === '/' ? '' : `?callbackUrl=${encodeURIComponent(pathname)}`;
      router.push(`/auth/login${callbackUrl}`);
      return;
    }

    // Redirect to dashboard if authenticated and trying to access auth pages
    if (isAuthenticated && pathname.startsWith('/auth/')) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, pathname, router, isCheckingAuth]);

  // Show loading state while checking auth status
  if (isLoading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}