'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '@/components/dashboard/OverviewTab';
import ServicesTab from '@/components/dashboard/ServicesTab';
import PlanTab from '@/components/dashboard/PlanTab';
import InvoicesTab from '@/components/dashboard/InvoicesTab';
import SettingsTab from '@/components/dashboard/SettingsTab';

export default function DashboardPage() {
  return (
    <div id='plan' className="container mx-auto p-6 mt-24">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="plan">
          <PlanTab />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
