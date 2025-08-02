import apiService from './apiService';

export const getStaffApi = async () => {
  const response = await apiService.get('/api/users/employees');
  return response.data;
};

export const getEmployeeByIdApi = async (id) => {
  const response = await apiService.get(`/api/users/employees/${id}`);
  return response.data;
};

export const createStaffApi = async (data) => {
  const response = await apiService.post('/api/users/employees', data);
  return response.data;
};

export const updateStaffApi = async (id, data) => {
  const response = await apiService.patch(`/api/users/employees/${id}`, data);
  return response.data;
};

export const deleteStaffApi = async (id) => {
  const response = await apiService.delete(`/api/users/employees/${id}`);
  return response.data;
}; 