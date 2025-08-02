import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStaffApi, getEmployeeByIdApi, createStaffApi, updateStaffApi, deleteStaffApi } from '../../api/staff';

// Async thunk for fetching all staff
export const fetchStaff = createAsyncThunk(
  'staff/fetchStaff',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStaffApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch staff data.'
      );
    }
  }
);

// Async thunk for fetching individual employee
export const fetchEmployeeById = createAsyncThunk(
  'staff/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getEmployeeByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch employee data.'
      );
    }
  }
);

// Async thunk for creating staff
export const createStaff = createAsyncThunk(
  'staff/createStaff',
  async (staffData, { rejectWithValue }) => {
    try {
      const data = await createStaffApi(staffData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create staff member.'
      );
    }
  }
);

// Async thunk for updating staff
export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateStaffApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update staff member.'
      );
    }
  }
);

// Async thunk for deleting staff
export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStaffApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete staff member.'
      );
    }
  }
);

const initialState = {
  staff: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all staff
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.staff = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch staff.';
      })
      // Fetch individual employee
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employee.';
      })
      // Create staff
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.staff.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create staff member.';
      })
      // Update staff
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.staff.findIndex(employee => employee.id === action.payload.id);
        if (index !== -1) {
          state.staff[index] = action.payload.data;
        }
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload.id) {
          state.selectedEmployee = action.payload.data;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update staff member.';
      })
      // Delete staff
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.staff = state.staff.filter(employee => employee.id !== action.payload);
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload) {
          state.selectedEmployee = null;
        }
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete staff member.';
      });
  },
});

export const { clearSelectedEmployee, clearError } = staffSlice.actions;
export default staffSlice.reducer; 