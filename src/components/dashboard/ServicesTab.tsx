"use client";

import { useState, useEffect } from "react";
import {
  clientService,
  type ClientProfile,
} from "@/services/client/client.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle2, Clock, XCircle } from "lucide-react";
import { RequestServiceModal } from "../modals/RequestServiceModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesTab() {
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const data = await clientService.getClientProfile();
      console.log("Fetched Client Data:", data);
      setClientData(data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="services" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Services</h2>
          <p className="text-muted-foreground mt-2">
            Services purchased and currently active on your account
          </p>
        </div>
        <Button onClick={() => setIsServiceModalOpen(true)}>
          Request Service
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : clientData?.services && clientData.services.length > 0 ? (
            <div className="space-y-4">
              {clientData.services.map((service) => (
                <div
                  key={service._id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">
                        {service.service?.name || "Unknown Service"}
                      </h3>
                      <Badge
                        variant={
                          service.status === "active"
                            ? "default"
                            : service.status === "paused"
                            ? "secondary"
                            : service.status === "completed"
                            ? "outline"
                            : "destructive"
                        }
                        className="flex items-center gap-1"
                      >
                        {service.status === "active" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        {service.status === "paused" && (
                          <Clock className="h-3 w-3" />
                        )}
                        {service.status === "cancelled" && (
                          <XCircle className="h-3 w-3" />
                        )}
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {service.service?.description ||
                        "No description available"}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
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
                        <span className="font-medium">Notes:</span>{" "}
                        {service.notes}
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

      <RequestServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={fetchClientData}
      />
    </div>
  );
}
