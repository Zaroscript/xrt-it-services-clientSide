import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { authService } from '@/services/auth/AuthService';
import { 
  LoginPayload, 
  RegisterData, 
  User,
  UpdateProfilePayload,
  AuthResponse,
  isApiError
} from './types';

// Define the auth state type
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Invalid email or password'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Registration failed',
        code: error.code || 'REGISTRATION_FAILED'
      });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('No active session');
      }
      return { user };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch user'
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await authService.logout();
  dispatch(resetAuthState());
});

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: UpdateProfilePayload, { rejectWithValue, getState }) => {
    try {
      // In a real app, you would make an API call to update the profile
      // For now, we'll just return the updated data
      return {
        ...profileData,
        // Ensure we have the current user data
        ...(getState() as RootState).auth.user,
      };
    } catch (error) {
      return rejectWithValue(
        isApiError(error)
          ? error.message
          : 'Failed to update profile. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetAuthState(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Update Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.status = 'idle';
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'idle';
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

// Actions
export const { clearError, setCredentials, updateProfile, resetAuthState } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;