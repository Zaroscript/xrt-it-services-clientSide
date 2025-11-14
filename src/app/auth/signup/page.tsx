"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/ui/AuthLayout";
import { AuthCard } from "@/components/ui/AuthCard";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, Check, X } from "lucide-react";
import { useSignup, steps, formSchema } from "@/hooks/useSignup";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const {
    form,
    currentStep,
    showPassword,
    showConfirmPassword,
    formError,
    isSubmitting,
    hasExistingWebsite,
    passwordChecks,
    errors,
    isValid,
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    nextStep,
    prevStep,
    setShowPassword,
    setShowConfirmPassword,
  } = useSignup();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="First Name"
                  id="firstName"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  id="lastName"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div>
              <Input
                label="Email"
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                autoComplete="email"
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
                autoComplete="tel"
                placeholder="(123) 456-7890"
              />
            </div>

            
          </div>
        );

      case 1: // Business & Website Information
        return (
          <div className="space-y-4">
            <div>
              <Input
                label="Business Name"
                id="businessName"
                {...register('businessName')}
                error={errors.businessName?.message}
                autoComplete="organization"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasExistingWebsite"
                checked={hasExistingWebsite}
                onCheckedChange={(checked) => {
                  setValue('hasExistingWebsite', !!checked);
                  clearErrors('websiteUrl');
                }}
              />
              <Label htmlFor="hasExistingWebsite">I have an existing website</Label>
            </div>

            {hasExistingWebsite && (
              <div>
                <Input
                  label="Website URL"
                  id="websiteUrl"
                  type="url"
                  {...register('websiteUrl')}
                  error={errors.websiteUrl?.message}
                  placeholder="https://example.com"
                />
              </div>
            )}
          </div>
        );

      case 2: // Account Security
        return (
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="rounded-md bg-muted/50 p-4 text-sm">
              <p className="font-medium text-foreground mb-2">Password must contain:</p>
              <ul className="space-y-2">
                <li className={cn("flex items-center gap-2", passwordChecks.hasUppercase ? "text-green-500" : "text-muted-foreground")}>
                  {passwordChecks.hasUppercase ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>At least one uppercase letter (A-Z)</span>
                </li>
                <li className={cn("flex items-center gap-2", passwordChecks.hasLowercase ? "text-green-500" : "text-muted-foreground")}>
                  {passwordChecks.hasLowercase ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>At least one lowercase letter (a-z)</span>
                </li>
                <li className={cn("flex items-center gap-2", passwordChecks.hasNumber ? "text-green-500" : "text-muted-foreground")}>
                  {passwordChecks.hasNumber ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>At least one number (0-9)</span>
                </li>
                <li className={cn("flex items-center gap-2", passwordChecks.hasMinLength ? "text-green-500" : "text-muted-foreground")}>
                  {passwordChecks.hasMinLength ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>At least 8 characters</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep < steps.length - 1) {
            nextStep();
          } else {
            handleSubmit(e);
          }
        }}
        submitText={currentStep < steps.length - 1 ? 'Next' : 'Create Account'}
        isLoading={isSubmitting}
        loadingText="Creating account..."
        footerText="Already have an account?"
        footerLink="/auth/login"
        footerLinkText="Sign in"
      >
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                    currentStep >= index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                    currentStep === index && 'ring-2 ring-primary ring-offset-2'
                  )}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs text-center text-muted-foreground">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {renderStepContent()}
            
            {formError && (
              <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                {formError}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className={cn(currentStep === 0 ? 'invisible' : '')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="w-24">
              {/* Empty div to maintain flex spacing */}
            </div>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}