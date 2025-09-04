import apiService from './apiService';

export const getDiscountsApi = async () => {
  const response = await apiService.get('/api/accounting/discounts/');
  return response.data;
};

export const getDiscountByIdApi = async (id) => {
  const response = await apiService.get(`/api/accounting/discounts/${id}`);
  return response.data;
};

export const createDiscountApi = async (data) => {
  const response = await apiService.post('/api/accounting/discounts/', data);
  return response.data;
};

export const updateDiscountApi = async (id, data) => {
  const response = await apiService.patch(`/api/accounting/discounts/${id}/`, data);
  return response.data;
};

export const deleteDiscountApi = async (id) => {
  const response = await apiService.delete(`/api/accounting/discounts/${id}/`);
  return response.data;
};
