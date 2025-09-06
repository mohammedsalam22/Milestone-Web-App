import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllSchedulesApi,
  getSchedulesBySectionApi,
  createScheduleApi,
  updateScheduleApi,
  deleteScheduleApi,
  filterSchedulesByGrade,
  filterSchedulesBySection,
} from '../../api/schedule';
import { getSectionsApi } from '../../api/sections';

const initialState = {
  allSchedules: [],
  sections: [],
  selectedSection: null,
  selectedSectionSchedules: [],
  loading: false,
  sectionsLoading: false,
  error: null,
};

// Async thunks
export const fetchAllSchedules = createAsyncThunk(
  'schedule/fetchAllSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllSchedulesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
  }
);

export const createSchedule = createAsyncThunk(
  'schedule/createSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const data = await createScheduleApi(scheduleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create schedule');
    }
  }
);

export const updateSchedule = createAsyncThunk(
  'schedule/updateSchedule',
  async ({ scheduleId, scheduleData }, { rejectWithValue }) => {
    try {
      const data = await updateScheduleApi(scheduleId, scheduleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update schedule');
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  'schedule/deleteSchedule',
  async (scheduleId, { rejectWithValue }) => {
    try {
      await deleteScheduleApi(scheduleId);
      return scheduleId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete schedule');
    }
  }
);

export const fetchSchedulesBySection = createAsyncThunk(
  'schedule/fetchSchedulesBySection',
  async (sectionId, { rejectWithValue }) => {
    try {
      const data = await getSchedulesBySectionApi(sectionId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules for section');
    }
  }
);

export const fetchSections = createAsyncThunk(
  'schedule/fetchSections',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSectionsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sections');
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
      if (action.payload) {
        // Filter schedules for the selected section
        state.selectedSectionSchedules = filterSchedulesBySection(state.allSchedules, action.payload.id);
      } else {
        state.selectedSectionSchedules = [];
      }
    },
    clearSelectedSection: (state) => {
      state.selectedSection = null;
      state.selectedSectionSchedules = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all schedules
      .addCase(fetchAllSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.allSchedules = action.payload;
        // If a section is selected, update its schedules
        if (state.selectedSection) {
          const filteredSchedules = filterSchedulesBySection(action.payload, state.selectedSection.id);
          state.selectedSectionSchedules = filteredSchedules;
        }
      })
      .addCase(fetchAllSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch sections
      .addCase(fetchSections.pending, (state) => {
        state.sectionsLoading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sectionsLoading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.sectionsLoading = false;
        state.error = action.payload;
      })
      // Fetch schedules by section
      .addCase(fetchSchedulesBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedulesBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSectionSchedules = action.payload;
      })
      .addCase(fetchSchedulesBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // Create schedule
        .addCase(createSchedule.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createSchedule.fulfilled, (state, action) => {
          state.loading = false;
          // Add the new schedule to allSchedules
          state.allSchedules.push(action.payload);
          // If a section is selected, check if the new schedule belongs to that section
          if (state.selectedSection) {
            const newSchedule = action.payload;
            if (newSchedule.section.id === state.selectedSection.id) {
              state.selectedSectionSchedules.push(newSchedule);
            }
          }
          // Add the section to sections list if it doesn't exist
          const newSchedule = action.payload;
          const sectionExists = state.sections.some(section => section.id === newSchedule.section.id);
          if (!sectionExists) {
            state.sections.push(newSchedule.section);
          }
        })
        .addCase(createSchedule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Update schedule
        .addCase(updateSchedule.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateSchedule.fulfilled, (state, action) => {
          state.loading = false;
          // Update the schedule in allSchedules
          const index = state.allSchedules.findIndex(s => s.id === action.payload.id);
          if (index !== -1) {
            state.allSchedules[index] = action.payload;
          }
          // If a section is selected, update the schedule in selectedSectionSchedules
          if (state.selectedSection) {
            const selectedIndex = state.selectedSectionSchedules.findIndex(s => s.id === action.payload.id);
            if (selectedIndex !== -1) {
              state.selectedSectionSchedules[selectedIndex] = action.payload;
            }
          }
        })
        .addCase(updateSchedule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Delete schedule
        .addCase(deleteSchedule.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteSchedule.fulfilled, (state, action) => {
          state.loading = false;
          // Remove the schedule from allSchedules
          state.allSchedules = state.allSchedules.filter(s => s.id !== action.payload);
          // If a section is selected, remove the schedule from selectedSectionSchedules
          if (state.selectedSection) {
            state.selectedSectionSchedules = state.selectedSectionSchedules.filter(s => s.id !== action.payload);
          }
        })
        .addCase(deleteSchedule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { setSelectedSection, clearSelectedSection, clearError } = scheduleSlice.actions;
export default scheduleSlice.reducer; 