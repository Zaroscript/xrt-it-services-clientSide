"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/ui/AuthLayout";
import { AuthCard } from "@/components/ui/AuthCard";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Globe, 
  CheckCircle2,
  AlertCircle,
  Lock
} from "lucide-react";
import { toast } from "sonner";

// Form Types
type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  password: string;
  confirmPassword: string;
  hasExistingWebsite: boolean;
  websiteUrl: string;
};

// Password validation schema
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Must contain at least one number" });

// Base form schema
const baseSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number"
  }),
  businessName: z.string().min(2, {
    message: "Business name is required"
  }),
  hasExistingWebsite: z.boolean().default(false),
  websiteUrl: z.string().url({
    message: "Please enter a valid URL"
  }).optional().or(z.literal('')),
  password: passwordSchema,
  confirmPassword: z.string()
});

// Full form schema with custom validation
const formSchema = baseSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });
  }
  
  if (data.hasExistingWebsite && !data.websiteUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Website URL is required when 'I have an existing website' is checked",
      path: ["websiteUrl"]
    });
  }
});

type FormData = z.infer<typeof formSchema>;


const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us a bit about yourself'
  },
  {
    id: 'business',
    title: 'Business Information',
    description: 'Tell us about your business'
  },
  {
    id: 'security',
    title: 'Account Security',
    description: 'Create a secure password'
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Initialize form with proper types
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any), // Temporary type assertion
    mode: 'onChange',
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      businessName: "",
      password: "",
      confirmPassword: "",
      hasExistingWebsite: false,
      websiteUrl: ""
    }
  });
  
  const { register, handleSubmit, watch, trigger, formState: { errors }, control } = form;

  const hasExistingWebsite = watch('hasExistingWebsite');
  const nextStep = async () => {
    const fields = steps[currentStep].id === 'personal' 
      ? ['fullName', 'email'] 
      : steps[currentStep].id === 'business' 
        ? ['businessName', 'phoneNumber', 'hasExistingWebsite', 'websiteUrl']
        : ['password', 'confirmPassword'];
    
    const output = await trigger(fields as any);
    
    if (output) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      return true;
    }
    return false;
  };

  const prevStep = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      // If not the last step, go to next step
      if (currentStep < steps.length - 1) {
        const isValid = await nextStep();
        if (!isValid) return;
      } else {
        // Handle final form submission
        console.log('Form submitted:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success('Account created successfully!', {
          description: 'Welcome to our platform!',
        });
        
        // Reset form and redirect to login
        form.reset();
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create account', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onError = (errors: Record<string, { message?: string }>) => {
    console.error('Form errors:', errors);
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error('Validation Error', {
        description: firstError.message,
        duration: 3000,
      });
    }
  };

  const passwordRequirements = [
    { id: 'length', text: 'At least 8 characters', validate: (val: string) => val.length >= 8 },
    { id: 'lowercase', text: 'At least one lowercase letter', validate: (val: string) => /[a-z]/.test(val) },
    { id: 'uppercase', text: 'At least one uppercase letter', validate: (val: string) => /[A-Z]/.test(val) },
    { id: 'number', text: 'At least one number', validate: (val: string) => /\d/.test(val) }
  ];

  const renderFormStep = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="fullName" className="mb-2 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className={cn(
                    "pl-10 w-full dark:placeholder:text-white",
                    errors.fullName && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('fullName')}
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.fullName && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.fullName.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn(
                    "pl-10 w-full dark:placeholder:text-white",
                    errors.email && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('email')}
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </motion.div>
        );
        
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="businessName" className="mb-2 block">
                Business Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Acme Inc."
                  className={cn(
                    "pl-10 w-full dark:placeholder:text-white",
                    errors.businessName && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('businessName')}
                />
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.businessName && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.businessName.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phoneNumber" className="mb-2 block">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className={cn(
                    "pl-10 w-full dark:placeholder:text-white",
                    errors.phoneNumber && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('phoneNumber')}
                />
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <Controller
                  name="hasExistingWebsite"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="hasExistingWebsite" 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label 
                  htmlFor="hasExistingWebsite" 
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have an existing website
                </Label>
              </div>
              {hasExistingWebsite && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="mt-2">
                    <Label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                      Website URL <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://example.com"
                        className={cn(
                          "pl-10 w-full dark:placeholder:text-white",
                          errors.websiteUrl && "border-destructive focus-visible:ring-destructive"
                        )}
                        {...register('websiteUrl')}
                      />
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    {errors.websiteUrl && (
                      <p className="mt-1 flex items-center text-sm text-destructive">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        {errors.websiteUrl.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="password" className="mb-2 block">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={cn(
                    "w-full pr-10 pl-10 dark:placeholder:text-white",
                    errors.password && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Lock className="absolute  left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.password && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
              
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Password must contain:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {passwordRequirements.map((req) => {
                    const value = watch('password') || '';
                    const isValid = req.validate(value);
                    return (
                      <li key={req.id} className="flex items-center">
                        <CheckCircle2
                          className={cn(
                            "mr-2 h-4 w-4",
                            isValid ? "text-green-500" : "text-muted-foreground/30"
                          )}
                        />
                        <span className={!isValid ? "opacity-50" : ""}>
                          {req.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="mb-2 block">
                Confirm Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={cn(
                    "w-full pl-10 pr-10 dark:placeholder:text-white",
                    errors.confirmPassword && "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 flex items-center text-sm text-destructive">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Join us today and get started with your business"
      illustration={
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      }
    >
      <AuthCard
        title="Create an account"
        description="Join us today and get started with your business"
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
        submitText={currentStep === steps.length - 1 ? 'Create account' : 'Next'}
        loadingText={currentStep === steps.length - 1
          ? isLoading
            ? "Creating account..."
            : "Create account"
          : "Loading..."}
      >
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="space-y-2">
              <div className="flex justify-between mb-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentStep >= index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className="mt-2 text-xs text-center text-muted-foreground">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <div className="space-y-4">
              {renderFormStep()}
            </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div />
            )}
            <Button
              type={currentStep === steps.length - 1 ? "submit" : "button"}
              onClick={currentStep === steps.length - 1 ? undefined : nextStep}
              className={`bg-secondary hover:bg-secondary/90 text-secondary-foreground ${
                currentStep === 0 ? "ml-auto" : "flex-1"
              }`}
              disabled={isLoading}
            >
              {currentStep === steps.length - 1
                ? isLoading
                  ? "Creating account..."
                  : "Create account"
                : "Next"}
            </Button>
          </div>

          <p className="text-center text-sm text-primary dark:text-white">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
          </div>
        </AuthCard>
    </AuthLayout>
  );
}
