"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, WifiOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { register as registerUser, clearError } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
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
  Lock,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

// Form Types
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  password: string;
  confirmPassword: string;
  hasExistingWebsite?: boolean;
  websiteUrl?: string;
};

// Password validation schema
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Must contain at least one number" })
  .regex(/[@$!%*?&]/, { message: "Must contain at least one special character (@, $, !, %, *, ?, or &)" });

// Base form schema
const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phoneNumber: z.string()
    .min(10, {
      message: "Phone number must be at least 10 digits"
    })
    .regex(
      /^(\+?1[\s.-]?)?(\([0-9]{3}\)[\s.-]?|[0-9]{3}[\s.-]?)[0-9]{3}[\s.-]?[0-9]{4}$/,
      {
        message: "Please enter a valid US phone number (e.g., 123-456-7890 or (123) 456-7890)"
      }
    ),
  businessName: z.string().min(2, {
    message: "Business name is required"
  }),
  hasExistingWebsite: z.boolean().default(false),
  websiteUrl: z.string()
    .url({
      message: "Please enter a valid URL (e.g., https://yoursite.com)"
    })
    .refine(
      (val) => !val || val.startsWith('http://') || val.startsWith('https://'),
      { message: 'URL must start with http:// or https://' }
    )
    .optional()
    .or(z.literal('')),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us a bit about yourself',
    fields: ['firstName', 'lastName', 'email', 'phoneNumber']
  },
  {
    id: 'business',
    title: 'Business Information',
    description: 'Tell us about your business',
    fields: ['businessName', 'hasExistingWebsite', 'websiteUrl']
  },
  {
    id: 'security',
    title: 'Account Security',
    description: 'Create a secure password',
    fields: ['password', 'confirmPassword']
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    trigger,
    setValue,
    clearErrors,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      businessName: "",
      password: "",
      confirmPassword: "",
      hasExistingWebsite: false,
      websiteUrl: "",
    },
  });

  const hasExistingWebsite = watch('hasExistingWebsite', false);

  // Watch for changes to the hasExistingWebsite field
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'hasExistingWebsite') {
        // Clear website URL when unchecking
        if (!value.hasExistingWebsite) {
          setValue('websiteUrl', '');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Remove the automatic redirection to dashboard when authenticated
  // We'll handle the redirection manually after registration
  // This prevents the automatic redirection that was happening before
  
  // Get the current user from the Redux store
  const currentUser = useAppSelector(selectCurrentUser);

  // Only redirect to dashboard if the user is already approved
  useEffect(() => {
    if (isAuthenticated && currentUser?.isApproved) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, currentUser?.isApproved]);

  const nextStep = async () => {
    const fields = steps[currentStep].fields as (keyof FormData)[];
    const isValid = await trigger(fields);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Store registration data in session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pendingApprovalEmail', data.email);
      sessionStorage.setItem('registrationComplete', 'true');
    }
    
    try {
      setFormError(null);

      // Format phone number to match backend validation (XXX) XXX-XXXX
      const formatPhoneNumber = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone; // Return as is if format doesn't match
      };

      // Prepare registration data matching backend expectations
      const registrationData = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        fName: data.firstName.trim(),
        lName: data.lastName.trim(),
        phone: formatPhoneNumber(data.phoneNumber),
        businessName: data.businessName.trim(),
        requiresBusinessInfo: true
      };
      
      console.log('Registration data:', registrationData); // For debugging

      const result = await dispatch(registerUser(registrationData) as any);
      
      if (result.meta.requestStatus === 'fulfilled') {
        // Store registration data in session storage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingApprovalEmail', data.email);
          sessionStorage.setItem('registrationComplete', 'true');
        }

        // Show success toast
        toast.success('Registration Submitted', {
          description: 'Your account is pending admin approval. You will be notified via email once approved.',
          position: 'top-center',
          duration: 5000,
          className: 'bg-background border border-green-500 text-foreground',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
        });

        // Redirect to pending approval page with the email as a query parameter
        // Using replace instead of push to prevent back navigation to signup
        router.replace(`/auth/pending-approval?email=${encodeURIComponent(data.email)}`);
        return;
      }
      
      if (result.meta.requestStatus === 'rejected') {
        const error = result.error as any;
        const errorData = error.payload || {};
        
        // Log detailed error information
        console.error('Registration error:', {
          status: error.status,
          statusText: error.statusText,
          data: error.data,
          payload: error.payload,
          message: error.message,
          stack: error.stack
        });
        
        // Log the exact request being made
        console.log('Request details:', {
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
          method: 'POST',
          data: registrationData,
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
          }
        });
        
        // Handle different error types with appropriate UI feedback
        switch (errorData.code) {
          case 'VALIDATION_ERROR':
            // Handle validation errors (e.g., invalid email format)
            toast.error('Validation Error', {
              description: errorData.message || 'Please check your input and try again.',
              position: 'top-center',
              duration: 5000,
              className: 'bg-background border border-destructive text-foreground',
              icon: <AlertCircle className="h-5 w-5 text-destructive" />
            });
            break;
            
          case 'NETWORK_ERROR':
          case 'OfflineError':
            // Handle network-related errors
            toast.error('Connection Error', {
              description: errorData.message || 'Unable to connect to the server. Please check your internet connection.',
              position: 'top-center',
              duration: 5000,
              className: 'bg-background border border-destructive text-foreground',
              icon: <WifiOff className="h-5 w-5 text-destructive" />
            });
            break;
            
          case 'ApiError':
          case 'AuthError':
            // Handle API and authentication errors
            if (errorData.message?.toLowerCase().includes('already exists')) {
              toast.error('Email Already Registered', {
                description: 'An account with this email already exists. Please log in or use a different email.',
                position: 'top-center',
                duration: 5000,
                className: 'bg-background border border-destructive text-foreground',
                icon: <AlertCircle className="h-5 w-5 text-destructive" />,
                action: {
                  label: 'Go to Login',
                  onClick: () => router.push('/auth/login')
                }
              });
            } else {
              toast.error('Registration Failed', {
                description: errorData.message || 'An error occurred during registration. Please try again.',
                position: 'top-center',
                className: 'bg-background border border-destructive text-foreground',
                icon: <AlertCircle className="h-5 w-5 text-destructive" />
              });
            }
            break;
            
          default:
            // Handle all other errors
            toast.error('Something Went Wrong', {
              description: 'An unexpected error occurred. Please try again later.',
              position: 'top-center',
              duration: 5000,
              className: 'bg-background border border-destructive text-foreground',
              icon: <AlertTriangle className="h-5 w-5 text-destructive" />
            });
        }
        
        // If there are validation errors, set them in the form state
        if (errorData.validationErrors) {
          Object.entries(errorData.validationErrors).forEach(([field, messages]) => {
            setError(field as any, {
              type: 'manual',
              message: Array.isArray(messages) ? messages[0] : String(messages)
            });
          });
        } else {
          setFormError(errorData.message || 'An error occurred');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Handle successful registration - redirect to login with success message
        router.push('/auth/login?registered=true');
      }
    } catch (error: any) {
      setFormError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={false}
                />
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="(123) 456-7890"
                  {...register('phoneNumber')}
                  className={errors.phoneNumber ? 'border-destructive' : ''}
                />
                <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
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
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <div className="relative">
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your Business Name"
                  {...register('businessName')}
                  className={errors.businessName ? 'border-destructive' : ''}
                />
                <Briefcase className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.businessName && (
                <p className="text-sm text-destructive">{errors.businessName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasExistingWebsite"
                  checked={hasExistingWebsite}
                  onCheckedChange={(checked) => {
                    setValue('hasExistingWebsite', !!checked);
                  }}
                />
                <Label htmlFor="hasExistingWebsite">
                  I have an existing website
                </Label>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: hasExistingWebsite ? 'auto' : 0,
                  opacity: hasExistingWebsite ? 1 : 0,
                  marginTop: hasExistingWebsite ? '0.5rem' : 0,
                  overflow: 'hidden'
                }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <div className="relative">
                    <Input
                      id="websiteUrl"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      {...register('websiteUrl', {
                        required: hasExistingWebsite ? 'Website URL is required' : false,
                      })}
                      className={`${errors.websiteUrl ? 'border-destructive' : ''} pr-10`}
                    />
                    <Globe className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.websiteUrl && (
                    <p className="text-sm text-destructive">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Example: https://yourbusiness.com
                  </p>
                </div>
              </motion.div>
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
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register('password')}
                  className={errors.password ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Password must contain:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  {watch('password')?.length >= 8 ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  {/(?=.*[A-Z])/.test(watch('password') || '') ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  {/(?=.*[a-z])/.test(watch('password') || '') ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  At least one lowercase letter
                </li>
                <li className="flex items-center">
                  {/(?=.*\d)/.test(watch('password') || '') ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  At least one number
                </li>
                <li className="flex items-center">
                  {/[@$!%*?&]/.test(watch('password') || '') ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  At least one special character (@$!%*?&)
                </li>
              </ul>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
      <AuthLayout
        title={'Create an account'}
        description={'Join us today and get started with your business'}
        illustration={
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        }
      >
        {formError && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
            {formError}
          </div>
        )}

        <AuthCard
          title="Create an account"
          description="Join us today and get started with your business"
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          submitText={currentStep === steps.length - 1 ? 'Create Account' : 'Continue'}
        >
          {/* Step indicator */}
          <div className="flex items-center justify-between w-full mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs font-medium text-muted-foreground">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="space-y-4">
            {renderFormStep()}
          </div>

          {/* Google Sign In Button Removed */}

          {/* Navigation Buttons */}
          <div className={`flex items-center ${currentStep === 0 ? 'justify-center' : 'justify-between'} pt-6`}>
            {currentStep > 0 && (
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
            
            <Button
              type={currentStep === steps.length - 1 ? "submit" : "button"}
              onClick={currentStep < steps.length - 1 ? nextStep : undefined}
              className={`${currentStep === 0 ? 'w-full' : 'flex-1'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : currentStep === steps.length - 1 ? (
                'Create Account'
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </AuthCard>
      </AuthLayout>
  );
}