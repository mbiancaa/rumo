const API_URL = process.env.REACT_APP_BE_URL || 'http://localhost:8000';

/**
 * Builds the full image URL from a filename
 * @param {string} filename - The image filename
 * @returns {string} The complete image URL
 */
export const getImageUrl = (filename) => {
  if (!filename) return null;
  
  // If it's already a full URL or data URL, return as is
  if (filename.startsWith('http') || filename.startsWith('data:')) {
    return filename;
  }
  
  return `${API_URL}/storage/uploads/${filename}`;
};

/**
 * Checks if a string is a valid image filename
 * @param {string} filename - The string to check
 * @returns {boolean} Whether the string is a valid image filename
 */
export const isValidImageFilename = (filename) => {
  if (!filename) return false;
  return !filename.startsWith('http') && !filename.startsWith('data:');
}; 