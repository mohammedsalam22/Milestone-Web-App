// src/features/myFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/auth';

// Async thunk for login
export const login = createAsyncThunk(
  'login/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Login failed. Please try again.'
      );
    }
  }
);

// Utility functions for localStorage
const STORAGE_KEY = 'auth';
const saveAuthToStorage = (state) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      user: state.user,
      access: state.access,
      refresh: state.refresh,
    })
  );
};
const clearAuthFromStorage = () => localStorage.removeItem(STORAGE_KEY);
const loadAuthFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initialStateFromStorage = loadAuthFromStorage() || {
  user: null,
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateFromStorage,
  reducers: {
    logout(state) {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.error = null;
      state.loading = false;
      clearAuthFromStorage();
    },
    rehydrate(state) {
      const data = loadAuthFromStorage();
      if (data) {
        state.user = data.user;
        state.access = data.access;
        state.refresh = data.refresh;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
          username: action.payload.user.username,
          role: action.payload.user.role,
          ...action.payload.user,
        };
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        saveAuthToStorage(state);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed.';
      });
  },
});

export const { logout, rehydrate } = loginSlice.actions;
export default loginSlice.reducer;