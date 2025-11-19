import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../services/socket'; // THÊM: Import socket
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserInternal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} };

  const API_URL = 'http://localhost:5000/api';

  const mergeCarts = (backendCart, localCart) => {
    const merged = [...backendCart];
    localCart.forEach(localItem => {
      const exists = merged.find(item =>
        item._id === localItem._id &&
        item.selectedSize === localItem.selectedSize &&
        item.selectedColor === localItem.selectedColor
      );
      if (!exists) {
        merged.push(localItem);
      } else {
        exists.quantity = Math.max(exists.quantity || 1, localItem.quantity || 1);
      }
    });
    return merged;
  };

  const updateAuth = (token, userData) => {
    const userToSet = userData || JSON.parse(localStorage.getItem('user') || 'null');
    if (token) localStorage.setItem('token', token);
    if (userToSet && userToSet.role) {
      localStorage.setItem('user', JSON.stringify(userToSet));
      setUserInternal(userToSet);
      const mergedCart = mergeCarts(userToSet.cart || [], JSON.parse(localStorage.getItem('cart') || '[]'));
      setCart(mergedCart);
      localStorage.setItem('cart', JSON.stringify(mergedCart));
      console.log('[AUTH UPDATE] Set user with role:', userToSet.role);

      // THÊM: Join socket room sau login
      if (userToSet.role === 'admin') {
        socket.emit('joinAdminRoom');
        console.log('[SOCKET] Joined admin room');
      } else {
        socket.emit('joinUserRoom', userToSet._id);
        console.log('[SOCKET] Joined user room:', userToSet._id);
      }

      // THÊM: Listen socket events
      socket.on('newOrder', (data) => {
        toast.info(`Đơn hàng mới từ ${data.customer}: ${data.total}đ`);
      });

      socket.on('orderStatusUpdate', (data) => {
        toast.info(data.message);
        // Optional: Refresh orders nếu ở OrderHistory
      });

      socket.on('notification', (notif) => {
        toast.info(notif.message);
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserInternal(null);
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    socket.disconnect(); // THÊM: Disconnect socket
    console.log('[AUTH] Logged out');
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      console.log('[AUTH LOAD] Token exists:', !!token);

      if (token) {
        const localUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (localUser && localUser.role) {
          console.log('[AUTH LOAD] Using local user fallback:', localUser.username);
          updateAuth(null, localUser);
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: (status) => status >= 200 && status < 300 || status === 304,
          });
          let fetchedUser = response.data.user;
          console.log('[AUTH LOAD] Server /me response:', fetchedUser ? 'OK' : 'Empty');

          if (response.status === 304 || !fetchedUser) {
            fetchedUser = localUser || null;
            console.log('Using local user for 304 or empty:', fetchedUser);
          }
          if (fetchedUser && fetchedUser.role) {
            updateAuth(token, fetchedUser);
            console.log('User loaded from server:', fetchedUser.username);
          } else {
            throw new Error('No valid user data');
          }
        } catch (error) {
          console.error('Error loading user from server:', error);
          if (error.response?.status === 401) {
            console.log('[AUTH LOAD] Token invalid (401), logout');
            logout();
            toast.error('Phiên đăng nhập hết hạn!');
          } else {
            if (localUser && localUser.role) {
              console.log('[AUTH LOAD] Server error, fallback local:', localUser.username);
              updateAuth(token, localUser);
            } else {
              console.log('[AUTH LOAD] No fallback, logout');
              logout();
              toast.error('Lỗi kết nối, vui lòng đăng nhập lại!');
            }
          }
        }
      } else {
        console.log('[AUTH LOAD] No token, skip');
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: updateAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);