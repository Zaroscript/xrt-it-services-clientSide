import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { 
  login as loginAction, 
  register as registerAction, 
  logout as logoutAction, 
  fetchCurrentUser,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
  clearError
} from '@/features/auth/authSlice';
import type { User, LoginPayload, RegisterPayload } from '@/features/auth/types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  // Check if user is logged in on mount
  useEffect(() => {
    if (status === 'idle' && !isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, status, isAuthenticated]);

  const login = async (email: string, password: string): Promise<{ user: User }> => {
    const result = await dispatch(loginAction({ email, password } as LoginPayload));
    if (loginAction.fulfilled.match(result)) {
      return { user: result.payload.user };
    }
    throw new Error(result.payload as string);
  };

  const register = async (name: string, email: string, password: string): Promise<{ user: User }> => {
    const result = await dispatch(registerAction({ name, email, password } as RegisterPayload));
    if (registerAction.fulfilled.match(result)) {
      return { user: result.payload.user };
    }
    throw new Error(result.payload as string);
  };

  const logout = async (): Promise<void> => {
    const result = await dispatch(logoutAction());
    if (logoutAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading: status === 'loading',
    error,
    login,
    register,
    logout,
    resetError,
  };
};

// Type for the useAuth hook return value
export type UseAuthReturn = ReturnType<typeof useAuth>;

// Example usage:
// const { 
//   user, 
//   isAuthenticated, 
//   isLoading, 
//   error, 
//   login, 
//   register, 
//   logout 
// } = useAuth();
