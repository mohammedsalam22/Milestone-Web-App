import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllSchedulesApi,
  createScheduleApi,
  updateScheduleApi,
  deleteScheduleApi,
  extractGradesFromSchedules,
  filterSchedulesByGrade,
} from '../../api/schedule';

const initialState = {
  allSchedules: [],
  grades: [],
  selectedGrade: null,
  selectedGradeSchedules: [],
  loading: false,
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

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSelectedGrade: (state, action) => {
      state.selectedGrade = action.payload;
      if (action.payload) {
        // Filter schedules for the selected grade
        state.selectedGradeSchedules = filterSchedulesByGrade(state.allSchedules, action.payload.id);
      } else {
        state.selectedGradeSchedules = [];
      }
    },
    clearSelectedGrade: (state) => {
      state.selectedGrade = null;
      state.selectedGradeSchedules = [];
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
        // Extract grades from schedules
        const extractedGrades = extractGradesFromSchedules(action.payload);
        state.grades = extractedGrades;
        // If a grade is selected, update its schedules
        if (state.selectedGrade) {
          const filteredSchedules = filterSchedulesByGrade(action.payload, state.selectedGrade.id);
          state.selectedGradeSchedules = filteredSchedules;
        }
      })
              .addCase(fetchAllSchedules.rejected, (state, action) => {
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
          // If a grade is selected, check if the new schedule belongs to that grade
          if (state.selectedGrade) {
            const newSchedule = action.payload;
            if (newSchedule.section.grade.id === state.selectedGrade.id) {
              state.selectedGradeSchedules.push(newSchedule);
            }
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
          // If a grade is selected, update the schedule in selectedGradeSchedules
          if (state.selectedGrade) {
            const selectedIndex = state.selectedGradeSchedules.findIndex(s => s.id === action.payload.id);
            if (selectedIndex !== -1) {
              state.selectedGradeSchedules[selectedIndex] = action.payload;
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
          // If a grade is selected, remove the schedule from selectedGradeSchedules
          if (state.selectedGrade) {
            state.selectedGradeSchedules = state.selectedGradeSchedules.filter(s => s.id !== action.payload);
          }
        })
        .addCase(deleteSchedule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { setSelectedGrade, clearSelectedGrade, clearError } = scheduleSlice.actions;
export default scheduleSlice.reducer; 