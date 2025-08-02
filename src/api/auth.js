import apiService from './apiService';

export const loginApi = async (data) => {
  const response = await apiService.post('/api/users/auth/login/', data);
  return response.data;
}; 