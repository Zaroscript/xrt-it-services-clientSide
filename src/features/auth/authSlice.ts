import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { authService } from '@/services/auth/AuthService';
import { 
  AuthState, 
  LoginPayload, 
  RegisterPayload, 
  initialState, 
  ApiError,
  isApiError
} from './types';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(
        isApiError(error) 
          ? error.message 
          : 'An unexpected error occurred during login'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return rejectWithValue(
        isApiError(error)
          ? error.message
          : 'An unexpected error occurred during registration'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('No user logged in');
      }
      return { user };
    } catch (error) {
      return rejectWithValue(
        isApiError(error)
          ? error.message
          : 'Failed to fetch current user'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return rejectWithValue(
        isApiError(error)
          ? error.message
          : 'An error occurred during logout'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
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
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.status = 'idle';
      state.user = null;
      state.token = null;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'idle';
      state.user = null;
      state.token = null;
      state.error = null;
    });
  },
});

// Actions
export const { clearError, setCredentials } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;