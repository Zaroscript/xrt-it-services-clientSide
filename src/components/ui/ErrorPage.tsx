'use client';

import { Button } from './button';
import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const errorCode = error.statusCode || 500;
  const errorMessage = getErrorMessage(errorCode);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 text-destructive mx-auto">
              <AlertTriangle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {errorCode}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {errorMessage.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {errorMessage.description}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-4">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button 
                onClick={reset}
                className="gap-2 px-6 py-6 text-base font-medium transition-all duration-300 hover:shadow-lg"
                variant="default"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="gap-2 px-6 py-6 text-base font-medium transition-all duration-300 hover:shadow"
              >
                <Link href="/">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getErrorMessage(statusCode: number) {
  switch (statusCode) {
    case 400:
      return {
        title: 'Bad Request',
        description: 'The server could not understand the request.'
      };
    case 401:
      return {
        title: 'Unauthorized',
        description: 'You need to be authenticated to access this page.'
      };
    case 403:
      return {
        title: 'Access Denied',
        description: 'You do not have permission to view this page.'
      };
    case 404:
      return {
        title: 'Page Not Found',
        description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
      };
    case 500:
    default:
      return {
        title: 'Something Went Wrong',
        description: 'We encountered an unexpected error. Our team has been notified and we are working on a fix.'
      };
  }
}
