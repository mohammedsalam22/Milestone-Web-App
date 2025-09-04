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


// Get students by section (already exists but we'll add it here for convenience)
// Note: moved utility endpoints to their original modules:
// - students: src/api/students.js
// - sections: src/api/sections.js
// - subjects: src/api/subjects.js
// - grades: src/api/grades.js
// - study stages: src/api/studyStages.js
