import apiService from './apiService';

/**
 * Dashboard API service
 * Handles all dashboard-related API calls
 */

/**
 * Get dashboard data including stats and recent activities
 * @returns {Promise<Object>} Dashboard data response
 */
export const getDashboardData = async () => {
  try {
    const response = await apiService.get('/api/landingpage/dashboard/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export default {
  getDashboardData,
};
