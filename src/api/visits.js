import apiService from './apiService';

const VISITS_ENDPOINT = 'api/landingpage/visits';

export const visitsAPI = {
  getVisits: () => apiService.get(VISITS_ENDPOINT),

  getVisit: (id) => apiService.get(`${VISITS_ENDPOINT}/${id}`),
};

export default visitsAPI; 