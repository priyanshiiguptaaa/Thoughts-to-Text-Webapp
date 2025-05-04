// API configuration
// For simplicity, we'll use a hardcoded value that can be replaced during the build process
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://thoughts-to-text-api.onrender.com'
  : 'http://localhost:8000';

export const config = {
  apiUrl: API_URL
};
