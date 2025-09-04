import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getDiscountsApi, 
  getDiscountByIdApi, 
  createDiscountApi, 
  updateDiscountApi, 
  deleteDiscountApi 
} from '../../api/discounts';

// Async thunk for fetching all discounts
export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDiscountsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch discounts.'
      );
    }
  }
);

// Async thunk for fetching individual discount
export const fetchDiscountById = createAsyncThunk(
  'discounts/fetchDiscountById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getDiscountByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch discount.'
      );
    }
  }
);

// Async thunk for creating discount
export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      const data = await createDiscountApi(discountData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create discount.'
      );
    }
  }
);

// Async thunk for updating discount
export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateDiscountApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update discount.'
      );
    }
  }
);

// Async thunk for deleting discount
export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDiscountApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete discount.'
      );
    }
  }
);

const initialState = {
  discounts: [],
  selectedDiscount: null,
  loading: false,
  error: null,
};

const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearSelectedDiscount: (state) => {
      state.selectedDiscount = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all discounts
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch discounts.';
      })
      // Fetch individual discount
      .addCase(fetchDiscountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedDiscount = action.payload;
      })
      .addCase(fetchDiscountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch discount.';
      })
      // Create discount
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.discounts.push(action.payload);
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create discount.';
      })
      // Update discount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.discounts.findIndex(discount => discount.id === action.payload.id);
        if (index !== -1) {
          state.discounts[index] = action.payload.data;
        }
        if (state.selectedDiscount && state.selectedDiscount.id === action.payload.id) {
          state.selectedDiscount = action.payload.data;
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update discount.';
      })
      // Delete discount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.discounts = state.discounts.filter(discount => discount.id !== action.payload);
        if (state.selectedDiscount && state.selectedDiscount.id === action.payload) {
          state.selectedDiscount = null;
        }
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete discount.';
      });
  },
});

export const { clearSelectedDiscount, clearError } = discountsSlice.actions;
export default discountsSlice.reducer;
