import axios from 'axios';

// Attempt to get the CSRF token from the meta tag safely
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCsrfToken(),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc1OTVhMWY1NzI2ODMwYjg1YWZiOGUiLCJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTkwNDM3OTksImV4cCI6MTcxOTEzMDE5OX0.5CvtCV_fPdGDjoNAcJDYObQOkUtj_tqFlynQ9YwQa3E'
  },
  withCredentials: true, // Important for CSRF token handling
});

// Request interceptor to attach the CSRF token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

export default axiosInstance;
