import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { programsAPI } from '../../api/programs';

// Async thunks
export const fetchPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await programsAPI.getPrograms();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch programs');
    }
  }
);

export const fetchProgram = createAsyncThunk(
  'programs/fetchProgram',
  async (id, { rejectWithValue }) => {
    try {
      const response = await programsAPI.getProgram(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch program');
    }
  }
);

export const createProgram = createAsyncThunk(
  'programs/createProgram',
  async (programData, { rejectWithValue }) => {
    try {
      const response = await programsAPI.createProgram(programData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create program');
    }
  }
);

export const updateProgram = createAsyncThunk(
  'programs/updateProgram',
  async ({ id, programData }, { rejectWithValue }) => {
    try {
      const response = await programsAPI.updateProgram(id, programData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update program');
    }
  }
);

export const deleteProgram = createAsyncThunk(
  'programs/deleteProgram',
  async (id, { rejectWithValue }) => {
    try {
      await programsAPI.deleteProgram(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete program');
    }
  }
);

// Initial state
const initialState = {
  programs: [],
  currentProgram: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Programs slice
const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProgram: (state) => {
      state.currentProgram = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch programs
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single program
      .addCase(fetchProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProgram = action.payload;
      })
      .addCase(fetchProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create program
      .addCase(createProgram.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.createLoading = false;
        state.programs.unshift(action.payload);
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      
      // Update program
      .addCase(updateProgram.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.programs.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.programs[index] = action.payload;
        }
        if (state.currentProgram && state.currentProgram.id === action.payload.id) {
          state.currentProgram = action.payload;
        }
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      
      // Delete program
      .addCase(deleteProgram.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.programs = state.programs.filter(p => p.id !== action.payload);
        if (state.currentProgram && state.currentProgram.id === action.payload) {
          state.currentProgram = null;
        }
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentProgram,
} = programsSlice.actions;

export default programsSlice.reducer; 