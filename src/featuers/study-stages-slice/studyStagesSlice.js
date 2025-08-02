import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStudyStagesApi,
  getStudyStageByIdApi,
  createStudyStageApi,
  updateStudyStageApi,
  deleteStudyStageApi,
} from '../../api/studyStages';

const initialState = {
  studyStages: [],
  selectedStudyStage: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchStudyStages = createAsyncThunk(
  'studyStages/fetchStudyStages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStudyStagesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch study stages');
    }
  }
);

export const fetchStudyStageById = createAsyncThunk(
  'studyStages/fetchStudyStageById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getStudyStageByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch study stage');
    }
  }
);

export const createStudyStage = createAsyncThunk(
  'studyStages/createStudyStage',
  async (studyStageData, { rejectWithValue }) => {
    try {
      const data = await createStudyStageApi(studyStageData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create study stage');
    }
  }
);

export const updateStudyStage = createAsyncThunk(
  'studyStages/updateStudyStage',
  async ({ id, studyStageData }, { rejectWithValue }) => {
    try {
      const data = await updateStudyStageApi(id, studyStageData);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update study stage');
    }
  }
);

export const deleteStudyStage = createAsyncThunk(
  'studyStages/deleteStudyStage',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudyStageApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete study stage');
    }
  }
);

const studyStagesSlice = createSlice({
  name: 'studyStages',
  initialState,
  reducers: {
    clearSelectedStudyStage: (state) => {
      state.selectedStudyStage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch study stages
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
      // Fetch study stage by ID
      .addCase(fetchStudyStageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudyStageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudyStage = action.payload;
      })
      .addCase(fetchStudyStageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create study stage
      .addCase(createStudyStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudyStage.fulfilled, (state, action) => {
        state.loading = false;
        state.studyStages.push(action.payload);
      })
      .addCase(createStudyStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update study stage
      .addCase(updateStudyStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudyStage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.studyStages.findIndex(stage => stage.id === action.payload.id);
        if (index !== -1) {
          state.studyStages[index] = action.payload.data;
        }
        if (state.selectedStudyStage && state.selectedStudyStage.id === action.payload.id) {
          state.selectedStudyStage = action.payload.data;
        }
      })
      .addCase(updateStudyStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete study stage
      .addCase(deleteStudyStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudyStage.fulfilled, (state, action) => {
        state.loading = false;
        state.studyStages = state.studyStages.filter(stage => stage.id !== action.payload);
        if (state.selectedStudyStage && state.selectedStudyStage.id === action.payload) {
          state.selectedStudyStage = null;
        }
      })
      .addCase(deleteStudyStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedStudyStage, clearError } = studyStagesSlice.actions;
export default studyStagesSlice.reducer; 