import apiService from './apiService';

export const getSectionsApi = async () => {
  const response = await apiService.get('/api/school/sections');
  return response.data;
};

export const getSectionByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/sections/${id}`);
  return response.data;
};

export const createSectionApi = async (data) => {
  const response = await apiService.post('/api/school/sections', data);
  return response.data;
};

export const updateSectionApi = async (id, data) => {
  const response = await apiService.put(`/api/school/sections/${id}`, data);
  return response.data;
};

// Filtered sections by grade
export const getSectionsByGradeApi = async (gradeId) => {
  const response = await apiService.get(`/api/school/sections?grade=${gradeId}`);
  return response.data;
};

export const deleteSectionApi = async (id) => {
  await apiService.delete(`/api/school/sections/${id}`);
}; 