import apiService from './apiService';

/**
 * Get the base URL from the apiService configuration
 * This ensures all file URLs use the same base URL as API calls
 */
export const getBaseUrl = () => {
  return apiService.defaults.baseURL;
};

/**
 * Get the full file URL for storage files
 * @param {string} filePath - The file path relative to storage
 * @returns {string} - The complete file URL
 */
export const getFileUrl = (filePath) => {
  const baseUrl = getBaseUrl();
  // Remove trailing slash from baseUrl and add storage path
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBaseUrl}/storage/${filePath}`;
};

export default { getBaseUrl, getFileUrl };
