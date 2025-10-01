'use client';

import { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  CreditCard, 
  Key, 
  Mail, 
  User, 
  Building, 
  Phone, 
  Globe, 
  Lock, 
  Check, 
  Download, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

// Types
type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  features: string[];
  isCurrent: boolean;
  isPopular?: boolean;
};

type Invoice = {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  plan: string;
  downloadUrl: string;
};

type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  
  // Mock data
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      price: '$29',
      billingCycle: 'per month, billed annually',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'API access (read-only)'
      ],
      isCurrent: true
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing businesses with more needs',
      price: '$79',
      billingCycle: 'per month, billed annually',
      features: [
        'Up to 20 team members',
        '50GB storage',
        'Advanced analytics',
        'Priority support',
        'Full API access',
        'Custom branding'
      ],
      isCurrent: false,
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: 'Custom',
      billingCycle: 'custom billing',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Advanced analytics & reporting',
        '24/7 dedicated support',
        'Full API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      isCurrent: false
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: new Date('2023-06-15'),
      amount: 29.00,
      status: 'paid',
      plan: 'Starter Plan',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: new Date('2023-05-15'),
      amount: 29.00,
      status: 'paid',
      plan: 'Starter Plan',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: new Date('2023-04-15'),
      amount: 29.00,
      status: 'paid',
      plan: 'Starter Plan',
      downloadUrl: '#'
    }
  ];

  const notificationPreferences: NotificationPreference[] = [
    {
      id: 'product-updates',
      label: 'Product updates',
      description: 'News, announcements, and product updates',
      enabled: true
    },
    {
      id: 'security-alerts',
      label: 'Security alerts',
      description: 'Important notifications about your account security',
      enabled: true
    },
    {
      id: 'billing-updates',
      label: 'Billing updates',
      description: 'Invoices, payment receipts, and billing notifications',
      enabled: true
    },
    {
      id: 'marketing',
      label: 'Marketing communications',
      description: 'Tips, promotions, and special offers',
      enabled: false
    }
  ];

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'Acme Inc.',
    phone: '+1 (555) 123-4567',
    website: 'acmeinc.example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Inc.',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '4242',
    cardName: 'John Doe',
    expiry: '12/25',
    cvc: '123'
  });

  if (!user) {
    return null; // ProtectedRoute will handle the redirection
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPaymentMethod(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Implement save to API
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(false);
    // TODO: Implement password change
  };

  const handleSaveBillingAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save billing address
  };

  const handleSavePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingPayment(false);
    // TODO: Implement save payment method
  };

  const toggleNotification = (id: string) => {
    // TODO: Implement notification toggle
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-900 dark:text-amber-400">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" onClick={() => setActiveTab('account')}>
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 text-center">
                <div className="relative mx-auto h-24 w-24 rounded-full bg-background/80 backdrop-blur-sm p-1">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 rounded-full bg-background p-1.5 shadow-sm border">
                    <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="outline" className="mt-2 bg-background/80 backdrop-blur-sm">
                  {user.role || 'Company Admin'}
                </Badge>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm">Acme Inc.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <a href="#" className="truncate text-sm text-primary hover:underline">acmeinc.example.com</a>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Usage</CardTitle>
                <CardDescription>Your current plan usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">4.2 GB <span className="text-muted-foreground">of 10 GB</span></span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Team Members</span>
                    <span className="font-medium">3 <span className="text-muted-foreground">of 5</span></span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">API Requests</span>
                    <span className="font-medium">1,234 <span className="text-muted-foreground">of 10,000</span></span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('subscription')}>
                  Upgrade Plan
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Subscription</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account information and email address.</CardDescription>
                      </div>
                      {isEditing ? (
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={handleSaveProfile}
                          >
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="name" 
                              value={formData.name} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="company" 
                              value={formData.company} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="phone" 
                              type="tel" 
                              value={formData.phone} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="website">Website</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="website" 
                              type="url" 
                              value={formData.website} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password associated with your account.</CardDescription>
                      </div>
                      {isChangingPassword ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsChangingPassword(false)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsChangingPassword(true)}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  {isChangingPassword && (
                    <CardContent>
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="currentPassword" 
                              type="password" 
                              value={formData.currentPassword} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              placeholder="Enter your current password"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="newPassword" 
                              type="password" 
                              value={formData.newPassword} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              placeholder="Enter a new password"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                              id="confirmPassword" 
                              type="password" 
                              value={formData.confirmPassword} 
                              onChange={handleInputChange}
                              className="pl-10" 
                              placeholder="Confirm your new password"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <Button type="submit">
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Manage your email notification preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {notificationPreferences.map((pref) => (
                        <div key={pref.id} className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">{pref.label}</h4>
                            <p className="text-sm text-muted-foreground">{pref.description}</p>
                          </div>
                          <Switch 
                            checked={pref.enabled} 
                            onCheckedChange={() => toggleNotification(pref.id)}
                            className="ml-4"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t px-6 py-4">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Your Plan</CardTitle>
                        <CardDescription>
                          You're currently on the <span className="font-medium text-foreground">Starter</span> plan.
                          Your next billing date is <span className="font-medium text-foreground">
                            {format(new Date().setMonth(new Date().getMonth() + 1), 'MMMM d, yyyy')}
                          </span>.
                        </CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {plans.map((plan) => (
                        <Card 
                          key={plan.id}
                          className={`relative overflow-hidden ${
                            plan.isCurrent 
                              ? 'ring-2 ring-primary' 
                              : plan.isPopular 
                                ? 'border-primary/30' 
                                : ''
                          }`}
                        >
                          {plan.isPopular && (
                            <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                              Popular
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              {plan.isCurrent && (
                                <Badge variant="secondary">Current</Badge>
                              )}
                            </div>
                            <div className="mt-2">
                              <span className="text-3xl font-bold">{plan.price}</span>
                              {plan.price !== 'Custom' && (
                                <span className="text-muted-foreground">/month</span>
                              )}
                              <p className="text-sm text-muted-foreground mt-1">{plan.billingCycle}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <ul className="space-y-2">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="border-t px-6 py-4">
                            <Button 
                              className="w-full" 
                              variant={plan.isCurrent ? 'outline' : 'default'}
                              disabled={plan.isCurrent}
                            >
                              {plan.isCurrent ? 'Current Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View your past invoices and payments.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.map((invoice) => (
                        <div 
                          key={invoice.id} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.plan}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(invoice.date)} • {invoice.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                            <div className="text-right">
                              <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                              <div className="mt-1">
                                {getStatusBadge(invoice.status)}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment methods and billing information.</CardDescription>
                      </div>
                      {!isAddingPayment && (
                        <Button 
                          size="sm" 
                          onClick={() => setIsAddingPayment(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Payment Method
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isAddingPayment ? (
                      <div className="space-y-6">
                        <div className="rounded-lg border p-6">
                          <h4 className="font-medium mb-4">Add a new payment method</h4>
                          <form onSubmit={handleSavePaymentMethod} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input 
                                  id="cardNumber" 
                                  placeholder="4242 4242 4242 4242" 
                                  value={paymentMethod.cardNumber}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input 
                                  id="cardName" 
                                  placeholder="John Doe" 
                                  value={paymentMethod.cardName}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input 
                                  id="expiry" 
                                  placeholder="MM/YY" 
                                  value={paymentMethod.expiry}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input 
                                  id="cvc" 
                                  placeholder="123" 
                                  value={paymentMethod.cvc}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-2">
                              <Button 
                                variant="outline" 
                                type="button"
                                onClick={() => setIsAddingPayment(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit">Save Payment Method</Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/25</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span>Your next payment of $29.00 will be processed on {format(new Date().setMonth(new Date().getMonth() + 1), 'MMMM d, yyyy')}.</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>Update your billing address for invoices.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveBillingAddress}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={billingAddress.firstName} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={billingAddress.lastName} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input 
                            id="company" 
                            value={billingAddress.company} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={billingAddress.address} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            value={billingAddress.city} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input 
                            id="state" 
                            value={billingAddress.state} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP/Postal Code</Label>
                          <Input 
                            id="zip" 
                            value={billingAddress.zip} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            id="country" 
                            value={billingAddress.country} 
                            onChange={handleBillingAddressChange}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6">
                        <Button type="submit">Save Address</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage your billing information and download invoices.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Current Plan</p>
                            <p className="text-sm text-muted-foreground">Starter Plan - $29.00/month</p>
                          </div>
                        </div>
                        <Button variant="outline">Change Plan</Button>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground">Billing Cycle</p>
                            <p className="font-medium">Monthly</p>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground">Next Billing Date</p>
                            <p className="font-medium">
                              {format(new Date().setMonth(new Date().getMonth() + 1), 'MMMM d, yyyy')}
                            </p>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground">Payment Method</p>
                            <div className="flex items-center">
                              <span className="font-medium">Visa ending in 4242</span>
                              <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Recent Invoices</h4>
                        <div className="space-y-3">
                          {invoices.slice(0, 3).map((invoice) => (
                            <div 
                              key={invoice.id} 
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-muted">
                                  <CreditCard className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="font-medium">Invoice #{invoice.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(invoice.date)} • {invoice.plan}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <Button variant="ghost">
                            View all invoices
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
