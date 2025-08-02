import apiService from './apiService';

export const getSubjectsApi = async () => {
  const response = await apiService.get('/api/school/subjects');
  return response.data;
};

export const getSubjectByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/subjects/${id}`);
  return response.data;
};

export const createSubjectApi = async (data) => {
  const response = await apiService.post('/api/school/subjects', data);
  return response.data;
};

export const updateSubjectApi = async (id, data) => {
  const response = await apiService.put(`/api/school/subjects/${id}`, data);
  return response.data;
};

export const deleteSubjectApi = async (id) => {
  const response = await apiService.delete(`/api/school/subjects/${id}`);
  return response.data;
}; 