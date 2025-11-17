'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super-admin' | 'admin' | 'client' | 'subscriber';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  fallback = <div className="flex items-center justify-center min-h-screen">Access Denied</div>
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    // Check role if required
    if (requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }

    setIsChecking(false);
  }, [user, isAuthenticated, isLoading, router, requiredRole]);

  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
