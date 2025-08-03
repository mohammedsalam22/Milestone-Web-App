import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placementTestsApi from '../../api/placementTests';

// Async thunks
export const fetchPlacementTests = createAsyncThunk(
  'placementTests/fetchPlacementTests',
  async (_, { rejectWithValue }) => {
    try {
      const data = await placementTestsApi.getPlacementTests();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch placement tests');
    }
  }
);

export const updatePlacementTest = createAsyncThunk(
  'placementTests/updatePlacementTest',
  async ({ id, placementData }, { rejectWithValue }) => {
    try {
      const data = await placementTestsApi.updatePlacementTest(id, placementData);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update placement test');
    }
  }
);

export const registerStudent = createAsyncThunk(
  'placementTests/registerStudent',
  async (placementData, { rejectWithValue }) => {
    try {
      const data = await placementTestsApi.registerStudent(placementData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register student');
    }
  }
);

const initialState = {
  placementTests: [],
  loading: false,
  error: null,
  updateLoading: false,
  registerLoading: false,
  searchTerm: '',
  selectedResult: '',
  selectedReligion: '',
};

const placementTestsSlice = createSlice({
  name: 'placementTests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPlacementTests: (state) => {
      state.placementTests = [];
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedResult: (state, action) => {
      state.selectedResult = action.payload;
    },
    setSelectedReligion: (state, action) => {
      state.selectedReligion = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedResult = '';
      state.selectedReligion = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch placement tests
      .addCase(fetchPlacementTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacementTests.fulfilled, (state, action) => {
        state.loading = false;
        state.placementTests = action.payload;
      })
      .addCase(fetchPlacementTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update placement test
      .addCase(updatePlacementTest.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updatePlacementTest.fulfilled, (state, action) => {
        state.updateLoading = false;
        const { id, data } = action.payload;
        const index = state.placementTests.findIndex(test => test.id === id);
        if (index !== -1) {
          state.placementTests[index] = { ...state.placementTests[index], ...data };
        }
      })
      .addCase(updatePlacementTest.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      // Register student
      .addCase(registerStudent.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.registerLoading = false;
        // Remove the placement test from the list since student is now registered
        const placementId = action.payload.placement?.id;
        if (placementId) {
          state.placementTests = state.placementTests.filter(test => test.id !== placementId);
        }
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearPlacementTests, 
  setSearchTerm, 
  setSelectedResult, 
  setSelectedReligion, 
  clearFilters 
} = placementTestsSlice.actions;
export default placementTestsSlice.reducer; 