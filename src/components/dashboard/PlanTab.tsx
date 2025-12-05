"use client";

import { useState, useEffect } from "react";
import {
  clientService,
  type ClientProfile,
} from "@/services/client/client.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { RequestPlanModal } from "@/components/modals/RequestPlanModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlanTab() {
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
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
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsPlanModalOpen(true)}
                >
                  Request Plan Change
                </Button>
                <Button variant="outline" className="flex-1" disabled>
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
