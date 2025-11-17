'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, refreshToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Try to refresh token on mount if we have a user but no access token
    const initializeAuth = async () => {
      if (isAuthenticated && user) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          router.push('/login');
        }
      }
    };

    initializeAuth();
  }, [isAuthenticated, user, refreshToken, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}