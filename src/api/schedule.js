import apiService from './apiService';

export const getAllSchedulesApi = async () => {
  try {
    const response = await apiService.get('/api/school/schedules');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSchedulesBySectionApi = async (sectionId) => {
  try {
    const response = await apiService.get(`/api/school/schedules?section=${sectionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const extractGradesFromSchedules = (schedules) => {
  const gradeMap = new Map();
  
  schedules.forEach(schedule => {
    const grade = schedule.section.grade;
    if (!gradeMap.has(grade.id)) {
      gradeMap.set(grade.id, grade);
    }
  });
  
  return Array.from(gradeMap.values());
};

export const filterSchedulesByGrade = (schedules, gradeId) => {
  return schedules.filter(schedule => schedule.section.grade.id === gradeId);
};

export const filterSchedulesBySection = (schedules, sectionId) => {
  return schedules.filter(schedule => schedule.section.id === sectionId);
};

export const createScheduleApi = async (scheduleData) => {
  try {
    console.log('Create schedule request:', {
      scheduleData,
      url: '/api/school/schedules'
    });
    const response = await apiService.post('/api/school/schedules', scheduleData);
    console.log('Create schedule response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create schedule error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.non_field_errors?.[0] ||
                        error.response?.data?.detail ||
                        error.message ||
                        'Failed to create schedule';
    throw new Error(errorMessage);
  }
};

export const updateScheduleApi = async (scheduleId, scheduleData) => {
  try {
    console.log('Update schedule request:', {
      scheduleId,
      scheduleData,
      url: `/api/school/schedules/${scheduleId}`
    });
    const response = await apiService.put(`/api/school/schedules/${scheduleId}`, scheduleData);
    console.log('Update schedule response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update schedule error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.non_field_errors?.[0] ||
                        error.response?.data?.detail ||
                        error.message ||
                        'Failed to update schedule';
    throw new Error(errorMessage);
  }
};

export const deleteScheduleApi = async (scheduleId) => {
  try {
    await apiService.delete(`/api/school/schedules/${scheduleId}`);
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.non_field_errors?.[0] ||
                        error.response?.data?.detail ||
                        error.message ||
                        'Failed to delete schedule';
    throw new Error(errorMessage);
  }
}; 