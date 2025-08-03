import apiService from './apiService';

const ACTIVITIES_ENDPOINT = 'api/landingpage/activities';

export const activitiesAPI = {
  getActivities: () => apiService.get(ACTIVITIES_ENDPOINT),

  getActivity: (id) => apiService.get(`${ACTIVITIES_ENDPOINT}/${id}`),

  createActivity: (activityData) => {
    const formData = new FormData();
    
    formData.append('title', activityData.title);
    formData.append('description', activityData.description);
    formData.append('image', activityData.image);
    
    if (activityData.details) {
      formData.append('details', activityData.details);
    }

    // Handle videos array
    if (activityData.videos && activityData.videos.length > 0) {
      activityData.videos.forEach((video, index) => {
        formData.append(`videos[${index}]`, video);
      });
    }

    return apiService.post(ACTIVITIES_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateActivity: (id, activityData) => {
    const formData = new FormData();
    
    formData.append('title', activityData.title);
    formData.append('description', activityData.description);
    
    if (activityData.image instanceof File) {
      formData.append('image', activityData.image);
    }
    
    if (activityData.details) {
      formData.append('details', activityData.details);
    }

    // Handle videos array
    if (activityData.videos && activityData.videos.length > 0) {
      activityData.videos.forEach((video, index) => {
        formData.append(`videos[${index}]`, video);
      });
    }

    return apiService.patch(`${ACTIVITIES_ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteActivity: (id) => apiService.delete(`${ACTIVITIES_ENDPOINT}/${id}`),

  getImageUrl: (imagePath) => {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  },

  getVideoUrl: (videoPath) => {
    return `http://127.0.0.1:8000/storage/${videoPath}`;
  },
};

export default activitiesAPI; 