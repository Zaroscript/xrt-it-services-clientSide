// src/app/profile/ProfileContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  useAuthStore  from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export default function ProfileContent() {
  const {
    user,
    clientProfile,
    updateClientProfile,
    isLoading: authLoading,
    isAuthenticated,
    fetchClientProfile,
    fetchAllUserData,
  } = useAuthStore();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  // Initial data load
  useEffect(() => {
    const init = async () => {
      if (!authLoading && !isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (!authLoading && isAuthenticated && user) {
        setIsFetchingData(true);
        try {
          await fetchAllUserData();
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsFetchingData(false);
        }

        setFormData({
          name: user.fName
            ? `${user.fName} ${user.lName || ''}`.trim()
            : '',
          email: user.email || '',
          phone: user.phone || '',
          company: clientProfile?.companyName || user.companyName || '',
        });

        setIsLoading(false);
      }
    };

    init();
  }, [
    authLoading,
    isAuthenticated,
    user,
    clientProfile,
    router,
    fetchAllUserData,
  ]);

  // Ensure client profile is fetched for client users
  useEffect(() => {
    if (isAuthenticated && user && user.role === 'client' && !clientProfile) {
      fetchClientProfile();
    }
  }, [isAuthenticated, user, clientProfile, fetchClientProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        formData.company !==
        (clientProfile?.companyName || user?.companyName || '')
      ) {
        await updateClientProfile({
          companyName: formData.company,
        });
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (isLoading || authLoading || isFetchingData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unable to load user profile. Please try again later.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button form="profile-form" type="submit">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Settings
          </TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" disabled>
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" disabled>
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account&apos;s profile information and email
                address.
              </CardDescription>
            </CardHeader>
            <form id="profile-form" onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" alt={user.fName || 'User'} />
                    <AvatarFallback>
                      {user.fName?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline">
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, GIF or PNG. Max size of 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    ) : (
                      <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                        {formData.name || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                      {user.email}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email addresses cannot be changed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    ) : (
                      <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                        {formData.phone || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    ) : (
                      <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                        {formData.company || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Your business details and service information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                    {clientProfile?.companyName ||
                      formData.company ||
                      'Not provided'}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                    {clientProfile?.taxId || 'Not provided'}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                    {clientProfile?.businessLocation ? (
                      <div>
                        <div>
                          {clientProfile.businessLocation.address ||
                            'No street address'}
                        </div>
                        <div>
                          {clientProfile.businessLocation.city &&
                            clientProfile.businessLocation.state &&
                            `${clientProfile.businessLocation.city}, ${clientProfile.businessLocation.state}`}
                          {clientProfile.businessLocation.zipCode &&
                            ` ${clientProfile.businessLocation.zipCode}`}
                        </div>
                        <div>
                          {clientProfile.businessLocation.country || 'USA'}
                        </div>
                      </div>
                    ) : (
                      'Not provided'
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Website</Label>
                  <div className="text-sm py-2 px-3 border rounded-md bg-muted/50">
                    {clientProfile?.oldWebsite ? (
                      <a
                        href={clientProfile.oldWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {clientProfile.oldWebsite}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <div className="text-sm py-2 px-3 border rounded-md bg-muted/50 min-h-[60px]">
                  {clientProfile?.notes || 'No notes available'}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      clientProfile?.isActive !== false
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-sm">
                    {clientProfile?.isActive !== false
                      ? 'Active'
                      : 'Inactive'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
