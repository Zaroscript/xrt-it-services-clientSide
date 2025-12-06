// Utility functions for handling company logos

// Get API base URL for logo - use the same configuration as the rest of the app
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const getApiBaseUrl = (): string => {
  return API_URL;
};

// Construct full logo URL
export const getLogoUrl = (logoPath: string | undefined | null): string | undefined => {
  if (!logoPath) {
    return undefined;
  }
  
  // If already a full URL, return as is
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    return logoPath;
  }
  
  // For logo files, use the server base URL without /api/v1 since uploads are served statically
  const serverBaseUrl = process.env.NEXT_PUBLIC_API_URL ? 
    process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '') : 
    'http://localhost:5000';
  
  const fullUrl = `${serverBaseUrl}${logoPath.startsWith('/') ? '' : '/'}${logoPath}`;
  // Add cache-busting parameter to prevent browser caching issues
  const cacheBustedUrl = `${fullUrl}?t=${Date.now()}`;
  return cacheBustedUrl;
};

// Convert logo URL to data URL for PDF compatibility
export const convertToDataUrl = async (url: string): Promise<string | undefined> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch logo:', response.status, response.statusText);
      return undefined;
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        resolve(undefined);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert logo to data URL:', error);
    return undefined;
  }
};
