import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from '../context/FavoriteContext';
import ProductCard from '../components/product/ProductCard';
import { FaHeartBroken } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Button from '../components/common/Button';

Modal.setAppElement('#root');

const Favorites = () => {
  const { favorites, removeFromFavorites, setFavorites, fetchFavorites } = useFavorite(); // Destructure
  const navigate = useNavigate();
  const [clearModalOpen, setClearModalOpen] = useState(false);

  console.log('Favorites context:', { favorites, setFavorites }); // Debug

  const handleClearAllFavorites = async () => {
    if (favorites.length === 0) {
      toast.info('Danh sách yêu thích đã trống!');
      return;
    }
    try {
      await Promise.all(
        favorites
          .filter(product => product?._id)
          .map(product => removeFromFavorites(product._id))
      );
      if (setFavorites) { // Kiểm tra tồn tại
        setFavorites([]); // Clear local state
      } else {
        console.error('setFavorites is undefined, using fetchFavorites instead');
        await fetchFavorites(); // Fallback
      }
      await fetchFavorites(); // Sync
      toast.success('Đã xóa tất cả sản phẩm yêu thích!');
    } catch (error) {
      console.error('Lỗi khi xóa tất cả yêu thích:', error);
      toast.error('Lỗi khi xóa tất cả sản phẩm yêu thích!');
    }
    setClearModalOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl font-extrabold text-luxuryBlack dark:text-luxuryWhite tracking-tight">
          ❤️ Sản phẩm yêu thích
        </h1>
        <button
          onClick={() => setClearModalOpen(true)}
          className="text-sm text-red-500 hover:underline font-semibold transition-all duration-300 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700"
        >
          Xóa tất cả
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-500 dark:text-gray-300">
          <FaHeartBroken className="text-6xl mb-4 text-red-400 animate-pulse" />
          <p className="text-lg font-medium mb-2">Bạn chưa có sản phẩm yêu thích nào.</p>
          <p className="text-sm">Hãy duyệt sản phẩm và nhấn vào ❤️ để lưu lại nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {favorites.map((product) => (
            product && product._id ? (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ) : null
          ))}
        </div>
      )}

      <Modal
        isOpen={clearModalOpen}
        onRequestClose={() => setClearModalOpen(false)}
        className="bg-luxuryWhite dark:bg-gray-800 rounded-xl p-6 max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold text-luxuryBlack dark:text-luxuryWhite mb-4">Xác nhận xóa</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Bạn có chắc muốn xóa tất cả sản phẩm yêu thích?</p>
        <div className="flex gap-4">
          <Button onClick={handleClearAllFavorites} className="bg-red-500 hover:bg-red-600">
            Xóa tất cả
          </Button>
          <Button onClick={() => setClearModalOpen(false)} className="bg-gray-500 hover:bg-gray-600">
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Favorites;