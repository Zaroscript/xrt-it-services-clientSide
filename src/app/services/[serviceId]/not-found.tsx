import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Service Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The service you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/services" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </Button>
      </div>
    </div>
  );
}
