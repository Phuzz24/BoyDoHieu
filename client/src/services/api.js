// src/services/api.js (Cập nhật với interceptor để tự động thêm token)
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Proxy to backend (cần config vite.config.js nếu chưa)
});

// Interceptor request: Thêm token từ localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response: Xử lý 401 (token expire → logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('cart', JSON.stringify([]));
      window.location.href = '/login'; // Redirect login
    }
    return Promise.reject(error);
  }
);

export default api;