import apiService from './apiService';

export const feeAssignmentsApi = {
  // Get student fee assignments
  getStudentFeeAssignments: (studentId) => {
    return apiService.get(`/api/accounting/fee-assignments/?student=${studentId}`);
  },

  // Get all fee assignments (for admin view)
  getAllFeeAssignments: (params = {}) => {
    return apiService.get('/api/accounting/fee-assignments/', { params });
  },

  // Create new fee assignment
  createFeeAssignment: (feeAssignmentData) => {
    return apiService.post('/api/accounting/fee-assignments/', feeAssignmentData);
  },

  // Update fee assignment
  updateFeeAssignment: (feeAssignmentId, feeAssignmentData) => {
    return apiService.put(`/api/accounting/fee-assignments/${feeAssignmentId}/`, feeAssignmentData);
  },

  // Delete fee assignment
  deleteFeeAssignment: (feeAssignmentId) => {
    return apiService.delete(`/api/accounting/fee-assignments/${feeAssignmentId}/`);
  },

  // Get fee assignment by ID
  getFeeAssignmentById: (feeAssignmentId) => {
    return apiService.get(`/api/accounting/fee-assignments/${feeAssignmentId}/`);
  }
};
