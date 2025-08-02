import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getSubjectsApi, 
  getSubjectByIdApi, 
  createSubjectApi, 
  updateSubjectApi, 
  deleteSubjectApi 
} from '../../api/subjects';

// Async thunk for fetching all subjects
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSubjectsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch subjects.'
      );
    }
  }
);

// Async thunk for fetching individual subject
export const fetchSubjectById = createAsyncThunk(
  'subjects/fetchSubjectById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getSubjectByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch subject.'
      );
    }
  }
);

// Async thunk for creating subject
export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async (subjectData, { rejectWithValue }) => {
    try {
      const data = await createSubjectApi(subjectData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create subject.'
      );
    }
  }
);

// Async thunk for updating subject
export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update subject.'
      );
    }
  }
);

// Async thunk for deleting subject
export const deleteSubject = createAsyncThunk(
  'subjects/deleteSubject',
  async (id, { rejectWithValue }) => {
    try {
      await deleteSubjectApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete subject.'
      );
    }
  }
);

const initialState = {
  subjects: [],
  selectedSubject: null,
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    clearSelectedSubject: (state) => {
      state.selectedSubject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch subjects.';
      })
      // Fetch individual subject
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedSubject = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch subject.';
      })
      // Create subject
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create subject.';
      })
      // Update subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.subjects.findIndex(subject => subject.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload.data;
        }
        if (state.selectedSubject && state.selectedSubject.id === action.payload.id) {
          state.selectedSubject = action.payload.data;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update subject.';
      })
      // Delete subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
        if (state.selectedSubject && state.selectedSubject.id === action.payload) {
          state.selectedSubject = null;
        }
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete subject.';
      });
  },
});

export const { clearSelectedSubject, clearError } = subjectsSlice.actions;
export default subjectsSlice.reducer; 