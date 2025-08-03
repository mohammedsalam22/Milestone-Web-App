import apiService from './apiService';

export const getStudentsApi = async () => {
  const response = await apiService.get('/api/users/students');
  return response.data;
};

export const getStudentByIdApi = async (id) => {
  const response = await apiService.get(`/api/users/students/${id}`);
  return response.data;
};

export const createStudentApi = async (data) => {
  const response = await apiService.post('/api/users/students', data);
  return response.data;
};

export const createStudentDirectApi = async (data) => {
  const response = await apiService.post('/api/users/students/direct-store', data);
  return response.data;
};

export const updateStudentApi = async (id, data) => {
  const response = await apiService.patch(`/api/users/students/${id}`, data);
  return response.data;
};

export const deleteStudentApi = async (id) => {
  const response = await apiService.delete(`/api/users/students/${id}`);
  return response.data;
}; 