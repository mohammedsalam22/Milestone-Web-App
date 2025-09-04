import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getMarksApi, 
  getMarkByIdApi, 
  getStudentMarksApi,
  createMarkApi,
  createMarksBulkApi,
  updateMarkApi
} from '../../api/marks';
import { getStudentsBySectionApi } from '../../api/students';
import { getSectionsByGradeApi } from '../../api/sections';
import { getSubjectsByGradeApi } from '../../api/subjects';
import { getStudyStagesApi } from '../../api/studyStages';
import { getGradesByStudyStageApi } from '../../api/grades';

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

export const fetchStudentMarks = createAsyncThunk(
  'marks/fetchStudentMarks',
  async (studentId, { rejectWithValue }) => {
    try {
      const data = await getStudentMarksApi(studentId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch student marks.'
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

// For cooperators - fetch subjects by grade
export const fetchSubjectsByGrade = createAsyncThunk(
  'marks/fetchSubjectsByGrade',
  async (gradeId, { rejectWithValue }) => {
    try {
      const data = await getSubjectsByGradeApi(gradeId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch subjects by grade.'
      );
    }
  }
);

// For cooperators - fetch study stages
export const fetchStudyStages = createAsyncThunk(
  'marks/fetchStudyStages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStudyStagesApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch study stages.'
      );
    }
  }
);

// For cooperators - fetch grades by study stage
export const fetchGradesByStudyStage = createAsyncThunk(
  'marks/fetchGradesByStudyStage',
  async (studyStageId, { rejectWithValue }) => {
    try {
      const data = await getGradesByStudyStageApi(studyStageId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch grades by study stage.'
      );
    }
  }
);

const initialState = {
  marks: [],
  studentsBySection: [],
  sectionsByGrade: [],
  studentMarks: [],
  // For cooperators
  subjectsByGrade: [],
  studyStages: [],
  gradesByStudyStage: [],
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
    // For cooperators
    study_stage: '',
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
    // For cooperators
    clearSubjectsByGrade: (state) => {
      state.subjectsByGrade = [];
    },
    clearGradesByStudyStage: (state) => {
      state.gradesByStudyStage = [];
    },
    clearStudyStages: (state) => {
      state.studyStages = [];
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
      // Fetch student marks
      .addCase(fetchStudentMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.studentMarks = action.payload;
      })
      .addCase(fetchStudentMarks.rejected, (state, action) => {
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
      })
      // Fetch subjects by grade (for cooperators)
      .addCase(fetchSubjectsByGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsByGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectsByGrade = action.payload;
      })
      .addCase(fetchSubjectsByGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch study stages (for cooperators)
      .addCase(fetchStudyStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudyStages.fulfilled, (state, action) => {
        state.loading = false;
        state.studyStages = action.payload;
      })
      .addCase(fetchStudyStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch grades by study stage (for cooperators)
      .addCase(fetchGradesByStudyStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradesByStudyStage.fulfilled, (state, action) => {
        state.loading = false;
        state.gradesByStudyStage = action.payload;
      })
      .addCase(fetchGradesByStudyStage.rejected, (state, action) => {
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
  clearSectionsByGrade,
  clearSubjectsByGrade,
  clearGradesByStudyStage,
  clearStudyStages,
} = marksSlice.actions;

export default marksSlice.reducer;
