import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAttendancesApi, 
  getAttendanceByIdApi, 
  createAttendanceApi, 
  updateAttendanceApi, 
  deleteAttendanceApi 
} from '../../api/attendances';

// Async thunks
export const fetchAttendances = createAsyncThunk(
  'attendances/fetchAttendances',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getAttendancesApi(filters);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch attendances data.'
      );
    }
  }
);

export const fetchAttendanceById = createAsyncThunk(
  'attendances/fetchAttendanceById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAttendanceByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch attendance data.'
      );
    }
  }
);

export const createAttendance = createAsyncThunk(
  'attendances/createAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const data = await createAttendanceApi(attendanceData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create attendance.'
      );
    }
  }
);

export const updateAttendance = createAsyncThunk(
  'attendances/updateAttendance',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateAttendanceApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update attendance.'
      );
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  'attendances/deleteAttendance',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAttendanceApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete attendance.'
      );
    }
  }
);

const initialState = {
  attendances: [],
  selectedAttendance: null,
  loading: false,
  error: null,
  filters: {
    student__section: '',
    date: '',
  },
};

const attendancesSlice = createSlice({
  name: 'attendances',
  initialState,
  reducers: {
    clearSelectedAttendance: (state) => {
      state.selectedAttendance = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        student__section: '',
        date: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch attendances
      .addCase(fetchAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch attendance by ID
      .addCase(fetchAttendanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAttendance = action.payload;
      })
      .addCase(fetchAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create attendance
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances.push(action.payload);
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update attendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attendances.findIndex(att => att.id === action.payload.id);
        if (index !== -1) {
          state.attendances[index] = action.payload.data;
        }
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete attendance
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = state.attendances.filter(att => att.id !== action.payload);
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedAttendance,
  clearError,
  setFilters,
  clearFilters
} = attendancesSlice.actions;

export default attendancesSlice.reducer;
