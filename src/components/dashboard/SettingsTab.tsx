'use client';

import { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { clientService } from '@/services/client/client.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Building2, Save, Lock } from 'lucide-react';

export default function SettingsTab() {
  const { user, clientProfile, fetchAllUserData } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    fName: user?.fName || '',
    lName: user?.lName || '',
    phone: user?.phone || '',
    companyName: clientProfile?.companyName || '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await clientService.updateClientProfile({
        fName: formData.fName,
        lName: formData.lName,
        phone: formData.phone,
        companyName: formData.companyName,
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      await fetchAllUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fName: user?.fName || '',
      lName: user?.lName || '',
      phone: user?.phone || '',
      companyName: clientProfile?.companyName || '',
    });
    setIsEditing(false);
  };

  return (
    <div id='settings' className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fName">First Name</Label>
              <Input
                id="fName"
                value={formData.fName}
                onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lName">Last Name</Label>
              <Input
                id="lName"
                value={formData.lName}
                onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user?.email || ''}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>Your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {clientProfile?.businessLocation && (
            <div className="space-y-2">
              <Label>Business Address</Label>
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {clientProfile.businessLocation.address && <p>{clientProfile.businessLocation.address}</p>}
                {clientProfile.businessLocation.city && <p>{clientProfile.businessLocation.city}, {clientProfile.businessLocation.state} {clientProfile.businessLocation.zipCode}</p>}
                {clientProfile.businessLocation.country && <p>{clientProfile.businessLocation.country}</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed: Never
                </p>
              </div>
              <Button variant="outline" disabled>
                Change Password
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password change feature coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
