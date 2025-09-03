import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Load favorites từ backend khi đăng nhập
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await getFavorites();
          setFavorites(response);
          localStorage.setItem('favorites', JSON.stringify(response));
        } catch (error) {
          console.error('Error fetching favorites:', error);
          toast.error('Không thể tải danh sách yêu thích!');
        }
      }
    };
    fetchFavorites();
  }, [user]);

  // Lưu vào localStorage khi favorites thay đổi
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = async (product) => {
    if (!product || !product._id) {
      toast.error('Dữ liệu sản phẩm không hợp lệ!');
      return;
    }
    if (favorites.some((item) => item._id === product._id)) {
      toast.info('Sản phẩm đã trong danh sách yêu thích!');
      return;
    }
    try {
      if (user) {
        await addFavorite(product._id); // Gọi API nếu đăng nhập
      }
      setFavorites((prev) => [...prev, { ...product }]);
      toast.success('Đã thêm vào yêu thích!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Không thể thêm vào yêu thích!');
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      if (user) {
        await removeFavorite(id); // Gọi API nếu đăng nhập
      }
      setFavorites((prev) => prev.filter((item) => item._id !== id));
      toast.success('Đã xóa khỏi yêu thích!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Không thể xóa khỏi yêu thích!');
    }
  };

  const isFavorite = (id) => favorites.some((item) => item._id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);