import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudentsApi, getStudentByIdApi, createStudentApi, updateStudentApi, deleteStudentApi } from '../../api/students';

// Async thunk for fetching all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStudentsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch students data.'
      );
    }
  }
);

// Async thunk for fetching individual student
export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getStudentByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch student data.'
      );
    }
  }
);

// Async thunk for creating student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const data = await createStudentApi(studentData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to create student.'
      );
    }
  }
);

// Async thunk for updating student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateStudentApi(id, data);
      return { id, data: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update student.'
      );
    }
  }
);

// Async thunk for deleting student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete student.'
      );
    }
  }
);

const initialState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch students.';
      })
      // Fetch individual student
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch student.';
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create student.';
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.students.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload.data;
        }
        if (state.selectedStudent && state.selectedStudent.id === action.payload.id) {
          state.selectedStudent = action.payload.data;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update student.';
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = state.students.filter(student => student.id !== action.payload);
        if (state.selectedStudent && state.selectedStudent.id === action.payload) {
          state.selectedStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete student.';
      });
  },
});

export const { clearSelectedStudent, clearError } = studentsSlice.actions;
export default studentsSlice.reducer; 