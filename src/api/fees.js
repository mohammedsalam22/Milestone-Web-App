import apiService from './apiService';

export const feesApi = {
  // Get all fees
  getAllFees: (params = {}) => {
    return apiService.get('/api/accounting/fees/', { params });
  },

  // Get fee by ID
  getFeeById: (feeId) => {
    return apiService.get(`/api/accounting/fees/${feeId}/`);
  },

  // Create new fee
  createFee: (feeData) => {
    return apiService.post('/api/accounting/fees/', feeData);
  },

  // Update fee
  updateFee: (feeId, feeData) => {
    return apiService.put(`/api/accounting/fees/${feeId}/`, feeData);
  },

  // Delete fee
  deleteFee: (feeId) => {
    return apiService.delete(`/api/accounting/fees/${feeId}/`);
  }
};