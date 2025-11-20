// src/components/providers/AuthProvider.tsx

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { Loader } from '../ui/Loader';

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // If we have a token, try to fetch user data
          try {
            await fetchAllUserData();
          } catch (error) {
            console.error('Error fetching user data:', error);
            // If fetching user data fails, clear the token and mark as not authenticated
            localStorage.removeItem('accessToken');
            setTokens(null);
            setError('Session expired. Please log in again.');
            
            // Only redirect if not already on a public route
            const isPublicRoute = publicRoutes.some(route => 
              pathname === route || pathname.startsWith(`${route}/`)
            );
            
            if (!isPublicRoute && !pathname.startsWith('/auth/')) {
              const callbackUrl = pathname === '/' ? '' : `?callbackUrl=${encodeURIComponent(pathname)}`;
              router.push(`/auth/login${callbackUrl}`);
            }
          }
        } else {
          // No token, ensure we're not marked as authenticated
          setTokens(null);
          
          // Only redirect if not already on a public route
          const isPublicRoute = publicRoutes.some(route => 
            pathname === route || pathname.startsWith(`${route}/`)
          );
          
          if (!isPublicRoute && !pathname.startsWith('/auth/')) {
            const callbackUrl = pathname === '/' ? '' : `?callbackUrl=${encodeURIComponent(pathname)}`;
            router.push(`/auth/login${callbackUrl}`);
          }
        }
      } catch (error: any) {
        console.error('Error checking auth status:', error);
        // If there's an auth error, clear the auth state
        if (error?.name === 'AuthError') {
          // Clear auth state on auth error
          setTokens(null);
          setError('Session expired. Please log in again.');
          
          // Only redirect if not already on a public route
          const isPublicRoute = publicRoutes.some(route => 
            pathname === route || pathname.startsWith(`${route}/`)
          );
          
          if (!isPublicRoute) {
            // Preserve the current URL for redirect after login
            const callbackUrl = pathname === '/' ? '' : `?callbackUrl=${encodeURIComponent(pathname)}`;
            router.push(`/auth/login${callbackUrl}`);
          }
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, fetchAllUserData, pathname, router]);

  useEffect(() => {
    if (isCheckingAuth || isLoading) return;

    const isPublicRoute = publicRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    const isProtectedRoute = protectedRoutes.some(route =>
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Only check authentication for protected routes
    if (isProtectedRoute && !isAuthenticated) {
      // If trying to access a protected route and not authenticated, redirect to login
      const callbackUrl = pathname === '/' ? '' : `?callbackUrl=${encodeURIComponent(pathname)}`;
      router.push(`/auth/login${callbackUrl}`);
      return;
    }

    // If authenticated and trying to access auth pages, redirect to dashboard
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