import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feesApi } from '../../api/fees';

// Async thunks
export const fetchAllFees = createAsyncThunk(
  'fees/fetchAllFees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await feesApi.getAllFees(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fees');
    }
  }
);

export const fetchFeeById = createAsyncThunk(
  'fees/fetchFeeById',
  async (feeId, { rejectWithValue }) => {
    try {
      const response = await feesApi.getFeeById(feeId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fee');
    }
  }
);

export const createFee = createAsyncThunk(
  'fees/createFee',
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await feesApi.createFee(feeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee');
    }
  }
);

export const updateFee = createAsyncThunk(
  'fees/updateFee',
  async ({ feeId, feeData }, { rejectWithValue }) => {
    try {
      const response = await feesApi.updateFee(feeId, feeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee');
    }
  }
);

export const deleteFee = createAsyncThunk(
  'fees/deleteFee',
  async (feeId, { rejectWithValue }) => {
    try {
      await feesApi.deleteFee(feeId);
      return feeId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee');
    }
  }
);

const initialState = {
  allFees: [],
  currentFee: null,
  loading: false,
  error: null,
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentFee: (state) => {
      state.currentFee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all fees
      .addCase(fetchAllFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFees.fulfilled, (state, action) => {
        state.loading = false;
        state.allFees = action.payload;
      })
      .addCase(fetchAllFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch fee by ID
      .addCase(fetchFeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFee = action.payload;
      })
      .addCase(fetchFeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create fee
      .addCase(createFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFee.fulfilled, (state, action) => {
        state.loading = false;
        state.allFees.push(action.payload);
      })
      .addCase(createFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update fee
      .addCase(updateFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allFees.findIndex(fee => fee.id === action.payload.id);
        if (index !== -1) {
          state.allFees[index] = action.payload;
        }
      })
      .addCase(updateFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete fee
      .addCase(deleteFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.loading = false;
        state.allFees = state.allFees.filter(fee => fee.id !== action.payload);
      })
      .addCase(deleteFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentFee } = feesSlice.actions;
export default feesSlice.reducer;