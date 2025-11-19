import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data.filter(f => f && f._id));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách yêu thích:', error);
      toast.error('Lỗi tải danh sách yêu thích!');
    }
  };

  const addToFavorites = async (product) => {
    if (!product?._id) throw new Error('Sản phẩm không có ID hợp lệ!');
    const oldFavorites = [...favorites];
    setFavorites([...favorites, product]);
    try {
      const data = await addFavorite(product._id);
      setFavorites(data.favorites.filter(f => f && f._id));
      toast.success('Đã thêm vào yêu thích!');
      fetchFavorites();
    } catch (error) {
      setFavorites(oldFavorites);
      console.error('Lỗi khi thêm yêu thích:', error);
      toast.error('Lỗi thêm vào yêu thích!');
      throw error;
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!productId) {
      console.warn('ID sản phẩm không hợp lệ, bỏ qua');
      return;
    }
    const oldFavorites = [...favorites];
    setFavorites(favorites.filter(f => f._id !== productId));
    try {
      const data = await removeFavorite(productId);
      setFavorites(data.favorites.filter(f => f && f._id));
      toast.success('Đã xóa khỏi yêu thích!');
      fetchFavorites();
    } catch (error) {
      setFavorites(oldFavorites);
      console.error('Lỗi khi xóa yêu thích:', error);
      toast.error('Lỗi xóa khỏi yêu thích!');
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav?._id === productId);
  };

  console.log('Providing context value:', { favorites, addToFavorites, removeFromFavorites, isFavorite, setFavorites, fetchFavorites }); // Debug
  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, setFavorites, fetchFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);