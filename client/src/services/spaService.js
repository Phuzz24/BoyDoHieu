// src/services/spaService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createSpaBooking = (data) => 
  axios.post(`${API_URL}/spa/bookings`, data);

export const getSpaBookings = () => 
  axios.get(`${API_URL}/spa/bookings`);

export const updateSpaBooking = (id, data) =>
  axios.put(`${API_URL}/spa/bookings/${id}`, data);