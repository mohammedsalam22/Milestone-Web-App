import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { activitiesAPI } from '../../api/activities';

// Async thunks
export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await activitiesAPI.getActivities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch activities');
    }
  }
);

export const fetchActivity = createAsyncThunk(
  'activities/fetchActivity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await activitiesAPI.getActivity(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch activity');
    }
  }
);

export const createActivity = createAsyncThunk(
  'activities/createActivity',
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await activitiesAPI.createActivity(activityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create activity');
    }
  }
);

export const updateActivity = createAsyncThunk(
  'activities/updateActivity',
  async ({ id, activityData }, { rejectWithValue }) => {
    try {
      const response = await activitiesAPI.updateActivity(id, activityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update activity');
    }
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async (id, { rejectWithValue }) => {
    try {
      await activitiesAPI.deleteActivity(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete activity');
    }
  }
);

// Initial state
const initialState = {
  activities: [],
  currentActivity: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Activities slice
const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentActivity: (state) => {
      state.currentActivity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch activities
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single activity
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentActivity = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create activity
      .addCase(createActivity.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.createLoading = false;
        state.activities.unshift(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      
      // Update activity
      .addCase(updateActivity.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.activities.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
        if (state.currentActivity && state.currentActivity.id === action.payload.id) {
          state.currentActivity = action.payload;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      
      // Delete activity
      .addCase(deleteActivity.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.activities = state.activities.filter(a => a.id !== action.payload);
        if (state.currentActivity && state.currentActivity.id === action.payload) {
          state.currentActivity = null;
        }
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentActivity,
} = activitiesSlice.actions;

export default activitiesSlice.reducer; 