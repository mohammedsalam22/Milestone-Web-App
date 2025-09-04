import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getMarksApi, 
  getMarkByIdApi, 
  createMarkApi,
  createMarksBulkApi,
  updateMarkApi, 
  deleteMarkApi,
  getStudentsBySectionApi,
  getSectionsByGradeApi
} from '../../api/marks';

// Async thunks
export const fetchMarks = createAsyncThunk(
  'marks/fetchMarks',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getMarksApi(filters);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch marks.'
      );
    }
  }
);

export const fetchMarkById = createAsyncThunk(
  'marks/fetchMarkById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getMarkByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch mark.'
      );
    }
  }
);

export const createMark = createAsyncThunk(
  'marks/createMark',
  async (markData, { rejectWithValue }) => {
    try {
      const data = await createMarkApi(markData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create mark.'
      );
    }
  }
);

export const createMarks = createAsyncThunk(
  'marks/createMarks',
  async (marksData, { rejectWithValue }) => {
    try {
      // Send the entire array of marks to the bulk API
      const results = await createMarksBulkApi(marksData);
      return results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create marks.'
      );
    }
  }
);

export const updateMark = createAsyncThunk(
  'marks/updateMark',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateMarkApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update mark.'
      );
    }
  }
);

export const deleteMark = createAsyncThunk(
  'marks/deleteMark',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMarkApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete mark.'
      );
    }
  }
);

export const fetchStudentsBySection = createAsyncThunk(
  'marks/fetchStudentsBySection',
  async (sectionId, { rejectWithValue }) => {
    try {
      const data = await getStudentsBySectionApi(sectionId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch students by section.'
      );
    }
  }
);

export const fetchSectionsByGrade = createAsyncThunk(
  'marks/fetchSectionsByGrade',
  async (gradeId, { rejectWithValue }) => {
    try {
      const data = await getSectionsByGradeApi(gradeId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch sections by grade.'
      );
    }
  }
);

const initialState = {
  marks: [],
  studentsBySection: [],
  sectionsByGrade: [],
  selectedMark: null,
  loading: false,
  error: null,
  filters: {
    subject: '',
    mark_type: '',
    student__section: '',
  },
  selectedFilters: {
    subject: '',
    grade: '',
    section: '',
    mark_type: '',
  },
};

const marksSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    clearSelectedMark: (state) => {
      state.selectedMark = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = { ...state.selectedFilters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        subject: '',
        mark_type: '',
        student__section: '',
      };
      state.selectedFilters = {
        subject: '',
        grade: '',
        section: '',
        mark_type: '',
      };
    },
    clearStudentsBySection: (state) => {
      state.studentsBySection = [];
    },
    clearSectionsByGrade: (state) => {
      state.sectionsByGrade = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch marks
      .addCase(fetchMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.marks = action.payload;
      })
      .addCase(fetchMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch mark by ID
      .addCase(fetchMarkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarkById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMark = action.payload;
      })
      .addCase(fetchMarkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create mark
      .addCase(createMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMark.fulfilled, (state, action) => {
        state.loading = false;
        state.marks.push(action.payload);
      })
      .addCase(createMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create marks (bulk)
      .addCase(createMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMarks.fulfilled, (state, action) => {
        state.loading = false;
        // Add the newly created marks to the existing marks array
        // Handle both array and single object responses
        if (Array.isArray(action.payload)) {
          state.marks.push(...action.payload);
        } else {
          state.marks.push(action.payload);
        }
      })
      .addCase(createMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update mark
      .addCase(updateMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMark.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.marks.findIndex(mark => mark.id === action.payload.id);
        if (index !== -1) {
          state.marks[index] = action.payload.data;
        }
      })
      .addCase(updateMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete mark
      .addCase(deleteMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMark.fulfilled, (state, action) => {
        state.loading = false;
        state.marks = state.marks.filter(mark => mark.id !== action.payload);
      })
      .addCase(deleteMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch students by section
      .addCase(fetchStudentsBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsBySection = action.payload;
      })
      .addCase(fetchStudentsBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch sections by grade
      .addCase(fetchSectionsByGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionsByGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionsByGrade = action.payload;
      })
      .addCase(fetchSectionsByGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedMark,
  clearError,
  setFilters,
  setSelectedFilters,
  clearFilters,
  clearStudentsBySection,
  clearSectionsByGrade
} = marksSlice.actions;

export default marksSlice.reducer;
