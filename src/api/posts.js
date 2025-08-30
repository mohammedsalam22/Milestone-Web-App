import apiService from './apiService';

const POSTS_ENDPOINT = 'api/posts/posts';

export const postsAPI = {
  getPosts: () => apiService.get(POSTS_ENDPOINT),

  getPost: (id) => apiService.get(`${POSTS_ENDPOINT}/${id}`),

  createPost: (postData) => {
    const formData = new FormData();
    
    formData.append('title', postData.title);
    formData.append('text', postData.text);
    formData.append('is_public', postData.is_public);
    
    if (postData.section_ids && postData.section_ids.length > 0) {
      postData.section_ids.forEach((sectionId, index) => {
        formData.append(`section_id[${index}]`, sectionId);
      });
    }
    
    if (postData.attachments && postData.attachments.length > 0) {
      postData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]file`, file);
      });
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
    formData.append('is_public', postData.is_public);
    
    if (postData.section_ids && postData.section_ids.length > 0) {
      postData.section_ids.forEach((sectionId, index) => {
        formData.append(`section_id[${index}]`, sectionId);
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
    return `http://10.218.65.81:8000/storage/${filePath}`;
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