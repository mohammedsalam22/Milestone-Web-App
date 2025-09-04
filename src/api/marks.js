import apiService from './apiService';

export const getMarksApi = async (filters = {}) => {
  const params = new URLSearchParams();
  
  // Required parameters
  if (filters.subject) {
    params.append('subject', filters.subject);
  }
  if (filters.mark_type) {
    params.append('mark_type', filters.mark_type);
  }
  if (filters.student__section) {
    params.append('student__section', filters.student__section);
  }
  
  const queryString = params.toString();
  const url = queryString ? `/api/school/marks/?${queryString}` : '/api/school/marks/';
  const response = await apiService.get(url);
  return response.data;
};

export const getMarkByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/marks/${id}`);
  return response.data;
};

export const createMarkApi = async (data) => {
  const response = await apiService.post('/api/school/marks/', data);
  return response.data;
};

export const createMarksBulkApi = async (marksData) => {
  // Send the entire array of marks to the API
  const response = await apiService.post('/api/school/marks/', marksData);
  return response.data;
};

export const updateMarkApi = async (id, data) => {
  const response = await apiService.patch(`/api/school/marks/${id}/`, data);
  return response.data;
};

export const deleteMarkApi = async (id) => {
  await apiService.delete(`/api/school/marks/${id}`);
};

// Get students by section (already exists but we'll add it here for convenience)
export const getStudentsBySectionApi = async (sectionId) => {
  const response = await apiService.get(`/api/users/students?section=${sectionId}`);
  return response.data;
};

// Get sections by grade (already exists but we'll add it here for convenience)
export const getSectionsByGradeApi = async (gradeId) => {
  const response = await apiService.get(`/api/school/sections?grade=${gradeId}`);
  return response.data;
};
