import axios from 'axios';

const client = axios.create({
  baseURL: 'https://hushh-campus.onrender.com',
});

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kai_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
