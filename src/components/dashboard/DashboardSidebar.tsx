'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  FileText, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'services', label: 'Services', icon: Package },
  { id: 'plan', label: 'Plan', icon: CreditCard },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    const newUrl = `${pathname}?tab=${itemId}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <aside className="hidden lg:block w-64 min-h-screen bg-card border-r border-border flex-shrink-0">
      <div className="sticky top-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Logo/Title */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your account</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-primary-foreground" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

