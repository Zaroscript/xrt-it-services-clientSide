import { configureStore } from '@reduxjs/toolkit';
import authReducer, { rehydrate } from './authSlice';
import { useEffect } from 'react';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Function to rehydrate the auth state on the client side
export const initializeStore = () => {
  if (typeof window !== 'undefined') {
    // Dispatch rehydrate action on client side
    store.dispatch(rehydrate());
  }
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
