// src/app/profile/ProfileContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  useAuthStore  from '@/store/useAuthStore';
import { clientService, type ClientProfile as ClientProfileType, type Service, type Plan } from '@/services/client/client.service';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Package, CreditCard, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { RequestServiceModal } from '../modals/RequestServiceModal';
import { RequestPlanModal } from '../modals/RequestPlanModal';

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
  const [clientData, setClientData] = useState<ClientProfileType | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  // Fetch client profile data
  useEffect(() => {
    const fetchClientData = async () => {
      if (user?.role === 'client' && isAuthenticated) {
        try {
          const data = await clientService.getClientProfile();
          setClientData(data);
        } catch (error) {
          console.error('Error fetching client data:', error);
        }
      }
    };

    fetchClientData();
  }, [user, isAuthenticated]);

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
          company: clientData?.companyName || clientProfile?.companyName || user.companyName || '',
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
    clientData,
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
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="plan">Current Plan</TabsTrigger>
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

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    My Services
                  </CardTitle>
                  <CardDescription>
                    Services purchased and currently active on your account.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {clientData?.services && clientData.services.length > 0 ? (
                <div className="space-y-4">
                  {clientData.services.map((service) => (
                    <div
                      key={service._id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">
                            {service.service.name}
                          </h3>
                          <Badge
                            variant={
                              service.status === 'active'
                                ? 'default'
                                : service.status === 'paused'
                                ? 'secondary'
                                : service.status === 'completed'
                                ? 'outline'
                                : 'destructive'
                            }
                            className="flex items-center gap-1"
                          >
                            {service.status === 'active' && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                            {service.status === 'paused' && (
                              <Clock className="h-3 w-3" />
                            )}
                            {service.status === 'cancelled' && (
                              <XCircle className="h-3 w-3" />
                            )}
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {service.service.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Price: </span>
                            <span className="font-medium">
                              ${service.customPrice}/mo
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Started: </span>
                            <span>
                              {new Date(service.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          {service.endDate && (
                            <div>
                              <span className="text-muted-foreground">Ends: </span>
                              <span>
                                {new Date(service.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        {service.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium">Notes:</span> {service.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't purchased any services yet.
                  </p>
                  <Button onClick={() => setIsServiceModalOpen(true)}>
                    Request a Service
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Subscription Plan
                  </CardTitle>
                  <CardDescription>
                    Your active subscription plan and billing details.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {clientData?.currentPlan ? (
                <div className="space-y-6">
                  <div className="p-6 border-2 border-primary rounded-lg bg-primary/5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {clientData.currentPlan.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">
                            ${clientData.currentPlan.price}
                          </span>
                          <span className="text-muted-foreground">
                            /{clientData.currentPlan.billingCycle}
                          </span>
                        </div>
                      </div>
                      <Badge variant="default" className="text-sm px-3 py-1">
                        Active
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {clientData.currentPlan.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold mb-3">Plan Features:</h4>
                      <div className="grid gap-2">
                        {clientData.currentPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setIsPlanModalOpen(true)}>
                      Request Plan Change
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Billing History
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have an active subscription plan.
                  </p>
                  <Button onClick={() => setIsPlanModalOpen(true)}>
                    Request a Plan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Modals */}
      <RequestServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={() => {
          toast.success('Your request has been submitted to our team!');
          // Optionally refresh client data
        }}
      />
      <RequestPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSuccess={() => {
          toast.success('Your plan change request has been submitted!');
          // Optionally refresh client data
        }}
      />
    </div>
  );
}
