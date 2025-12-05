'use client';

import { useState, useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { clientService } from '@/services/client/client.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/custom-toast';
import { User, Building2, Save, Lock, Eye, EyeOff, Edit2, X, CheckCircle2, Mail, Phone, MapPin, Shield, AlertCircle } from 'lucide-react';
import { authService } from '@/services/auth/auth.service';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsTab() {
  const { user, clientProfile, fetchAllUserData } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formData, setFormData] = useState({
    fName: user?.fName || '',
    lName: user?.lName || '',
    phone: user?.phone || '',
    companyName: clientProfile?.companyName || '',
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id='settings' className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsChangingPassword(true);
    try {
      const result = await authService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(result.message || 'Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      
      // Refresh user data to get updated token if needed
      await fetchAllUserData();
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password. Please check your current password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'text-red-500' };
    if (strength <= 3) return { strength, label: 'Medium', color: 'text-yellow-500' };
    return { strength, label: 'Strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div id='settings' className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
            <div>
                  <CardTitle className="text-xl">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </div>
            </div>
            {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline"
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
                <Label htmlFor="fName" className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-3.5 w-3.5" />
                  First Name
                </Label>
              <Input
                id="fName"
                value={formData.fName}
                onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                disabled={!isEditing}
                  className={isEditing ? 'border-primary/20 focus:border-primary' : ''}
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lName" className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-3.5 w-3.5" />
                  Last Name
                </Label>
              <Input
                id="lName"
                value={formData.lName}
                onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                disabled={!isEditing}
                  className={isEditing ? 'border-primary/20 focus:border-primary' : ''}
              />
            </div>
          </div>

          <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                Email Address
              </Label>
              <div className="relative">
            <Input
              id="email"
              value={user?.email || ''}
              disabled
                  className="bg-muted/50 pr-10"
            />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Email cannot be changed for security reasons
              </p>
          </div>

          <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                Phone Number
              </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
                placeholder="(555) 123-4567"
                className={isEditing ? 'border-primary/20 focus:border-primary' : ''}
            />
          </div>

            <AnimatePresence>
          {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-end gap-3 pt-4 border-t"
                >
                  <Button 
                    variant="outline" 
                    onClick={handleCancel} 
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                Cancel
              </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
                </motion.div>
          )}
            </AnimatePresence>
        </CardContent>
      </Card>
      </motion.div>

      {/* Business Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Business Information</CardTitle>
                <CardDescription>Your company details and business location</CardDescription>
              </div>
            </div>
        </CardHeader>
          <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" />
                Company Name
              </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              disabled={!isEditing}
                placeholder="Your Company Name"
                className={isEditing ? 'border-primary/20 focus:border-primary' : ''}
            />
          </div>

          {clientProfile?.businessLocation && (
            <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  Business Address
                </Label>
                <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border/50 space-y-1">
                  {clientProfile.businessLocation.address && (
                    <p className="font-medium text-foreground">{clientProfile.businessLocation.address}</p>
                  )}
                  {clientProfile.businessLocation.city && (
                    <p className="text-muted-foreground">
                      {clientProfile.businessLocation.city}, {clientProfile.businessLocation.state} {clientProfile.businessLocation.zipCode}
                    </p>
                  )}
                  {clientProfile.businessLocation.country && (
                    <p className="text-muted-foreground">{clientProfile.businessLocation.country}</p>
                  )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Security</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
              </div>
            </div>
        </CardHeader>
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {!showPasswordForm ? (
                <motion.div
                  key="password-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
              <div>
                        <p className="font-semibold text-foreground">Account Password</p>
                <p className="text-sm text-muted-foreground">
                          Last updated: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPasswordForm(true)}
                      className="gap-2 border-primary/20 hover:border-primary hover:bg-primary/5"
                    >
                      <Lock className="h-4 w-4" />
                Change Password
              </Button>
            </div>
                </motion.div>
              ) : (
                <motion.form
                  key="password-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handlePasswordChange}
                  className="space-y-5"
                >
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        For security, you'll need to enter your current password to change it.
            </p>
          </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-semibold flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        disabled={isChangingPassword}
                        required
                        className="pr-10 border-primary/20 focus:border-primary"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isChangingPassword}
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-semibold flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        disabled={isChangingPassword}
                        required
                        minLength={8}
                        className="pr-10 border-primary/20 focus:border-primary"
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isChangingPassword}
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {passwordData.newPassword && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password strength:</span>
                          <span className={passwordStrength.color + ' font-semibold'}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passwordStrength.strength <= 2
                                ? 'bg-red-500'
                                : passwordStrength.strength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          />
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                          <li className={`flex items-center gap-1.5 ${passwordData.newPassword.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <CheckCircle2 className={`h-3 w-3 ${passwordData.newPassword.length >= 8 ? '' : 'opacity-30'}`} />
                            At least 8 characters
                          </li>
                          <li className={`flex items-center gap-1.5 ${passwordData.newPassword.length >= 12 ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <CheckCircle2 className={`h-3 w-3 ${passwordData.newPassword.length >= 12 ? '' : 'opacity-30'}`} />
                            At least 12 characters (recommended)
                          </li>
                          <li className={`flex items-center gap-1.5 ${/[a-z]/.test(passwordData.newPassword) && /[A-Z]/.test(passwordData.newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <CheckCircle2 className={`h-3 w-3 ${/[a-z]/.test(passwordData.newPassword) && /[A-Z]/.test(passwordData.newPassword) ? '' : 'opacity-30'}`} />
                            Mix of uppercase and lowercase
                          </li>
                          <li className={`flex items-center gap-1.5 ${/\d/.test(passwordData.newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <CheckCircle2 className={`h-3 w-3 ${/\d/.test(passwordData.newPassword) ? '' : 'opacity-30'}`} />
                            Include numbers
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        disabled={isChangingPassword}
                        required
                        className={`pr-10 border-primary/20 focus:border-primary ${
                          passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                            ? 'border-red-500 focus:border-red-500'
                            : passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword
                            ? 'border-green-500 focus:border-green-500'
                            : ''
                        }`}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isChangingPassword}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Passwords do not match
                      </p>
                    )}
                    {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      disabled={isChangingPassword}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        isChangingPassword ||
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword ||
                        passwordData.newPassword !== passwordData.confirmPassword ||
                        passwordData.newPassword.length < 8
                      }
                      className="gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Lock className="h-4 w-4" />
                      {isChangingPassword ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
