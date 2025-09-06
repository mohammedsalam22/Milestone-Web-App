import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardAPI from '../../api/dashboard';

// Initial state
const initialState = {
  data: {
    total_students: 0,
    total_employees: 0,
    latest_events: [],
    today_attendance_count: 0,
    latest_fee: null,
    latest_discount: null,
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardAPI.getDashboardData();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDashboard: (state) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard data
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

// Export actions
export const { clearError, resetDashboard } = dashboardSlice.actions;

// Export selectors
export const selectDashboardData = (state) => state.dashboard.data;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;

// Export reducer
export default dashboardSlice.reducer;
