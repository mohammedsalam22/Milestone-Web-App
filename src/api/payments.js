import apiService from './apiService';

export const paymentsApi = {
  // Get student payments
  getStudentPayments: (studentId) => {
    return apiService.get(`/api/accounting/payments/?student=${studentId}`);
  },

  // Get all payments (for admin view)
  getAllPayments: (params = {}) => {
    return apiService.get('/api/accounting/payments/', { params });
  },

  // Create new payment
  createPayment: (paymentData) => {
    return apiService.post('/api/accounting/payments/', paymentData);
  },

  // Update payment
  updatePayment: (paymentId, paymentData) => {
    return apiService.put(`/api/accounting/payments/${paymentId}/`, paymentData);
  },

  // Delete payment
  deletePayment: (paymentId) => {
    return apiService.delete(`/api/accounting/payments/${paymentId}/`);
  },

  // Get payment by ID
  getPaymentById: (paymentId) => {
    return apiService.get(`/api/accounting/payments/${paymentId}/`);
  }
};
