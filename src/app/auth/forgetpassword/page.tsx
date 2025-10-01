'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { AuthCard } from '@/components/ui/AuthCard';

export default function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      description="We'll help you get back into your account safely"
      illustration={null}
    >
      <AuthCard
        title="Reset Password"
        description={emailSent
          ? "We've sent you an email with password reset instructions"
          : "Enter your email address and we'll send you a link to reset your password"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Send Reset Instructions"
        loadingText="Sending instructions..."
        footerText="Remember your password?"
        footerLink="/auth/login"
        footerLinkText="Sign in"
        showGoogleButton={false}
      >
        {!emailSent ? (
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Try another email
            </Button>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
}