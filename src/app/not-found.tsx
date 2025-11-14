import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, WifiOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto text-center">
        <div
          className="relative
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
          before:from-primary/10 before:to-transparent before:opacity-20 before:blur-3xl
          before:animate-pulse before:duration-1000"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-destructive/10 text-destructive">
              <WifiOff className="w-12 h-12" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              404
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gap-2 px-6 py-6 text-base group">
                <Link
                  href="/"
                  className="transition-all duration-300 group-hover:gap-3"
                >
                  <Home className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-border/20">
              <p className="text-muted-foreground text-sm">
                Still can't find what you're looking for?{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:underline underline-offset-4 font-medium"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  );
}
