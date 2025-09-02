// src/services/authService.js (Cập nhật để cập nhật user sau đăng nhập/đăng ký)
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const forgotPassword = async ({ username }) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { username });
  return response.data;
};

export const resetPassword = async ({ password, token }) => {
  const response = await axios.post(`${API_URL}/auth/reset/${token}`, { password });
  return response.data;
};

export const changePassword = async ({ currentPassword, newPassword, token }) => {
  const response = await axios.post(`${API_URL}/auth/change-password`, { currentPassword, newPassword }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};