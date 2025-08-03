import apiService from './apiService';

export const getPlacementDatesApi = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.future !== undefined) {
    queryParams.append('future', params.future);
  }
  if (params.limit_reached !== undefined) {
    queryParams.append('limit_reached', params.limit_reached);
  }
  
  const url = `/api/school/placement-date${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await apiService.get(url);
  return response.data;
};

export const getPlacementDateByIdApi = async (id) => {
  const response = await apiService.get(`/api/school/placement-date/${id}`);
  return response.data;
};

export const createPlacementDateApi = async (data) => {
  const response = await apiService.post('/api/school/placement-date', data);
  return response.data;
};

export const updatePlacementDateApi = async (id, data) => {
  const response = await apiService.patch(`/api/school/placement-date/${id}`, data);
  return response.data;
};

export const deletePlacementDateApi = async (id) => {
  const response = await apiService.delete(`/api/school/placement-date/${id}`);
  return response.data;
}; 