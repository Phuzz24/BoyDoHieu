import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getFavorites = async () => {
  const token = localStorage.getItem('token');
  console.log('getFavorites, token:', token);
  if (!token) throw new Error('No token found');
  const response = await axios.get(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addFavorite = async (productId) => {
  const token = localStorage.getItem('token');
  console.log('addFavorite, productId:', productId, 'token:', token);
  if (!token) throw new Error('No token found');
  const response = await axios.post(
    `${API_URL}/favorites`,
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const removeFavorite = async (productId) => {
  const token = localStorage.getItem('token');
  console.log('removeFavorite, productId:', productId, 'token:', token);
  if (!token) throw new Error('No token found');
  const response = await axios.delete(`${API_URL}/favorites/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
});
  return response.data;
};