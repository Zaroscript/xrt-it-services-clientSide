// src/components/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { Loader } from '@/components/ui/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const {
    isAuthenticated,
    tokens,
    isLoading,
    user,
  } = useAuthStore();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If we already know user is authenticated with access token -> done
      if (tokens?.accessToken && isAuthenticated) {
        setChecking(false);
        return;
      }

      // If we have a refresh token but no access token -> try refresh
      if (!tokens?.accessToken) {
        router.replace('/auth/login');
        return;
      }

      // No tokens -> force login
      if (!tokens?.accessToken && !isAuthenticated) {
        router.replace('/auth/login');
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [tokens?.accessToken, isAuthenticated, router]);

  if (isLoading || checking) {
    return <Loader />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}
