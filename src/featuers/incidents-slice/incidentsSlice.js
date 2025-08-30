import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getIncidentsApi, 
  getIncidentByIdApi, 
  createIncidentApi, 
  updateIncidentApi, 
  deleteIncidentApi 
} from '../../api/incidents';

// Async thunk for fetching all incidents
export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getIncidentsApi(filters);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch incidents data.'
      );
    }
  }
);

// Async thunk for fetching individual incident
export const fetchIncidentById = createAsyncThunk(
  'incidents/fetchIncidentById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getIncidentByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch incident data.'
      );
    }
  }
);

// Async thunk for creating incident
export const createIncident = createAsyncThunk(
  'incidents/createIncident',
  async (incidentData, { rejectWithValue }) => {
    try {
      const data = await createIncidentApi(incidentData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create incident.'
      );
    }
  }
);

// Async thunk for updating incident
export const updateIncident = createAsyncThunk(
  'incidents/updateIncident',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateIncidentApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update incident.'
      );
    }
  }
);

// Async thunk for deleting incident
export const deleteIncident = createAsyncThunk(
  'incidents/deleteIncident',
  async (id, { rejectWithValue }) => {
    try {
      await deleteIncidentApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete incident.'
      );
    }
  }
);

const initialState = {
  incidents: [],
  selectedIncident: null,
  loading: false,
  error: null,
  filters: {
    students__section: '',
    date: '',
  },
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    clearSelectedIncident: (state) => {
      state.selectedIncident = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        students__section: '',
        date: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.incidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch incidents.';
      })
      // Fetch individual incident
      .addCase(fetchIncidentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidentById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedIncident = action.payload;
      })
      .addCase(fetchIncidentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch incident.';
      })
      // Create incident
      .addCase(createIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.incidents.unshift(action.payload);
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create incident.';
      })
      // Update incident
      .addCase(updateIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.incidents.findIndex(incident => incident.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload.data;
        }
        if (state.selectedIncident && state.selectedIncident.id === action.payload.id) {
          state.selectedIncident = action.payload.data;
        }
      })
      .addCase(updateIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update incident.';
      })
      // Delete incident
      .addCase(deleteIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.incidents = state.incidents.filter(incident => incident.id !== action.payload);
        if (state.selectedIncident && state.selectedIncident.id === action.payload) {
          state.selectedIncident = null;
        }
      })
      .addCase(deleteIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete incident.';
      });
  },
});

export const { 
  clearSelectedIncident, 
  clearError, 
  setFilters, 
  clearFilters 
} = incidentsSlice.actions;
export default incidentsSlice.reducer;
