import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSectionsApi,
  getSectionByIdApi,
  createSectionApi,
  updateSectionApi,
  deleteSectionApi,
} from '../../api/sections';

const initialState = {
  sections: [],
  selectedSection: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchSections = createAsyncThunk(
  'sections/fetchSections',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSectionsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sections');
    }
  }
);

export const fetchSectionById = createAsyncThunk(
  'sections/fetchSectionById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getSectionByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch section');
    }
  }
);

export const createSection = createAsyncThunk(
  'sections/createSection',
  async (sectionData, { rejectWithValue }) => {
    try {
      const data = await createSectionApi(sectionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create section');
    }
  }
);

export const updateSection = createAsyncThunk(
  'sections/updateSection',
  async ({ id, sectionData }, { rejectWithValue }) => {
    try {
      const data = await updateSectionApi(id, sectionData);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update section');
    }
  }
);

export const deleteSection = createAsyncThunk(
  'sections/deleteSection',
  async (id, { rejectWithValue }) => {
    try {
      await deleteSectionApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete section');
    }
  }
);

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    clearSelectedSection: (state) => {
      state.selectedSection = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sections
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch section by ID
      .addCase(fetchSectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSection = action.payload;
      })
      .addCase(fetchSectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create section
      .addCase(createSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update section
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sections.findIndex(section => section.id === action.payload.id);
        if (index !== -1) {
          state.sections[index] = action.payload.data;
        }
        if (state.selectedSection && state.selectedSection.id === action.payload.id) {
          state.selectedSection = action.payload.data;
        }
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete section
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter(section => section.id !== action.payload);
        if (state.selectedSection && state.selectedSection.id === action.payload) {
          state.selectedSection = null;
        }
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSection, clearError } = sectionsSlice.actions;
export default sectionsSlice.reducer; 