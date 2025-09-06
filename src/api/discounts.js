import apiService from './apiService';

export const discountsApi = {
  // Get all discounts
  getAllDiscounts: (params = {}) => {
    return apiService.get('/api/accounting/discounts/', { params });
  },

  // Get discount by ID
  getDiscountById: (discountId) => {
    return apiService.get(`/api/accounting/discounts/${discountId}/`);
  },

  // Create new discount
  createDiscount: (discountData) => {
    return apiService.post('/api/accounting/discounts/', discountData);
  },

  // Update discount
  updateDiscount: (discountId, discountData) => {
    return apiService.put(`/api/accounting/discounts/${discountId}/`, discountData);
  },

  // Delete discount
  deleteDiscount: (discountId) => {
    return apiService.delete(`/api/accounting/discounts/${discountId}/`);
  }
};