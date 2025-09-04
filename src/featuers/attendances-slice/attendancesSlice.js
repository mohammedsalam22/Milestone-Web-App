import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAttendancesApi, 
  getAttendanceByIdApi, 
  getStudentAttendancesApi,
  createAttendanceApi,
  createDailyAttendanceApi,
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
        error.response?.data?.detail || 'Failed to fetch absence records.'
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
        error.response?.data?.detail || 'Failed to fetch absence record.'
      );
    }
  }
);

export const fetchStudentAttendances = createAsyncThunk(
  'attendances/fetchStudentAttendances',
  async (studentId, { rejectWithValue }) => {
    try {
      const data = await getStudentAttendancesApi(studentId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch student attendance records.'
      );
    }
  }
);

export const createDailyAttendance = createAsyncThunk(
  'attendances/createDailyAttendance',
  async (attendancesData, { rejectWithValue }) => {
    try {
      const data = await createDailyAttendanceApi(attendancesData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create daily absence records.'
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
        error.response?.data?.detail || 'Failed to create absence record.'
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
        error.response?.data?.detail || 'Failed to update absence record.'
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
        error.response?.data?.detail || 'Failed to delete absence record.'
      );
    }
  }
);

const initialState = {
  attendances: [],
  selectedAttendance: null,
  studentAttendances: [],
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
      // Fetch student attendances
      .addCase(fetchStudentAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAttendances.fulfilled, (state, action) => {
        state.loading = false;
        state.studentAttendances = action.payload;
      })
      .addCase(fetchStudentAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create daily attendance
      .addCase(createDailyAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDailyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        // Add all new attendances to the state
        if (Array.isArray(action.payload)) {
          state.attendances.push(...action.payload);
        } else {
          state.attendances.push(action.payload);
        }
      })
      .addCase(createDailyAttendance.rejected, (state, action) => {
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
