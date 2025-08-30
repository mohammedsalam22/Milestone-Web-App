import apiService from './apiService';

const PROGRAMS_ENDPOINT = 'api/landingpage/programs';

export const programsAPI = {
  getPrograms: () => apiService.get(PROGRAMS_ENDPOINT),

  getProgram: (id) => apiService.get(`${PROGRAMS_ENDPOINT}/${id}`),

  createProgram: (programData) => {
    const formData = new FormData();
    
    formData.append('title', programData.title);
    formData.append('description', programData.description);
    formData.append('image', programData.image);
    
    if (programData.details) {
      formData.append('details', programData.details);
    }

    return apiService.post(PROGRAMS_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateProgram: (id, programData) => {
    const formData = new FormData();
    
    formData.append('title', programData.title);
    formData.append('description', programData.description);
    
    if (programData.image instanceof File) {
      formData.append('image', programData.image);
    }
    
    if (programData.details) {
      formData.append('details', programData.details);
    }

    return apiService.patch(`${PROGRAMS_ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteProgram: (id) => apiService.delete(`${PROGRAMS_ENDPOINT}/${id}`),

  getImageUrl: (imagePath) => {
    return `http://10.218.65.81:8000/storage/${imagePath}`;
  },
};

export default programsAPI; 