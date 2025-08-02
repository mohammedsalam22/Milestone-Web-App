import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGradesApi,
  getGradeByIdApi,
  createGradeApi,
  updateGradeApi,
  deleteGradeApi,
} from '../../api/grades';

const initialState = {
  grades: [],
  selectedGrade: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchGrades = createAsyncThunk(
  'grades/fetchGrades',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getGradesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch grades');
    }
  }
);

export const fetchGradeById = createAsyncThunk(
  'grades/fetchGradeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getGradeByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch grade');
    }
  }
);

export const createGrade = createAsyncThunk(
  'grades/createGrade',
  async (gradeData, { rejectWithValue }) => {
    try {
      const data = await createGradeApi(gradeData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create grade');
    }
  }
);

export const updateGrade = createAsyncThunk(
  'grades/updateGrade',
  async ({ id, gradeData }, { rejectWithValue }) => {
    try {
      const data = await updateGradeApi(id, gradeData);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update grade');
    }
  }
);

export const deleteGrade = createAsyncThunk(
  'grades/deleteGrade',
  async (id, { rejectWithValue }) => {
    try {
      await deleteGradeApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete grade');
    }
  }
);

const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    clearSelectedGrade: (state) => {
      state.selectedGrade = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch grades
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch grade by ID
      .addCase(fetchGradeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGrade = action.payload;
      })
      .addCase(fetchGradeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create grade
      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades.push(action.payload);
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update grade
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.grades.findIndex(grade => grade.id === action.payload.id);
        if (index !== -1) {
          state.grades[index] = action.payload.data;
        }
        if (state.selectedGrade && state.selectedGrade.id === action.payload.id) {
          state.selectedGrade = action.payload.data;
        }
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete grade
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = state.grades.filter(grade => grade.id !== action.payload);
        if (state.selectedGrade && state.selectedGrade.id === action.payload) {
          state.selectedGrade = null;
        }
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedGrade, clearError } = gradesSlice.actions;
export default gradesSlice.reducer; 