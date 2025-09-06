import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feeAssignmentsApi } from '../../api/feeAssignments';

// Async thunks
export const fetchStudentFeeAssignments = createAsyncThunk(
  'feeAssignments/fetchStudentFeeAssignments',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await feeAssignmentsApi.getStudentFeeAssignments(studentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student fee assignments');
    }
  }
);

export const fetchAllFeeAssignments = createAsyncThunk(
  'feeAssignments/fetchAllFeeAssignments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await feeAssignmentsApi.getAllFeeAssignments(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fee assignments');
    }
  }
);

export const createFeeAssignment = createAsyncThunk(
  'feeAssignments/createFeeAssignment',
  async (feeAssignmentData, { rejectWithValue }) => {
    try {
      const response = await feeAssignmentsApi.createFeeAssignment(feeAssignmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee assignment');
    }
  }
);

export const updateFeeAssignment = createAsyncThunk(
  'feeAssignments/updateFeeAssignment',
  async ({ feeAssignmentId, feeAssignmentData }, { rejectWithValue }) => {
    try {
      const response = await feeAssignmentsApi.updateFeeAssignment(feeAssignmentId, feeAssignmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee assignment');
    }
  }
);

export const deleteFeeAssignment = createAsyncThunk(
  'feeAssignments/deleteFeeAssignment',
  async (feeAssignmentId, { rejectWithValue }) => {
    try {
      await feeAssignmentsApi.deleteFeeAssignment(feeAssignmentId);
      return feeAssignmentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee assignment');
    }
  }
);

const initialState = {
  studentFeeAssignments: [],
  allFeeAssignments: [],
  loading: false,
  error: null,
};

const feeAssignmentsSlice = createSlice({
  name: 'feeAssignments',
  initialState,
  reducers: {
    clearStudentFeeAssignments: (state) => {
      state.studentFeeAssignments = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch student fee assignments
      .addCase(fetchStudentFeeAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentFeeAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.studentFeeAssignments = action.payload;
      })
      .addCase(fetchStudentFeeAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch all fee assignments
      .addCase(fetchAllFeeAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeeAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.allFeeAssignments = action.payload;
      })
      .addCase(fetchAllFeeAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create fee assignment
      .addCase(createFeeAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeeAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.studentFeeAssignments.push(action.payload);
      })
      .addCase(createFeeAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update fee assignment
      .addCase(updateFeeAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeeAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.studentFeeAssignments.findIndex(feeAssignment => feeAssignment.id === action.payload.id);
        if (index !== -1) {
          state.studentFeeAssignments[index] = action.payload;
        }
      })
      .addCase(updateFeeAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete fee assignment
      .addCase(deleteFeeAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeeAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.studentFeeAssignments = state.studentFeeAssignments.filter(feeAssignment => feeAssignment.id !== action.payload);
      })
      .addCase(deleteFeeAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStudentFeeAssignments, clearError } = feeAssignmentsSlice.actions;
export default feeAssignmentsSlice.reducer;
