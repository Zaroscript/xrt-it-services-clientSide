"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import {
  clientService,
  type ClientProfile,
} from "@/services/client/client.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays } from "date-fns";
import { PlanProgress } from "@/components/ui/PlanProgress";
import {
  Package,
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Activity,
  Calendar,
  Clock,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";

import { RequestServiceModal } from "@/components/modals/RequestServiceModal";
import { RequestPlanModal } from "@/components/modals/RequestPlanModal";
import invoiceService from "@/services/invoiceService";

export default function OverviewTab() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [isLoadingSpent, setIsLoadingSpent] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    fetchClientData();
    fetchTotalSpent();
  }, []);

  const fetchClientData = async () => {
    try {
      const data = await clientService.getClientProfile();
      setClientData(data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalSpent = async () => {
    try {
      setIsLoadingSpent(true);
      // Fetch all invoices and filter for paid ones
      const allInvoices = await invoiceService.getMyInvoices();
      const paidInvoices = allInvoices.filter(
        (invoice) => invoice.status === "paid"
      );

      // Calculate total from paid invoices
      const total = paidInvoices.reduce(
        (sum, invoice) => sum + invoice.total,
        0
      );
      setTotalSpent(total);
    } catch (error) {
      console.error("Error fetching total spend:", error);
      setTotalSpent(0);
    } finally {
      setIsLoadingSpent(false);
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

  const activeServicesCount =
    clientData?.services?.filter((s) => s.status === "active").length || 0;
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
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
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
              {clientData?.currentPlan?.name || "No Plan"}
            </div>
            <p className="text-xs text-muted-foreground">
              {clientData?.currentPlan
                ? `$${clientData.currentPlan.price}/${clientData.currentPlan.billingCycle}`
                : "No active subscription"}
            </p>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={clientData?.isActive ? "default" : "destructive"}>
                {clientData?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Member since{" "}
              {new Date(clientData?.createdAt || "").toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingSpent ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalSpent)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              From paid invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your services and subscription
          </CardDescription>
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
                <div className="text-sm text-muted-foreground">
                  Add new services to your account
                </div>
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
                <div className="text-sm text-muted-foreground">
                  Upgrade or modify your subscription
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Plan Status & Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Plan Card */}
        {clientData?.currentPlan ? (
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Current Plan</CardTitle>
                  <CardDescription>
                    Your active subscription details
                  </CardDescription>
                </div>
                <Badge
                  variant="default"
                  className={`text-sm px-3 py-1 ${
                    clientData.subscription?.status === "suspended"
                      ? "bg-red-500 hover:bg-red-600"
                      : clientData.subscription?.status === "expired"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {(clientData.subscription?.status || "active")
                    .charAt(0)
                    .toUpperCase() +
                    (clientData.subscription?.status || "active").slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Expiration/Suspension Alert */}
              {(clientData.subscription?.status === "expired" ||
                clientData.subscription?.status === "suspended") && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-600">
                      Subscription Suspended
                    </h4>
                    <p className="text-sm text-red-500/90 mt-1">
                      Your subscription has expired or is suspended. Please
                      contact support to renew your plan.
                    </p>
                  </div>
                </div>
              )}

              {/* Plan Name & Price */}
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {clientData.currentPlan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    $
                    {(() => {
                      const basePrice =
                        clientData.subscription?.customPrice ??
                        clientData.currentPlan.price;
                      const discount = clientData.subscription?.discount || 0;
                      const finalPrice =
                        basePrice - (basePrice * discount) / 100;
                      return finalPrice.toFixed(2);
                    })()}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    /{clientData.currentPlan.billingCycle}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  {clientData.currentPlan.description}
                </p>
              </div>

              {/* Plan Features */}
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Plan Features
                </p>
                <div className="grid gap-2">
                  {clientData.currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan Progress & Renewal Date */}
              {clientData.subscription?.startDate &&
                clientData.subscription?.endDate && (
                  <div className="pt-4 border-t border-primary/20">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {clientData.subscription.status === "active"
                            ? "Renews on"
                            : "Expired on"}
                        </p>
                        <p className="text-lg font-bold">
                          {format(
                            new Date(clientData.subscription.endDate),
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">
                          {(() => {
                            const end = new Date(
                              clientData.subscription.endDate
                            );
                            const now = new Date();
                            const days = differenceInDays(end, now);
                            return days > 0
                              ? `${days} days remaining`
                              : "Expired";
                          })()}
                        </p>
                      </div>
                    </div>
                    <PlanProgress
                      startDate={clientData.subscription.startDate}
                      endDate={clientData.subscription.endDate}
                      billingCycle={clientData.subscription.billingCycle}
                    />
                  </div>
                )}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Billing Cycle:</span>
                  <span className="font-semibold capitalize">
                    {clientData.currentPlan.billingCycle}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle>No Active Plan</CardTitle>
              <CardDescription>
                You don't have an active subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setIsPlanModalOpen(true)}
                className="w-full"
              >
                Request a Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account status and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Account Status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Account Status</span>
              </div>
              <Badge variant={clientData?.isActive ? "default" : "destructive"}>
                {clientData?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Member Since */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Member Since</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {clientData?.createdAt
                  ? format(new Date(clientData.createdAt), "MMM dd, yyyy")
                  : "N/A"}
              </span>
            </div>

            {/* Company Name */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Company</span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {clientData?.companyName || "N/A"}
              </span>
            </div>

            {/* Total Spent Summary */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Total Investment</p>
                  <p className="text-xs text-muted-foreground">
                    All-time spending
                  </p>
                </div>
                {isLoadingSpent ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(totalSpent)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information Alert */}
      {clientData?.currentPlan && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Plan Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Your plan is billed{" "}
                    {clientData.currentPlan.billingCycle === "monthly"
                      ? "monthly"
                      : "annually"}
                  </li>
                  <li>• You can request plan changes at any time</li>
                  <li>
                    • All features are available immediately upon activation
                  </li>
                  <li>• Contact support for any billing questions</li>
                </ul>
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
