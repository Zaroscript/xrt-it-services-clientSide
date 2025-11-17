'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ShieldAlert, Mail, Clock, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/store/useAuthStore';

export default function PendingApprovalPage() {
  const { user, logout, isLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string>('');

  // Get email from user or session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('pendingApprovalEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
        // Clear the stored email after using it
        sessionStorage.removeItem('pendingApprovalEmail');
      } else if (user?.email) {
        setUserEmail(user.email);
      }
    }
  }, [user]);

  // Handle redirection based on authentication status
  useEffect(() => {
    // Only run this effect once when the component mounts
    const checkAuthStatus = () => {
      if (!user) {
        // If we have an email in the URL, redirect to login with the email pre-filled
        const email = searchParams.get('email') || userEmail;
        if (email) {
          router.replace(`/auth/login?email=${encodeURIComponent(email)}`);
        } else {
          router.replace('/auth/login');
        }
      } else if (user?.isApproved) {
        // If user is already approved, redirect to dashboard
        router.replace('/dashboard');
      }
    };

    // Add a small delay to prevent flash of content
    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, [user, router, searchParams, userEmail]);

  // Show loading state until we determine the authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }


  const handleSignOut = async () => {
    await logout();
    router.push('/auth/login');
  };

  // If we get here, the user is authenticated but not approved
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <ShieldAlert className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Account Pending Approval</CardTitle>
            <CardDescription className="text-muted-foreground">
              Thank you for registering with XRT Tech. Your account is currently under review.
            </CardDescription>
          </div>
        </CardHeader>
        
        {userEmail && (
          <CardContent className="bg-yellow-50 dark:bg-yellow-900/10 mx-4 rounded-lg p-4 flex items-start space-x-3">
            <Mail className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Registration email: <span className="font-semibold">{userEmail}</span>
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                We'll send an email to this address once your account is approved.
              </p>
            </div>
          </CardContent>
        )}
        
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">What's happening now?</h4>
              <p className="text-sm text-muted-foreground">
                Our team is reviewing your registration details. This process typically takes 24-48 hours.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 pt-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Need help?</h4>
              <p className="text-sm text-muted-foreground">
                If you have any questions, please contact our support team at{' '}
                <a href="mailto:support@xrt-tech.com" className="text-primary hover:underline">
                  support@xrt-tech.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            We'll notify you via email once your account has been approved. This usually takes 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            If you have any questions, please contact our support team at support@xrttech.com
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            Sign Out
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Need to update your information? Please contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
