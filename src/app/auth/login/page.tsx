'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { AuthCard } from '@/components/ui/AuthCard';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { toast } from '@/components/ui/custom-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

// Form schema with validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const errorParam = searchParams.get('error');
  const emailParam = searchParams.get('email');
  
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Initialize form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailParam || '',
      password: '',
    },
  });

  // Set email from URL param if it exists
  useEffect(() => {
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [emailParam, setValue]);

  // Show error message if there was an authentication error
  useEffect(() => {
    if (errorParam && typeof window !== 'undefined') {
      let errorMessage = 'Authentication failed';
      let toastVariant: 'error' | 'info' | 'warning' = 'error';
      
      switch(errorParam) {
        case 'CredentialsSignin':
          errorMessage = 'Invalid email or password';
          toastVariant = 'error';
          break;
        case 'pending_approval':
          errorMessage = 'Your account is pending approval';
          toastVariant = 'info';
          break;
        case 'too_many_attempts':
          errorMessage = 'Too many login attempts. Please try again later.';
          toastVariant = 'warning';
          break;
        default:
          if (errorParam.toLowerCase().includes('too many')) {
            errorMessage = 'Too many login attempts. Please try again later.';
            toastVariant = 'warning';
          }
      }
      
      // Show appropriate toast based on error type
      toast(errorMessage, {
        type: toastVariant,
        duration: 5000,
        position: 'top-center',
        action: {
          label: 'Dismiss',
          onClick: () => {}
        }
      });
      
      // Clear the error from URL to prevent showing it again on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url);
    }
  }, [errorParam]);

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Signing in...');

    try {
      // Clear any existing error messages and email from URL
      const url = new URL(window.location.href);
      if (errorParam) url.searchParams.delete('error');
      if (emailParam) url.searchParams.delete('email');
      window.history.replaceState({}, '', url);
      
      // Attempt to sign in using custom auth
      await login(data.email, data.password);

      // If no error, the login was successful
      toast.dismiss(toastId);
      toast.success('Login successful!');
      
      // Redirect to the callback URL or profile
      const redirectUrl = callbackUrl || '/profile';
      router.push(redirectUrl);
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.dismiss(toastId);
      
      // Handle specific error cases
      if (error?.message?.toLowerCase().includes('network') || 
          error?.message?.toLowerCase().includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else if (error?.message?.toLowerCase().includes('pending approval')) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingApprovalEmail', data.email);
        }
        return router.push('/auth/pending-approval');
      } else if (error?.message?.toLowerCase().includes('too many') || 
                 error?.message?.toLowerCase().includes('rate limit')) {
        toast.error('Too many login attempts. Please try again in 15 minutes.');
      } else {
        toast.error(error?.message || 'Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome to XRT Tech"
      description="Your trusted partner in IT services and solutions"
      illustration={
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20" />
      }
    >
      <AuthCard
        title="Welcome back"
        description="Enter your credentials to access your account"
        footerText="Don't have an account?"
        footerLink="/auth/signup"
        footerLinkText="Sign up"
        isLoading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        submitText={
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </>
        }
        loadingText="Signing in..."
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              className={`flex h-10 w-full rounded-md border ${
                errors.email ? 'border-red-500' : 'border-input'
              } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isSubmitting}
              className={`flex h-10 w-full rounded-md border ${
                errors.password ? 'border-red-500' : 'border-input'
              } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}