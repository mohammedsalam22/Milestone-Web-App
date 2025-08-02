import apiService from './apiService';

export const getStudyYearsApi = async () => {
  const response = await apiService.get('/api/school/study-years');
  return response.data;
};

export const getStudyYearByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/study-years/${id}`);
  return response.data;
};

export const createStudyYearApi = async (data) => {
  const response = await apiService.post('/api/school/study-years', data);
  return response.data;
};

export const updateStudyYearApi = async (id, data) => {
  const response = await apiService.put(`/api/school/study-years/${id}`, data);
  return response.data;
};

export const deleteStudyYearApi = async (id) => {
  const response = await apiService.delete(`/api/school/study-years/${id}`);
  return response.data;
}; 