import apiService from './apiService';
import { getFileUrl } from './baseUrl';

const POSTS_ENDPOINT = 'api/posts/posts';

export const postsAPI = {
  getPosts: () => apiService.get(POSTS_ENDPOINT),

  getPost: (id) => apiService.get(`${POSTS_ENDPOINT}/${id}`),

  createPost: (postData) => {
    const formData = new FormData();
    
    console.log('API: Creating post with data:', postData);
    console.log('API: is_public value:', postData.is_public, 'type:', typeof postData.is_public);
    
    formData.append('title', postData.title);
    formData.append('text', postData.text);
    formData.append('is_public', postData.is_public ? 'true' : 'false');
    
    if (postData.section_ids && postData.section_ids.length > 0) {
      console.log('API: Adding section_ids to FormData:', postData.section_ids);
      postData.section_ids.forEach((sectionId, index) => {
        formData.append(`section_ids[${index}]`, parseInt(sectionId));
        console.log(`API: Added section_ids[${index}] = ${parseInt(sectionId)}`);
      });
    } else {
      console.log('API: No section_ids provided or empty array');
    }
    
    if (postData.attachments && postData.attachments.length > 0) {
      postData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]file`, file);
      });
    }

    // Debug: Log all FormData entries
    console.log('API: FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    return apiService.post(POSTS_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updatePost: (id, postData) => {
    const formData = new FormData();
    
    formData.append('title', postData.title);
    formData.append('text', postData.text);
    formData.append('is_public', postData.is_public ? 'true' : 'false');
    
    if (postData.section_ids && postData.section_ids.length > 0) {
      // Send section_ids as an array of integers
      postData.section_ids.forEach((sectionId, index) => {
        formData.append(`section_ids[${index}]`, parseInt(sectionId));
      });
    }
    
    if (postData.attachments && postData.attachments.length > 0) {
      postData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]file`, file);
      });
    }

    return apiService.patch(`${POSTS_ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deletePost: (id) => apiService.delete(`${POSTS_ENDPOINT}/${id}`),

  getFileUrl: (filePath) => {
    return getFileUrl(filePath);
  },

  addComment: (commentData) => {
    return apiService.post('api/posts/comments', commentData);
  },

  deleteComment: (commentId) => {
    return apiService.delete(`api/posts/comments/${commentId}`);
  },

  addReply: (replyData) => {
    return apiService.post('api/posts/comments', replyData);
  },
};

export default postsAPI; 