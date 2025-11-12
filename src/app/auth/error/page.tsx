import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-muted-foreground">
            An error occurred during authentication. Please try again.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/auth/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
