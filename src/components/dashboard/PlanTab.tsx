"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  clientService,
  type ClientProfile,
} from "@/services/client/client.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { RequestPlanModal } from "@/components/modals/RequestPlanModal";
import { Skeleton } from "@/components/ui/skeleton";
import { format, differenceInDays } from "date-fns";
import { PlanProgress } from "@/components/ui/PlanProgress";

export default function PlanTab() {
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    fetchClientData();
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

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "suspended":
        return "bg-red-500 hover:bg-red-600";
      case "expired":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plan</h2>
        <p className="text-muted-foreground mt-2">
          Your active subscription plan and billing details
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-6">
              <div className="p-6 border-2 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Skeleton className="h-8 w-40 mb-2" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="grid gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : clientData?.currentPlan ? (
            <div className="space-y-6">
              {/* Expiration/Suspension Alert */}
              {(clientData.subscription?.status === "expired" ||
                clientData.subscription?.status === "suspended") && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-600">
                      Subscription Suspended
                    </h4>
                    <p className="text-sm text-red-500/90 mt-1">
                      Your subscription has expired or is suspended. Please
                      contact support to renew your plan and restore full access
                      to services.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 border-2 border-primary rounded-lg bg-primary/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {clientData.currentPlan.name}
                      {clientData.currentPlan.badge?.text && (
                        <Badge
                          variant={
                            clientData.currentPlan.badge.variant || "secondary"
                          }
                          className="text-xs"
                        >
                          {clientData.currentPlan.badge.text}
                        </Badge>
                      )}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        $
                        {(() => {
                          const basePrice =
                            clientData.subscription?.customPrice ??
                            clientData.currentPlan.price;
                          const discount =
                            clientData.subscription?.discount || 0;
                          const finalPrice =
                            basePrice - (basePrice * discount) / 100;
                          return finalPrice.toFixed(2);
                        })()}
                      </span>
                      <span className="text-muted-foreground">
                        /{clientData.currentPlan.billingCycle}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="default"
                    className={`text-sm px-3 py-1 ${getStatusColor(
                      clientData.subscription?.status || "active"
                    )}`}
                  >
                    {(clientData.subscription?.status || "active")
                      .charAt(0)
                      .toUpperCase() +
                      (clientData.subscription?.status || "active").slice(1)}
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

                {/* Plan Progress & Renewal Date */}
                {clientData.subscription?.startDate &&
                  clientData.subscription?.endDate && (
                    <div className="mt-6 pt-6 border-t border-primary/20">
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
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsPlanModalOpen(true)}
                >
                  Request Plan Change
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/dashboard?tab=invoices")}
                >
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

      <RequestPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSuccess={fetchClientData}
      />
    </div>
  );
}
