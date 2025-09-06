import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { discountsApi } from '../../api/discounts';

// Async thunks
export const fetchAllDiscounts = createAsyncThunk(
  'discounts/fetchAllDiscounts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await discountsApi.getAllDiscounts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch discounts');
    }
  }
);

export const fetchDiscountById = createAsyncThunk(
  'discounts/fetchDiscountById',
  async (discountId, { rejectWithValue }) => {
    try {
      const response = await discountsApi.getDiscountById(discountId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch discount');
    }
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      const response = await discountsApi.createDiscount(discountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create discount');
    }
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async ({ discountId, discountData }, { rejectWithValue }) => {
    try {
      const response = await discountsApi.updateDiscount(discountId, discountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update discount');
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async (discountId, { rejectWithValue }) => {
    try {
      await discountsApi.deleteDiscount(discountId);
      return discountId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete discount');
    }
  }
);

const initialState = {
  allDiscounts: [],
  currentDiscount: null,
  loading: false,
  error: null,
};

const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDiscount: (state) => {
      state.currentDiscount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all discounts
      .addCase(fetchAllDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.allDiscounts = action.payload;
      })
      .addCase(fetchAllDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch discount by ID
      .addCase(fetchDiscountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDiscount = action.payload;
      })
      .addCase(fetchDiscountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create discount
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.allDiscounts.push(action.payload);
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update discount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allDiscounts.findIndex(discount => discount.id === action.payload.id);
        if (index !== -1) {
          state.allDiscounts[index] = action.payload;
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete discount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.allDiscounts = state.allDiscounts.filter(discount => discount.id !== action.payload);
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentDiscount } = discountsSlice.actions;
export default discountsSlice.reducer;