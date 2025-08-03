import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getPlacementDatesApi, 
  getPlacementDateByIdApi, 
  createPlacementDateApi, 
  updatePlacementDateApi, 
  deletePlacementDateApi 
} from '../../api/placementDates';

// Async thunk for fetching all placement dates
export const fetchPlacementDates = createAsyncThunk(
  'placementDates/fetchPlacementDates',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getPlacementDatesApi(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch placement dates.'
      );
    }
  }
);

// Async thunk for fetching individual placement date
export const fetchPlacementDateById = createAsyncThunk(
  'placementDates/fetchPlacementDateById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getPlacementDateByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch placement date.'
      );
    }
  }
);

// Async thunk for creating placement date
export const createPlacementDate = createAsyncThunk(
  'placementDates/createPlacementDate',
  async (placementDateData, { rejectWithValue }) => {
    try {
      const data = await createPlacementDateApi(placementDateData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create placement date.'
      );
    }
  }
);

// Async thunk for updating placement date
export const updatePlacementDate = createAsyncThunk(
  'placementDates/updatePlacementDate',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updatePlacementDateApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update placement date.'
      );
    }
  }
);

// Async thunk for deleting placement date
export const deletePlacementDate = createAsyncThunk(
  'placementDates/deletePlacementDate',
  async (id, { rejectWithValue }) => {
    try {
      await deletePlacementDateApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete placement date.'
      );
    }
  }
);

const initialState = {
  placementDates: [],
  selectedPlacementDate: null,
  loading: false,
  error: null,
};

const placementDatesSlice = createSlice({
  name: 'placementDates',
  initialState,
  reducers: {
    clearSelectedPlacementDate: (state) => {
      state.selectedPlacementDate = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all placement dates
      .addCase(fetchPlacementDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacementDates.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.placementDates = action.payload;
      })
      .addCase(fetchPlacementDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch placement dates.';
      })
      // Fetch individual placement date
      .addCase(fetchPlacementDateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacementDateById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedPlacementDate = action.payload;
      })
      .addCase(fetchPlacementDateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch placement date.';
      })
      // Create placement date
      .addCase(createPlacementDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlacementDate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.placementDates.push(action.payload);
      })
      .addCase(createPlacementDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create placement date.';
      })
      // Update placement date
      .addCase(updatePlacementDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlacementDate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.placementDates.findIndex(date => date.id === action.payload.id);
        if (index !== -1) {
          state.placementDates[index] = action.payload.data;
        }
        if (state.selectedPlacementDate && state.selectedPlacementDate.id === action.payload.id) {
          state.selectedPlacementDate = action.payload.data;
        }
      })
      .addCase(updatePlacementDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update placement date.';
      })
      // Delete placement date
      .addCase(deletePlacementDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlacementDate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.placementDates = state.placementDates.filter(date => date.id !== action.payload);
        if (state.selectedPlacementDate && state.selectedPlacementDate.id === action.payload) {
          state.selectedPlacementDate = null;
        }
      })
      .addCase(deletePlacementDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete placement date.';
      });
  },
});

export const { clearSelectedPlacementDate, clearError } = placementDatesSlice.actions;
export default placementDatesSlice.reducer; 