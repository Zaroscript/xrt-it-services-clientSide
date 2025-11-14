// src/hooks/useSignup.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/useAuthStore";

export const formSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    businessName: z.string().min(2, "Business name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    hasExistingWebsite: z.boolean().optional(),
    websiteUrl: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      !data.hasExistingWebsite ||
      (data.websiteUrl && data.websiteUrl.length > 0),
    {
      message:
        "Website URL is required when 'I have an existing website' is checked",
      path: ["websiteUrl"],
    }
  );

export type FormValues = z.infer<typeof formSchema>;

export const steps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
    fields: ["firstName", "lastName", "email", "phoneNumber"],
  },
  {
    id: "website",
    title: "Business & Website",
    description: "Tell us about your business and website",
    fields: ["businessName", "hasExistingWebsite", "websiteUrl"],
  },
  {
    id: "security",
    title: "Account Security",
    description: "Create a secure password",
    fields: ["password", "confirmPassword"],
  },
];

export const useSignup = () => {
  const router = useRouter();
  const {
    register: registerUser,
    error: authError,
    setError: setAuthError,
  } = useAuthStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    trigger,
    setValue,
    clearErrors,
  } = form;

  const hasExistingWebsite = watch("hasExistingWebsite", false);
  const password = watch("password", "");

  // Check password requirements
  const passwordChecks = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "hasExistingWebsite") {
        if (!value.hasExistingWebsite) {
          setValue("websiteUrl", "");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    setAuthError(null);
    setFormError(null);
  }, [setAuthError]);

  const nextStep = async () => {
    const fields = steps[currentStep].fields as (keyof FormValues)[];
    const isValid = await trigger(fields);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("1") && cleaned.length === 11) {
      return `+${cleaned[0]} (${cleaned.substring(1, 4)}) ${cleaned.substring(
        4,
        7
      )}-${cleaned.substring(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
        3,
        6
      )}-${cleaned.substring(6)}`;
    }
    return phone;
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormError(null);
    setAuthError(null);

    try {
      console.log("Attempting to register user with data:", {
        email: data.email,
        fName: data.firstName,
        lName: data.lastName,
        phone: data.phoneNumber,
        companyName: data.businessName,
        hasWebsite: data.hasExistingWebsite,
        websiteUrl: data.websiteUrl,
      });

      const result = await registerUser({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        fName: data.firstName.trim(),
        lName: data.lastName.trim(),
        phone: formatPhoneNumber(data.phoneNumber),
        companyName: data.businessName.trim(),
        oldWebsite: data.websiteUrl?.trim() || "",
      });

      if (!result?.success) {
        throw new Error(result?.message || "Registration failed");
      }

      console.log("Registration successful, redirecting to approval page");
      sessionStorage.setItem("registrationComplete", "true");

      toast.success("Registration Submitted", {
        description:
          "Your account is pending admin approval. You will be notified via email once approved.",
        position: "bottom-right",
        duration: 5000,
        className: "group bg-background border-l-4 right-4 border-green-500 text-foreground shadow-lg",
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        closeButton: true,
        style: {
          animation: 'slideInRight 0.3s ease-out',
          zIndex: 9999,
        },
      });

      router.push(
        `/auth/pending-approval?email=${encodeURIComponent(data.email)}`
      );
    } catch (error: any) {
      console.error("Registration error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred. Please try again.";

      setFormError(errorMessage);
      setAuthError(errorMessage);

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });

      toast.error("Registration Failed", {
        description: errorMessage,
        position: "bottom-right",
        className: "group bg-background border-l-4 right-4 border-destructive text-foreground shadow-lg",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
        closeButton: true,
        duration: 10000, // Show for 10 seconds to ensure user sees it
        style: {
          animation: 'slideInRight 0.3s ease-out',
          zIndex: 9999,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form state
    form,
    currentStep,
    showPassword,
    showConfirmPassword,
    formError,
    isSubmitting,
    hasExistingWebsite,
    passwordChecks,
    isPasswordValid,
    errors,
    isValid,

    // Form methods
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    setValue,
    clearErrors,

    // Actions
    nextStep,
    prevStep,
    setShowPassword,
    setShowConfirmPassword,
  };
};
