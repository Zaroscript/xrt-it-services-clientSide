"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/lib/hooks";
import { updateUserProfile } from "@/features/auth/authSlice";
import { UpdateProfilePayload } from "@/features/auth/types";
import { toast } from "sonner";

const businessInfoSchema = z.object({
  businessAddress: z.string().min(5, { message: "Business address is required" }),
  businessCity: z.string().min(2, { message: "City is required" }),
  businessState: z.string().min(2, { message: "State is required" }),
  businessZipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code" }),
  businessCountry: z.string().min(2, { message: "Country is required" }),
  hasExistingWebsite: z.boolean(),
  websiteUrl: z.string().url().or(z.literal('')).optional(),
}).refine(data => {
  if (data.hasExistingWebsite) {
    return data.websiteUrl && data.websiteUrl.length > 0;
  }
  return true;
}, {
  message: "Website URL is required when 'I have an existing website' is checked",
  path: ["websiteUrl"],
});

type BusinessInfoFormValues = {
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZipCode: string;
  businessCountry: string;
  hasExistingWebsite: boolean;
  websiteUrl?: string;
};

export default function CompleteProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BusinessInfoFormValues>({
    resolver: zodResolver(businessInfoSchema) as any, // Type assertion to handle the resolver type
    defaultValues: {
      businessAddress: "",
      businessCity: "",
      businessState: "",
      businessZipCode: "",
      businessCountry: "",
      hasExistingWebsite: false,
      websiteUrl: "",
    },
  });

  const hasExistingWebsite = watch("hasExistingWebsite");

  const onSubmit = async (data: BusinessInfoFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Prepare the profile update data
      const profileData: UpdateProfilePayload = {
        businessAddress: data.businessAddress,
        businessCity: data.businessCity,
        businessState: data.businessState,
        businessZipCode: data.businessZipCode,
        businessCountry: data.businessCountry,
        hasExistingWebsite: data.hasExistingWebsite,
        websiteUrl: data.hasExistingWebsite ? data.websiteUrl : undefined,
        requiresBusinessInfo: false, // Mark profile as complete
      };

      const result = await dispatch(updateUserProfile(profileData));

      if (updateUserProfile.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Business Profile</CardTitle>
          <CardDescription>
            Please provide your business details to get the most out of our services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  {...register("businessAddress")}
                  placeholder="123 Business St"
                />
                {errors.businessAddress && (
                  <p className="text-sm text-red-500">
                    {errors.businessAddress.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessCity">City</Label>
                <Input
                  id="businessCity"
                  {...register("businessCity")}
                  placeholder="New York"
                />
                {errors.businessCity && (
                  <p className="text-sm text-red-500">
                    {errors.businessCity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessState">State/Province</Label>
                <Input
                  id="businessState"
                  {...register("businessState")}
                  placeholder="NY"
                />
                {errors.businessState && (
                  <p className="text-sm text-red-500">
                    {errors.businessState.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessZipCode">ZIP/Postal Code</Label>
                <Input
                  id="businessZipCode"
                  {...register("businessZipCode")}
                  placeholder="10001"
                />
                {errors.businessZipCode && (
                  <p className="text-sm text-red-500">
                    {errors.businessZipCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessCountry">Country</Label>
                <Input
                  id="businessCountry"
                  {...register("businessCountry")}
                  placeholder="United States"
                />
                {errors.businessCountry && (
                  <p className="text-sm text-red-500">
                    {errors.businessCountry.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasExistingWebsite"
                  {...register("hasExistingWebsite")}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="hasExistingWebsite">
                  I have an existing website
                </Label>
              </div>

              {hasExistingWebsite && (
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    {...register("websiteUrl")}
                    placeholder="https://yourbusiness.com"
                  />
                  {errors.websiteUrl && (
                    <p className="text-sm text-red-500">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Business Information"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
