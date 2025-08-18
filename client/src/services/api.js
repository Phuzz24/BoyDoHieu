import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Proxy to backend
});

export default api;