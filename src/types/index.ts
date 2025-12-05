export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    dashboardTabHandler?: {
      activeTab?: string;
      onTabChange?: (tab: string) => void;
    };
  }

  export interface FormData {
    fullName: string;
    businessName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    hasExistingWebsite: boolean;
    websiteUrl?: string;
  }