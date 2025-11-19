import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'https://boydohieu-backend.onrender.com/api';
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


   export const getProducts = () => axios.get(`${API_URL}/products`);
   export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);