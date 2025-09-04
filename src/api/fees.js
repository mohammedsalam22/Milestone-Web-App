import apiService from './apiService';

export const getFeesApi = async () => {
  const response = await apiService.get('/api/accounting/fees/');
  return response.data;
};

export const getFeeByIdApi = async (id) => {
  const response = await apiService.get(`/api/accounting/fees/${id}`);
  return response.data;
};

export const createFeeApi = async (data) => {
  const response = await apiService.post('/api/accounting/fees/', data);
  return response.data;
};

export const updateFeeApi = async (id, data) => {
  const response = await apiService.patch(`/api/accounting/fees/${id}/`, data);
  return response.data;
};

export const deleteFeeApi = async (id) => {
  const response = await apiService.delete(`/api/accounting/fees/${id}/`);
  return response.data;
};
