'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, initializeStore } from './store/store';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize the store on the client side
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}
