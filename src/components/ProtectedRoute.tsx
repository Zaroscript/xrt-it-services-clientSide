'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useAuthStore from '@/store/useAuthStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && !isAuthenticated)) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
    } else if (status === 'authenticated' && isAuthenticated) {
      setIsCheckingAuth(false);
    }
  }, [status, isAuthenticated, router]);

  // Show loading state while checking auth status
  if (status === 'loading' || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
