import axios from 'axios';

// Attempt to get the CSRF token from the meta tag safely
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCsrfToken(),
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
