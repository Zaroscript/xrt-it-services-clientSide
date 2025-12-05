'use client';

import OverviewTab from '@/components/dashboard/OverviewTab';
import ServicesTab from '@/components/dashboard/ServicesTab';
import PlanTab from '@/components/dashboard/PlanTab';
import InvoicesTab from '@/components/dashboard/InvoicesTab';
import SettingsTab from '@/components/dashboard/SettingsTab';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const tabParam = searchParams.get('tab');
  const defaultTab = tabParam && ['overview', 'services', 'plan', 'invoices', 'settings'].includes(tabParam) 
    ? tabParam 
    : 'overview';
  
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = `${pathname}?tab=${value}`;
    router.push(newUrl, { scroll: false });
  };

  // Sync with URL params
  useEffect(() => {
    if (tabParam && ['overview', 'services', 'plan', 'invoices', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'services':
        return <ServicesTab />;
      case 'plan':
        return <PlanTab />;
      case 'invoices':
        return <InvoicesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden w-full lg:w-auto pt-24 lg:pt-28">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
