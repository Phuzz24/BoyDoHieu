// src/context/AuthContext.jsx – PHIÊN BẢN HOÀN HẢO SAU FIX
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../services/socket';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserInternal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCart } = useCart();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const updateAuth = (token, userData) => {
    if (token) localStorage.setItem('token', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUserInternal(userData);

      // Merge cart
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const merged = mergeCarts(userData.cart || [], localCart);
      setCart(merged);
      localStorage.setItem('cart', JSON.stringify(merged));

      // Socket join room
      socket.connect();
      if (userData.role === 'admin') {
        socket.emit('joinAdminRoom');
      } else {
        socket.emit('joinUserRoom', userData._id);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUserInternal(null);
    setCart([]);
    socket.disconnect();
  };

  const mergeCarts = (backendCart, localCart) => {
    const map = new Map();
    [...backendCart, ...localCart].forEach(item => {
      const key = `${item._id}-${item.selectedSize}-${item.selectedColor}`;
      if (map.has(key)) {
        map.get(key).quantity = Math.max(map.get(key).quantity, item.quantity || 1);
      } else {
        map.set(key, { ...item, quantity: item.quantity || 1 });
      }
    });
    return Array.from(map.values());
  };

  useEffect(() => {
  const loadUser = async () => {
    // QUAN TRỌNG NHẤT: CHỈ LOAD USER KHI KHÔNG Ở TRANG LOGIN!!!
    const publicPaths = ['/login', '/register', '/forgot-password', '/reset'];
    const currentPath = window.location.pathname;

    if (publicPaths.some(path => currentPath.startsWith(path))) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.user) {
        updateAuth(token, response.data.user);
      }
    } catch (error) {
      console.log('Token không hợp lệ – bỏ qua (không can thiệp localStorage)');
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []); // CHỈ CHẠY 1 LẦN!!!

  // Listen socket chỉ 1 lần
  useEffect(() => {
    socket.on('orderStatusUpdate', (data) => {
      toast.info(data.message || 'Đơn hàng của bạn đã được cập nhật!');
    });

    socket.on('newOrder', (data) => {
      if (user?.role === 'admin') {
        toast.info(`Đơn hàng mới #${data.orderCode || data.orderId}`);
      }
    });

    return () => {
      socket.off('orderStatusUpdate');
      socket.off('newOrder');
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser: updateAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);