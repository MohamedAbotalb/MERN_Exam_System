import axios from 'axios';

// Attempt to get the CSRF token from the meta tag safely
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Axios instance creation
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCsrfToken(),
    'Authorization': `Bearer ${getToken()}`,
  },
  withCredentials: true,
});

// Request interceptor to attach the CSRF token and Authorization token to each request
axiosInstance.interceptors.request.use(async (config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }

  // Fetch updated token if available (example: after login or token refresh)
  const updatedToken = getToken();
  if (updatedToken) {
    config.headers['Authorization'] = `Bearer ${updatedToken}`;
  }

  return config;
});

export default axiosInstance;
