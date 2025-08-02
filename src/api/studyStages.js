import apiService from './apiService';

export const getStudyStagesApi = async () => {
  const response = await apiService.get('/api/school/study-stages');
  return response.data;
};

export const getStudyStageByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/study-stages/${id}`);
  return response.data;
};

export const createStudyStageApi = async (data) => {
  const response = await apiService.post('/api/school/study-stages', data);
  return response.data;
};

export const updateStudyStageApi = async (id, data) => {
  const response = await apiService.put(`/api/school/study-stages/${id}`, data);
  return response.data;
};

export const deleteStudyStageApi = async (id) => {
  await apiService.delete(`/api/school/study-stages/${id}`);
}; 