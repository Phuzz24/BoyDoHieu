// src/services/authService.js (Fix hardcode URL với env var)
import api from './api';  // Import global axios instance từ api.js (đã có baseURL = VITE_API_URL)

// Login function
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);  // Dùng api (baseURL tự switch local/prod)
    return response.data;  // Trả {token, user, message}
  } catch (error) {
    throw error;  // Throw để catch ở Login.jsx
  }
};

// Register function (tương tự)
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/request-password-reset', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  const res = await api.post(`/auth/reset-password/${token}`, {
    password: newPassword
  });
  return res.data;
};

// Thêm vào file authService.js của em
export const sendResetCode = async (email) => {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  } catch (error) {
    throw error;
  }
};


export const verifyCodeAndReset = async (email, code, newPassword) => {
  try {
    const res = await api.post('/auth/verify-reset-code', { email, code, newPassword });
    return res.data;
  } catch (error) {
    throw error;
  }
};


// Change password (protected)
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};