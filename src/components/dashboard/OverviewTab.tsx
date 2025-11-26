'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { clientService, type ClientProfile } from '@/services/client/client.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Package, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Activity
} from 'lucide-react';
import { RequestServiceModal } from '@/components/modals/RequestServiceModal';
import { RequestPlanModal } from '@/components/modals/RequestPlanModal';

export default function OverviewTab() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const data = await clientService.getClientProfile();
      setClientData(data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  const activeServicesCount = clientData?.services?.filter(s => s.status === 'active').length || 0;
  const totalServices = clientData?.services?.length || 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.fName}!
        </h2>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your account and services
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Active Services */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServicesCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalServices} total services
            </p>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientData?.currentPlan?.name || 'No Plan'}
            </div>
            <p className="text-xs text-muted-foreground">
              {clientData?.currentPlan 
                ? `$${clientData.currentPlan.price}/${clientData.currentPlan.billingCycle}`
                : 'No active subscription'
              }
            </p>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={clientData?.isActive ? 'default' : 'destructive'}>
                {clientData?.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Member since {new Date(clientData?.createdAt || '').toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Quick Stat */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${clientData?.currentPlan?.price || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Current billing cycle
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your services and subscription</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button 
            onClick={() => setIsServiceModalOpen(true)}
            className="justify-start h-auto py-4 px-6"
            variant="outline"
          >
            <div className="flex items-center gap-3 w-full">
              <Package className="h-5 w-5" />
              <div className="text-left flex-1">
                <div className="font-semibold">Request a Service</div>
                <div className="text-sm text-muted-foreground">Add new services to your account</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>

          <Button 
            onClick={() => setIsPlanModalOpen(true)}
            className="justify-start h-auto py-4 px-6"
            variant="outline"
          >
            <div className="flex items-center gap-3 w-full">
              <CreditCard className="h-5 w-5" />
              <div className="text-left flex-1">
                <div className="font-semibold">Change Plan</div>
                <div className="text-sm text-muted-foreground">Upgrade or modify your subscription</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Current Plan Overview */}
      {clientData?.currentPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Current Plan</CardTitle>
            <CardDescription>Active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{clientData.currentPlan.name}</h3>
                <p className="text-muted-foreground mt-1">{clientData.currentPlan.description}</p>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl font-bold">${clientData.currentPlan.price}</span>
                  <span className="text-muted-foreground">/{clientData.currentPlan.billingCycle}</span>
                </div>
              </div>
              <Badge variant="default" className="text-sm">Active</Badge>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium">Includes:</p>
              <div className="grid gap-2">
                {clientData.currentPlan.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <RequestServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={fetchClientData}
      />
      <RequestPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSuccess={fetchClientData}
      />
    </div>
  );
}
