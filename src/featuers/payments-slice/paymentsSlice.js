import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentsApi } from '../../api/payments';

// Async thunks
export const fetchStudentPayments = createAsyncThunk(
  'payments/fetchStudentPayments',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await paymentsApi.getStudentPayments(studentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student payments');
    }
  }
);

export const fetchAllPayments = createAsyncThunk(
  'payments/fetchAllPayments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await paymentsApi.getAllPayments(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payments');
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentsApi.createPayment(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payment');
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ paymentId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await paymentsApi.updatePayment(paymentId, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update payment');
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await paymentsApi.deletePayment(paymentId);
      return paymentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete payment');
    }
  }
);

const initialState = {
  studentPayments: [],
  allPayments: [],
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearStudentPayments: (state) => {
      state.studentPayments = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch student payments
      .addCase(fetchStudentPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.studentPayments = action.payload;
      })
      .addCase(fetchStudentPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch all payments
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.allPayments = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.studentPayments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.studentPayments.findIndex(payment => payment.id === action.payload.id);
        if (index !== -1) {
          state.studentPayments[index] = action.payload;
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete payment
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.studentPayments = state.studentPayments.filter(payment => payment.id !== action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStudentPayments, clearError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
