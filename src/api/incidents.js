import apiService from './apiService';

export const getIncidentsApi = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.students__section) {
    params.append('students__section', filters.students__section);
  }
  
  if (filters.date) {
    params.append('date', filters.date);
  }
  
  const queryString = params.toString();
  const url = queryString ? `/api/school/event?${queryString}` : '/api/school/event';
  
  const response = await apiService.get(url);
  return response.data;
};

export const getIncidentByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/event/${id}`);
  return response.data;
};

export const getStudentIncidentsApi = async (studentId) => {
  const response = await apiService.get(`/api/school/event?students__id=${studentId}`);
  return response.data;
};

export const createIncidentApi = async (data) => {
  const response = await apiService.post('/api/school/event', data);
  return response.data;
};

export const updateIncidentApi = async (id, data) => {
  const response = await apiService.patch(`/api/school/event/${id}`, data);
  return response.data;
};

export const deleteIncidentApi = async (id) => {
  await apiService.delete(`/api/school/event/${id}`);
};
