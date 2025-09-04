import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getFeesApi, 
  getFeeByIdApi, 
  createFeeApi, 
  updateFeeApi, 
  deleteFeeApi 
} from '../../api/fees';

// Async thunk for fetching all fees
export const fetchFees = createAsyncThunk(
  'fees/fetchFees',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeesApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch fees.'
      );
    }
  }
);

// Async thunk for fetching individual fee
export const fetchFeeById = createAsyncThunk(
  'fees/fetchFeeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getFeeByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch fee.'
      );
    }
  }
);

// Async thunk for creating fee
export const createFee = createAsyncThunk(
  'fees/createFee',
  async (feeData, { rejectWithValue }) => {
    try {
      const data = await createFeeApi(feeData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create fee.'
      );
    }
  }
);

// Async thunk for updating fee
export const updateFee = createAsyncThunk(
  'fees/updateFee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateFeeApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update fee.'
      );
    }
  }
);

// Async thunk for deleting fee
export const deleteFee = createAsyncThunk(
  'fees/deleteFee',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFeeApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete fee.'
      );
    }
  }
);

const initialState = {
  fees: [],
  selectedFee: null,
  loading: false,
  error: null,
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    clearSelectedFee: (state) => {
      state.selectedFee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all fees
      .addCase(fetchFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.fees = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch fees.';
      })
      // Fetch individual fee
      .addCase(fetchFeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedFee = action.payload;
      })
      .addCase(fetchFeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch fee.';
      })
      // Create fee
      .addCase(createFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.fees.push(action.payload);
      })
      .addCase(createFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create fee.';
      })
      // Update fee
      .addCase(updateFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.fees.findIndex(fee => fee.id === action.payload.id);
        if (index !== -1) {
          state.fees[index] = action.payload.data;
        }
        if (state.selectedFee && state.selectedFee.id === action.payload.id) {
          state.selectedFee = action.payload.data;
        }
      })
      .addCase(updateFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update fee.';
      })
      // Delete fee
      .addCase(deleteFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.fees = state.fees.filter(fee => fee.id !== action.payload);
        if (state.selectedFee && state.selectedFee.id === action.payload) {
          state.selectedFee = null;
        }
      })
      .addCase(deleteFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete fee.';
      });
  },
});

export const { clearSelectedFee, clearError } = feesSlice.actions;
export default feesSlice.reducer;
