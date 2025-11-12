'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Edit2, 
  Check, 
  X, 
  Crown, 
  Calendar, 
  CheckCircle2,
  Package,
  RefreshCw,
  Shield,
  Bell,
  CreditCard,
  Activity,
  Lock,
  Download,
  Eye,
  EyeOff,
  AlertCircle,
  Trash2,
  Settings,
  Loader2,
  ChevronRight,
  ExternalLink,
  Copy,
  CheckCheck,
  Server,
  Code,
  Key,
  Zap,
  TrendingUp,
  Clock,
  MessageSquare,
  FileText,
  BarChart3,
  Globe,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  Target,
  Users,
  Database,
  Cloud
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string | null;
}

interface Service {
  id: number;
  name: string;
  status: string;
  renewalDate: string;
}

interface Invoice {
  id: number;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface ActivityLog {
  id: number;
  action: string;
  timestamp: string;
  device: string;
}

interface SupportTicket {
  id: number;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
}

interface ApiKey {
  id: number;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

interface ServiceHealth {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'subscription' | 'services' | 'billing' | 'security' | 'notifications' | 'support' | 'api-keys' | 'service-health'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  // Show loading state while checking auth status
  if (!isInitialized || status === 'loading') {
    return (
      <div className="page-container mx-auto px-4 py-16 max-w-6xl">
        <Skeleton className="h-8 w-1/4 mb-8" />
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
            <Skeleton className="h-10 w-full mt-4" />
            <Skeleton className="h-40 w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null;
  }
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Andrew',
    email: 'andrew@xrt.com',
    phone: '123-456-7890',
    company: 'XRT',
    avatar: null,
  });

  // Mock subscription and services data
  const subscription = {
    plan: 'Pro',
    status: 'active',
    nextBillingDate: '2025-12-31',
    features: [
      'Unlimited projects',
      'Team collaboration',
      'Advanced analytics',
      'Priority support',
    ],
  };

  const services: Service[] = [
    { id: 1, name: 'Managed SEO', status: 'Active', renewalDate: '2024-11-20' },
    { id: 2, name: 'Content Marketing', status: 'Active', renewalDate: '2024-11-25' },
    { id: 3, name: 'Cloud Hosting', status: 'Active', renewalDate: '2024-12-01' },
  ];

  const invoices: Invoice[] = [
    { id: 1, date: '2024-10-01', amount: 99.99, status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 2, date: '2024-09-01', amount: 99.99, status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 3, date: '2024-08-01', amount: 99.99, status: 'Paid', description: 'Pro Plan - Monthly' },
  ];

  const activityLogs: ActivityLog[] = [
    { id: 1, action: 'Profile updated', timestamp: '2024-11-03 14:30', device: 'Chrome on Windows' },
    { id: 2, action: 'Password changed', timestamp: '2024-11-01 09:15', device: 'Safari on MacOS' },
    { id: 3, action: 'Login', timestamp: '2024-10-30 18:45', device: 'Chrome on Windows' },
  ];

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    security: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState<number | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Mock support tickets data
  const supportTickets: SupportTicket[] = [
    { id: 1, title: 'SSL Certificate Renewal Issue', status: 'in-progress', priority: 'high', createdAt: '2024-11-02', lastUpdated: '2024-11-03' },
    { id: 2, title: 'Email Configuration Help', status: 'resolved', priority: 'medium', createdAt: '2024-10-28', lastUpdated: '2024-10-30' },
    { id: 3, title: 'Database Performance Optimization', status: 'open', priority: 'urgent', createdAt: '2024-11-04', lastUpdated: '2024-11-04' },
  ];

  // Mock API keys data
  const apiKeys: ApiKey[] = [
    { id: 1, name: 'Production API Key', key: 'xrt_prod_ak_1a2b3c4d5e6f7g8h9i0j', createdAt: '2024-01-15', lastUsed: '2024-11-04 10:30', status: 'active' },
    { id: 2, name: 'Development API Key', key: 'xrt_dev_ak_9z8y7x6w5v4u3t2s1r0q', createdAt: '2024-03-20', lastUsed: '2024-11-03 14:22', status: 'active' },
    { id: 3, name: 'Legacy API Key', key: 'xrt_legacy_ak_abcdefghijklmnop', createdAt: '2023-08-10', lastUsed: '2024-09-15 08:45', status: 'revoked' },
  ];

  // Mock service health data
  const serviceHealthData: ServiceHealth[] = [
    { name: 'Web Hosting', status: 'operational', uptime: 99.98, responseTime: 145 },
    { name: 'Email Services', status: 'operational', uptime: 99.95, responseTime: 89 },
    { name: 'Database', status: 'operational', uptime: 99.99, responseTime: 52 },
    { name: 'CDN', status: 'degraded', uptime: 98.5, responseTime: 320 },
    { name: 'API Gateway', status: 'operational', uptime: 99.97, responseTime: 112 },
    { name: 'Backup Services', status: 'operational', uptime: 100, responseTime: 78 },
  ];

  useEffect(() => {
    if (session?.user) {
      setUserProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        avatar: session.user.image || null,
        phone: '+1 508-507-0922',
        company: 'Acme Inc.',
      });
    }
  }, [session]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyApiKey = (keyId: number, keyValue: string) => {
    navigator.clipboard.writeText(keyValue);
    setCopiedApiKey(keyId);
    setTimeout(() => setCopiedApiKey(null), 2000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploadingAvatar(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update user profile with new avatar
    setUserProfile(prev => ({ ...prev, avatar: avatarPreview }));
    setIsUploadingAvatar(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="page-container mx-auto px-4 py-16 max-w-6xl">
      <header className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent rounded-2xl blur-3xl -z-10" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Client Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage your IT services, subscriptions, and support tickets.</p>
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in">
          <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">Changes saved!</p>
                <p className="text-sm text-green-700 dark:text-green-300">Your profile has been updated successfully.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="mb-8 overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group">
              {/* Avatar with enhanced styling */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <Avatar className="relative h-24 w-24 border-4 border-background shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                  {avatarPreview || userProfile.avatar ? (
                    <AvatarImage 
                      src={avatarPreview || userProfile.avatar!} 
                      alt={userProfile.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                      {userProfile.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                {/* Online Status Indicator */}
                <div className="absolute bottom-1 right-1 h-7 w-7 bg-background rounded-full flex items-center justify-center shadow-lg">
                  <div className="h-5 w-5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                
                {/* Upload Overlay */}
                <label 
                  htmlFor="avatar-upload"
                  className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <>
                      <Edit2 className="h-5 w-5 text-white mb-1" />
                      <span className="text-xs text-white font-medium">Change</span>
                    </>
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={isUploadingAvatar}
                />
              </div>
              
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
              <div className="flex items-center gap-2 mt-1 group/email cursor-pointer" onClick={() => copyToClipboard(userProfile.email)}>
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{userProfile.email}</p>
                {copiedEmail ? (
                  <CheckCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground opacity-0 group-hover/email:opacity-100 transition-opacity" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{userProfile.company || 'No company'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{userProfile.phone || 'No phone'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge 
                variant={subscription.status === 'active' ? 'default' : 'secondary'}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <Crown className="h-4 w-4" />
                {subscription.plan} Plan
              </Badge>
              <p className="text-xs text-muted-foreground text-center">Member since 2024</p>
            </div>
          </div>
          
          {/* Plan Progress Bar */}
          <div className="mt-6 pt-6 border-t border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Plan Period</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {(() => {
                    const today = new Date();
                    const expiryDate = new Date(subscription.nextBillingDate);
                    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    return `${daysLeft} days remaining`;
                  })()}
                </p>
                <p className="text-xs text-muted-foreground">Renews on {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-500 relative overflow-hidden"
                  style={{ 
                    width: `${(() => {
                      const today = new Date();
                      const expiryDate = new Date(subscription.nextBillingDate);
                      const startDate = new Date(today);
                      startDate.setDate(startDate.getDate() - 30); // Assuming 30-day billing cycle
                      const totalDays = 30;
                      const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      const progress = ((totalDays - daysLeft) / totalDays) * 100;
                      return Math.min(Math.max(progress, 0), 100);
                    })()}%` 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Started
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Renewal
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card className="sticky top-4 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'profile'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </div>
                  {activeSection === 'profile' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('subscription')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'subscription'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5" />
                    <span className="font-medium">Subscription</span>
                  </div>
                  {activeSection === 'subscription' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('services')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'services'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Services</span>
                  </div>
                  {activeSection === 'services' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('billing')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'billing'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Billing</span>
                  </div>
                  {activeSection === 'billing' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'security'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Security</span>
                  </div>
                  {activeSection === 'security' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'notifications'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Notifications</span>
                  </div>
                  {activeSection === 'notifications' && <ChevronRight className="h-4 w-4" />}
                </button>
                
                <Separator className="my-2" />
                
                <button
                  onClick={() => setActiveSection('support')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'support'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-medium">Support</span>
                  </div>
                  {activeSection === 'support' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('api-keys')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'api-keys'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5" />
                    <span className="font-medium">API Keys</span>
                  </div>
                  {activeSection === 'api-keys' && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveSection('service-health')}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === 'service-health'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5" />
                    <span className="font-medium">Service Health</span>
                  </div>
                  {activeSection === 'service-health' && <ChevronRight className="h-4 w-4" />}
                </button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Quick Stats - Shows on all sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-all hover:scale-105 border-l-4 border-l-primary">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Active Services</p>
                    <p className="text-3xl font-bold">{services.length}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      All operational
                    </p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <Package className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:scale-105 border-l-4 border-l-green-500">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Plan Status</p>
                    <p className="text-3xl font-bold capitalize">{subscription.status}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pro Plan</p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:scale-105 border-l-4 border-l-blue-500">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Next Billing</p>
                    <p className="text-2xl font-bold">{new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="text-xs text-muted-foreground mt-1">Auto-renewal</p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Calendar className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:scale-105 border-l-4 border-l-orange-500">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Open Tickets</p>
                    <p className="text-3xl font-bold">{supportTickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length}</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Needs attention</p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {activeSection === 'profile' && (
          <div key="profile-section" className="animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            {isEditing ? (
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input 
                        id="name" 
                        value={userProfile.name} 
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        className="transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userProfile.email} 
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input 
                        id="phone" 
                        value={userProfile.phone} 
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Company
                      </Label>
                      <Input 
                        id="company" 
                        value={userProfile.company} 
                        onChange={(e) => setUserProfile({ ...userProfile, company: e.target.value })}
                        className="transition-all"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2 bg-muted/50">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit" className="flex items-center gap-2" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
                        <p className="text-base font-medium">{userProfile.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                        <p className="text-base font-medium">{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                        <p className="text-base font-medium">{userProfile.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Company</p>
                        <p className="text-base font-medium">{userProfile.company || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
          </div>
          )}

          {activeSection === 'subscription' && (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Subscription Plan
              </CardTitle>
              <CardDescription>Details about your current subscription.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-3 sm:space-y-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">{subscription.plan} Plan</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm font-medium">
                      Status: <span className="text-green-500 capitalize">{subscription.status}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-4 py-2 rounded-lg border">
                  <Calendar className="h-4 w-4" />
                  <span>Next billing: <span className="font-medium text-foreground">{new Date(subscription.nextBillingDate).toLocaleDateString()}</span></span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Plan Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subscription.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end bg-muted/30">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Change Plan
              </Button>
            </CardFooter>
          </Card>
          )}

          {activeSection === 'services' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Purchased Services
              </CardTitle>
              <CardDescription>Manage your active services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 border-2 rounded-lg space-y-3 sm:space-y-0 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4 flex-grow">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-lg mb-1">{service.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Renews on: <span className="font-medium text-foreground">{new Date(service.renewalDate).toLocaleDateString()}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={service.status === 'Active' ? 'default' : 'destructive'}
                        className="flex items-center gap-1.5 px-3 py-1.5"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {service.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end bg-muted/30">
              <Button variant="outline" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Manage Services
              </Button>
            </CardFooter>
          </Card>
          )}

          {activeSection === 'billing' && (
          <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Invoices
              </CardTitle>
              <CardDescription>View your billing history and download invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div 
                    key={invoice.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-3 sm:mb-0">
                      <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-base mb-1">{invoice.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(invoice.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold">${invoice.amount}</p>
                        <Badge variant="secondary" className="text-xs">
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Showing {invoices.length} recent invoices
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                View All Invoices
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>Manage your payment information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-5 border-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
          </>
          )}

          {activeSection === 'security' && (
          <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="current-password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {activityLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="flex items-start gap-3 p-4 border rounded-lg bg-muted/30"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">{log.device}</p>
                        <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                <div>
                  <p className="font-semibold">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                </div>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
          </>
          )}

          {activeSection === 'notifications' && (
          <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about security events</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.security}
                      onChange={(e) => setNotifications({...notifications, security: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end bg-muted/30">
              <Button className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
          </>
          )}

          {activeSection === 'support' && (
          <>
          <Card>
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Support Tickets
                  </CardTitle>
                  <CardDescription>Track and manage your support requests.</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  New Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {supportTickets.map((ticket) => {
                const statusColors = {
                  'open': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
                  'in-progress': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
                  'resolved': 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
                  'closed': 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20'
                };
                const priorityColors = {
                  'low': 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
                  'medium': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
                  'high': 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
                  'urgent': 'bg-red-500/10 text-red-700 dark:text-red-400'
                };
                return (
                  <div 
                    key={ticket.id}
                    className="group p-5 border-2 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{ticket.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`${statusColors[ticket.status]} border`}>
                            {ticket.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                            {ticket.status === 'resolved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {ticket.status === 'open' && <HelpCircle className="h-3 w-3 mr-1" />}
                            {ticket.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={priorityColors[ticket.priority]}>
                            {ticket.priority === 'urgent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="justify-between bg-muted/30">
              <p className="text-sm text-muted-foreground">
                {supportTickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length} active tickets
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View All Tickets
              </Button>
            </CardFooter>
          </Card>
          </>
          )}

          {activeSection === 'api-keys' && (
          <>
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>Manage your API keys for integrations and automation.</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {apiKeys.map((apiKey) => (
                <div 
                  key={apiKey.id}
                  className={`group p-5 border-2 rounded-xl transition-all ${
                    apiKey.status === 'active' 
                      ? 'hover:border-primary/50 hover:shadow-lg' 
                      : 'opacity-60 border-dashed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        apiKey.status === 'active' 
                          ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                          : 'bg-gray-400'
                      }`}>
                        <Key className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg mb-1">{apiKey.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                            {apiKey.status === 'active' ? (
                              <><Zap className="h-3 w-3 mr-1" />ACTIVE</>
                            ) : (
                              <><XCircle className="h-3 w-3 mr-1" />REVOKED</>
                            )}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-sm bg-muted px-3 py-2 rounded-lg">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-grow">{apiKey.key.substring(0, 20)}••••••••••••</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => copyApiKey(apiKey.id, apiKey.key)}
                          >
                            {copiedApiKey === apiKey.id ? (
                              <CheckCheck className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                    {apiKey.status === 'active' && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-between bg-muted/30">
              <p className="text-sm text-muted-foreground">
                {apiKeys.filter(k => k.status === 'active').length} active keys
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                API Documentation
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Never share your API keys publicly or commit them to version control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Rotate your API keys regularly for enhanced security</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use environment variables to store API keys in your applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Revoke keys immediately if you suspect they have been compromised</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          </>
          )}

          {activeSection === 'service-health' && (
          <>
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Service Health Dashboard
              </CardTitle>
              <CardDescription>Real-time status of all your IT services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceHealthData.map((service, index) => {
                  const statusConfig = {
                    'operational': { 
                      color: 'text-green-600 dark:text-green-400', 
                      bg: 'bg-green-500/10', 
                      border: 'border-green-500/20',
                      icon: <Wifi className="h-5 w-5" />
                    },
                    'degraded': { 
                      color: 'text-yellow-600 dark:text-yellow-400', 
                      bg: 'bg-yellow-500/10', 
                      border: 'border-yellow-500/20',
                      icon: <AlertTriangle className="h-5 w-5" />
                    },
                    'outage': { 
                      color: 'text-red-600 dark:text-red-400', 
                      bg: 'bg-red-500/10', 
                      border: 'border-red-500/20',
                      icon: <WifiOff className="h-5 w-5" />
                    }
                  };
                  const config = statusConfig[service.status];
                  
                  return (
                    <div 
                      key={index}
                      className={`p-5 border-2 rounded-xl ${config.border} ${config.bg} hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg ${config.bg} flex items-center justify-center ${config.color}`}>
                            {config.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">{service.name}</h3>
                            <p className={`text-sm font-medium ${config.color}`}>
                              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Uptime</span>
                            <span className="font-semibold">{service.uptime}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                service.uptime >= 99.5 ? 'bg-green-500' : 
                                service.uptime >= 98 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${service.uptime}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            Response Time
                          </span>
                          <span className="font-semibold">{service.responseTime}ms</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm text-muted-foreground">Last updated: Just now</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Status
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operational</p>
                    <p className="text-2xl font-bold">{serviceHealthData.filter(s => s.status === 'operational').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Degraded</p>
                    <p className="text-2xl font-bold">{serviceHealthData.filter(s => s.status === 'degraded').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Uptime</p>
                    <p className="text-2xl font-bold">{(serviceHealthData.reduce((acc, s) => acc + s.uptime, 0) / serviceHealthData.length).toFixed(2)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
