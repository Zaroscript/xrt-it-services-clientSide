'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This ensures the page is only rendered on the client side
export const dynamic = 'force-dynamic';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  phone?: string;
  company?: string;
  website?: string;
};

type BillingInfo = {
  firstName: string;
  lastName: string;
  company: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  postalCode: string;
  country: string;
};

type PaymentMethod = {
  id: string;
  lastFour: string;
  expiryDate: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type Subscription = {
  id: string;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  status: string;
  nextBillingDate: string;
  features: string[];
};

type TabType = 'overview' | 'billing' | 'security' | 'notifications';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const user = session?.user as UserProfile | undefined;
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    website: user?.website || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [billingAddress, setBillingAddress] = useState<BillingInfo>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    company: user?.company || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    postalCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<Omit<PaymentMethod, 'id' | 'lastFour' | 'expiryDate'>>({
    cardNumber: '',
    cardName: user?.name || '',
    expiry: '',
    cvc: ''
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Sample subscription data
  const subscription: Subscription = {
    id: 'sub_123',
    name: 'Pro Plan',
    description: 'For professionals and businesses',
    price: '$29.99',
    billingCycle: 'monthly',
    status: 'active',
    nextBillingDate: '2023-12-01',
    features: ['Unlimited projects', 'Team collaboration', 'Priority support'],
  };

  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name || 'User'} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-500">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {(['overview', 'billing', 'security', 'notifications'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {activeTab === 'overview' && 'Profile Overview'}
                  {activeTab === 'billing' && 'Billing Information'}
                  {activeTab === 'security' && 'Security'}
                  {activeTab === 'notifications' && 'Notification Settings'}
                </CardTitle>
                {activeTab !== 'overview' && (
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p>{user?.name || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{user?.email || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{user?.phone || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Company</p>
                          <p>{user?.company || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Subscription</h3>
                      <Button variant="outline" size="sm">
                        Manage Subscription
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{subscription.name}</h4>
                            <p className="text-sm text-gray-500">
                              {subscription.billingCycle}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{subscription.price}</p>
                            <p className="text-sm text-gray-500">
                              Next billing: {subscription.nextBillingDate}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Features:</h5>
                          <ul className="text-sm space-y-1">
                            {subscription.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <svg
                                  className="h-4 w-4 text-green-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={billingAddress.firstName}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  firstName: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={billingAddress.lastName}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  lastName: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company (Optional)
                          </label>
                          <input
                            type="text"
                            value={billingAddress.company}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={billingAddress.street}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                street: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={billingAddress.city}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  city: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province
                            </label>
                            <input
                              type="text"
                              value={billingAddress.state}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  state: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP/Postal Code
                            </label>
                            <input
                              type="text"
                              value={billingAddress.postalCode}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  postalCode: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <select
                              value={billingAddress.country}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  country: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select a country</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AU">Australia</option>
                              {/* Add more countries as needed */}
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">
                          {billingAddress.firstName} {billingAddress.lastName}
                        </p>
                        {billingAddress.company && (
                          <p>{billingAddress.company}</p>
                        )}
                        <p>{billingAddress.street}</p>
                        <p>
                          {billingAddress.city}, {billingAddress.state}{' '}
                          {billingAddress.postalCode}
                        </p>
                        <p>{billingAddress.country}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Payment Methods</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingPayment(true)}
                      >
                        Add Payment Method
                      </Button>
                    </div>

                    {isAddingPayment ? (
                      <Card className="p-4">
                        <h4 className="font-medium mb-4">Add New Card</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 pt-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsAddingPayment(false)}
                            >
                              Cancel
                            </Button>
                            <Button>Add Card</Button>
                          </div>
                        </div>
                      </Card>
                    ) : paymentMethods.length > 0 ? (
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <Card key={method.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">
                                    •••• •••• •••• {method.lastFour}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Expires {method.expiryDate}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          No payment methods added yet.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingPayment(true)}
                        >
                          Add Payment Method
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-lg">
                      <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="pt-2">
                            <Button>Update Password</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-factor authentication</p>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button variant="outline">Enable 2FA</Button>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                        <div className="border border-red-100 bg-red-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Delete Account</p>
                              <p className="text-sm text-red-600">
                                Permanently delete your account and all associated data
                              </p>
                            </div>
                            <Button variant="destructive">Delete Account</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Account activity</p>
                              <p className="text-sm text-gray-500">
                                Important notifications about your account
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Newsletter</p>
                              <p className="text-sm text-gray-500">
                                Updates, announcements, and product news
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Promotions</p>
                              <p className="text-sm text-gray-500">
                                Special offers and discounts
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">New messages</p>
                              <p className="text-sm text-gray-500">
                                Get notified about new messages
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Reminders</p>
                              <p className="text-sm text-gray-500">
                                Get reminders for important tasks
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
