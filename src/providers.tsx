'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store, initializeStore } from './store/store';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode,
  session?: any 
}) {
  // Initialize the store on the client side
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Provider>
    </SessionProvider>
  );
}
