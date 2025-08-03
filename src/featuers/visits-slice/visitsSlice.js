import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { visitsAPI } from '../../api/visits';

// Async thunks
export const fetchVisits = createAsyncThunk(
  'visits/fetchVisits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await visitsAPI.getVisits();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch visits');
    }
  }
);

export const fetchVisit = createAsyncThunk(
  'visits/fetchVisit',
  async (id, { rejectWithValue }) => {
    try {
      const response = await visitsAPI.getVisit(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch visit');
    }
  }
);

// Initial state
const initialState = {
  visits: [],
  currentVisit: null,
  loading: false,
  error: null,
};

// Visits slice
const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentVisit: (state) => {
      state.currentVisit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch visits
      .addCase(fetchVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.visits = action.payload;
      })
      .addCase(fetchVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single visit
      .addCase(fetchVisit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVisit = action.payload;
      })
      .addCase(fetchVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentVisit,
} = visitsSlice.actions;

export default visitsSlice.reducer; 