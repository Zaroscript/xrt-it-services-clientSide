"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Mail, Clock, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PendingApprovalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string>("");

  // Get email from URL parameter or session storage
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setUserEmail(emailParam);
    } else if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("registrationEmail");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-10">
      <Card className="w-full max-w-2xl border-2 shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-8">
          {/* Success Icon with Gradient */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
            <CheckCircle className="h-12 w-12 text-white" strokeWidth={2.5} />
          </div>

          {/* Title and Description */}
          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Thank you for registering with XRT Tech. Your account is currently
              pending approval.
            </CardDescription>
          </div>
        </CardHeader>

        {/* Email Display Card */}
        {userEmail && (
          <CardContent className="px-6 pb-6">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-5 border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">
                    Registration Email
                  </p>
                  <p className="text-sm font-medium text- primary">
                    {userEmail}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you an email notification once your account is
                    approved.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}

        {/* What's Next Section */}
        <CardContent className="space-y-6 px-6 pb-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">
                  What happens next?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our team will review your registration within the next{" "}
                  <span className="font-medium text-foreground">
                    24-48 hours
                  </span>
                  . Once approved, you'll receive an email with instructions to
                  access your account.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">
                  Check your inbox
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Make sure to check your spam folder. If you have any
                  questions, contact us at{" "}
                  <a
                    href="mailto:support@xrt-tech.com"
                    className="text-primary hover:underline font-medium"
                  >
                    support@xrt-tech.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <Button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-semibold h-12 text-base group"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Need to update your information? Contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
