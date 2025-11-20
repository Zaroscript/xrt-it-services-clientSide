'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Loader } from './ui/Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // If we're still loading auth state, do nothing
    if (isLoading) return;

    // If not authenticated, redirect to login with callback URL
    if (!isAuthenticated) {
      // Create a callback URL that includes any query parameters
      const callbackUrl = searchParams.toString() 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      // Only redirect to login if we're not already on the login page
      if (!pathname.startsWith('/auth/login')) {
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }
      setIsCheckingAuth(false);
      return;
    }

    // If we have a user and we're authenticated, we're good to go
    if (user) {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, isLoading, user, router, pathname, searchParams]);

  // Show loading state while checking authentication
  if (isLoading || isCheckingAuth) {
    return (
      <Loader />
    );
  }

  // Only render children if authenticated and user data is available
  return isAuthenticated && user ? <>{children}</> : null;
}
