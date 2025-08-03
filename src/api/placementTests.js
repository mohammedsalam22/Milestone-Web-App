import apiService from './apiService';

const BASE_URL = '/api/school/placements';

export const placementTestsApi = {
  // Get all placement test registrants
  getPlacementTests: async () => {
    try {
      const response = await apiService.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update placement test data
  updatePlacementTest: async (id, placementData) => {
    try {
      const response = await apiService.patch(`${BASE_URL}/${id}`, placementData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register student after passing placement test
  registerStudent: async (placementData) => {
    try {
      const requestBody = {
        placement: placementData.id, // Just the ID, not an object
        section_id: placementData.section_id,
        username: placementData.username,
        password: placementData.password,
        religion: placementData.religion
      };
      
      console.log('Registering student with data:', requestBody);
      
      const response = await apiService.post('/api/users/students', requestBody);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      throw error;
    }
  }
};

export default placementTestsApi; 