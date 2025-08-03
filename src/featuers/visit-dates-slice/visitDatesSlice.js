import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { visitDatesAPI } from '../../api/visitDates';

// Async thunks
export const fetchVisitDates = createAsyncThunk(
  'visitDates/fetchVisitDates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await visitDatesAPI.getVisitDates();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch visit dates');
    }
  }
);

export const fetchVisitDate = createAsyncThunk(
  'visitDates/fetchVisitDate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await visitDatesAPI.getVisitDate(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch visit date');
    }
  }
);

export const createVisitDate = createAsyncThunk(
  'visitDates/createVisitDate',
  async (visitDateData, { rejectWithValue }) => {
    try {
      const response = await visitDatesAPI.createVisitDate(visitDateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create visit date');
    }
  }
);

export const updateVisitDate = createAsyncThunk(
  'visitDates/updateVisitDate',
  async ({ id, visitDateData }, { rejectWithValue }) => {
    try {
      const response = await visitDatesAPI.updateVisitDate(id, visitDateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update visit date');
    }
  }
);

export const deleteVisitDate = createAsyncThunk(
  'visitDates/deleteVisitDate',
  async (id, { rejectWithValue }) => {
    try {
      await visitDatesAPI.deleteVisitDate(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete visit date');
    }
  }
);

// Initial state
const initialState = {
  visitDates: [],
  currentVisitDate: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Visit dates slice
const visitDatesSlice = createSlice({
  name: 'visitDates',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentVisitDate: (state) => {
      state.currentVisitDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch visit dates
      .addCase(fetchVisitDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitDates.fulfilled, (state, action) => {
        state.loading = false;
        state.visitDates = action.payload;
      })
      .addCase(fetchVisitDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single visit date
      .addCase(fetchVisitDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitDate.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVisitDate = action.payload;
      })
      .addCase(fetchVisitDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create visit date
      .addCase(createVisitDate.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createVisitDate.fulfilled, (state, action) => {
        state.createLoading = false;
        state.visitDates.unshift(action.payload);
      })
      .addCase(createVisitDate.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      
      // Update visit date
      .addCase(updateVisitDate.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateVisitDate.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.visitDates.findIndex(vd => vd.id === action.payload.id);
        if (index !== -1) {
          state.visitDates[index] = action.payload;
        }
        if (state.currentVisitDate && state.currentVisitDate.id === action.payload.id) {
          state.currentVisitDate = action.payload;
        }
      })
      .addCase(updateVisitDate.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      
      // Delete visit date
      .addCase(deleteVisitDate.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteVisitDate.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.visitDates = state.visitDates.filter(vd => vd.id !== action.payload);
        if (state.currentVisitDate && state.currentVisitDate.id === action.payload) {
          state.currentVisitDate = null;
        }
      })
      .addCase(deleteVisitDate.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentVisitDate,
} = visitDatesSlice.actions;

export default visitDatesSlice.reducer; 