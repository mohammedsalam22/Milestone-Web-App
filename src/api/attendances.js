import apiService from './apiService';

export const getAttendancesApi = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.student__section) {
    params.append('student__section', filters.student__section);
  }
  if (filters.date) {
    params.append('date', filters.date);
  }
  if (filters.student) {
    params.append('student', filters.student);
  }
  const queryString = params.toString();
  const url = queryString ? `/api/school/attendances?${queryString}` : '/api/school/attendances';
  const response = await apiService.get(url);
  return response.data;
};

export const getAttendanceByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/attendances/${id}`);
  return response.data;
};

export const getStudentAttendancesApi = async (studentId) => {
  const response = await apiService.get(`/api/school/attendances?student=${studentId}`);
  return response.data;
};

export const createDailyAttendanceApi = async (attendances) => {
  const response = await apiService.post('/api/school/attendances/', attendances);
  return response.data;
};

export const createAttendanceApi = async (data) => {
  const response = await apiService.post('/api/school/attendances/', data);
  return response.data;
};

export const updateAttendanceApi = async (id, data) => {
  const response = await apiService.patch(`/api/school/attendances/${id}/`, data);
  return response.data;
};

export const deleteAttendanceApi = async (id) => {
  await apiService.delete(`/api/school/attendances/${id}`);
};
