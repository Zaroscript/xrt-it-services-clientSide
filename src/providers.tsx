'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store, initializeStore } from './store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize the store on the client side
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
