import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStudyYearsApi,
  getStudyYearByIdApi,
  createStudyYearApi,
  updateStudyYearApi,
  deleteStudyYearApi
} from '../../api/studyYears';

export const fetchStudyYears = createAsyncThunk(
  'studyYears/fetchStudyYears',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStudyYearsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch study years.'
      );
    }
  }
);

export const fetchStudyYearById = createAsyncThunk(
  'studyYears/fetchStudyYearById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getStudyYearByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch study year.'
      );
    }
  }
);

export const createStudyYear = createAsyncThunk(
  'studyYears/createStudyYear',
  async (studyYearData, { rejectWithValue }) => {
    try {
      const data = await createStudyYearApi(studyYearData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create study year.'
      );
    }
  }
);

export const updateStudyYear = createAsyncThunk(
  'studyYears/updateStudyYear',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateStudyYearApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update study year.'
      );
    }
  }
);

export const deleteStudyYear = createAsyncThunk(
  'studyYears/deleteStudyYear',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudyYearApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete study year.'
      );
    }
  }
);

const initialState = {
  studyYears: [],
  selectedStudyYear: null,
  loading: false,
  error: null,
};

const studyYearsSlice = createSlice({
  name: 'studyYears',
  initialState,
  reducers: {
    clearSelectedStudyYear: (state) => {
      state.selectedStudyYear = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all study years
      .addCase(fetchStudyYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudyYears.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studyYears = action.payload;
      })
      .addCase(fetchStudyYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch study year by ID
      .addCase(fetchStudyYearById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudyYearById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedStudyYear = action.payload;
      })
      .addCase(fetchStudyYearById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create study year
      .addCase(createStudyYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudyYear.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studyYears.push(action.payload);
      })
      .addCase(createStudyYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update study year
      .addCase(updateStudyYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudyYear.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.studyYears.findIndex(studyYear => studyYear.id === action.payload.id);
        if (index !== -1) {
          state.studyYears[index] = action.payload.data;
        }
        if (state.selectedStudyYear && state.selectedStudyYear.id === action.payload.id) {
          state.selectedStudyYear = action.payload.data;
        }
      })
      .addCase(updateStudyYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete study year
      .addCase(deleteStudyYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudyYear.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studyYears = state.studyYears.filter(studyYear => studyYear.id !== action.payload);
        if (state.selectedStudyYear && state.selectedStudyYear.id === action.payload) {
          state.selectedStudyYear = null;
        }
      })
      .addCase(deleteStudyYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedStudyYear, clearError } = studyYearsSlice.actions;
export default studyYearsSlice.reducer; 