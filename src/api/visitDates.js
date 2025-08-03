import apiService from './apiService';

const VISIT_DATES_ENDPOINT = 'api/landingpage/visits-dates';

export const visitDatesAPI = {
  getVisitDates: () => apiService.get(VISIT_DATES_ENDPOINT),

  getVisitDate: (id) => apiService.get(`${VISIT_DATES_ENDPOINT}/${id}`),

  createVisitDate: (visitDateData) => {
    return apiService.post(VISIT_DATES_ENDPOINT, visitDateData);
  },

  updateVisitDate: (id, visitDateData) => {
    return apiService.patch(`${VISIT_DATES_ENDPOINT}/${id}`, visitDateData);
  },

  deleteVisitDate: (id) => apiService.delete(`${VISIT_DATES_ENDPOINT}/${id}`),
};

export default visitDatesAPI; 