import apiService from './apiService';

export const getGradesApi = async () => {
  const response = await apiService.get('/api/school/grades');
  return response.data;
};

export const getGradeByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/grades/${id}`);
  return response.data;
};

export const createGradeApi = async (data) => {
  const response = await apiService.post('/api/school/grades', data);
  return response.data;
};

export const updateGradeApi = async (id, data) => {
  const response = await apiService.put(`/api/school/grades/${id}`, data);
  return response.data;
};

export const deleteGradeApi = async (id) => {
  await apiService.delete(`/api/school/grades/${id}`);
}; 