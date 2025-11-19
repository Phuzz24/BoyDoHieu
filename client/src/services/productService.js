import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://boydohieu-backend.onrender.com/api';

   export const getProducts = () => axios.get(`${API_URL}/products`);
   export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);