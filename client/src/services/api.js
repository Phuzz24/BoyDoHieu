// src/services/api.js (Cập nhật với interceptor để tự động thêm token)
import axios from 'axios';

// Dùng env var cho baseURL: Local dùng '/api' (proxy Vite), Prod dùng full Render URL
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  timeout: 10000,  // Optional: 10s timeout cho API chậm (BE sleep)
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
      // Nếu dùng React Router: import { useNavigate } from 'react-router-dom'; rồi navigate('/login');
      // Còn không: Giữ window.location.href
      window.location.href = '/login'; // Redirect login
    }
    // Optional: Log error chi tiết cho debug
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;